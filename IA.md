# https://www.evergreen.so/ — pixel-accurate React/Vite/Tailwind replica at this project root

Source: https://www.evergreen.so/ — pixel-accurate React/Vite/Tailwind replica at this project root · Measured from the live original; app source is the authority for section order
Status: **measured-from-source** · production approved: **false**
195 routes · 22 templates · 53 unique sections

> Generated from `ia.json` by `build.mjs`. Edit the JSON, not this file.

## Shape of the site

The largest 3 templates (Blog article, Recognition message set, Glossary term) account for 118 of 195 routes (61%). The remaining 77 routes span 19 templates.

| template | routes | share |
|---|---:|---:|
| Blog article | 53 | 27% |
| Recognition message set | 35 | 18% |
| Glossary term | 30 | 15% |
| Company value | 25 | 13% |
| Competitor comparison | 15 | 8% |
| Team guide | 12 | 6% |
| Customer success story | 4 | 2% |
| Collection index | 4 | 2% |
| Partner landing | 3 | 2% |
| Legal document | 2 | 1% |
| Homepage | 1 | 1% |
| Pricing | 1 | 1% |
| ESG | 1 | 1% |
| Our purpose | 1 | 1% |
| Case studies index | 1 | 1% |
| Contact | 1 | 1% |
| Schedule a demo | 1 | 1% |
| Referral | 1 | 1% |
| Lead-magnet landing | 1 | 1% |
| Blog index | 1 | 1% |
| Alternatives index | 1 | 1% |
| Pillar guide | 1 | 1% |

## Page chrome

**54 routes carry chrome = `full+banner`** — Homepage, Blog article.

**141 routes carry chrome = `full`** — Pricing, ESG, Our purpose, Case studies index, Customer success story, Contact, Schedule a demo, Referral, Legal document, Lead-magnet landing, Partner landing, Blog index, Alternatives index, Competitor comparison, Collection index, Pillar guide, Glossary term, Team guide, Recognition message set, Company value.

## Sections by reuse

How widely a section is shared determines whether it belongs in a shared
component library or stays local to its page.

