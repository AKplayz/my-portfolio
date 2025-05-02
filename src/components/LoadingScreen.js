import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaSatellite, FaRegStar, FaChevronRight } from 'react-icons/fa';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing systems...');
  const [showSkip, setShowSkip] = useState(false);

  const loadMessages = useMemo(() => [
    { text: '🚀 Preparing launch sequence...', duration: 800 },
    { text: '🛰️ Calibrating navigation systems...', duration: 1200 },
    { text: '🌌 Loading stellar data...', duration: 1000 },
    { text: '⚡ Powering warp core...', duration: 1500 },
    { text: '🔭 Aligning telescopes...', duration: 900 },
    { text: '🪐 Establishing orbital connection...', duration: 1100 },
    { text: '✨ Ready for launch!', duration: 500 }
  ], []);

  useEffect(() => {
    const skipTimer = setTimeout(() => setShowSkip(true), 2000);

    let currentMessage = 0;
    let accumulatedTime = 0;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 5;

        if (newProgress > accumulatedTime + loadMessages[currentMessage].duration) {
          accumulatedTime += loadMessages[currentMessage].duration;
          currentMessage = Math.min(currentMessage + 1, loadMessages.length - 1);
          setStatus(loadMessages[currentMessage].text);
        }

        return newProgress > 100 ? 100 : newProgress;
      });
    }, 100);

    return () => {
      clearInterval(interval);
      clearTimeout(skipTimer);
    };
  }, [loadMessages]);

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: progress >= 100 ? 0 : 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Starfield */}
      <div className="starfield">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="star"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Main Container */}
      <motion.div
        className="loading-container"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 10 }}
      >
        {/* Rocket Animation */}
        <motion.div
          className="spaceship-container"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FaRocket className="spaceship" />
          <motion.div
            className="exhaust-trail"
            initial={{ scaleY: 0.5 }}
            animate={{ scaleY: [1, 1.2, 1] }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          >
            <div className="exhaust-particle" />
            <div className="exhaust-particle" />
            <div className="exhaust-particle" />
          </motion.div>
        </motion.div>

        {/* Mission Console */}
        <div className="mission-console">
          <div className="console-header">
            <FaSatellite className="console-icon" />
            <h3>MISSION CONTROL</h3>
            <div className="signal-bars">
              <div className="bar" />
              <div className="bar" />
              <div className="bar" />
              <div className="bar" />
            </div>
          </div>

          <div className="status-display">
            <div className="status-message">
              <FaRegStar className="pulse" />
              <span>{status}</span>
            </div>

            <div className="progress-container">
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              />
              <span className="progress-text">{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Diagnostics */}
          <div className="diagnostics">
            {[
              { label: 'ENGINE', threshold: 20 },
              { label: 'NAVIGATION', threshold: 40 },
              { label: 'COMMS', threshold: 60 },
            ].map((sys, i) => (
              <div className="system" key={i}>
                <span>{sys.label}</span>
                <div className="system-status">
                  <div
                    className="status-indicator"
                    style={{
                      backgroundColor:
                        progress > sys.threshold ? '#2ecc71' : '#e74c3c',
                      boxShadow:
                        progress > sys.threshold
                          ? '0 0 10px #2ecc71'
                          : 'none',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skip Button */}
        {showSkip && (
          <motion.button
            className="skip-button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setProgress(100)}
          >
            Skip Countdown <FaChevronRight />
          </motion.button>
        )}
      </motion.div>

      {/* Launch Complete Message */}
      {progress >= 100 && (
        <motion.div
          className="launch-complete"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            Launch Successful!
          </h2>
          <p style={{ fontSize: '1rem', opacity: 0.8 }}>
            You're now entering the main interface...
          </p>
          <motion.div
            className="rocket-trail"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5 }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default LoadingScreen;
