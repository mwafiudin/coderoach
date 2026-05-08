/**
 * Placeholder content seed.
 *
 * Run via: pnpm tsx src/lib/seed.ts
 *
 * Idempotent — re-runnable; uses upsert pattern via findOne+update or create.
 * Requires DATABASE_URI + PAYLOAD_SECRET env vars.
 */
import { getPayload } from 'payload';
import config from '../payload.config';

async function seed() {
  const payload = await getPayload({ config });
  console.log('🌱 Seeding placeholder content...\n');

  // ============ GLOBALS ============

  await payload.updateGlobal({
    slug: 'top-bar',
    data: {
      enabled: true,
      tag: '[ // NOW BOOKING ]',
      message: '2 engagement slots open for Q3 — discovery sprints through Jul 18.',
      link: { label: 'Start a 48-hour discovery →', href: '#contact' },
    },
  });
  console.log('✓ TopBar');

  await payload.updateGlobal({
    slug: 'hero',
    data: {
      pillText: 'Senior product engineering — built to outlast the brief',
      headline: { lead: 'Engineering that thinks', accent: 'like an operator.' },
      lede: 'We build software, automate workflows, and ship analytics for companies that need more than a vendor.',
      ctaPrimary: { label: 'Start a 48-hour discovery', href: '#contact' },
      ctaSecondary: { label: "See what we've shipped", href: '#work' },
      metaItems: [
        { value: '40+', label: 'operators shipped' },
        { value: '4yr', label: 'studio, 11 humans' },
        { value: '2 weeks', label: 'typical kickoff' },
      ],
      trustedBy: {
        label: '// TRUSTED BY 40+ OPERATORS',
        tagline: 'Across Indonesia & SEA — F&B, logistics, finance, agencies.',
      },
    },
  });
  console.log('✓ Hero');

  await payload.updateGlobal({
    slug: 'studio',
    data: {
      sectionMarker: "Who you'll work with",
      heading: 'A small senior team in Jakarta.',
      lede: 'Coderoach is 11 humans — engineers, designers, and a single ops person who keeps the calendar honest. No juniors hidden behind senior bios. The person scoping your project is the person building it.',
      stats: [
        { num: '11', label: 'SENIORS\nNO JUNIORS' },
        { num: '4', accent: 'yr', label: 'YEARS\nOPERATING' },
        { num: '40', accent: '+', label: 'SHIPPED\nENGAGEMENTS' },
        { num: 'JKT', label: 'KEMANG\nJAKARTA' },
      ],
    },
  });
  console.log('✓ Studio');

  await payload.updateGlobal({
    slug: 'contact',
    data: {
      sectionMarker: 'Start a project',
      heading: { line1: 'Got something to ship?', line2Accent: "Let's talk." },
      lede: 'We take on a small number of new engagements each quarter. Tell us what you\'re trying to ship — we read every brief and reply within 48 hours.',
      scopes: [
        { scope: 'Build' },
        { scope: 'Automate' },
        { scope: 'Intelligence' },
        { scope: 'Augment' },
        { scope: 'Not sure yet' },
      ],
      formLabels: {
        email: '[ // YOUR EMAIL ]',
        scope: '[ // SCOPE ]',
        brief: '[ // WHAT ARE YOU SHIPPING? ]',
        submit: 'Send the brief →',
        emailFallback: 'hello@coderoach.studio',
      },
      successHeading: 'Thanks — we got your brief.',
    },
  });
  console.log('✓ Contact');

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Coderoach Studio',
      siteDescription: 'Senior product engineering studio in Jakarta.',
      navStatus: { label: 'JKT · OPEN Q3' },
      navCta: { label: 'Start a discovery →', href: '#contact' },
      footer: {
        tagline: 'Senior product and engineering. Jakarta, ID. Remote across SEA. Built to outlast the brief.',
        badge: 'JKT-1 · OPEN FOR Q3',
        columns: [
          {
            heading: 'WORK',
            links: [
              { label: 'Case studies', href: '#work' },
              { label: 'Services', href: '#services' },
              { label: 'Process', href: '#process' },
              { label: 'Products', href: '#products' },
            ],
          },
          {
            heading: 'COMPANY',
            links: [
              { label: 'Studio', href: '#studio' },
              { label: 'Field notes', href: '#' },
              { label: 'Open roles', href: '#' },
              { label: 'Press kit', href: '#' },
            ],
          },
          {
            heading: 'CONTACT',
            links: [
              { label: 'hello@coderoach.studio', href: 'mailto:hello@coderoach.studio' },
              { label: '+62 21 555 0414', href: '#' },
              { label: 'Kemang, Jakarta', href: '#' },
              { label: '@coderoach.studio', href: '#' },
            ],
          },
        ],
        metaLine: {
          left: '[ © 2026 PT CODEROACH STUDIO ] · NPWP 04.567.891.2-345.000',
          right: 'BUILT IN-HOUSE · NEXT.JS 15 · [ // BUILT TO OUTLAST THE BRIEF // ]',
        },
      },
    },
  });
  console.log('✓ SiteSettings');

  // ============ COLLECTIONS ============

  // Helper: clear and recreate a collection
  async function reset(slug: any, docs: any[]) {
    const existing = await payload.find({ collection: slug, limit: 100 });
    for (const d of existing.docs) {
      await payload.delete({ collection: slug, id: d.id });
    }
    for (const data of docs) {
      await payload.create({ collection: slug, data });
    }
  }

  await reset('services', [
    {
      order: 1,
      tag: 'BUILD',
      icon: 'build',
      title: 'Build',
      tagline: 'Web platforms, native apps, internal tools.',
      blurb: 'Production software with the same rigor we use on our own products. Modern stack, opinionated architecture, designed to scale beyond the launch.',
      list: [{ item: 'Web applications' }, { item: 'Mobile apps (iOS, Android)' }, { item: 'Company websites' }, { item: 'Internal admin tools' }],
      stack: [{ tech: 'Next.js' }, { tech: 'React Native' }, { tech: 'Postgres' }, { tech: 'TypeScript' }],
    },
    {
      order: 2,
      tag: 'AUTOMATE',
      icon: 'automate',
      title: 'Automate',
      tagline: 'Workflows that ran on humans, now run on code.',
      blurb: "Most companies have someone copying data between spreadsheets at 2am. We replace that someone with a system that doesn't sleep.",
      list: [{ item: 'Workflow automation' }, { item: 'API integrations & pipelines' }, { item: 'Reporting automation' }, { item: 'Process digitization' }],
      stack: [{ tech: 'Node.js' }, { tech: 'Python' }, { tech: 'n8n' }, { tech: 'Webhooks' }],
    },
    {
      order: 3,
      tag: 'INTELLIGENCE',
      icon: 'intelligence',
      title: 'Intelligence',
      tagline: 'Decisions, not dashboards.',
      blurb: 'Anyone can build a dashboard. We build the data layer that makes decisions obvious — KPIs that matter, anomaly detection that fires, forecasts you can defend.',
      list: [{ item: 'Data warehouses & ETL' }, { item: 'Custom analytics dashboards' }, { item: 'Multi-platform ads analytics' }, { item: 'Forecasting & anomaly detection' }],
      stack: [{ tech: 'Postgres' }, { tech: 'BigQuery' }, { tech: 'Metabase' }, { tech: 'dbt' }],
    },
    {
      order: 4,
      tag: 'AUGMENT',
      icon: 'augment',
      title: 'Augment',
      tagline: 'Add intelligence to systems you already have.',
      blurb: 'LLMs are infrastructure now. We integrate them where they actually move the needle — customer ops, internal search, content workflows.',
      list: [{ item: 'LLM integration & RAG' }, { item: 'Agentic workflows' }, { item: 'AI-powered internal tools' }, { item: 'Document processing' }],
      stack: [{ tech: 'Anthropic' }, { tech: 'OpenAI' }, { tech: 'LangChain' }, { tech: 'pgvector' }],
    },
  ]);
  console.log('✓ Services (4)');

  await reset('cases', [
    {
      idx: '01',
      client: 'Bumi Logistics',
      description: 'Replaced a 7-year-old console with a real-time dispatch platform.',
      meta: 'LOGISTICS · BUILD',
      featured: true,
      published: true,
      featuredDetails: {
        badgeLabel: '[ FEATURED · 2026 ]',
        shippedLabel: '[ ✓ SHIPPED ]',
        metaLine: 'LOGISTICS · BUILD · 11 WEEKS · 2 ENGINEERS',
        headline: 'Bumi Logistics — replaced a 7-year-old console with a real-time dispatch platform.',
        description: 'Two engineers, eleven weeks, three thousand drivers in production from day one. No big-bang cutover — a parallel deploy, audited every Friday.',
        metrics: [
          { num: '38', accent: '%', label: 'FASTER DISPATCH' },
          { num: '11', accent: 'w', label: 'TO PRODUCTION' },
          { num: '2', accent: '×', label: 'FLEET CAPACITY' },
        ],
        codePanel: {
          tag: '[ .TS ]',
          path: 'apps/dispatch/route.ts',
          lines: [
            { line: '<span style="color:#C4C0C5">export async function</span> assign() {' },
            { line: '&nbsp;&nbsp;<span style="color:#C4C0C5">const</span> fleet = <span style="color:#C4C0C5">await</span> live.fleet()' },
            { line: '&nbsp;&nbsp;<span style="color:#C4C0C5">const</span> queue = <span style="color:#C4C0C5">await</span> live.queue()' },
            { line: '&nbsp;&nbsp;<span style="color:#C4C0C5">const</span> plan&nbsp; = solve(fleet, queue)' },
            { line: '&nbsp;&nbsp;<span style="color:#C4C0C5">await</span> emit(<span style="color:#2C70FE">"plan.ready"</span>, plan)' },
            { line: '&nbsp;&nbsp;<span style="color:#C4C0C5">return</span> plan' },
            { line: '}' },
          ],
        },
        stack: [{ tech: 'NEXT.JS 15' }, { tech: 'POSTGRES' }, { tech: 'TEMPORAL' }, { tech: 'VERCEL' }],
        caseStudyHref: '#',
      },
    },
    { idx: '02', client: 'Kopi/Co Group', description: 'Multi-outlet F&B reporting, daily survival metrics, AI-assisted P&L.', meta: 'F&B · INTELLIGENCE', pills: [{ pill: 'BIGQUERY' }, { pill: 'METABASE' }], published: true },
    { idx: '03', client: 'Senayan Studio', description: 'KOL contract automation, payment workflow, performance dashboards.', meta: 'AGENCY · AUTOMATE', pills: [{ pill: 'N8N' }, { pill: 'TIKTOK API' }], published: true },
    { idx: '04', client: 'Adira Capital', description: 'Internal search + RAG layer over 28k policy docs for ops team.', meta: 'FINANCE · AUGMENT', pills: [{ pill: 'ANTHROPIC' }, { pill: 'PG-VECTOR' }], published: true },
    { idx: '05', client: 'Halo Ventures', description: 'Portfolio operating console — KPI ingest from 14 portfolio cos.', meta: 'VC · BUILD', pills: [{ pill: 'REACT' }, { pill: 'POSTGRES' }], published: true },
    { idx: '06', client: 'PT Citra Maju', description: 'Replaced 12hr manual report with 30-second daily ops dashboard.', meta: 'MANUFACTURING · INTELLIGENCE', pills: [{ pill: 'PYTHON' }, { pill: 'DBT' }], published: true },
  ]);
  console.log('✓ Cases (6)');

  await reset('products', [
    {
      order: 1,
      name: 'Laporta',
      tag: 'F&B OPS',
      blurb: "For Indonesian F&B operators who outgrew spreadsheets but can't justify enterprise ERP. Sits above your POS as a profit intelligence layer.",
      bullets: [{ bullet: 'Outlet financial analysis' }, { bullet: 'Daily survival metrics' }, { bullet: 'AI-assisted P&L chat' }, { bullet: 'Multi-outlet aggregation' }],
      shippedYear: '2024',
      usage: '1.2K OUTLETS',
      link: { label: 'laporta.id →', href: '#' },
      vizType: 'laporta',
    },
    {
      order: 2,
      name: 'Viralytics',
      tag: 'KOL OS',
      blurb: 'End-to-end platform for KOL campaign management. From sourcing to contracts to live performance tracking, all in one workspace.',
      bullets: [{ bullet: 'KOL directory & sourcing' }, { bullet: 'Campaign administration' }, { bullet: 'Live performance dashboards' }, { bullet: 'TikTok & Meta API integrations' }],
      shippedYear: '2025',
      usage: '380 CAMPAIGNS',
      link: { label: 'viralytics.id →', href: '#' },
      vizType: 'viralytics',
    },
  ]);
  console.log('✓ Products (2)');

  await reset('process-phases', [
    { order: 1, tag: 'PHASE 01', icon: 'discover', name: 'Discover', week: 'WK 0–1', what: 'We map the actual problem, not just the requested output. Stakeholder interviews, system audit, scope tightening.', deliv: 'Written brief · technical scope · success metrics' },
    { order: 2, tag: 'PHASE 02', icon: 'design', name: 'Design', week: 'WK 1–3', what: 'Wireframes, data models, system architecture. We design what we can defend in code, not just in Figma.', deliv: 'Clickable prototype · technical spec · ERD' },
    { order: 3, tag: 'PHASE 03', icon: 'layers', name: 'Build', week: 'WK 3–N', what: 'Two-week sprints. Demos every Friday. No surprise reveals. Continuous deploy from day one.', deliv: 'Working software · deployed continuously' },
    { order: 4, tag: 'PHASE 04', icon: 'handoff', name: 'Handoff', week: 'FINAL WK', what: "Documentation, training, source code, infra access. We're a phone call, not a dependency.", deliv: 'Source · docs · infra credentials · 30-day support' },
  ]);
  console.log('✓ ProcessPhases (4)');

  await reset('tenets', [
    { order: 1, icon: 'users', title: 'Senior team only.', description: 'No junior hand-offs. Smaller team, fewer layers, fewer translation losses.' },
    { order: 2, icon: 'voice', title: 'Opinionated, not obedient.', description: "We'll build what you ask for. We'll also tell you when what you asked for is the wrong thing." },
    { order: 3, icon: 'shield', title: 'Built to outlast.', description: "Clean architecture, full handoff docs, no proprietary lock-in. We're a phone call, not a dependency." },
  ]);
  console.log('✓ Tenets (3)');

  await reset('faqs', [
    { order: 1, question: 'How do you price?', answer: "Project-based, scoped per engagement. We don't sell hours; we sell outcomes. After a discovery call, you'll get a fixed-scope proposal with milestones and deliverables." },
    { order: 2, question: 'Smallest project you take on?', answer: "Roughly Rp 50jt scope and up. Below that, we'll honestly tell you a freelancer is the better choice — and sometimes refer you to one." },
    { order: 3, question: 'Do you do retainers?', answer: 'Yes, for ongoing product work after launch. Not for "pool of hours" engagements — those are how agencies and clients both lose.' },
    { order: 4, question: 'Where are you based?', answer: 'Jakarta, Indonesia. We work with clients across Indonesia and SEA. Remote-first, on-site for kickoffs and major milestones.' },
    { order: 5, question: 'What stack do you use?', answer: 'Pragmatic and modern: Next.js, React Native, Node.js, Python, PostgreSQL, Vercel, AWS. We pick stack to fit the problem, not to fit our resume.' },
    { order: 6, question: 'Do you sign NDAs?', answer: 'Yes. Standard mutual NDA available before discovery calls.' },
    { order: 7, question: 'What happens after launch?', answer: 'You own the code, the infrastructure, and the documentation. We can stay on retainer for ongoing work, or hand off cleanly to your in-house team. Your call.' },
  ]);
  console.log('✓ FAQs (7)');

  await reset('clients', [
    { order: 1, name: 'Laporta' },
    { order: 2, name: 'Viralytics' },
    { order: 3, name: 'Bumi Logistics' },
    { order: 4, name: 'Kopi/Co Group' },
    { order: 5, name: 'Senayan Studio' },
    { order: 6, name: 'Adira Capital' },
    { order: 7, name: 'Halo Ventures' },
    { order: 8, name: 'PT Citra Maju' },
  ]);
  console.log('✓ Clients (8)');

  console.log('\n✓ Seed complete. Visit /admin to log in & edit, or http://localhost:3000 to view.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
