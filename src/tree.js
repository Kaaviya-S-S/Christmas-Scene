import * as THREE from "three";
import star from "./star.js";  // Import the star
import { addBallsToLayer } from "./decorativeBalls.js";
import stripLight from "./stripLight.js";

function createChristmasTree()
{
    const treeGroup = new THREE.Group();

    // Tree Material (Green)
    const treeMaterial = new THREE.MeshStandardMaterial({
        color: 0x3DD33D, // Green color
        emissive: 0x0AE50A, // Green glow
        emissiveIntensity: 0.2, // Adjust intensity for a subtle glow
    });

    // Creating tree layers (stacked cones)
    const layer1 = new THREE.Mesh(new THREE.ConeGeometry(1, 1.5, 16), treeMaterial);
    const layer2 = new THREE.Mesh(new THREE.ConeGeometry(0.8, 1.2, 16), treeMaterial);
    const layer3 = new THREE.Mesh(new THREE.ConeGeometry(0.6, 0.9, 16), treeMaterial);

    // Position tree layers (Stacking them)
    layer1.position.y = 0.2;
    layer2.position.y = 1.1;
    layer3.position.y = 1.8;

    // Tree Trunk (Brown Cylinder)
    const trunkMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.6, 12), trunkMaterial);
    trunk.position.y = -0.8;

    // Position the star at the top
    star.position.set(0, 2.4, -0.05);
    star.scale.set(0.45, 0.45, 0.45);  // Adjust size to fit tree

    // Add balls to each layer
    addBallsToLayer(layer1, -0.3, 0, treeGroup); // Position balls for layer 1
    addBallsToLayer(layer2, 0.7, 1, treeGroup); // Position balls for layer 2
    addBallsToLayer(layer3, 1.6, 2, treeGroup); // Position balls for layer 3

    // Add all parts to the tree group
    treeGroup.add(layer1);
    treeGroup.add(layer2);
    treeGroup.add(layer3);
    treeGroup.add(trunk);
    treeGroup.add(star);
    treeGroup.add(stripLight);

    return treeGroup;
}

// Create and export the Christmas tree
const christmasTree = createChristmasTree();
export default christmasTree;
