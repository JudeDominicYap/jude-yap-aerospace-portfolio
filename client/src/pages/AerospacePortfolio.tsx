import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, BookOpen, BrainCircuit, Code2, ExternalLink, Github, Menu, Plane, Rocket, ScanFace, X } from "lucide-react";
import "../aerospace.css";

const BOOT = [
  "FLIGHT SYSTEM / JUDE DOMINIC YAP",
  "Initializing flight deck...",
  "Loading project telemetry...",
  "Checking training records...",
  "Systems nominal. Welcome aboard.",
];

const NAV = [
  ["home", "Home"],
  ["projects", "Projects"],
  ["skills", "Skills"],
  ["training", "Training"],
  ["contact", "Contact"],
] as const;

const PROJECTS = [
  {
    number: "01",
    title: "Automated Facial Recognition System",
    type: "PYTHON / COMPUTER VISION / AI",
    icon: ScanFace,
    summary: "A student-built Python project exploring image processing, computer vision, automation, and AI concepts.",
    tags: ["Python", "Computer Vision", "AI", "Automation"],
  },
  {
    number: "02",
    title: "Small-Scale Hydroelectric Charging Station",
    type: "STEM RESEARCH / ENERGY SYSTEM",
    icon: Rocket,
    summary: "A research prototype exploring water flow, electrical generation, charging applications, and preliminary performance evaluation.",
    tags: ["Research", "Energy", "Engineering", "Prototype"],
  },
  {
    number: "03",
    title: "Interactive Aerospace Portfolio",
    type: "REACT / WEB / DOCUMENTATION",
    icon: Plane,
    summary: "An interactive GitHub Pages portfolio designed to document technical work, learning, and an engineering direction.",
    tags: ["React", "TypeScript", "CSS", "GitHub Pages"],
  },
];

const SKILLS = [
  { title: "Python & Prototyping", icon: Code2, text: "Build small programs, automate tasks, and turn technical ideas into testable prototypes." },
  { title: "AI & Computer Vision", icon: BrainCircuit, text: "Explore visual data, image processing, recognition systems, and the reasoning behind AI workflows." },
  { title: "Research & Documentation", icon: BookOpen, text: "Break large questions into manageable tasks and clearly document methods, observations, and learning." },
];

