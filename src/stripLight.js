import * as THREE from "three";

// Function to create a glowing strip light around the tree
function createStripLight() 
{
    // Create a curve for the spiral path
    const curve = new THREE.Curve();
    curve.getPoint = function (t) {
        const angle = Math.PI * 8.5 * t; // Adjust for spiral rotations
        const radius = 0.75 - (t * 0.25); // Spiral radius
        const height = t * 2 - 0.35; // Height matches tree's height
        return new THREE.Vector3(
            Math.cos(angle) * radius,
            height,
            Math.sin(angle) * radius
        );
    }

    // Create Tube Geometry based on the curve
    const tubeGeometry = new THREE.TubeGeometry(curve, 200, 0.02, 12, false);

    // Create material with emissive glow
    const stripMaterial = new THREE.MeshStandardMaterial({
        color: 0xffd700, // Golden color for festive glow
        emissive: 0xffd700, // Glow color
        emissiveIntensity: 20, // Strong glow effect
    });

    // Create mesh
    const stripLight = new THREE.Mesh(tubeGeometry, stripMaterial);

    return stripLight;
}

// Add the strip light to the tree group
const stripLight = createStripLight();
export default stripLight;