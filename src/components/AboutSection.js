// client/src/components/AboutSection.js
import React from 'react';
import './AboutSection.css';
import { motion } from 'framer-motion';
import Astronaut from '../assets/fin6.jpeg'; // You'll need an astronaut image

const AboutSection = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        {/* Left side - Astronaut image with animation */}
        <motion.div 
          className="astronaut-wrapper"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img src={Astronaut} alt="Astronaut" className="astronaut-img" />
          <div className="orbit orbit-1"></div>
          <div className="orbit orbit-2"></div>
          <div className="orbit orbit-3"></div>
        </motion.div>

        {/* Right side - Content */}
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
              Hello! I'm <span className="highlight">[M. Arfin Aryasatya]</span>, a  
<span className="highlight"> [Front-End Developer]</span> passionate about building engaging, responsive, and user-focused web experiences. 
With a deep interest in modern UI/UX design and frontend technologies, I specialize in transforming complex ideas into interactive digital products—exploring the web like a developer navigating uncharted space.

            </p>
            
            <p>
              My journey began <span className="highlight">[1 Year]</span> ago when I first 
              launched into the world of development. Since then, I've orbited 
              around various technologies including:
            </p>
            
            <ul className="skills-list">
              <motion.li whileHover={{ scale: 1.05 }}>React</motion.li>
              <motion.li whileHover={{ scale: 1.05 }}>Node.js</motion.li>
              <motion.li whileHover={{ scale: 1.05 }}>JavaScript</motion.li>
              <motion.li whileHover={{ scale: 1.05 }}>HTML/CSS</motion.li>
              <motion.li whileHover={{ scale: 1.05 }}>Three.js</motion.li>
            </ul>
            
            <p>
              When I'm not coding, you can find me <span className="highlight">[Gaming]</span>, 
              which keeps me grounded despite my cosmic ambitions.
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* Animated floating elements */}
      <div className="floating-element element-1">🚀</div>
      <div className="floating-element element-2">🛰️</div>
      <div className="floating-element element-3">🌌</div>
    </section>
  );
};

export default AboutSection;