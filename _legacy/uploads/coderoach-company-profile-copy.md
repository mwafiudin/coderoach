# Coderoach Studio — Company Profile Copy

> **Purpose:** Ready-to-implement copy for the Coderoach Studio website + sales deck. All copy follows the "operator's voice" tone established in the design system.
>
> **Site architecture:** Single-page marketing site (long-form scroll) with `/work`, `/about`, `/contact` as sub-pages.

---

## Sitemap

```
/                  Home (long-form)
  ├─ Hero
  ├─ 01 / Services
  ├─ 02 / Approach
  ├─ 03 / Selected work
  ├─ 04 / Built by us, used by us (products)
  ├─ 05 / Process
  ├─ 06 / FAQ
  └─ Footer / Contact
/work              Full case study index
/work/[slug]       Individual case study
/about             Studio philosophy, team
/contact           Inquiry form + direct contact
```

---

## HOME / Hero

```
[ 200 OK ]   ·   /home   //   01

# Engineering that thinks
# like an operator.

We build software, automate workflows, and ship analytics
for companies that need more than a vendor.

Built to outlast the brief.

[ Start a project → ]    [ See our work ]
```

**Hero supporting elements:**
- ASCII art pattern as background (subtle, low opacity)
- A code/terminal block to the right showing a sample stack:
  ```
  [ .STACK ]
  ─ Next.js 15
  ─ PostgreSQL
  ─ Vercel
  ─ Custom dashboards
  ─ AI integrations
  ```
- Below the fold: trusted-by row OR "selected clients" logos (when ready)

---

## 01 / Services Section

```
[ 01 / 04 ]   ·   Services   //   What we build   //

# Four ways we ship.

We don't sell hours. We ship outcomes — products that earn
their place in your operations.
```

### Pillar 1 — Build

```
[ // BUILD ]

Web platforms, native apps, internal tools.

We build production software with the same rigor we'd
use on our own products. Modern stack, opinionated
architecture, designed to scale beyond the launch.

→ Web applications
→ Mobile apps (iOS, Android, cross-platform)
→ Company websites & landing pages
→ Internal admin tools

[ Stack ]
Next.js · React Native · PostgreSQL · TypeScript
```

### Pillar 2 — Automate

```
[ // AUTOMATE ]

Workflows that ran on humans, now run on code.

Most companies have someone copying data between
spreadsheets at 2am. We replace that someone with a
system that doesn't sleep.

→ Internal workflow automation
→ API integrations & data pipelines
→ Reporting automation
→ Process digitization

[ Stack ]
Node.js · Python · n8n · Zapier · Custom integrations
```

### Pillar 3 — Intelligence

```
[ // INTELLIGENCE ]

Decisions, not dashboards.

Anyone can build a dashboard. We build the data layer
that makes decisions obvious — KPIs that matter, anomaly
detection that fires, forecasts you can defend.

→ Data warehouses & ETL pipelines
→ Custom analytics dashboards
→ Multi-platform ads analytics
→ Forecasting & anomaly detection

[ Stack ]
PostgreSQL · BigQuery · Metabase · Custom BI · Python
```

### Pillar 4 — Augment

```
[ // AUGMENT ]

Add intelligence to systems you already have.

LLMs are infrastructure now. We integrate them where
they actually move the needle — customer ops, internal
search, content workflows — not where they look cool
on a slide.

→ LLM integration & RAG systems
→ Agentic workflows
→ AI-powered internal tools
→ Document & content processing

[ Stack ]
Anthropic · OpenAI · LangChain · Vector DBs · Custom agents
```

---

## 02 / Approach Section

```
[ 02 / 04 ]   ·   Approach   //   How we work   //

# We treat client projects like products.

Most agencies treat your project like a deliverable.
We treat it like a product we'd ship for ourselves —
because we do that too.
```

### Three principles

```
[ 01 ]
Senior team only.

No junior hand-offs. The person scoping your project
is the person building it. Smaller team, fewer layers,
fewer translation losses.

[ 02 ]
Opinionated, not obedient.

We'll build what you ask for. We'll also tell you when
what you asked for is the wrong thing. Clients hire us
for judgment, not just hands.

[ 03 ]
Built to outlast.

We build with the assumption that we won't be there
in 5 years. Clean architecture, full handoff docs,
no proprietary lock-in.
```

---

## 03 / Selected Work Section

```
[ 03 / 04 ]   ·   Work   //   Selected case studies   //

# What we've shipped.
```

### Case Study Cards (placeholder template)

**[Client Name]**
```
[ // CASE STUDY ]
[ SHIPPED 2025 ]

Industry · Scope · Stack
─────────────────────────

# [Outcome-focused headline]
# e.g., "Replaced 12 hours of manual reporting with a 30-second dashboard."

What we built: [1 sentence]
The result: [1 metric or outcome]

[ Read the case study → ]
```

### Featured slot — Studio Products

This section bridges into the next: "We don't just ship for clients. We ship for ourselves."

```
[ // STUDIO PRODUCTS ]

Laporta — F&B operations OS for outlet management,
analytics, and AI-assisted decisions.
[ laporta.id → ]

Viralytics — KOL campaign management platform with
directory, contracts, and live performance dashboards.
[ viralytics.id → ]
```

---

## 04 / Built by Us, Used by Us Section

```
[ 04 / 04 ]   ·   Products   //   Our own playbook   //

# We build products, not just project deliverables.

The hardest test of an engineering team isn't a client
brief — it's their own product. Ours have to survive
real users, real revenue, and real edge cases.

That experience is what we bring to your work.
```

**Two product showcases:**

