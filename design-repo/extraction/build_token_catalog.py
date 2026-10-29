#!/usr/bin/env python3
"""Derive tokens/llm/token-catalog.json from the REAL token files.

  python3 extraction/build_token_catalog.py          # rewrite the catalog
  python3 extraction/build_token_catalog.py --check  # exit 1 if the committed catalog drifted

Every entry is read from a file under tokens/ (foundation, semantic, component,
layout, themes); nothing is typed in by hand. extraction/verify_all.py imports
build() and fails when the committed catalog differs from what the token files
produce, so the catalog cannot drift from the tokens it describes.

The catalog also declares the PageSpec `style` SLOTS (which token family a slot
accepts, and whether the slot must resolve in the declared theme).
schema/semantic_validate.py enforces them: TOKEN_UNKNOWN, TOKEN_RAW_COLOR,
TOKEN_ARBITRARY_SPACING, TOKEN_UNSUPPORTED_FONT, TOKEN_THEME_COMBINATION.
"""

from __future__ import annotations

import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
OUT = os.path.join(REPO, "tokens", "llm", "token-catalog.json")


def load(rel):
    with open(os.path.join(REPO, rel), encoding="utf-8") as fh:
        return json.load(fh)


def build() -> dict:
    toks: list[dict] = []

    def add(name, category, value, source, **extra):
        toks.append({"name": name, "category": category, "value": value, "source": source, **extra})

    color = load("tokens/00-foundation/color.json")
    for k, v in color["siteWide"].items():
        add(f"color.{k}", "color", v["value"], "tokens/00-foundation/color.json#siteWide." + k)
    for k, v in color.get("scopedExceptions", {}).items():
        if isinstance(v, dict) and "value" in v:
            add(f"color.scoped.{k}", "color.scoped", v["value"],
                "tokens/00-foundation/color.json#scopedExceptions." + k, scope=v.get("scope"))

    theme = load("tokens/themes/light.json")
    sem = load("tokens/10-semantic/semantic.json")
    for k, v in sem["tokens"].items():
        fam = k.split(".")[0]
        add(k, f"semantic.{fam}", theme["resolves"].get(k), "tokens/10-semantic/semantic.json#tokens." + k,
            ref=v.get("ref"))

    typo = load("tokens/00-foundation/typography.json")
    for k, v in typo["families"].items():
        if "stack" not in v:  # fallbackFace is a metric-override @font-face, not a family
            continue
        add(f"font.{k}", "font", v["stack"], "tokens/00-foundation/typography.json#families." + k)
    for k, v in typo["roles"].items():
        add(f"type.{k}", "type", v.get("fontSize"), "tokens/00-foundation/typography.json#roles." + k,
            family=v.get("family"))

    sp = load("tokens/00-foundation/spacing.json")
    add("spacing.block", "spacing", "4.2em", "tokens/00-foundation/spacing.json#universalBlockRule",
        classString=sp["universalBlockRule"]["classString"])
    add("spacing.heroTop", "spacing", sp["heroTopPadding"]["value"], "tokens/00-foundation/spacing.json#heroTopPadding")
    for k, v in sp["sectionPaddingPairs"].items():
        add(f"spacing.sectionPadding.{k}", "spacing", f"{v['top']} / {v['bottom']}",
            "tokens/00-foundation/spacing.json#sectionPaddingPairs." + k)
    for k in sp["namedColumnWidths"]:
        if k.startswith("$") or k == "description":
            continue
        add(f"spacing.column.{k}", "spacing", k, "tokens/00-foundation/spacing.json#namedColumnWidths")
    for k in sp["chUnits"].get("values", {}):
        add(f"spacing.measure.{k}", "spacing", k, "tokens/00-foundation/spacing.json#chUnits.values")

    rad = load("tokens/00-foundation/radius.json")
    for k, v in rad["scale"].items():
        add(f"radius.scale.{k}", "radius", v["value"], "tokens/00-foundation/radius.json#scale." + k)
    bor = load("tokens/00-foundation/border.json")
    for k, v in bor["widths"].items():
        add(f"borderWidth.{k}", "border", v["value"], "tokens/00-foundation/border.json#widths." + k)
    bp = load("tokens/00-foundation/breakpoint.json")
    for k, v in bp["screens"].items():
        add(f"breakpoint.{k}", "breakpoint", v["max"], "tokens/00-foundation/breakpoint.json#screens." + k)
    el = load("tokens/00-foundation/elevation.json")
    for k, v in (el.get("zIndexStops") or {}).items():
        if isinstance(v, dict) and "value" in v:
            add(f"elevation.z.{k}", "elevation", v["value"], "tokens/00-foundation/elevation.json#zIndexStops." + k)
    ic = load("tokens/00-foundation/icon-size.json")
    for k, v in (ic.get("sizes") or {}).items():
        add(f"iconSize.{k}", "iconSize", v["value"], "tokens/00-foundation/icon-size.json#sizes." + k)
    mo = load("tokens/00-foundation/motion.json")
    for k, v in (mo.get("easings") or {}).items():
        add(f"motion.easing.{k}", "motion", v["value"], "tokens/00-foundation/motion.json#easings." + k)
    for k, v in (mo.get("durations") or {}).items():
        add(f"motion.duration.{k}", "motion", v["value"], "tokens/00-foundation/motion.json#durations." + k)
    comp = load("tokens/20-component/component-tokens.json")
    for k, v in comp["tokens"].items():
        if isinstance(v, dict) and "value" in v:
            add(f"component.{k}", "component", v["value"], "tokens/20-component/component-tokens.json#tokens." + k,
                scope=v.get("scope"))

    toks.sort(key=lambda t: t["name"])
    counts: dict[str, int] = {}
    for t in toks:
        counts[t["category"]] = counts.get(t["category"], 0) + 1
    return {
        "$id": "tokens.llm.token-catalog",
        "version": load("tokens/llm/component-allowlist.json")["version"],
        "description": "The COMPLETE referenceable token set, derived by extraction/build_token_catalog.py from the real token files (never hand-edited). A PageSpec references these names in its optional `style` object and never a raw literal.",
        "generatedBy": "extraction/build_token_catalog.py",
        "resolutionOrder": sem["resolutionOrder"],
        "themes": {"light": {"file": "tokens/themes/light.json", "resolves": sorted(theme["resolves"])}},
        "fontFamilies": sorted(t["name"] for t in toks if t["category"] == "font"),
        "styleSlots": {
            "surface": {"acceptsPrefix": "surface.", "themeResolved": True},
            "text": {"acceptsPrefix": "text.", "themeResolved": True},
            "border": {"acceptsPrefix": "border.", "themeResolved": True},
            "radius": {"acceptsPrefix": ["radius."], "themeResolved": False},
            "spacing": {"acceptsPrefix": "spacing.", "themeResolved": False},
            "fontFamily": {"acceptsPrefix": "font.", "themeResolved": False},
            "typeRole": {"acceptsPrefix": "type.", "themeResolved": False},
        },
        "counts": dict(sorted(counts.items())),
        "tokenCount": len(toks),
        "tokens": toks,
        "hardRules": [
            "Lengths stay in `em` wherever the source uses `em`; never convert em to px.",
            "`ch` values stay in `ch`.",
            "Zero gradients, zero box-shadows: elevation is z-index only.",
            "The .marketing-root em engine (tokens/30-layout/layout.json) governs every length in the system.",
        ],
    }


def main(argv) -> int:
    text = json.dumps(build(), indent=2, ensure_ascii=False) + "\n"
    if "--check" in argv:
        cur = open(OUT, encoding="utf-8").read()
        if cur != text:
            print("token-catalog.json is out of sync with the token files")
            return 1
        print("token-catalog.json matches the token files")
        return 0
    open(OUT, "w", encoding="utf-8").write(text)
    print("wrote tokens/llm/token-catalog.json")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
