import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  Compass,
  Cpu,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  Radar,
  Rocket,
  Satellite,
  ShieldCheck,
  Terminal,
  X,
} from "lucide-react";
import "../flight-deck.css";

const BOOT_LINES = [
  "FLIGHT DECK OS v1.0",
  "Initializing telemetry core...",
  "Loading mission archives...",
  "Synchronizing engineering profile...",
  "Systems nominal. Welcome aboard.",
];

const MISSIONS = [
  {
    id: "MSN-01",
    title: "Automated Facial Recognition System",
    status: "DEVELOPMENT",
    type: "AI / COMPUTER VISION",
    summary:
      "A Python-based learning project exploring facial-recognition workflows, computer vision, and responsible system design.",
    details:
      "The project is framed around understanding the pipeline from image input and feature processing to system output, without claiming production accuracy or deployment results that are not documented in the repository.",
    stack: ["Python", "Computer Vision", "AI"],
  },
  {
    id: "MSN-02",
    title: "Aerospace Portfolio Website",
    status: "LIVE",
    type: "WEB / DOCUMENTATION",
    summary:
      "A GitHub Pages portfolio built as a digital flight deck for documenting engineering interests, projects, skills, and technical growth.",
    details:
      "This site is intentionally static and GitHub Pages compatible, with responsive layout, accessible navigation, animated telemetry, and progressive enhancement that does not depend on a backend.",
    stack: ["React", "Vite", "GitHub Pages"],
  },
  {
    id: "MSN-03",
    title: "Research & Engineering Development",
    status: "ONGOING",
    type: "STEM / RESEARCH",
    summary:
      "A continuing body of school-based engineering, programming, and research work forming the foundation for future aerospace study.",
    details:
      "The focus is on documenting what has actually been built and learned while leaving room for future aircraft, systems, simulation, and research projects as they are completed.",
    stack: ["STEM", "Research", "Engineering"],
  },
];

