# Evergreen-clone design-repo

A machine-validated PageSpec system for the React/Vite/Tailwind replica of
`https://www.evergreen.so/` that lives in the parent directory. It lets a
generator compose pages in this design language **without inventing a colour,
a copy budget, a section or an asset**, and, since 2.0.0, separates two uses
of it: faithful **clone** pages and new **generation** pages for another brand.

Status: **design-review-pending** · `productionApproved: false` · version 2.0.0

## What is in here

| Layer | Count |
|---|---:|
| Foundation token files | 10 |
| Catalogued tokens (`tokens/llm/token-catalog.json`) | 159 |
| Primitives | 25 |
| Components | 39 |
| Section contracts | 47 |
| Templates (page shapes) | 22, in 8 families |
| Routes mapped | 195 |
| Compatibility rules | 47 (42 error, 5 warn) |
| Asset roles | 23 (11 generation-safe) |
| Example PageSpecs | 1 clone article + 1 real-content clone control + 8 generation (one per family) |

`extraction/verify_all.py` recomputes the manifest counts from the files on
disk and fails on drift.

Template evidence levels: measured = 16, measured-sampled = 6.

## Verify it

```bash
python3 extraction/verify_all.py                    # 19 repo-level checks
python3 schema/tests/adversarial_test.py            # controls + mutations
python3 extraction/prove_drift.py --scratch <dir>   # proves the checks catch drift
python3 extraction/wrapper_gate.py                  # R9 height gate on its own
```

`jsonschema` (Draft-07) is required for the schema layer. Three checks need the
sibling clone source and degrade to a warning in a standalone copy: citation
ranges, R7 source ranges / generation-pattern rebuild, and router coverage.

Re-measuring section heights (only needed when the clone changes):

```bash
npm ci && npx vite build --outDir <scratch>/dist
npx vite preview --outDir <scratch>/dist --port <port>
NODE_PATH="$(npm root -g)" node design-repo/extraction/measure_sections.mjs --base http://localhost:<port>
```

## The contract, in one paragraph

A PageSpec declares `pageSpecVersion` 2.0.0, a required `mode`, a `route`, a
`template` from a closed enum of 22 and an ordered `nodes` array.
`schema/pagespec.schema.json` closes the structure: 47 independent node
branches, closed per-section content, a closed motion object with a required
`reducedMotionFallback`, a closed 23-value `assetRole` enum and an optional
closed `style` object that takes token NAMES only. `schema/semantic_validate.py`
enforces what JSON Schema cannot: the node sequence against the **declared
template's own node list**, route restrictions, rhythm rules, per-instance
`maxWords`, the mode rules, the token rules and the retrieval pins. A spec is
valid only if **both** layers pass. Every section contract is closed by
`schema/section-contract.schema.json` and carries `source` (provenance: file,
line range, opening tag — re-read from the real file by verify_all), `semantic`
(taxonomy the AI sees), `retrievalEligible` and `generatedAssetRoles`.

## Clone mode and generation mode

<!-- generation-policy:begin -->
Every PageSpec carries a required, closed `mode`:

- **`clone`** — faithful reconstruction of evergreen.so for validation and fidelity work. Real Evergreen assets in `clone-only` roles may be reused exactly; `must-reuse-exact` applies, and is valid only in clone mode.
- **`generation`** — a new page for a different brand, built from this design language. Only `generation-safe` asset roles are allowed.

Generation mode forbids:

- the Evergreen logo / wordmark and favicon
- Evergreen-specific icons and brand artwork (leaf and heart SVGs)
- real product screenshots
- real badges, certifications and review-platform marks
- other proprietary Evergreen assets (editorial imagery) and unlicensed third-party stock
- the Evergreen / Arketta brand names and domains
- real Evergreen copy, claims and statistics
- real URLs (only .example / .invalid)
- real people and their photographs
- real customers and partners and their logos
- third-party embeds (scheduler, font kits)

