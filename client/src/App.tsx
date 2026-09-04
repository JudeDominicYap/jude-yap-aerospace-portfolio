/*
 * Midnight Flight Deck — application shell.
 *
 * IMPORTANT (GitHub Pages deployment):
 * This is a single-page portfolio. We deliberately do NOT use `wouter` history
 * routing here because GitHub Pages serves a 404 when a non-root path is
 * refreshed or deep-linked. The entire portfolio lives under `/` and all
 * navigation uses in-page section anchors (`#home`, `#about`, etc.) with
 * `scrollIntoView`. Result: the site works perfectly whether someone visits
 * via the root URL or refreshes the page.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Home />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
