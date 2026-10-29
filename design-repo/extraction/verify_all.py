#!/usr/bin/env python3
"""Repo-level verification for the Evergreen-clone design-repo.

Every check here is drift-proofed: it recomputes a fact from the files on disk
rather than trusting a number written into a file. Each is proven to actually
catch drift by extraction/prove_drift.py, which injects the bug into a scratch
copy and confirms this script fails — a check that has never been shown to
fail on bad input might not be checking anything.

Checks:
  1. self-containment    — no absolute machine paths; entryPoints all resolve
                           INSIDE design-repo/
  2. allowlist parity    — every allowlist id has a contract file and vice versa
  3. version parity      — allowlistVersion agrees across allowlist, policy and
                           manifest
  4. manifest counts     — recomputed from the real files, never trusted as
                           written
  5. citation validity   — every measuredFrom "path:line[-line]" resolves inside
                           the real file; degrades to a WARNING (not a failure)
                           when no sibling source tree is present, so a
                           standalone copy still verifies
  6. asset-role closure  — every role's generationPolicy is in the closed enum
  7. pinned asset roles  — compliance-critical roles are pinned to their SPECIFIC
                           policy value, not merely a member of the enum. A
                           membership check cannot catch a role being changed to
                           a different-but-still-valid value, which is exactly
                           the dangerous case when the source is a real company.
  8. route coverage      — every route maps to exactly one real template, and the
                           route total matches
  9. graph/validator     — rules asserted in compatibility/graph.json are the
                           ones semantic_validate.py actually implements
 10. schema + semantics  — the bundled example passes both layers
 11. asset availability  — PINNED_AVAILABILITY (this file) == the registry ==
                           semantic_validate.PINNED_AVAILABILITY; substitutes
                           are generation-safe; must-reuse-exact is clone-only
 12. retrieval pins      — RETRIEVAL_INELIGIBLE (this file) == contracts ==
                           allowlist == semantic_validate; runtime-UI-looking
                           ids must be pinned
 13. section contracts   — closed schema/section-contract.schema.json; R7
                           source ranges re-read from the real files
 14. wrapper gate        — extraction/wrapper_gate.py over measured heights
 15. token catalog       — rebuilt from the token files and compared
 16. generation patterns — registry present, rules wired, rebuilt from the
                           real source and compared (sibling source only)
 17. generation examples — one generation-mode example per template family,
                           all pass; the real-content clone control passes
 18. policy binding      — category + designPolicy + contentHash
 19. policy docs agree   — README, manifest and asset-roles state the same
                           modes, availability and generation rules
 20. router coverage     — route-map == src/data/routes.json and every route
                           is served by a non-placeholder <Route> (sibling only)

Drift proof: extraction/prove_drift.py --scratch DIR.
Exit code 0 only if every check passes.
"""

from __future__ import annotations

import glob
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
PROJECT = os.path.dirname(REPO)  # may not exist in a standalone copy

failures: list[str] = []
warnings: list[str] = []


def fail(check: str, msg: str) -> None:
    failures.append(f"[{check}] {msg}")


def warn(check: str, msg: str) -> None:
    warnings.append(f"[{check}] {msg}")


def load(rel: str):
    with open(os.path.join(REPO, rel), encoding="utf-8") as fh:
        return json.load(fh)


def contract_ids(layer: str) -> dict:
    out = {}
    for path in sorted(glob.glob(os.path.join(REPO, layer, "*.json"))):
        with open(path, encoding="utf-8") as fh:
            out[json.load(fh)["$id"]] = os.path.relpath(path, REPO)
    return out


# ── 1. self-containment ──────────────────────────────────────────────────────
def check_self_containment() -> None:
    bad_path = re.compile(r"/Users/|/home/[a-z]|[A-Z]:\\\\")
    # Two files legitimately contain the pattern and must be exempt, each for a
    # stated reason — not a convenience list. Anything added here needs a reason
    # of the same kind.
    exempt = {
        # holds the detector regex itself
        "extraction/verify_all.py",
        # holds deliberate bad-path fixtures it injects into scratch copies to
        # prove this very check catches drift
        "extraction/prove_drift.py",
    }
    for path in glob.glob(os.path.join(REPO, "**", "*"), recursive=True):
        if not os.path.isfile(path):
            continue
        if os.path.basename(path).endswith((".pyc",)):
            continue
        if os.path.relpath(path, REPO) in exempt:
            continue
        try:
            text = open(path, encoding="utf-8").read()
        except (UnicodeDecodeError, OSError):
            continue
        for m in bad_path.finditer(text):
            fail("self-containment",
                 f"{os.path.relpath(path, REPO)} contains an absolute machine "
                 f"path near {text[max(0, m.start()-30):m.start()+40]!r}")
            break

    manifest = load("registry.manifest.json")
    for name, rel in (manifest.get("entryPoints") or {}).items():
        if rel.startswith("../") or rel.startswith("/"):
            fail("self-containment",
                 f"entryPoint {name!r} -> {rel!r} points outside design-repo/. "
                 "External evidence belongs in extraction/measured-values.json.")
        elif not os.path.exists(os.path.join(REPO, rel)):
            fail("self-containment", f"entryPoint {name!r} -> {rel!r} does not exist")


