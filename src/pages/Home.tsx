import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconArrowRight } from '@tabler/icons-react';
import { currentProjects, previousProjects } from '../data/projects';
import './Home.css';

const Home: React.FC = () => {
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0 });

  // Set document title for home page
  useEffect(() => {
    document.title = 'Portfolio';
  }, []);

  const handleMouseEnter = (e: React.MouseEvent) => {
    setTooltip({ show: true, x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltip(prev => ({ ...prev, x: e.clientX, y: e.clientY }));
  };

  const handleMouseLeave = () => {
    setTooltip({ show: false, x: 0, y: 0 });
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-content container">
          <p className="hero-description">
            Hi, I'm [Your Name]
            <br />
            — a designer passionate about creating meaningful user experiences. Welcome to my portfolio.
            <br /><br />
            Replace this with your own introduction and background.
          </p>
        </div>
      </section>

      {/* Current Work Section */}
      <section id="current-work" className="section current-work-section">
        <div className="container">
          <p className="section-description">
            Currently at <strong>[Your Company]</strong>, I focus on developing user-centered solutions that bridge complex technical capabilities with intuitive user experiences. Replace this with your current work description.
          </p>
          
          {/* Featured Project */}
          <div className="featured-project">
            {currentProjects.filter(project => project.isFeatured).map((project) => (
              <Link 
                to={`/project/${project.id}`} 
                key={project.id} 
                className="featured-project-card"
              >
                <div className="featured-project-image">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="featured-project-content">
                  <div className="featured-project-text">
                    <p className="featured-project-description">{project.description}</p>
                    <div className="project-keywords">
                      {project.technologies.join(' · ')}
                    </div>
                  </div>
                  <div className="featured-project-cta">
                    <span className="cta-text">Learn more</span>
                    <IconArrowRight size={24} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Other Current Projects */}
          <div className="current-projects-grid">
            {currentProjects.filter(project => !project.isFeatured).map((project) => (
              <Link 
                to={`/project/${project.id}`} 
                key={project.id} 
                className="project-card"
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="project-content">
                  <div className="project-text">
                    <p className="project-description">{project.description}</p>
                    <div className="project-keywords">
                      {project.technologies.join(' · ')}
                    </div>
                  </div>
                  <div className="project-cta">
                    <span className="cta-text">Learn more</span>
                    <IconArrowRight size={20} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Previous Work Section */}
      <section id="previous-work" className="section previous-work-section">
        <div className="container">
          <p className="section-description">
            Previously at <strong>[Previous Company]</strong>, I worked on various projects that helped me develop expertise in different areas. Replace this with your previous work experience.
          </p>
          {/* Featured Previous Project - SiftedAI */}
          <div className="featured-project">
            {previousProjects.filter(project => project.id === 'sifted').map((project) => (
              <Link 
                to={`/project/${project.id}`}
                key={project.id} 
                className="featured-project-card"
              >
                <div className="featured-project-image">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="project-image-primary"
                  />
                  <img 
                    src="/img/sifted-2.jpg"
                    alt={project.title}
                    className="project-image-hover"
                  />
                  {project.award && (
                    <a 
                      href="https://ifdesign.com/en/winner-ranking/project/siftedai-a-logistics-intelligence-software/698823" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="award-badge"
                    >
                      <img src="/logos/if design award.jpg" alt={project.award} />
                    </a>
                  )}
                </div>
                <div className="featured-project-content">
                  <div className="featured-project-text">
                    <p className="featured-project-description">{project.description}</p>
                    <div className="project-keywords">
                      {project.technologies.join(' · ')}
                    </div>
                  </div>
                  <div className="featured-project-cta">
                    <span className="cta-text">Learn more</span>
                    <IconArrowRight size={24} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Other Previous Projects */}
          <div className="previous-projects-grid">
            {previousProjects.filter(project => ['growlink', 'disaster-tech'].includes(project.id)).map((project) => (
              <div 
                key={project.id} 
                className="previous-project-card"
              >
                <div className="project-image" data-project-id={project.id}>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="project-image-primary"
                  />
                  {(project.id === 'growlink' || project.id === 'disaster-tech') && (
                    <img 
                      src={
                        project.id === 'growlink' ? '/img/growlink hover.png' :
                        '/img/disaster tech-2.png'
                      }
                      alt={project.title}
                      className="project-image-hover"
                    />
                  )}
                </div>
                <div className="previous-project-content">
                  <p className="project-description">{project.description}</p>
                  <div className="project-keywords">
                    {project.technologies.join(' · ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-Product Design Section */}
      <section id="pre-product-design" className="section pre-product-section">
        <div className="container">
          <p className="section-description">
            I have a background in [Your Field] and have worked at various organizations where I developed skills in [Your Skills]. Replace this with your educational and early career background.
          </p>
          <div className="architecture-grid">
            <div className="architecture-card">
              <div className="architecture-image">
                <img 
                  src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop&auto=format" 
                  alt="Modern Architecture Project"
                  className="architecture-image-primary"
                />
                <img 
                  src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&h=600&fit=crop&auto=format"
                  alt="Modern Architecture Project Interior"
                  className="architecture-image-hover"
                />
              </div>
              <div className="architecture-content">
                <p className="architecture-description">
                  Modern workspace design focusing on collaboration and natural light integration for enhanced productivity.
                </p>
                <div className="architecture-keywords">
                  <span className="architecture-link">
                    Collaborative Workspace Design
                  </span>
                </div>
              </div>
            </div>
            <div className="architecture-card">
              <div className="architecture-image">
                <img 
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&auto=format" 
                  alt="Urban Planning Project"
                  className="architecture-image-primary"
                />
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&auto=format"
                  alt="Urban Planning Project Detail"
                  className="architecture-image-hover"
                />
              </div>
              <div className="architecture-content">
                <p className="architecture-description">
                  Sustainable urban development project integrating green spaces and smart city infrastructure.
                </p>
                <div className="architecture-keywords">
                  <span className="architecture-link">
                    Sustainable Urban Development
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outside of Work Section */}
      <section id="besides-work" className="section besides-work-section">
        <div className="container">
          <p className="section-description">
            Outside of work, I enjoy [Your Hobbies/Interests]. Replace this with your personal interests and activities.
          </p>
          <div className="side-projects-grid">
            <div className="side-project-card">
              <div className="side-project-icon">🎨</div>
              <p className="side-project-description">
                Creative coding experiments using generative art and interactive visualizations to explore the intersection of design and technology.
              </p>
              <div className="featured-project-cta">
                <span className="cta-text">View gallery</span>
                <IconArrowRight size={20} />
              </div>
            </div>
            <div className="side-project-card">
              <div className="side-project-icon">📱</div>
              <p className="side-project-description">
                Mobile app prototype exploring augmented reality features for interior design, built with React Native and ARKit.
              </p>
              <div className="featured-project-cta">
                <span className="cta-text">Try prototype</span>
                <IconArrowRight size={20} />
              </div>
            </div>
            <div className="side-project-card">
              <div className="side-project-icon">🌱</div>
              <p className="side-project-description">
                Open-source design system component library focused on accessibility and sustainable web practices.
              </p>
              <div className="featured-project-cta">
                <span className="cta-text">View on GitHub</span>
                <IconArrowRight size={20} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-text">
              <p>I'm always interested in new opportunities and meaningful conversations. Email me at <a href="mailto:your.email@example.com" className="contact-link">your.email@example.com</a> or find me at <a href="https://www.linkedin.com/in/yourprofile" className="contact-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>.</p>
              <p className="copyright-text">Copyright @ Your Name.</p>
            </div>
            <div className="contact-info">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&auto=format&crop=face" 
                alt="Professional headshot" 
                className="contact-selfie" 
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Custom Tooltip */}
      {tooltip.show && (
        <div 
          className="custom-tooltip"
          style={{
            left: tooltip.x,
            top: tooltip.y - 40,
            transform: 'translateX(-50%)'
          }}
        >
Add your own tooltip text here
        </div>
      )}
    </div>
  );
};

export default Home; 