### Laporta
```
[ PRODUCT ]
F&B Operations Intelligence

For Indonesian F&B operators who outgrew spreadsheets but
can't justify enterprise ERP. Sits above your POS as a
profit intelligence layer.

— Outlet financial analysis
— Daily survival metrics
— AI-assisted P&L conversations
— Multi-outlet aggregation

[ Visit laporta.id → ]
```

### Viralytics
```
[ PRODUCT ]
KOL Campaign OS

End-to-end platform for KOL campaign management. From
sourcing to contracts to live performance tracking,
all in one workspace.

— KOL directory & sourcing
— Campaign administration
— Live performance dashboards
— TikTok & Meta API integrations

[ Visit viralytics.id → ]
```

---

## 05 / Process Section

```
[ 05 / 06 ]   ·   Process   //   How an engagement runs   //

# From spec to system in four phases.
```

```
[ PHASE 01 ]   Discover         Week 0–1
We map the actual problem, not just the requested output.
You get: written brief, technical scope, success metrics.

[ PHASE 02 ]   Design           Week 1–3
Wireframes, data models, system architecture.
You get: clickable prototype + technical spec.

[ PHASE 03 ]   Build            Week 3–N
Two-week sprints. Demos every Friday. No surprise reveals.
You get: working software, deployed continuously.

[ PHASE 04 ]   Handoff          Final week
Documentation, training, source code, infra access.
You get: full ownership. We're a phone call, not a dependency.
```

---

## 06 / FAQ Section

```
[ 06 / 06 ]   ·   FAQ   //   Common questions   //

# Things you're probably wondering.
```

**How do you price?**
Project-based, scoped per engagement. We don't sell hours; we sell outcomes. After a discovery call, you'll get a fixed-scope proposal with milestones and deliverables.

**Smallest project you take on?**
Roughly Rp 50jt scope and up. Below that, we'll honestly tell you a freelancer is the better choice — and sometimes refer you to one.

**Do you do retainers?**
Yes, for ongoing product work after launch. Not for "pool of hours" engagements — those are how agencies and clients both lose.

**Where are you based?**
Jakarta, Indonesia. We work with clients across Indonesia and SEA. Remote-first, on-site for kickoffs and major milestones.

**What stack do you use?**
Pragmatic and modern: Next.js, React Native, Node.js, Python, PostgreSQL, Vercel, AWS. We pick stack to fit the problem, not to fit our resume.

**Do you sign NDAs?**
Yes. Standard mutual NDA available before discovery calls.

**What happens after launch?**
You own the code, the infrastructure, and the documentation. We can stay on retainer for ongoing work, or hand off cleanly to your in-house team. Your call.

---

## Footer / Contact CTA

```
─────────────────────────────────────────────

# Got something to ship?

We take on a small number of new engagements each quarter.
If you have a project that needs more than a vendor,
let's talk.

[ Email us: hello@coderoach.studio ]
[ Or schedule a call → ]

─────────────────────────────────────────────

coderoach studio
Jakarta, Indonesia

[ // BUILT TO OUTLAST THE BRIEF // ]

© 2025 Coderoach Studio
```

---

## /about Page Copy

```
[ about ]   //   The studio   //

# A small studio, building software like we mean it.

Coderoach Studio is a digital product and engineering studio
based in Jakarta. We build web platforms, mobile apps,
automation systems, analytics infrastructure, and AI-powered
tools for companies that need more than a typical vendor.

We're small on purpose. Senior on purpose. Opinionated on purpose.

## Why we exist

Most software studios optimize for billable hours. We optimize
for software that survives in production — which means we say
no a lot, scope tightly, and treat every engagement like
something we'd put our name on. Because we do.

## How we're different

We build our own products too. Laporta and Viralytics aren't
side projects — they're full products with real users, real
revenue, and real operational complexity. The judgment we
develop running those products is the judgment we bring to
client work.

You're not hiring a vendor that delivers what you asked for.
You're hiring an operator that builds what you actually need.

## Studio principles

01 — Senior only, no junior hand-offs.
02 — Spec is a starting point, not a contract.
03 — Ship working software every two weeks.
04 — Document everything. Lock-in is a smell.
05 — Say no when the answer is no.

[ // Built to outlast the brief // ]
```

---

## /contact Page Copy

```
[ contact ]   //   Start a project   //

# Tell us what you're trying to ship.

We respond to every inquiry within 48 hours. If we're a fit,
we'll set up a 30-minute discovery call to understand the
problem in more depth.

Not every project is a fit for us — and that's fine. If we're
not the right team, we'll tell you, and often point you to
someone who is.

[ Inquiry form ]
─ Name
─ Company
─ Email
─ Project type    [ Build · Automate · Intelligence · Augment · Not sure ]
─ Budget range    [ < 50jt · 50-150jt · 150-500jt · 500jt+ ]
─ Timeline        [ ASAP · 1-3 months · 3-6 months · Exploring ]
─ Brief (open)

[ Send inquiry → ]

Or skip the form: hello@coderoach.studio
```

---

## Microcopy library

For consistency across forms, buttons, empty states, errors.

### CTAs
- Primary action: `Start a project`, `Get in touch`, `Schedule a call`
- Secondary action: `See our work`, `Read more`, `Learn how`
- Code-style CTAs (rare, for special moments): `$ start --new-project`

### Form labels
- Email field: "Where should we reach you?"
- Brief field: "What are you trying to ship?"
- Budget: "Ballpark budget" (never "How much can you spend")

### Loading states
- "Compiling..."
- "Shipping..."
- "Deploying..."

### Empty states
- "Nothing here yet. Check back soon."
- "No work in this category. Yet."

### Error states
- 404: "404 — That page didn't ship."
- 500: "500 — Something broke. We're on it."
- Form error: "That didn't go through. Try again?"

### Success states
- Form sent: "[ 200 OK ] — We'll be in touch within 48 hours."

---

`[ end of company profile copy v1.0 ]`
