/**
 * Placeholder content seed.
 *
 * Run via: npm run seed
 *
 * Idempotent — clears collections and recreates with placeholder data.
 * Requires DATABASE_URI + PAYLOAD_SECRET env vars (loaded via --env-file=.env.local).
 */
import { getPayload } from 'payload';
import config from '../payload.config';

async function seed() {
  const payload = await getPayload({ config });
  console.log('🌱 Seeding placeholder content...\n');

  // Helper: clear and recreate
  async function reset(slug: any, docs: any[]) {
    const existing = await payload.find({ collection: slug, limit: 200, overrideAccess: true });
    for (const d of existing.docs) {
      await payload.delete({ collection: slug, id: d.id, overrideAccess: true });
    }
    const created: any[] = [];
    for (const data of docs) {
      const doc = await payload.create({ collection: slug, data, overrideAccess: true });
      created.push(doc);
    }
    return created;
  }

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

  // Helper for Lexical paragraphs
  const lexParagraphs = (paragraphs: string[]) => ({
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        textFormat: 0,
        children: [{ mode: 'normal', text, type: 'text', style: '', detail: 0, format: 0, version: 1 }],
      })),
    },
  });

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
      about: {
        pageHeading: 'A studio that ships.',
        pageLede:
          "We're a small senior team running on a simple operating model — no juniors hidden behind senior bios, no agency layers, no surprise reveals. The person scoping your project is the person building it.",
        mission:
          'We exist to ship software that earns its place in your operations — built by senior engineers, opinionated when it matters, documented to outlast us.',
        story: lexParagraphs([
          'Coderoach started in 2022 as a side-project for two operators frustrated with how engineering work happens in Indonesia. Most agencies sell hours; most clients buy hours. The result: a system that rewards spending more time, not solving the problem faster.',
          'We bet on a different model: project-scoped, outcome-priced, senior-only. No junior hand-offs. No timesheet babysitting. Two engineers can ship more, and ship better, than ten if the two are seniors and the ten are mostly translation layers.',
          'Four years in, the bet has paid back. Forty engagements across six industries, two studio products in production (Laporta and Viralytics), and clients who come back for the next problem instead of the next pool of hours.',
          "We're growing carefully — eleven humans, no plan to be twenty. Senior bench, no juniors, ops person who keeps Friday demos honest.",
        ]),
        workspace: {
          address: 'Kemang, Jakarta Selatan, Indonesia',
          hours: 'Mon–Fri · 09:00–18:00 WIB · async otherwise',
          tagline: 'Walk-ins by appointment.',
        },
        timeline: [
          { year: '2022', title: 'Founded as side-project', description: 'Two operators, one mission: ship without the agency tax.' },
          { year: '2023', title: 'First five engagements', description: 'F&B and logistics. Project-scoped pricing model validated.' },
          { year: '2024', title: 'Laporta shipped', description: '1.2K F&B outlets. First studio product in production.' },
          { year: '2025', title: 'Viralytics shipped', description: '380 KOL campaigns. Second product, agency vertical.' },
          { year: '2026', title: 'Forty engagements milestone', description: 'Eleven humans, four years, six industries.' },
        ],
      },
    },
  });
  console.log('✓ Studio');

  await payload.updateGlobal({
    slug: 'contact',
    data: {
      sectionMarker: 'Start a project',
      heading: { line1: 'Got something to ship?', line2Accent: "Let's talk." },
      lede: "We take on a small number of new engagements each quarter. Tell us what you're trying to ship — we read every brief and reply within 48 hours.",
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
            heading: 'NAVIGATE',
            links: [
              { label: 'Services', href: '/#services' },
              { label: 'Work', href: '/work' },
              { label: 'Process', href: '/#process' },
              { label: 'Field notes', href: '/notes' },
              { label: 'FAQ', href: '/#faq' },
            ],
          },
          {
            heading: 'STUDIO',
            links: [
              { label: 'About', href: '/studio' },
              { label: 'Press kit', href: '#' },
              { label: 'Open roles', href: '#' },
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

  await payload.updateGlobal({
    slug: 'blog-settings',
    data: {
      archiveHero: {
        sectionMarker: '[ FIELD NOTES / 01 ]',
        heading: 'Notes from the studio.',
        lede: 'Engineering, operating, and the bits in between.',
      },
      postsPerPage: 12,
    },
  });
  console.log('✓ BlogSettings');

  // ============ SERVICES ============

  const serviceDocs = await reset('services', [
    {
      order: 1,
      slug: 'build',
      tag: 'BUILD',
      icon: 'build',
      title: 'Build',
      tagline: 'Web platforms, native apps, internal tools.',
      blurb: 'Production software with the same rigor we use on our own products. Modern stack, opinionated architecture, designed to scale beyond the launch.',
      list: [{ item: 'Web applications' }, { item: 'Mobile apps (iOS, Android)' }, { item: 'Company websites' }, { item: 'Internal admin tools' }],
      stack: [{ tech: 'Next.js' }, { tech: 'React Native' }, { tech: 'Postgres' }, { tech: 'TypeScript' }],
      heroLede: 'We design, build, and ship production software that earns its place in your operations. From greenfield products to internal tools that retire spreadsheets.',
      pricingNote: 'Engagement starts at Rp 50jt. Project-scoped, no hourly billing.',
      serviceFAQ: [
        { question: 'Do you do mobile?', answer: 'Yes — React Native for cross-platform, native iOS/Android only when the use case demands it.' },
        { question: 'Custom design or templates?', answer: 'Always custom. We\'re not a Figma-template shop.' },
      ],
    },
    {
      order: 2,
      slug: 'automate',
      tag: 'AUTOMATE',
      icon: 'automate',
      title: 'Automate',
      tagline: 'Workflows that ran on humans, now run on code.',
      blurb: "Most companies have someone copying data between spreadsheets at 2am. We replace that someone with a system that doesn't sleep.",
      list: [{ item: 'Workflow automation' }, { item: 'API integrations & pipelines' }, { item: 'Reporting automation' }, { item: 'Process digitization' }],
      stack: [{ tech: 'Node.js' }, { tech: 'Python' }, { tech: 'n8n' }, { tech: 'Webhooks' }],
      heroLede: 'We replace manual ops work with reliable, observable automation. The kind of thing that ran on humans at 2am, now runs on code with audit logs.',
      pricingNote: 'Engagement starts at Rp 30jt for scoped automation projects.',
    },
    {
      order: 3,
      slug: 'intelligence',
      tag: 'INTELLIGENCE',
      icon: 'intelligence',
      title: 'Intelligence',
      tagline: 'Decisions, not dashboards.',
      blurb: 'Anyone can build a dashboard. We build the data layer that makes decisions obvious — KPIs that matter, anomaly detection that fires, forecasts you can defend.',
      list: [{ item: 'Data warehouses & ETL' }, { item: 'Custom analytics dashboards' }, { item: 'Multi-platform ads analytics' }, { item: 'Forecasting & anomaly detection' }],
      stack: [{ tech: 'Postgres' }, { tech: 'BigQuery' }, { tech: 'Metabase' }, { tech: 'dbt' }],
      heroLede: 'Data work that ends in better decisions, not prettier charts. We build pipelines, KPIs, anomaly detection — and the discipline to ignore what doesn\'t matter.',
      pricingNote: 'Discovery starts at Rp 25jt. Stack & metric design billed separately.',
    },
    {
      order: 4,
      slug: 'augment',
      tag: 'AUGMENT',
      icon: 'augment',
      title: 'Augment',
      tagline: 'Add intelligence to systems you already have.',
      blurb: 'LLMs are infrastructure now. We integrate them where they actually move the needle — customer ops, internal search, content workflows.',
      list: [{ item: 'LLM integration & RAG' }, { item: 'Agentic workflows' }, { item: 'AI-powered internal tools' }, { item: 'Document processing' }],
      stack: [{ tech: 'Anthropic' }, { tech: 'OpenAI' }, { tech: 'LangChain' }, { tech: 'pgvector' }],
      heroLede: 'We integrate LLMs where they pay back the latency cost — internal search, document processing, agentic ops. No chatbot demos.',
      pricingNote: 'Pilot scope from Rp 40jt — expanded into production after measurable wins.',
    },
  ]);
  console.log(`✓ Services (${serviceDocs.length})`);

  const serviceMap = Object.fromEntries(serviceDocs.map((s: any) => [s.slug, s.id]));

  // ============ PROJECTS (cases + studio products) ============

  await reset('projects', [
    // Featured client case
    {
      order: 1,
      slug: 'bumi-logistics',
      kind: 'client',
      client: 'Bumi Logistics',
      tagline: 'Replaced a 7-year-old console with a real-time dispatch platform.',
      meta: 'LOGISTICS · BUILD',
      industry: 'logistics',
      service: serviceMap.build,
      pills: [{ pill: 'NEXT.JS' }, { pill: 'POSTGRES' }],
      featured: true,
      published: true,
      publishedYear: '2026',
      excerpt: 'Two engineers, eleven weeks, three thousand drivers in production from day one.',
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
      },
    },
    // Other client cases
    { order: 2, slug: 'kopi-co-group', kind: 'client', client: 'Kopi/Co Group', tagline: 'Multi-outlet F&B reporting, daily survival metrics, AI-assisted P&L.', meta: 'F&B · INTELLIGENCE', industry: 'fb', service: serviceMap.intelligence, pills: [{ pill: 'BIGQUERY' }, { pill: 'METABASE' }], published: true, publishedYear: '2025', excerpt: 'F&B data warehouse with daily ops dashboards. Survival metrics for 14 outlets in one place.' },
    { order: 3, slug: 'senayan-studio', kind: 'client', client: 'Senayan Studio', tagline: 'KOL contract automation, payment workflow, performance dashboards.', meta: 'AGENCY · AUTOMATE', industry: 'agency', service: serviceMap.automate, pills: [{ pill: 'N8N' }, { pill: 'TIKTOK API' }], published: true, publishedYear: '2025', excerpt: 'End-to-end KOL operations: contract → payment → live performance, all automated.' },
    { order: 4, slug: 'adira-capital', kind: 'client', client: 'Adira Capital', tagline: 'Internal search + RAG layer over 28k policy docs for ops team.', meta: 'FINANCE · AUGMENT', industry: 'finance', service: serviceMap.augment, pills: [{ pill: 'ANTHROPIC' }, { pill: 'PG-VECTOR' }], published: true, publishedYear: '2025', excerpt: 'AI-assisted policy search reducing ops research from hours to seconds.' },
    { order: 5, slug: 'halo-ventures', kind: 'client', client: 'Halo Ventures', tagline: 'Portfolio operating console — KPI ingest from 14 portfolio cos.', meta: 'VC · BUILD', industry: 'vc', service: serviceMap.build, pills: [{ pill: 'REACT' }, { pill: 'POSTGRES' }], published: true, publishedYear: '2024', excerpt: 'One dashboard for portfolio metrics. Ingests directly from 14 different stacks.' },
    { order: 6, slug: 'pt-citra-maju', kind: 'client', client: 'PT Citra Maju', tagline: 'Replaced 12hr manual report with 30-second daily ops dashboard.', meta: 'MANUFACTURING · INTELLIGENCE', industry: 'manufacturing', service: serviceMap.intelligence, pills: [{ pill: 'PYTHON' }, { pill: 'DBT' }], published: true, publishedYear: '2024', excerpt: 'From manual Excel reports to real-time ops visibility. ROI within Q1.' },
    // Studio products
    {
      order: 10,
      slug: 'laporta',
      kind: 'studio',
      client: 'Laporta',
      tagline: 'Profit intelligence layer above your POS, for Indonesian F&B operators.',
      meta: 'F&B OPS · STUDIO PRODUCT',
      industry: 'fb',
      pills: [{ pill: 'NEXT.JS' }, { pill: 'POSTGRES' }, { pill: 'METABASE' }],
      published: true,
      publishedYear: '2024',
      excerpt: "For Indonesian F&B operators who outgrew spreadsheets but can't justify enterprise ERP.",
      studio: {
        vizType: 'laporta',
        usage: '1.2K OUTLETS',
        externalLink: { label: 'laporta.id →', href: 'https://laporta.id' },
        bullets: [
          { bullet: 'Outlet financial analysis' },
          { bullet: 'Daily survival metrics' },
          { bullet: 'AI-assisted P&L chat' },
          { bullet: 'Multi-outlet aggregation' },
        ],
      },
    },
    {
      order: 11,
      slug: 'viralytics',
      kind: 'studio',
      client: 'Viralytics',
      tagline: 'End-to-end KOL OS — sourcing, contracts, live performance.',
      meta: 'KOL OS · STUDIO PRODUCT',
      industry: 'agency',
      pills: [{ pill: 'TIKTOK API' }, { pill: 'NODE.JS' }],
      published: true,
      publishedYear: '2025',
      excerpt: 'KOL campaign management without spreadsheets. Sourcing → contract → live tracking in one workspace.',
      studio: {
        vizType: 'viralytics',
        usage: '380 CAMPAIGNS',
        externalLink: { label: 'viralytics.id →', href: 'https://viralytics.id' },
        bullets: [
          { bullet: 'KOL directory & sourcing' },
          { bullet: 'Campaign administration' },
          { bullet: 'Live performance dashboards' },
          { bullet: 'TikTok & Meta API integrations' },
        ],
      },
    },
  ]);
  console.log(`✓ Projects (8) — 6 client cases + 2 studio products`);

  // ============ PROCESS / TENETS / FAQs / CLIENTS ============

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

  // ============ AUTHORS + POSTS ============

  // Delete posts first (FK to authors) before resetting authors
  const existingPosts = await payload.find({ collection: 'posts', limit: 200, overrideAccess: true });
  for (const p of existingPosts.docs) {
    await payload.delete({ collection: 'posts', id: p.id, overrideAccess: true });
  }

  const authorDocs = await reset('authors', [
    { name: 'Wafi Udin', slug: 'wafi-udin', role: 'Co-founder · Engineering', bio: 'Builds operating systems for operators. 10y in production engineering across F&B and finance.' },
    { name: 'Studio Editor', slug: 'studio-editor', role: 'Studio · Editorial', bio: 'House byline for studio-collective notes.' },
  ]);
  console.log(`✓ Authors (${authorDocs.length})`);

  const wafi = (authorDocs[0] as any).id;
  const editor = (authorDocs[1] as any).id;

  // Helper: build a minimal Lexical root with paragraphs
  const lex = (paragraphs: string[]) => ({
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        textFormat: 0,
        children: [{ mode: 'normal', text, type: 'text', style: '', detail: 0, format: 0, version: 1 }],
      })),
    },
  });

  await reset('posts', [
    {
      title: "Why we don't sell hours.",
      slug: 'why-we-dont-sell-hours',
      excerpt: 'Hourly billing optimizes for the wrong thing. Here\'s what we do instead — and why every Coderoach engagement is project-scoped.',
      category: 'operating',
      author: wafi,
      publishedAt: '2026-04-22T09:00:00.000Z',
      published: true,
      featured: true,
      tags: [{ tag: 'operations' }, { tag: 'pricing' }],
      content: lex([
        'Hourly billing is the default for most agencies. We\'ve never used it. Here\'s why.',
        'When a vendor charges by the hour, the incentive structure rewards spending more time, not solving the problem faster. The buyer ends up policing timesheets instead of evaluating outcomes.',
        'Project pricing flips the incentive. We propose a scope, agree on outcomes, and the team is rewarded for finishing earlier. Better outcome, less rework, no padding.',
        'The trade-off: we have to be honest about scope upfront. That\'s where the 48-hour discovery comes in.',
      ]),
    },
    {
      title: 'Postgres for everything (until it isn\'t).',
      slug: 'postgres-for-everything',
      excerpt: 'When a single Postgres instance hits its limits, what comes next. A pragmatic walkthrough from the studio.',
      category: 'engineering',
      author: wafi,
      publishedAt: '2026-04-08T09:00:00.000Z',
      published: true,
      tags: [{ tag: 'postgres' }, { tag: 'architecture' }, { tag: 'data' }],
      content: lex([
        'For our first hundred projects, Postgres covered every need: transactional, analytical, queue, search, even some vector work via pgvector.',
        'When does that stop being enough? Three signals.',
        'First, write contention on hot tables. Second, OLAP queries pegging the CPU your transactional workload depends on. Third, vector search on millions of embeddings — pgvector still works, but cost-per-query gets uncomfortable.',
        'When we hit those, we add a specialized store — a Redis queue, a Clickhouse OLAP, a vector DB — but only for that one signal. The rest stays in Postgres.',
      ]),
    },
    {
      title: 'Notes on building Laporta in eleven months.',
      slug: 'building-laporta-in-eleven-months',
      excerpt: 'Eleven months from blank repo to 1.2K outlets. What we got right, what we\'d do differently, and what surprised us.',
      category: 'studio',
      author: editor,
      publishedAt: '2026-03-15T09:00:00.000Z',
      published: true,
      tags: [{ tag: 'product' }, { tag: 'laporta' }, { tag: 'fb' }],
      content: lex([
        'Laporta started as a tool for our own coffee operator client. We thought we\'d ship it in three months. It took eleven.',
        'What got right: P&L logic, multi-outlet aggregation, the AI-assisted query layer that lets ops ask plain-English questions.',
        'What we\'d do differently: customer onboarding. We assumed F&B operators would self-serve. They don\'t. We rebuilt onboarding twice.',
        'What surprised us: the most-used feature isn\'t the dashboard. It\'s the daily survival-metric SMS.',
      ]),
    },
  ]);
  console.log('✓ Posts (3)');

  console.log('\n✓ Seed complete. Visit /admin to log in & edit, or http://localhost:3000 to view.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
