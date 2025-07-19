import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { IconHexagonNumber1Filled, IconHexagonNumber2Filled, IconHexagonNumber3Filled } from '@tabler/icons-react';
import { projects, navigableProjects } from '../data/projects';
import './ProjectPage.css';
import { usePassword } from '../contexts/PasswordContext';
import PasswordPrompt from '../components/PasswordPrompt';

const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);
  const { isAuthenticated } = usePassword();
  
  // Find current project index and get previous/next projects from navigable projects with circular navigation
  const currentIndex = navigableProjects.findIndex(p => p.id === id);
  const previousProject = currentIndex !== -1 ? 
    (currentIndex > 0 ? navigableProjects[currentIndex - 1] : navigableProjects[navigableProjects.length - 1]) : 
    null;
  const nextProject = currentIndex !== -1 ? 
    (currentIndex < navigableProjects.length - 1 ? navigableProjects[currentIndex + 1] : navigableProjects[0]) : 
    null;

  // Set document title based on project
  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Zi Wang's portfolio`;
    } else {
      document.title = 'Project Not Found | Zi Wang\'s portfolio';
    }
  }, [project]);

  // Scroll to top when project changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!isAuthenticated) {
    return <PasswordPrompt />;
  }

  if (!project) {
    return (
      <div className="project-not-found">
        <div className="container">
          <h1>Project Not Found</h1>
          <p>The project you're looking for doesn't exist.</p>
          <Link to="/" className="back-link">← Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="project-page">
      <div className="container">
        <div className="project-header">
          <h1 className="project-title">{project.title}</h1>
          <p className="project-subtitle">{project.description}</p>
        </div>

        <div className="project-hero">
          <img src={project.image} alt={project.title} className="project-hero-image" />
        </div>
      </div>

      {project.caseStudy && (
        <>
          {/* First row: Problem (3 cols), Role (1 col) */}
          {project.caseStudy.sections.length >= 2 && (
            <section className="case-study-section-wrapper background-section">
              <div className="container">
                <div className="case-study-two-column-wide">
                  <div className="case-study-section context-section">
                    <h2>{project.caseStudy.sections[0].title}</h2>
                    {project.caseStudy.sections[0].title === "The problem" ? (
                      <blockquote>{project.caseStudy.sections[0].content}</blockquote>
                    ) : (
                      <p>{project.caseStudy.sections[0].content}</p>
                    )}
                  </div>
                  <div className="case-study-section">
                    <h2>{project.caseStudy.sections[1].title}</h2>
                    {project.caseStudy.sections[1].title === "The problem" ? (
                      <blockquote>{project.caseStudy.sections[1].content}</blockquote>
                    ) : (
                      <p>{project.caseStudy.sections[1].content}</p>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}
          
          {/* Rest of the sections */}
          {project.caseStudy.sections.slice(2).map((section, index) => (
            <section key={index + 3} className={`case-study-section-wrapper ${index % 2 === 0 ? 'surface-section' : 'background-section'}`}>
              <div className="container">
                <div className="case-study-section">
                  <h2>{section.title}</h2>
                  {section.content && (
                    section.title === "The problem" ? (
                      <blockquote>{section.content}</blockquote>
                    ) : (
                      <p dangerouslySetInnerHTML={{ 
                        __html: section.content
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: var(--color-accent);">$1</a>')
                      }}></p>
                    )
                  )}
                  {section.keyOutcomes && (
                    <div className="key-outcomes-grid">
                      {section.keyOutcomes.map((outcome, outcomeIndex) => {
                        const IconComponent = outcomeIndex === 0 ? IconHexagonNumber1Filled : 
                                            outcomeIndex === 1 ? IconHexagonNumber2Filled : 
                                            IconHexagonNumber3Filled;
                        return (
                          <div key={outcomeIndex} className="key-outcome-card">
                            <div className="key-outcome-header">
                              <IconComponent size={24} className="key-outcome-icon" />
                            </div>
                            <p dangerouslySetInnerHTML={{ 
                              __html: outcome
                                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: var(--color-accent);">$1</a>')
                            }}></p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {section.solutionItems && (
                    <div className="solution-grid">
                      {section.solutionItems.map((item, itemIndex) => (
                        <div key={itemIndex} className="solution-step">
                          <div className="solution-step-content">
                            <h3>{item}</h3>
                          </div>
                          <div className="solution-step-image">
                            {(() => {
                              const imageData = section.solutionImages?.[itemIndex] || section.solutionImage || "/img/placeholder.png";
                              if (Array.isArray(imageData)) {
                                return (
                                  <div className="solution-image-grid">
                                    {imageData.map((imgSrc, imgIndex) => (
                                      <img 
                                        key={imgIndex}
                                        src={imgSrc} 
                                        alt={`${item} visualization ${imgIndex + 1}`} 
                                      />
                                    ))}
                                  </div>
                                );
                              } else {
                                return (
                                  <img 
                                    src={imageData} 
                                    alt={`${item} visualization`} 
                                  />
                                );
                              }
                            })()}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          ))}
        </>
      )}

      {(project.githubUrl || project.liveUrl) && (
        <section className="case-study-section-wrapper background-section">
          <div className="container">
            <div className="project-links">
              <h2>Links</h2>
              <div className="link-buttons">
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link github"
                  >
                    🐙 View on GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link live"
                  >
                    🌐 Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="project-navigation surface-section">
        <div className="container">
          <div className="navigation-wrapper">
            <div className="nav-item">
              {previousProject && (
                <Link to={`/project/${previousProject.id}`} className="nav-link prev">
                  <span className="nav-direction">← Previous</span>
                  <span className="nav-title">{previousProject.title}</span>
                </Link>
              )}
            </div>
            
            <div className="nav-item center">
              <Link to="/" className="back-home-button">Back to home</Link>
            </div>
            
            <div className="nav-item">
              {nextProject && (
                <Link to={`/project/${nextProject.id}`} className="nav-link next">
                  <span className="nav-direction">Next →</span>
                  <span className="nav-title">{nextProject.title}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ProjectPage; 