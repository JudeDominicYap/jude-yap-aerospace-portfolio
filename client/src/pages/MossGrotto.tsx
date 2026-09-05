import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  Code2,
  ExternalLink,
  Github,
  Leaf,
  Linkedin,
  Mail,
  Menu,
  Mountain,
  ScanFace,
  Sprout,
  X,
} from "lucide-react";
import "../moss-grotto.css";
import "../moss-richness.css";

const BOOT_LINES = [
  "FIELD JOURNAL / MOSS GROTTO",
  "Waking the forest map...",
  "Reading project notes...",
  "Loading verified credentials...",
  "Path clear. Welcome, traveler.",
];

const PROJECTS = [
  {
    id: "project-01",
    code: "01",
    title: "Automated Facial Recognition System",
    type: "PYTHON / COMPUTER VISION / AI",
    icon: ScanFace,
    summary: "A Python-based project exploring automated facial recognition, visual input, image processing, and AI concepts.",
    detail: "The repository describes this as a student technical project focused on learning how software can process visual information and produce a recognition result. The portfolio intentionally avoids claiming production accuracy or deployment results that are not documented.",
    tags: ["Python", "Computer Vision", "Artificial Intelligence", "Image Processing", "Automation"],
  },
  {
    id: "project-02",
    code: "02",
    title: "Personal Portfolio Website",
    type: "WEB / DOCUMENTATION",
    icon: Mountain,
    summary: "A responsive portfolio built to document projects, skills, interests, learning, and preparation for future engineering study.",
    detail: "The site is designed as a static GitHub Pages experience with responsive layout, interactive UI, and content grounded in the project repository rather than invented accomplishments.",
    tags: ["HTML", "CSS", "JavaScript", "React"],
  },
];

const CERTIFICATES = [
  {
    title: "Python Essentials 1",
    provider: "Networking Academy · Cisco Networking Academy",
    date: "09 Aug 2026",
  },
  {
    title: "Claude Projects Artifacts",
    provider: "FreeAcademy.ai",
    date: "21 Aug 2026",
  },
  {
    title: "Prompt Engineering Essentials",
    provider: "FreeAcademy.ai",
    date: "21 Aug 2026",
  },
  {
    title: "Introduction to Modern AI",
    provider: "DICT-ITU DTC Initiative · Cisco Networking Academy",
    date: "30 Jul 2025",
  },
];

const CONTRIBUTIONS = [
  {
    title: "Prototype with Python",
    icon: Code2,
    body: "I can turn a small technical idea into a Python script or student-scale prototype, then iterate as the problem becomes clearer.",
  },
  {
    title: "Explore AI & Computer Vision",
    icon: BrainCircuit,
    body: "I can contribute to early-stage AI and computer-vision work by building, testing, documenting, and reviewing the steps behind a system.",
  },
  {
    title: "Research & Organize",
    icon: BookOpen,
    body: "I can help break a large question into smaller tasks, organize technical information, and document what was tested and learned.",
  },
  {
    title: "Build Clear Web Interfaces",
    icon: Sprout,
    body: "I can build and customize responsive frontend pages with HTML, CSS, JavaScript, and React for project documentation and presentations.",
  },
];

const NAV = [
  ["home", "Home"],
  ["work", "Work"],
  ["value", "What I Can Do"],
  ["learning", "Learning"],
  ["contact", "Contact"],
] as const;

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function PixelLeaf({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`pixel-leaf ${className}`} />;
}