const TRAINING = [
  ["Python Essentials 1", "Cisco Networking Academy", "2026"],
  ["Prompt Engineering Essentials", "FreeAcademy.ai", "2026"],
  ["Claude Projects Artifacts", "FreeAcademy.ai", "2026"],
  ["Introduction to Modern AI", "Cisco Networking Academy / DICT-ITU DTC", "2025"],
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function AerospacePortfolio() {
  const [booting, setBooting] = useState(true);
  const [bootLine, setBootLine] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [activeProject, setActiveProject] = useState(0);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const deckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setBootLine((line) => {
        if (line >= BOOT.length - 1) {
          window.clearInterval(timer);
          window.setTimeout(() => setBooting(false), 650);
          return line;
        }
        return line + 1;
      });
    }, 500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      setMouse({
        x: Math.round((event.clientX / Math.max(window.innerWidth, 1)) * 100),
        y: Math.round((event.clientY / Math.max(window.innerHeight, 1)) * 100),
      });
      deckRef.current?.style.setProperty("--mx", `${event.clientX}px`);
      deckRef.current?.style.setProperty("--my", `${event.clientY}px`);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveNav(visible.target.id);
      },
      { threshold: [0.25, 0.6], rootMargin: "-15% 0px -55% 0px" },
    );
    NAV.forEach(([id]) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  const coord = useMemo(() => `${mouse.x.toString().padStart(2, "0")}:${mouse.y.toString().padStart(2, "0")}`, [mouse]);
  const selected = PROJECTS[activeProject];

  return (
    <div ref={deckRef} className="flight-deck">
      <div className="hud-grid" aria-hidden="true" />
      <div className="scanline" aria-hidden="true" />
      <div className="orbit-dot dot-a" aria-hidden="true" />
      <div className="orbit-dot dot-b" aria-hidden="true" />

      {booting && (
        <div className="flight-boot" role="status" aria-live="polite">
          <div className="boot-panel">
            <div className="boot-label">✦ FLIGHT DECK ONLINE</div>
            {BOOT.slice(0, bootLine + 1).map((line) => <div className="boot-line" key={line}>{line}<span>_</span></div>)}
            <div className="boot-progress"><span style={{ width: `${((bootLine + 1) / BOOT.length) * 100}%` }} /></div>
          </div>
        </div>
      )}

      <header className="flight-nav">
        <button className="flight-brand" onClick={() => scrollToId("home")}>
          <span className="brand-mark"><Plane size={18} /></span>
          <span><strong>J. DOMINIC YAP</strong><small>AEROSPACE ENGINEERING / FLIGHT LOG</small></span>
        </button>
        <nav className={menuOpen ? "flight-links open" : "flight-links"}>
          {NAV.map(([id, label]) => <button key={id} className={activeNav === id ? "active" : ""} onClick={() => { scrollToId(id); setMenuOpen(false); }}>{label}</button>)}
        </nav>
        <div className="nav-status"><span>GRID {coord}</span><i /> <b>NOMINAL</b><button className="menu-button" onClick={() => setMenuOpen((v) => !v)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button></div>
      </header>

      <main>
        <section id="home" className="flight-hero">
          <div className="hero-hud" aria-hidden="true"><span>ALT 000</span><span>SPD 000</span><span>HDG 270°</span></div>
          <div className="hero-copy">
            <div className="eyebrow"><span /> GRADE 12 STEM · PHILIPPINES · FLIGHT LOG 01</div>
            <h1>Building a future<br /><em>in flight.</em></h1>
            <p>I’m Jude Dominic Yap — a STEM student building foundations in Python, AI, research, and engineering while preparing for a future in aeronautical engineering.</p>
            <div className="hero-actions">
              <button className="flight-button primary" onClick={() => scrollToId("projects")}>VIEW MISSION LOG <ArrowDown size={16} /></button>
              <a className="flight-button" href="https://github.com/JudeDominicYap" target="_blank" rel="noreferrer">GITHUB <ExternalLink size={15} /></a>
            </div>
            <div className="hero-data"><div><span>DESTINATION</span><b>AERONAUTICAL ENGINEERING</b></div><div><span>CORE TOOL</span><b>PYTHON</b></div><div><span>METHOD</span><b>LEARN → BUILD → TEST</b></div></div>
          </div>
          <div className="aircraft-display" aria-hidden="true">
            <div className="radar-ring ring-1" /><div className="radar-ring ring-2" /><div className="radar-ring ring-3" />
            <div className="aircraft-line"><span className="nose" /><span className="wing wing-top" /><span className="wing wing-bottom" /><span className="tail" /></div>
            <span className="target t1">01</span><span className="target t2">AIRFRAME</span>
          </div>
          <div className="hero-footer"><span>STATUS / LEARNING IN PROGRESS</span><span>LAT 14.59 · LONG 120.98</span><span>SCROLL TO EXPLORE ↓</span></div>
        </section>

        <section id="projects" className="flight-section mission-section">
          <div className="section-head"><div><span className="section-code">01 / MISSION LOG</span><h2>Projects with <em>purpose.</em></h2></div><p>Technical work, research, and experiments presented as an evolving engineering flight log.</p></div>
          <div className="mission-layout">
            <div className="mission-list">
              {PROJECTS.map((project, index) => { const Icon = project.icon; return <button key={project.title} className={index === activeProject ? "mission-card active" : "mission-card"} onClick={() => setActiveProject(index)}><span className="mission-number">{project.number}</span><Icon size={22} /><div><small>{project.type}</small><h3>{project.title}</h3><p>{project.summary}</p></div><ArrowUpRight size={20} /></button>; })}
            </div>
            <div className="mission-detail"><div className="detail-top"><span>SELECTED MISSION / {selected.number}</span><span>TELEMETRY OK</span></div><div className="detail-visual"><selected.icon size={78} strokeWidth={1} /><div className="detail-crosshair" /></div><h3>{selected.title}</h3><p>{selected.summary}</p><div className="tag-row">{selected.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
          </div>
        </section>

        <section id="skills" className="flight-section skills-section">
          <div className="section-head"><div><span className="section-code">02 / SYSTEMS</span><h2>Tools for the <em>workbench.</em></h2></div><p>A practical skill set focused on learning, prototyping, research, and communicating technical ideas.</p></div>
          <div className="systems-grid">{SKILLS.map((skill, index) => { const Icon = skill.icon; return <article className="system-card" key={skill.title}><span>SYS 0{index + 1}</span><Icon size={25} /><h3>{skill.title}</h3><p>{skill.text}</p><div className="system-bar"><i style={{ width: `${78 - index * 8}%` }} /></div></article>; })}</div>
        </section>

        <section id="training" className="flight-section training-section">
          <div className="section-head"><div><span className="section-code">03 / TRAINING</span><h2>Training <em>records.</em></h2></div><p>Selected credentials and learning milestones currently recorded in the portfolio.</p></div>
          <div className="training-table">{TRAINING.map(([title, provider, year], index) => <div className="training-row" key={title}><span>0{index + 1}</span><div><b>{title}</b><small>{provider}</small></div><time>{year}</time><span className="verified">VERIFIED</span></div>)}</div>
        </section>

        <section id="contact" className="flight-section contact-section">
          <div className="contact-panel"><span className="section-code">04 / OPEN CHANNEL</span><h2>Let’s build something<br /><em>worth launching.</em></h2><p>This portfolio is a record of where I am now — and a starting point for the engineering work ahead.</p><div className="contact-actions"><a className="flight-button primary" href="https://github.com/JudeDominicYap" target="_blank" rel="noreferrer"><Github size={16} /> GITHUB</a><a className="flight-button" href="https://www.linkedin.com/in/judedominicyap" target="_blank" rel="noreferrer">LINKEDIN <ExternalLink size={15} /></a></div></div>
        </section>
      </main>

      <footer className="flight-footer"><span>JUDE DOMINIC YAP / AEROSPACE PORTFOLIO</span><span>BUILT WITH REACT · TYPESCRIPT · GITHUB PAGES</span><span>© 2026</span></footer>
    </div>
  );
}
