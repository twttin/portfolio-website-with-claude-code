import { useMemo } from 'react';
import { Html } from '@react-three/drei';

interface CubeLabelsProps {
  showLabels: boolean;
}

export default function CubeLabels({ showLabels }: CubeLabelsProps) {
  const vertices = useMemo(() => [
    // Format: [x, y, z, label, color]
    [-0.5, -0.5, -0.5, '(0,0,0)', 'rgb(0,0,0)'],
    [0.5, -0.5, -0.5, '(255,0,0)', 'rgb(255,0,0)'],
    [0.5, 0.5, -0.5, '(255,255,0)', 'rgb(255,255,0)'],
    [-0.5, 0.5, -0.5, '(0,255,0)', 'rgb(0,255,0)'],
    [-0.5, -0.5, 0.5, '(0,0,255)', 'rgb(0,0,255)'],
    [0.5, -0.5, 0.5, '(255,0,255)', 'rgb(255,0,255)'],
    [0.5, 0.5, 0.5, '(255,255,255)', 'rgb(255,255,255)'],
    [-0.5, 0.5, 0.5, '(0,255,255)', 'rgb(0,255,255)']
  ], []);

  return (
    <>
      {vertices.map(([x, y, z, label, color], index) => (
        <Html
          key={index}
          position={[x as number, y as number, z as number]}
          center
          style={{
            background: showLabels ? 'rgba(255,255,255,0.7)' : 'transparent',
            padding: showLabels ? '1px 1px' : '0',
            borderRadius: showLabels ? '1px' : '0',
            fontSize: '4px',
            fontFamily: 'monospace',
            pointerEvents: 'none',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            color: '#000',
            transform: 'scale(0.3)',
            border: showLabels ? '1px solid rgba(0,0,0,0.1)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '2px'
          }}
          transform
          sprite
          distanceFactor={15}
          zIndexRange={[10000, 0]}
        >
          <div
            style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: color as string,
              border: showLabels ? '1px solid rgba(0,0,0,0.2)' : 'none'
            }}
          />
          {showLabels && label}
        </Html>
      ))}
    </>
  );
}