They are replaced by placeholder assets, generated illustrations and icons, and
user / operator-supplied assets. Each forbidden category is its own semantic
rule: `GENERATION_MODE_BRAND`, `GENERATION_MODE_ASSET`, `GENERATION_MODE_PERSON`,
`GENERATION_MODE_CUSTOMER`, `GENERATION_MODE_SCREENSHOT`, `GENERATION_MODE_BADGE`,
`GENERATION_MODE_COPY`, `GENERATION_MODE_CLAIM`, `GENERATION_MODE_URL`,
`GENERATION_MODE_EMBED`, `GENERATION_MODE_MUST_REUSE_EXACT`.

Asset-role availability (pinned in code as `PINNED_AVAILABILITY` in both
`extraction/verify_all.py` and `schema/semantic_validate.py`):

| Role | Availability | Generation-safe substitutes |
|---|---|---|
| `brand.logo` | `clone-only` | `placeholder.brand-mark`, `operator.supplied-asset` |
| `brand.leaf-art` | `clone-only` | `generated.illustration`, `operator.supplied-asset` |
| `brand.icon` | `clone-only` | `generated.icon`, `operator.supplied-asset` |
| `product.screenshot` | `clone-only` | `placeholder.screenshot`, `operator.supplied-asset` |
| `product.badge` | `clone-only` | `placeholder.badge` |
| `third-party.trademark` | `blocked-for-generation` | `placeholder.company-logo` |
| `third-party.platform-logo` | `blocked-for-generation` | `placeholder.company-logo`, `operator.supplied-asset` |
| `third-party.review-mark` | `blocked-for-generation` | `placeholder.badge` |
| `person.likeness` | `blocked-for-generation` | `placeholder.person-avatar` |
| `editorial.hero-image` | `clone-only` | `generated.illustration`, `operator.supplied-asset` |
| `editorial.stock-photo` | `blocked-for-generation` | `generated.illustration`, `operator.supplied-asset` |
| `typeface.webfont` | `generation-safe` | — |
| `site.favicon` | `clone-only` | `placeholder.brand-mark`, `operator.supplied-asset` |
| `placeholder.brand-mark` | `generation-safe` | — |
| `operator.supplied-asset` | `generation-safe` | — |
| `generated.illustration` | `generation-safe` | — |
| `generated.icon` | `generation-safe` | — |
| `placeholder.screenshot` | `generation-safe` | — |
| `placeholder.badge` | `generation-safe` | — |
| `placeholder.person-avatar` | `generation-safe` | — |
| `placeholder.company-logo` | `generation-safe` | — |
| `placeholder.url` | `generation-safe` | — |
| `generated.copy` | `generation-safe` | — |
<!-- generation-policy:end -->

The block above is machine-checked: `verify_all.py` (`policy-docs`) fails
unless it, `registry.manifest.json` `generationPolicy` and
`assets/asset-roles.json` state the same modes, availability, forbidden list
and rule ids.

**How leakage is detected, and its limits.** The patterns live in
`extraction/generation-patterns.json`, built by
`extraction/build_generation_patterns.py` from the real source (`src/`,
`index.html`, `CLONE_SPEC*.md`, `ASSET_MANIFEST.md`) with file:line evidence
for every literal pattern: brand names and domains, 6 people, 14 customers, 29
domains, 5 embeds, 9 claims, and 1,559 hashed 5-word shingles of the real copy.
Strings are normalised (NFKC, zero-width removal, straight quotes, dash
folding, lower-case) before matching. **Detection is string-based**: paraphrase
or translation of the source copy is not detected, and no human has reviewed
the pattern lists for completeness. The word "evergreen" is rejected in any
generation-mode string, including its ordinary English sense.

## Tokens

