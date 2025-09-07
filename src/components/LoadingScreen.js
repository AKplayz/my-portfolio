import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./LoadingScreen.css";
import {
  FaRocket,
  FaSatellite,
  FaRegStar,
  FaChevronRight,
  FaCog,
  FaWifi,
} from "react-icons/fa";

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing systems...");
  const [showSkip, setShowSkip] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const loadMessages = useMemo(
    () => [
      { text: "🚀 Preparing launch sequence...", duration: 800 },
      { text: "🛰️ Calibrating navigation systems...", duration: 1200 },
      { text: "🌌 Loading stellar data...", duration: 1000 },
      { text: "⚡ Powering warp core...", duration: 1500 },
      { text: "🔭 Aligning telescopes...", duration: 900 },
      { text: "🪐 Establishing orbital connection...", duration: 1100 },
      { text: "✨ Launch sequence complete!", duration: 500 },
    ],
    []
  );

  const handleComplete = useCallback(() => {
    setIsComplete(true);
    setTimeout(() => {
      onComplete?.();
    }, 1500);
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    setProgress(100);
  }, []);

  useEffect(() => {
    if (progress >= 100 && !isComplete) {
      handleComplete();
    }
  }, [progress, isComplete, handleComplete]);

  useEffect(() => {
    const skipTimer = setTimeout(() => setShowSkip(true), 2000);

    let messageIndex = 0;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.random() * 3 + 1; // More consistent progress
        const newProgress = prev + increment;

        // Update message based on progress thresholds
        const progressThreshold =
          (messageIndex + 1) * (100 / loadMessages.length);
        if (
          newProgress >= progressThreshold &&
          messageIndex < loadMessages.length - 1
        ) {
          messageIndex++;
          messageIndex++;
          setStatus(loadMessages[messageIndex].text);
        }
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 120);

    return () => {
      clearInterval(interval);
      clearTimeout(skipTimer);
    };
  }, [loadMessages]);

  return (
    <div className="loading-screen">
      {/* Enhanced Starfield */}
      <div className="starfield">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Nebula Background */}
      <div className="nebula-bg">
        <div className="nebula nebula-1"></div>
        <div className="nebula nebula-2"></div>
        <div className="nebula nebula-3"></div>
      </div>

      {/* Main Container */}
      <div className={`loading-container ${isComplete ? "complete" : ""}`}>
        {/* Enhanced Rocket Animation */}
        <div className="spaceship-container">
          <div className="rocket-glow">
            <FaRocket className="spaceship" />
          </div>
          <div className="exhaust-trail">
            <div className="exhaust-particle"></div>
            <div className="exhaust-particle"></div>
            <div className="exhaust-particle"></div>
          </div>
        </div>

        {/* Enhanced Mission Console */}
        <div className="mission-console">
          <div className="console-header">
            <div className="header-left">
              <FaSatellite className="console-icon rotating" />
              <h3>MISSION CONTROL</h3>
            </div>
            <div className="header-right">
              <FaWifi className="wifi-icon" />
              <div className="signal-bars">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
              </div>
            </div>
          </div>

          <div className="status-display">
            <div className="status-message">
              <FaRegStar className="pulse" />
              <span className="status-text">{status}</span>
            </div>

            <div className="progress-container">
              <div className="progress-bg">
                <div className="progress-bar" style={{ width: `${progress}%` }}>
                  <div className="progress-glow"></div>
                </div>
                <span className="progress-text">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>

          {/* Enhanced Diagnostics */}
          <div className="diagnostics">
            {[
              { label: "ENGINE", threshold: 15, icon: FaCog },
              { label: "NAVIGATION", threshold: 35, icon: FaSatellite },
              { label: "COMMUNICATIONS", threshold: 55, icon: FaWifi },
              { label: "LIFE SUPPORT", threshold: 75, icon: FaRegStar },
            ].map((sys, i) => {
              const IconComponent = sys.icon;
              const isActive = progress > sys.threshold;
              return (
                <div className={`system ${isActive ? "active" : ""}`} key={i}>
                  <div className="system-header">
                    <IconComponent className="system-icon" />
                    <span className="system-label">{sys.label}</span>
                  </div>
                  <div className="system-status">
                    <div
                      className={`status-indicator ${
                        isActive ? "online" : "offline"
                      }`}
                    >
                      <div className="indicator-pulse"></div>
                    </div>
                    <span className="system-text">
                      {isActive ? "ONLINE" : "STANDBY"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Skip Button */}
        {showSkip && progress < 100 && (
          <button className="skip-button" onClick={handleSkip}>
            <span>Skip Countdown</span>
            <FaChevronRight className="skip-arrow" />
          </button>
        )}
      </div>

      {/* Launch Complete Message */}
      {isComplete && (
        <div className="launch-complete">
          <div className="complete-content">
            <div className="success-icon">
              <FaRocket />
            </div>
            <h2>Launch Successful!</h2>
            <p>Entering main interface...</p>
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [showLoading, setShowLoading] = useState(true);

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  return (
    <div>
      {showLoading ? (
        <LoadingScreen onComplete={handleLoadingComplete} />
      ) : (
        <div
          style={{
            padding: "2rem",
            textAlign: "center",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <div>
            <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
              🚀 Welcome to Space Mission Control!
            </h1>
            <p style={{ fontSize: "1.2rem", opacity: 0.9 }}>
              Loading complete - You're now in the main interface.
            </p>
            <button
              onClick={() => setShowLoading(true)}
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "1px solid white",
                color: "white",
                padding: "1rem 2rem",
                borderRadius: "25px",
                fontSize: "1rem",
                cursor: "pointer",
                marginTop: "2rem",
                backdropFilter: "blur(10px)",
              }}
            >
              Show Loading Screen Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
