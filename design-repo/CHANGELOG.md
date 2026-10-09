# Changelog

## 1.0.0 — initial build

First build of the design-repo for the Evergreen-clone project. Built bottom-up
per the shared build guide: tokens → primitives → components → sections →
templates → compatibility graph → schema → example → semantic validator →
adversarial tests → manifest/allowlist/docs.

**Built:** 10 foundation token files, 25 primitives,
39 components, 46 section contracts,
22 templates covering 195 routes, 28 compatibility
rules, 13 asset roles, a draft-07 PageSpec schema with
46 independent node branches, a semantic validator, and an
adversarial suite of 23 controls and 16 mutations.

### Corrections made during the build

Each was caught by checking a drafted rule against the real file it claims to
describe, rather than at final verification:

- **Motion closure claim.** 33 of 46 section contracts declared
  `motionIsClosed: true` against an 11-field set while carrying keys outside it.
  The closure was right; the claim was imprecise. Added `motionClosureScope` and
  `motionDocumentationFields` to all 46 contracts and updated the
  graph's `MOTION_OBJECT_IS_CLOSED` rule so prose and enforced code agree.
- **`ONE_FINAL_CTA` exceptions were incomplete.** Enumerating the real node
  sequences showed 6 templates have no final CTA, not 4 — `T-ARTICLE` and
  `T-PILLAR` close with a lead-magnet form instead. As drafted the rule would
  have rejected 54 real, correct routes.
- **`ONE_HERO_PER_PAGE`'s exemption was mis-stated.** `T-PRICING` is exempt
  because it has *zero* heroes, not more than one.
- **Adjacency exceptions were prose-only**, so the validator could not read
  them. Added machine-readable `exemptAdjacency` / `alwaysExemptCategories`,
  with the prose list kept in agreement.
- **Repeatability keyed against 1 instead of the template's own count.**
  `T-HOME`, `T-ESG` and `T-PARTNER` each declare the leaf divider twice as two
  separate non-repeatable positional nodes; the naive check rejected 4 real
  templates. Now compared against the declared count, and still catches a true
  duplicate.
- **A prose note under `definitions`** made the schema itself invalid draft-07
  (every value there must be a schema). Moved to `$comment`.
- **Route lookup read a field that does not exist.** `templates.json` has no
  `routes` key — routes live in `route-map.json`. The adversarial suite was
  deriving `/` for every template and misfiring route-scoped rules.

### Verification

All four mandatory checks pass: draft-07 schema validation (0 errors),
adversarial suite (23 controls pass, 16 mutations rejected),
self-containment in an isolated directory, and zip cleanliness.
`scripts/prove_drift.sh` proves each `verify_all.py` check actually catches
drift, including a pinned asset-role mutated to a different-but-still-valid
enum value.

### Known gaps, recorded rather than papered over

Long-form prose is deliberate placeholder sized to measured block heights;
the collection detail family was sampled at 4 of 102 routes; server-side form
error strings were never observable; the scheduler iframe is cross-origin; the
display serif is a substitution for a Typekit-bound face. Motion is specified
but not yet animated. See `extraction/measured-values.json`.
