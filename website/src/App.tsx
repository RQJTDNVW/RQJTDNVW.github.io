import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ProfilePage } from "./pages/ProfilePage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ConnectPage } from "./pages/ConnectPage";
import { Atmosphere } from "./components/atmosphere/Atmosphere";
import { NeuralField } from "./components/atmosphere/NeuralField";

// Scroll to top upon navigating to a new route
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

/**
 * Keying on the pathname gives every navigation a short cross-fade, which makes
 * the three pages feel like panes of one environment rather than separate
 * documents. The atmosphere layers live outside this, so they stay continuous
 * across navigation.
 */
const RouteScenes: React.FC = () => {
  const location = useLocation();

  return (
    <div key={location.pathname} className="animate-fade-in">
      <Routes location={location}>
        <Route path="/" element={<ProfilePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/connect" element={<ConnectPage />} />
        <Route path="*" element={<ProfilePage />} />
      </Routes>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />

      {/* Fixed atmosphere stack. Sits behind everything and never intercepts
          pointer events. */}
      <Atmosphere />
      <NeuralField />

      <div className="relative flex min-h-screen flex-col justify-between font-sans text-[#F1F5F9] selection:bg-[#6CE7F2]/20 selection:text-[#6CE7F2]">
        <Navbar />
        <main className="flex-grow">
          <RouteScenes />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
