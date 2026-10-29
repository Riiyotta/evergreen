#!/usr/bin/env python3
"""Prove that extraction/verify_all.py's checks actually CATCH drift.

  python3 extraction/prove_drift.py --scratch <empty-or-new dir>

For every case: copy design-repo/ into <scratch>/<case>/, inject exactly ONE
bug, run verify_all.py there and require it to FAIL — and, where named, to fail
in the expected check. Cases marked `source` also copy the sibling clone source
(src/, index.html, tailwind.config.js, CLONE_SPEC*.md, ASSET_MANIFEST.md) next
to the scratch design-repo, because the checks that resolve real files degrade
to a warning without it (a drift proof run without the source would silently
prove nothing). `expect="pass"` cases prove a warning-only condition does NOT
fail the run. Finally the untouched repo must pass, both with its source and
fully isolated.

Exit 0 only if every injected bug was caught and the real repo is clean.
The absolute path below is a deliberate bad-path fixture (self-containment
check); this file is exempt from that check for that reason only.
"""

from __future__ import annotations

import argparse
import glob
import json
import os
import re
import shutil
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
PROJECT = os.path.dirname(REPO)
SOURCE_ITEMS = ["src", "index.html", "tailwind.config.js", "ASSET_MANIFEST.md"]


# ── helpers used by mutations (cwd = scratch design-repo) ────────────────────
def jload(p):
    with open(p, encoding="utf-8") as fh:
        return json.load(fh)


def jsave(p, d):
    with open(p, "w", encoding="utf-8") as fh:
        json.dump(d, fh, indent=2, ensure_ascii=False)


def edit_json(p, fn):
    d = jload(p)
    fn(d)
    jsave(p, d)


def edit_text(p, old, new, count=1):
    s = open(p, encoding="utf-8").read()
    if old not in s:
        raise RuntimeError(f"mutation anchor not found in {p}: {old[:60]!r}")
    open(p, "w", encoding="utf-8").write(s.replace(old, new, count))


def sh_nodes(d, tid):
    return d["sectionHeights"]["templates"][tid]["nodes"]


def _set_unit(tid, section, value, **match):
    def f():
        def g(d):
            n = next(n for n in sh_nodes(d, tid) if n["section"] == section and all(n.get(k) == v for k, v in match.items()))
            n["heightPx"] = value
        edit_json("extraction/measured-values.json", g)
    return f


CASES = []


def case(name, check=None, source=False, expect="fail"):
    def deco(fn):
        CASES.append((name, check, source, expect, fn))
        return fn
    return deco


# ── 1.0.0 cases, ported from scripts/prove_drift.sh ──────────────────────────
@case("allowlist parity: phantom entry", "allowlist-parity")
def _():
    edit_json("tokens/llm/component-allowlist.json",
              lambda d: d["sections"].__setitem__("sections.hero.does-not-exist", {"contract": "sections/nope.json"}))


@case("allowlist parity: orphaned contract", "allowlist-parity")
def _():
    edit_json("tokens/llm/component-allowlist.json", lambda d: d["sections"].pop(sorted(d["sections"])[0]))


@case("allowlist counts drift", "allowlist-parity")
def _():
    edit_json("tokens/llm/component-allowlist.json", lambda d: d["counts"].__setitem__("sections", d["counts"]["sections"] + 7))


@case("manifest counts hand-bumped", "manifest-counts")
def _():
    edit_json("registry.manifest.json", lambda d: d["counts"].__setitem__("templates", 99))


@case("allowlistVersion drift", "version-parity")
def _():
    edit_json("registry.manifest.json", lambda d: d.__setitem__("allowlistVersion", "9.9.9"))


@case("entryPoint pointing outside design-repo/", "self-containment")
def _():
    edit_json("registry.manifest.json", lambda d: d["entryPoints"].__setitem__("cloneSpec", "../CLONE_SPEC.md"))


@case("absolute machine path", "self-containment")
def _():
    edit_json("registry.manifest.json", lambda d: d["sourceProject"].__setitem__("path", "/" + "Users/someone/V3/evergreen"))


