// decorativeBalls.js
import * as THREE from "three";

export function addBallsToLayer(layer, baseHeight, j, treeGroup) 
{
    // Array of colors for random selection
    const colors = [0xff4500, 0xffd700, 0x1e90ff, 0xee82ee, 0xff6347];
    
    //balls count at each layer
    const ballCounts = [8,6,4];
    
    for (let i = 0; i < ballCounts[j]; i++) {
        const Color = colors[Math.floor(Math.random() * colors.length)]; // Randomly select a color
        const ballMaterial = new THREE.MeshStandardMaterial({
            color: Color,
            emissive: Color,           // Same color for emissiveness
            emissiveIntensity: 0.5,    // Increase this value for stronger glow
        });
        const ball = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), ballMaterial);

        // Add a light source to each ball
        const light = new THREE.PointLight(Color, 0.5, 5); // Light with same color as ball
        light.position.set(ball.position.x, ball.position.y, ball.position.z);
        treeGroup.add(light); // Add light to the scene

        // Position balls around the base of the cone
        const radius = layer.geometry.parameters.radius - 0.075;
        const angle = (Math.PI * 2 / ballCounts[j]) * i; // Even distribution around the base

        ball.position.x = Math.cos(angle) * radius; // Circular placement
        ball.position.y = baseHeight;               // Base height of the cone
        ball.position.z = Math.sin(angle) * radius; // Circular placement

        // Sync light position with ball position
        light.position.set(ball.position.x, ball.position.y, ball.position.z);
        treeGroup.add(ball); // Add ball to the tree
    }
}
