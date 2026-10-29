#!/usr/bin/env python3
"""Derive the generation-mode leakage patterns from the REAL clone source.

  python3 extraction/build_generation_patterns.py          # (re)write extraction/generation-patterns.json
  python3 extraction/build_generation_patterns.py --check  # exit 1 if the committed file drifted

Every literal pattern carries file:line evidence found by searching the real
sources (src/, index.html, CLONE_SPEC*.md, ASSET_MANIFEST.md). A seed term that
cannot be found in any source aborts the build: nothing here is invented.

Categories (one semantic-validator rule each, GENERATION_MODE_<CATEGORY>):
  BRAND     source brand / product names and their domains
  PERSON    real people quoted or pictured (name fields followed by a role)
  CUSTOMER  real customer / partner companies (company / logo fields, "<X> logo" alts)
  URL       source domains (generation mode additionally allows ONLY .example / .invalid)
  EMBED     third-party embeds and kits the clone references
  CLAIM     real numeric / factual claims (trees, users, ratings, prices, trial length)
  COPY      the real site copy as hashed, normalised 5-word shingles
Asset files are matched by filename from assets/asset-roles.json (not here).

Strings are normalised before hashing or matching (normalise() below): NFKC,
zero-width characters removed, curly quotes straightened, every dash/minus
folded to '-', lower-cased, whitespace collapsed. semantic_validate.py imports
the SAME normalise() / shingles() from this file so build and check can never
disagree. Detection is string-based: paraphrase is not detected.

The three placeholder-prose modules (src/data/placeholderProse.js,
src/data/fillLines.js, src/data/placeholder.js) are excluded from COPY: their
own headers state that none of their text is from the original site.
"""

from __future__ import annotations

import glob
import hashlib
import json
import os
import re
import sys
import unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
PROJECT = os.path.dirname(REPO)
OUT = os.path.join(HERE, "generation-patterns.json")

ZERO_WIDTH = dict.fromkeys(map(ord, "​‌‍⁠﻿­"), None)
QUOTES = {ord(c): "'" for c in "‘’‚‛′´`"}
QUOTES.update({ord(c): '"' for c in "“”„‟″«»"})
DASHES = {ord(c): "-" for c in "‐‑‒–—―−﹘﹣－"}

STOPWORDS = set("""a an the and or but if of to in on at by for with from as is are was were be been being it its
this that these those you your we our they their he she his her i me my us them not no so do does did can will would
should could have has had into than then there here what which who whom when where why how all any each every more most
some such only own same just also very up out about over after before while""".split())

COPY_EXCLUDE = {
    "src/data/placeholderProse.js",
    "src/data/fillLines.js",
    "src/data/placeholder.js",
}

# Seed terms. Each MUST be found in a real source file or the build aborts.
BRAND_SEEDS = ["Evergreen", "evergreen.so", "app.evergreen.so", "Arketta", "arketta.app"]
EMBED_SEEDS = ["calendly.com", "assets.calendly.com", "use.typekit.net", "ivypresto-headline", "veritree.com"]
CLAIM_SEEDS = [
    "500 000 trees planted", "8000+ users", "300,000+ recognitions", "100,000+ recognitions",
    "20,000 trees planted", "4.8 / 5 on G2", "$3.99", "14 Day Trial", "30% off from your first year",
]
PLATFORM_ALT = {"slack", "teams", "webex", "mattermost", "g2", "g2 review"}
GENERIC_ALT = {"planting tree", "user recognition", "organisation"}


def normalise(text: str) -> str:
    t = unicodedata.normalize("NFKC", str(text))
    t = t.translate(ZERO_WIDTH).translate(QUOTES).translate(DASHES)
    t = t.lower()
    return re.sub(r"\s+", " ", t).strip()


def tokens(text: str) -> list[str]:
    return re.findall(r"[a-z0-9]+", normalise(text))


def claim_key(text: str) -> str:
    """Normalised claim form: digit-group separators (space / comma / thin
    space) between digits removed, so '500 000' == '500,000' == '500000'."""
    t = normalise(text)
    t = re.sub(r"(?<=\d)[ ,. ](?=\d{3}\b)", "", t)
    return re.sub(r"\s+", " ", t)


def shingle_hash(words: list[str]) -> str:
    return hashlib.sha256(" ".join(words).encode()).hexdigest()[:16]


def shingles(text: str) -> list[tuple[str, str]]:
    """(hash, shingle) for every 5-token window that is not stopword-dominated."""
    toks = tokens(text)
    out = []
    for i in range(len(toks) - 4):
        w = toks[i:i + 5]
        if sum(1 for x in w if x in STOPWORDS) >= 4:
            continue
        if sum(1 for x in w if x.isdigit()) >= 3:
            continue
        out.append((shingle_hash(w), " ".join(w)))
    return out