@case("out-of-range citation", "citations", source=True)
def _():
    p = sorted(glob.glob("sections/*.json"))[0]
    edit_json(p, lambda d: d.__setitem__("measuredFrom", "src/layout/Layout.jsx:90000-90001"))


@case("citation to a file that does not exist", "citations", source=True)
def _():
    p = sorted(glob.glob("sections/*.json"))[0]
    edit_json(p, lambda d: d.__setitem__("measuredFrom", "src/components/NotARealFile.jsx:1-5"))


@case("PINNED policy swapped to a DIFFERENT-BUT-VALID enum value", "asset-role-pinning")
def _():
    def g(d):
        rid = "person.likeness"
        d["roles"][rid]["generationPolicy"] = "may-generate-new"
    edit_json("assets/asset-roles.json", g)


@case("compliance-critical role removed from the pinned list", "asset-role-pinning")
def _():
    edit_json("assets/asset-roles.json", lambda d: d["pinnedPolicyValues"].pop(sorted(d["pinnedPolicyValues"])[0]))


@case("route-map count drift", "route-coverage")
def _():
    edit_json("templates/route-map.json", lambda d: d.__setitem__("routeCount", d["routeCount"] + 5))


@case("template routeCount disagrees with the route map", "route-coverage")
def _():
    edit_json("templates/templates.json", lambda d: d["templates"]["T-ARTICLE"].__setitem__("routeCount", 999))


@case("graph rule removed while the validator still enforces it", "graph-validator")
def _():
    edit_json("compatibility/graph.json",
              lambda d: d.__setitem__("rules", [r for r in d["rules"] if r["id"] != "GENERATION_MODE_COPY"]))


# ── R3 availability pins ─────────────────────────────────────────────────────
@case("registry availability loosened (person.likeness -> generation-safe)", "asset-availability")
def _():
    edit_json("assets/asset-roles.json", lambda d: d["roles"]["person.likeness"].__setitem__("availability", "generation-safe"))


@case("registry availability loosened together with its substitutes", "asset-availability")
def _():
    def g(d):
        d["roles"]["brand.logo"]["availability"] = "generation-safe"
        d["roles"]["brand.logo"]["generationSafeSubstitutes"] = []
    edit_json("assets/asset-roles.json", g)


@case("pin removed from verify_all.py", "asset-availability")
def _():
    edit_text("extraction/verify_all.py", '    "brand.logo": "clone-only",\n', "")


@case("pin removed from semantic_validate.py only", "asset-availability")
def _():
    edit_text("schema/semantic_validate.py", '    "brand.logo": "clone-only",\n', "")


@case("logo made generation-safe EVERYWHERE (registry + both pins) but still must-reuse-exact", "asset-availability")
def _():
    edit_json("assets/asset-roles.json", lambda d: d["roles"]["brand.logo"].__setitem__("availability", "generation-safe"))
    for p in ("extraction/verify_all.py", "schema/semantic_validate.py"):
        edit_text(p, '    "brand.logo": "clone-only",\n', '    "brand.logo": "generation-safe",\n')


@case("substitute pointing at a non-generation-safe role", "asset-availability")
def _():
    edit_json("assets/asset-roles.json",
              lambda d: d["roles"]["product.screenshot"].__setitem__("generationSafeSubstitutes", ["brand.logo"]))


@case("section lists a blocked role as generatedAssetRoles", "asset-availability")
def _():
    edit_json("sections/hero.home.json", lambda d: d["generatedAssetRoles"].append("person.likeness"))


# ── R8 retrieval pins ────────────────────────────────────────────────────────
@case("modal flipped eligible in contract + allowlist together", "retrieval-pins")
def _():
    edit_json("sections/chrome.trial-modal.json", lambda d: d.__setitem__("retrievalEligible", True))
    edit_json("tokens/llm/component-allowlist.json",
              lambda d: d["sections"]["sections.chrome.trial-modal"].__setitem__("retrievalEligible", True))


