import { Home, AlertTriangle } from "lucide-react";

/*
 * This page is intentionally NOT wired into the app.
 *
 * The portfolio is a single-page application with no client-side routing
 * (see App.tsx) so navigation URLs stay at `/` and deep links simply use
 * section anchors. GitHub Pages still serves a 404.html on any missed URL
 * path, so the deploy workflow copies index.html to 404.html at build time,
 * which recovers navigation to the portfolio even on a bad URL.
 *
 * This component is kept as an easy-to-drop-in fallback in the rare case
 * someone explicitly renders it.
 */
export default function NotFound() {
  const handleGoHome = () => {
    window.location.assign("./");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ background: "linear-gradient(180deg,#060911,#0b1320)", color: "#e6edf7" }}>
      <div style={{
        maxWidth: 520, padding: "48px 32px", textAlign: "center",
        border: "1px solid rgba(79,141,255,0.18)", borderRadius: 14,
        background: "rgba(255,255,255,0.03)",
      }}>
        <AlertTriangle size={40} style={{ color: "#e5b66c", marginBottom: 18, opacity: .9 }} />
        <h1 style={{ font: "700 40px/1.1 'Space Grotesk',sans-serif", margin: "0 0 8px" }}>404</h1>
        <h2 style={{ font: "600 18px/1.4 'DM Sans',sans-serif", margin: "0 0 16px", color: "#c8d4e6" }}>Navigation offset</h2>
        <p style={{ font: "500 15px/1.7 'DM Sans',sans-serif", color: "#a7b3c6", margin: "0 0 28px" }}>
          That page is not on our flight plan. Return to the main portfolio.
        </p>
        <button
          type="button"
          onClick={handleGoHome}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "10px 18px", borderRadius: 8,
            background: "#4f8dff", color: "#fff", border: "none",
            font: "600 14px/1 'Space Grotesk',sans-serif", cursor: "pointer",
          }}
        >
          <Home size={16} /> Back to portfolio
        </button>
      </div>
    </div>
  );
}
