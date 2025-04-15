import * as THREE from 'three';

export function addSnow(scene) {
    const snowflakeCount = 3000;
    const snowflakes = [];

    const snowflakeGeometry = new THREE.SphereGeometry(0.03, 5, 5); // Small spheres for snowflakes
    const snowflakeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff,
                                                            transparent: true, // Enable transparency
                                                            opacity: 0.7       // Adjust transparency level (0 is fully transparent, 1 is fully opaque)
                                                        });

    // Create individual snowflakes
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = new THREE.Mesh(snowflakeGeometry, snowflakeMaterial);

        // Random initial position of the snowflake
        snowflake.position.x = Math.random() * 20 - 10; // X position
        snowflake.position.y = Math.random() * 10 + 5;  // Y position (starting height)
        snowflake.position.z = Math.random() * 20 - 10; // Z position

        scene.add(snowflake);
        snowflakes.push(snowflake);  // Store snowflake for animation
    }

    // Animate snowflakes falling
    function animateSnow() {
        for (let i = 0; i < snowflakeCount; i++) {
            const snowflake = snowflakes[i];
            snowflake.position.y -= 0.02; // Move snowflake down slowly

            // If snowflake goes below ground (y < 0), reset to top
            if (snowflake.position.y < 0) {
                snowflake.position.y = 10; // Reset to the top
                snowflake.position.x = Math.random() * 20 - 10; // Random X position
                snowflake.position.z = Math.random() * 20 - 10; // Random Z position
            }
        }
    }

    // Start the animation loop for the snow
    function animate() {
        requestAnimationFrame(animate);
        animateSnow();  // Update snowflake positions
    }

    animate();  // Start the animation loop
}