@case("content section marked ineligible in contract + allowlist", "retrieval-pins")
def _():
    def c(d):
        d["retrievalEligible"] = False
        d["retrievalIneligibleReason"] = "x" * 40
    edit_json("sections/content.faq.json", c)
    edit_json("tokens/llm/component-allowlist.json",
              lambda d: d["sections"]["sections.content.faq"].__setitem__("retrievalEligible", False))


@case("retrieval pin removed from semantic_validate.py", "retrieval-pins")
def _():
    edit_text("schema/semantic_validate.py", 'RETRIEVAL_INELIGIBLE = {"chrome.trial-modal", "chrome.announcement-banner"}',
              'RETRIEVAL_INELIGIBLE = {"chrome.trial-modal"}')


@case("ineligible reason shorter than 30 characters", "retrieval-pins")
def _():
    edit_json("sections/chrome.trial-modal.json", lambda d: d.__setitem__("retrievalIneligibleReason", "a modal"))


# ── R7 closed contracts + provenance ─────────────────────────────────────────
@case("unknown key added to a section contract", "section-contracts")
def _():
    edit_json("sections/hero.home.json", lambda d: d.__setitem__("inventedField", True))


@case("semantic.id differs from the contract id", "section-contracts")
def _():
    edit_json("sections/hero.home.json", lambda d: d["semantic"].__setitem__("id", "hero.something-else"))


@case("semantic.category outside the closed taxonomy", "section-contracts")
def _():
    edit_json("sections/feature.seeds.json", lambda d: d["semantic"].__setitem__("category", "MARKETING"))


@case("source range shifted off its tag", "section-contracts", source=True)
def _():
    def g(d):
        a, b = (int(x) for x in d["source"]["lines"].split("-"))
        d["source"]["lines"] = f"{a + 3}-{b}"
    edit_json("sections/content.faq.json", g)


@case("source range past the end of the file", "section-contracts", source=True)
def _():
    edit_json("sections/content.faq.json", lambda d: d["source"].__setitem__("lines", "7-9000"))


# ── R9 wrapper gate ──────────────────────────────────────────────────────────
@case("HERO measured at 3100px", "wrapper-gate")
def _():
    _set_unit("T-HOME", "hero.home", 3100)()


@case("HERO measured at 1900px warns but does not fail", "wrapper-gate", expect="pass")
def _():
    _set_unit("T-HOME", "hero.home", 1900)()


@case("one unit holding > 60% of its page", "wrapper-gate")
def _():
    _set_unit("T-ESG", "proof.sdg-goals", 6000)()


@case("measurement missing for a template node", "wrapper-gate")
def _():
    edit_json("extraction/measured-values.json",
              lambda d: d["sectionHeights"]["templates"]["T-CONTACT"]["nodes"].pop(1))


@case("measured at the wrong viewport", "wrapper-gate")
def _():
    edit_json("extraction/measured-values.json", lambda d: d["sectionHeights"]["viewport"].__setitem__("width", 1280))


@case("whitelist justification too short", "wrapper-gate")
def _():
    edit_json("extraction/wrapper-gate-whitelist.json", lambda d: d["entries"][0].__setitem__("justification", "fine"))


@case("whitelist agent reviewer without the attestation wording", "wrapper-gate")
def _():
    edit_json("extraction/wrapper-gate-whitelist.json", lambda d: d["entries"][0].__setitem__("reviewedBy", "agent review"))


@case("whitelisted unit grows past maxHeightPx", "wrapper-gate")
def _():
    _set_unit("T-COLLECTION-INDEX", "listing.link-card-grid", 9000)()


@case("stale whitelist entry", "wrapper-gate")
def _():
    _set_unit("T-COLLECTION-INDEX", "listing.link-card-grid", 3000)()


@case("gate threshold loosened in code", "wrapper-gate")
def _():
    edit_text("extraction/wrapper_gate.py", "HERO_ERROR_PX = 3000", "HERO_ERROR_PX = 4000")


# ── R10 tokens ───────────────────────────────────────────────────────────────
@case("token file changed without rebuilding the catalog", "token-catalog")
def _():
    edit_json("tokens/00-foundation/color.json", lambda d: d["siteWide"]["cream"].__setitem__("value", "#fffff4"))