# ── 2. allowlist parity ──────────────────────────────────────────────────────
def check_allowlist_parity() -> None:
    allow = load("tokens/llm/component-allowlist.json")
    real = {}
    for layer in ("primitives", "components", "sections"):
        real.update(contract_ids(layer))

    listed = set(allow["sections"])
    listed |= set(allow["notPageLevel"]["primitives"])
    listed |= set(allow["notPageLevel"]["components"])

    for phantom in sorted(listed - set(real)):
        fail("allowlist-parity", f"allowlist lists {phantom!r} with no contract file")
    for orphan in sorted(set(real) - listed):
        fail("allowlist-parity", f"contract {real[orphan]} has no allowlist entry")

    counts = allow.get("counts") or {}
    for layer in ("primitives", "components", "sections"):
        actual = len(contract_ids(layer))
        if counts.get(layer) != actual:
            fail("allowlist-parity",
                 f"allowlist counts.{layer} says {counts.get(layer)}, disk has {actual}")


# ── 3. version parity ────────────────────────────────────────────────────────
def check_version_parity() -> None:
    allow = load("tokens/llm/component-allowlist.json")
    policy = load("tokens/llm/token-policy.json")
    catalog = load("tokens/llm/token-catalog.json")
    manifest = load("registry.manifest.json")
    want = allow["version"]
    for label, got in (
        ("token-policy.json", policy.get("version")),
        ("token-catalog.json", catalog.get("version")),
        ("registry.manifest.json allowlistVersion", manifest.get("allowlistVersion")),
    ):
        if got != want:
            fail("version-parity",
                 f"{label} is {got!r} but the allowlist is {want!r}")


# ── 4. manifest counts, recomputed ───────────────────────────────────────────
def check_manifest_counts() -> None:
    manifest = load("registry.manifest.json")
    claimed = manifest.get("counts") or {}
    templates = load("templates/templates.json")["templates"]
    route_map = load("templates/route-map.json")["map"]
    actual = {
        "primitives": len(contract_ids("primitives")),
        "components": len(contract_ids("components")),
        "sections": len(contract_ids("sections")),
        "templates": len(templates),
        "routes": len(route_map),
        "graphRules": len(load("compatibility/graph.json")["rules"]),
        "assetRoles": len(load("assets/asset-roles.json")["roles"]),
    }
    for key, real in actual.items():
        if claimed.get(key) != real:
            fail("manifest-counts",
                 f"manifest counts.{key} says {claimed.get(key)}, "
                 f"recomputed from disk is {real}")


# ── 5. citation validity ─────────────────────────────────────────────────────
CITE = re.compile(r"^(?P<path>[^:]+):(?P<start>\d+)(?:-(?P<end>\d+))?$")


def check_citations() -> None:
    if not os.path.isdir(os.path.join(PROJECT, "src")):
        warn("citations",
             "no sibling source tree present — citation ranges not resolvable "
             "in a standalone copy; skipped by design, not failed")
        return

    checked = 0
    for path in glob.glob(os.path.join(REPO, "**", "*.json"), recursive=True):
        try:
            data = json.load(open(path, encoding="utf-8"))
        except (ValueError, OSError):
            continue

        def walk(node) -> None:
            nonlocal checked
            if isinstance(node, dict):
                for key, value in node.items():
                    if key in ("measuredFrom", "citation") and isinstance(value, str):
                        m = CITE.match(value.strip())
                        if not m:
                            continue
                        target = os.path.join(PROJECT, m.group("path"))
                        if not os.path.exists(target):
                            fail("citations",
                                 f"{os.path.relpath(path, REPO)}: cites "
                                 f"{m.group('path')} which does not exist")
                            return
                        total = sum(1 for _ in open(target, encoding="utf-8",
                                                    errors="replace"))
                        end = int(m.group("end") or m.group("start"))
                        if end > total:
                            fail("citations",
                                 f"{os.path.relpath(path, REPO)}: cites "
                                 f"{value} but that file has {total} lines")
                        checked += 1
                    else:
                        walk(value)
            elif isinstance(node, list):
                for item in node:
                    walk(item)

        walk(data)
    if checked == 0:
        warn("citations", "no measuredFrom citations found to check")


