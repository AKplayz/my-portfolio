// client/src/components/SpaceBackground.js
import React, { useEffect } from 'react';
import './SpaceBackground.css';

const SpaceBackground = () => {
  useEffect(() => {
    const createStar = () => {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Random position
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      
      // Random size
      const size = Math.random() * 3;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      
      // Random animation duration
      star.style.animationDuration = `${5 + Math.random() * 10}s`;
      
      document.querySelector('.space-background').appendChild(star);
    };
    
    // Create 100 stars
    for (let i = 0; i < 100; i++) {
      createStar();
    }
  }, []);

  return <div className="space-background"></div>;
};

export default SpaceBackground;