# Information architecture

Machine-checked IA for this project: what pages exist, what sections are on
them, and which sections are shared versus page-local.

> **Filename note:** the ia-builder skill's workflow calls for writing this as
> `README.md`, but this project already has a committed `README.md` describing
> the clone itself. Overwriting it would have destroyed real work, so the IA
> write-up lives here instead. Nothing else deviates from the skill's shape.

## Files

| file | edit? | what it is |
|---|---|---|
| `ia.json` | **yes — this is the only file to hand-edit** | the single source of truth: categories, sections (defined once each), templates |
| `IA.md` | no — generated | readable doc: site shape, chrome split, reuse table, per-template section tables, full section reference |
| `matrix.csv` | no — generated | section × template matrix for a spreadsheet |
| `validate.mjs` | no — copied from the skill | checks the invariants |
| `build.mjs` | no — copied from the skill | regenerates `IA.md` + `matrix.csv` |

Re-run after editing `ia.json`:

```bash
node validate.mjs && node build.mjs
```

Never hand-edit `IA.md` or `matrix.csv` — they are overwritten on every build.

## How this was derived

Not written as prose and not inferred from screenshots. Routes come from the
real 195-URL sitemap in `src/data/routes.json`, assigned to templates by
mirroring the actual route table in `src/App.jsx`. Each template's section
order was read from its own component source. Section descriptions are
grounded in the five `CLONE_SPEC*.md` measurement documents at the project
root, which were themselves measured in-browser against the live original.

Route-to-template assignment is computed, not typed: all 195 URLs resolve to
exactly one template, with no gaps, no double-assignment and no duplicate URLs.

## Findings

**61% of the site is four content collections plus the blog.** The three
largest templates — blog article (53), recognition message set (35) and
glossary term (30) — account for 118 of 195 routes. The real build effort sits
in the other 77 routes, which span 19 templates. Adding a 54th blog post is a
data row; adding a 20th template is a new page shape.

**The 102 collection detail routes collapse onto one implementation.** They
are modelled here as four templates, because their block sequences genuinely
differ, but all four name `src/templates/TDetail.jsx` as `implementedBy` — one
block composer driven by a per-collection sequence. The four collection
*indexes* really are one shape and share a single template.

**24 sections are shared across templates; 29 are single-use.** The four
chrome sections (nav, footer, trial modal, and the per-route announcement
banner) plus the leaf divider and the closing CTA carry most of the reuse. The
29 single-use sections are mostly page-specific heroes and one-off narrative
blocks, and should stay page-local until a second caller actually appears —
most of them are genuinely unique to their page, not duplication waiting to be
factored out.

**Three sections are deliberately absent from some templates**, which is worth
knowing before assuming every page has them: the leaf divider is on 20 of 22
templates (not the blog index, not the legal pages), and the closing CTA is on
16 of 22 (not the blog index, legal pages or referral page, and the pillar
guide replaces it with a lead-magnet form).

## Two true numbers, do not "correct" either

`validate.mjs` prints one informational note:

```
hero.collection: scope says [102] but computed route count is 106
```

Both numbers are correct. The scope sentence describes the 102 collection
*detail* routes; the computed 106 additionally counts the four collection
*index* routes, which carry the same hero section. Editing the prose to say
106 would make the sentence wrong, and changing the data to 102 would make the
count wrong. Leave it as-is — this note is the validator working, not failing.

## Not templates, on purpose

Two `<Route>` patterns in `src/App.jsx` render a placeholder and are
intentionally excluded from this IA:

- `/employee-recognition/:slug` — verified in `CLONE_SPEC_CONTENT_B.md` §0 as
  **not existing on the real site**. The hub's only children are `/for` and
  `/glossary`, which are themselves collection indexes. Do not build a page
  shape for it.
- `*` — the catch-all.

Neither appears in the sitemap, so neither is a real route.

## Scope caveat on content

Long-form prose on the article, glossary, message-set, case-study and legal
templates is deliberate placeholder copy, sized to the original's measured
block heights. Page titles, slugs, headings, labels and images are real. This
IA documents **structure**, which is accurate either way — but don't read the
body copy as source content.
