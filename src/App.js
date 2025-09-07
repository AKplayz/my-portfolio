// client/src/App.js
import { useState, useEffect } from "react";
import AboutSection from "./components/AboutSection";
import ProjectSection from "./components/ProjectSection";
import SkillsSection from "./components/SkillsSection";
import ContactSection from "./components/ContactSection";
import { ThemeProvider } from "./context/ThemeContext";
import LoadingScreen from "./components/LoadingScreen";
import "./styles/dark-space-theme.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      {isLoading && <LoadingScreen />}

      <div
        className="App"
        style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.5s ease" }}
      >
        {/* SpaceNav removed */}
        <main className="main-content">
          <AboutSection />
          <ProjectSection />
          <SkillsSection />
          <ContactSection />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
