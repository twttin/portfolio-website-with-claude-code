import { useMemo } from 'react';
import CubeEdges from './CubeEdges';
import CubeLabels from './CubeLabels';

interface Pixel {
  r: number;
  g: number;
  b: number;
}

interface PixelCloudProps {
  pixels: Pixel[];
  colorMode: 'monochrome' | 'colored';
  showLabels: boolean;
}

export default function PixelCloud({ pixels, colorMode, showLabels }: PixelCloudProps) {
  const MAX_POINTS = 1000;

  const positions = useMemo(() => {
    if (!pixels || pixels.length === 0) return [];
    
    const samplingRate = Math.max(1, Math.ceil(pixels.length / MAX_POINTS));
    const sampledPixels = pixels.filter((_, index) => index % samplingRate === 0);
    
    const points = sampledPixels.map(pixel => {
      const pos = [
        (pixel.r / 255) - 0.5,     // Red to X
        (pixel.g / 255) - 0.5,     // Green to Y
        (pixel.b / 255) - 0.5      // Blue to Z
      ];
      
      return {
        position: pos,
        color: `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`
      };
    });

    return points;
  }, [pixels]);

  if (!pixels || pixels.length === 0) {
    return null;
  }

  return (
    <group>
      <CubeEdges />
      <CubeLabels showLabels={showLabels} />
      {positions.map((data, i) => (
        <mesh
          key={i}
          position={data.position as [number, number, number]}
        >
          <sphereGeometry args={[0.003, 16, 16]} />
          <meshBasicMaterial 
            color={colorMode === 'monochrome' ? '#333333' : data.color} 
          />
        </mesh>
      ))}
    </group>
  );
}