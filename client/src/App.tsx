import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import AerospacePortfolio from "./pages/AerospacePortfolio";

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <AerospacePortfolio />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
