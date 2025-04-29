// client/src/components/ThemeToggle.js
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <motion.button
      className={`theme-toggle ${darkMode ? 'dark' : 'light'}`}
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        className="toggle-handle"
        layout
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
      >
        {darkMode ? (
          <FaMoon className="icon" />
        ) : (
          <FaSun className="icon" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;