# ── 6 & 7. asset roles: closure, then PINNED values ──────────────────────────
def check_asset_roles() -> None:
    doc = load("assets/asset-roles.json")
    enum = set(doc["generationPolicyEnum"])
    roles = doc["roles"]
    for rid, role in roles.items():
        policy = role.get("generationPolicy")
        if policy not in enum:
            fail("asset-role-closure",
                 f"{rid} has generationPolicy {policy!r}, not in the closed enum")

    # Membership in a closed set is NOT the real rule for the roles that carry
    # legal weight. A real trademark or a real person's likeness must be pinned
    # to one specific value — swapping it for a different-but-still-valid value
    # (e.g. may-generate-new) would pass a membership check silently.
    pinned = doc.get("pinnedPolicyValues") or {}
    critical = doc.get("complianceCriticalRoles") or []
    if not pinned:
        fail("asset-role-pinning", "no pinnedPolicyValues block exists")
    for rid in critical:
        if rid not in pinned:
            fail("asset-role-pinning",
                 f"{rid} is listed as compliance-critical but is not pinned")
    for rid, want in pinned.items():
        if rid not in roles:
            fail("asset-role-pinning", f"pinned role {rid!r} does not exist")
            continue
        got = roles[rid].get("generationPolicy")
        if got != want:
            fail("asset-role-pinning",
                 f"{rid} MUST be pinned to {want!r} but is {got!r}")


# ── 8. route coverage ────────────────────────────────────────────────────────
def check_routes() -> None:
    rm = load("templates/route-map.json")
    templates = load("templates/templates.json")["templates"]
    mapping = rm["map"]
    for route, tid in mapping.items():
        if tid not in templates:
            fail("route-coverage", f"{route} maps to unknown template {tid!r}")
    unmapped = set(templates) - set(mapping.values())
    for tid in sorted(unmapped):
        fail("route-coverage", f"template {tid} has no routes mapped to it")
    if rm.get("routeCount") != len(mapping):
        fail("route-coverage",
             f"route-map routeCount says {rm.get('routeCount')}, "
             f"map has {len(mapping)} entries")
    by_template: dict[str, int] = {}
    for tid in mapping.values():
        by_template[tid] = by_template.get(tid, 0) + 1
    for tid, count in sorted(by_template.items()):
        declared = templates[tid].get("routeCount")
        if declared != count:
            fail("route-coverage",
                 f"{tid} declares routeCount {declared} but {count} routes map to it")


# ── 9. graph rules vs the validator that enforces them ───────────────────────
def check_graph_validator_agreement() -> None:
    graph = load("compatibility/graph.json")
    ids = {r["id"] for r in graph["rules"]}
    source = open(os.path.join(REPO, "schema", "semantic_validate.py"),
                  encoding="utf-8").read()
    # Rules the validator is expected to enforce by id. A rule asserted in the
    # graph but absent from the validator is prose with nothing behind it.
    enforced_here = {
        "NODES_MUST_MATCH_DECLARED_TEMPLATE", "BANNER_ROUTE_RESTRICTED",
        "ONE_FINAL_CTA", "ONE_HERO_PER_PAGE", "NO_CONSECUTIVE_DIVIDERS",
        "NO_ADJACENT_SAME_CATEGORY", "MOTION_REQUIRES_REDUCED_FALLBACK",
        "MOTION_OBJECT_IS_CLOSED", "NO_INVENTED_MOTION_PATTERN",
        "NO_STAGGER_NO_DELAY", "STRUCTURAL_RULES_KEY_ON_SECTION_AND_VARIANT",
        "CLOSED_ASSET_ROLE", "COMPLIANCE_CRITICAL_ROLES_ARE_PINNED",
        "MODE_REQUIRED", "RETRIEVAL_ELIGIBILITY_PINNED", "ASSET_AVAILABILITY_PINNED",
        *GENERATION_RULES, *TOKEN_RULES,
    }
    for rule_id in sorted(enforced_here):
        if rule_id not in ids:
            fail("graph-validator",
                 f"semantic_validate.py enforces {rule_id} but the graph does "
                 "not declare it")
        if rule_id not in source:
            fail("graph-validator",
                 f"graph declares {rule_id} but semantic_validate.py never "
                 "references it")
    counts = graph.get("severityCounts") or {}
    real = {"error": 0, "warn": 0}
    for rule in graph["rules"]:
        real[rule.get("severity", "error")] = real.get(rule.get("severity", "error"), 0) + 1
    for sev, n in real.items():
        if sev in counts and counts[sev] != n:
            fail("graph-validator",
                 f"graph severityCounts.{sev} says {counts[sev]}, actual {n}")
    if graph.get("ruleCount") not in (None, len(graph["rules"])):
        fail("graph-validator",
             f"graph ruleCount says {graph.get('ruleCount')}, "
             f"actual {len(graph['rules'])}")