| section | category | templates | routes | implementation | scope |
|---|---|---:|---:|---|---|
| `chrome.navbar` | CHROME | 22 | 195 | `src/components/Nav.jsx` | Every route. |
| `chrome.footer` | CHROME | 22 | 195 | `src/components/Footer.jsx` | Every route. |
| `chrome.trial-modal` | CHROME | 22 | 195 | `src/components/TrialModal.jsx` | Mounted on every route; opened on demand rather than rendered inline. |
| `structure.leaf-divider` | STRUCTURE | 20 | 192 | `src/components/LeafDivider.jsx` | Every template except the blog index and the legal pages, which have no divider at all. |
| `content.prose-body` | CONTENT | 9 | 177 | `src/components/RichText.jsx` | Both legal pages, every case study, the pillar guide, every blog article and every comparison page. |
| `collection.card-grid` | COLLECTION | 9 | 176 | `src/components/LinkCard.jsx` | Every collection index and detail page, the alternatives index and the pillar guide. |
| `content.section-heading` | CONTENT | 8 | 175 | `src/templates/blocks.jsx > SectionHeading` | Every collection index and detail page, plus the comparison and alternatives-index pages. |
| `conversion.final-cta` | CONVERSION | 16 | 136 | `src/components/CtaSection.jsx` | Most templates. Absent from the blog index, the legal pages, the referral page and the pillar guide, which closes with a lead-magnet form instead. |
| `content.faq` | CONTENT | 6 | 118 | `src/components/blocks/FaqDl.jsx` | Every collection detail page, the comparison pages and the pillar guide. |
| `content.leaf-bullets` | CONTENT | 5 | 117 | `src/components/blocks/LeafBulletList.jsx` | Collection detail pages and comparison pages. |
| `hero.collection` | HERO | 5 | 106 | `src/templates/blocks.jsx > Hero` | All four collection index pages and all 102 collection detail pages. |
| `content.message-grid` | CONTENT | 3 | 72 | `src/components/MessageCard.jsx` | Message-set, company-value and team-guide detail pages. |
| `conversion.lead-magnet-form` | CONVERSION | 3 | 55 | `src/components/blocks/LeadMagnetForm.jsx` | The ebook page, the pillar guide's closing block, and every blog article. |
| `content.prose-left` | CONTENT | 2 | 55 | `src/templates/blocks.jsx > ProseLeft` | Glossary detail pages, and company-value pages that carry an absence note. |
| `chrome.announcement-banner` | CHROME | 2 | 54 | `src/components/AnnouncementBanner.jsx` | Per-route, not global: the homepage and every blog article, 54 routes in all. Absent on every other route, where the navigation sits flush to the top of the page. |
| `content.leaf-definition-list` | CONTENT | 4 | 53 | `src/components/blocks/LeafDl.jsx` | Company-value, team-guide and comparison pages, plus the pillar guide. |
| `hero.article` | HERO | 1 | 53 | `src/pages/BlogPost.jsx` | Every blog article. |
| `collection.related-articles` | COLLECTION | 1 | 53 | `src/components/RelatedCard.jsx` | Every blog article. |
| `conversion.partner-cta-panel` | CONVERSION | 1 | 53 | `src/components/ArkettaCtaPanel.jsx` | Every blog article. |
| `hero.comparison` | HERO | 1 | 15 | `src/pages/AlternativePage.jsx` | Every alternatives comparison page. |
| `content.sources` | CONTENT | 1 | 15 | `src/components/SourcesList.jsx` | Every alternatives comparison page. |
| `collection.comparison-glance` | COLLECTION | 1 | 15 | `src/components/blocks/LeafDl.jsx` | Every alternatives comparison page. |
| `proof.g2-rating` | PROOF | 7 | 9 | `src/components/G2Block.jsx` | The homepage, pricing, contact, schedule-a-demo, referral, ebook and partner pages. |
| `proof.testimonials` | PROOF | 4 | 6 | `src/components/Testimonials.jsx` | The homepage, pricing, referral and partner pages. |
| `proof.logo-strip` | PROOF | 4 | 6 | `src/components/LogoStrip.jsx` | The homepage, pricing, referral and partner pages. |
| `proof.stat-row` | PROOF | 3 | 5 | `src/components/StatRow.jsx` | The homepage, the pillar guide and the partner pages. |
| `hero.page-heading` | HERO | 4 | 4 | `src/components/HeroHeading.jsx` | The four conversion and index pages that share it: case studies, contact, schedule a demo and referral. |
| `conversion.scheduler` | CONVERSION | 2 | 4 | `src/components/SchedulerPlaceholder.jsx` | The schedule-a-demo page and every partner landing page. |
| `hero.case-study` | HERO | 1 | 4 | `src/pages/CaseStudyPage.jsx` | Every customer success story. |
| `proof.case-study-meta` | PROOF | 1 | 4 | `src/components/CaseStudyMetaCard.jsx` | Every customer success story. |
| `proof.case-study-teasers` | PROOF | 1 | 4 | `src/components/CaseStudyTeaserCard.jsx` | Every customer success story. |
| `hero.partner` | HERO | 1 | 3 | `src/pages/PartnerPage.jsx` | Every partner landing page. |
| `narrative.partner-feature` | NARRATIVE | 1 | 3 | `src/pages/PartnerPage.jsx` | Every partner landing page, twice per page. |
| `narrative.sdg-goals` | NARRATIVE | 2 | 2 | `src/components/SdgSection.jsx` | Shared byte-identically by the ESG and our-purpose pages. |
| `narrative.icon-feature-row` | NARRATIVE | 2 | 2 | `src/components/IconFeatureColumn.jsx` | The pricing and our-purpose pages. |
| `hero.legal` | HERO | 1 | 2 | `src/pages/LegalPage.jsx` | Both legal pages. |
| `hero.homepage` | HERO | 1 | 1 | `src/components/Hero.jsx` | The homepage only. |
| `hero.pricing` | HERO | 1 | 1 | `src/pages/Pricing.jsx` | The pricing page only. |
| `hero.esg` | HERO | 1 | 1 | `src/pages/Esg.jsx` | The ESG page only. |
| `hero.our-purpose` | HERO | 1 | 1 | `src/pages/OurPurpose.jsx` | The our-purpose page only. |
| `hero.pillar` | HERO | 1 | 1 | `src/pages/EmployeeRecognitionHub.jsx` | The employee-recognition pillar guide only. |
| `hero.blog-index` | HERO | 1 | 1 | `src/pages/BlogIndex.jsx` | The blog index only. |
| `hero.alternatives-index` | HERO | 1 | 1 | `src/pages/AlternativesIndex.jsx` | The alternatives index only. |
| `hero.ebook` | HERO | 1 | 1 | `src/pages/EbookPage.jsx` | The ebook landing page only. |
| `narrative.seeds` | NARRATIVE | 1 | 1 | `src/components/SeedsSection.jsx` | The homepage only. |
| `narrative.report-csr` | NARRATIVE | 1 | 1 | `src/components/ReportCsrSection.jsx` | The homepage only. |
| `narrative.esg-pillar` | NARRATIVE | 1 | 1 | `src/pages/Esg.jsx` | The ESG page, three times over for Environmental, Social and Governance. |
| `narrative.goals-2027` | NARRATIVE | 1 | 1 | `src/pages/OurPurpose.jsx` | The our-purpose page only. |
| `proof.case-study-grid` | PROOF | 1 | 1 | `src/components/CaseStudyCard.jsx` | The case-studies index only. |
| `collection.blog-rows` | COLLECTION | 1 | 1 | `src/components/BlogCard.jsx` | The blog index only. |
| `conversion.contact-form` | CONVERSION | 1 | 1 | `src/components/form/ContactForm.jsx` | The contact page only. |
| `conversion.referral-form` | CONVERSION | 1 | 1 | `src/components/form/ReferralForm.jsx` | The referral page only. |
| `conversion.earnings-tiers` | CONVERSION | 1 | 1 | `src/components/EarningsTiers.jsx` | The referral page only. |