const CERTIFICATES = [
  ["Python Essentials 1", "Networking Academy / Cisco Networking Academy", "2026-08-09"],
  ["Claude Projects Artifacts", "FreeAcademy.ai", "2026-08-21"],
  ["Prompt Engineering Essentials", "FreeAcademy.ai", "2026-08-21"],
  ["Introduction to Modern AI", "DICT-ITU DTC Initiative / Cisco Networking Academy", "2025-07-30"],
  ["AI Career Readiness Training", "Reserved / future item", "Not yet uploaded"],
] as const;

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function FlightDeck() {
  const [booting, setBooting] = useState(true);
  const [bootLine, setBootLine] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMission, setActiveMission] = useState<(typeof MISSIONS)[number] | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [systemTicks, setSystemTicks] = useState(98.7);

  useEffect(() => {
    if (!booting) return;
    const lineTimer = window.setInterval(() => {
      setBootLine((current) => {
        if (current >= BOOT_LINES.length - 1) {
          window.clearInterval(lineTimer);
          window.setTimeout(() => setBooting(false), 600);
          return current;
        }
        return current + 1;
      });
    }, 620);
    return () => window.clearInterval(lineTimer);
  }, [booting]);

  useEffect(() => {
    const handlePointer = (event: MouseEvent) => {
      const x = Math.round((event.clientX / Math.max(window.innerWidth, 1)) * 180 - 90);
      const y = Math.round(90 - (event.clientY / Math.max(window.innerHeight, 1)) * 180);
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", handlePointer, { passive: true });
    return () => window.removeEventListener("mousemove", handlePointer);
  }, []);

  useEffect(() => {
    const tick = window.setInterval(() => {
      setSystemTicks((value) => {
        const drift = (Math.random() - 0.5) * 0.12;
        return Number(Math.min(99.9, Math.max(97.8, value + drift)).toFixed(1));
      });
    }, 1400);
    return () => window.clearInterval(tick);
  }, []);

  const formattedTelemetry = useMemo(() => ({
    x: `${mouse.x >= 0 ? "+" : ""}${mouse.x.toString().padStart(3, "0")}`,
    y: `${mouse.y >= 0 ? "+" : ""}${mouse.y.toString().padStart(3, "0")}`,
  }), [mouse]);

  return (
    <div className="flight-deck">
      {booting && (
        <div className="boot-screen" role="status" aria-live="polite">
          <div className="boot-grid" />
          <div className="boot-panel">
            <div className="boot-brand"><Terminal size={18} /> MIDNIGHT FLIGHT DECK</div>
            <div className="boot-copy">
              {BOOT_LINES.slice(0, bootLine + 1).map((line) => (
                <div key={line} className="boot-line">{line}<span>_</span></div>
              ))}
            </div>
            <div className="boot-progress"><span style={{ width: `${((bootLine + 1) / BOOT_LINES.length) * 100}%` }} /></div>
          </div>
        </div>
      )}

      <div className="telemetry-cursor" aria-hidden="true">
        <span>X {formattedTelemetry.x}</span>
        <span>Y {formattedTelemetry.y}</span>
      </div>

      <header className="nav-shell">
        <button className="brand-button" onClick={() => scrollToId("home")} aria-label="Back to top">
          <span className="brand-mark"><Rocket size={17} /></span>
          <span><strong>J. DOMINIC YAP</strong><em>AEROSPACE FLIGHT DECK</em></span>
        </button>
        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"}>
          {["home", "systems", "missions", "credentials", "contact"].map((id) => (
            <button key={id} onClick={() => { scrollToId(id); setMenuOpen(false); }}>{id}</button>
          ))}
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <main>
        <section id="home" className="hero-section section-wrap">
          <div className="hero-copy">
            <div className="eyebrow"><span className="live-dot" /> SYSTEM ONLINE / ENGINEERING PROFILE</div>
            <h1>Building toward the <span>future of flight.</span></h1>
            <p className="hero-lede">I’m Jude Dominic Yap — a STEM student focused on aeronautical engineering, programming, research, and the systems thinking behind aerospace technology.</p>
            <div className="hero-actions">
              <button className="primary-action" onClick={() => scrollToId("missions")}>ENTER MISSION LOG <ArrowDownRight size={16} /></button>
              <a className="secondary-action" href="https://github.com/JudeDominicYap" target="_blank" rel="noreferrer">VIEW GITHUB <ExternalLink size={15} /></a>
            </div>
            <div className="hero-readout">
              <div><span>TRAJECTORY</span><b>AERONAUTICAL ENGINEERING</b></div>
              <div><span>PRIMARY STACK</span><b>PYTHON / RESEARCH / WEB</b></div>
              <div><span>STATUS</span><b>LEARNING → BUILDING → ITERATING</b></div>
            </div>
          </div>

          <div className="blueprint-panel">
            <div className="panel-top"><span>FLIGHT SYSTEMS // LIVE</span><span>02:17:48 UTC</span></div>
            <div className="blueprint-art">
              <div className="blueprint-crosshair"><span /><span /></div>
              <div className="aircraft-silhouette" />
              <div className="blueprint-orbit orbit-one" />
              <div className="blueprint-orbit orbit-two" />
              <div className="callout callout-a">A-01 / FUSELAGE</div>
              <div className="callout callout-b">A-02 / WING PLANFORM</div>
              <div className="callout callout-c">A-03 / PROPULSION ZONE</div>
              <div className="scan-line" />
            </div>
            <div className="panel-bottom"><span>SYS CHECK <b>100%</b></span><span>CORE TEMP <b>31°C</b></span><span>LINK <b>STABLE</b></span></div>
          </div>
        </section>

        <section id="systems" className="section-wrap compact-section">
          <div className="section-heading"><div><span>01 / SYSTEMS</span><h2>Engineering mindset, <em>in progress.</em></h2></div><p>The portfolio is built around honest documentation: what I can do now, what I am learning, and what I plan to build next.</p></div>
          <div className="systems-grid">
            <article><Compass size={19} /><span>01</span><h3>Aeronautical Engineering</h3><p>Exploring aircraft, flight, propulsion, and engineering systems as the long-term direction of my studies.</p></article>
            <article><Cpu size={19} /><span>02</span><h3>Python & AI</h3><p>Using Python to learn programming, computer vision, automation, and practical problem solving.</p></article>
            <article><ShieldCheck size={19} /><span>03</span><h3>Research Discipline</h3><p>Documenting school research and technical work with clear scope, limitations, and evidence.</p></article>
          </div>
        </section>

        <section id="missions" className="section-wrap missions-section">
          <div className="section-heading"><div><span>02 / MISSION LOGS</span><h2>Flight data from <em>the hangar.</em></h2></div><p>Hover a mission for the radar sweep. Open one to inspect the engineering context.</p></div>
          <div className="missions-grid">
            {MISSIONS.map((mission) => (
              <button key={mission.id} className="mission-card" onClick={() => setActiveMission(mission)} aria-label={`Open ${mission.title}`}>
                <div className="radar-sweep" />
                <div className="mission-head"><span>{mission.id}</span><span className="mission-status">{mission.status}</span></div>
                <Radar className="mission-icon" size={27} />
                <span className="mission-type">{mission.type}</span>
                <h3>{mission.title}</h3>
                <p>{mission.summary}</p>
                <div className="mission-footer"><span>OPEN FLIGHT DATA</span><ArrowUpRight size={16} /></div>
              </button>
            ))}
          </div>
        </section>

        <section id="credentials" className="section-wrap">
          <div className="section-heading"><div><span>03 / CREDENTIALS</span><h2>Training & <em>certification.</em></h2></div><p>Recorded from the project notes currently stored in the repository. Unuploaded files are intentionally shown as such.</p></div>
          <div className="credentials-list">
            {CERTIFICATES.map(([name, issuer, date], index) => (
              <article key={name} className="credential-row">
                <div className="credential-index">0{index + 1}</div>
                <div className="credential-main"><h3>{name}</h3><p>{issuer}</p></div>
                <div className="credential-date">{date}</div>
                <div className={date === "Not yet uploaded" ? "credential-state pending" : "credential-state"}>{date === "Not yet uploaded" ? "PENDING FILE" : "RECORDED"}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-wrap telemetry-section">
          <div className="telemetry-card">
            <div className="telemetry-copy"><span>LIVE TELEMETRY</span><h2>Move through the deck.</h2><p>The coordinate display tracks your pointer as a lightweight aerospace-style interface element.</p></div>
            <div className="telemetry-gauges">
              <div><span>X POSITION</span><b>{formattedTelemetry.x}</b></div>
              <div><span>Y POSITION</span><b>{formattedTelemetry.y}</b></div>
              <div><span>SYSTEM LOAD</span><b>{systemTicks}%</b></div>
              <div><span>LINK STATUS</span><b>STABLE</b></div>
            </div>
          </div>
        </section>

        <section id="contact" className="section-wrap contact-section">
          <div className="contact-panel">
            <div><span>04 / CONTACT</span><h2>Open a communications channel.</h2><p>For school projects, engineering opportunities, portfolio feedback, or collaboration, use the verified links below.</p></div>
            <div className="contact-actions">
              <a href="mailto:judedominicyap@gmail.com"><Mail size={17} /> EMAIL</a>
              <a href="https://www.linkedin.com/in/judedominicyap" target="_blank" rel="noreferrer"><Linkedin size={17} /> LINKEDIN</a>
              <a href="https://github.com/JudeDominicYap" target="_blank" rel="noreferrer"><Github size={17} /> GITHUB</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer-wrap"><span>© 2026 JUDE DOMINIC YAP</span><span>MIDNIGHT FLIGHT DECK / STATIC GITHUB PAGES SYSTEM</span><span>NO BACKEND REQUIRED</span></footer>

      {activeMission && (
        <div className="mission-modal-backdrop" onClick={() => setActiveMission(null)} role="presentation">
          <section className="mission-modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="mission-modal-title">
            <div className="modal-top"><span>{activeMission.id} // FLIGHT DATA</span><button onClick={() => setActiveMission(null)} aria-label="Close mission"><X size={20} /></button></div>
            <Radar size={34} />
            <span className="mission-type">{activeMission.type}</span>
            <h2 id="mission-modal-title">{activeMission.title}</h2>
            <p>{activeMission.details}</p>
            <div className="stack-list">{activeMission.stack.map((item) => <span key={item}>{item}</span>)}</div>
            <button className="close-modal" onClick={() => setActiveMission(null)}>RETURN TO FLIGHT DECK <ChevronDown size={15} /></button>
          </section>
        </div>
      )}
    </div>
  );
}
