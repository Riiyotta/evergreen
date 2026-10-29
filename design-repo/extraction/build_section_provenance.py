#!/usr/bin/env python3
"""Write the R7 `source` / `semantic` objects and the R8 `retrievalEligible`
flag into every section contract.

  python3 extraction/build_section_provenance.py          # rewrite contracts
  python3 extraction/build_section_provenance.py --check  # exit 1 on drift

`source` is provenance: WHERE the rendered DOM comes from (file, line range,
and the tag that opens the range). It is derived from the real file, never
typed by hand: by default the first JSX/HTML tag inside the contract's
`measuredFrom` range. When that range is a doc comment or a stylesheet (no tag
in it), the range opened by the component's own rendered root is used instead
(SOURCE_OVERRIDES below, each with a reason). extraction/verify_all.py re-reads
every range and fails unless `<tag` appears on the first cited line.

`semantic` is taxonomy: WHAT the AI sees. `semantic.id` equals the contract id;
`semantic.category` comes from SEMANTIC_CATEGORY below, never from a wrapper
class name. Conversion blocks (demo, contact, referral, lead magnet) are
CONVERSION; editorial blocks are never FEATURES.

Needs the sibling clone source (../src) — this is a build step, not a check a
standalone copy can run; --check degrades to a skip without it.
"""

from __future__ import annotations

import glob
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
PROJECT = os.path.dirname(REPO)

SEMANTIC_CATEGORY = {
    "chrome": "SHELL",
    "hero": "HERO",
    "content": "CONTENT",
    "conversion": "CONVERSION",
    "form": "CONVERSION",
    "feature": "FEATURES",
    "listing": "LISTING",
    "proof": "PROOF",
    "pricing": "PRICING",
    "story": "EDITORIAL",
    "structure": "STRUCTURE",
}
SEMANTIC_CATEGORIES = sorted(set(SEMANTIC_CATEGORY.values()))

# Contract id -> (file, first line, last line) where the measuredFrom range has
# no rendered tag. Each range opens on the component's rendered root.
SOURCE_OVERRIDES = {
    "chrome.footer": ("src/components/Footer.jsx", 121, 210,
                      "measuredFrom cites the header comment; the range here opens on Footer()'s rendered root"),
    "chrome.nav": ("src/components/Nav.jsx", 42, 150,
                   "measuredFrom cites the header comment; the range here opens on Nav()'s rendered root"),
    "content.rich-text": ("src/components/RichText.jsx", 13, 17,
                          "measuredFrom cites the .marketing-rich-text stylesheet; the range here is the one shared prose container element"),
    "conversion.arketta-cross-promo": ("src/components/ArkettaCtaPanel.jsx", 42, 58,
                                       "the first tag inside measuredFrom is a <br> in a doc comment; the range here opens on the panel root"),
    "hero.ebook-lede": ("src/pages/EbookPage.jsx", 32, 68,
                        "measuredFrom cites the page comment; the range here opens on the hero block inside the ebook wrapper"),
    "hero.home": ("src/components/Hero.jsx", 127, 264,
                  "measuredFrom cites the data constants; hero.home is Hero() blocks 0-6 (block 7 onward is proof.social-proof-stack)"),
    "hero.partner": ("src/pages/PartnerPage.jsx", 179, 239,
                     "measuredFrom cites the page comment; hero.partner is section 1 blocks 1-6 (the display h2 onward is proof.social-proof-stack)"),
    "listing.blog-rows": ("src/pages/BlogIndex.jsx", 45, 58,
                          "measuredFrom cites the row data; the range here opens on the rows block"),
}

# R8 — runtime / utility UI that must never be retrieved as a composable section.
RETRIEVAL_INELIGIBLE = {
    "chrome.trial-modal": "A modal dialog (slide-over overlay) opened by every trial button and rendered by Layout outside the section flow; it is runtime UI, not page content, and must never be retrieved as a section.",
    "chrome.announcement-banner": "A site-wide promotional announcement bar injected by Layout on / and /blog/:slug only; it is runtime chrome that is toggled per route, not page content, and must never be retrieved as a section.",
}

TAG = re.compile(r"<([A-Za-z][\w.]*)")


def first_tag(path: str, start: int, end: int):
    lines = open(path, encoding="utf-8").read().split("\n")
    for i in range(start, min(end, len(lines)) + 1):
        m = TAG.search(lines[i - 1])
        if m:
            return i, m.group(1)
    return None


def build(contract: dict) -> dict:
    cid = contract["$id"].replace("sections.", "", 1)
    if cid in SOURCE_OVERRIDES:
        rel, a, b, _why = SOURCE_OVERRIDES[cid]
        hit = first_tag(os.path.join(PROJECT, rel), a, a)
        if not hit:
            raise SystemExit(f"{cid}: override {rel}:{a} has no tag on its first line")
        line, tag = hit
    else:
        rel, rng = contract["measuredFrom"].split(":")
        a, b = (rng.split("-") + [rng])[:2]
        a, b = int(a), int(b)
        hit = first_tag(os.path.join(PROJECT, rel), a, b)
        if not hit:
            raise SystemExit(f"{cid}: no tag in {contract['measuredFrom']} and no override")
        line, tag = hit
    base = os.path.splitext(os.path.basename(rel))[0]
    return {
        "source": {
            "id": f"src:{base}:{tag}@{line}",
            "tag": tag,
            "file": rel,
            "lines": f"{line}-{b}",
        },
        "semantic": {
            "id": cid,
            "category": SEMANTIC_CATEGORY[contract["category"]],
        },
        "retrievalEligible": cid not in RETRIEVAL_INELIGIBLE,
        **({"retrievalIneligibleReason": RETRIEVAL_INELIGIBLE[cid]}
           if cid in RETRIEVAL_INELIGIBLE else {}),
    }


def main(argv) -> int:
    check = "--check" in argv
    if not os.path.isdir(os.path.join(PROJECT, "src")):
        print("build_section_provenance: no sibling src/ — skipped (build step only)")
        return 0
    drift = []
    for path in sorted(glob.glob(os.path.join(REPO, "sections", "*.json"))):
        contract = json.load(open(path, encoding="utf-8"))
        want = build(contract)
        if check:
            for k, v in want.items():
                if contract.get(k) != v:
                    drift.append(f"{os.path.basename(path)}: {k} differs from the derived value")
            continue
        contract.pop("retrievalIneligibleReason", None)
        contract.update(want)
        with open(path, "w", encoding="utf-8") as fh:
            fh.write(json.dumps(contract, indent=2, ensure_ascii=False) + "\n")
    if check:
        for d in drift:
            print("  DRIFT", d)
        return 1 if drift else 0
    print("provenance written")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
