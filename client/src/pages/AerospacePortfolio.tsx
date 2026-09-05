import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  Check,
  Code2,
  ExternalLink,
  Github,
  Menu,
  Plane,
  Rocket,
  ScanFace,
  X,
} from "lucide-react";
import "../aerospace.css";

const BOOT = [
  "FLIGHT SYSTEM / JUDE DOMINIC YAP",
  "Initializing portfolio interface...",
  "Loading mission records...",
  "Calibrating aerospace systems...",
  "Systems nominal. Welcome aboard.",
];

const NAV = [
  ["home", "Home"],
  ["about", "About"],
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
    summary:
      "A Python-based project exploring image processing, computer vision, recognition, and automation through a practical working system.",
    tags: ["Python", "Computer Vision", "AI", "Automation"],
  },
  {
    number: "02",
    title: "Small-Scale Hydroelectric Charging Station",
    type: "STEM RESEARCH / ENERGY SYSTEM",
    icon: Rocket,
    summary:
      "A research prototype investigating water flow, electrical generation, charging applications, stability, and preliminary performance.",
    tags: ["Research", "Energy", "Engineering", "Prototype"],
  },
  {
    number: "03",
    title: "Interactive Aerospace Portfolio",
    type: "REACT / TYPESCRIPT / WEB",
    icon: Plane,
    summary:
      "A living engineering portfolio built to document technical projects, training, experiments, and the journey toward aerospace engineering.",
    tags: ["React", "TypeScript", "CSS", "GitHub Pages"],
  },
];

