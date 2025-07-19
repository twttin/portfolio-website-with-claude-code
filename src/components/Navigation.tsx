import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconMenu2, IconX } from '@tabler/icons-react';
import ThemeToggle from './ThemeToggle';
import './Navigation.css';

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    // If we're not on the home page, navigate to home first
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <button 
            onClick={() => scrollToSection('hero')} 
            className="nav-link nav-button brand-button"
          >
            Zi Wang
          </button>
          <ThemeToggle />
        </div>
        
        {/* Desktop Navigation */}
        <div className="nav-links desktop-nav">
          <button 
            onClick={() => scrollToSection('current-work')} 
            className="nav-link nav-button"
          >
            Product Design
          </button>
          <span className="nav-separator">·</span>
          <button 
            onClick={() => scrollToSection('pre-product-design')} 
            className="nav-link nav-button"
          >
            Pre-Product Design
          </button>
          <span className="nav-separator">·</span>
          <button 
            onClick={() => scrollToSection('besides-work')} 
            className="nav-link nav-button"
          >
            Outside of Work
          </button>
          <span className="nav-separator">·</span>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="nav-link nav-button"
          >
            Contact
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <IconX size={20} className="mobile-menu-icon" />
          ) : (
            <IconMenu2 size={20} className="mobile-menu-icon" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <button 
          onClick={() => scrollToSection('current-work')} 
          className="mobile-nav-link"
        >
          Product Design
        </button>
        <button 
          onClick={() => scrollToSection('pre-product-design')} 
          className="mobile-nav-link"
        >
          Pre-Product Design
        </button>
        <button 
          onClick={() => scrollToSection('besides-work')} 
          className="mobile-nav-link"
        >
          Besides Work
        </button>
        <button 
          onClick={() => scrollToSection('contact')} 
          className="mobile-nav-link"
        >
          Contact
        </button>
      </div>
    </nav>
  );
};

export default Navigation; 