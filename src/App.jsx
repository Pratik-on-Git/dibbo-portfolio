import { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ReactLenis, useLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";
import Menu from "./components/Menu/Menu";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Updates from "./pages/updates/Updates";
import Solutions from "./pages/solutions/Solutions";
import Contact from "./pages/contact/Contact";
import FirstLoadExperience from "./components/FirstLoadExperience/FirstLoadExperience";

import { AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

function AppContent() {
  const location = useLocation();
  const isInitialRender = useRef(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDarkMenu = location.pathname === "/updates";

  const pageTitles = {
    "/": "Dibbo | Portfolio",
    "/home": "Dibbo | Portfolio",
    "/about": "About Us | Balanced Pitch | CG MWT NOV 2024",
    "/solutions": "Solutions | Balanced Pitch | CG MWT NOV 2024",
    "/updates": "Updates | Balanced Pitch | CG MWT NOV 2024",
    "/contact": "Contact | Balanced Pitch | CG MWT NOV 2024",
  };

  const lenis = useLenis(() => ScrollTrigger.update());

  useEffect(() => {
    const currentTitle = pageTitles[location.pathname] || "Aiden Brooks";
    document.title = currentTitle;

    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    lenis?.scrollTo(0, { immediate: true });
  }, [location.pathname]);

  return (
    <div className="app">
      <FirstLoadExperience />
      <Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} isDark={isDarkMenu} />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route index element={<About />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/updates" element={<Updates />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <ReactLenis root>
      <AppContent />
    </ReactLenis>
  );
}

export default App;
