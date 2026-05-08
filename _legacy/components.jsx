/* global React */
const { useState } = React;

/* ----------------------------- Icon library ----------------------------- */
/* Outlined SVG primitives — currentColor stroke, 1.75 width.
   Used sparingly: Services, Process, Studio tenets. */
function Icon({ name, size = 22, className = '' }) {
  const paths = {
    // Services
    build: (
      <>
        <polyline points="9 8 5 12 9 16" />
        <polyline points="15 8 19 12 15 16" />
        <line x1="14" y1="6" x2="10" y2="18" />
      </>
    ),
    automate: (
      <>
        <path d="M21 12a9 9 0 1 1-3-6.7" />
        <polyline points="21 4 21 10 15 10" />
      </>
    ),
    intelligence: (
      <>
        <line x1="3" y1="20" x2="3" y2="10" />
        <line x1="9" y1="20" x2="9" y2="4" />
        <line x1="15" y1="20" x2="15" y2="14" />
        <line x1="21" y1="20" x2="21" y2="8" />
      </>
    ),
    augment: (
      <>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </>
    ),
    // Process
    discover: (
      <>
        <circle cx="11" cy="11" r="7" />
        <line x1="20" y1="20" x2="16" y2="16" />
      </>
    ),
    design: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
      </>
    ),
    layers: (
      <>
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </>
    ),
    handoff: (
      <>
        <rect x="2" y="3" width="20" height="5" />
        <path d="M21 8v13H3V8" />
        <line x1="10" y1="13" x2="14" y2="13" />
      </>
    ),
    // Studio tenets
    users: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    voice: (
      <>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </>
    ),
  };
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

