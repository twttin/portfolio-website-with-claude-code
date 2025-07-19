import { useMemo } from 'react';
import { Line } from '@react-three/drei';

export default function CubeEdges() {
  const edges = useMemo(() => {
    return [
      // Bottom square
      [-0.5, -0.5, -0.5] as [number, number, number], [0.5, -0.5, -0.5] as [number, number, number],
      [0.5, -0.5, -0.5] as [number, number, number], [0.5, -0.5, 0.5] as [number, number, number],
      [0.5, -0.5, 0.5] as [number, number, number], [-0.5, -0.5, 0.5] as [number, number, number],
      [-0.5, -0.5, 0.5] as [number, number, number], [-0.5, -0.5, -0.5] as [number, number, number],
      
      // Top square
      [-0.5, 0.5, -0.5] as [number, number, number], [0.5, 0.5, -0.5] as [number, number, number],
      [0.5, 0.5, -0.5] as [number, number, number], [0.5, 0.5, 0.5] as [number, number, number],
      [0.5, 0.5, 0.5] as [number, number, number], [-0.5, 0.5, 0.5] as [number, number, number],
      [-0.5, 0.5, 0.5] as [number, number, number], [-0.5, 0.5, -0.5] as [number, number, number],
      
      // Vertical edges
      [-0.5, -0.5, -0.5] as [number, number, number], [-0.5, 0.5, -0.5] as [number, number, number],
      [0.5, -0.5, -0.5] as [number, number, number], [0.5, 0.5, -0.5] as [number, number, number],
      [0.5, -0.5, 0.5] as [number, number, number], [0.5, 0.5, 0.5] as [number, number, number],
      [-0.5, -0.5, 0.5] as [number, number, number], [-0.5, 0.5, 0.5] as [number, number, number]
    ];
  }, []);

  return (
    <Line
      points={edges}
      color="#333333"
      lineWidth={1}
      segments={true}
    />
  );
}