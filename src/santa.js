import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function loadSanta(scene) {
    const loader = new GLTFLoader();
    
    loader.load(
        "assests/jolly_santa.glb",  // Ensure the path to the .glb file is correct
        function (gltf) {
            // Access the loaded model (the 'scene' property contains the glTF scene)
            const santa = gltf.scene;
            
            // Make Santa quite bigger
            santa.scale.set(40, 40, 40);
            
            // Position the model to the left of the Christmas tree
            santa.position.set(-2.5, 0, 0);
            
            // Rotate Santa to face toward the camera/viewer
            santa.rotation.y = Math.PI * 2; // This will make Santa face more toward the camera
            
            // Try to adjust Santa's appearance if possible
            // Some GLTF models allow for material adjustments
            santa.traverse((child) => {
                if (child.isMesh) {
                    // Brighten materials slightly if possible
                    if (child.material) {
                        if (Array.isArray(child.material)) {
                            child.material.forEach(mat => {
                                if (mat.color) mat.color.multiplyScalar(1.2); // Make colors brighter
                            });
                        } else {
                            if (child.material.color) child.material.color.multiplyScalar(1.2);
                        }
                    }
                }
            });
            
            // Add the model to the scene
            scene.add(santa);
            console.log("added success");
        },
        undefined,
        function (error) {
            console.error('An error occurred loading the santa model:', error);
        }
    );
}

// Export an empty object as a placeholder until the real model is loaded
const santa = new THREE.Group();
export default santa;