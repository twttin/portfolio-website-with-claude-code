import React from 'react';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useTheme } from '../contexts/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <IconMoon size={20} className="theme-icon" />
      ) : (
        <IconSun size={20} className="theme-icon" />
      )}
    </button>
  );
};

export default ThemeToggle;