# ── 10. the example passes both layers ───────────────────────────────────────
def check_example() -> None:
    sys.path.insert(0, os.path.join(REPO, "schema"))
    try:
        from jsonschema import Draft7Validator
    except ImportError:
        warn("example", "jsonschema not installed — schema layer skipped")
        Draft7Validator = None
    import semantic_validate as sv

    spec = load("schema/example.pagespec.json")
    if Draft7Validator is not None:
        schema = load("schema/pagespec.schema.json")
        Draft7Validator.check_schema(schema)
        errs = list(Draft7Validator(schema).iter_errors(spec))
        if errs:
            fail("example", f"example fails schema with {len(errs)} error(s)")
    res = sv.validate(spec)
    if res.errors:
        fail("example", f"example fails semantic validation: {res.errors[:2]}")


# ── pins held IN CODE, independent of the registries ─────────────────────────
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
AVAILABILITY_ENUM = ("clone-only", "generation-safe", "blocked-for-generation")
RETRIEVAL_INELIGIBLE = {"chrome.trial-modal", "chrome.announcement-banner"}
RUNTIME_UI = re.compile(r"modal|dialog|drawer|popup|overlay|cookie|consent|preloader|toast|banner|cursor|ticker")
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
TEMPLATE_FAMILIES = ("landing", "pricing", "conversion-form", "index", "article",
                     "collection-detail", "customer-story", "legal")
SAAS_POLICY = ("n0-saas-design-constraints-common", "0.1.0")


def _sv():
    sys.path.insert(0, os.path.join(REPO, "schema"))
    import semantic_validate as sv
    return sv


def sections_by_id() -> dict:
    out = {}
    for path in sorted(glob.glob(os.path.join(REPO, "sections", "*.json"))):
        with open(path, encoding="utf-8") as fh:
            c = json.load(fh)
        out[c["$id"].replace("sections.", "", 1)] = c
    return out


# ── 11. asset availability, pinned ───────────────────────────────────────────
def check_asset_availability() -> None:
    doc = load("assets/asset-roles.json")
    roles = doc["roles"]
    if set(roles) != set(PINNED_AVAILABILITY):
        fail("asset-availability",
             f"registry roles {sorted(set(roles) ^ set(PINNED_AVAILABILITY))} differ from the pinned table")
    sv = _sv()
    if sv.PINNED_AVAILABILITY != PINNED_AVAILABILITY:
        fail("asset-availability", "semantic_validate.PINNED_AVAILABILITY differs from verify_all's pin")
    if list(doc.get("availabilityEnum") or []) != list(AVAILABILITY_ENUM):
        fail("asset-availability", f"availabilityEnum is {doc.get('availabilityEnum')}")
    for rid, role in roles.items():
        av = role.get("availability")
        if av not in AVAILABILITY_ENUM:
            fail("asset-availability", f"{rid}: availability {av!r} not in the closed enum")
        if rid in PINNED_AVAILABILITY and av != PINNED_AVAILABILITY[rid]:
            fail("asset-availability", f"{rid}: availability {av!r} but pinned in code to {PINNED_AVAILABILITY[rid]!r}")
        if not role.get("generatedModeGuidance"):
            fail("asset-availability", f"{rid}: no generatedModeGuidance")
        subs = role.get("generationSafeSubstitutes")
        if not isinstance(subs, list):
            fail("asset-availability", f"{rid}: generationSafeSubstitutes missing")
            continue
        if av != "generation-safe" and not subs:
            fail("asset-availability", f"{rid} is {av} but names no generationSafeSubstitutes")
        for sub in subs:
            if PINNED_AVAILABILITY.get(sub) != "generation-safe":
                fail("asset-availability", f"{rid}: substitute {sub!r} is not a generation-safe role")
        if role.get("generationPolicy") == "must-reuse-exact" and av != "clone-only":
            fail("asset-availability", f"{rid}: must-reuse-exact is valid only in clone mode, so it must be clone-only (is {av!r})")
        if role.get("complianceCritical") and av == "generation-safe":
            fail("asset-availability", f"{rid}: compliance-critical role marked generation-safe")
    gs = [r for r, a in PINNED_AVAILABILITY.items() if a == "generation-safe"]
    for c in sections_by_id().values():
        for r in c.get("generatedAssetRoles") or []:
            if r not in gs:
                fail("asset-availability", f"{c['$id']}: generatedAssetRoles lists non-generation-safe {r!r}")


