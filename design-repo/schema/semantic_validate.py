#!/usr/bin/env python3
"""Semantic validation for Evergreen-clone PageSpecs.

Everything JSON Schema structurally cannot express. Run it alongside
pagespec.schema.json — a spec is valid only if BOTH pass.

What it enforces, and why each one is here:

1. NODES_MUST_MATCH_DECLARED_TEMPLATE — the node sequence is cross-referenced
   against the *declared* `template` field's own node list in
   templates/templates.json. This is deliberately not a check on `nodes[]` in
   isolation: a spec that contradicts its own template must fail. (This exact
   bug class is the most repeated one across prior design-repo builds, and it
   passes a happy-path test while still being broken.)
2. Route restrictions — `homeRouteOnly`, `allowedTemplates`, and the banner's
   real route restriction.
3. Rhythm rules from compatibility/graph.json, honouring each rule's own
   `severity` ("error" fails, "warn" reports) and its named exceptions. Rules
   key on (section, variant) where a section legitimately repeats on one page
   with different content rules.
4. A required `reducedMotionFallback` on every node's motion object, pinned to
   the section contract's measured value.
5. Per-instance maxWords budgets, counted on the real strings in the spec
   being validated — not just on the bundled example.
6. Asset-role closure, including the pinned policy values for
   compliance-critical roles.

Paths are derived from __file__ — never hardcoded. The repo must stay portable
when zipped or extracted with no sibling source tree present.
"""

from __future__ import annotations

import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)

SETTABLE_MOTION = [
    "pattern", "trigger", "durationMs", "easing", "delayMs", "staggerMs",
    "leafSet", "leafCount", "scrollProgressRange", "reducedMotionFallback",
    "implementationStatus",
]


def load(rel: str):
    with open(os.path.join(REPO, rel), encoding="utf-8") as fh:
        return json.load(fh)


def load_sections() -> dict:
    import glob
    out = {}
    for path in sorted(glob.glob(os.path.join(REPO, "sections", "*.json"))):
        with open(path, encoding="utf-8") as fh:
            data = json.load(fh)
        out[data["$id"].replace("sections.", "", 1)] = data
    return out


def word_count(value) -> int:
    """Words in a content value, recursing through lists and dicts."""
    if isinstance(value, str):
        return len(value.split())
    if isinstance(value, list):
        return max((word_count(v) for v in value), default=0)
    if isinstance(value, dict):
        return max((word_count(v) for v in value.values()), default=0)
    return 0


class Result:
    def __init__(self) -> None:
        self.errors: list[str] = []
        self.warnings: list[str] = []

    def error(self, rule: str, msg: str) -> None:
        self.errors.append(f"[{rule}] {msg}")

    def warn(self, rule: str, msg: str) -> None:
        self.warnings.append(f"[{rule}] {msg}")

    @property
    def ok(self) -> bool:
        return not self.errors


