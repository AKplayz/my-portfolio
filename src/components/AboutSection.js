import { useState, useEffect } from "react";
import "./AboutSection.css";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import Astronaut from "../assets/fin6.jpeg";

const TypingAnimation = ({
  words = [
    "Front-End Developer",
    "React Developer",
    "UI Explorer",
    "Space Navigator",
  ],
  typingSpeed = 150,
  deletingSpeed = 100,
  delayBetweenWords = 2000,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < word.length) {
            setCurrentText(word.substring(0, currentText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), delayBetweenWords);
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(currentText.substring(0, currentText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [
    currentText,
    isDeleting,
    currentWordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    delayBetweenWords,
  ]);

  return (
    <span className="typing-animation">
      {currentText}
      <span className="cursor">|</span>
    </span>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <motion.div
          className="astronaut-wrapper"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Tilt
            tiltMaxAngleX={35}
            tiltMaxAngleY={35}
            scale={1.1}
            perspective={1000}
            glareEnable={true}
            glareMaxOpacity={0.5}
            glareColor="rgba(100,149,237,0.5)"
            glarePosition="all"
            className="tilt-card"
          >
            <img src={Astronaut} alt="Astronaut" className="astronaut-img" />
          </Tilt>

          <div className="orbit orbit-1"></div>
          <div className="orbit orbit-2"></div>
          <div className="orbit orbit-3"></div>
        </motion.div>

        <motion.div
          className="about-content"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h2 className="section-title">
            <span className="title-number">01.</span> About Me
          </h2>

          <div className="planet-bio">
            <p>
              Hello! I'm <span className="highlight">[M. Arfin Aryasatya]</span>
              , a{" "}
              <span className="highlight">
                <TypingAnimation />
              </span>{" "}
              passionate about building engaging, responsive, and user-focused
              web experiences. With a deep interest in modern UI/UX design and
              frontend technologies, I specialize in transforming complex ideas
              into interactive digital products—exploring the web like a
              developer navigating uncharted space.
            </p>

            <p>
              My journey began <span className="highlight">[1 Year]</span> ago
              when I first launched into the world of development. Since then,
              I've orbited around various technologies including:
            </p>

            <ul className="skills-list">
              <motion.li whileHover={{ scale: 1.05 }}>React</motion.li>
              <motion.li whileHover={{ scale: 1.05 }}>Node.js</motion.li>
              <motion.li whileHover={{ scale: 1.05 }}>JavaScript</motion.li>
              <motion.li whileHover={{ scale: 1.05 }}>HTML/CSS</motion.li>
              <motion.li whileHover={{ scale: 1.05 }}>Next.Js</motion.li>
            </ul>

            <p>
              When I'm not coding, you can find me{" "}
              <span className="highlight">[Gaming]</span>, which keeps me
              grounded despite my cosmic ambitions.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="floating-element element-1">🚀</div>
      <div className="floating-element element-2">🛰️</div>
      <div className="floating-element element-3">🌌</div>
    </section>
  );
};

export default AboutSection;
