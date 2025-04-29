// client/src/components/ContactSection.js
import React, { useState, useRef } from 'react';
import './ContactSection.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaRocket, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const ContactSection = () => {
  const [isLaunching, setIsLaunching] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLaunching(true);

    emailjs.sendForm(
      process.env.service_232vupc,
      process.env.template_q3muq8x,
      formRef.current,
      process.env.dzH7t1Klihy7LPNWj
    )
    .then(() => {
      setIsLaunching(false);
      setIsSuccess(true);
      formRef.current.reset();
      setTimeout(() => setIsSuccess(false), 3000);
    })
    .catch(() => {
      setIsLaunching(false);
      setIsError(true);
      setTimeout(() => setIsError(false), 3000);
    });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="title-number">04.</span> Mission Control
        </h2>
        <p className="section-subtitle">Ready to launch a conversation?</p>
      </div>

      <div className="contact-container">
        {/* Contact Form */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
        <motion.form 
          ref={formRef}
          onSubmit={handleSubmit}
          className="contact-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="form-group">
            <label htmlFor="name">Astronaut Name</label>
            <input 
              type="text" 
              id="name" 
              name="from_name" 
              required 
              placeholder="Your name" 
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Space Station Coordinates</label>
            <input 
              type="email" 
              id="email" 
              name="from_email" 
              required 
              placeholder="Your email" 
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Transmission Message</label>
            <textarea 
              id="message" 
              name="message" 
              required 
              rows="5"
              placeholder="Your message to mission control"
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="launch-button"
            disabled={isLaunching}
          >
            {isLaunching ? (
              <>
                <FaRocket className="spinning" />
                <span>Launching Message...</span>
              </>
            ) : (
              <>
                <FaPaperPlane />
                <span>Initiate Transmission</span>
              </>
            )}
          </button>
        </motion.form>

        {/* Social Links */}
        <div className="social-links">
          <h3>Or establish subspace communication:</h3>
          <div className="social-icons">
            <a href="https://www.linkedin.com/in/m-arfin-aryasatya/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://github.com/AKplayz" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://www.instagram.com/arfin_arya" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Rocket Animation */}
        <div className="rocket-container">
          <div className={`rocket ${isLaunching ? 'launching' : ''}`}>
            <FaRocket />
            <div className="exhaust"></div>
          </div>
          <div className="launch-pad"></div>
        </div>
      </div>

      {/* Status Messages */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            className="status-message success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            Transmission successful! Message received at mission control.
          </motion.div>
        )}
        {isError && (
          <motion.div
            className="status-message error"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            Transmission failed! Please try again or use subspace communication.
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContactSection;