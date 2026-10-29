#!/usr/bin/env python3
"""R9 whole-page-wrapper quality gate, run by extraction/verify_all.py.

Reads the MEASURED heights in extraction/measured-values.json -> sectionHeights
(written by extraction/measure_sections.mjs from the built clone at 1440px) and
the reviewed exceptions in extraction/wrapper-gate-whitelist.json.

Thresholds are pinned HERE, in code, not read from JSON:
  HERO > 1800px                         warn
  HERO > 3000px                         error unless whitelisted
  one in-flow unit > 50% of its page    warn
  one in-flow unit > 60% of its page    error unless whitelisted
  (share checks skip pages with < 3 in-flow units; SHELL / chrome.* is
   excluded; fixed / overlay elements take no page height)
  missing measurement, wrong viewport  error
A whitelisted hit still warns. A whitelist entry needs reviewedBy, a
justification of >= 30 characters and a maxHeightPx above the measured height;
an entry that no longer matches a hit (stale) or is exceeded (over cap) fails.

  python3 extraction/wrapper_gate.py      # standalone run
"""

from __future__ import annotations

import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)

VIEWPORT_WIDTH = 1440
HERO_WARN_PX = 1800
HERO_ERROR_PX = 3000
SHARE_WARN = 0.50
SHARE_ERROR = 0.60
MIN_INFLOW_UNITS = 3
AGENT_ATTESTATION = "agent attestation, not a human sign-off"


def _load(rel):
    with open(os.path.join(REPO, rel), encoding="utf-8") as fh:
        return json.load(fh)


def _category(contract: dict) -> str:
    sem = contract.get("semantic") or {}
    return sem.get("category") or contract.get("category", "").upper()


def run(repo: str = REPO):
    global REPO
    REPO = repo
    errors: list[str] = []
    warnings: list[str] = []
    templates = _load("templates/templates.json")["templates"]
    sh = (_load("extraction/measured-values.json").get("sectionHeights") or {})
    wl_doc = _load("extraction/wrapper-gate-whitelist.json")
    sections = {}
    for name in os.listdir(os.path.join(REPO, "sections")):
        if name.endswith(".json"):
            c = _load(f"sections/{name}")
            sections[c["$id"].replace("sections.", "", 1)] = c

    if (sh.get("viewport") or {}).get("width") != VIEWPORT_WIDTH:
        errors.append(f"sectionHeights viewport is {(sh.get('viewport') or {}).get('width')!r}, must be {VIEWPORT_WIDTH}")
    measured = sh.get("templates") or {}

    # whitelist hygiene
    wl = {}
    for e in wl_doc.get("entries") or []:
        key = (e.get("template"), e.get("section"), e.get("chapter"), e.get("rule"))
        if len(e.get("justification") or "") < 30:
            errors.append(f"whitelist {key}: justification shorter than 30 characters")
        rb = e.get("reviewedBy") or ""
        if not rb:
            errors.append(f"whitelist {key}: reviewedBy missing")
        elif "agent" in rb.lower() and AGENT_ATTESTATION not in rb:
            errors.append(f"whitelist {key}: an agent reviewer must say '{AGENT_ATTESTATION}'")
        if not isinstance(e.get("maxHeightPx"), (int, float)):
            errors.append(f"whitelist {key}: maxHeightPx missing")
        wl[key] = {"entry": e, "used": False}

    def whitelisted(tid, node, rule, height):
        key = (tid, node["section"], node.get("chapter"), rule)
        hit = wl.get(key)
        if not hit:
            return False
        hit["used"] = True
        if height > hit["entry"]["maxHeightPx"]:
            errors.append(f"{tid} {node['section']}: measured {height}px exceeds whitelist maxHeightPx "
                          f"{hit['entry']['maxHeightPx']} ({rule})")
        return True

    for tid, tpl in sorted(templates.items()):
        m = measured.get(tid)
        if not m:
            errors.append(f"{tid}: no sectionHeights measurement")
            continue
        nodes = m.get("nodes") or []
        flow_idx = [i for i, n in enumerate(tpl["nodes"]) if not n["section"].startswith("chrome.")]
        got_idx = {n.get("templateNodeIndex") for n in nodes if "heightPx" in n}
        for i in flow_idx:
            if i not in got_idx:
                errors.append(f"{tid}: node {i} ({tpl['nodes'][i]['section']}) has no measured height")
        for n in nodes:
            if "error" in n or not isinstance(n.get("heightPx"), (int, float)):
                errors.append(f"{tid}: {n.get('section')} measurement error {n.get('error')!r}")
            elif n.get("section", "").startswith("chrome."):
                errors.append(f"{tid}: SHELL section {n['section']} must not be an in-flow unit")
        page = m.get("documentHeightPx") or 0
        units = [n for n in nodes if isinstance(n.get("heightPx"), (int, float))]

        for n in units:
            c = sections.get(n["section"]) or {}
            h = n["heightPx"]
            label = n["section"] + (f" chapter {n['chapter']}" if n.get("chapter") else "")
            if _category(c) == "HERO":
                if h > HERO_ERROR_PX:
                    if whitelisted(tid, n, "HERO_HEIGHT", h):
                        warnings.append(f"{tid} {label}: HERO {h}px > {HERO_ERROR_PX}px (whitelisted)")
                    else:
                        errors.append(f"{tid} {label}: HERO {h}px > {HERO_ERROR_PX}px")
                elif h > HERO_WARN_PX:
                    warnings.append(f"{tid} {label}: HERO {h}px > {HERO_WARN_PX}px")
            if len(units) >= MIN_INFLOW_UNITS and page:
                share = h / page
                if share > SHARE_ERROR:
                    if whitelisted(tid, n, "SECTION_SHARE", h):
                        warnings.append(f"{tid} {label}: {share:.0%} of the page (whitelisted)")
                    else:
                        errors.append(f"{tid} {label}: {h}px is {share:.0%} of the {page}px page (> {SHARE_ERROR:.0%})")
                elif share > SHARE_WARN:
                    warnings.append(f"{tid} {label}: {share:.0%} of the page (> {SHARE_WARN:.0%})")

    for key, v in wl.items():
        if not v["used"]:
            errors.append(f"whitelist {key}: stale — no measured hit matches it any more")
    return errors, warnings


def main() -> int:
    errors, warnings = run()
    for w in warnings:
        print("  warn ", w)
    for e in errors:
        print("  FAIL ", e)
    print(f"wrapper gate: {len(errors)} error(s), {len(warnings)} warning(s)")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