# ── 12. retrieval eligibility, pinned ────────────────────────────────────────
def check_retrieval() -> None:
    sv = _sv()
    if set(sv.RETRIEVAL_INELIGIBLE) != RETRIEVAL_INELIGIBLE:
        fail("retrieval-pins", "semantic_validate.RETRIEVAL_INELIGIBLE differs from verify_all's pin")
    allow = load("tokens/llm/component-allowlist.json")["sections"]
    for sid, c in sections_by_id().items():
        want = sid not in RETRIEVAL_INELIGIBLE
        got = c.get("retrievalEligible")
        if not isinstance(got, bool):
            fail("retrieval-pins", f"{sid}: retrievalEligible missing or not boolean")
        elif got is not want:
            fail("retrieval-pins", f"{sid}: retrievalEligible={got} but pinned to {want}")
        if not want and len(c.get("retrievalIneligibleReason") or "") < 30:
            fail("retrieval-pins", f"{sid}: ineligible without a 30+ character reason")
        if RUNTIME_UI.search(sid) and sid not in RETRIEVAL_INELIGIBLE:
            fail("retrieval-pins", f"{sid} looks like runtime UI but is not in RETRIEVAL_INELIGIBLE")
        entry = allow.get(c["$id"]) or {}
        if entry.get("retrievalEligible") is not want:
            fail("retrieval-pins", f"allowlist {c['$id']}: retrievalEligible={entry.get('retrievalEligible')} but pinned to {want}")


# ── 13. closed section contracts + R7 provenance ─────────────────────────────
def check_section_contracts() -> None:
    try:
        from jsonschema import Draft7Validator
    except ImportError:
        warn("section-contracts", "jsonschema not installed — closed contract schema skipped")
        Draft7Validator = None
    schema = load("schema/section-contract.schema.json")
    allow = load("tokens/llm/component-allowlist.json")["sections"]
    have_src = os.path.isdir(os.path.join(PROJECT, "src"))
    if not have_src:
        warn("section-contracts", "no sibling source tree — R7 source ranges not re-read (standalone copy)")
    v = Draft7Validator(schema) if Draft7Validator else None
    for sid, c in sections_by_id().items():
        if v:
            for e in v.iter_errors(c):
                fail("section-contracts", f"{sid}: {e.message[:140]}")
        src, sem = c.get("source") or {}, c.get("semantic") or {}
        if sem.get("id") != sid:
            fail("section-contracts", f"{sid}: semantic.id {sem.get('id')!r} must equal the contract id")
        if src.get("id") == sem.get("id"):
            fail("section-contracts", f"{sid}: source.id must not equal semantic.id")
        entry = allow.get(c["$id"]) or {}
        for k_allow, k_c in (("generatedAssetRoles", "generatedAssetRoles"),):
            if entry.get(k_allow) != c.get(k_c):
                fail("section-contracts", f"allowlist {c['$id']}.{k_allow} disagrees with the contract")
        if entry.get("semanticCategory") != sem.get("category"):
            fail("section-contracts", f"allowlist {c['$id']}.semanticCategory disagrees with semantic.category")
        if have_src and src.get("file") and src.get("lines"):
            target = os.path.join(PROJECT, src["file"])
            if not os.path.exists(target):
                fail("section-contracts", f"{sid}: source.file {src['file']} does not exist")
                continue
            lines = open(target, encoding="utf-8", errors="replace").read().split("\n")
            a, b = (int(x) for x in src["lines"].split("-"))
            if not (1 <= a <= b <= len(lines)):
                fail("section-contracts", f"{sid}: source.lines {src['lines']} outside {src['file']} ({len(lines)} lines)")
            elif f"<{src.get('tag')}" not in lines[a - 1]:
                fail("section-contracts", f"{sid}: <{src.get('tag')} is not on {src['file']}:{a}")