/* ----------------------------- Top bar / nav ---------------------------- */
function TopBar() {
  return (
    <div className="topbar">
      <span className="tb-tag">[ // NOW BOOKING ]</span>
      <span className="tb-msg">2 engagement slots open for Q3 — discovery sprints through Jul&nbsp;18.</span>
      <span className="sep">·</span>
      <a href="#contact">Start a 48-hour discovery →</a>
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="nav-wrap">
      <div className="container nav">
        <a href="#top" className="nav-left" aria-label="Coderoach Studio — home">
          <img src="assets/coderoach_logo.svg" alt="" />
          <span className="wordmark">
            <span>coderoach</span>
            <span>studio</span>
          </span>
        </a>
        <div className={`nav-links ${open ? 'open' : ''}`}>
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#products">Products</a>
          <a href="#process">Process</a>
          <a href="#studio">Studio</a>
          <a href="#faq">FAQ</a>
        </div>
        <div className="nav-status">
          <span className="nav-gh"><span className="dot" /> JKT · OPEN Q3</span>
          <a href="#contact" className="btn btn-primary btn-sm">Start a discovery →</a>
          <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Menu">
            <span/><span/><span/>
          </button>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- HERO --------------------------------- */
function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg" />

      <div className="container hero-inner">
        <span className="hero-pill">
          <span className="dot" />
          Senior product engineering — built to outlast the brief
        </span>

        <h1 className="hero-h1">
          Engineering that thinks <span className="accent">like an operator.</span>
        </h1>

        <p className="hero-lede">
          We build software, automate workflows, and ship analytics for companies that need
          more than a vendor.
        </p>

        <div className="hero-cta">
          <a href="#contact" className="btn btn-primary btn-lg">
            Start a 48-hour discovery
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="#work" className="btn btn-ghost btn-lg">See what we've shipped</a>
        </div>

        <div className="hero-meta">
          <span><b>40+</b> operators shipped</span>
          <span className="dot-sep">·</span>
          <span><b>4yr</b> studio, <b>11</b> humans</span>
          <span className="dot-sep">·</span>
          <span><b>2 weeks</b> typical kickoff</span>
        </div>
      </div>

      {/* Trusted-by — kinetic marquee */}
      <div className="trusted">
        <div className="container trusted-grid">
          <div className="trusted-label">
            <span className="mono-sm">// TRUSTED BY 40+ OPERATORS</span>
            <p>Across Indonesia &amp; SEA — F&amp;B, logistics, finance, agencies.</p>
          </div>
          <div className="trusted-logos" aria-label="Selected clients">
            <div className="trusted-track" aria-hidden="false">
              <div className="tl-item">Laporta</div>
              <div className="tl-item">Viralytics</div>
              <div className="tl-item">Bumi Logistics</div>
              <div className="tl-item">Kopi/Co Group</div>
              <div className="tl-item">Senayan Studio</div>
              <div className="tl-item">Adira Capital</div>
              <div className="tl-item">Halo Ventures</div>
              <div className="tl-item">PT Citra Maju</div>
            </div>
            <div className="trusted-track" aria-hidden="true">
              <div className="tl-item">Laporta</div>
              <div className="tl-item">Viralytics</div>
              <div className="tl-item">Bumi Logistics</div>
              <div className="tl-item">Kopi/Co Group</div>
              <div className="tl-item">Senayan Studio</div>
              <div className="tl-item">Adira Capital</div>
              <div className="tl-item">Halo Ventures</div>
              <div className="tl-item">PT Citra Maju</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Services ------------------------------- */
function Services() {
  const items = [
    {
      tag: 'BUILD',
      icon: 'build',
      title: 'Build',
      tagline: 'Web platforms, native apps, internal tools.',
      blurb: 'Production software with the same rigor we use on our own products. Modern stack, opinionated architecture, designed to scale beyond the launch.',
      list: ['Web applications', 'Mobile apps (iOS, Android)', 'Company websites', 'Internal admin tools'],
      stack: ['Next.js', 'React Native', 'Postgres', 'TypeScript'],
    },
    {
      tag: 'AUTOMATE',
      icon: 'automate',
      title: 'Automate',
      tagline: 'Workflows that ran on humans, now run on code.',
      blurb: 'Most companies have someone copying data between spreadsheets at 2am. We replace that someone with a system that doesn\'t sleep.',
      list: ['Workflow automation', 'API integrations & pipelines', 'Reporting automation', 'Process digitization'],
      stack: ['Node.js', 'Python', 'n8n', 'Webhooks'],
    },
    {
      tag: 'INTELLIGENCE',
      icon: 'intelligence',
      title: 'Intelligence',
      tagline: 'Decisions, not dashboards.',
      blurb: 'Anyone can build a dashboard. We build the data layer that makes decisions obvious — KPIs that matter, anomaly detection that fires, forecasts you can defend.',
      list: ['Data warehouses & ETL', 'Custom analytics dashboards', 'Multi-platform ads analytics', 'Forecasting & anomaly detection'],
      stack: ['Postgres', 'BigQuery', 'Metabase', 'dbt'],
    },
    {
      tag: 'AUGMENT',
      icon: 'augment',
      title: 'Augment',
      tagline: 'Add intelligence to systems you already have.',
      blurb: 'LLMs are infrastructure now. We integrate them where they actually move the needle — customer ops, internal search, content workflows.',
      list: ['LLM integration & RAG', 'Agentic workflows', 'AI-powered internal tools', 'Document processing'],
      stack: ['Anthropic', 'OpenAI', 'LangChain', 'pgvector'],
    },
  ];
  return (
    <section id="services" className="section">
      <div className="container">
        <div className="section-head">
          <span className="sm">[ 01 / 06 ] <span className="s">·</span> Services <span className="s">//</span> <span className="a">What we build</span></span>
          <h2 className="section-h">Four ways we ship.</h2>
          <p className="section-lede">
            We don't sell hours. We ship outcomes — products that earn their place in your operations.
          </p>
        </div>

        <div className="services">
          {items.map((it, i) => (
            <article key={it.title} className="svc-card">
              <div className="svc-head">
                <span className="svc-icon"><Icon name={it.icon} size={24} /></span>
              </div>
              <h3 className="svc-title">{it.title}</h3>
              <p className="svc-tagline">{it.tagline}</p>
              <p className="svc-blurb">{it.blurb}</p>
              <ul className="svc-list">
                {it.list.map(l => <li key={l}>{l}</li>)}
              </ul>
              <div className="svc-stack">
                <span className="label">[ stack ]</span>
                {it.stack.map(s => <span key={s} className="pill stack">{s}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Selected work ---------------------------- */
function Work() {
  const rows = [
    { idx: '02', client: 'Kopi/Co Group', desc: 'Multi-outlet F&B reporting, daily survival metrics, AI-assisted P&L.', meta: 'F&B · INTELLIGENCE', pills: ['BIGQUERY', 'METABASE'] },
    { idx: '03', client: 'Senayan Studio', desc: 'KOL contract automation, payment workflow, performance dashboards.', meta: 'AGENCY · AUTOMATE', pills: ['N8N', 'TIKTOK API'] },
    { idx: '04', client: 'Adira Capital', desc: 'Internal search + RAG layer over 28k policy docs for ops team.', meta: 'FINANCE · AUGMENT', pills: ['ANTHROPIC', 'PG-VECTOR'] },
    { idx: '05', client: 'Halo Ventures', desc: 'Portfolio operating console — KPI ingest from 14 portfolio cos.', meta: 'VC · BUILD', pills: ['REACT', 'POSTGRES'] },
    { idx: '06', client: 'PT Citra Maju', desc: 'Replaced 12hr manual report with 30-second daily ops dashboard.', meta: 'MANUFACTURING · INTELLIGENCE', pills: ['PYTHON', 'DBT'] },
  ];
  return (
    <section id="work" className="section">
      <div className="container">
        <div className="section-head">
          <span className="sm">[ 02 / 06 ] <span className="s">·</span> Work <span className="s">//</span> <span className="a">Selected case studies</span></span>
          <h2 className="section-h">What we've shipped.</h2>
          <p className="section-lede">
            Representative engagements from the last 18 months. Full case studies on request.
          </p>
        </div>

        {/* Featured case — surfaces FIRST as the headline story */}
        <div className="case-feature">
          <div>
            <div className="case-tags">
              <span className="pill dark">[ FEATURED · 2026 ]</span>
              <span className="pill dark-success">[ ✓ SHIPPED ]</span>
            </div>
            <span className="mono dim-on-dark">LOGISTICS · BUILD · 11 WEEKS · 2 ENGINEERS</span>
            <h3>Bumi Logistics — replaced a 7-year-old console with a real-time dispatch platform.</h3>
            <p>
              Two engineers, eleven weeks, three thousand drivers in production from day one.
              No big-bang cutover — a parallel deploy, audited every Friday.
            </p>
            <div className="case-metrics">
              <div className="m">
                <div className="num">38<span className="a">%</span></div>
                <div className="lbl">FASTER DISPATCH</div>
              </div>
              <div className="m">
                <div className="num">11<span className="a">w</span></div>
                <div className="lbl">TO PRODUCTION</div>
              </div>
              <div className="m">
                <div className="num">2<span className="a">×</span></div>
                <div className="lbl">FLEET CAPACITY</div>
              </div>
            </div>
            <a href="#" className="btn btn-light">Read the case study →</a>
          </div>
          <div>
            <div className="case-code">
              <div className="header">
                <span>[ .TS ]</span>
                <span className="path">apps/dispatch/route.ts</span>
              </div>
              <div className="line"><span className="ln">1</span><span className="kw">export async function</span> assign() {'{'}</div>
              <div className="line"><span className="ln">2</span>&nbsp;&nbsp;<span className="kw">const</span> fleet = <span className="kw">await</span> live.fleet()</div>
              <div className="line"><span className="ln">3</span>&nbsp;&nbsp;<span className="kw">const</span> queue = <span className="kw">await</span> live.queue()</div>
              <div className="line"><span className="ln">4</span>&nbsp;&nbsp;<span className="kw">const</span> plan&nbsp; = solve(fleet, queue)</div>
              <div className="line"><span className="ln">5</span>&nbsp;&nbsp;<span className="kw">await</span> emit(<span className="str">"plan.ready"</span>, plan)</div>
              <div className="line"><span className="ln">6</span>&nbsp;&nbsp;<span className="kw">return</span> plan</div>
              <div className="line"><span className="ln">7</span>{'}'}</div>
            </div>
            <div className="case-stack">
              <span className="pill dark-stack">NEXT.JS 15</span>
              <span className="pill dark-stack">POSTGRES</span>
              <span className="pill dark-stack">TEMPORAL</span>
              <span className="pill dark-stack">VERCEL</span>
            </div>
          </div>
        </div>

        <div className="work-list-head">
          <span className="mono dim">// MORE ENGAGEMENTS · 02 → 06</span>
        </div>

        <div className="work-list">
          {rows.map(r => (
            <a href="#" key={r.idx} className="work-row">
              <span className="idx">[ {r.idx} ]</span>
              <span className="client">{r.client}</span>
              <span className="desc">{r.desc}</span>
              <span className="meta">{r.meta}</span>
              <span className="pill-w">
                {r.pills.map(p => <span key={p} className="pill stack">{p}</span>)}
              </span>
              <span className="arrow">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Studio Products -------------------------- */
function Products() {
  return (
    <section id="products" className="section section-paper">
      <div className="container">
        <div className="section-head">
          <span className="sm">[ 03 / 06 ] <span className="s">·</span> Products <span className="s">//</span> <span className="a">Built by us, used by us</span></span>
          <h2 className="section-h">We build products, not just project deliverables.</h2>
          <p className="section-lede">
            The hardest test of an engineering team isn't a client brief — it's their own product.
            Ours have to survive real users, real revenue, and real edge cases.
          </p>
        </div>

        <div className="products">
          {/* Laporta */}
          <article className="product">
            <div className="product-visual">
              <div className="viz-laporta">
                <div className="header">
                  <span>[ LAPORTA · OUTLET-04 ]</span>
                  <span style={{color:'var(--color-electric)'}}>● LIVE</span>
                </div>
                <div className="chart">
                  <svg viewBox="0 0 200 80" preserveAspectRatio="none">
                    <path d="M0,55 L20,48 L40,52 L60,38 L80,42 L100,28 L120,32 L140,18 L160,22 L180,12 L200,8" stroke="var(--color-electric)" strokeWidth="1.5" fill="none" pathLength="1" className="chart-stroke"/>
                    <path d="M0,55 L20,48 L40,52 L60,38 L80,42 L100,28 L120,32 L140,18 L160,22 L180,12 L200,8 L200,80 L0,80 Z" fill="var(--color-electric)" opacity="0.10"/>
                    <line x1="0" y1="60" x2="200" y2="60" stroke="var(--color-paper-200)" strokeDasharray="2 2"/>
                    <line x1="0" y1="40" x2="200" y2="40" stroke="var(--color-paper-200)" strokeDasharray="2 2"/>
                    <line x1="0" y1="20" x2="200" y2="20" stroke="var(--color-paper-200)" strokeDasharray="2 2"/>
                  </svg>
                </div>
                <div className="stats">
                  <div className="stat">
                    <div className="l">[ COGS RATIO ]</div>
                    <div className="v">31.4<span className="a">%</span></div>
                  </div>
                  <div className="stat">
                    <div className="l">[ DAILY GROSS ]</div>
                    <div className="v">8.2<span className="a">M</span></div>
                  </div>
                  <div className="stat">
                    <div className="l">[ SURVIVAL ]</div>
                    <div className="v">+4 <span className="a">DAYS</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-body">
              <div className="product-header">
                <h3 className="product-title">Laporta</h3>
                <span className="product-tag">[ F&B OPS ]</span>
              </div>
              <p className="product-blurb">
                For Indonesian F&amp;B operators who outgrew spreadsheets but can't justify enterprise ERP.
                Sits above your POS as a profit intelligence layer.
              </p>
              <ul className="product-bullets">
                <li>Outlet financial analysis</li>
                <li>Daily survival metrics</li>
                <li>AI-assisted P&amp;L chat</li>
                <li>Multi-outlet aggregation</li>
              </ul>
              <div className="product-footer">
                <span className="mono">[ // SHIPPED 2024 · 1.2K OUTLETS ]</span>
                <a href="#" className="btn-link">laporta.id →</a>
              </div>
            </div>
          </article>

          {/* Viralytics */}
          <article className="product">
            <div className="product-visual">
              <div className="viz-viralytics">
                <div className="h">
                  <span>[ AYANA-Q3 · 12/40 LIVE ]</span>
                  <span style={{color:'#5DD79A'}}>● TRACKING</span>
                </div>
                <div className="row">
                  <div className="av">RA</div>
                  <div><div className="name">@rara.makan</div><div style={{color:'var(--color-mist-500)'}}>tier-3 · F&B</div></div>
                  <div className="met">412k</div>
                  <div className="met"><span className="a">+38%</span></div>
                </div>
                <div className="row">
                  <div className="av" style={{background:'linear-gradient(135deg,#F2A93B,#E5484D)'}}>BD</div>
                  <div><div className="name">@bagasdoyan</div><div style={{color:'var(--color-mist-500)'}}>tier-2 · lifestyle</div></div>
                  <div className="met">186k</div>
                  <div className="met"><span className="a">+12%</span></div>
                </div>
                <div className="row">
                  <div className="av" style={{background:'linear-gradient(135deg,#A7A2A9,#3A4140)'}}>NK</div>
                  <div><div className="name">@niko.kuliner</div><div style={{color:'var(--color-mist-500)'}}>tier-2 · review</div></div>
                  <div className="met">94k</div>
                  <div className="met" style={{color:'#E5484D'}}>-3%</div>
                </div>
                <div className="row">
                  <div className="av" style={{background:'linear-gradient(135deg,#5DD79A,#2C70FE)'}}>AS</div>
                  <div><div className="name">@aulia.story</div><div style={{color:'var(--color-mist-500)'}}>tier-1 · macro</div></div>
                  <div className="met">1.4M</div>
                  <div className="met"><span className="a">+92%</span></div>
                </div>
              </div>
            </div>
            <div className="product-body">
              <div className="product-header">
                <h3 className="product-title">Viralytics</h3>
                <span className="product-tag">[ KOL OS ]</span>
              </div>
              <p className="product-blurb">
                End-to-end platform for KOL campaign management. From sourcing to contracts to live performance tracking,
                all in one workspace.
              </p>
              <ul className="product-bullets">
                <li>KOL directory &amp; sourcing</li>
                <li>Campaign administration</li>
                <li>Live performance dashboards</li>
                <li>TikTok &amp; Meta API integrations</li>
              </ul>
              <div className="product-footer">
                <span className="mono">[ // SHIPPED 2025 · 380 CAMPAIGNS ]</span>
                <a href="#" className="btn-link">viralytics.id →</a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Process ------------------------------- */
function Process() {
  const phases = [
    { tag: 'PHASE 01', icon: 'discover', name: 'Discover', week: 'WK 0–1', what: 'We map the actual problem, not just the requested output. Stakeholder interviews, system audit, scope tightening.', deliv: 'Written brief · technical scope · success metrics' },
    { tag: 'PHASE 02', icon: 'design', name: 'Design', week: 'WK 1–3', what: 'Wireframes, data models, system architecture. We design what we can defend in code, not just in Figma.', deliv: 'Clickable prototype · technical spec · ERD' },
    { tag: 'PHASE 03', icon: 'layers', name: 'Build', week: 'WK 3–N', what: 'Two-week sprints. Demos every Friday. No surprise reveals. Continuous deploy from day one.', deliv: 'Working software · deployed continuously' },
    { tag: 'PHASE 04', icon: 'handoff', name: 'Handoff', week: 'FINAL WK', what: 'Documentation, training, source code, infra access. We\'re a phone call, not a dependency.', deliv: 'Source · docs · infra credentials · 30-day support' },
  ];
  return (
    <section id="process" className="section">
      <div className="container">
        <div className="section-head">
          <span className="sm">[ 04 / 06 ] <span className="s">·</span> Process <span className="s">//</span> <span className="a">How an engagement runs</span></span>
          <h2 className="section-h">From spec to system in four phases.</h2>
          <p className="section-lede">
            Every engagement runs the same shape. Different scope, different stack — same shipping discipline.
          </p>
        </div>
        <div className="process">
          {phases.map((p, i) => (
            <div key={p.tag} className="ph">
              <div className="ph-head">
                <span className="tag">[ {p.tag} ]</span>
                <span className="week">{p.week}</span>
              </div>
              <div className="ph-icon"><Icon name={p.icon} size={20} /></div>
              <h4>{p.name}</h4>
              <p className="what">{p.what}</p>
              <div className="deliv">
                <span className="l">[ // YOU GET ]</span>
                {p.deliv}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Studio (About) ------------------------ */
function Studio() {
  return (
    <section id="studio" className="section section-dark" data-theme="dark">
      <div className="container">
        <div className="section-head">
          <span className="sm" style={{color:'var(--color-mist-500)'}}>
            [ 05 / 06 ] <span className="s">·</span> Studio <span className="s">//</span> <span className="a">Who you'll work with</span>
          </span>
          <h2 className="section-h">A small senior team in Jakarta.</h2>
        </div>

        <div className="studio-grid">
          <div className="studio-copy">
            <p className="studio-lede">
              Coderoach is 11 humans — engineers, designers, and a single ops person who keeps the
              calendar honest. No juniors hidden behind senior bios. The person scoping your project
              is the person building it.
            </p>
            <div className="studio-stats">
              <div>
                <div className="num">11</div>
                <div className="lbl">SENIORS<br/>NO JUNIORS</div>
              </div>
              <div>
                <div className="num">4<span className="a">yr</span></div>
                <div className="lbl">YEARS<br/>OPERATING</div>
              </div>
              <div>
                <div className="num">40<span className="a">+</span></div>
                <div className="lbl">SHIPPED<br/>ENGAGEMENTS</div>
              </div>
              <div>
                <div className="num">JKT</div>
                <div className="lbl">KEMANG<br/>JAKARTA</div>
              </div>
            </div>
          </div>

          <div className="studio-tenets">
            <div className="tenet">
              <div className="tenet-head">
                <Icon name="users" size={20} className="tenet-icon" />
                <span className="tn">[ 01 ]</span>
              </div>
              <h4>Senior team only.</h4>
              <p>No junior hand-offs. Smaller team, fewer layers, fewer translation losses.</p>
            </div>
            <div className="tenet">
              <div className="tenet-head">
                <Icon name="voice" size={20} className="tenet-icon" />
                <span className="tn">[ 02 ]</span>
              </div>
              <h4>Opinionated, not obedient.</h4>
              <p>We'll build what you ask for. We'll also tell you when what you asked for is the wrong thing.</p>
            </div>
            <div className="tenet">
              <div className="tenet-head">
                <Icon name="shield" size={20} className="tenet-icon" />
                <span className="tn">[ 03 ]</span>
              </div>
              <h4>Built to outlast.</h4>
              <p>Clean architecture, full handoff docs, no proprietary lock-in. We're a phone call, not a dependency.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- FAQ --------------------------------- */
function FAQ() {
  const qs = [
    ['How do you price?', 'Project-based, scoped per engagement. We don\'t sell hours; we sell outcomes. After a discovery call, you\'ll get a fixed-scope proposal with milestones and deliverables.'],
    ['Smallest project you take on?', 'Roughly Rp 50jt scope and up. Below that, we\'ll honestly tell you a freelancer is the better choice — and sometimes refer you to one.'],
    ['Do you do retainers?', 'Yes, for ongoing product work after launch. Not for "pool of hours" engagements — those are how agencies and clients both lose.'],
    ['Where are you based?', 'Jakarta, Indonesia. We work with clients across Indonesia and SEA. Remote-first, on-site for kickoffs and major milestones.'],
    ['What stack do you use?', 'Pragmatic and modern: Next.js, React Native, Node.js, Python, PostgreSQL, Vercel, AWS. We pick stack to fit the problem, not to fit our resume.'],
    ['Do you sign NDAs?', 'Yes. Standard mutual NDA available before discovery calls.'],
    ['What happens after launch?', 'You own the code, the infrastructure, and the documentation. We can stay on retainer for ongoing work, or hand off cleanly to your in-house team. Your call.'],
  ];
  return (
    <section id="faq" className="section section-paper">
      <div className="container container-narrow">
        <div className="section-head">
          <span className="sm">[ 06 / 06 ] <span className="s">·</span> FAQ <span className="s">//</span> <span className="a">Common questions</span></span>
          <h2 className="section-h">Things you're probably wondering.</h2>
        </div>
        <div className="faq">
          {qs.map(([q, a], i) => (
            <details key={q} open={i===0}>
              <summary>
                <span className="qnum">[ Q.{String(i+1).padStart(2,'0')} ]</span>
                <span className="q">{q}</span>
                <span className="toggle">+</span>
              </summary>
              <div className="a">{a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Contact CTA ---------------------------- */
function Contact() {
  const [email, setEmail] = useState('');
  const [brief, setBrief] = useState('');
  const [scope, setScope] = useState('');
  const [sent, setSent] = useState(false);
  const scopes = ['Build', 'Automate', 'Intelligence', 'Augment', 'Not sure yet'];

  return (
    <section id="contact" className="contact" data-theme="dark">
      <div className="container">
        <div className="contact-head">
          <span className="sm" style={{color:'var(--color-mist-500)'}}>
            [ // CONTACT ] <span className="s">·</span> <span className="a">Start a project</span>
          </span>
          <h2 className="contact-h">
            Got something to ship?<br/>
            <span className="accent">Let's talk.</span>
          </h2>
          <p className="contact-lede">
            We take on a small number of new engagements each quarter.
            Tell us what you're trying to ship — we read every brief and reply within 48 hours.
          </p>
        </div>

        <div className="contact-card">
          {sent ? (
            <div className="contact-success">
              <span className="pill dark-success" style={{marginBottom:16}}>[ 200 OK · RECEIVED ]</span>
              <h3>Thanks — we got your brief.</h3>
              <p>
                Sent from <span className="email">{email}</span>.<br/>
                You'll hear back from a senior at the studio within 48 hours.
              </p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={(e) => { e.preventDefault(); if (email) setSent(true); }}>
              <div className="cf-row">
                <label className="cf-label">[ // YOUR EMAIL ]</label>
                <input
                  type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="ops@yourcompany.id"
                  className="contact-input"
                />
              </div>

              <div className="cf-row">
                <label className="cf-label">[ // SCOPE ]</label>
                <div className="cf-scope-row">
                  {scopes.map(s => (
                    <button
                      type="button"
                      key={s}
                      className={`cf-scope ${scope === s ? 'active' : ''}`}
                      onClick={() => setScope(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="cf-row">
                <label className="cf-label">[ // WHAT ARE YOU SHIPPING? ]</label>
                <textarea
                  value={brief} onChange={e => setBrief(e.target.value)}
                  placeholder="A one-paragraph brief is enough. What's the problem, who feels it, and what does shipped look like?"
                  className="contact-input contact-textarea"
                />
              </div>

              <div className="cf-actions">
                <button type="submit" className="btn btn-primary btn-lg">Send the brief →</button>
                <span className="contact-form-meta">// or write to <a href="mailto:hello@coderoach.studio">hello@coderoach.studio</a></span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Footer ------------------------------- */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid">
          <div>
            <div className="brand" aria-label="Coderoach Studio">
              <img src="assets/coderoach_logo.svg" alt="" />
              <span className="wordmark">
                <span>coderoach</span>
                <span>studio</span>
              </span>
            </div>
            <p className="tagline">
              Senior product and engineering. Jakarta, ID. Remote across SEA. Built to outlast the brief.
            </p>
            <span className="badge"><span className="dot"/> JKT-1 · OPEN FOR Q3</span>
          </div>
          <div>
            <h5>// WORK</h5>
            <ul>
              <li><a href="#work">Case studies</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#process">Process</a></li>
              <li><a href="#products">Products</a></li>
            </ul>
          </div>
          <div>
            <h5>// COMPANY</h5>
            <ul>
              <li><a href="#studio">Studio</a></li>
              <li><a href="#">Field notes</a></li>
              <li><a href="#">Open roles</a></li>
              <li><a href="#">Press kit</a></li>
            </ul>
          </div>
          <div>
            <h5>// CONTACT</h5>
            <ul>
              <li><a href="mailto:hello@coderoach.studio">hello@coderoach.studio</a></li>
              <li><a href="#">+62 21 555 0414</a></li>
              <li><a href="#">Kemang, Jakarta</a></li>
              <li><a href="#">@coderoach.studio</a></li>
            </ul>
          </div>
        </div>

        <div className="meta">
          <span>[ © 2026 PT CODEROACH STUDIO ] · NPWP 04.567.891.2-345.000</span>
          <span>BUILT IN-HOUSE · NEXT.JS 15 · [ // BUILT TO OUTLAST THE BRIEF // ]</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { TopBar, Nav, Hero, Services, Work, Products, Process, Studio, FAQ, Contact, Footer });
