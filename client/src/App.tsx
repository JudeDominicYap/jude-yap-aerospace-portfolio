import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import FlightDeckInteractions from "./components/FlightDeckInteractions";
import { ThemeProvider } from "./contexts/ThemeContext";
import AerospacePortfolio from "./pages/AerospacePortfolio";
import "./aerospace-enhancements.css";

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <AerospacePortfolio />
          <FlightDeckInteractions />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