# ── 14. wrapper gate ─────────────────────────────────────────────────────────
def check_wrapper_gate() -> None:
    import wrapper_gate
    errors, warns = wrapper_gate.run(REPO)
    for e in errors:
        fail("wrapper-gate", e)
    for w in warns:
        warn("wrapper-gate", w)
    if (wrapper_gate.HERO_WARN_PX, wrapper_gate.HERO_ERROR_PX,
            wrapper_gate.SHARE_WARN, wrapper_gate.SHARE_ERROR) != (1800, 3000, 0.50, 0.60):
        fail("wrapper-gate", "wrapper gate thresholds differ from the pinned 1800 / 3000 / 50% / 60%")


# ── 15. token catalog in sync with the token files ───────────────────────────
def check_token_catalog() -> None:
    import build_token_catalog
    want = build_token_catalog.build()
    have = load("tokens/llm/token-catalog.json")
    if want != have:
        names_w = {t["name"] for t in want["tokens"]}
        names_h = {t["name"] for t in have.get("tokens", [])}
        fail("token-catalog", "tokens/llm/token-catalog.json differs from the token files "
             f"(missing {sorted(names_w - names_h)[:4]}, extra {sorted(names_h - names_w)[:4]}, "
             "or changed values) — re-run extraction/build_token_catalog.py")
    pol = load("tokens/llm/token-policy.json")
    if sorted(pol.get("semanticTokenRules") or {}) != sorted(TOKEN_RULES):
        fail("token-catalog", "token-policy semanticTokenRules differ from the enforced TOKEN_* rules")
    cats = {c.split(".")[0] for c in have.get("counts", {})}
    for k in pol.get("rawValueRestrictions") or {}:
        if k != "note" and k not in cats:
            fail("token-catalog", f"token-policy rawValueRestrictions key {k!r} is not a catalog category")
    sv = _sv()
    if list(sv.TOKEN_RULES) != TOKEN_RULES or list(sv.GENERATION_RULES) != GENERATION_RULES:
        fail("token-catalog", "semantic_validate rule lists differ from verify_all's")


# ── 16. generation patterns ──────────────────────────────────────────────────
def check_generation_patterns() -> None:
    pats = load("extraction/generation-patterns.json")
    cats = pats.get("categories") or {}
    want = {"BRAND", "PERSON", "CUSTOMER", "URL", "EMBED", "CLAIM", "COPY"}
    if set(cats) != want:
        fail("generation-patterns", f"categories {sorted(cats)} != {sorted(want)}")
    for k, v in cats.items():
        if v.get("rule") not in GENERATION_RULES:
            fail("generation-patterns", f"{k}: rule {v.get('rule')!r} is not an enforced GENERATION_MODE_* rule")
        for p in v.get("patterns") or []:
            if not p.get("evidence"):
                fail("generation-patterns", f"{k} pattern {p.get('pattern')!r} has no file:line evidence")
    if not (cats.get("COPY") or {}).get("hashes"):
        fail("generation-patterns", "no copy shingles")
    if not os.path.isdir(os.path.join(PROJECT, "src")):
        warn("generation-patterns", "no sibling source tree — patterns not rebuilt (standalone copy)")
        return
    import build_generation_patterns as bgp
    if bgp.build() != pats:
        fail("generation-patterns", "extraction/generation-patterns.json differs from what the real source "
             "produces — re-run extraction/build_generation_patterns.py")


# ── 17. generation examples, one per family ──────────────────────────────────
def check_generation_examples() -> None:
    try:
        from jsonschema import Draft7Validator
        v = Draft7Validator(load("schema/pagespec.schema.json"))
    except ImportError:
        v = None
    sv = _sv()
    tdoc = load("templates/templates.json")
    templates = tdoc["templates"]
    if tuple(tdoc.get("templateFamilies") or {}) != TEMPLATE_FAMILIES:
        fail("generation-examples", f"templateFamilies {list(tdoc.get('templateFamilies') or {})} != pinned {list(TEMPLATE_FAMILIES)}")
    for tid, t in templates.items():
        if t.get("family") not in TEMPLATE_FAMILIES:
            fail("generation-examples", f"{tid}: family {t.get('family')!r} not in the closed set")
        elif tid not in tdoc["templateFamilies"][t["family"]]:
            fail("generation-examples", f"{tid}: family {t['family']} does not list it")
    covered = set()
    for path in sorted(glob.glob(os.path.join(REPO, "schema", "examples", "*.json"))):
        spec = json.load(open(path, encoding="utf-8"))
        name = os.path.basename(path)
        errs = ([e.message for e in v.iter_errors(spec)] if v else []) + sv.validate(spec).errors
        if errs:
            fail("generation-examples", f"{name}: {errs[:2]}")
        if spec.get("mode") == "generation":
            covered.add((templates.get(spec.get("template")) or {}).get("family"))
        if name == "clone-home.pagespec.json":
            if spec.get("mode") != "clone":
                fail("generation-examples", "clone-home must be a clone-mode control")
            flipped = dict(spec, mode="generation")
            if not [e for e in sv.validate(flipped).errors if "GENERATION_MODE_" in e]:
                fail("generation-examples", "clone-home flipped to generation mode raised no GENERATION_MODE_* error")
    for fam in TEMPLATE_FAMILIES:
        if fam not in covered:
            fail("generation-examples", f"template family {fam!r} has no generation-mode example")
    if not os.path.exists(os.path.join(REPO, "schema", "examples", "clone-home.pagespec.json")):
        fail("generation-examples", "missing the real-content clone control schema/examples/clone-home.pagespec.json")


