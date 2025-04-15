import * as THREE from "three";

// Create a Ground Plane
const planeGeometry = new THREE.PlaneGeometry(20, 20); // Large ground
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xF9F8F8,  roughness: 10, side: THREE.DoubleSide }); // White ground
const groundPlane = new THREE.Mesh(planeGeometry, planeMaterial);
groundPlane.rotation.x = -Math.PI / 2; // Rotate to be flat on XZ plane
groundPlane.position.y = 0;  // Keep ground at y = 0

export default groundPlane;