import React, { useState, useEffect } from 'react';
import './ProjectSection.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaServer, FaGithub, FaExternalLinkAlt, FaRegStar, FaCode, FaRocket } from 'react-icons/fa';
import { GiGalaxy, GiOrbital } from 'react-icons/gi';

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });

  const projects = [
    {
      id: 1,
      title: "Portfolio Space Project",
      description: "I'm excited to share my latest project: a space-themed portfolio where cutting-edge technology meets artistic imagination.Every element from the spinning planets to the nebula gradients was crafted to transform a developer’s portfolio into a full-blown experience.",
      tags: ["React", "Three.js", "CSS", "JavaScript", "Node.js"],
      type: "frontend",
      featured: false,
      // github: "https://github.com/yourusername/bumi",
      liveDemo: "https://drive.google.com/file/d/1WO1lS43Ip6TQBfVZ9JFZ6ezu3H0WgJDX/view?usp=sharing",
      techStack: ["React", "Three.js", "GSAP", "React Spring", "Framer Motion"],
      features: [
        "Three.js & React Three Fiber: Engineered the 3D planetary navigation system and realistic starfield animations, optimized for smooth performance",
        "Framer Motion: Crafted micro-interactions that make the UI feel alive (watch how project cards orbit into view!)",
        "EmailJS Built a secure respond for my contact form's subspace communication system directly to email",
        "Responsive Design: Ensures the experience adapts seamlessly from desktop to mobile",
        "Custom shader effects for atmospheric glow"
      ],
      screenshot: "me.PNG" // <--- Correct: filename only
    },
    {
      id: 2,
      title: "Kampus Merdeka Software Engineering Jakarta 4 Vending Machine Sales Website",
      description: "This website was developed to present the annual sales performance of vending machines located across four different locations. Designed primarily for investor presentations, the site displays processed sales data in a clean, professional, and easily digestible format.",
      tags: ["HTML", "CSS", "JavaScript", "EmailJS"],
      type: "frontend",
      featured: false,
      // github: "https://github.com/yourusername/bumi",
      liveDemo: "https://drive.google.com/drive/folders/1_TSKeH-UcNseY_fDl_POJAxE-yIV-kVH?usp=sharing",
      techStack: ["HTML", "CSS", "Boostrap", "JavaScript", "EmailJS"],
      features: [
        "Developed and implemented a feedback form using EmailJS, allowing users to submit their feedback directly via email without backend development.",
        "Assisted in creating the layout and structure of the website using CSS and Bootstrap, ensuring full responsiveness and consistent user experience across devices.",
        "Collaborated with the front-end team to maintain high-quality UI standards and align the website with the project’s business objectives.",
        "Custom dataset that has been processed using Google Looker"
      ],
      screenshot: "LandingPageAwal.png" // <--- Correct: filename only
    },
    {
      id: 3,
      title: "Fitcheck",
      description: "FitCheck is an online platform designed to assist users in managing their daily calorie intake and supporting their journey towards a healthier lifestyle. The website provides features such as food calorie counting, BMI-based health status analysis, and personalized food recommendations based on user input (height, weight, activity level).",
      tags: ["PHP", "Laravel", "Figma"],
      type: "frontend",
      featured: false,
      github: "https://drive.google.com/drive/folders/1ewC8mbIY0NFr3U8SqemSPVlJ4CGuWBsv?usp=drive_link",
      techStack: ["PHP", "Laravel", "HTML", "CSS", "Boostrap", "JavaScript"],
      features: [
        "Building an intuitive and responsive user interface that ensures easy navigation for users across all devices.",
        "Designing and implementing dynamic input forms for calorie tracking based on user data (height, weight, physical activity).",
        "Developing visual dashboards to display calorie consumption and BMI analysis results clearly and engagingly.",
        "Collaborating closely with the back-end team to integrate real-time data from the Laravel-based server into the front-end smoothly.",
        "Prioritizing usability and performance optimization to deliver a fast and seamless user experience."
      ],
      screenshot: "Dashboard.png" // <--- Correct: filename only
    },
    
    // Add more projects as needed
  ];

  useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.type === activeFilter || (activeFilter === 'featured' && project.featured));

  const calculateOrbitPosition = (index, total) => {
    const radius = Math.min(viewportSize.width, viewportSize.height) * 0.3;
    const angle = (index / total) * Math.PI * 2;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius * 0.6
    };
  };

  return (
    <section id="projects" className="projects-section">
      <div className="space-background">
        <div className="distant-galaxies"></div>
        <div className="floating-asteroids"></div>
      </div>

      <div className="section-header">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GiGalaxy className="title-icon" />
          <span className="title-number">02.</span> Cosmic Creations
        </motion.h2>
        <p className="section-subtitle">Projects That Redefine the Front-End Frontier</p>
      </div>

      <motion.div
        className="project-filters"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <button 
          className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          <GiOrbital /> All Systems
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'frontend' ? 'active' : ''}`}
          onClick={() => setActiveFilter('frontend')}
        >
          <FaCode /> Frontend
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'backend' ? 'active' : ''}`}
          onClick={() => setActiveFilter('backend')}
        >
          <FaServer /> Backend
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'featured' ? 'active' : ''}`}
          onClick={() => setActiveFilter('featured')}
        >
          <FaRegStar /> Featured
        </button>
      </motion.div>

      <div className="projects-solar-system">
        {filteredProjects.map((project, index) => {
          const position = calculateOrbitPosition(index, filteredProjects.length);
          return (
            <motion.div
              key={project.id}
              className="project-orbit"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: 1,
                scale: 1,
                x: position.x,
                y: position.y
              }}
              transition={{ type: "spring", stiffness: 50, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              <div 
                className={`project-planet ${selectedProject === project.id ? 'active' : ''}`}
                onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
              >
                {project.featured && <div className="featured-badge"><FaRegStar /></div>}
                <div className="planet-ring"></div>
                <div className="project-moon"></div>
              </div>
            </motion.div>
          );
        })}

        <div className="solar-system-core">
          <FaRocket className="core-icon" />
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (() => {
          const project = projects.find(p => p.id === selectedProject);
          return (
            <motion.div
              className="project-details"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 10 }}
            >
              <div className="details-header">
                <div>
                  <h3>{project.title}</h3>
                  <div className="project-links">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <FaGithub /> Code
                      </a>
                    )}
                    {project.liveDemo && (
                      <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                        <FaExternalLinkAlt /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
                <button className="close-btn" onClick={() => setSelectedProject(null)}>
                  &times;
                </button>
              </div>

              <div className="details-content">
                <div className="screenshot-container">
                  <img 
                    src={`/images/projects/${project.screenshot}`} 
                    alt={project.title} 
                  />
                </div>

                <div className="details-text">
                  <p>{project.description}</p>

                  <div className="tech-stack">
                    <h4>Tech Stack</h4>
                    <div className="tech-tags">
                      {project.techStack.map(tech => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                  </div>

                  <div className="project-features">
                    <h4>Key Features</h4>
                    <ul>
                      {project.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
