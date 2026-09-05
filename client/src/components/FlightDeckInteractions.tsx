import { useEffect, useState } from "react";

type PanelKey = "altitude" | "coordinates" | "status";
type Position = { x: number; y: number };
const INITIAL: Record<PanelKey, Position> = { altitude: { x: 28, y: 118 }, coordinates: { x: 28, y: 224 }, status: { x: 28, y: 330 } };
function clamp(value: number, min: number, max: number) { return Math.min(Math.max(value, min), max); }

export default function FlightDeckInteractions() {
  const [panels, setPanels] = useState(INITIAL);
  const [dragging, setDragging] = useState<PanelKey | null>(null);
  const [cursor, setCursor] = useState({ x: -100, y: -100, vx: 0, vy: 0, interactive: false });
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let frame = 0;
    let previous = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const move = (event: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const vx = event.clientX - previous.x;
        const vy = event.clientY - previous.y;
        previous = { x: event.clientX, y: event.clientY };
        const velocity = Math.min(2, Math.hypot(vx, vy) / 18);
        setCursor({ x: event.clientX, y: event.clientY, vx, vy, interactive: Boolean((event.target as HTMLElement | null)?.closest("a,button")) });
        setPointer({ x: event.clientX, y: event.clientY });
        document.documentElement.style.setProperty("--radar-velocity", velocity.toFixed(2));
        document.documentElement.style.setProperty("--particle-x", `${(event.clientX / window.innerWidth - 0.5) * 26}px`);
        document.documentElement.style.setProperty("--particle-y", `${(event.clientY / window.innerHeight - 0.5) * 26}px`);
      });
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("mousemove", move); };
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const move = (event: PointerEvent) => {
      const element = document.querySelector<HTMLElement>(`[data-telemetry="${dragging}"]`);
      const width = element?.offsetWidth ?? 180;
      const height = element?.offsetHeight ?? 90;
      setPanels((current) => ({ ...current, [dragging]: {
        x: clamp(event.clientX - width / 2, 8, Math.max(8, window.innerWidth - width - 8)),
        y: clamp(event.clientY - height / 2, 72, Math.max(72, window.innerHeight - height - 8)),
      }}));
    };
    const end = () => setDragging(null);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", end); window.removeEventListener("pointercancel", end); };
  }, [dragging]);

  useEffect(() => {
    const magnetic = Array.from(document.querySelectorAll<HTMLElement>(".magnetic"));
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".skill-pod"));
    const onMove = (event: MouseEvent) => magnetic.forEach((element) => {
      if (element.closest(".telemetry-layer")) return;
      const rect = element.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const distance = Math.hypot(dx, dy);
      const strength = distance < 120 ? 1 - distance / 120 : 0;
      element.style.setProperty("--mag-x", `${dx * 0.11 * strength}px`);
      element.style.setProperty("--mag-y", `${dy * 0.11 * strength}px`);
    });
    const onCardMove = (event: MouseEvent) => {
      const card = event.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--tilt-x", `${(((event.clientY - rect.top) / rect.height) - 0.5) * -10}deg`);
      card.style.setProperty("--tilt-y", `${(((event.clientX - rect.left) / rect.width) - 0.5) * 12}deg`);
    };
    const resetCard = (event: MouseEvent) => {
      const card = event.currentTarget as HTMLElement;
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    cards.forEach((card) => { card.addEventListener("mousemove", onCardMove); card.addEventListener("mouseleave", resetCard); });
    return () => { window.removeEventListener("mousemove", onMove); cards.forEach((card) => { card.removeEventListener("mousemove", onCardMove); card.removeEventListener("mouseleave", resetCard); }); };
  }, []);

  const relativeAltitude = Math.round((1 - pointer.y / Math.max(window.innerHeight, 1)) * 100);
  const xPercent = Math.round((pointer.x / Math.max(window.innerWidth, 1)) * 100);
  const yPercent = Math.round((pointer.y / Math.max(window.innerHeight, 1)) * 100);
  const panelStyle = (key: PanelKey) => ({ left: panels[key].x, top: panels[key].y });

  return <>
    <div className="telemetry-layer" aria-label="Interactive telemetry panels">
      <div className={`telemetry-widget telemetry-draggable ${dragging === "altitude" ? "dragging" : ""}`} data-telemetry="altitude" style={panelStyle("altitude")} onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); setDragging("altitude"); }} role="group" aria-label="Draggable relative altitude panel"><span className="drag-handle">DRAG</span><small>RELATIVE ALTITUDE</small><strong>{relativeAltitude.toString().padStart(3, "0")} <i>UI</i></strong><em>POINTER Y / LIVE</em></div>
      <div className={`telemetry-widget telemetry-draggable ${dragging === "coordinates" ? "dragging" : ""}`} data-telemetry="coordinates" style={panelStyle("coordinates")} onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); setDragging("coordinates"); }} role="group" aria-label="Draggable pointer coordinates panel"><span className="drag-handle">DRAG</span><small>SCREEN COORDINATES</small><strong>{xPercent.toString().padStart(3, "0")} : {yPercent.toString().padStart(3, "0")}</strong><em>LIVE POINTER POSITION</em></div>
      <div className={`telemetry-widget telemetry-draggable ${dragging === "status" ? "dragging" : ""}`} data-telemetry="status" style={panelStyle("status")} onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); setDragging("status"); }} role="group" aria-label="Draggable interface status panel"><span className="drag-handle">DRAG</span><small>INTERFACE STATUS</small><strong><i /> ONLINE</strong><em>{dragging ? "PANEL MOVING" : "REACT INTERACTION READY"}</em></div>
    </div>
    <div className={`cursor-reticle-live ${cursor.interactive ? "is-interactive" : ""}`} style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)`, ["--cursor-vx" as string]: `${cursor.vx}px`, ["--cursor-vy" as string]: `${cursor.vy}px` }} aria-hidden="true"><span /><i /></div>
  </>;
}
