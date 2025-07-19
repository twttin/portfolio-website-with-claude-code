import * as THREE from 'three';

export default function ColorCube() {
  // Create vertices for a cube from (-0.5,-0.5,-0.5) to (0.5,0.5,0.5)
  const vertices = new Float32Array([
    // Front face
    -0.5, -0.5, -0.5,   0.5, -0.5, -0.5,   0.5, 0.5, -0.5,
    -0.5, -0.5, -0.5,   0.5, 0.5, -0.5,   -0.5, 0.5, -0.5,
    // Back face
    -0.5, -0.5, 0.5,    0.5, -0.5, 0.5,    0.5, 0.5, 0.5,
    -0.5, -0.5, 0.5,    0.5, 0.5, 0.5,    -0.5, 0.5, 0.5,
    // Top face
    -0.5, 0.5, -0.5,    0.5, 0.5, -0.5,    0.5, 0.5, 0.5,
    -0.5, 0.5, -0.5,    0.5, 0.5, 0.5,    -0.5, 0.5, 0.5,
    // Bottom face
    -0.5, -0.5, -0.5,   0.5, -0.5, -0.5,   0.5, -0.5, 0.5,
    -0.5, -0.5, -0.5,   0.5, -0.5, 0.5,   -0.5, -0.5, 0.5,
    // Right face
    0.5, -0.5, -0.5,    0.5, -0.5, 0.5,    0.5, 0.5, 0.5,
    0.5, -0.5, -0.5,    0.5, 0.5, 0.5,    0.5, 0.5, -0.5,
    // Left face
    -0.5, -0.5, -0.5,   -0.5, -0.5, 0.5,   -0.5, 0.5, 0.5,
    -0.5, -0.5, -0.5,   -0.5, 0.5, 0.5,   -0.5, 0.5, -0.5,
  ]);

  // Custom vertex shader - adjust for centered coordinates
  const vertexShader = `
    varying vec3 vColor;
    void main() {
      // Convert from -0.5 to 0.5 range to 0 to 1 range for color
      vColor = (position + 0.5) * 255.0;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  // Fragment shader remains the same
  const fragmentShader = `
    varying vec3 vColor;
    void main() {
      gl_FragColor = vec4(vColor.x / 255.0, vColor.y / 255.0, vColor.z / 255.0, 1.0);
    }
  `;

  return (
    <mesh>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={vertices.length / 3}
          array={vertices}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}