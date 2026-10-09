#!/usr/bin/env bash
# Prove that extraction/verify_all.py's checks actually CATCH drift.
#
# A check that has only ever been run against a correct repo might not be
# checking anything at all. So for each check: copy the repo to a scratch dir,
# inject exactly one bug, confirm verify_all.py FAILS, then confirm the real
# repo still PASSES.
#
# The asset-role case is the important one. It mutates a compliance-critical
# role to a DIFFERENT-BUT-STILL-VALID enum value — the exact case a
# membership-in-a-closed-set check cannot catch, and the one that matters most
# because the source is a real company with real trademarks and real people's
# photographs.
#
# Usage:  bash scripts/prove_drift.sh
# Exit 0 only if every injected bug was caught and the real repo is clean.

set -uo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PASS=0
FAIL=0

note() { printf '  %-4s %s\n' "$1" "$2"; }

# Run verify_all in a scratch copy after applying a mutation.
# $1 = human name, $2 = python snippet mutating the copy (cwd = scratch repo)
expect_failure() {
  local name="$1" mutation="$2"
  local tmp
  tmp="$(mktemp -d)"
  cp -R "$REPO" "$tmp/design-repo"
  ( cd "$tmp/design-repo" && python3 - <<PYEOF
$mutation
PYEOF
  ) >/dev/null 2>&1
  if (cd "$tmp/design-repo" && python3 extraction/verify_all.py) >/dev/null 2>&1; then
    note FAIL "$name — bug injected but verify_all.py still PASSED"
    FAIL=$((FAIL + 1))
  else
    note ok "$name — caught"
    PASS=$((PASS + 1))
  fi
  rm -rf "$tmp"
}

echo "prove_drift.sh — injecting one bug at a time into a scratch copy"
echo

expect_failure "allowlist parity: phantom entry" '
import json
p="tokens/llm/component-allowlist.json"
d=json.load(open(p))
d["sections"]["sections.hero.does-not-exist"]={"contract":"sections/nope.json"}
json.dump(d,open(p,"w"),indent=2)
'

expect_failure "allowlist parity: orphaned contract" '
import json
p="tokens/llm/component-allowlist.json"
d=json.load(open(p))
k=sorted(d["sections"])[0]
del d["sections"][k]
json.dump(d,open(p,"w"),indent=2)
'

expect_failure "allowlist counts drift" '
import json
p="tokens/llm/component-allowlist.json"
d=json.load(open(p))
d["counts"]["sections"]=d["counts"]["sections"]+7
json.dump(d,open(p,"w"),indent=2)
'

expect_failure "manifest counts hand-bumped" '
import json
p="registry.manifest.json"
d=json.load(open(p))
d["counts"]["templates"]=99
json.dump(d,open(p,"w"),indent=2)
'

expect_failure "allowlistVersion drift" '
import json
p="registry.manifest.json"
d=json.load(open(p))
d["allowlistVersion"]="9.9.9"
json.dump(d,open(p,"w"),indent=2)
'

expect_failure "entryPoint pointing outside design-repo/" '
import json
p="registry.manifest.json"
d=json.load(open(p))
d["entryPoints"]["cloneSpec"]="../CLONE_SPEC.md"
json.dump(d,open(p,"w"),indent=2)
'

expect_failure "absolute machine path" '
import json
p="registry.manifest.json"
d=json.load(open(p))
d["sourceProject"]["path"]="/Users/someone/V3/evergreen"
json.dump(d,open(p,"w"),indent=2)
'

# The citation check resolves "path:line" against the PARENT project's source
# tree, and deliberately degrades to a warning when no sibling source exists so
# that a standalone copy still verifies clean. Proving it therefore needs a
# scratch layout that HAS a sibling source tree — otherwise the injection is
# skipped rather than caught, and the proof silently proves nothing.
expect_failure_with_source() {
  local name="$1" mutation="$2"
  local src_tree tmp
  src_tree="$(cd "$REPO/.." && pwd)/src"
  if [ ! -d "$src_tree" ]; then
    note skip "$name — no sibling src/ present to resolve citations against"
    return
  fi
  tmp="$(mktemp -d)"
  mkdir -p "$tmp/project"
  cp -R "$REPO" "$tmp/project/design-repo"
  ln -s "$src_tree" "$tmp/project/src"
  ( cd "$tmp/project/design-repo" && python3 - <<PYEOF
$mutation
PYEOF
  ) >/dev/null 2>&1
  if (cd "$tmp/project/design-repo" && python3 extraction/verify_all.py) >/dev/null 2>&1; then
    note FAIL "$name — bug injected but verify_all.py still PASSED"
    FAIL=$((FAIL + 1))
  else
    note ok "$name — caught"
    PASS=$((PASS + 1))
  fi
  rm -rf "$tmp"
}

