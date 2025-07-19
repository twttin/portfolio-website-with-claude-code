import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ColorCube from '../components/3d/ColorCube';
import PixelCloud from '../components/3d/PixelCloud';
import ImageUpload from '../components/3d/ImageUpload';
import '../components/3d/ThreeDVisualization.css';

interface Pixel {
  r: number;
  g: number;
  b: number;
}

interface CameraPosition {
  position: [number, number, number];
  up: [number, number, number];
}

const ThreeDVisualization: React.FC = () => {
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [colorMode, setColorMode] = useState<'monochrome' | 'colored'>('colored');
  const [viewMode, setViewMode] = useState<'default' | 'xy' | 'yz' | 'xz'>('default');
  const [showLabels, setShowLabels] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const controlsRef = useRef<any>(null);

  const handleViewChange = (view: 'default' | 'xy' | 'yz' | 'xz') => {
    setViewMode(view);
  };

  const cameraPositions: Record<string, CameraPosition> = React.useMemo(() => ({
    default: {
      position: [2, 2, 2],
      up: [0, 1, 0]
    },
    xy: {
      position: [0, 0, -5],
      up: [0, 1, 0]
    },
    yz: {
      position: [-5, 0, 0],
      up: [0, 1, 0]
    },
    xz: {
      position: [0, -5, 0],
      up: [0, 0, 1]
    }
  }), []);

  const extractPixels = (imageUrl: string) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;
      
      canvas.width = img.width;
      canvas.height = img.height;
      
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      const pixelArray: Pixel[] = [];
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] > 0) {
          pixelArray.push({
            r: data[i],
            g: data[i + 1],
            b: data[i + 2]
          });
        }
      }
      
      setPixels(pixelArray);
    };
    
    img.onerror = (error) => {
      console.error('Error loading image:', error);
    };
    
    img.src = imageUrl;
  };

  const handleImageUpload = (dataUrl: string) => {
    extractPixels(dataUrl);
    // Force reset to default view and camera position
    setViewMode('default');
    // Trigger camera reset even if already on default
    setTimeout(() => {
      if (controlsRef.current) {
        const { position, up } = cameraPositions['default'];
        controlsRef.current.object.position.set(...position);
        controlsRef.current.object.up.set(...up);
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
      }
    }, 0);
  };

  // Update camera when view changes
  useEffect(() => {
    if (controlsRef.current) {
      const { position, up } = cameraPositions[viewMode];
      controlsRef.current.object.position.set(...position);
      controlsRef.current.object.up.set(...up);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  }, [viewMode, cameraPositions]);

  // Set document title
  useEffect(() => {
    document.title = 'Re-visualizing colors | Zi Wang\'s portfolio';
    
    // Cleanup: reset to default when component unmounts
    return () => {
      document.title = 'Zi Wang\'s portfolio';
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const isHamburgerClick = target.closest('.hamburger-button');
      const isDropdownClick = target.closest('.mobile-dropdown');
      
      if (!isHamburgerClick && !isDropdownClick && isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isDropdownOpen]);

  return (
    <div className="threed-visualization">
      <div className="threed-container">
        <div className="left-panel">
          <h2>Re-visualizing colors</h2>
          <ImageUpload onImageUpload={handleImageUpload} />
          {pixels.length === 0 && (
            <div className="intro-section">
              <p className="intro-text">
                Color is one of the most important aspects when we look at an image. What if, we take the RGB color space of every pixel of an image and place them into the corresponding (x, y, z) coordinate. The image is thus transformed into a 3-dimensional entity.
              </p>
              <div className="intro-docs-container">
                <button className="docs-button" onClick={() => window.open('/re-visualizing color.pdf', '_blank')}>
                  View Docs
                </button>
              </div>
            </div>
          )}
          {pixels.length > 0 && (
            <div className="pixel-count-container">
              <p className="pixel-count">Total pixels: {pixels.length} | Sampled pixels: {Math.ceil(pixels.length / 100)}</p>
              <button className="docs-button" onClick={() => window.open('/re-visualizing color.pdf', '_blank')}>
                Docs
              </button>
            </div>
          )}
        </div>

        <div className="right-panel">
          <div className="mobile-controls-container">
            {pixels.length > 0 && (
              <>
                {/* Desktop controls - individual overlays */}
                <div className="desktop-controls">
                  <div className="label-controls-overlay">
                    <div className="segmented-control">
                      <button 
                        className={!showLabels ? 'active' : ''}
                        onClick={() => setShowLabels(false)}
                      >
                        Labels Off
                      </button>
                      <button 
                        className={showLabels ? 'active' : ''}
                        onClick={() => setShowLabels(true)}
                      >
                        Labels On
                      </button>
                    </div>
                  </div>
                  <div className="visualization-controls-overlay">
                    <div className="segmented-control">
                      <button 
                        className={colorMode === 'colored' ? 'active' : ''}
                        onClick={() => setColorMode('colored')}
                      >
                        Colored
                      </button>
                      <button 
                        className={colorMode === 'monochrome' ? 'active' : ''}
                        onClick={() => setColorMode('monochrome')}
                      >
                        Monochrome
                      </button>
                    </div>
                  </div>
                  <div className="view-controls-overlay">
                    <div className="segmented-control">
                      <button 
                        className={viewMode === 'default' ? 'active' : ''}
                        onClick={() => handleViewChange('default')}
                      >
                        Full Color
                      </button>
                      <button 
                        className={viewMode === 'xy' ? 'active' : ''}
                        onClick={() => handleViewChange('xy')}
                      >
                        Red-Green
                      </button>
                      <button 
                        className={viewMode === 'yz' ? 'active' : ''}
                        onClick={() => handleViewChange('yz')}
                      >
                        Blue-Green
                      </button>
                      <button 
                        className={viewMode === 'xz' ? 'active' : ''}
                        onClick={() => handleViewChange('xz')}
                      >
                        Red-Blue
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Mobile hamburger menu */}
                <div className="mobile-hamburger-menu">
                  <button 
                    className="hamburger-button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    aria-label="Toggle controls menu"
                  >
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                  </button>
                  {isDropdownOpen && (
                    <div className="mobile-dropdown">
                      <div className="mobile-dropdown-section">
                        <h4>Labels</h4>
                        <div className="segmented-control">
                          <button 
                            className={!showLabels ? 'active' : ''}
                            onClick={() => setShowLabels(false)}
                          >
                            Labels Off
                          </button>
                          <button 
                            className={showLabels ? 'active' : ''}
                            onClick={() => setShowLabels(true)}
                          >
                            Labels On
                          </button>
                        </div>
                      </div>
                      <div className="mobile-dropdown-section">
                        <h4>Color Mode</h4>
                        <div className="segmented-control">
                          <button 
                            className={colorMode === 'colored' ? 'active' : ''}
                            onClick={() => setColorMode('colored')}
                          >
                            Colored
                          </button>
                          <button 
                            className={colorMode === 'monochrome' ? 'active' : ''}
                            onClick={() => setColorMode('monochrome')}
                          >
                            Monochrome
                          </button>
                        </div>
                      </div>
                      <div className="mobile-dropdown-section">
                        <h4>View</h4>
                        <div className="segmented-control">
                          <button 
                            className={viewMode === 'default' ? 'active' : ''}
                            onClick={() => handleViewChange('default')}
                          >
                            Full Color
                          </button>
                          <button 
                            className={viewMode === 'xy' ? 'active' : ''}
                            onClick={() => handleViewChange('xy')}
                          >
                            Red-Green
                          </button>
                          <button 
                            className={viewMode === 'yz' ? 'active' : ''}
                            onClick={() => handleViewChange('yz')}
                          >
                            Blue-Green
                          </button>
                          <button 
                            className={viewMode === 'xz' ? 'active' : ''}
                            onClick={() => handleViewChange('xz')}
                          >
                            Red-Blue
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="canvas-container">
            <Canvas 
              orthographic 
              camera={{ 
                position: cameraPositions[viewMode].position,
                up: cameraPositions[viewMode].up,
                zoom: 150,
                near: -100,
                far: 100
              }}
            >
              <color attach="background" args={['#ffffff']} />
              <ambientLight intensity={1} />
              <pointLight position={[10, 10, 10]} />
              {pixels.length > 0 ? (
                <PixelCloud 
                  pixels={pixels} 
                  colorMode={colorMode} 
                  showLabels={showLabels}
                />
              ) : (
                <ColorCube />
              )}
              <OrbitControls 
                ref={controlsRef}
                enableRotate={true}
                enableZoom={true}
                enablePan={true}
                makeDefault
              />
            </Canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeDVisualization;