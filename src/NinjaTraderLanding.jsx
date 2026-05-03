import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --gold: #C9A84C;
    --gold-light: #E8C97A;
    --gold-dim: #7A6230;
    --dark: #080B10;
    --dark2: #0D1117;
    --dark3: #131920;
    --dark4: #1A2230;
    --border: rgba(201,168,76,0.18);
    --border-bright: rgba(201,168,76,0.4);
    --text: #E8EAF0;
    --text-muted: #8A94A6;
    --green: #22C55E;
    --red: #EF4444;
  }

  .nt-page {
    font-family: 'DM Sans', sans-serif;
    background: var(--dark);
    color: var(--text);
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* NAV */
  .nt-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 5%;
    height: 64px;
    background: rgba(8,11,16,0.9);
    backdrop-filter: blur(12px);
    border-bottom: 0.5px solid var(--border);
  }
  .nt-nav-logo {
    font-family: 'Syne', sans-serif;
    font-weight: 800; font-size: 18px;
    color: var(--gold);
    letter-spacing: -0.5px;
  }
  .nt-nav-links {
    display: flex; gap: 32px; list-style: none;
  }
  .nt-nav-links a {
    color: var(--text-muted); text-decoration: none;
    font-size: 14px; font-weight: 400;
    transition: color 0.2s;
  }
  .nt-nav-links a:hover { color: var(--gold); }
  .nt-nav-cta {
    background: var(--gold); color: var(--dark);
    border: none; padding: 9px 22px;
    border-radius: 6px; font-size: 14px;
    font-weight: 600; cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: background 0.2s;
    text-decoration: none;
  }
  .nt-nav-cta:hover { background: var(--gold-light); }

  /* HERO */
  .nt-hero {
    min-height: 100vh;
    display: flex; flex-direction: column;
    justify-content: center; align-items: center;
    text-align: center;
    padding: 120px 5% 80px;
    position: relative;
    overflow: hidden;
  }
  .nt-hero-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
  }
  .nt-hero-glow {
    position: absolute;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%);
    top: 50%; left: 50%; transform: translate(-50%,-50%);
    pointer-events: none;
  }
  .nt-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(201,168,76,0.1);
    border: 0.5px solid var(--border-bright);
    border-radius: 100px; padding: 6px 16px;
    font-size: 13px; color: var(--gold);
    margin-bottom: 28px; position: relative; z-index: 1;
  }
  .nt-badge-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--green);
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%,100% { opacity: 1; } 50% { opacity: 0.4; }
  }
  .nt-hero h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(42px, 7vw, 80px);
    font-weight: 800; line-height: 1.05;
    letter-spacing: -2px;
    position: relative; z-index: 1;
    margin-bottom: 8px;
  }
  .nt-hero h1 span { color: var(--gold); }
  .nt-hero-sub {
    font-size: clamp(16px, 2vw, 20px);
    color: var(--text-muted); font-weight: 300;
    max-width: 580px; line-height: 1.6;
    margin: 20px auto 40px;
    position: relative; z-index: 1;
  }
  .nt-hero-btns {
    display: flex; gap: 16px; flex-wrap: wrap;
    justify-content: center;
    position: relative; z-index: 1;
  }
  .btn-primary {
    background: var(--gold); color: var(--dark);
    border: none; padding: 14px 32px;
    border-radius: 8px; font-size: 15px;
    font-weight: 600; cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    text-decoration: none; display: inline-block;
    transition: all 0.2s;
  }
  .btn-primary:hover { background: var(--gold-light); transform: translateY(-1px); }
  .btn-ghost {
    background: transparent; color: var(--text);
    border: 0.5px solid var(--border-bright); padding: 14px 32px;
    border-radius: 8px; font-size: 15px;
    font-weight: 400; cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    text-decoration: none; display: inline-block;
    transition: all 0.2s;
  }
  .btn-ghost:hover { border-color: var(--gold); color: var(--gold); }

  /* STATS BAR */
  .nt-stats {
    display: flex; justify-content: center; flex-wrap: wrap;
    gap: 0; border-top: 0.5px solid var(--border);
    border-bottom: 0.5px solid var(--border);
    background: var(--dark2);
    padding: 0 5%;
  }
  .nt-stat {
    flex: 1; min-width: 160px;
    padding: 28px 24px; text-align: center;
    border-right: 0.5px solid var(--border);
  }
  .nt-stat:last-child { border-right: none; }
  .nt-stat-num {
    font-family: 'Syne', sans-serif;
    font-size: 32px; font-weight: 700;
    color: var(--gold);
  }
  .nt-stat-label {
    font-size: 13px; color: var(--text-muted);
    margin-top: 4px;
  }

  /* SECTION */
  .nt-section {
    padding: 100px 5%;
    max-width: 1200px; margin: 0 auto;
  }
  .nt-section-label {
    font-size: 12px; font-weight: 500;
    color: var(--gold); letter-spacing: 3px;
    text-transform: uppercase; margin-bottom: 16px;
  }
  .nt-section h2 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 700; line-height: 1.1;
    letter-spacing: -1px; margin-bottom: 16px;
  }
  .nt-section-desc {
    color: var(--text-muted); font-size: 17px;
    line-height: 1.7; max-width: 560px;
    margin-bottom: 60px;
  }

  /* SERVICES */
  .nt-services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1px;
    background: var(--border);
    border: 0.5px solid var(--border);
    border-radius: 12px; overflow: hidden;
  }
  .nt-service-card {
    background: var(--dark2);
    padding: 36px 32px;
    transition: background 0.2s;
    cursor: default;
  }
  .nt-service-card:hover { background: var(--dark3); }
  .nt-service-icon {
    width: 44px; height: 44px; border-radius: 10px;
    background: rgba(201,168,76,0.1);
    border: 0.5px solid var(--border-bright);
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; margin-bottom: 20px;
  }
  .nt-service-title {
    font-family: 'Syne', sans-serif;
    font-size: 18px; font-weight: 600;
    margin-bottom: 10px;
  }
  .nt-service-desc {
    color: var(--text-muted); font-size: 14px; line-height: 1.7;
  }
  .nt-service-tag {
    display: inline-block; margin-top: 16px;
    background: rgba(201,168,76,0.08);
    border: 0.5px solid var(--border);
    color: var(--gold); font-size: 11px;
    padding: 4px 12px; border-radius: 100px;
  }

  /* PROJECTS */
  .nt-projects {
    display: flex; flex-direction: column; gap: 80px;
  }
  .nt-project {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 60px; align-items: center;
  }
  .nt-project.reverse { direction: rtl; }
  .nt-project.reverse > * { direction: ltr; }
  .nt-project-img {
    border-radius: 10px;
    border: 0.5px solid var(--border);
    overflow: hidden;
    background: var(--dark3);
  }
  .nt-project-img img {
    width: 100%; display: block;
    transition: transform 0.4s;
  }
  .nt-project-img:hover img { transform: scale(1.02); }
  .nt-project-tag {
    display: inline-block;
    background: rgba(201,168,76,0.1);
    border: 0.5px solid var(--border-bright);
    color: var(--gold); font-size: 12px;
    padding: 5px 14px; border-radius: 100px;
    margin-bottom: 16px; letter-spacing: 1px;
    text-transform: uppercase;
  }
  .nt-project-title {
    font-family: 'Syne', sans-serif;
    font-size: 26px; font-weight: 700;
    line-height: 1.2; margin-bottom: 14px;
  }
  .nt-project-desc {
    color: var(--text-muted); font-size: 15px;
    line-height: 1.75; margin-bottom: 24px;
  }
  .nt-project-stats {
    display: flex; gap: 24px; flex-wrap: wrap;
  }
  .nt-pstat {
    display: flex; flex-direction: column; gap: 3px;
  }
  .nt-pstat-val {
    font-family: 'Syne', sans-serif;
    font-size: 22px; font-weight: 700; color: var(--green);
  }
  .nt-pstat-val.red { color: var(--red); }
  .nt-pstat-label { font-size: 12px; color: var(--text-muted); }

  /* RESULTS */
  .nt-results-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 24px; margin-top: 48px;
  }
  .nt-result-card {
    border-radius: 10px; overflow: hidden;
    border: 0.5px solid var(--border);
    background: var(--dark2);
  }
  .nt-result-card img { width: 100%; display: block; }
  .nt-result-label {
    padding: 14px 18px;
    font-size: 13px; color: var(--text-muted);
    border-top: 0.5px solid var(--border);
  }
  .nt-result-label strong { color: var(--gold); }

  /* REVIEWS */
  .nt-reviews-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
  .nt-review-card {
    background: var(--dark2);
    border: 0.5px solid var(--border);
    border-radius: 10px; padding: 28px;
    transition: border-color 0.2s;
  }
  .nt-review-card:hover { border-color: var(--border-bright); }
  .nt-stars {
    color: var(--gold); font-size: 14px;
    margin-bottom: 14px; letter-spacing: 2px;
  }
  .nt-review-text {
    font-size: 15px; line-height: 1.7;
    color: var(--text); margin-bottom: 20px;
    font-style: italic;
  }
  .nt-review-author {
    display: flex; align-items: center; gap: 12px;
  }
  .nt-avatar {
    width: 38px; height: 38px; border-radius: 50%;
    background: rgba(201,168,76,0.15);
    border: 0.5px solid var(--border-bright);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: 13px; font-weight: 700; color: var(--gold);
  }
  .nt-review-name {
    font-size: 14px; font-weight: 500;
  }
  .nt-review-job {
    font-size: 12px; color: var(--text-muted); margin-top: 2px;
  }

  /* UPWORK PROOF */
  .nt-proof {
    background: var(--dark2);
    border: 0.5px solid var(--border);
    border-radius: 12px; overflow: hidden;
    margin-top: 48px;
  }
  .nt-proof img { width: 100%; display: block; }

  /* CTA */
  .nt-cta-section {
    background: var(--dark2);
    border-top: 0.5px solid var(--border);
    border-bottom: 0.5px solid var(--border);
    padding: 100px 5%;
    text-align: center;
  }
  .nt-cta-section h2 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(32px, 5vw, 56px);
    font-weight: 800; letter-spacing: -1.5px;
    margin-bottom: 16px;
  }
  .nt-cta-section h2 span { color: var(--gold); }
  .nt-cta-desc {
    color: var(--text-muted); font-size: 17px;
    max-width: 500px; margin: 0 auto 40px;
    line-height: 1.7;
  }
  .nt-contact-options {
    display: flex; gap: 16px; justify-content: center;
    flex-wrap: wrap; margin-top: 16px;
  }
  .nt-contact-link {
    display: flex; align-items: center; gap: 10px;
    background: var(--dark3);
    border: 0.5px solid var(--border-bright);
    border-radius: 8px; padding: 14px 24px;
    color: var(--text); text-decoration: none;
    font-size: 14px; transition: all 0.2s;
  }
  .nt-contact-link:hover { border-color: var(--gold); color: var(--gold); }
  .nt-contact-icon { font-size: 18px; }

  /* FOOTER */
  .nt-footer {
    padding: 32px 5%; text-align: center;
    color: var(--text-muted); font-size: 13px;
    border-top: 0.5px solid var(--border);
  }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    .nt-nav-links { display: none; }
    .nt-project { grid-template-columns: 1fr; gap: 32px; }
    .nt-project.reverse { direction: ltr; }
    .nt-results-grid { grid-template-columns: 1fr; }
    .nt-stat { min-width: 130px; padding: 20px 16px; }
    .nt-stat-num { font-size: 24px; }
  }
`;

const projects = [
  {
    tag: "AI-Powered Strategy",
    title: "AWM Tick Strategy + ONNX AI Model",
    desc: "A fully automated NinjaTrader 8 strategy powered by a custom ONNX machine learning model trained on NQ futures tick data. The AI SkipScore indicator filters low-probability trades in real time, dramatically improving win rate. Combines deep learning with custom ATM order management, MACD confirmation, and dynamic stop-loss logic.",
    img: "AIStrategy.png",
    img2: "Tick.png",
    stats: [
      { val: "94%", label: "Win Rate", green: true },
      { val: "$68,000", label: "Net Profit", green: true },
      { val: "7.80", label: "Profit Factor", green: true },
      { val: "$2,000", label: "Max Drawdown", red: true },
    ],
    reverse: false,
  },
  {
    tag: "NinjaTrader AddOn",
    title: "Trade Copier — Multi-Account Mirroring",
    desc: "A production-grade NinjaTrader 8 AddOn that mirrors trades between two accounts in real time using an inverted hedge architecture. Built with thread-safe position reconciliation, live WPF settings panel, and async execution. Handles partial fills, order cancellation, and position flatness checks with zero race conditions.",
    img: "TradeCopier.png",
    stats: [
      { val: "2", label: "Accounts Synced", green: true },
      { val: "Real-time", label: "Execution Speed", green: true },
      { val: "Zero", label: "Race Conditions", green: true },
    ],
    reverse: true,
  },
  {
    tag: "Custom Strategy",
    title: "AWM Breakout Strategy + ABC Indicator",
    desc: "A breakout trading strategy built on custom asymmetric bar types (50-tick green / 150-tick reversal) with the proprietary AWMABC indicator. Features multi-order management (OM1/OM2), session filtering, volume confirmation, and a complete strategy analyzer integration for deep backtesting.",
    img: "ABC.png",
    stats: [
      { val: "91.6%", label: "Win Rate", green: true },
      { val: "$26,430", label: "Net Profit", green: true },
      { val: "5.75", label: "Profit Factor", green: true },
    ],
    reverse: false,
  },
  {
    tag: "MT5 / MQL5",
    title: "MT5 Market Analysis EA + Dashboard",
    desc: "A MetaTrader 5 Expert Advisor featuring a real-time volume cluster analysis panel showing multi-timeframe order flow data (Vol 250/500/1000). Tracks buy/sell pressure clusters directly on chart. Built alongside a full trading analytics React dashboard with P&L charts, drawdown tracking, and trade distribution analysis.",
    img: "Upwork1.png",
    stats: [
      { val: "Multi-TF", label: "Analysis Depth", green: true },
      { val: "Live", label: "Order Flow Data", green: true },
    ],
    reverse: true,
  },
];

const reviews = [
  {
    text: "Friendly developer who communicated well and got the job done. Will continue working with him in the future.",
    name: "Andreas Norlev",
    job: "AI Module Integration — NinjaTrader 8",
    initials: "TC",
  },
  {
    text: "Very fantastic person and developer. Highly recommended. Very professional and delivered exactly what was needed.",
    name: "Elohiym Adonai",
    job: "Pine Script → NT8/MT5 Conversion",
    initials: "SC",
  },
  {
    text: "Impressed with the seamless integration — fast, reliable, and highly efficient. A solid step toward fully automated trading.",
    name: "Michael Paulsin",
    job: "TradingView → Dhan Automation",
    initials: "AC",
  },
  {
    text: "Bharat is very responsive and professional. I have no issues working with him — highly recommend for any NinjaTrader work.",
    name: "Matthew Karasawa",
    job: "NinjaTrader 8 Custom Development",
    initials: "NC",
  },
  {
    text: "Working with Bharat was a pleasure. Fast delivery, thoroughly tested, and implemented required changes in no time. Looking forward to our next project.",
    name: "Yang Cui",
    job: "MetaTrader 5 EA Development",
    initials: "MC",
  },
];

export default function NinjaTraderLanding() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="nt-page">
      <style>{styles}</style>

      {/* NAV */}
      <nav className="nt-nav" style={{ boxShadow: scrolled ? "0 1px 30px rgba(0,0,0,0.5)" : "none" }}>
        <div className="nt-nav-logo">Bharat Muchhar</div>
        <ul className="nt-nav-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#results">Results</a></li>
          <li><a href="#reviews">Reviews</a></li>
        </ul>
        <a href="#contact" className="nt-nav-cta">Hire Me</a>
      </nav>

      {/* HERO */}
      <section className="nt-hero">
        <div className="nt-hero-grid" />
        <div className="nt-hero-glow" />
        <div className="nt-badge">
          <span className="nt-badge-dot" />
          Available for New Projects
        </div>
        <h1>
          NinjaTrader 8<br />
          <span>Expert Developer</span>
        </h1>
        <p className="nt-hero-sub">
          Custom strategies, AI-powered indicators, trade copiers, and automated systems built in C# and NinjaScript — for serious traders who need it done right.
        </p>
        <div className="nt-hero-btns">
          <a href="#contact" className="btn-primary">Get a Free Quote</a>
          <a href="#projects" className="btn-ghost">View My Work</a>
        </div>
      </section>

      {/* STATS */}
      <div className="nt-stats">
        <div className="nt-stat">
          <div className="nt-stat-num">$40K+</div>
          <div className="nt-stat-label">Earned on Upwork</div>
        </div>
        <div className="nt-stat">
          <div className="nt-stat-num">32+</div>
          <div className="nt-stat-label">Projects Completed</div>
        </div>
        <div className="nt-stat">
          <div className="nt-stat-num">5★</div>
          <div className="nt-stat-label">Average Rating</div>
        </div>
        <div className="nt-stat">
          <div className="nt-stat-num">NT8</div>
          <div className="nt-stat-label">Primary Specialization</div>
        </div>
        <div className="nt-stat">
          <div className="nt-stat-num">C#</div>
          <div className="nt-stat-label">Core Language</div>
        </div>
      </div>

      {/* SERVICES */}
      <section className="nt-section" id="services">
        <p className="nt-section-label">What I Build</p>
        <h2>End-to-End Trading Automation</h2>
        <p className="nt-section-desc">
          From simple indicators to full AI-powered strategies — I build production-ready NinjaTrader 8 systems that execute flawlessly in live markets.
        </p>
        <div className="nt-services-grid">
          {[
            { icon: "⚡", title: "Custom Strategies", desc: "Full automated trading strategies with entry/exit logic, ATM management, session filters, and real-time risk controls.", tag: "NinjaScript C#" },
            { icon: "🧠", title: "AI / ONNX Integration", desc: "Machine learning models integrated into NT8 using ONNX runtime for intelligent trade filtering and probability scoring.", tag: "ML + C#" },
            { icon: "📊", title: "Custom Indicators", desc: "Proprietary indicators — volume clusters, breakout detectors, multi-timeframe overlays — with exposed signal series for strategy use.", tag: "NinjaScript" },
            { icon: "🔁", title: "Trade Copier AddOns", desc: "Multi-account trade mirroring with hedge/mirror logic, WPF settings panels, and thread-safe position reconciliation.", tag: "NT8 AddOn" },
            { icon: "📈", title: "MT5 / MQL5 EAs", desc: "MetaTrader 5 Expert Advisors for automated entry/exit, volume analysis, and multi-timeframe signal processing.", tag: "MQL5" },
            { icon: "🖥️", title: "Dashboards & Tools", desc: "React-based trading analytics dashboards, P&L trackers, and backtest reporting tools for your trading data.", tag: "React / Python" },
          ].map((s, i) => (
            <div className="nt-service-card" key={i}>
              <div className="nt-service-icon">{s.icon}</div>
              <div className="nt-service-title">{s.title}</div>
              <div className="nt-service-desc">{s.desc}</div>
              <span className="nt-service-tag">{s.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section className="nt-section" id="projects" style={{ paddingTop: 0 }}>
        <p className="nt-section-label">Portfolio</p>
        <h2>Real Projects, Real Results</h2>
        <p className="nt-section-desc">
          Every project is built, tested, and backtested with real market data before delivery.
        </p>
        <div className="nt-projects">
          {projects.map((p, i) => (
            <div className={`nt-project${p.reverse ? " reverse" : ""}`} key={i}>
              <div className="nt-project-img">
                <img src={p.img} alt={p.title} />
              </div>
              <div>
                <span className="nt-project-tag">{p.tag}</span>
                <div className="nt-project-title">{p.title}</div>
                <p className="nt-project-desc">{p.desc}</p>
                <div className="nt-project-stats">
                  {p.stats.map((s, j) => (
                    <div className="nt-pstat" key={j}>
                      <span className={`nt-pstat-val${s.red ? " red" : ""}`}>{s.val}</span>
                      <span className="nt-pstat-label">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BACKTEST RESULTS */}
      <section className="nt-section" id="results" style={{ paddingTop: 0 }}>
        <p className="nt-section-label">Backtest Performance</p>
        <h2>Numbers Don't Lie</h2>
        <p className="nt-section-desc">
          Real NinjaTrader Strategy Analyzer results from live market replay — not curve-fitted simulations.
        </p>
        <div className="nt-results-grid">
          <div className="nt-result-card">
            <img src="Result2.png" alt="AI Strategy Performance" />
            <div className="nt-result-label">
              <strong>AWM AI Strategy</strong> — $68,000 net profit · 93.98% win rate · PF 7.80
            </div>
          </div>
          <div className="nt-result-card">
            <img src="Results.png" alt="Breakout Strategy Performance" />
            <div className="nt-result-label">
              <strong>AWM Breakout Strategy</strong> — $26,430 net profit · 91.67% win rate · PF 5.75
            </div>
          </div>
        </div>
      </section>

      {/* UPWORK PROOF */}
      <section className="nt-section" style={{ paddingTop: 0 }}>
        <p className="nt-section-label">Verified Track Record</p>
        <h2>32+ Projects on Upwork</h2>
        <p className="nt-section-desc">
          Over $40,000 earned with consistent 5-star ratings from traders and firms worldwide.
        </p>
        <div className="nt-proof">
          <img src="Upwork2.png" alt="Upwork Profile Stats" />
        </div>
      </section>

      {/* REVIEWS */}
      <section className="nt-section" id="reviews" style={{ paddingTop: 0 }}>
        <p className="nt-section-label">Client Reviews</p>
        <h2>What Traders Say</h2>
        <p className="nt-section-desc" style={{ marginBottom: 40 }}>
          Trusted by retail traders, prop firms, and quant developers across the globe.
        </p>
        <div className="nt-reviews-grid">
          {reviews.map((r, i) => (
            <div className="nt-review-card" key={i}>
              <div className="nt-stars">★★★★★</div>
              <p className="nt-review-text">"{r.text}"</p>
              <div className="nt-review-author">
                <div className="nt-avatar">{r.initials}</div>
                <div>
                  <div className="nt-review-name">{r.name}</div>
                  <div className="nt-review-job">{r.job}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="nt-cta-section" id="contact">
        <h2>Ready to Automate<br /><span>Your Trading?</span></h2>
        <p className="nt-cta-desc">
          Tell me what you need — strategy, indicator, trade copier, or EA. I'll get back to you within 24 hours with a clear plan and price.
        </p>
        <a href="mailto:muchharbharat10@gmail.com" className="btn-primary" style={{ fontSize: 16, padding: "16px 40px" }}>
          Get a Free Quote
        </a>
        <div className="nt-contact-options">
          <a href="mailto:muchharbharat10@gmail.com" className="nt-contact-link">
            <span className="nt-contact-icon">✉</span>
            muchharbharat10@gmail.com
          </a>
          <a href="https://wa.me/917203970277" className="nt-contact-link" target="_blank" rel="noreferrer">
            <span className="nt-contact-icon">💬</span>
            WhatsApp +91 72039 70277
          </a>
          <a href="https://bharatmuchhar.com" className="nt-contact-link">
            <span className="nt-contact-icon">🌐</span>
            bharatmuchhar.com
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="nt-footer">
        © 2026 Bharat Muchhar · NinjaTrader 8 Developer · All rights reserved
      </footer>
    </div>
  );
}
