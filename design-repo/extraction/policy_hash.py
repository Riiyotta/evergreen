#!/usr/bin/env python3
"""Compute the designPolicy contentHash over the files the policy is enforced by.

  python3 extraction/policy_hash.py          # print the hash
  python3 extraction/policy_hash.py --write  # store it in registry.manifest.json

sha256 over policy/design-policy.json `enforcedBy`, in listed order, each file
contributing '<path>\\n' + its bytes + '\\n'. verify_all recomputes and compares.
"""
from __future__ import annotations

import hashlib
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)


def compute(repo: str = REPO) -> str:
    pol = json.load(open(os.path.join(repo, "policy", "design-policy.json"), encoding="utf-8"))
    h = hashlib.sha256()
    for rel in pol["enforcedBy"]:
        h.update(rel.encode() + b"\n")
        with open(os.path.join(repo, rel), "rb") as fh:
            h.update(fh.read())
        h.update(b"\n")
    return "sha256:" + h.hexdigest()


def main(argv) -> int:
    value = compute()
    if "--write" in argv:
        p = os.path.join(REPO, "registry.manifest.json")
        m = json.load(open(p, encoding="utf-8"))
        m["designPolicy"]["contentHash"] = value
        open(p, "w", encoding="utf-8").write(json.dumps(m, indent=2, ensure_ascii=False) + "\n")
    print(value)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