export default function MossGrotto() {
  const [booting, setBooting] = useState(true);
  const [bootLine, setBootLine] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<(typeof PROJECTS)[number] | null>(null);
  const [activeContribution, setActiveContribution] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState("home");
  const [mood, setMood] = useState(0);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (!booting) return;
    const timer = window.setInterval(() => {
      setBootLine((value) => {
        if (value >= BOOT_LINES.length - 1) {
          window.clearInterval(timer);
          window.setTimeout(() => setBooting(false), 680);
          return value;
        }
        return value + 1;
      });
    }, 560);
    return () => window.clearInterval(timer);
  }, [booting]);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      setMouse({
        x: Math.round((event.clientX / Math.max(window.innerWidth, 1)) * 100),
        y: Math.round((event.clientY / Math.max(window.innerHeight, 1)) * 100),
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveNav(visible.target.id);
      },
      { threshold: [0.2, 0.5, 0.8], rootMargin: "-15% 0px -55% 0px" },
    );
    NAV.forEach(([id]) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  const coord = useMemo(() => `${mouse.x.toString().padStart(2, "0")}:${mouse.y.toString().padStart(2, "0")}`, [mouse]);

  return (
    <div className={`moss-site mood-${mood}`}>
      <div className="ambient-layer" aria-hidden="true">
        <PixelLeaf className="leaf-a" />
        <PixelLeaf className="leaf-b" />
        <PixelLeaf className="leaf-c" />
        <PixelLeaf className="leaf-d" />
        <span className="spore spore-a" />
        <span className="spore spore-b" />
        <span className="spore spore-c" />
        <span className="spore spore-d" />
      </div>

      {booting && (
        <div className="moss-boot" role="status" aria-live="polite">
          <div className="boot-fireflies" aria-hidden="true" />
          <div className="boot-card">
            <div className="boot-mark"><Leaf size={17} /> FIELD JOURNAL</div>
            <div className="boot-lines">
              {BOOT_LINES.slice(0, bootLine + 1).map((line) => (
                <div className="boot-line" key={line}>{line}<span>_</span></div>
              ))}
            </div>
            <div className="boot-bar"><span style={{ width: `${((bootLine + 1) / BOOT_LINES.length) * 100}%` }} /></div>
          </div>
        </div>
      )}

      <header className="moss-nav">
        <button className="moss-logo" onClick={() => scrollToId("home")} aria-label="Return to top">
          <span className="logo-sprig"><Leaf size={17} /></span>
          <span>
            <strong>JUDE DOMINIC YAP</strong>
            <small>FIELD JOURNAL / STEM → ENGINEERING</small>
          </span>
        </button>

        <nav className={menuOpen ? "moss-links open" : "moss-links"}>
          {NAV.map(([id, label]) => (
            <button className={activeNav === id ? "active" : ""} key={id} onClick={() => { scrollToId(id); setMenuOpen(false); }}>{label}</button>
          ))}
        </nav>

        <div className="nav-tools">
          <span className="coord-readout">MAP {coord}</span>
          <button className="mood-toggle" onClick={() => setMood((value) => (value + 1) % 3)} aria-label="Change atmosphere">
            <Sprout size={15} />
          </button>
          <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="grove-hero page-section">
          <div className="hero-illustration" aria-hidden="true">
            <div className="hero-moon" />
            <div className="tree tree-left" />
            <div className="tree tree-right" />
            <div className="hill hill-back" />
            <div className="hill hill-front" />
            <div className="hero-path" />
            <span className="mote mote-1" />
            <span className="mote mote-2" />
            <span className="mote mote-3" />
          </div>

          <div className="hero-copy">
            <div className="location-chip"><span className="chip-dot" /> MOSS GROVE / ENTRY POINT</div>
            <p className="hero-kicker">GRADE 12 STEM · FUTURE ENGINEERING DIRECTION</p>
            <h1>Learning, building, <em>growing.</em></h1>
            <p className="hero-text">I’m Jude Dominic Yap. I’m building a foundation in Python, AI, research, and web development while preparing for future engineering study.</p>
            <div className="hero-actions">
              <button className="moss-button primary" onClick={() => scrollToId("work")}>ENTER THE JOURNAL <ArrowDown size={16} /></button>
              <a className="moss-button ghost" href="https://github.com/JudeDominicYap" target="_blank" rel="noreferrer">VIEW GITHUB <ExternalLink size={15} /></a>
            </div>
            <div className="hero-notes">
              <div><span>PATH</span><strong>AERONAUTICAL ENGINEERING</strong></div>
              <div><span>TOOLS</span><strong>PYTHON · AI · WEB</strong></div>
              <div><span>APPROACH</span><strong>LEARN · BUILD · DOCUMENT</strong></div>
            </div>
          </div>
        </section>

        <section id="work" className="page-section journal-section">
          <div className="section-intro">
            <span className="section-index">01 / WORK</span>
            <h2>Field notes from the <em>workbench.</em></h2>
            <p>Projects currently represented in the repository, presented without inflated claims.</p>
          </div>

          <div className="project-list">
            {PROJECTS.map((project) => {
              const Icon = project.icon;
              return (
                <button className="project-entry" key={project.id} onClick={() => setActiveProject(project)}>
                  <div className="project-bloom" />
                  <div className="project-icon"><Icon size={22} /></div>
                  <div className="project-code">PROJECT {project.code}</div>
                  <div className="project-main">
                    <span className="project-type">{project.type}</span>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                  </div>
                  <div className="project-arrow"><ArrowUpRight size={20} /></div>
                  <div className="project-vine" aria-hidden="true" />
                </button>
              );
            })}
          </div>
        </section>

        <section id="value" className="page-section value-section">
          <div className="section-intro split">
            <div>
              <span className="section-index">02 / VALUE</span>
              <h2>What I can <em>do for you.</em></h2>
            </div>
            <p>Practical value based on the skills and projects already documented in the repository: building small things, learning fast, and making technical work easier to follow.</p>
          </div>

          <div className="value-grid">
            {CONTRIBUTIONS.map((item, index) => {
              const Icon = item.icon;
              const open = activeContribution === item.title;
              return (
                <button className={open ? "value-card open" : "value-card"} key={item.title} onClick={() => setActiveContribution(open ? null : item.title)}>
                  <span className="value-number">0{index + 1}</span>
                  <Icon size={22} />
                  <h3>{item.title}</h3>
                  <span className="value-toggle">{open ? "CLOSE" : "READ NOTE"}<ChevronDown size={15} /></span>
                  <div className="value-detail">{item.body}</div>
                </button>
              );
            })}
          </div>
        </section>

        <section id="learning" className="page-section learning-section">
          <div className="section-intro split">
            <div>
              <span className="section-index">03 / LEARNING</span>
              <h2>A trail of <em>training.</em></h2>
            </div>
            <p>Credentials and direction recorded from the repository. A credential is shown only when it is actually documented.</p>
          </div>

          <div className="learning-layout">
            <div className="trail-map">
              <div className="trail-line" />
              {CERTIFICATES.map((certificate) => (
                <article className="certificate-card" key={certificate.title}>
                  <span className="trail-dot"><CheckCircle2 size={12} /></span>
                  <div>
                    <span className="certificate-date">{certificate.date}</span>
                    <h3>{certificate.title}</h3>
                    <p>{certificate.provider}</p>
                  </div>
                </article>
              ))}
            </div>

            <aside className="direction-card">
              <div className="direction-orb"><Sprout size={34} /></div>
              <span className="section-index">FUTURE DIRECTION</span>
              <h3>Aeronautical Engineering</h3>
              <p>The repository identifies aeronautical engineering as the future study direction. This page treats it as a goal, not a completed qualification.</p>
              <div className="direction-quote">“Keep the work honest. Let the path grow from what is actually built.”</div>
            </aside>
          </div>
        </section>

        <section id="contact" className="page-section contact-section">
          <div className="contact-card">
            <div className="contact-copy">
              <span className="section-index">04 / CONTACT</span>
              <h2>Find the path back <em>to the work.</em></h2>
              <p>For project collaboration, portfolio feedback, or professional contact, use the verified channels below.</p>
            </div>
            <div className="contact-links">
              <a href="mailto:judedominicyap@gmail.com"><Mail size={17} /> EMAIL</a>
              <a href="https://www.linkedin.com/in/judedominicyap" target="_blank" rel="noreferrer"><Linkedin size={17} /> LINKEDIN</a>
              <a href="https://github.com/JudeDominicYap" target="_blank" rel="noreferrer"><Github size={17} /> GITHUB</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="moss-footer">
        <span>© 2026 JUDE DOMINIC YAP</span>
        <span><Leaf size={13} /> MOSS GROVE FIELD JOURNAL</span>
        <span>GITHUB PAGES / STATIC</span>
      </footer>

      {activeProject && (() => {
        const ActiveProjectIcon = activeProject.icon;
        return (
          <div className="moss-modal-backdrop" onClick={() => setActiveProject(null)} role="presentation">
            <section className="moss-modal" role="dialog" aria-modal="true" aria-labelledby="project-title" onClick={(event) => event.stopPropagation()}>
              <div className="modal-top"><span>FIELD NOTE / PROJECT {activeProject.code}</span><button onClick={() => setActiveProject(null)} aria-label="Close project"><X size={20} /></button></div>
              <div className="modal-icon"><ActiveProjectIcon size={25} /></div>
              <span className="project-type">{activeProject.type}</span>
              <h2 id="project-title">{activeProject.title}</h2>
              <p>{activeProject.detail}</p>
              <div className="tag-list">{activeProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <button className="moss-button primary modal-close" onClick={() => setActiveProject(null)}>RETURN TO GROVE <ArrowUpRight size={15} /></button>
            </section>
          </div>
        );
      })()}
    </div>
  );
}