**24 shared sections** appear in more than one template and belong in a component library.

**29 single-use sections** appear in exactly one template. Building these
as "reusable" components up front would be speculative — keep them page-local
until a second caller actually appears.

## Templates

### Homepage — `template.home`

1 route · `/` · chrome: **full+banner**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.announcement-banner` | shared ×2 |
| 2 | CHROME | `chrome.navbar` | shared ×22 |
| 3 | HERO | `hero.homepage` | page-local |
| 4 | PROOF | `proof.stat-row` | shared ×3 |
| 5 | PROOF | `proof.testimonials` | shared ×4 |
| 6 | PROOF | `proof.logo-strip` | shared ×4 |
| 7 | PROOF | `proof.g2-rating` | shared ×7 |
| 8 | STRUCTURE | `structure.leaf-divider` | shared ×20 |
| 9 | NARRATIVE | `narrative.seeds` | page-local |
| 10 | NARRATIVE | `narrative.report-csr` | page-local |
| 11 | CONVERSION | `conversion.final-cta` | shared ×16 |
| 12 | CHROME | `chrome.footer` | shared ×22 |
| 13 | CHROME | `chrome.trial-modal` | shared ×22 |

### Pricing — `template.pricing`

1 route · `/pricing` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.pricing` | page-local |
| 3 | NARRATIVE | `narrative.icon-feature-row` | shared ×2 |
| 4 | STRUCTURE | `structure.leaf-divider` | shared ×20 |
| 5 | PROOF | `proof.testimonials` | shared ×4 |
| 6 | PROOF | `proof.logo-strip` | shared ×4 |
| 7 | PROOF | `proof.g2-rating` | shared ×7 |
| 8 | CHROME | `chrome.footer` | shared ×22 |
| 9 | CHROME | `chrome.trial-modal` | shared ×22 |

### ESG — `template.esg`

1 route · `/esg` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.esg` | page-local |
| 3 | NARRATIVE | `narrative.esg-pillar` | page-local |
| 4 | STRUCTURE | `structure.leaf-divider` | shared ×20 |
| 5 | NARRATIVE | `narrative.sdg-goals` | shared ×2 |
| 6 | CONVERSION | `conversion.final-cta` | shared ×16 |
| 7 | CHROME | `chrome.footer` | shared ×22 |
| 8 | CHROME | `chrome.trial-modal` | shared ×22 |

### Our purpose — `template.our-purpose`

1 route · `/our-purpose` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.our-purpose` | page-local |
| 3 | NARRATIVE | `narrative.goals-2027` | page-local |
| 4 | NARRATIVE | `narrative.icon-feature-row` | shared ×2 |
| 5 | STRUCTURE | `structure.leaf-divider` | shared ×20 |
| 6 | NARRATIVE | `narrative.sdg-goals` | shared ×2 |
| 7 | CONVERSION | `conversion.final-cta` | shared ×16 |
| 8 | CHROME | `chrome.footer` | shared ×22 |
| 9 | CHROME | `chrome.trial-modal` | shared ×22 |

### Case studies index — `template.case-study-index`

1 route · `/case-studies` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.page-heading` | shared ×4 |
| 3 | PROOF | `proof.case-study-grid` | page-local |
| 4 | STRUCTURE | `structure.leaf-divider` | shared ×20 |
| 5 | CONVERSION | `conversion.final-cta` | shared ×16 |
| 6 | CHROME | `chrome.footer` | shared ×22 |
| 7 | CHROME | `chrome.trial-modal` | shared ×22 |

### Customer success story — `template.case-study`

4 routes · `/customer-success-stories/kent-white`, `/customer-success-stories/nitro-games`, `/customer-success-stories/worklete`, `/customer-success-stories/wunderdog` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.case-study` | page-local |
| 3 | PROOF | `proof.case-study-meta` | page-local |
| 4 | CONTENT | `content.prose-body` | shared ×9 |
| 5 | PROOF | `proof.case-study-teasers` | page-local |
| 6 | STRUCTURE | `structure.leaf-divider` | shared ×20 |
| 7 | CONVERSION | `conversion.final-cta` | shared ×16 |
| 8 | CHROME | `chrome.footer` | shared ×22 |
| 9 | CHROME | `chrome.trial-modal` | shared ×22 |

### Contact — `template.contact`