@case("catalog entry deleted by hand", "token-catalog")
def _():
    edit_json("tokens/llm/token-catalog.json", lambda d: d["tokens"].pop(0))


@case("token policy drops a semantic token rule", "token-catalog")
def _():
    edit_json("tokens/llm/token-policy.json", lambda d: d["semanticTokenRules"].pop("TOKEN_RAW_COLOR"))


# ── R2 generation patterns ───────────────────────────────────────────────────
@case("brand pattern deleted from the registry", "generation-patterns", source=True)
def _():
    edit_json("extraction/generation-patterns.json",
              lambda d: d["categories"]["BRAND"]["patterns"].pop(0))


@case("copy shingle hashes truncated", "generation-patterns", source=True)
def _():
    edit_json("extraction/generation-patterns.json",
              lambda d: d["categories"]["COPY"].__setitem__("hashes", d["categories"]["COPY"]["hashes"][:10]))


@case("pattern evidence stripped (caught even standalone)", "generation-patterns")
def _():
    edit_json("extraction/generation-patterns.json",
              lambda d: d["categories"]["PERSON"]["patterns"][0].__setitem__("evidence", []))


# ── R4 examples ──────────────────────────────────────────────────────────────
@case("generation example for a family deleted", "generation-examples")
def _():
    os.remove("schema/examples/generated-legal.pagespec.json")


@case("generation example quietly switched to clone mode", "generation-examples")
def _():
    edit_json("schema/examples/generated-pricing.pagespec.json", lambda d: d.__setitem__("mode", "clone"))


@case("generation example leaks a real person", "generation-examples")
def _():
    def g(d):
        n = next(n for n in d["nodes"] if n["section"] == "story.hero-quote")
        n["content"]["authorName"] = "Emilia Vesa"
    edit_json("schema/examples/generated-customer-story.pagespec.json", g)


# ── policy binding ───────────────────────────────────────────────────────────
@case("policy-enforcing file changed without updating contentHash", "policy-binding")
def _():
    edit_text("schema/semantic_validate.py", "MODES = (", "# drift\nMODES = (")


@case("SaaS repo bound to a non-SaaS policy id", "policy-binding")
def _():
    edit_json("registry.manifest.json", lambda d: d["designPolicy"].__setitem__("policyId", "consumer-app-web"))


@case("manifest category disagrees with the classification", "policy-binding")
def _():
    edit_json("registry.manifest.json", lambda d: d.__setitem__("category", "consumer-app"))


@case("classification flipped to non-SaaS while bound to the SaaS policy", "policy-binding")
def _():
    edit_json("policy/design-policy.json", lambda d: d["classification"].__setitem__("isSaaS", False))


# ── README / manifest / asset policy agreement ───────────────────────────────
@case("README availability row disagrees", "policy-docs")
def _():
    edit_text("README.md", "| `person.likeness` | `blocked-for-generation` |", "| `person.likeness` | `clone-only` |")


@case("manifest roleAvailability disagrees", "policy-docs")
def _():
    edit_json("registry.manifest.json",
              lambda d: d["generationPolicy"]["roleAvailability"].__setitem__("brand.logo", "generation-safe"))


@case("README drops a generation rule", "policy-docs")
def _():
    edit_text("README.md", "`GENERATION_MODE_EMBED`, ", "")


@case("README drops the must-reuse-exact clone-only statement", "policy-docs")
def _():
    edit_text("README.md", "applies, and is valid only in clone mode.", "applies.")
    edit_text("README.md", "Real Evergreen assets in `clone-only` roles may be reused exactly; `must-reuse-exact`",
              "Real Evergreen assets in `clone-only` roles may be reused exactly; exact reuse")


@case("asset-roles forbidden list edited without README / manifest", "policy-docs")
def _():
    edit_json("assets/asset-roles.json", lambda d: d["generationModeForbidden"].pop())


# ── router coverage ──────────────────────────────────────────────────────────
@case("route served only by the PagePending placeholder", "router-coverage", source=True)
def _():
    r = "/employee-recognition/not-a-real-collection"
    edit_json("../src/data/routes.json", lambda d: d.append(r))

    def rm(d):
        d["map"][r] = "T-DETAIL-GLOSSARY"
        d["routeCount"] += 1
    edit_json("templates/route-map.json", rm)


