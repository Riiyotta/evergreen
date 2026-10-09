// Identity rows for the four T-INDEX / T-DETAIL collections.
//
// REAL DATA ONLY: every slug and every display title/name below is transcribed
// verbatim from CLONE_SPEC_CONTENT_B §14.3 (index card titles + slug mapping) and
// cross-checked against the recon JSON in _reference/recon-b/*_index.json. Titles
// and slugs are navigational structure, so they must stay exact.
//
// Editorial prose (ledes, definitions, bodies, messages, FAQs) is NOT here — it is
// generated as clearly-marked placeholder in src/data/collections.js, per the spec's
// decision not to transcribe it (§2.2, §5.2).

export const GLOSSARY_ROWS = [
  ['appreciation-vs-recognition', 'Appreciation versus recognition'],
  ['culture-of-recognition', 'Culture of recognition'],
  ['employee-appreciation-day', 'Employee Appreciation Day'],
  ['employee-of-the-month', 'Employee of the month'],
  ['employee-recognition', 'Employee recognition'],
  ['formal-recognition', 'Formal recognition'],
  ['informal-recognition', 'Informal recognition'],
  ['intrinsic-vs-extrinsic-motivation', 'Intrinsic versus extrinsic motivation'],
  ['kudos', 'Kudos'],
  ['monetary-recognition', 'Monetary recognition'],
  ['non-cash-incentives', 'Non-cash incentives'],
  ['non-monetary-recognition', 'Non-monetary recognition'],
  ['participation-rate', 'Participation rate'],
  ['peer-to-peer-recognition', 'Peer-to-peer recognition'],
  ['points-based-recognition', 'Points-based recognition'],
  ['public-vs-private-recognition', 'Public versus private recognition'],
  ['recognition-bias', 'Recognition bias'],
  ['recognition-budget', 'Recognition budget'],
  ['recognition-fatigue', 'Recognition fatigue'],
  ['recognition-frequency', 'Recognition frequency'],
  ['recognition-platform', 'Recognition platform'],
  ['recognition-program', 'Recognition program'],
  ['recognition-reach', 'Recognition reach'],
  ['service-award', 'Service award'],
  ['shoutout', 'Shoutout'],
  ['social-recognition', 'Social recognition'],
  ['spot-award', 'Spot award'],
  ['top-down-recognition', 'Top-down recognition'],
  ['total-rewards', 'Total rewards'],
  ['values-based-recognition', 'Values-based recognition'],
]

// `for` h1s: §14 records only the startups one verbatim
// ("Employee Recognition for Startups: What Works"). The other 11 follow the same
// pattern — DERIVED, not measured. See handoff note.
export const FOR_ROWS = [
  ['agencies', 'Agencies', 'Employee Recognition for Agencies: What Works'],
  ['customer-support-teams', 'Customer support teams', 'Employee Recognition for Customer Support Teams: What Works'],
  ['education', 'Education teams', 'Employee Recognition for Education Teams: What Works'],
  ['engineering-teams', 'Engineering teams', 'Employee Recognition for Engineering Teams: What Works'],
  ['healthcare', 'Healthcare teams', 'Employee Recognition for Healthcare Teams: What Works'],
  ['manufacturing', 'Manufacturing teams', 'Employee Recognition for Manufacturing Teams: What Works'],
  ['nonprofits', 'Nonprofits', 'Employee Recognition for Nonprofits: What Works'],
  ['remote-teams', 'Remote teams', 'Employee Recognition for Remote Teams: What Works'],
  ['retail-and-hospitality', 'Retail and hospitality teams', 'Employee Recognition for Retail and Hospitality Teams: What Works'],
  ['sales-teams', 'Sales teams', 'Employee Recognition for Sales Teams: What Works'],
  ['small-businesses', 'Small businesses', 'Employee Recognition for Small Businesses: What Works'],
  ['startups', 'Startups', 'Employee Recognition for Startups: What Works'],
]

export const VALUE_ROWS = [
  ['accountability', 'Accountability'],
  ['adaptability', 'Adaptability'],
  ['candour', 'Candour'],
  ['clarity', 'Clarity'],
  ['collaboration', 'Collaboration'],
  ['courage', 'Courage'],
  ['craftsmanship', 'Craftsmanship'],
  ['curiosity', 'Curiosity'],
  ['empathy', 'Empathy'],
  ['generosity', 'Generosity'],
  ['gratitude', 'Gratitude'],
  ['humility', 'Humility'],
  ['inclusion', 'Inclusion'],
  ['innovation', 'Innovation'],
  ['integrity', 'Integrity'],
  ['learning', 'Learning'],
  ['ownership', 'Ownership'],
  ['patience', 'Patience'],
  ['pragmatism', 'Pragmatism'],
  ['reliability', 'Reliability'],
  ['resilience', 'Resilience'],
  ['respect', 'Respect'],
  ['sustainability', 'Sustainability'],
  ['transparency', 'Transparency'],
  ['trust', 'Trust'],
]