`tokens/llm/token-catalog.json` is derived from the real token files by
`extraction/build_token_catalog.py` (verify_all rebuilds and compares).
`tokens/llm/token-policy.json` lists the token rules the validator enforces on a
node's `style` object: `TOKEN_UNKNOWN`, `TOKEN_RAW_COLOR` (also in any content
string), `TOKEN_ARBITRARY_SPACING`, `TOKEN_UNSUPPORTED_FONT`,
`TOKEN_THEME_COMBINATION`. Only the light theme exists.

## Sections are semantic units (R6) and the height gate (R9)

Section heights were **measured** at 1440px from a fresh build of the clone
(`extraction/measured-values.json` → `sectionHeights`, one representative route
per template). They exposed two whole-page wrappers, now decomposed:

- the homepage and partner "hero" (3545px / 3788px) is split into the opening
  hero and `proof.social-proof-stack`;
- legal pages and article bodies are emitted as one `content.rich-text` node
  per heading-bounded chapter / legal part.

`extraction/wrapper_gate.py` (wired into verify_all) enforces HERO > 1800px
warn / > 3000px error, one in-flow unit > 50% warn / > 60% error, with
thresholds pinned in code. Two reviewed exceptions are whitelisted in
`extraction/wrapper-gate-whitelist.json`; their `reviewedBy` is an **agent
attestation, not a human sign-off**. Visual parity against the live site was
**not measured** in this revision.

T-PILLAR's node list was reconciled to the real interleaved body order (18
units); the 1.0.0 list could not validate a faithful PageSpec.

## Retrieval eligibility (R8)

`chrome.trial-modal` and `chrome.announcement-banner` are
`retrievalEligible: false` (runtime UI), pinned in code in both validators;
every other section is eligible.

## Common-policy binding

`registry.manifest.json` binds category `saas` to
`n0-saas-design-constraints-common` 0.1.0 (common IR 0.5, `hard-and-soft`).
The classification evidence (per-active-user pricing, a trial, demo booking,
comparison pages, a login, chat-tool integrations) is in
`policy/design-policy.json`. The `contentHash` is computed over the files the
policy is enforced by and re-checked by verify_all. The decision is
`defined-pending-architecture-review`: no human architecture owner has
ratified it.

## Design facts a generator must not violate

- **Zero gradients and zero box-shadows** exist anywhere on the site. Flat fill
  plus `2px solid #000` is the entire visual language.
- **Almost no interactive state.** Three hover utilities site-wide and **no
  focus styling at all**. Inventing a hover, focus or active state is a
  fidelity break.
- **Every length is `em`** off a `.marketing-root` root of `0.833333vw`, clamped
  to 16px above 1920px and frozen at 8.25833px below 992px. Never convert `em`
  to px; `ch` values stay in `ch`.
- **No stagger and no delay** anywhere in the motion system. Quote leaves never
  animate.
- **No external requests.** All assets are local and every off-domain link is
  rendered inert.

## Motion is specified, not yet animated

`tokens/00-foundation/motion.json` records real decoded configs, but the app
does not animate yet. Treat the configs as the specification, not observed
running behaviour.

## Source is a real company

The source is a real, live company's site with real trademarks, real people's
photographs and real testimonials. This package must not be published. Clone
mode exists for internal fidelity work only; generation mode exists so new
pages never carry the source's identity.

## Evidence and its gaps

`extraction/measured-values.json` is the citation trail, including known
evidence gaps — placeholder long-form prose, 4-of-102 route sampling on the
collection detail family, unobservable server-side form errors, a cross-origin
scheduler iframe and a substituted display serif. Build-time evidence lives in
the parent project and is cited there, not in the manifest's `entryPoints`.

## Files to hand-edit vs generated

Generated by scripts (re-run, never hand-edit): `tokens/llm/token-catalog.json`,
`extraction/generation-patterns.json`, the `source` / `semantic` /
`retrievalEligible` fields of section contracts, `sectionHeights` in
`extraction/measured-values.json`, and `designPolicy.contentHash`.
`design-repo.zip`, if produced, is a gitignored build artifact.
