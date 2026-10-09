#!/usr/bin/env python3
"""Repo-level verification for the Evergreen-clone design-repo.

Every check here is drift-proofed: it recomputes a fact from the files on disk
rather than trusting a number written into a file. Each is proven to actually
catch drift by scripts/prove_drift.sh, which injects the bug into a scratch
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

Exit code 0 only if every check passes.
"""

from __future__ import annotations

import glob
import json
import os
import re
import sys

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
        "scripts/prove_drift.sh",
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
