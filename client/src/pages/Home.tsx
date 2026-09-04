/*
 * Midnight Flight Deck — page-level composition.
 * Use asymmetrical instrument-panel layouts, precise blueprint details, and honest student-focused copy.
 * Motion is a signal: short, purposeful reveals and interaction states, never spectacle.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Atom,
  BarChart3,
  BadgeCheck,
  BrainCircuit,
  Check,
  ChevronDown,
  CircuitBoard,
  Code2,
  Compass,
  Cpu,
  FileText,
  FlaskConical,
  Github,
  Globe2,
  GraduationCap,
  Hammer,
  Linkedin,
  Mail,
  Menu,
  FileText,
  Orbit,
  Plane,
  Plus,
  Radar,
  Rocket,
  Send,
  Sparkles,
  ScanFace,
  Terminal,
  TimerReset,
  Wind,
  Wrench,
  X,
  Zap,
} from "lucide-react";

// Visual assets live in `client/public/images/`. Vite copies `base: "./"` rewrites
// these to relative paths on build -> resolves correctly on any GitHub Pages URL.
// If a file is missing the portfolio still renders (fallback decorative
// SVG/CSS placeholders in index.css keep the visuals intact.
const blueprintAsset = "/images/aircraft-blueprint.png";
const diagramAsset = "/images/system-diagram.png";
const flightPathAsset = "/images/flight-path.png";
const brandMark = "/images/brand-mark.png";
const WEB3FORMS_ACCESS_KEY = "479b5cf2-2a42-4b6d-8082-955d5c7c4981";
// NOTE: Files live in `client/public/certificates/` so Vite copies them to
// the production build verbatim. Vite's `base: "./"` rewrites these absolute
// URLs to relative paths during build, so they resolve on GitHub Pages
// regardless of whether the site is hosted at the root or a repo sub-path.
// See `client/public/certificates/README.md` for the expected filenames.
const certificateAssets = {
  claude: { pdf: "/certificates/claude-projects-artifacts.pdf", thumb: "/certificates/claude-projects-artifacts.png" },
  modernAi: { pdf: "/certificates/introduction-to-modern-ai.pdf", thumb: "/certificates/introduction-to-modern-ai.png" },
  prompt: { pdf: "/certificates/prompt-engineering-essentials.pdf", thumb: "/certificates/prompt-engineering-essentials.png" },
  python: { pdf: "/certificates/python-essentials-1.pdf", thumb: "/certificates/python-essentials-1.png" },
  future: { pdf: "/certificates/ai-career-readiness.pdf", thumb: "/certificates/ai-career-readiness.png" },
};

const navItems = [
  ["home", "Home"],
  ["about", "About"],
  ["interests", "Interests"],
  ["skills", "Skills"],
  ["contribute", "What I Can Do"],
  ["projects", "Projects"],
  ["journey", "Journey"],
  ["certificates", "Certifications"],
  ["contact", "Contact"],
] as const;

const explorationSections = navItems.map(([id, label]) => ({ id, label }));

const hotspots = [
  {
    id: "wing",
    label: "Wing",
    top: "38%",
    left: "24%",
    detail: "Generates lift and shapes how an aircraft responds to the air around it.",
  },
  {
    id: "fuselage",
    label: "Fuselage",
    top: "49%",
    left: "52%",
    detail: "The main body that carries people, systems, and the structural loads between them.",
  },
  {
    id: "engine",
    label: "Engine",
    top: "63%",
    left: "67%",
    detail: "Produces the thrust needed to move an aircraft through the atmosphere.",
  },
  {
    id: "tail",
    label: "Tail",
    top: "30%",
    left: "77%",
    detail: "Helps keep the aircraft stable and gives the pilot control over its direction.",
  },
];

const interests = [
  { name: "Aerodynamics", code: "A-01", icon: Wind, description: "How air moves around an aircraft and creates lift, drag, and control.", detail: "A useful starting question is how pressure and airflow change when an aircraft’s shape or angle changes." },
  { name: "Aircraft Design", code: "A-02", icon: Plane, description: "Bringing structure, performance, safety, and purpose together in one airframe.", detail: "Design is a set of trade-offs: a good airframe balances mass, strength, stability, efficiency, and mission." },
  { name: "Propulsion", code: "A-03", icon: Rocket, description: "Exploring how engines create thrust and how energy becomes movement.", detail: "Propulsion connects energy to motion by producing a force that overcomes drag and moves the aircraft forward." },
  { name: "Flight Mechanics", code: "A-04", icon: Compass, description: "Understanding how an aircraft moves, turns, climbs, and responds to forces.", detail: "Flight mechanics studies motion and control: what happens when forces and moments are not balanced." },
  { name: "Aerospace Materials", code: "A-05", icon: Atom, description: "Learning why strength, weight, heat, and durability matter in aircraft materials.", detail: "Material choices influence how safely an aircraft carries loads, handles heat, and stays light enough to fly." },
  { name: "Avionics", code: "A-06", icon: Radar, description: "The electronic systems that help an aircraft sense, communicate, and navigate.", detail: "Avionics turn measurements into information that supports navigation, communication, monitoring, and control." },
  { name: "Engineering Systems", code: "A-07", icon: CircuitBoard, description: "Seeing how connected parts work together as one reliable system.", detail: "Systems thinking means tracing how components depend on one another and where a failure could affect the whole." },
];

const skillDetails = {
  programming: "Current practice includes writing small Python programs, learning through iteration, and making logic easier to inspect.",
  technology: "These are working areas of exploration: AI tools, computer vision, web interfaces, version control, and careful documentation.",
  academic: "Research, physics, mathematical reasoning, and technical writing help turn curiosity into questions that can be tested.",
} as const;

const contributions = [
  { title: "Research & Problem Solving", icon: FlaskConical, description: "I can help research topics, organize information, analyze problems, and develop practical solutions for school and technical projects.", learnMore: "Useful for early-stage research, experiment planning, and making a complicated question easier to work through." },
  { title: "Python & Programming", icon: Code2, description: "I can use Python to create small programs, automate simple tasks, process data, and build basic technical projects.", learnMore: "I am continuing to build confidence by turning small ideas into working scripts and exploring how data can be made easier to understand." },
  { title: "AI & Prompt Engineering", icon: BrainCircuit, description: "I can use AI tools and prompt engineering to support research, brainstorming, writing, and productivity while reviewing and verifying the results.", learnMore: "The important part for me is using AI as a thinking partner, not replacing careful reading, judgment, or original work." },
  { title: "Computer Vision & AI Projects", icon: ScanFace, description: "I can build and experiment with Python-based computer vision and AI projects, including automated image-processing and facial recognition systems.", learnMore: "I am exploring how software can interpret visual information through small, student-focused projects and careful testing." },
  { title: "Technical & Academic Work", icon: FileText, description: "I can help create technical documents, presentations, concept papers, research materials, and organized project documentation.", learnMore: "Clear documentation helps a team remember what it tried, what it learned, and what it should test next." },
  { title: "Basic Web Development", icon: Globe2, description: "I can build and customize simple responsive websites using HTML, CSS, and JavaScript.", learnMore: "I enjoy using the web as a place to explain ideas, document projects, and practice designing for real people." },
  { title: "Team Collaboration", icon: Wrench, description: "I can contribute ideas, organize project tasks, communicate technical information, and work with others toward a shared goal.", learnMore: "My current focus is being useful and clear: asking good questions, sharing progress, and keeping work organized." },
];

const facialPipeline = ["IMAGE INPUT", "FACE DETECTION", "IMAGE PROCESSING", "FEATURE COMPARISON", "RECOGNITION RESULT"];
const technologyNotes: Record<string, string> = {
  Python: "Used as the project’s programming language while the system is being developed and documented.",
  "Computer Vision": "The area of study focused on helping software work with visual input such as images or video.",
  "Artificial Intelligence": "The broader field connected to automated recognition and interpretation of information.",
  "Image Processing": "A project area concerned with preparing and working with visual data before a result is produced.",
  Automation: "The project explores how a sequence of steps can produce a recognition result with less manual repetition.",
};

const projects = [
  {
    id: "facial-recognition",
    number: "01",
    type: "PYTHON / COMPUTER VISION / AI",
    title: "Automated Facial Recognition System",
    description: "An automated facial recognition system developed using Python that uses computer vision techniques to detect and recognize faces. The project explores how software can process visual information and automate identity recognition.",
    image: diagramAsset,
    tags: ["Python", "Computer Vision", "Artificial Intelligence", "Image Processing", "Automation"],
    purpose: "To explore how a Python-based system can work with visual input and automate a recognition result as a student technical project.",
    skills: "Python programming, computer vision concepts, problem solving, technical documentation",
    technologies: "Python-based computer vision project",
    howItWorks: ["Captures or receives an image or video input", "Detects faces in the input", "Processes facial features", "Compares a detected face against available reference data", "Produces a recognition result"],
    role: "Developing and documenting the project as a Grade 12 STEM student while learning the underlying programming and AI concepts.",
    status: "Student project / learning in progress",
  },
  {
    id: "portfolio",
    number: "02",
    type: "WEB / DOCUMENTATION",
    title: "Personal Portfolio Website",
    description: "A responsive portfolio website designed to document my projects, skills, interests, and preparation for a future in engineering.",
    image: blueprintAsset,
    tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    purpose: "To create a clear, honest place to share what I am learning and where I am headed.",
    skills: "Content structure, interface design, frontend implementation",
    technologies: "HTML, CSS, JavaScript, React",
    status: "In progress",
  },
];

const journey = [
  { date: "2025–2026", title: "Grade 12 STEM", text: "Building a stronger foundation in mathematics, physics, and science through senior high school.", detail: "Current studies are the launch point for more advanced engineering work later on." },
  { date: "2025–2026", title: "Engineering Research & Python Project Development", text: "Developed research and technical projects while building experience with Python, artificial intelligence, and practical problem-solving.", detail: "The focus is on asking a useful question, documenting the process, and learning from each iteration." },
  { date: "2026", title: "Programming & Technology Learning", text: "Developing skills in Python, web development, Git, and technology-focused problem solving.", detail: "Small scripts and web experiments turn abstract ideas into things that can be inspected and improved." },
  { date: "2026", title: "AI & Prompt Engineering Learning", text: "Learning to use AI tools thoughtfully for research, brainstorming, writing, and productivity.", detail: "Careful review remains part of the process: tools can accelerate exploration, but judgment still matters." },
  { date: "Future", title: "Aeronautical Engineering", text: "The direction I am preparing for: deeper study in aircraft systems, mathematics, physics, and engineering design.", detail: "This is a future study direction, not a completed credential or achievement.", future: true },
];

const certificates = [
  { id: "claude", title: "Claude Projects Artifacts", provider: "FreeAcademy.ai", date: "August 21, 2026", thumb: certificateAssets.claude.thumb, preview: certificateAssets.claude.pdf },
  { id: "modern-ai", title: "Introduction to Modern AI", provider: "DICT-ITU DTC Initiative · Cisco Networking Academy", date: "30 Jul 2025", thumb: certificateAssets.modernAi.thumb, preview: certificateAssets.modernAi.pdf },
  { id: "prompt", title: "Prompt Engineering Essentials", provider: "FreeAcademy.ai", date: "August 21, 2026", thumb: certificateAssets.prompt.thumb, preview: certificateAssets.prompt.pdf },
  { id: "python", title: "Python Essentials 1", provider: "Networking Academy · Cisco Networking Academy", date: "09 Aug 2026", thumb: certificateAssets.python.thumb, preview: certificateAssets.python.pdf },
  { id: "future", title: "AI Career Readiness Training", provider: "Certificate slot reserved", date: "Add certificate image later", thumb: null, preview: null, placeholder: true },
];

const reducedMotionQuery = typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;

function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  const reduced = reducedMotionQuery?.matches ?? false;
  target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState("fuselage");
  const [selectedInterest, setSelectedInterest] = useState(interests[0].name);
  const [expandedContribution, setExpandedContribution] = useState<string | null>(null);
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  const [expandedJourney, setExpandedJourney] = useState<string | null>(null);
  const [expandedProjectSection, setExpandedProjectSection] = useState<string | null>(null);
  const [activeProjectTag, setActiveProjectTag] = useState<string | null>(null);
  const [easterEggUnlocked, setEasterEggUnlocked] = useState(false);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<(typeof certificates)[number] | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [formError, setFormError] = useState("");
  const [formSent, setFormSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewedSections, setViewedSections] = useState<Set<string>>(() => new Set(["home"]));
  const stageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const projectModalTriggerRef = useRef<HTMLElement | null>(null);
  const certificateModalTriggerRef = useRef<HTMLElement | null>(null);
  const projectModalRef = useRef<HTMLDivElement>(null);
  const certificateModalRef = useRef<HTMLDivElement>(null);
  const stageMoveRafRef = useRef<number | null>(null);
  const stageMovePendingRef = useRef<{ x: number; y: number } | null>(null);

  const selectedHotspotData = hotspots.find((hotspot) => hotspot.id === selectedHotspot) ?? hotspots[1];
  const selectedInterestData = interests.find((interest) => interest.name === selectedInterest) ?? interests[0];
  const SelectedInterestIcon = selectedInterestData.icon;
  const explorationComplete = viewedSections.size === explorationSections.length;

  useEffect(() => {
    setExpandedProjectSection(selectedProject?.id === "facial-recognition" ? "overview" : null);
    setActiveProjectTag(null);
  }, [selectedProject]);

  useEffect(() => {
    const sections = explorationSections.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActiveSection(visible.target.id);
          setViewedSections((current) => { const next = new Set(current); next.add(visible.target.id); return next; });
        }
      },
      { rootMargin: "-18% 0px -64% 0px", threshold: [0.1, 0.3, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    const onScroll = () => setShowBackToTop(window.scrollY > 660);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const closeProject = useCallback(() => {
    setSelectedProject(null);
    projectModalTriggerRef.current?.focus?.();
    projectModalTriggerRef.current = null;
  }, []);

  const closeCertificate = useCallback(() => {
    setSelectedCertificate(null);
    certificateModalTriggerRef.current?.focus?.();
    certificateModalTriggerRef.current = null;
  }, []);

  const closeAllModals = useCallback(() => {
    if (selectedProject) { closeProject(); return; }
    if (selectedCertificate) { closeCertificate(); return; }
    if (mobileMenuOpen) { setMobileMenuOpen(false); }
  }, [selectedProject, selectedCertificate, mobileMenuOpen, closeProject, closeCertificate]);

  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        closeAllModals();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeAllModals]);

  useEffect(() => {
    if (!selectedProject && !selectedCertificate) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => {
      const modal = selectedProject ? projectModalRef.current : certificateModalRef.current;
      const focusable = modal?.querySelector<HTMLElement>('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])');
      (focusable ?? modal)?.focus?.();
    }, 20);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.clearTimeout(focusTimer);
    };
  }, [selectedProject, selectedCertificate]);

  const handleStageSecretKey = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setEasterEggUnlocked(true);
    }
  };

  const openProject = useCallback((project: (typeof projects)[number], trigger?: HTMLElement | null) => {
    if (trigger) projectModalTriggerRef.current = trigger;
    setSelectedProject(project);
  }, []);

  const openCertificate = useCallback((certificate: (typeof certificates)[number], trigger?: HTMLElement | null) => {
    if (trigger) certificateModalTriggerRef.current = trigger;
    setSelectedCertificate(certificate);
  }, []);

  const handleStageMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!stageRef.current || reducedMotionQuery?.matches) return;
    const rect = stageRef.current.getBoundingClientRect();
    stageMovePendingRef.current = {
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
    };
    if (stageMoveRafRef.current !== null) return;
    stageMoveRafRef.current = window.requestAnimationFrame(() => {
      const pending = stageMovePendingRef.current;
      if (stageRef.current && pending) {
        stageRef.current.style.setProperty("--stage-x", `${pending.x * 8}px`);
        stageRef.current.style.setProperty("--stage-y", `${pending.y * 8}px`);
      }
      stageMoveRafRef.current = null;
      stageMovePendingRef.current = null;
    });
  };

  const handleStageLeave = () => {
    if (stageMoveRafRef.current !== null) {
      window.cancelAnimationFrame(stageMoveRafRef.current);
      stageMoveRafRef.current = null;
    }
    stageMovePendingRef.current = null;
    stageRef.current?.style.setProperty("--stage-x", "0px");
    stageRef.current?.style.setProperty("--stage-y", "0px");
  };

  useEffect(() => () => {
    if (stageMoveRafRef.current !== null) window.cancelAnimationFrame(stageMoveRafRef.current);
    stageMovePendingRef.current = null;
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onDocClick = (event: globalThis.MouseEvent) => {
      if (!headerRef.current) return;
      if (!headerRef.current.contains(event.target as Node)) setMobileMenuOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [mobileMenuOpen]);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    setFormSent(false);
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setFormError("Please complete your name, email, and message.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New portfolio message from ${formState.name.trim()}`,
          from_name: formState.name.trim(),
          email: formState.email.trim(),
          message: formState.message.trim(),
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success) {
        throw new Error(result?.message || "Web3Forms could not accept the message.");
      }
      setFormSent(true);
      setFormState({ name: "", email: "", message: "" });
    } catch (error) {
      setFormError(error instanceof Error && error.message ? error.message : "We couldn’t send your message right now. Please try again or use the email link.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeInterestIndex = useMemo(() => interests.findIndex((item) => item.name === selectedInterest), [selectedInterest]);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div ref={headerRef} className="header-inner">
          <button className="brand-lockup" type="button" onClick={() => scrollToSection("home")} aria-label="Return to Jude Yap home section">
            <img src={brandMark} alt="" className="brand-mark" />
            <span className="brand-copy"><strong>JDY</strong><span>PORTFOLIO</span></span>
          </button>
          <nav className={`desktop-nav ${mobileMenuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
            {navItems.map(([id, label]) => (
              <button key={id} type="button" className={activeSection === id ? "active" : ""} onClick={() => { scrollToSection(id); setMobileMenuOpen(false); }}>
                <span>{label}</span>
                {activeSection === id && <i aria-hidden="true" />}
              </button>
            ))}
          </nav>
          <div className="exploration-meter" aria-label={`Portfolio Exploration: ${viewedSections.size} of ${explorationSections.length} sections viewed`}>
            <span>PORTFOLIO EXPLORATION</span><strong>{viewedSections.size}/{explorationSections.length}</strong><i><b style={{ width: `${(viewedSections.size / explorationSections.length) * 100}%` }} /></i>
          </div>
          <button className="menu-toggle" type="button" aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen((open) => !open)}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero-section section-anchor">
          <div className="hero-gridline" aria-hidden="true" />
          <div className="hero-inner container">
            <div className="hero-copy">
              <div className="eyebrow reveal-up"><span className="eyebrow-dot" /> JY / AERO · PORTFOLIO 2026</div>
              <p className="hero-kicker reveal-up delay-1">Learning how systems move, respond, and hold together.</p>
              <h1 className="reveal-up delay-1">Future<br /><em>Aeronautical</em><br />Engineer</h1>
              <p className="hero-description reveal-up delay-2">Grade 12 STEM student interested in aeronautical engineering, technology, programming, artificial intelligence, and engineering research.</p>
              <div className="hero-actions reveal-up delay-3">
                <button className="button button-primary" type="button" onClick={() => scrollToSection("projects")}>Explore My Projects <ArrowUpRight size={17} /></button>
                <button className="button button-quiet" type="button" onClick={() => scrollToSection("about")}>About Me <ArrowDownRight size={17} /></button>
              </div>
              <div className="hero-readout reveal-up delay-4" aria-label="Portfolio status">
                <div><span>01</span><small>STEM STUDENT</small></div>
                <div><span>02</span><small>ENGINEERING FOCUS</small></div>
                <div><span>03</span><small>BUILDING IN PUBLIC</small></div>
              </div>
            </div>

            <div className="aircraft-stage-wrap reveal-fade delay-2">
              <div className="stage-caption"><span>FIG. 01</span><span>INTERACTIVE AIRCRAFT STUDY</span><span className="stage-live"><i /> LIVE READOUT</span></div>
              <div ref={stageRef} className="aircraft-stage" onMouseMove={handleStageMove} onMouseLeave={handleStageLeave}>
                <img src={blueprintAsset} alt="Abstract aerospace blueprint with an aircraft outline" className="stage-image" />
                <div className="stage-wash" aria-hidden="true" />
                <div className="stage-coordinate coordinate-a" aria-hidden="true">X 04° 31′ 09″</div>
                <div className="stage-coordinate coordinate-b" aria-hidden="true">ALT / 12.8</div>
                <div className="aircraft-plane" aria-hidden="true">
                  <svg viewBox="0 0 620 350" role="presentation">
                    <path className="plane-line plane-main" d="M56 179 C118 174 174 171 239 169 L324 78 L353 73 L334 164 L427 160 L520 96 L546 102 L478 169 L561 181 L544 190 L472 194 L544 263 L518 267 L427 201 L334 198 L353 289 L324 282 L239 195 C172 193 112 189 56 185 Z" />
                    <path className="plane-line plane-detail" d="M112 181 L319 181 M341 163 L341 200 M424 160 L424 200 M470 169 L470 193 M258 170 L274 181 L258 193" />
                    <path className="plane-line plane-ghost" d="M40 181 H584 M337 51 V310" />
                  </svg>
                </div>
                {hotspots.map((hotspot) => (
                  <button key={hotspot.id} type="button" className={`hotspot hotspot-${hotspot.id} ${selectedHotspot === hotspot.id ? "selected" : ""}`} style={{ top: hotspot.top, left: hotspot.left }} onMouseEnter={() => setSelectedHotspot(hotspot.id)} onFocus={() => setSelectedHotspot(hotspot.id)} onClick={() => setSelectedHotspot(hotspot.id)} aria-pressed={selectedHotspot === hotspot.id} aria-label={`Inspect ${hotspot.label}`}>
                    <span className="hotspot-pulse" /><span className="hotspot-label">{hotspot.label}</span>
                  </button>
                ))}
                <div className="stage-readout" role="status" aria-live="polite">
                  <div className="readout-title"><span className="readout-index">/ 0{hotspots.findIndex((item) => item.id === selectedHotspot) + 1}</span><strong>{selectedHotspotData.label}</strong></div>
                  <p>{selectedHotspotData.detail}</p>
                  <div className="readout-rule"><span /><small>SELECT COMPONENT</small></div>
                </div>
                <div className="stage-axis" aria-hidden="true"><span>Y</span><i /><span>X</span></div>
                <button type="button" className={`stage-secret-marker ${easterEggUnlocked ? "unlocked" : ""}`} onClick={() => setEasterEggUnlocked(true)} onKeyDown={handleStageSecretKey} aria-label="Inspect technical marker"><span>⊙</span></button>
                {easterEggUnlocked && <div className="unlock-note" role="status"><Sparkles size={14} /><span><strong>System Detail Unlocked</strong><small>Lift acts perpendicular to the relative airflow.</small></span></div>}
              </div>
              <div className="stage-footer"><span>Hover or select a component to inspect the system.</span><span>DRAG / READ / LEARN</span></div>
            </div>
          </div>
          <div className="hero-foot container"><span>SCROLL TO TRACE THE WORK</span><div className="scroll-line"><i /></div><span>01 / 09</span></div>
        </section>

        <section id="about" className="content-section about-section section-anchor">
          <div className="container">
            <div className="section-heading split-heading"><div><span className="section-index">01 / ABOUT</span><h2>A foundation<br /><em>under construction.</em></h2></div><div className="heading-note">A student profile /<br />not a finished product.</div></div>
            <div className="about-layout">
              <div className="about-lead"><p className="lead-paragraph">I’m a Grade 12 STEM student preparing for a future in <strong>aeronautical engineering</strong>. Right now, I’m building the habits that come before university: asking better questions, learning the physics behind systems, and documenting what I understand.</p><p>I’m drawn to aircraft and aviation technology, but my curiosity also reaches into programming, artificial intelligence, research, and technical problem-solving. This portfolio is a record of that direction—what I’m studying, what I’m trying, and what I want to explore next.</p><button type="button" className="text-link" onClick={() => scrollToSection("journey")}>Trace the journey <ArrowUpRight size={15} /></button></div>
              <div className="about-note"><img src={brandMark} alt="" className="note-brand-mark" /><div className="note-top"><span>FIELD NOTE / 001</span><TimerReset size={17} /></div><div className="note-mark">“</div><p>The goal is not to already know everything. It is to stay curious enough to keep learning how things work.</p><div className="note-sign">— Jude Dominic Yap</div></div>
            </div>
            <div className="about-stats"><div><span>01</span><strong>STEM</strong><small>Current academic path</small></div><div><span>02</span><strong>RESEARCH</strong><small>Learning through projects</small></div><div><span>03</span><strong>FLIGHT</strong><small>Future direction</small></div></div>
          </div>
        </section>

        <section id="interests" className="content-section interests-section section-anchor">
          <div className="container">
            <div className="section-heading"><span className="section-index">02 / INTERESTS</span><h2>What keeps<br /><em>my attention.</em></h2><p className="section-intro">The fields I keep returning to as I prepare for deeper study.</p></div>
            <div className="interests-layout">
              <div className="interest-list" role="tablist" aria-label="Engineering interests">
                {interests.map((interest, index) => { const Icon = interest.icon; return <button key={interest.name} type="button" role="tab" aria-selected={selectedInterest === interest.name} className={`interest-row ${selectedInterest === interest.name ? "selected" : ""}`} onClick={() => setSelectedInterest(interest.name)}><span className="interest-number">0{index + 1}</span><Icon size={18} strokeWidth={1.6} /><strong>{interest.name}</strong><ArrowUpRight size={15} className="interest-arrow" /></button>; })}
              </div>
              <div className="interest-detail" role="tabpanel">
                <div className="detail-top"><span>ACTIVE AREA / {String(activeInterestIndex + 1).padStart(2, "0")}</span><SelectedInterestIcon size={22} /></div><div className="detail-graphic"><div className="detail-orbit orbit-1" /><div className="detail-orbit orbit-2" /><div className="detail-node"><SelectedInterestIcon size={38} strokeWidth={1.2} /></div><span className="detail-cross cross-a">+</span><span className="detail-cross cross-b">+</span></div><h3>{selectedInterestData.name}</h3><p>{selectedInterestData.description}</p><p className="interest-detail-note">{selectedInterestData.detail}</p><div className="detail-footer"><span>STUDENT EXPLORATION</span><span><i /> FOCUS AREA</span></div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="content-section skills-section section-anchor">
          <div className="container">
            <div className="section-heading split-heading"><div><span className="section-index">03 / SKILLS</span><h2>Tools I’m<br /><em>developing.</em></h2></div><p className="heading-note">No inflated ratings.<br />Just an honest map of<br />what I’m learning.</p></div>
            <div className="module-rail skill-rail"><span>CAPABILITY REGISTER</span><i /><span>NO PROFICIENCY CLAIMS</span></div><div className="skill-board">
              <article className={`skill-category ${expandedSkill === "programming" ? "expanded" : ""}`}><button type="button" className="skill-category-toggle" aria-expanded={expandedSkill === "programming"} onClick={() => setExpandedSkill(expandedSkill === "programming" ? null : "programming")}><span className="category-icon"><Terminal size={17} /></span><span><small>01 / PROGRAMMING</small><h3>Making ideas executable.</h3></span><ChevronDown size={15} /></button><div className="skill-chips"><span>Python</span></div>{expandedSkill === "programming" && <p className="skill-expanded-note">{skillDetails.programming}</p>}</article>
              <article className={`skill-category ${expandedSkill === "technology" ? "expanded" : ""}`}><button type="button" className="skill-category-toggle" aria-expanded={expandedSkill === "technology"} onClick={() => setExpandedSkill(expandedSkill === "technology" ? null : "technology")}><span className="category-icon"><Cpu size={17} /></span><span><small>02 / AI &amp; TECHNOLOGY</small><h3>Learning useful systems.</h3></span><ChevronDown size={15} /></button><div className="skill-chips"><span>Artificial Intelligence</span><span>Computer Vision</span><span>Prompt Engineering</span><span>Web Development</span><span>Git &amp; GitHub</span></div>{expandedSkill === "technology" && <p className="skill-expanded-note">{skillDetails.technology}</p>}</article>
              <article className={`skill-category ${expandedSkill === "academic" ? "expanded" : ""}`}><button type="button" className="skill-category-toggle" aria-expanded={expandedSkill === "academic"} onClick={() => setExpandedSkill(expandedSkill === "academic" ? null : "academic")}><span className="category-icon"><GraduationCap size={17} /></span><span><small>03 / ACADEMIC</small><h3>Thinking clearly and documenting it.</h3></span><ChevronDown size={15} /></button><div className="skill-chips"><span>Research</span><span>Problem Solving</span><span>Technical Writing</span><span>Physics</span><span>Mathematical Reasoning</span></div>{expandedSkill === "academic" && <p className="skill-expanded-note">{skillDetails.academic}</p>}</article>
            </div>
            <div className="skill-footnote"><Sparkles size={16} /><span>These are current working skills, not professional credentials. The point is to keep building them through real practice.</span></div>
          </div>
        </section>

        <section id="contribute" className="content-section contribute-section section-anchor">
          <div className="container">
            <div className="section-heading"><span className="section-index">04 / CONTRIBUTION</span><h2>What I Can<br /><em>Do for You</em></h2><p className="section-intro">Here are some ways I can contribute using the skills I’m currently developing.</p></div>
            <div className="module-rail"><span>CAPABILITY REGISTER / 06 MODULES</span><i /><span>OPEN TO LEARNING</span></div><div className="contribution-grid">{contributions.map((item, index) => { const Icon = item.icon; const open = expandedContribution === item.title; return <article className={`contribution-card ${open ? "expanded" : ""}`} key={item.title}><div className="card-number">0{index + 1}</div><div className="contribution-icon"><Icon size={21} /></div><h3>{item.title}</h3><p>{item.description}</p><button type="button" className="learn-more" aria-expanded={open} onClick={() => setExpandedContribution(open ? null : item.title)}><span>{open ? "Show Less" : "Learn More"}</span>{open ? <ChevronDown size={15} /> : <Plus size={15} />}</button>{open && <div className="contribution-more">{item.learnMore}</div>}</article>; })}</div>
          </div>
        </section>

        <section id="projects" className="content-section projects-section section-anchor">
          <div className="container">
            <div className="section-heading split-heading"><div><span className="section-index">05 / PROJECTS</span><h2>Proof of<br /><em>practice.</em></h2></div><p className="heading-note">Small projects are where<br />questions become<br />something you can inspect.</p></div>
            <div className="module-rail"><span>PROJECT LOG / CURRENT WORK</span><i /><span>SELECT A FILE TO INSPECT</span></div><div className="project-grid">{projects.map((project) => <article className={`project-card project-${project.id}`} key={project.id} onClick={(event) => openProject(project, event.currentTarget)} role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openProject(project, event.currentTarget as HTMLElement); } }}><div className="project-image-wrap">{project.id === "facial-recognition" ? <div className="vision-visual" aria-label="Visual representation of the facial-recognition project"><img src={project.image} alt="" className="project-image" /><div className="vision-grid" /><div className="vision-frame"><span className="vision-corner corner-tl" /><span className="vision-corner corner-tr" /><span className="vision-corner corner-bl" /><span className="vision-corner corner-br" /><ScanFace size={40} strokeWidth={1.1} /><small>VISUAL REPRESENTATION / NOT LIVE RECOGNITION</small></div><span className="vision-status"><i /> SCAN CONCEPT</span></div> : <img src={project.image} alt="" className="project-image" />}<div className="project-image-overlay" /><span className="project-open"><ArrowUpRight size={18} /></span><span className="project-number">{project.number}</span></div><div className="project-content"><div className="project-meta"><span>{project.type}</span><span>{project.status}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><button type="button" className="text-link" onClick={(event) => { event.stopPropagation(); openProject(project, event.currentTarget); }}>View project details <ArrowUpRight size={15} /></button></div></article>)}</div>
            <div className="project-note"><BarChart3 size={18} /><span>Project descriptions are intentionally specific about what has been done and careful not to invent results or technical specifications.</span></div>
          </div>
        </section>

        <section id="journey" className="content-section journey-section section-anchor">
          <div className="container">
            <div className="journey-intro"><div><span className="section-index">06 / JOURNEY</span><h2>Trace the work<br /><em>behind the direction.</em></h2></div><div className="journey-aside"><span>POSITION / 05.14° N</span><span>VECTOR / FORWARD</span><span>STATUS / LEARNING</span></div></div>
            <div className="timeline"><div className="journey-trajectory" aria-hidden="true"><i /></div>{journey.map((item, index) => { const journeyKey = `${item.date}-${item.title}`; const open = expandedJourney === journeyKey; return <article className={`timeline-item ${item.future ? "future" : ""} ${open ? "expanded" : ""}`} key={journeyKey}><div className="timeline-marker"><span>{String(index + 1).padStart(2, "0")}</span><i /></div><div className="timeline-copy"><span className="timeline-date">{item.date}</span><h3>{item.title}</h3><p>{item.text}</p><button type="button" className="timeline-toggle" aria-expanded={open} onClick={() => setExpandedJourney(open ? null : journeyKey)}>{open ? "Close field note" : "Open field note"} <ChevronDown size={14} /></button>{open && <p className="timeline-detail">{item.detail}</p>}</div>{item.future && <span className="timeline-tag">TARGET VECTOR</span>}</article>; })}</div>
          </div>
        </section>

        <section className="future-section section-anchor" aria-labelledby="future-title">
          <img src={flightPathAsset} alt="Abstract cobalt flight path on a dark coordinate plane" className="future-image" /><div className="future-overlay" /><img src={brandMark} alt="" className="future-brand-mark" /><div className="container future-inner"><div className="future-top"><span className="section-index">07 / FUTURE GOAL</span><span>WHERE I’M HEADED</span></div><div className="future-copy"><span className="future-mark"><Plane size={24} /></span><h2 id="future-title">Aeronautical<br /><em>Engineering</em></h2><p>I plan to pursue Aeronautical Engineering and develop a stronger foundation in mathematics, physics, aircraft systems, and engineering design.</p><button type="button" className="button button-primary" onClick={() => scrollToSection("contact")}>Keep in touch <ArrowUpRight size={17} /></button></div><div className="future-coordinates"><span>VECTOR / 01.00</span><span>FLIGHT PATH / OPEN</span><span>DESTINATION / UNIVERSITY</span></div></div>
        </section>

        <section className="content-section learning-section section-anchor" id="certificates">
          <div className="container">
            <div className="section-heading split-heading"><div><span className="section-index">08 / CERTIFICATES</span><h2>Learning,<br /><em>documented.</em></h2></div><p className="heading-note">Verified learning records<br />from the current study path.</p></div>
            <div className="module-rail"><span>CREDENTIAL REGISTER / 04 VERIFIED</span><i /><span>01 OPEN SLOT</span></div>
            <div className="certificate-grid">{certificates.map((certificate, index) => <article className={`certificate-card ${certificate.placeholder ? "certificate-placeholder" : ""}`} key={certificate.id} onClick={(event) => !certificate.placeholder && openCertificate(certificate, event.currentTarget)} role={!certificate.placeholder ? "button" : undefined} tabIndex={!certificate.placeholder ? 0 : undefined} onKeyDown={(event) => { if (!certificate.placeholder && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); openCertificate(certificate, event.currentTarget as HTMLElement); } }}><div className="certificate-thumb">{certificate.thumb ? <img src={certificate.thumb} alt={`${certificate.title} certificate thumbnail`} /> : <div className="certificate-empty"><Plus size={25} /><span>UPLOAD<br />CERTIFICATE</span></div>}<span className="certificate-index">0{index + 1}</span>{!certificate.placeholder && <span className="certificate-view"><ArrowUpRight size={17} /></span>}</div><div className="certificate-body"><div className="certificate-status">{certificate.placeholder ? "OPEN SLOT" : "VERIFIED RECORD"}</div><h3>{certificate.title}</h3><p>{certificate.provider}</p><small>{certificate.date}</small>{!certificate.placeholder && <button type="button" className="text-link" onClick={(event) => { event.stopPropagation(); openCertificate(certificate, event.currentTarget); }}>View Certificate <ArrowUpRight size={15} /></button>}</div></article>)}</div>
            <div className="project-note"><BadgeCheck size={18} /><span>Certificate details are transcribed from the uploaded files. The fifth card is reserved for the AI Career Readiness Training image.</span></div>
          </div>
        </section>

        <section id="contact" className="content-section contact-section section-anchor">
          <div className="container">
            <div className="contact-layout"><div className="contact-copy"><span className="section-index">09 / CONTACT</span><h2>Let’s<br /><em>Connect</em></h2><p>I’m always interested in learning, building, and exploring new ideas in engineering and technology.</p><div className="contact-links"><a href="mailto:judedominicyap@gmail.com"><Mail size={17} /><span><small>EMAIL</small>judedominicyap@gmail.com</span><ArrowUpRight size={15} /></a><a href="https://github.com/JudeDominicYap" target="_blank" rel="noopener noreferrer"><Github size={17} /><span><small>GITHUB</small>github.com/JudeDominicYap</span><ArrowUpRight size={15} /></a><a href="https://linkedin.com/in/judedominicyap" target="_blank" rel="noopener noreferrer"><Linkedin size={17} /><span><small>LINKEDIN</small>linkedin.com/in/judedominicyap</span><ArrowUpRight size={15} /></a></div><p className="placeholder-note"><i /> Contact details</p></div>
              <form id="contact-form" className="contact-form" onSubmit={handleFormSubmit} noValidate><div className="form-top"><span>MESSAGE / 001</span><Send size={18} /></div><label htmlFor="name">Name<input id="name" name="name" type="text" autoComplete="name" placeholder="Your name" value={formState.name} onChange={(event) => setFormState((state) => ({ ...state, name: event.target.value }))} disabled={isSubmitting} /></label><label htmlFor="email">Email<input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={formState.email} onChange={(event) => setFormState((state) => ({ ...state, email: event.target.value }))} disabled={isSubmitting} /></label><label htmlFor="message">Message<textarea id="message" name="message" rows={5} placeholder="What are you curious about?" value={formState.message} onChange={(event) => setFormState((state) => ({ ...state, message: event.target.value }))} disabled={isSubmitting} /></label>{formError && <p className="form-message form-error" role="alert">{formError}</p>}{formSent && <p className="form-message form-success" role="status"><Check size={15} /> Message sent successfully. Thank you — I’ll get back to you soon.</p>}<button type="submit" className="button button-primary button-submit" disabled={isSubmitting}>{isSubmitting ? "Sending…" : "Send Message"} <ArrowUpRight size={17} /></button></form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="container footer-inner"><div className="footer-brand"><img src={brandMark} alt="" className="brand-mark" /><span><strong>JUDE DOMINIC YAP</strong><small>FUTURE AERONAUTICAL ENGINEER</small></span></div><span className="footer-line">Built with curiosity / documented with care</span><span className="footer-year">© 2026</span></div></footer>
      {showBackToTop && <button type="button" className="back-to-top" onClick={() => scrollToSection("home")} aria-label="Back to top"><ArrowUpRight size={18} /></button>}

      {selectedProject && <div className="modal-backdrop" role="presentation" onClick={closeProject}><div ref={projectModalRef} className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" tabIndex={-1} onClick={(event) => event.stopPropagation()}><button type="button" className="modal-close" aria-label="Close project details" onClick={closeProject}><X size={19} /></button><div className="modal-eyebrow">PROJECT / {selectedProject.number} · {selectedProject.type}</div><h2 id="project-modal-title">{selectedProject.title}</h2><p className="modal-description">{selectedProject.description}</p><p className="modal-disclaimer"><i /> VISUAL CASE STUDY / THIS PORTFOLIO DOES NOT PERFORM FACIAL RECOGNITION</p>{selectedProject.id === "facial-recognition" && <div className="case-study-switcher" role="tablist" aria-label="Project case study views"><button type="button" role="tab" aria-selected={expandedProjectSection === "overview"} className={expandedProjectSection === "overview" ? "active" : ""} onClick={() => setExpandedProjectSection("overview")}>Technical detail</button><button type="button" role="tab" aria-selected={expandedProjectSection === "pipeline"} className={expandedProjectSection === "pipeline" ? "active" : ""} onClick={() => setExpandedProjectSection("pipeline")}>System pipeline</button></div>}{selectedProject.id === "facial-recognition" && expandedProjectSection === "pipeline" ? <div className="pipeline-panel"><div className="pipeline-heading"><span>VISUAL REPRESENTATION / 001</span><small>PROCESS FLOW</small></div><div className="pipeline-list">{facialPipeline.map((step, index) => <div className="pipeline-step" key={step}><span className="pipeline-index">0{index + 1}</span><div><strong>{step}</strong><small>{index === 0 ? "Receives an image or video input." : index === 1 ? "Locates faces within the input." : index === 2 ? "Works with visual information." : index === 3 ? "Compares available reference features." : "Produces a recognition result for the project to inspect."}</small></div>{index < facialPipeline.length - 1 && <ChevronDown size={15} className="pipeline-arrow" />}</div>)}</div><p className="pipeline-note"><ScanFace size={15} /> Conceptual flow only. No live camera, recognition model, dataset, accuracy figure, or performance result is connected to this portfolio.</p></div> : <div className={`modal-detail-grid ${selectedProject.id === "facial-recognition" ? "facial-modal-grid" : ""}`}><div><small>{selectedProject.id === "facial-recognition" ? "PROJECT OVERVIEW" : "PURPOSE"}</small><p>{selectedProject.purpose}</p></div><div><small>{selectedProject.id === "facial-recognition" ? "TECHNOLOGIES USED" : "SKILLS USED"}</small><p>{selectedProject.id === "facial-recognition" ? selectedProject.technologies : selectedProject.skills}</p></div>{selectedProject.id === "facial-recognition" && <div className="modal-process"><small>HOW IT WORKS</small><ol>{selectedProject.howItWorks?.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}</ol></div>}<div><small>{selectedProject.id === "facial-recognition" ? "MY ROLE" : "TECHNOLOGIES"}</small><p>{selectedProject.id === "facial-recognition" ? selectedProject.role : selectedProject.technologies}</p></div><div><small>PROJECT STATUS</small><p>{selectedProject.status}</p></div><div className="modal-tech-block"><small>SELECT TECHNICAL TAG</small><div className="modal-tag-row">{selectedProject.tags.map((tag) => <button type="button" key={tag} className={activeProjectTag === tag ? "active" : ""} aria-pressed={activeProjectTag === tag} onClick={() => setActiveProjectTag(activeProjectTag === tag ? null : tag)}>{tag}</button>)}</div>{activeProjectTag && <p className="modal-tag-note">{technologyNotes[activeProjectTag] ?? `This project is tagged with ${activeProjectTag} as part of its documentation.`}</p>}</div></div>}<div className="modal-footer"><span>HONEST PROGRESS / NO INVENTED RESULTS</span><button type="button" className="text-link" onClick={closeProject}>Close details <X size={15} /></button></div></div></div>}
      {explorationComplete && <aside className="completion-panel" aria-live="polite"><div className="completion-mark"><Check size={16} /></div><div><span>EXPLORATION COMPLETE</span><strong>Thanks for exploring my portfolio.</strong></div><button type="button" className="text-link" onClick={() => scrollToSection("contact")}>Let’s Connect <ArrowUpRight size={15} /></button></aside>}
      {selectedCertificate && <div className="modal-backdrop" role="presentation" onClick={closeCertificate}><div ref={certificateModalRef} className="project-modal certificate-modal" role="dialog" aria-modal="true" aria-labelledby="certificate-modal-title" tabIndex={-1} onClick={(event) => event.stopPropagation()}><button type="button" className="modal-close" aria-label="Close certificate preview" onClick={closeCertificate}><X size={19} /></button><div className="modal-eyebrow">CERTIFICATE / VERIFIED RECORD</div><h2 id="certificate-modal-title">{selectedCertificate.title}</h2><p className="modal-description">{selectedCertificate.provider} · {selectedCertificate.date}</p><div className="certificate-preview">{selectedCertificate.preview ? <iframe title={`${selectedCertificate.title} certificate preview`} src={selectedCertificate.preview} /> : <div className="certificate-preview-empty"><FileText size={36} /><p>Certificate PDF preview not uploaded yet.</p><small>Drop the file into <code>client/public/certificates/</code> — see the README there for the exact filename to use.</small></div>}</div><div className="modal-footer"><span>VIEWING UPLOADED CERTIFICATE</span><button type="button" className="text-link" onClick={closeCertificate}>Back to certificate list <ArrowDownRight size={15} /></button></div></div></div>}
    </div>
  );
}