@case("route-map lists a route the router data does not", "router-coverage", source=True)
def _():
    edit_json("templates/route-map.json", lambda d: d["map"].pop("/contact"))


# ── runner ───────────────────────────────────────────────────────────────────
def copy_source(dst_project: str) -> bool:
    if not os.path.isdir(os.path.join(PROJECT, "src")):
        return False
    for item in SOURCE_ITEMS:
        s = os.path.join(PROJECT, item)
        if os.path.isdir(s):
            shutil.copytree(s, os.path.join(dst_project, item))
        elif os.path.exists(s):
            shutil.copy2(s, dst_project)
    for p in glob.glob(os.path.join(PROJECT, "CLONE_SPEC*.md")):
        shutil.copy2(p, dst_project)
    return True


def run_verify(repo_dir: str):
    proc = subprocess.run([sys.executable, os.path.join("extraction", "verify_all.py")],
                          cwd=repo_dir, capture_output=True, text=True)
    return proc.returncode, proc.stdout + proc.stderr


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--scratch", required=True, help="empty (or new) directory for scratch copies")
    args = ap.parse_args()
    scratch = os.path.abspath(args.scratch)
    os.makedirs(scratch, exist_ok=True)
    if os.listdir(scratch):
        print(f"--scratch {scratch} is not empty; refusing to reuse it")
        return 2
    ignore = shutil.ignore_patterns("__pycache__", "*.pyc", ".DS_Store")
    passed = failed = 0
    have_source = os.path.isdir(os.path.join(PROJECT, "src"))
    print(f"prove_drift.py — {len(CASES)} injected cases (sibling source {'present' if have_source else 'ABSENT'})\n")
    for i, (name, check, needs_src, expect, fn) in enumerate(CASES, 1):
        proj = os.path.join(scratch, f"case{i:02d}")
        os.makedirs(proj)
        repo = os.path.join(proj, "design-repo")
        shutil.copytree(REPO, repo, ignore=ignore)
        if needs_src and not copy_source(proj):
            print(f"  skip  {name} — needs the sibling source, which is absent")
            continue
        cwd = os.getcwd()
        os.chdir(repo)
        try:
            fn()
        finally:
            os.chdir(cwd)
        code, out = run_verify(repo)
        fails = [ln for ln in out.splitlines() if ln.strip().startswith("FAIL")]
        if expect == "pass":
            ok = code == 0
            detail = "passes (warning only)" if ok else f"FAILED: {fails[:2]}"
        else:
            in_check = check is None or any(f"[{check}]" in ln for ln in fails)
            ok = code != 0 and in_check
            detail = (f"caught by {check}" if ok else
                      ("NOT caught — verify_all passed" if code == 0 else f"failed, but not in {check}: {fails[:2]}"))
        print(f"  {'ok  ' if ok else 'FAIL'}  {name} — {detail}")
        passed += ok
        failed += not ok

    print("\nControls on the untouched repo")
    proj = os.path.join(scratch, "control-with-source")
    os.makedirs(proj)
    shutil.copytree(REPO, os.path.join(proj, "design-repo"), ignore=ignore)
    if copy_source(proj):
        code, out = run_verify(os.path.join(proj, "design-repo"))
        print(f"  {'ok  ' if code == 0 else 'FAIL'}  untouched repo with its source passes")
        passed += code == 0
        failed += code != 0
    iso = os.path.join(scratch, "control-isolated", "design-repo")
    shutil.copytree(REPO, iso, ignore=ignore)
    code, out = run_verify(iso)
    print(f"  {'ok  ' if code == 0 else 'FAIL'}  untouched repo fully isolated (no sibling source) passes")
    passed += code == 0
    failed += code != 0

    print()
    if failed:
        print(f"RESULT: {failed} failure(s), {passed} pass(es)")
        return 1
    print(f"RESULT: all {passed} cases behaved as required (drift caught, controls clean)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