# ── source discovery ─────────────────────────────────────────────────────────
def source_files(kind: str) -> list[str]:
    rels = []
    if kind in ("code", "all"):
        for ext in ("jsx", "js"):
            rels += [os.path.relpath(p, PROJECT) for p in glob.glob(os.path.join(PROJECT, "src", "**", f"*.{ext}"), recursive=True)]
        if os.path.exists(os.path.join(PROJECT, "index.html")):
            rels.append("index.html")
    if kind == "all":
        rels += [os.path.relpath(p, PROJECT) for p in glob.glob(os.path.join(PROJECT, "CLONE_SPEC*.md"))]
        if os.path.exists(os.path.join(PROJECT, "ASSET_MANIFEST.md")):
            rels.append("ASSET_MANIFEST.md")
    return sorted(set(rels))


def read_lines(rel: str) -> list[str]:
    return open(os.path.join(PROJECT, rel), encoding="utf-8", errors="replace").read().split("\n")


def find_evidence(term: str, files: list[str], limit: int = 3, word: bool = True) -> list[str]:
    pat = re.compile((r"(?<![a-z0-9])" + re.escape(normalise(term)) + r"(?![a-z0-9])") if word
                     else re.escape(normalise(term)))
    hits = []
    for rel in files:
        for n, line in enumerate(read_lines(rel), 1):
            if pat.search(normalise(line)):
                hits.append(f"{rel}:{n}")
                if len(hits) >= limit:
                    return hits
    return hits


# ── extraction ──────────────────────────────────────────────────────────────
NAME_FIELD = re.compile(r"""\bname:\s*['"]([^'"]+)['"]""")
COMPANY_FIELD = re.compile(r"""\bcompany:\s*['"]([^'"]+)['"]""")
ALT_LOGO = re.compile(r"""alt[:=]\s*['"]([^'"]+?) logo['"]""", re.I)


def extract_people_and_customers(files: list[str]):
    people, customers = {}, {}
    for rel in files:
        lines = read_lines(rel)
        for i, line in enumerate(lines):
            m = NAME_FIELD.search(line)
            if m:
                window = " ".join(lines[i + 1:i + 4])
                val = m.group(1).strip()
                if re.search(r"\brole:", window) and len(val.split()) >= 2:
                    people.setdefault(val, []).append(f"{rel}:{i + 1}")
                elif re.search(r"\blogo", window):
                    customers.setdefault(val, []).append(f"{rel}:{i + 1}")
            m = COMPANY_FIELD.search(line)
            if m:
                customers.setdefault(m.group(1).strip(), []).append(f"{rel}:{i + 1}")
            for m in ALT_LOGO.finditer(line):
                val = m.group(1).strip()
                if val.lower() in PLATFORM_ALT or val.lower() in GENERIC_ALT:
                    continue
                customers.setdefault(val, []).append(f"{rel}:{i + 1}")
    return people, customers


COMMENT_BLOCK = re.compile(r"/\*.*?\*/", re.S)
COMMENT_LINE = re.compile(r"(^|[\s;{}(),])//[^\n]*")
CLASS_ATTR = re.compile(r"""className=(\{`[^`]*`\}|"[^"]*"|\{[^}]*\})""", re.S)
INLINE_TAG = re.compile(r"</?(strong|em|b|i|sub|sup|span|a)(\s[^<>]*)?>|<br\s*/?>", re.S)
STRING_LIT = re.compile(r"""'((?:[^'\\\n]|\\.)*)'|"((?:[^"\\\n]|\\.)*)"|`([^`]*)`""", re.S)
JSX_TEXT = re.compile(r">([^<>{}]+)<", re.S)
CLASSY = re.compile(r"(\b(?:mx|my|mt|mb|ml|mr|px|py|pt|pb|w|h|text|flex|max-wf-[a-z]+):|-\[|^/|\.(?:jsx?|svg|webp|png|css)$|^[\w-]+$)")


def copy_segments(rel: str):
    raw = open(os.path.join(PROJECT, rel), encoding="utf-8", errors="replace").read()

    def blank(m):  # keep line numbering stable
        return re.sub(r"[^\n]", " ", m.group(0))

    text = COMMENT_BLOCK.sub(blank, raw)
    text = COMMENT_LINE.sub(lambda m: m.group(1) + " " * (len(m.group(0)) - len(m.group(1))), text)
    text = CLASS_ATTR.sub(blank, text)
    text = INLINE_TAG.sub(lambda m: " " * len(m.group(0)) if "\n" not in m.group(0) else blank(m), text)
    segs = []
    for m in STRING_LIT.finditer(text):
        s = next(g for g in m.groups() if g is not None)
        if len(s.split()) >= 5 and not CLASSY.search(s.strip()) and "${" not in s:
            segs.append((text.count("\n", 0, m.start()) + 1, s))
    for m in JSX_TEXT.finditer(text):
        s = m.group(1)
        if len(s.split()) >= 5:
            segs.append((text.count("\n", 0, m.start()) + 1, s))
    return segs