# ── 18. common-policy binding ────────────────────────────────────────────────
def check_policy_binding() -> None:
    import policy_hash
    m = load("registry.manifest.json")
    dp = m.get("designPolicy") or {}
    if not m.get("category"):
        fail("policy-binding", "registry.manifest.json has no category")
    ref = dp.get("ref")
    if not ref or not os.path.exists(os.path.join(REPO, ref)):
        fail("policy-binding", f"designPolicy.ref {ref!r} does not exist")
        return
    pol = load(ref)
    for k in ("policyId", "policyVersion", "commonIrVersion"):
        if dp.get(k) != pol.get(k):
            fail("policy-binding", f"designPolicy.{k} {dp.get(k)!r} != policy file {pol.get(k)!r}")
    if dp.get("commonIrVersion") != "0.5":
        fail("policy-binding", "commonIrVersion must be 0.5")
    if dp.get("enforcementMode") != "hard-and-soft":
        fail("policy-binding", "enforcementMode must be hard-and-soft")
    saas = (pol.get("classification") or {}).get("isSaaS")
    bound = (dp.get("policyId"), dp.get("policyVersion")) == SAAS_POLICY
    if saas and not bound:
        fail("policy-binding", "classification is SaaS but the SaaS common policy is not bound")
    if saas is False and bound:
        fail("policy-binding", "a non-SaaS repo must not bind the SaaS common policy")
    if saas and m.get("category") != "saas":
        fail("policy-binding", f"category {m.get('category')!r} disagrees with isSaaS")
    if not pol.get("classificationEvidence"):
        fail("policy-binding", "policy has no classificationEvidence")
    for rel in pol.get("enforcedBy") or []:
        if not os.path.exists(os.path.join(REPO, rel)):
            fail("policy-binding", f"enforcedBy {rel} does not exist")
            return
    if dp.get("contentHash") != policy_hash.compute(REPO):
        fail("policy-binding", "designPolicy.contentHash does not match the enforcedBy files "
             "(run extraction/policy_hash.py --write after an intended change)")


# ── 19. README, manifest and asset policy state the same rules ───────────────
README_BLOCK = re.compile(r"<!-- generation-policy:begin -->(.*?)<!-- generation-policy:end -->", re.S)


def check_policy_docs() -> None:
    roles = load("assets/asset-roles.json")
    gp = load("registry.manifest.json").get("generationPolicy") or {}
    readme = open(os.path.join(REPO, "README.md"), encoding="utf-8").read()
    m = README_BLOCK.search(readme)
    if not m:
        fail("policy-docs", "README.md has no <!-- generation-policy:begin/end --> block")
        return
    block = m.group(1)
    rows = dict(re.findall(r"^\|\s*`([a-z0-9.-]+)`\s*\|\s*`([a-z-]+)`\s*\|", block, re.M))
    reg = {rid: r.get("availability") for rid, r in roles["roles"].items()}
    if rows != reg:
        diff = sorted(k for k in set(rows) | set(reg) if rows.get(k) != reg.get(k))
        fail("policy-docs", f"README availability table disagrees with assets/asset-roles.json on {diff[:5]}")
    if (gp.get("roleAvailability") or {}) != reg:
        fail("policy-docs", "registry.manifest.json generationPolicy.roleAvailability disagrees with assets/asset-roles.json")
    modes_readme = re.findall(r"^- \*\*`([a-z]+)`\*\*", block, re.M)
    if sorted(modes_readme) != sorted(roles.get("modes") or {}) or sorted(gp.get("modes") or []) != sorted(roles.get("modes") or {}):
        fail("policy-docs", f"modes disagree: README {modes_readme}, manifest {gp.get('modes')}, asset-roles {sorted(roles.get('modes') or {})}")
    rules_readme = sorted(set(re.findall(r"GENERATION_MODE_[A-Z_]+", block)))
    if rules_readme != sorted(GENERATION_RULES) or sorted(gp.get("rules") or []) != sorted(GENERATION_RULES):
        fail("policy-docs", "GENERATION_MODE_* rule lists disagree between README, manifest and the validator")
    if gp.get("mustReuseExactValidIn") != "clone" or "must-reuse-exact" not in block or "clone mode" not in block:
        fail("policy-docs", "README / manifest do not both state that must-reuse-exact is valid only in clone mode")
    if sorted(gp.get("generationModeForbidden") or []) != sorted(roles.get("generationModeForbidden") or []):
        fail("policy-docs", "manifest generationModeForbidden disagrees with assets/asset-roles.json")
    for item in roles.get("generationModeForbidden") or []:
        if item not in block:
            fail("policy-docs", f"README does not list forbidden item {item!r}")


