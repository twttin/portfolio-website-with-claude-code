import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import ProjectPage from './pages/ProjectPage';
import ThreeDVisualization from './pages/ThreeDVisualization';
import './App.css';

function AppContent() {
  const location = useLocation();
  const showNavigation = location.pathname !== '/3d-visualization';

  return (
    <div className="App">
      {showNavigation && <Navigation />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/3d-visualization" element={<ThreeDVisualization />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
