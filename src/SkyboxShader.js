import * as THREE from 'three';

export const SkyboxShader = {
  uniforms: {
    topColor: { value: new THREE.Color(0x4169E1) },  // Royal Blue
    bottomColor: { value: new THREE.Color(0x4a148c) },  // Dark purple for the horizon
    offset: { value: 4 },
    exponent: { value: 0.9 },
    starIntensity: { value: 0.0005 },  // Control the density of stars
  },
  vertexShader: /* glsl */ `
    varying vec3 vWorldPosition;

    void main() {
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
  fragmentShader: /* glsl */ `
    uniform vec3 topColor;
    uniform vec3 bottomColor;
    uniform float offset;
    uniform float exponent;
    uniform float starIntensity;

    varying vec3 vWorldPosition;

    // Random function to generate stars
    float random(vec2 uv) {
      return fract(sin(dot(uv.xy, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      float h = normalize(vWorldPosition + offset).y;

      // Background gradient
      vec3 skyColor = mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0));

      // Generate random stars
      vec2 uv = vWorldPosition.xz * 0.01;  // Scale world position to control star distribution
      float starValue = random(uv);
      float star = step(1.0 - starIntensity, starValue);  // Star threshold

      // Make stars bright white
      vec3 starColor = vec3(1.0);

      // Mix stars with the background
      gl_FragColor = vec4(mix(skyColor, starColor, star), 1.0);
    }`,
};