def build() -> dict:
    code = source_files("code")
    every = source_files("all")
    if not code:
        raise SystemExit("no sibling src/ — this is a build step that needs the clone source")

    def seeded(seeds, word=True):
        out = {}
        for s in seeds:
            ev = find_evidence(s, every, word=word)
            if not ev:
                raise SystemExit(f"seed {s!r} not found in any real source — refusing to invent it")
            out[s] = ev
        return out

    brand = seeded(BRAND_SEEDS)
    embed = seeded(EMBED_SEEDS)
    claims = {}
    for s in CLAIM_SEEDS:
        ev = find_evidence(s, every, word=False)
        if not ev:
            raise SystemExit(f"claim {s!r} not found in any real source")
        claims[s] = {"key": claim_key(s), "evidence": ev}
    people, customers = extract_people_and_customers(code)

    domains = {}
    dom_re = re.compile(r"\b((?:[a-z0-9-]+\.)+(?:so|com|app|io|net|org|fi))\b")
    for rel in every:
        for n, line in enumerate(read_lines(rel), 1):
            for d in dom_re.findall(normalise(line)):
                d = d[4:] if d.startswith("www.") else d
                domains.setdefault(d, [])
                if len(domains[d]) < 3:
                    domains[d].append(f"{rel}:{n}")

    hashes, per_file, segments = set(), {}, 0
    for rel in code:
        if rel in COPY_EXCLUDE:
            continue
        for _line, seg in copy_segments(rel):
            if "[placeholder" in seg.lower():
                continue
            hs = shingles(seg)
            if not hs:
                continue
            segments += 1
            per_file[rel] = per_file.get(rel, 0) + 1
            hashes.update(h for h, _ in hs)

    def lit(d):
        return [{"pattern": k, "normalised": normalise(k), "evidence": v[:3]} for k, v in sorted(d.items())]

    return {
        "$id": "extraction.generation-patterns",
        "version": "2.0.0",
        "description": "Generation-mode leakage registry, DERIVED by extraction/build_generation_patterns.py from the real clone source. Do not hand-edit: re-run the builder; extraction/verify_all.py (when the sibling source is present) rebuilds it and fails on any difference.",
        "humanReview": "NOT human-reviewed. Every pattern was derived by a script with file:line evidence; no person has audited the lists for completeness.",
        "detection": "String-based after normalisation (NFKC, zero-width removal, straight quotes, dash folding, lower-case, whitespace collapse). Paraphrased or translated source copy is NOT detected.",
        "normalisation": ["NFKC", "remove U+200B/U+200C/U+200D/U+2060/U+FEFF/U+00AD", "curly quotes -> straight", "U+2010-U+2015/U+2212 dashes -> '-'", "lower-case", "collapse whitespace"],
        "sources": every,
        "categories": {
            "BRAND": {"rule": "GENERATION_MODE_BRAND", "patterns": lit(brand)},
            "PERSON": {"rule": "GENERATION_MODE_PERSON", "patterns": lit(people)},
            "CUSTOMER": {"rule": "GENERATION_MODE_CUSTOMER", "patterns": lit(customers)},
            "URL": {"rule": "GENERATION_MODE_URL",
                    "allowedDomainSuffixes": [".example", ".invalid"],
                    "note": "In generation mode EVERY domain / URL / e-mail must end in a reserved .example or .invalid name; the source domains below are listed for evidence and are rejected in any form.",
                    "patterns": lit(domains)},
            "EMBED": {"rule": "GENERATION_MODE_EMBED", "patterns": lit(embed),
                      "alsoRejected": ["<iframe", "<script"]},
            "CLAIM": {"rule": "GENERATION_MODE_CLAIM",
                      "patterns": [{"pattern": k, "normalised": v["key"], "evidence": v["evidence"]} for k, v in sorted(claims.items())]},
            "COPY": {"rule": "GENERATION_MODE_COPY",
                     "algorithm": "sha256 over the space-joined normalised 5-token window, first 16 hex chars; windows with >=4 stopwords or >=3 numeric tokens are skipped",
                     "shingleSize": 5,
                     "excludedFiles": sorted(COPY_EXCLUDE),
                     "segmentCount": segments,
                     "segmentsPerFile": dict(sorted(per_file.items())),
                     "hashCount": len(hashes),
                     "hashes": sorted(hashes)},
        },
    }


def main(argv) -> int:
    if not os.path.isdir(os.path.join(PROJECT, "src")):
        print("build_generation_patterns: no sibling src/ — skipped (build step only)")
        return 0
    data = build()
    text = json.dumps(data, indent=1, ensure_ascii=False) + "\n"
    if "--check" in argv:
        cur = open(OUT, encoding="utf-8").read() if os.path.exists(OUT) else ""
        if cur != text:
            print("generation-patterns.json is out of date with the real source (re-run the builder)")
            return 1
        print("generation-patterns.json matches the real source")
        return 0
    open(OUT, "w", encoding="utf-8").write(text)
    c = data["categories"]
    print("wrote", os.path.relpath(OUT, REPO), {k: len(v.get("patterns", [])) for k, v in c.items() if k != "COPY"},
          "copy shingles:", c["COPY"]["hashCount"])
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
