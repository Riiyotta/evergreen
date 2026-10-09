# Evergreen-clone design-repo

A machine-validated PageSpec system for the React/Vite/Tailwind replica of
`https://www.evergreen.so/` that lives in the parent directory. It exists so a
generator can compose new on-brand pages for this design language **without
inventing a colour, a copy budget, a section or an asset** — every value here
cites real measured evidence.

Status: **design-review-pending** · `productionApproved: false`

## What is in here

| Layer | Count |
|---|---:|
| Foundation token files | 10 |
| Primitives | 25 |
| Components | 39 |
| Section contracts | 46 |
| Templates (page shapes) | 22 |
| Routes mapped | 195 |
| Compatibility rules | 28 (23 error, 5 warn) |
| Asset roles | 13 |

Counts are recomputed from the files on disk by `extraction/verify_all.py`,
which fails the run if any number drifts. They are not hand-maintained.

Template evidence levels: measured = 16, measured-sampled = 6.

## Verify it

```bash
python3 extraction/verify_all.py          # repo-level checks
python3 schema/tests/adversarial_test.py  # controls + mutations
bash   scripts/prove_drift.sh             # proves the checks catch drift
```

Schema validation (draft-07) requires `jsonschema`:

```bash
python3 -c "import json; from jsonschema import Draft7Validator as V; \
  s=json.load(open('schema/pagespec.schema.json')); V.check_schema(s); \
  print(len(list(V(s).iter_errors(json.load(open('schema/example.pagespec.json'))))), 'errors')"
```

## The contract, in one paragraph

A PageSpec declares a `route`, a `template` from a closed enum of
22, and an ordered `nodes` array. `schema/pagespec.schema.json`
closes the structure: 46 fully independent node branches (a
`oneOf` of independent schemas, not a shared base — draft-07's
`additionalProperties:false` cannot see properties a sibling `allOf` adds), a
closed per-section content field set, a closed motion object with a required
`reducedMotionFallback`, and a closed `assetRole` enum.
`schema/semantic_validate.py` then enforces what JSON Schema cannot: the node
sequence is cross-referenced against the **declared template's own node list**,
plus route restrictions, rhythm rules at their declared severity, and
per-instance `maxWords`. A spec is valid only if **both** layers pass.

## Design facts a generator must not violate

- **Zero gradients and zero box-shadows** exist anywhere on the site. Flat fill
  plus `2px solid #000` is the entire visual language.
- **Almost no interactive state.** Three hover utilities exist site-wide
  (`hover:underline` on nav links, the same on footer links, and
  `hover:bg-white` on the eyebrow badge pill) and **no focus styling at all**.
  Inventing a hover, focus or active state is a fidelity break, not an
  improvement.
- **Every length is `em`** off a `.marketing-root` root of `0.833333vw`, clamped
  to 16px above 1920px and frozen at 8.25833px below 992px. Never convert `em`
  to px; `ch` values stay in `ch`.
- **No stagger and no delay** anywhere in the motion system.
- **Quote leaves never animate.** Card grids are static from first paint.
- **No external requests.** All assets are local and every off-domain link is
  rendered inert.

## Motion is specified, not yet animated

`tokens/00-foundation/motion.json` records real decoded configs — durations,
exact cubic-beziers, scroll-spring constants, per-leaf coordinate sets — but
the app does not animate yet. Every leaf renders in its correct pre-animation
position with the right class name and the scroll-track hook is exposed. Each
section's motion carries `implementationStatus`. Treat the configs as the
specification, not as observed running behaviour.

## Source is a real company — asset roles are a compliance boundary

`assets/asset-roles.json` closes 13 roles behind a 5-value
`generationPolicy` enum. Roles covering **real third-party trademarks** and
**real people's photographs** are additionally *pinned* to a specific policy
value, because membership in a closed set cannot catch a role being switched to
a different-but-still-valid value. `verify_all.py` enforces the pinned values
and `scripts/prove_drift.sh` proves it by mutating one to another valid member.

Generated output must never fabricate or reproduce a real company logo, a real
person's likeness, or real proprietary content.

## Evidence and its gaps

`extraction/measured-values.json` is the citation trail, including the
corrections applied during this build and an explicit list of known evidence
gaps — placeholder long-form prose, 4-of-102 route sampling on the collection
detail family, unobservable server-side form errors, a cross-origin scheduler
iframe, and a substituted display serif. Read it before trusting any single
number.

Build-time evidence lives in the parent project, not here, and is cited in that
ledger rather than in the manifest's `entryPoints` — an entry point is a promise
about this package's own contents, and `design-repo/` must verify clean on its
own. `verify_all.py` downgrades citation checking to a warning when no sibling
source tree is present.

## Files to hand-edit vs generated

Everything here is hand-maintained source except `design-repo.zip`, which is a
build artifact: regenerated fresh and last, after validation, and gitignored so
a stale copy never ships beside the live folder.