const SKILLS = [
  {
    title: "Python & Prototyping",
    icon: Code2,
    text: "Build programs, automate tasks, and turn technical ideas into small, testable prototypes.",
  },
  {
    title: "AI & Computer Vision",
    icon: BrainCircuit,
    text: "Explore image processing, recognition systems, automation, and practical AI workflows.",
  },
  {
    title: "Research & Documentation",
    icon: BookOpen,
    text: "Break complex questions into manageable experiments and clearly communicate what was learned.",
  },
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
          window.setTimeout(() => setBooting(false), 550);
          return line;
        }
        return line + 1;
      });
    }, 430);
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
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveNav(visible.target.id);
      },
      { threshold: [0.2, 0.55], rootMargin: "-12% 0px -58% 0px" },
    );
    NAV.forEach(([id]) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  const coord = useMemo(
    () => `${mouse.x.toString().padStart(2, "0")} : ${mouse.y.toString().padStart(2, "0")}`,
    [mouse],
  );
  const selected = PROJECTS[activeProject];
  const SelectedIcon = selected.icon;

  return (
    <div ref={deckRef} className="flight-deck">
      <div className="hud-grid" aria-hidden="true" />
      <div className="scanline" aria-hidden="true" />
      <div className="cursor-glow" aria-hidden="true" />
      <div className="orbit-dot dot-a" aria-hidden="true" />
      <div className="orbit-dot dot-b" aria-hidden="true" />

      {booting && (
        <div className="flight-boot" role="status" aria-live="polite">
          <div className="boot-panel">
            <div className="boot-label">✦ FLIGHT DECK ONLINE</div>
            {BOOT.slice(0, bootLine + 1).map((line) => (
              <div className="boot-line" key={line}>
                {line}<span>_</span>
              </div>
            ))}
            <div className="boot-progress">
              <span style={{ width: `${((bootLine + 1) / BOOT.length) * 100}%` }} />
            </div>
          </div>
        </div>
      )}

      <header className="flight-nav">
        <button className="flight-brand" onClick={() => scrollToId("home")} aria-label="Go to home">
          <span className="brand-mark"><Plane size={18} /></span>
          <span>
            <strong>J. DOMINIC YAP</strong>
            <small>AEROSPACE / ENGINEERING PORTFOLIO</small>
          </span>
        </button>

        <nav className={menuOpen ? "flight-links open" : "flight-links"}>
          {NAV.map(([id, label]) => (
            <button
              key={id}
              className={activeNav === id ? "active" : ""}
              onClick={() => {
                scrollToId(id);
                setMenuOpen(false);
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="nav-status">
          <span>POS {coord}</span><i /><b>NOMINAL</b>
          <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="flight-hero">
          <div className="hero-hud" aria-hidden="true">
            <span>ALT 000</span><span>SPD 000</span><span>HDG 270°</span>
          </div>

          <div className="hero-copy">
            <div className="eyebrow"><span /> GRADE 12 STEM · PHILIPPINES · FLIGHT LOG 01</div>
            <p className="hero-kicker">ASPIRING AERONAUTICAL ENGINEER</p>
            <h1>Building a future<br /><em>in flight.</em></h1>
            <p className="hero-intro">
              I’m Jude Dominic Yap — a STEM student building foundations in Python, AI,
              research, and engineering while preparing for a future in aeronautical engineering.
            </p>
            <div className="hero-actions">
              <button className="flight-button primary" onClick={() => scrollToId("projects")}>
                EXPLORE PROJECTS <ArrowDown size={16} />
              </button>
              <a className="flight-button" href="https://github.com/JudeDominicYap" target="_blank" rel="noreferrer">
                GITHUB <ExternalLink size={15} />
              </a>
            </div>
            <div className="hero-data">
              <div><span>DESTINATION</span><b>AERONAUTICAL ENGINEERING</b></div>
              <div><span>CORE TOOL</span><b>PYTHON</b></div>
              <div><span>METHOD</span><b>LEARN → BUILD → TEST</b></div>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />
            <div className="visual-orbit orbit-three" />
            <div className="visual-crosshair" />
            <div className="aircraft-line">
              <span className="nose" /><span className="wing wing-top" /><span className="wing wing-bottom" /><span className="tail" />
            </div>
            <div className="visual-label label-a">01 / AIRFRAME</div>
            <div className="visual-label label-b">FLIGHT PATH / 001</div>
            <div className="visual-coordinates">14.59° N<br />120.98° E</div>
          </div>

          <div className="hero-footer">
            <span>STATUS / LEARNING IN PROGRESS</span>
            <span>ENGINEERING LOG / 2026</span>
            <span>SCROLL TO EXPLORE ↓</span>
          </div>
        </section>

        <section id="about" className="flight-section about-section">
          <div className="section-head">
            <div><span className="section-code">00 / PILOT PROFILE</span><h2>Curious by nature.<br /><em>Engineering by direction.</em></h2></div>
            <p>A portfolio for documenting the skills, projects, and experiments that are shaping my path toward aerospace engineering.</p>
          </div>
          <div className="about-grid">
            <div className="about-statement">
              <span className="big-index">01</span>
              <p>My approach is simple: <strong>learn the fundamentals, build something practical, test it, and improve.</strong></p>
            </div>
            <div className="about-facts">
              <div><span>FIELD</span><b>AEROSPACE / AERONAUTICAL ENGINEERING</b></div>
              <div><span>BACKGROUND</span><b>GRADE 12 STEM</b></div>
              <div><span>INTERESTS</span><b>FLIGHT · AI · PYTHON · RESEARCH</b></div>
              <div><span>STATUS</span><b><i className="status-dot" /> BUILDING FOUNDATIONS</b></div>
            </div>
          </div>
        </section>

        <section id="projects" className="flight-section mission-section">
          <div className="section-head">
            <div><span className="section-code">01 / MISSION LOG</span><h2>Projects with <em>purpose.</em></h2></div>
            <p>Selected technical work and research presented as an evolving engineering flight log.</p>
          </div>
          <div className="mission-layout">
            <div className="mission-list">
              {PROJECTS.map((project, index) => {
                const Icon = project.icon;
                return (
                  <button
                    key={project.title}
                    className={index === activeProject ? "mission-card active" : "mission-card"}
                    onClick={() => setActiveProject(index)}
                  >
                    <span className="mission-number">{project.number}</span>
                    <span className="mission-icon"><Icon size={21} /></span>
                    <div><small>{project.type}</small><h3>{project.title}</h3><p>{project.summary}</p></div>
                    <ArrowUpRight size={19} />
                  </button>
                );
              })}
            </div>
            <div className="mission-detail">
              <div className="detail-top"><span>SELECTED MISSION / {selected.number}</span><span><i /> TELEMETRY OK</span></div>
              <div className="detail-visual"><SelectedIcon size={76} strokeWidth={1} /><div className="detail-crosshair" /><span className="detail-scan" /></div>
              <div className="detail-type">{selected.type}</div>
              <h3>{selected.title}</h3>
              <p>{selected.summary}</p>
              <div className="tag-row">{selected.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
          </div>
        </section>

        <section id="skills" className="flight-section skills-section">
          <div className="section-head">
            <div><span className="section-code">02 / SYSTEMS</span><h2>Tools for the <em>workbench.</em></h2></div>
            <p>A practical skill set focused on learning, prototyping, research, and communicating technical ideas.</p>
          </div>
          <div className="systems-grid">
            {SKILLS.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <article className="system-card" key={skill.title}>
                  <div className="system-top"><span>SYS 0{index + 1}</span><span>ACTIVE</span></div>
                  <Icon size={25} />
                  <h3>{skill.title}</h3>
                  <p>{skill.text}</p>
                  <div className="system-bar"><i style={{ width: `${78 - index * 8}%` }} /></div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="training" className="flight-section training-section">
          <div className="section-head">
            <div><span className="section-code">03 / TRAINING</span><h2>Training <em>records.</em></h2></div>
            <p>Selected credentials and learning milestones currently recorded in the portfolio.</p>
          </div>
          <div className="training-table">
            {TRAINING.map(([title, provider, year], index) => (
              <div className="training-row" key={title}>
                <span>0{index + 1}</span>
                <div><b>{title}</b><small>{provider}</small></div>
                <time>{year}</time>
                <span className="verified"><Check size={13} /> VERIFIED</span>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="flight-section contact-section">
          <div className="contact-panel">
            <span className="section-code">04 / OPEN CHANNEL</span>
            <h2>Let’s build something<br /><em>worth launching.</em></h2>
            <p>This portfolio is a record of where I am now — and a starting point for the engineering work ahead.</p>
            <div className="contact-actions">
              <a className="flight-button primary" href="https://github.com/JudeDominicYap" target="_blank" rel="noreferrer"><Github size={16} /> GITHUB</a>
              <a className="flight-button" href="https://www.linkedin.com/in/judedominicyap" target="_blank" rel="noreferrer">LINKEDIN <ExternalLink size={15} /></a>
            </div>
            <div className="contact-grid"><span>CHANNEL</span><b>OPEN FOR CONNECTIONS & COLLABORATION</b><span>BASE</span><b>PHILIPPINES</b></div>
          </div>
        </section>
      </main>

      <footer className="flight-footer">
        <span>JUDE DOMINIC YAP / AEROSPACE PORTFOLIO</span>
        <span>REACT · TYPESCRIPT · GITHUB PAGES</span>
        <span>© 2026</span>
      </footer>
    </div>
  );
}
