// T-PARTNER data — CLONE_SPEC_CONTENT_B §8 (per-instance table), §12.7, §9.
//
// ALL REAL DATA. §8 tabulates the entire difference between the three routes:
// logo file + height, discount percentage, the offer-sentence suffix, the extra
// CTA small-print clause and the <title>. Everything else on the page is the
// homepage, unchanged.
//
// `calendlyUrl` is recorded for completeness only — it is NEVER requested: the
// embed is replaced by a static placeholder (§5.5, §16.4).
export const PARTNERS = {
  '50pros': {
    slug: '50pros',
    name: '50Pros',
    titleTag: 'Evergreen x 50Pros',
    logo: '/assets/50pros-logo-black-e3d976.svg',
    logoAlt: '50Pros logo',
    // 251.84 x 75 @1280
    logoClass: 'mx-auto h-[75px] w-auto',
    discountPct: 30,
    offerSuffix: 'a 50Pros customer.',
    ctaSmallPrintSuffix: 'Contact us for your 30% 50Pros discount',
    calendlyUrl: null,
    seo: {
      title: 'Evergreen x 50Pros',
      description: 'Evergreen for 50Pros: get 30% off from your first year.',
    },
  },
  'product-hunt': {
    slug: 'product-hunt',
    name: 'Product Hunt',
    titleTag: 'Evergreen x Product Hunt',
    logo: '/assets/product-hunt-logo-copy-f0147c.webp',
    logoAlt: 'Product Hunt logo',
    // 416.66 x 75 @1280 — note the extra `max-w-full` on this instance.
    logoClass: 'mx-auto h-[75px] w-auto max-w-full',
    discountPct: 30,
    offerSuffix: 'a Product Hunt Member.',
    ctaSmallPrintSuffix: 'Contact us for your 30% Product Hunt discount',
    calendlyUrl: null,
    seo: {
      title: 'Evergreen x Product Hunt',
      description: 'Evergreen for Product Hunt: get 30% off from your first year.',
    },
  },
  'the-people-people-group': {
    slug: 'the-people-people-group',
    name: 'The People People Group',
    titleTag: 'The People People Group | Evergreen Partner Page',
    logo: '/assets/tppg-dark-logo-a4eebe.webp',
    logoAlt: 'The People People Group logo',
    // 91.27 x 100 @1280 — the only instance at h-[100px].
    logoClass: 'mx-auto h-[100px] w-auto',
    discountPct: 15,
    offerSuffix: 'a member of The People People Group.',
    ctaSmallPrintSuffix: 'Contact us for your 15% discount',
    calendlyUrl: null,
    seo: {
      title: 'The People People Group | Evergreen Partner Page',
      description:
        'Evergreen for The People People Group: get 15% off from your first year.',
    },
  },
}

export const PARTNER_SLUGS = Object.keys(PARTNERS)