1 route · `/contact` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.page-heading` | shared ×4 |
| 3 | CONVERSION | `conversion.contact-form` | page-local |
| 4 | PROOF | `proof.g2-rating` | shared ×7 |
| 5 | STRUCTURE | `structure.leaf-divider` | shared ×20 |
| 6 | CONVERSION | `conversion.final-cta` | shared ×16 |
| 7 | CHROME | `chrome.footer` | shared ×22 |
| 8 | CHROME | `chrome.trial-modal` | shared ×22 |

### Schedule a demo — `template.schedule-demo`

1 route · `/schedule-a-demo` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.page-heading` | shared ×4 |
| 3 | CONVERSION | `conversion.scheduler` | shared ×2 |
| 4 | PROOF | `proof.g2-rating` | shared ×7 |
| 5 | STRUCTURE | `structure.leaf-divider` | shared ×20 |
| 6 | CONVERSION | `conversion.final-cta` | shared ×16 |
| 7 | CHROME | `chrome.footer` | shared ×22 |
| 8 | CHROME | `chrome.trial-modal` | shared ×22 |

### Referral — `template.referral`

1 route · `/referral` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.page-heading` | shared ×4 |
| 3 | CONVERSION | `conversion.referral-form` | page-local |
| 4 | CONVERSION | `conversion.earnings-tiers` | page-local |
| 5 | STRUCTURE | `structure.leaf-divider` | shared ×20 |
| 6 | PROOF | `proof.testimonials` | shared ×4 |
| 7 | PROOF | `proof.logo-strip` | shared ×4 |
| 8 | PROOF | `proof.g2-rating` | shared ×7 |
| 9 | CHROME | `chrome.footer` | shared ×22 |
| 10 | CHROME | `chrome.trial-modal` | shared ×22 |

### Legal document — `template.legal`

2 routes · `/privacy-policy`, `/terms-of-service` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.legal` | page-local |
| 3 | CONTENT | `content.prose-body` | shared ×9 |
| 4 | CHROME | `chrome.footer` | shared ×22 |
| 5 | CHROME | `chrome.trial-modal` | shared ×22 |

### Lead-magnet landing — `template.ebook`

1 route · `/ebook/practical-guide-to-employee-recognition` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.ebook` | page-local |
| 3 | CONVERSION | `conversion.lead-magnet-form` | shared ×3 |
| 4 | PROOF | `proof.g2-rating` | shared ×7 |
| 5 | STRUCTURE | `structure.leaf-divider` | shared ×20 |
| 6 | CONVERSION | `conversion.final-cta` | shared ×16 |
| 7 | CHROME | `chrome.footer` | shared ×22 |
| 8 | CHROME | `chrome.trial-modal` | shared ×22 |

### Partner landing — `template.partner`

3 routes · `/partners/50pros`, `/partners/product-hunt`, `/partners/the-people-people-group` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.partner` | page-local |
| 3 | CONVERSION | `conversion.scheduler` | shared ×2 |
| 4 | PROOF | `proof.stat-row` | shared ×3 |
| 5 | STRUCTURE | `structure.leaf-divider` | shared ×20 |
| 6 | NARRATIVE | `narrative.partner-feature` | page-local |
| 7 | PROOF | `proof.testimonials` | shared ×4 |
| 8 | PROOF | `proof.logo-strip` | shared ×4 |
| 9 | PROOF | `proof.g2-rating` | shared ×7 |
| 10 | CONVERSION | `conversion.final-cta` | shared ×16 |
| 11 | CHROME | `chrome.footer` | shared ×22 |
| 12 | CHROME | `chrome.trial-modal` | shared ×22 |

### Blog index — `template.blog-index`

1 route · `/blog` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.blog-index` | page-local |
| 3 | COLLECTION | `collection.blog-rows` | page-local |
| 4 | CHROME | `chrome.footer` | shared ×22 |
| 5 | CHROME | `chrome.trial-modal` | shared ×22 |

### Blog article — `template.blog-post`

53 routes · `/blog/{slug}` · chrome: **full+banner**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.announcement-banner` | shared ×2 |
| 2 | CHROME | `chrome.navbar` | shared ×22 |
| 3 | HERO | `hero.article` | page-local |
| 4 | CONTENT | `content.prose-body` | shared ×9 |
| 5 | CONVERSION | `conversion.partner-cta-panel` | page-local |
| 6 | CONTENT | `content.section-heading` | shared ×8 |
| 7 | COLLECTION | `collection.card-grid` | shared ×9 |
| 8 | COLLECTION | `collection.related-articles` | page-local |
| 9 | STRUCTURE | `structure.leaf-divider` | shared ×20 |
| 10 | CONVERSION | `conversion.lead-magnet-form` | shared ×3 |
| 11 | CHROME | `chrome.footer` | shared ×22 |
| 12 | CHROME | `chrome.trial-modal` | shared ×22 |

### Alternatives index — `template.alternatives-index`