expect_failure_with_source "out-of-range citation" '
import json, glob
p=sorted(glob.glob("sections/*.json"))[0]
d=json.load(open(p))
d["measuredFrom"]="src/layout/Layout.jsx:90000-90001"
json.dump(d,open(p,"w"),indent=2)
'

expect_failure_with_source "citation to a file that does not exist" '
import json, glob
p=sorted(glob.glob("sections/*.json"))[0]
d=json.load(open(p))
d["measuredFrom"]="src/components/NotARealFile.jsx:1-5"
json.dump(d,open(p,"w"),indent=2)
'

# And prove the graceful-degradation path is real, not just asserted: the same
# repo with NO sibling source must still pass (citations warn, not fail).
run_isolated_pass() {
  local tmp
  tmp="$(mktemp -d)"
  cp -R "$REPO" "$tmp/design-repo"
  if (cd "$tmp/design-repo" && python3 extraction/verify_all.py) >/dev/null 2>&1; then
    note ok "graceful degradation: passes with no sibling source tree"
    PASS=$((PASS + 1))
  else
    note FAIL "graceful degradation: FAILS when isolated from its source tree"
    FAIL=$((FAIL + 1))
  fi
  rm -rf "$tmp"
}
run_isolated_pass

# ── the one a membership check cannot catch ──────────────────────────────────
expect_failure "PINNED asset role swapped to a DIFFERENT-BUT-VALID enum value" '
import json
p="assets/asset-roles.json"
d=json.load(open(p))
pinned=d["pinnedPolicyValues"]
rid=sorted(pinned)[0]
enum=[v for v in d["generationPolicyEnum"] if v!=d["roles"][rid]["generationPolicy"]]
# still a member of the closed enum — only the PINNED check can see this
d["roles"][rid]["generationPolicy"]=enum[0]
json.dump(d,open(p,"w"),indent=2)
print("mutated",rid,"->",enum[0])
'

expect_failure "compliance-critical role removed from the pinned list" '
import json
p="assets/asset-roles.json"
d=json.load(open(p))
rid=sorted(d["pinnedPolicyValues"])[0]
del d["pinnedPolicyValues"][rid]
json.dump(d,open(p,"w"),indent=2)
'

expect_failure "route-map count drift" '
import json
p="templates/route-map.json"
d=json.load(open(p))
d["routeCount"]=d["routeCount"]+5
json.dump(d,open(p,"w"),indent=2)
'

expect_failure "template routeCount disagrees with the route map" '
import json
p="templates/templates.json"
d=json.load(open(p))
d["templates"]["T-ARTICLE"]["routeCount"]=999
json.dump(d,open(p,"w"),indent=2)
'

expect_failure "graph rule removed while the validator still enforces it" '
import json
p="compatibility/graph.json"
d=json.load(open(p))
d["rules"]=[r for r in d["rules"] if r["id"]!="NODES_MUST_MATCH_DECLARED_TEMPLATE"]
json.dump(d,open(p,"w"),indent=2)
'

echo
echo "Confirming the REAL repo still passes"
if (cd "$REPO" && python3 extraction/verify_all.py) >/dev/null 2>&1; then
  note ok "real repo: verify_all.py passes"
  PASS=$((PASS + 1))
else
  note FAIL "real repo: verify_all.py FAILS"
  FAIL=$((FAIL + 1))
fi

echo
if [ "$FAIL" -ne 0 ]; then
  echo "RESULT: $FAIL failure(s), $PASS pass(es)"
  exit 1
fi
echo "RESULT: all $PASS drift injections caught, real repo clean"