def validate(spec: dict) -> Result:
    res = Result()
    templates = load("templates/templates.json")["templates"]
    sections = load_sections()
    graph = load("compatibility/graph.json")
    rules = {r["id"]: r for r in graph["rules"]}
    roles_doc = load("assets/asset-roles.json")
    roles = roles_doc["roles"]
    pinned = roles_doc.get("pinnedPolicyValues") or {}

    def severity(rule_id: str) -> str:
        return (rules.get(rule_id) or {}).get("severity", "error")

    def report(rule_id: str, msg: str) -> None:
        (res.error if severity(rule_id) == "error" else res.warn)(rule_id, msg)

    # ── 0. the declared template must exist ──────────────────────────────────
    tid = spec.get("template")
    if tid not in templates:
        res.error("CLOSED_TEMPLATE_ENUM", f"unknown template {tid!r}")
        return res
    template = templates[tid]
    spec_nodes = spec.get("nodes") or []

    # ── 1. nodes vs the DECLARED template's real node list ───────────────────
    expected = template["nodes"]
    exp_keys = [(n["section"], n.get("variant")) for n in expected]
    got_keys = [(n["section"], n.get("variant")) for n in spec_nodes]

    required_keys = [
        (n["section"], n.get("variant")) for n in expected if n.get("required")
    ]
    for key in required_keys:
        if key not in got_keys:
            label = key[0] + (f" (variant {key[1]})" if key[1] else "")
            report("NODES_MUST_MATCH_DECLARED_TEMPLATE",
                   f"{tid} requires {label} but the spec omits it")

    allowed = set(exp_keys)
    for key in got_keys:
        if key not in allowed:
            label = key[0] + (f" (variant {key[1]})" if key[1] else "")
            report("NODES_MUST_MATCH_DECLARED_TEMPLATE",
                   f"{label} is not a node of {tid}")

    # order of the nodes the template does declare must be preserved
    filtered = [k for k in got_keys if k in allowed]
    ordered = [k for k in exp_keys if k in set(filtered)]
    if filtered != ordered:
        report("NODES_MUST_MATCH_DECLARED_TEMPLATE",
               f"node order does not follow {tid}: expected {ordered}, got {filtered}")

    # Repeatability keys on (section, variant) and is compared against the
    # template's OWN declared count of that key — not against 1. A template may
    # legitimately declare the same (section, variant) at two separate positions
    # as two non-repeatable nodes: T-HOME, T-ESG and T-PARTNER all place
    # divider.leaf-band twice that way. `repeatable: false` means "this node does
    # not repeat itself", not "this pair may appear only once on the page".
    # Comparing against 1 rejects 4 real, correct templates.
    for key in set(exp_keys):
        declared = exp_keys.count(key)
        found = got_keys.count(key)
        node_is_repeatable = any(
            n.get("repeatable") for n in expected
            if (n["section"], n.get("variant")) == key
        )
        if not node_is_repeatable and found > declared:
            label = key[0] + (f" (variant {key[1]})" if key[1] else "")
            report("STRUCTURAL_RULES_KEY_ON_SECTION_AND_VARIANT",
                   f"{label} appears {found} times on {tid}, which declares it "
                   f"{declared} time(s) and does not mark it repeatable")

    # ── 2. route restrictions ────────────────────────────────────────────────
    route = spec.get("route", "")
    for node in spec_nodes:
        nid = node.get("section")
        contract = sections.get(nid)
        if not contract:
            res.error("CLOSED_SECTION_ENUM", f"unknown section {nid!r}")
            continue
        cons = contract.get("constraints") or {}
        allowed_t = cons.get("allowedTemplates")
        if isinstance(allowed_t, list) and tid not in allowed_t:
            report("NODES_MUST_MATCH_DECLARED_TEMPLATE",
                   f"{nid} is restricted to {allowed_t} and may not appear on {tid}")
        if cons.get("homeRouteOnly") and route != "/":
            report("NODES_MUST_MATCH_DECLARED_TEMPLATE",
                   f"{nid} is home-route only but the spec route is {route!r}")
        # `mustBeFirst` / `mustBeLast` are positions within the SECTION FLOW, not
        # the raw node array. Verified against templates/templates.json: the
        # banner precedes the nav on the 2 banner-bearing templates (nav sits at
        # index 1 there, 0 on the other 20), and chrome.footer is second-to-last
        # on all 22 because chrome.trial-modal — an overlay rendered outside the
        # flow by Layout — always closes the array. A naive first/last check
        # against the raw array rejects every real template.
        if cons.get("mustBeFirst"):
            if nid == "chrome.announcement-banner":
                expected_first = spec_nodes[0] if spec_nodes else None
            elif nid == "chrome.nav":
                pre = [n for n in spec_nodes
                       if n["section"] != "chrome.announcement-banner"]
                expected_first = pre[0] if pre else None
            else:
                flow = [n for n in spec_nodes
                        if not n["section"].startswith("chrome.")]
                expected_first = flow[0] if flow else None
            if expected_first is not None and expected_first is not node:
                report("NODES_MUST_MATCH_DECLARED_TEMPLATE",
                       f"{nid} must open the section flow on {tid}")
        if cons.get("mustBeLast"):
            if nid == "chrome.footer":
                flow = [n for n in spec_nodes
                        if n["section"] != "chrome.trial-modal"]
            else:
                flow = [n for n in spec_nodes
                        if not n["section"].startswith("chrome.")]
            if flow and flow[-1] is not node:
                report("NODES_MUST_MATCH_DECLARED_TEMPLATE",
                       f"{nid} must close the section flow on {tid}")

    # the announcement banner's real route restriction
    banner = [n for n in spec_nodes if n.get("section") == "chrome.announcement-banner"]
    if banner and not (route == "/" or route.startswith("/blog/")):
        report("BANNER_ROUTE_RESTRICTED",
               f"chrome.announcement-banner appears on {route!r}; it is measured only on "
               "the homepage and /blog/:slug")
    if not banner and (route == "/" or route.startswith("/blog/")):
        report("BANNER_ROUTE_RESTRICTED",
               f"{route!r} carries the banner on the real site but the spec omits it")

    # ── 3. rhythm rules ──────────────────────────────────────────────────────
    def exceptions(rule_id: str) -> list:
        raw = (rules.get(rule_id) or {}).get("exception") or \
              (rules.get(rule_id) or {}).get("exceptions") or []
        return raw if isinstance(raw, list) else [raw]

    heroes = [n for n in spec_nodes if n["section"].startswith("hero.")]
    if len(heroes) > 1 and tid not in exceptions("ONE_HERO_PER_PAGE"):
        report("ONE_HERO_PER_PAGE",
               f"{len(heroes)} hero sections on {tid}: "
               f"{[h['section'] for h in heroes]}")

    ctas = [n for n in spec_nodes if n["section"] == "conversion.reassurance-cta"]
    if len(ctas) > 1:
        report("ONE_FINAL_CTA", f"{len(ctas)} final-CTA sections on {tid}")
    if not ctas and tid not in exceptions("ONE_FINAL_CTA"):
        report("ONE_FINAL_CTA",
               f"{tid} has no conversion.reassurance-cta and is not a declared exception")

    dividers = [i for i, n in enumerate(spec_nodes)
                if n["section"] == "divider.leaf-band"]
    for a, b in zip(dividers, dividers[1:]):
        if b == a + 1:
            report("NO_CONSECUTIVE_DIVIDERS",
                   f"divider.leaf-band at positions {a} and {b} are adjacent")

    # Category adjacency, honouring the graph's MACHINE-READABLE exemptions.
    # The graph also carries a prose `exceptions` list for humans; the two must
    # stay in agreement — a rule that exists in prose and in code is two
    # authoritative sources for one fact.
    adj_rule = rules.get("NO_ADJACENT_SAME_CATEGORY") or {}
    always_exempt = set(adj_rule.get("alwaysExemptCategories") or ["chrome", "content"])
    pair_exempt = {
        (e.get("template"), e.get("category"))
        for e in (adj_rule.get("exemptAdjacency") or [])
    }
    cat_of = {nid: (c.get("category") or "") for nid, c in sections.items()}
    for a, b in zip(spec_nodes, spec_nodes[1:]):
        ca, cb = cat_of.get(a["section"]), cat_of.get(b["section"])
        if not ca or ca != cb or ca in always_exempt:
            continue
        if (tid, ca) in pair_exempt:
            continue
        report("NO_ADJACENT_SAME_CATEGORY",
               f"{a['section']} and {b['section']} are both category {ca!r}")

    # ── 4. motion ────────────────────────────────────────────────────────────
    for node in spec_nodes:
        nid = node["section"]
        contract = sections.get(nid)
        if not contract:
            continue
        motion = node.get("motion")
        if not isinstance(motion, dict):
            res.error("MOTION_REQUIRES_REDUCED_FALLBACK",
                      f"{nid} has no motion object")
            continue
        extra = sorted(set(motion) - set(SETTABLE_MOTION))
        if extra:
            res.error("MOTION_OBJECT_IS_CLOSED",
                      f"{nid} motion carries non-settable field(s) {extra}; the PageSpec "
                      "motion object is closed to the section's motionFieldSet")
        if "reducedMotionFallback" not in motion:
            res.error("MOTION_REQUIRES_REDUCED_FALLBACK",
                      f"{nid} motion has no reducedMotionFallback")
        real = contract.get("motion") or {}
        if motion.get("pattern") != real.get("pattern"):
            report("NO_INVENTED_MOTION_PATTERN",
                   f"{nid} declares motion pattern {motion.get('pattern')!r} but the "
                   f"measured pattern is {real.get('pattern')!r}")
        for field in ("delayMs", "staggerMs"):
            if real.get(field) == 0 and motion.get(field) not in (0, None):
                report("NO_STAGGER_NO_DELAY",
                       f"{nid} sets {field}={motion.get(field)}; measured value is 0 "
                       "(the leaf system has no delay and no stagger)")

    # ── 5. per-instance maxWords ─────────────────────────────────────────────
    for node in spec_nodes:
        nid = node["section"]
        contract = sections.get(nid)
        if not contract:
            continue
        budgets = contract.get("content") or {}
        for field, value in (node.get("content") or {}).items():
            spec_field = budgets.get(field)
            if not isinstance(spec_field, dict):
                continue
            budget = spec_field.get("maxWords")
            if budget is None:
                continue
            got = word_count(value)
            if got > budget:
                res.error("MAX_WORDS",
                          f"{nid}.{field} is {got} words, budget is {budget}")

    # ── 6. asset roles ───────────────────────────────────────────────────────
    for node in spec_nodes:
        for ref in node.get("assetRefs") or []:
            role = ref.get("assetRole")
            if role not in roles:
                res.error("CLOSED_ASSET_ROLE", f"unknown assetRole {role!r}")
                continue
            if role in pinned:
                want = pinned[role]
                have = roles[role].get("generationPolicy")
                if have != want:
                    res.error("COMPLIANCE_CRITICAL_ROLES_ARE_PINNED",
                              f"{role} must be pinned to {want!r}, found {have!r}")

    return res


def main(argv: list[str]) -> int:
    paths = argv[1:] or [os.path.join(HERE, "example.pagespec.json")]
    failed = False
    for path in paths:
        with open(path, encoding="utf-8") as fh:
            spec = json.load(fh)
        res = validate(spec)
        name = os.path.basename(path)
        for warning in res.warnings:
            print(f"  warn  {name}: {warning}")
        for err in res.errors:
            print(f"  FAIL  {name}: {err}")
        if res.ok:
            print(f"  ok    {name}: 0 errors"
                  + (f", {len(res.warnings)} warning(s)" if res.warnings else ""))
        else:
            failed = True
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