1 route · `/alternatives` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.alternatives-index` | page-local |
| 3 | COLLECTION | `collection.card-grid` | shared ×9 |
| 4 | CONTENT | `content.section-heading` | shared ×8 |
| 5 | STRUCTURE | `structure.leaf-divider` | shared ×20 |
| 6 | CONVERSION | `conversion.final-cta` | shared ×16 |
| 7 | CHROME | `chrome.footer` | shared ×22 |
| 8 | CHROME | `chrome.trial-modal` | shared ×22 |

### Competitor comparison — `template.alternative-comparison`

15 routes · `/alternatives/{slug}` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.comparison` | page-local |
| 3 | CONTENT | `content.section-heading` | shared ×8 |
| 4 | COLLECTION | `collection.comparison-glance` | page-local |
| 5 | CONTENT | `content.prose-body` | shared ×9 |
| 6 | CONTENT | `content.leaf-bullets` | shared ×5 |
| 7 | CONTENT | `content.leaf-definition-list` | shared ×4 |
| 8 | CONTENT | `content.faq` | shared ×6 |
| 9 | CONTENT | `content.sources` | page-local |
| 10 | COLLECTION | `collection.card-grid` | shared ×9 |
| 11 | STRUCTURE | `structure.leaf-divider` | shared ×20 |
| 12 | CONVERSION | `conversion.final-cta` | shared ×16 |
| 13 | CHROME | `chrome.footer` | shared ×22 |
| 14 | CHROME | `chrome.trial-modal` | shared ×22 |

### Collection index — `template.collection-index`

4 routes · `/company-values`, `/employee-recognition-messages`, `/employee-recognition/for`, `/employee-recognition/glossary` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.collection` | shared ×5 |
| 3 | COLLECTION | `collection.card-grid` | shared ×9 |
| 4 | CONTENT | `content.section-heading` | shared ×8 |
| 5 | STRUCTURE | `structure.leaf-divider` | shared ×20 |
| 6 | CONVERSION | `conversion.final-cta` | shared ×16 |
| 7 | CHROME | `chrome.footer` | shared ×22 |
| 8 | CHROME | `chrome.trial-modal` | shared ×22 |

### Pillar guide — `template.pillar`

1 route · `/employee-recognition` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.pillar` | page-local |
| 3 | CONTENT | `content.prose-body` | shared ×9 |
| 4 | PROOF | `proof.stat-row` | shared ×3 |
| 5 | CONTENT | `content.leaf-definition-list` | shared ×4 |
| 6 | COLLECTION | `collection.card-grid` | shared ×9 |
| 7 | CONTENT | `content.faq` | shared ×6 |
| 8 | STRUCTURE | `structure.leaf-divider` | shared ×20 |
| 9 | CONVERSION | `conversion.lead-magnet-form` | shared ×3 |
| 10 | CHROME | `chrome.footer` | shared ×22 |
| 11 | CHROME | `chrome.trial-modal` | shared ×22 |

### Glossary term — `template.detail-glossary`

30 routes · `/employee-recognition/glossary/{slug}` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.collection` | shared ×5 |
| 3 | CONTENT | `content.prose-left` | shared ×2 |
| 4 | CONTENT | `content.prose-body` | shared ×9 |
| 5 | CONTENT | `content.section-heading` | shared ×8 |
| 6 | CONTENT | `content.leaf-bullets` | shared ×5 |
| 7 | CONTENT | `content.faq` | shared ×6 |
| 8 | COLLECTION | `collection.card-grid` | shared ×9 |
| 9 | STRUCTURE | `structure.leaf-divider` | shared ×20 |
| 10 | CONVERSION | `conversion.final-cta` | shared ×16 |
| 11 | CHROME | `chrome.footer` | shared ×22 |
| 12 | CHROME | `chrome.trial-modal` | shared ×22 |

### Team guide — `template.detail-team-guide`

12 routes · `/employee-recognition/for/{slug}` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.collection` | shared ×5 |
| 3 | CONTENT | `content.prose-body` | shared ×9 |
| 4 | CONTENT | `content.section-heading` | shared ×8 |
| 5 | CONTENT | `content.leaf-definition-list` | shared ×4 |
| 6 | CONTENT | `content.leaf-bullets` | shared ×5 |
| 7 | CONTENT | `content.message-grid` | shared ×3 |
| 8 | CONTENT | `content.faq` | shared ×6 |
| 9 | COLLECTION | `collection.card-grid` | shared ×9 |
| 10 | STRUCTURE | `structure.leaf-divider` | shared ×20 |
| 11 | CONVERSION | `conversion.final-cta` | shared ×16 |
| 12 | CHROME | `chrome.footer` | shared ×22 |
| 13 | CHROME | `chrome.trial-modal` | shared ×22 |

### Recognition message set — `template.detail-message-set`