// §14.3 — alphabetical by TITLE (which is why `going-the-extra-mile` is first).
// The leading/embedded number in each title IS the message count (§12.3).
export const MESSAGE_ROWS = [
  ['going-the-extra-mile', '12 Messages for When Someone Went Above and Beyond'],
  ['great-presentation', 'Complimenting a Presentation: 10 Message Examples'],
  ['earning-a-certification', 'Congratulations on a Certification: 10 Messages'],
  ['employee-appreciation', 'Employee Appreciation Messages: 13 Specific Examples'],
  ['employee-of-the-month', 'Employee of the Month Messages: 10 Examples'],
  ['end-of-year', 'End of Year Messages to Your Team: 12 Examples'],
  ['farewell', 'Farewell Messages for a Colleague Leaving: 13 Examples'],
  ['intern-farewell', 'Farewell Messages for an Intern: 10 Examples'],
  ['parental-leave', 'Parental Leave Messages for a Colleague: 10 Examples'],
  ['project-completion', 'Project Completion Messages: 12 Ways to Mark a Launch'],
  ['promotion', 'Promotion Congratulation Messages: 12 That Aren’t Generic'],
  ['hitting-a-deadline', 'Recognising a Deadline Met: 10 Message Examples'],
  ['sales-target', 'Recognising a Sales Win: 10 Message Examples'],
  ['attention-to-detail', 'Recognising Attention to Detail: 10 Messages'],
  ['behind-the-scenes-work', 'Recognising Behind-the-Scenes Work: 10 Messages'],
  ['staying-calm-under-pressure', 'Recognising Composure at Work: 10 Messages'],
  ['cross-team-collaboration', 'Recognising Cross-Team Work: 10 Messages'],
  ['leadership', 'Recognising Good Leadership: 10 Message Examples'],
  ['great-customer-service', 'Recognising Great Customer Service: 12 Message Examples'],
  ['taking-initiative', 'Recognising Initiative at Work: 10 Message Examples'],
  ['sharing-knowledge', 'Recognising Knowledge Sharing: 10 Message Examples'],
  ['improving-a-process', 'Recognising Process Improvements: 10 Messages'],
  ['remote-team', 'Recognising Remote Employees: 10 Message Examples'],
  ['retirement', 'Retirement Messages for a Colleague: 12 Examples'],
  ['covering-for-a-colleague', 'Thank You for Covering for Me: 10 Messages'],
  ['organising-a-team-event', 'Thank You for Organising the Team Event: 10 Messages'],
  ['mentoring', 'Thank You Messages for a Mentor: 12 Examples'],
  ['helping-a-colleague', 'Thank You Messages for Helping a Colleague: 12 Examples'],
  ['thanking-your-manager', 'Thank You Messages for Your Manager: 12 Examples'],
  ['thanking-the-whole-team', 'Thank You Messages to the Whole Team: 12 Examples'],
  ['incident-response', 'Thanking Someone After an Incident: 10 Messages'],
  ['returning-from-leave', 'Welcome Back Messages After Leave: 10 Examples'],
  ['new-team-member', 'Welcome Messages for a New Team Member: 12 Examples'],
  ['work-anniversary', 'Work Anniversary Messages: 14 Examples for Every Milestone'],
  ['employee-birthday', 'Work Birthday Messages: 12 That Are Not Just Emoji'],
]

// Blog articles referenced by the "Further reading" CARD_GRIDs. These four slugs +
// titles are real — read out of the recon JSON for gloss_kudos and for_startups.
// /blog/* itself is another template (another agent); we only link to it.
export const BLOG_ROWS = [
  ['employee-recognition-in-slack', 'Employee Recognition in Slack: A Practical Setup Guide'],
  ['5-companies-with-the-best-employee-recognition-programs', '5 companies with the best employee recognition programs'],
  ['how-to-create-employee-recognition-program-step-by-step-guide', 'Creating an employee recognition program: step by step'],
  ['reasons-why-employee-recognition-programs-fail-and-how-to-ensure-its-success', 'Why recognition programs fail (and how to fix them)'],
]

// §5.2 "Badge vocabulary observed" — free text, not an enum. Cycled across the
// generated message sets so the badge widths vary the way the original's do.
export const MESSAGE_CATEGORIES = [
  'Manager',
  'Peer',
  'Founder, the day before launch',
  'Ward manager, at handover',
  'Manager, to a report',
  'Peer, engineering',
  'Peer, light',
  'Peer, humorous',
  'Peer, 1 year, light',
  'Manager, 3 years',
  'Peer, overdue promotion',
  'Manager, in public',
  'Skip-level, written',
  'Peer, same shift',
]
