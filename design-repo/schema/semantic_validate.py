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
   compliance-critical roles, and the asset AVAILABILITY pinned in this file
   (PINNED_AVAILABILITY), independent of assets/asset-roles.json.
7. MODE (pageSpecVersion 2.0.0): `mode` is required and closed
   (clone | generation). In generation mode every real Evergreen brand name,
   logo, icon / brand artwork, product screenshot, badge / certification,
   proprietary asset, copy shingle, claim, URL, embed, person and customer is
   rejected, one named rule per category (GENERATION_MODE_*), using the
   patterns DERIVED from the real source in extraction/generation-patterns.json.
   Clone mode keeps validating real content.
8. Tokens: the optional per-node `style` object may only reference catalog
   tokens (TOKEN_UNKNOWN / _RAW_COLOR / _ARBITRARY_SPACING / _UNSUPPORTED_FONT /
   _THEME_COMBINATION); raw colours are rejected anywhere in the spec.
9. Retrieval eligibility: runtime UI pinned ineligible in this file
   (RETRIEVAL_INELIGIBLE); a contract or node that disagrees is rejected.

Detection is string-based after normalisation; paraphrase is not detected.

Paths are derived from __file__ — never hardcoded. The repo must stay portable
when zipped or extracted with no sibling source tree present.
"""

from __future__ import annotations

import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)

SETTABLE_MOTION = [
    "pattern", "trigger", "durationMs", "easing", "delayMs", "staggerMs",
    "leafSet", "leafCount", "scrollProgressRange", "reducedMotionFallback",
    "implementationStatus",
]

MODES = ("clone", "generation")

# Asset availability, pinned IN CODE. assets/asset-roles.json must agree
# (extraction/verify_all.py fails otherwise) and generation-mode decisions use
# THIS table, so editing the registry alone can never loosen a role.
PINNED_AVAILABILITY = {
    "brand.logo": "clone-only",
    "brand.leaf-art": "clone-only",
    "brand.icon": "clone-only",
    "product.screenshot": "clone-only",
    "product.badge": "clone-only",
    "editorial.hero-image": "clone-only",
    "site.favicon": "clone-only",
    "third-party.trademark": "blocked-for-generation",
    "third-party.platform-logo": "blocked-for-generation",
    "third-party.review-mark": "blocked-for-generation",
    "person.likeness": "blocked-for-generation",
    "editorial.stock-photo": "blocked-for-generation",
    "typeface.webfont": "generation-safe",
    "placeholder.brand-mark": "generation-safe",
    "operator.supplied-asset": "generation-safe",
    "generated.illustration": "generation-safe",
    "generated.icon": "generation-safe",
    "placeholder.screenshot": "generation-safe",
    "placeholder.badge": "generation-safe",
    "placeholder.person-avatar": "generation-safe",
    "placeholder.company-logo": "generation-safe",
    "placeholder.url": "generation-safe",
    "generated.copy": "generation-safe",
}

# The category rule a blocked / clone-only role ALSO triggers in generation mode.
ROLE_CATEGORY_RULE = {
    "brand.logo": "GENERATION_MODE_BRAND",
    "site.favicon": "GENERATION_MODE_BRAND",
    "brand.leaf-art": "GENERATION_MODE_BRAND",
    "brand.icon": "GENERATION_MODE_BRAND",
    "product.screenshot": "GENERATION_MODE_SCREENSHOT",
    "product.badge": "GENERATION_MODE_BADGE",
    "third-party.review-mark": "GENERATION_MODE_BADGE",
    "person.likeness": "GENERATION_MODE_PERSON",
    "third-party.trademark": "GENERATION_MODE_CUSTOMER",
}

# Runtime / utility UI that is never retrievable, pinned IN CODE.
RETRIEVAL_INELIGIBLE = {"chrome.trial-modal", "chrome.announcement-banner"}

GENERATION_RULES = [
    "GENERATION_MODE_BRAND", "GENERATION_MODE_ASSET", "GENERATION_MODE_PERSON",
    "GENERATION_MODE_CUSTOMER", "GENERATION_MODE_SCREENSHOT", "GENERATION_MODE_BADGE",
    "GENERATION_MODE_COPY", "GENERATION_MODE_CLAIM", "GENERATION_MODE_URL",
    "GENERATION_MODE_EMBED", "GENERATION_MODE_MUST_REUSE_EXACT",
]
TOKEN_RULES = [
    "TOKEN_UNKNOWN", "TOKEN_RAW_COLOR", "TOKEN_ARBITRARY_SPACING",
    "TOKEN_UNSUPPORTED_FONT", "TOKEN_THEME_COMBINATION",
]

RAW_COLOR = re.compile(r"#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?)\s*\(", re.I)
RAW_LENGTH = re.compile(r"^-?\d+(?:\.\d+)?\s*(?:px|em|rem|%|vw|vh|ch)?$", re.I)
DOMAIN = re.compile(r"(?<![a-z0-9._-])((?:[a-z0-9-]+\.)+([a-z]{2,}))(?![a-z0-9-])")
FILE_EXT = {"svg", "png", "webp", "jpg", "jpeg", "gif", "pdf", "json", "js", "jsx",
            "css", "html", "mp4", "woff", "woff2", "md", "txt"}
SKIP_KEYS = {"section", "variant", "template", "mode", "pageSpecVersion",
             "evidenceLevel", "motion", "style", "assetRole", "required",
             "repeatable", "theme", "retrievalEligible"}

sys.path.insert(0, os.path.join(REPO, "extraction"))
from build_generation_patterns import claim_key, normalise, shingles  # noqa: E402


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

    # Order of the nodes the template declares must be preserved. Matched
    # greedily against the template's POSITIONAL node list: a key may repeat in
    # place only when the template marks that position repeatable (chapter
    # decomposition, repeatable card groups); otherwise the next occurrence must
    # come from a later template position. 1.0.0 compared against a
    # de-duplicated list, which rejected every spec that legitimately repeated a
    # node (and therefore every faithful T-PILLAR spec).
    filtered = [k for k in got_keys if k in allowed]
    pos = -1
    for k in filtered:
        if pos >= 0 and exp_keys[pos] == k and expected[pos].get("repeatable"):
            continue
        nxt = next((j for j in range(pos + 1, len(exp_keys)) if exp_keys[j] == k), None)
        if nxt is None:
            report("NODES_MUST_MATCH_DECLARED_TEMPLATE",
                   f"node order does not follow {tid}: {k[0]}"
                   + (f" (variant {k[1]})" if k[1] else "")
                   + " appears after a position the template places later")
            break
        pos = nxt

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

    # ── 6b. asset availability, pinned in code ───────────────────────────────
    for node in spec_nodes:
        for ref in node.get("assetRefs") or []:
            role = ref.get("assetRole")
            if role in roles and roles[role].get("availability") != PINNED_AVAILABILITY.get(role):
                res.error("ASSET_AVAILABILITY_PINNED",
                          f"{role} availability is {roles[role].get('availability')!r} in "
                          f"assets/asset-roles.json but pinned to {PINNED_AVAILABILITY.get(role)!r}")

    # ── 7. mode ──────────────────────────────────────────────────────────────
    mode = spec.get("mode")
    if mode not in MODES:
        res.error("MODE_REQUIRED", f"mode must be one of {list(MODES)}, got {mode!r}")
    elif mode == "generation":
        check_generation(spec, sections, roles, res)

    # ── 8. tokens ────────────────────────────────────────────────────────────
    check_tokens(spec, res)

    # ── 9. retrieval eligibility ─────────────────────────────────────────────
    for node in spec_nodes:
        nid = node.get("section")
        contract = sections.get(nid)
        if not contract:
            continue
        want = nid not in RETRIEVAL_INELIGIBLE
        if contract.get("retrievalEligible") is not want:
            res.error("RETRIEVAL_ELIGIBILITY_PINNED",
                      f"sections/{nid}.json retrievalEligible is "
                      f"{contract.get('retrievalEligible')!r}; pinned value is {want}")
        if "retrievalEligible" in node and node["retrievalEligible"] is not want:
            res.error("RETRIEVAL_ELIGIBILITY_PINNED",
                      f"node {nid} declares retrievalEligible={node['retrievalEligible']}; "
                      f"pinned value is {want}")

    return res


def iter_strings(value, path="$"):
    """Every free-text string in a spec, skipping structural / token keys."""
    if isinstance(value, str):
        yield path, value
    elif isinstance(value, list):
        for i, v in enumerate(value):
            yield from iter_strings(v, f"{path}[{i}]")
    elif isinstance(value, dict):
        for k, v in value.items():
            if k in SKIP_KEYS:
                continue
            yield from iter_strings(v, f"{path}.{k}")


_PATTERNS = None


def patterns() -> dict:
    global _PATTERNS
    if _PATTERNS is None:
        _PATTERNS = load("extraction/generation-patterns.json")["categories"]
    return _PATTERNS


def _word_hit(norm_text: str, norm_pat: str) -> bool:
    return re.search(r"(?<![a-z0-9])" + re.escape(norm_pat) + r"(?![a-z0-9])", norm_text) is not None


def real_asset_files(roles: dict) -> dict:
    out = {}
    for rid, role in roles.items():
        for f in role.get("files") or []:
            out[f.lower()] = rid
    return out


def check_generation(spec: dict, sections: dict, roles: dict, res: Result) -> None:
    pats = patterns()
    copy_hashes = set(pats["COPY"]["hashes"])
    allowed_suffix = tuple(pats["URL"]["allowedDomainSuffixes"])
    flagged: set = set()

    def hit(rule: str, msg: str) -> None:
        key = (rule, msg)
        if key not in flagged:
            flagged.add(key)
            res.error(rule, msg)

    # 7a. free text
    for path, raw in iter_strings({k: v for k, v in spec.items() if k != "nodes"}):
        _scan_text(path, raw, pats, copy_hashes, allowed_suffix, hit)
    for i, node in enumerate(spec.get("nodes") or []):
        stripped = {k: v for k, v in node.items() if k != "assetRefs"}
        for path, raw in iter_strings(stripped, f"$.nodes[{i}]"):
            _scan_text(path, raw, pats, copy_hashes, allowed_suffix, hit)
        for j, ref in enumerate(node.get("assetRefs") or []):
            if isinstance(ref.get("alt"), str):
                _scan_text(f"$.nodes[{i}].assetRefs[{j}].alt", ref["alt"], pats,
                           copy_hashes, allowed_suffix, hit)

    # 7b. assets
    files = real_asset_files(roles)
    for i, node in enumerate(spec.get("nodes") or []):
        nid = node.get("section")
        allowed_roles = set((sections.get(nid) or {}).get("generatedAssetRoles") or [])
        for j, ref in enumerate(node.get("assetRefs") or []):
            where = f"$.nodes[{i}].assetRefs[{j}]"
            role = ref.get("assetRole")
            avail = PINNED_AVAILABILITY.get(role)
            if avail != "generation-safe":
                hit("GENERATION_MODE_ASSET",
                    f"{where}: assetRole {role!r} is {avail} and may not appear in generation mode; "
                    f"use one of {roles.get(role, {}).get('generationSafeSubstitutes')}")
                if role in ROLE_CATEGORY_RULE:
                    hit(ROLE_CATEGORY_RULE[role], f"{where}: real {role} asset in generation mode")
            if (roles.get(role) or {}).get("generationPolicy") == "must-reuse-exact":
                hit("GENERATION_MODE_MUST_REUSE_EXACT",
                    f"{where}: {role} is must-reuse-exact, which is valid only in clone mode")
            if avail == "generation-safe" and role not in allowed_roles:
                hit("GENERATION_MODE_ASSET",
                    f"{where}: {role} is not in {nid}'s generatedAssetRoles {sorted(allowed_roles)}")
            src = ref.get("src")
            if isinstance(src, str):
                base = normalise(src).rsplit("/", 1)[-1].split("?")[0]
                if base in files:
                    owner = files[base]
                    hit("GENERATION_MODE_ASSET",
                        f"{where}: src {src!r} is the real source file of role {owner}")
                    if owner in ROLE_CATEGORY_RULE:
                        hit(ROLE_CATEGORY_RULE[owner], f"{where}: src reuses a real {owner} file")
                if "://" in src or src.startswith("//"):
                    _scan_urls(f"{where}.src", normalise(src), pats, allowed_suffix, hit)


def _scan_urls(path, norm, pats, allowed_suffix, hit) -> None:
    for m in DOMAIN.finditer(norm):
        dom, tld = m.group(1), m.group(2)
        if tld in FILE_EXT:
            continue
        if dom.endswith(allowed_suffix) or dom in ("example", "invalid"):
            continue
        hit("GENERATION_MODE_URL",
            f"{path}: domain {dom!r} — generation mode allows only .example / .invalid")


def _scan_text(path, raw, pats, copy_hashes, allowed_suffix, hit) -> None:
    norm = normalise(raw)
    for cat, rule in (("BRAND", "GENERATION_MODE_BRAND"), ("PERSON", "GENERATION_MODE_PERSON"),
                      ("CUSTOMER", "GENERATION_MODE_CUSTOMER"), ("EMBED", "GENERATION_MODE_EMBED")):
        for p in pats[cat]["patterns"]:
            if _word_hit(norm, p["normalised"]):
                hit(rule, f"{path}: contains the real {cat.lower()} {p['pattern']!r}")
    for marker in pats["EMBED"].get("alsoRejected") or []:
        if marker in norm:
            hit("GENERATION_MODE_EMBED", f"{path}: contains an embed marker {marker!r}")
    _scan_urls(path, norm, pats, allowed_suffix, hit)
    ck = claim_key(raw)
    for p in pats["CLAIM"]["patterns"]:
        if p["normalised"] in ck:
            hit("GENERATION_MODE_CLAIM", f"{path}: repeats the real claim {p['pattern']!r}")
    for h, sh in shingles(raw):
        if h in copy_hashes:
            hit("GENERATION_MODE_COPY", f"{path}: reuses real Evergreen copy ({sh!r} ...)")
            break


_CATALOG = None


def catalog() -> dict:
    global _CATALOG
    if _CATALOG is None:
        _CATALOG = load("tokens/llm/token-catalog.json")
    return _CATALOG


def check_tokens(spec: dict, res: Result) -> None:
    cat = catalog()
    names = {t["name"] for t in cat["tokens"]}
    fonts = set(cat["fontFamilies"])
    slots = cat["styleSlots"]
    manifest = load("registry.manifest.json")
    theme = spec.get("theme", manifest.get("defaultTheme", "light"))
    if theme not in (manifest.get("schemaValidatedThemes") or []) or theme not in cat["themes"]:
        res.error("TOKEN_THEME_COMBINATION",
                  f"theme {theme!r} is not a schema-validated theme {manifest.get('schemaValidatedThemes')}")
        resolves = set()
    else:
        resolves = set(cat["themes"][theme]["resolves"])
    for path, raw in iter_strings(spec):
        if RAW_COLOR.search(raw):
            res.error("TOKEN_RAW_COLOR", f"{path}: raw colour literal in {raw[:60]!r}")
    for i, node in enumerate(spec.get("nodes") or []):
        for slot, val in (node.get("style") or {}).items():
            where = f"$.nodes[{i}].style.{slot}"
            rule = slots.get(slot)
            if rule is None:
                res.error("TOKEN_UNKNOWN", f"{where}: {slot!r} is not a style slot")
                continue
            val = str(val).strip()
            prefixes = rule["acceptsPrefix"]
            prefixes = tuple(prefixes) if isinstance(prefixes, list) else (prefixes,)
            if RAW_COLOR.search(val):
                res.error("TOKEN_RAW_COLOR", f"{where}: raw colour {val!r}; use a semantic token")
            elif RAW_LENGTH.match(val):
                res.error("TOKEN_ARBITRARY_SPACING", f"{where}: raw length {val!r}; use a spacing.* token")
            elif slot == "fontFamily" and val not in fonts:
                res.error("TOKEN_UNSUPPORTED_FONT", f"{where}: {val!r} is not one of {sorted(fonts)}")
            elif val not in names:
                res.error("TOKEN_UNKNOWN", f"{where}: {val!r} is not in tokens/llm/token-catalog.json")
            elif not val.startswith(prefixes):
                res.error("TOKEN_THEME_COMBINATION", f"{where}: {val!r} is not a {prefixes} token")
            elif rule.get("themeResolved") and val not in resolves:
                res.error("TOKEN_THEME_COMBINATION", f"{where}: {val!r} does not resolve in theme {theme!r}")


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