35 routes · `/employee-recognition-messages/{slug}` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.collection` | shared ×5 |
| 3 | CONTENT | `content.prose-body` | shared ×9 |
| 4 | CONTENT | `content.section-heading` | shared ×8 |
| 5 | CONTENT | `content.message-grid` | shared ×3 |
| 6 | CONTENT | `content.leaf-bullets` | shared ×5 |
| 7 | CONTENT | `content.faq` | shared ×6 |
| 8 | COLLECTION | `collection.card-grid` | shared ×9 |
| 9 | STRUCTURE | `structure.leaf-divider` | shared ×20 |
| 10 | CONVERSION | `conversion.final-cta` | shared ×16 |
| 11 | CHROME | `chrome.footer` | shared ×22 |
| 12 | CHROME | `chrome.trial-modal` | shared ×22 |

### Company value — `template.detail-company-value`

25 routes · `/company-values/{slug}` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×22 |
| 2 | HERO | `hero.collection` | shared ×5 |
| 3 | CONTENT | `content.prose-body` | shared ×9 |
| 4 | CONTENT | `content.section-heading` | shared ×8 |
| 5 | CONTENT | `content.leaf-definition-list` | shared ×4 |
| 6 | CONTENT | `content.message-grid` | shared ×3 |
| 7 | CONTENT | `content.prose-left` | shared ×2 |
| 8 | CONTENT | `content.leaf-bullets` | shared ×5 |
| 9 | CONTENT | `content.faq` | shared ×6 |
| 10 | COLLECTION | `collection.card-grid` | shared ×9 |
| 11 | STRUCTURE | `structure.leaf-divider` | shared ×20 |
| 12 | CONVERSION | `conversion.final-cta` | shared ×16 |
| 13 | CHROME | `chrome.footer` | shared ×22 |
| 14 | CHROME | `chrome.trial-modal` | shared ×22 |

## Section reference

### CHROME

_Global furniture rendered once in the app shell and present on every route._

**`chrome.announcement-banner`** — Full-bleed black bar above the navigation carrying a single promotional sentence and one inline link.

· Per-route, not global: the homepage and every blog article, 54 routes in all. Absent on every other route, where the navigation sits flush to the top of the page. · appears on 54 routes · implemented by `src/components/AnnouncementBanner.jsx`

**`chrome.navbar`** — Primary navigation: wordmark, six links, a demo call to action, and a hamburger that opens the mobile menu overlay. Static position, never sticky, no backdrop blur.

· Every route. · appears on 195 routes · implemented by `src/components/Nav.jsx`

**`chrome.footer`** — Four-column footer: wordmark and social chips, three link columns, a newsletter capture field, and a legal row.

· Every route. · appears on 195 routes · implemented by `src/components/Footer.jsx`

**`chrome.trial-modal`** — Full-screen overlay panel offering the two platform install paths, opened by any trial button and dismissible by Escape.

· Mounted on every route; opened on demand rather than rendered inline. · appears on 195 routes · implemented by `src/components/TrialModal.jsx`

### STRUCTURE

_Structural rhythm devices that separate content sections rather than carrying content._

**`structure.leaf-divider`** — Decorative band of drifting leaf art over a flat colour bar closed by a 2px rule. The band colour follows the section immediately above it rather than being fixed.

· Every template except the blog index and the legal pages, which have no divider at all. · appears on 192 routes · implemented by `src/components/LeafDivider.jsx`

### HERO

_The page-opening block: eyebrow, headline, lede and any immediate call to action._

**`hero.homepage`** — The marketing hero: three-part headline with floating avatar pills, sub-paragraph, trial button, product screenshot on a scroll-driven track, platform install links and headline proof figures.

· The homepage only. · appears on 1 routes · implemented by `src/components/Hero.jsx`

**`hero.page-heading`** — Shared centred page opener: headline plus a single supporting paragraph, with no call to action of its own.

· The four conversion and index pages that share it: case studies, contact, schedule a demo and referral. · appears on 4 routes · implemented by `src/components/HeroHeading.jsx`

**`hero.collection`** — Collection opener: eyebrow badge pill linking to the parent hub, headline and lede.

· All four collection index pages and all 102 collection detail pages. · appears on 106 routes · implemented by `src/templates/blocks.jsx > Hero`

**`hero.article`** — Article opener: eyebrow badge, article headline and a published-date line.

· Every blog article. · appears on 53 routes · implemented by `src/pages/BlogPost.jsx`

**`hero.comparison`** — Comparison opener: eyebrow badge, comparison headline, subtitle and an introductory paragraph.

· Every alternatives comparison page. · appears on 15 routes · implemented by `src/pages/AlternativePage.jsx`

**`hero.pricing`** — Pricing opener: headline, lede, the price card with its two framed avatars, and the trial call to action with its reassurance line.

· The pricing page only. · appears on 1 routes · implemented by `src/pages/Pricing.jsx`

**`hero.esg`** — ESG opener: headline and lede above the Environmental pillar's own content and photograph.

· The ESG page only. · appears on 1 routes · implemented by `src/pages/Esg.jsx`

**`hero.our-purpose`** — Purpose opener: headline and lede flanked by a static leaf wreath that deliberately never animates.

· The our-purpose page only. · appears on 1 routes · implemented by `src/pages/OurPurpose.jsx`

**`hero.pillar`** — Pillar guide opener: headline and lede with no eyebrow badge, unlike every other collection page.

· The employee-recognition pillar guide only. · appears on 1 routes · implemented by `src/pages/EmployeeRecognitionHub.jsx`

**`hero.blog-index`** — Blog index opener: a single large headline with no lede, badge or call to action.

· The blog index only. · appears on 1 routes · implemented by `src/pages/BlogIndex.jsx`

**`hero.alternatives-index`** — Alternatives index opener: eyebrow badge, headline and an introductory paragraph.

· The alternatives index only. · appears on 1 routes · implemented by `src/pages/AlternativesIndex.jsx`

**`hero.case-study`** — Case study opener: customer headline and subtitle beside a pull quote and the customer's portrait.

· Every customer success story. · appears on 4 routes · implemented by `src/pages/CaseStudyPage.jsx`

**`hero.partner`** — Partner opener: the partner's logo above the homepage headline treatment, with the partner offer sentence in place of the standard sub-paragraph.

· Every partner landing page. · appears on 3 routes · implemented by `src/pages/PartnerPage.jsx`

**`hero.ebook`** — Lead-magnet opener: a bold-weight display headline and a multi-line lede ending in a small indented benefit list.

· The ebook landing page only. · appears on 1 routes · implemented by `src/pages/EbookPage.jsx`

**`hero.legal`** — Legal document opener: document title and a centred last-updated line.

· Both legal pages. · appears on 2 routes · implemented by `src/pages/LegalPage.jsx`

### NARRATIVE

_Explanatory product or mission content — the blocks that make the page's argument._

**`narrative.seeds`** — Two-column feature block pairing a product screenshot and its tagged-value badge with a headline and leaf-marked benefit list.

· The homepage only. · appears on 1 routes · implemented by `src/components/SeedsSection.jsx`

**`narrative.report-csr`** — Paired two-column blocks covering engagement reporting and CSR commitments, each a visual beside a headline and leaf-marked list.

· The homepage only. · appears on 1 routes · implemented by `src/components/ReportCsrSection.jsx`

**`narrative.esg-pillar`** — An ESG pillar block: tick badge, headline, body copy and the pillar's supporting visual. Repeats once per pillar with different content.

· The ESG page, three times over for Environmental, Social and Governance. · appears on 1 routes · implemented by `src/pages/Esg.jsx`

**`narrative.sdg-goals`** — Four-up column row presenting UN Sustainable Development Goal categories, each an icon above a label and caption.

· Shared byte-identically by the ESG and our-purpose pages. · appears on 2 routes · implemented by `src/components/SdgSection.jsx`

**`narrative.goals-2027`** — Full-bleed leaf-green band carrying three serif stat columns against a 2027 commitment headline.

· The our-purpose page only. · appears on 1 routes · implemented by `src/pages/OurPurpose.jsx`

**`narrative.icon-feature-row`** — Three-up row of percentage-width columns, each an icon above a serif sub-heading and a short paragraph.

· The pricing and our-purpose pages. · appears on 2 routes · implemented by `src/components/IconFeatureColumn.jsx`

**`narrative.partner-feature`** — Partner-page feature block: centred display heading and copy above a two-column visual row. A rearrangement of the homepage's feature assets, not a reuse of them.

· Every partner landing page, twice per page. · appears on 3 routes · implemented by `src/pages/PartnerPage.jsx`

### PROOF

_Social proof: testimonials, customer logos, ratings and published outcomes._

**`proof.testimonials`** — Paired testimonial cards, each a framed customer portrait above a quote, attribution and company logo, with static decorative leaves behind.

· The homepage, pricing, referral and partner pages. · appears on 6 routes · implemented by `src/components/Testimonials.jsx`

**`proof.logo-strip`** — Single row of six customer logos at individually measured widths. No greyscale, no opacity shift, no marquee.

· The homepage, pricing, referral and partner pages. · appears on 6 routes · implemented by `src/components/LogoStrip.jsx`

**`proof.g2-rating`** — Review-platform logo above five stars and a rating sentence.

· The homepage, pricing, contact, schedule-a-demo, referral, ebook and partner pages. · appears on 9 routes · implemented by `src/components/G2Block.jsx`

**`proof.stat-row`** — Row of four outlined stat pills carrying headline figures with footnote references.

· The homepage, the pillar guide and the partner pages. · appears on 5 routes · implemented by `src/components/StatRow.jsx`

**`proof.case-study-grid`** — Grid of customer story cards, each a logo, outcome blurb and link through to the full story.

· The case-studies index only. · appears on 1 routes · implemented by `src/components/CaseStudyCard.jsx`

**`proof.case-study-meta`** — Narrow outlined card listing six labelled facts about the customer — industry, size, location and similar.

· Every customer success story. · appears on 4 routes · implemented by `src/components/CaseStudyMetaCard.jsx`

**`proof.case-study-teasers`** — Row of teaser cards linking to the other customer stories, each carrying the customer's logo.

· Every customer success story. · appears on 4 routes · implemented by `src/components/CaseStudyTeaserCard.jsx`

### CONTENT

_Long-form editorial body copy and the structured sub-blocks that appear inside it._

**`content.prose-body`** — The shared long-form prose container and its element type scale — headings, paragraphs, lists, blockquotes and figures.

· Both legal pages, every case study, the pillar guide, every blog article and every comparison page. · appears on 177 routes · implemented by `src/components/RichText.jsx`

**`content.prose-left`** — Left-aligned bare paragraph column used for short intros and asides, outside the rich-text container.

· Glossary detail pages, and company-value pages that carry an absence note. · appears on 55 routes · implemented by `src/templates/blocks.jsx > ProseLeft`

**`content.section-heading`** — Centred display heading that opens a block within a longer page.

· Every collection index and detail page, plus the comparison and alternatives-index pages. · appears on 175 routes · implemented by `src/templates/blocks.jsx > SectionHeading`

**`content.leaf-bullets`** — Leaf-marked bullet list of short statements.

· Collection detail pages and comparison pages. · appears on 117 routes · implemented by `src/components/blocks/LeafBulletList.jsx`

**`content.leaf-definition-list`** — Leaf-marked definition list pairing a bold term with a short explanatory paragraph.

· Company-value, team-guide and comparison pages, plus the pillar guide. · appears on 53 routes · implemented by `src/components/blocks/LeafDl.jsx`

**`content.faq`** — Question-and-answer definition list. Always fully open — not an accordion, with no disclosure behaviour at all.

· Every collection detail page, the comparison pages and the pillar guide. · appears on 118 routes · implemented by `src/components/blocks/FaqDl.jsx`

**`content.message-grid`** — Grid of example recognition-message cards, each a message body, category badge and usage note, over static decorative leaves.

· Message-set, company-value and team-guide detail pages. · appears on 72 routes · implemented by `src/components/MessageCard.jsx`

**`content.sources`** — Numbered list of external citations, rendered inert because the clone carries no off-domain links.

· Every alternatives comparison page. · appears on 15 routes · implemented by `src/components/SourcesList.jsx`

### COLLECTION

_Listing grids and cross-sell groups that route the reader to other pages._

**`collection.card-grid`** — Flex-wrap grid of white outlined link cards, each a serif title, optional description and a bold call-to-action label keyed to the link target.

· Every collection index and detail page, the alternatives index and the pillar guide. · appears on 176 routes · implemented by `src/components/LinkCard.jsx`

**`collection.blog-rows`** — Single column of full-width split rows, each pairing a cover image against a copy panel. Row height is image-driven, so the pitch stays constant regardless of title length.

· The blog index only. · appears on 1 routes · implemented by `src/components/BlogCard.jsx`

**`collection.related-articles`** — Pair of related-article cards carrying decorative leaves and an underlined call to action. Distinct from the standard link card.

· Every blog article. · appears on 53 routes · implemented by `src/components/RelatedCard.jsx`

**`collection.comparison-glance`** — At-a-glance definition list summarising a competitor's pricing, best-fit audience and website.

· Every alternatives comparison page. · appears on 15 routes · implemented by `src/components/blocks/LeafDl.jsx`

### CONVERSION

_Forms, pricing, scheduling and closing calls to action._

**`conversion.final-cta`** — Closing block: three reassurance columns above a display headline, trial button, no-credit-card line and the two platform install links.

· Most templates. Absent from the blog index, the legal pages, the referral page and the pillar guide, which closes with a lead-magnet form instead. · appears on 136 routes · implemented by `src/components/CtaSection.jsx`

**`conversion.contact-form`** — Name, email, company and message fields in a white outlined card, with a full idle/pending/done/error state machine and a honeypot.

· The contact page only. · appears on 1 routes · implemented by `src/components/form/ContactForm.jsx`

**`conversion.referral-form`** — Six required referrer and referee fields plus an optional greeting, in a white outlined card with the shared form state machine.

· The referral page only. · appears on 1 routes · implemented by `src/components/form/ReferralForm.jsx`

**`conversion.lead-magnet-form`** — Name, email and company capture with a download action, used to gate a downloadable guide.

· The ebook page, the pillar guide's closing block, and every blog article. · appears on 55 routes · implemented by `src/components/blocks/LeadMagnetForm.jsx`

**`conversion.scheduler`** — Static stand-in for the original's third-party booking widget, matched to its measured box. Deliberately loads no external script.

· The schedule-a-demo page and every partner landing page. · appears on 4 routes · implemented by `src/components/SchedulerPlaceholder.jsx`

**`conversion.earnings-tiers`** — Row of outlined pills showing referral reward tiers, collapsing to a two-column grid on narrow viewports.

· The referral page only. · appears on 1 routes · implemented by `src/components/EarningsTiers.jsx`

**`conversion.partner-cta-panel`** — Black full-width panel with a cream headline and button, promoting a partner product. The only block on the site using fixed pixel padding and non-standard corner radii.

· Every blog article. · appears on 53 routes · implemented by `src/components/ArkettaCtaPanel.jsx`