# ── 20. router coverage ──────────────────────────────────────────────────────
def check_router() -> None:
    app = os.path.join(PROJECT, "src", "App.jsx")
    routes_json = os.path.join(PROJECT, "src", "data", "routes.json")
    if not (os.path.exists(app) and os.path.exists(routes_json)):
        warn("router-coverage", "no sibling source tree — router not re-enumerated (standalone copy)")
        return
    rm = load("templates/route-map.json")["map"]
    served = json.load(open(routes_json, encoding="utf-8"))
    if sorted(served) != sorted(rm):
        fail("router-coverage", f"route-map and src/data/routes.json differ: {sorted(set(served) ^ set(rm))[:5]}")
    pats = re.findall(r'<Route\s+path="([^"]+)"\s+element=\{<(\w+)', open(app, encoding="utf-8").read())

    def score(p):
        if p == "*":
            return (-1, -1)
        segs = [s for s in p.split("/") if s]
        return (len(segs), sum(1 for s in segs if not s.startswith(":")))

    def match(p, r):
        if p == "*":
            return True
        ps, rs = [s for s in p.split("/") if s], [s for s in r.split("/") if s]
        return len(ps) == len(rs) and all(a.startswith(":") or a == b for a, b in zip(ps, rs))

    for r in rm:
        cands = sorted([(p, el) for p, el in pats if match(p, r)], key=lambda x: score(x[0]), reverse=True)
        if not cands:
            fail("router-coverage", f"{r} matches no <Route>")
        elif cands[0][1] == "PagePending":
            fail("router-coverage", f"{r} is served by PagePending ({cands[0][0]})")


CHECKS = [
    ("self-containment", check_self_containment),
    ("allowlist-parity", check_allowlist_parity),
    ("version-parity", check_version_parity),
    ("manifest-counts", check_manifest_counts),
    ("citations", check_citations),
    ("asset-roles", check_asset_roles),
    ("route-coverage", check_routes),
    ("graph-validator", check_graph_validator_agreement),
    ("example", check_example),
    ("asset-availability", check_asset_availability),
    ("retrieval-pins", check_retrieval),
    ("section-contracts", check_section_contracts),
    ("wrapper-gate", check_wrapper_gate),
    ("token-catalog", check_token_catalog),
    ("generation-patterns", check_generation_patterns),
    ("generation-examples", check_generation_examples),
    ("policy-binding", check_policy_binding),
    ("policy-docs", check_policy_docs),
    ("router-coverage", check_router),
]


def main() -> int:
    print(f"verify_all.py — {REPO}\n")
    for name, fn in CHECKS:
        before = len(failures)
        try:
            fn()
        except Exception as exc:  # a crashing check is a failing check
            fail(name, f"check raised {type(exc).__name__}: {exc}")
        status = "ok  " if len(failures) == before else "FAIL"
        print(f"  {status}  {name}")

    if warnings:
        print("\nWARNINGS (non-fatal)")
        for w in warnings:
            print(f"  warn  {w}")
    if failures:
        print(f"\nFAILURES ({len(failures)})")
        for f in failures:
            print(f"  FAIL  {f}")
        return 1
    print(f"\nAll {len(CHECKS)} checks pass"
          + (f" ({len(warnings)} warning(s))" if warnings else ""))
    return 0


if __name__ == "__main__":
    sys.exit(main())
