import React, { useState, useEffect } from "react";
import "./SkillsSection.css";
import { motion } from "framer-motion";
import { FaStar, FaCode, FaServer, FaPalette, FaToolbox } from "react-icons/fa";

const skillsData = {
  languages: [
    { name: "JavaScript", level: 85 },
    { name: "HTML/CSS", level: 95 },
    { name: "Python", level: 60 },
    { name: "PHP", level: 50 },
    { name: "TypeScript", level: 80 },
  ],
  frontend: [
    { name: "Tailwind", level: 85 },
    { name: "Next.js", level: 85 },
    { name: "Vue.js", level: 80 },
    { name: "React", level: 85 },
    { name: "Boostrap", level: 90 },
  ],
  backend: [
    { name: "Node.js", level: 85 },
    { name: "Firebase", level: 70 },
  ],
  design: [
    { name: "Figma", level: 75 },
    { name: "UI/UX", level: 80 },
    { name: "Illustrator", level: 65 },
  ],
  tools: [
    { name: "Git", level: 65 },
    { name: "Webpack", level: 70 },
    { name: "MySQL", level: 60 },
  ],
};

const categoryIcons = {
  languages: <FaCode className="category-icon" />,
  frontend: <FaStar className="category-icon" />,
  backend: <FaServer className="category-icon" />,
  design: <FaPalette className="category-icon" />,
  tools: <FaToolbox className="category-icon" />,
};

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("languages");
  const [shootingStars, setShootingStars] = useState([]);

  // Create shooting stars randomly
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newStar = {
          id: Date.now(),
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 50}%`,
          duration: `${2 + Math.random() * 3}s`,
          delay: `${Math.random() * 2}s`,
        };
        setShootingStars((prev) => [...prev, newStar]);

        // Remove star after animation
        setTimeout(() => {
          setShootingStars((prev) =>
            prev.filter((star) => star.id !== newStar.id)
          );
        }, 5000);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="skills" className="skills-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="title-number">03.</span> Cosmic Capabilities
        </h2>
        <p className="section-subtitle">
          Skills that light up the digital universe
        </p>
      </div>

      <div className="skills-container">
        {/* Constellation Navigation */}
        <div className="constellation-nav">
          {Object.keys(skillsData).map((category) => (
            <motion.button
              key={category}
              className={`constellation ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {categoryIcons[category]}
              <span>{category}</span>
            </motion.button>
          ))}
        </div>

        {/* Skills Display */}
        <div className="skills-display">
          <div className="skills-grid">
            {skillsData[activeCategory].map((skill, index) => (
              <motion.div
                key={skill.name}
                className="skill-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="skill-header">
                  <h3>{skill.name}</h3>
                  <span>{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <motion.div
                    className="skill-level"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                    style={{
                      background: `linear-gradient(90deg, var(--skill-color), #6495ed)`,
                      boxShadow: `0 0 10px var(--skill-color)`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Shooting Stars */}
      {shootingStars.map((star) => (
        <div
          key={star.id}
          className="shooting-star"
          style={{
            left: star.left,
            top: star.top,
            animationDuration: star.duration,
            animationDelay: star.delay,
          }}
        />
      ))}

      {/* Background Constellations */}
      <div className="constellation-bg">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
