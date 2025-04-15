import * as THREE from "three";

// Create a snowman function that can be exported
function createSnowman() {
    const snowmanGroup = new THREE.Group();
    
    // Create three spheres for the snowman's body (bottom, middle, top)
    const snowMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xFFFFFF,
        roughness: 20 
    });
    const redMaterial = new THREE.MeshStandardMaterial({
        color: 0xCC0000,  // Bright red color
        roughness: 0.3,
        metalness: 0.1
    });
    
    // Bottom sphere (largest)
    const bottomGeometry = new THREE.SphereGeometry(0.8, 20, 20);
    const bottomSphere = new THREE.Mesh(bottomGeometry, snowMaterial);
    bottomSphere.position.y = 0.7; // Half its height above ground
    snowmanGroup.add(bottomSphere);
    
    // Middle sphere
    const middleGeometry = new THREE.SphereGeometry(0.6, 20, 20);
    const middleSphere = new THREE.Mesh(middleGeometry, snowMaterial);
    middleSphere.position.y = 1.9; // Position on top of bottom sphere
    snowmanGroup.add(middleSphere);
    
    // Head sphere (smallest)
    const headGeometry = new THREE.SphereGeometry(0.4, 20, 20);
    const headSphere = new THREE.Mesh(headGeometry, snowMaterial);
    headSphere.position.y = 2.7; // Position on top of middle sphere
    snowmanGroup.add(headSphere);
    
    // Carrot nose - made longer and positioned correctly on front of face
    const noseGeometry = new THREE.ConeGeometry(0.18, 0.9, 12);
    const noseMaterial = new THREE.MeshStandardMaterial({ color: 0xFF8800 });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.set(0, 2.7, 0.4); // Centered on front of face
    nose.rotation.x = Math.PI / 2; // Point it outward horizontally
    snowmanGroup.add(nose);
    
    // Coal eyes - positioned on front face
    const eyeGeometry = new THREE.SphereGeometry(0.05, 10, 10);
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.15, 2.8, 0.35);
    snowmanGroup.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.15, 2.8, 0.35);
    snowmanGroup.add(rightEye);
    
    
    // Coal buttons - aligned vertically on front
    for (let i = 0; i < 3; i++) {
        const button = new THREE.Mesh(eyeGeometry, eyeMaterial);
        button.scale.set(1.5, 1.5, 1.5); // Slightly larger than eyes
        button.position.set(0, 2.1 - i * 0.4, 0.6);
        snowmanGroup.add(button);
    }
    
    // Add stick arms
    const armMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    
    // Left arm - extending from side with slight upward angle
    const leftArmGeometry = new THREE.CylinderGeometry(0.05, 0.03, 1, 8);
    const leftArm = new THREE.Mesh(leftArmGeometry, armMaterial);
    leftArm.position.set(-0.7, 2.1, 0.0);
    leftArm.rotation.set(0, 0, Math.PI / 6);
    snowmanGroup.add(leftArm);
    
    // Right arm - extending from side with slight upward angle
    const rightArmGeometry = new THREE.CylinderGeometry(0.05, 0.03, 1, 8);
    const rightArm = new THREE.Mesh(rightArmGeometry, armMaterial);
    rightArm.position.set(0.7, 2.1, 0.0);
    rightArm.rotation.set(0, 0, -Math.PI / 6);
    snowmanGroup.add(rightArm);
    
    // Add a top hat
    const hatGroup = new THREE.Group();
    
    // Hat brim
    const hatBrimGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.1, 20);
    const hatBrim = new THREE.Mesh(hatBrimGeometry, redMaterial);
    hatGroup.add(hatBrim);
    
    // Hat top
    const hatTopGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.4, 20);
    const hatTop = new THREE.Mesh(hatTopGeometry, redMaterial);
    hatTop.position.y = 0.25; // Half height of cylinder
    hatGroup.add(hatTop);
    
    // Position hat on top of head - centered
    hatGroup.position.y = 3.15;
    snowmanGroup.add(hatGroup);
    
    // Add a small white puff on top of the hat
    const puffGeometry = new THREE.SphereGeometry(0.1, 10, 10);
    const puffMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    const puff = new THREE.Mesh(puffGeometry, puffMaterial);
    puff.position.set(0, 3.6, 0);
    snowmanGroup.add(puff);

    return snowmanGroup;
}

// Create snowman instance
const snowman = createSnowman();

// Function to add the snowman to the scene
function addSnowman(scene) 
{
    snowman.position.set(5, 0, -0.55);
    snowman.scale.set(0.7, 0.7, 0.7); // Scale to match house size
    
    // Rotate to face the same direction as the house
    snowman.rotation.y = -Math.PI / 6; // Match the house rotation

    // Add to scene
    scene.add(snowman);
    
    console.log('Snowman added to scene');
}

// Export both the snowman and the function
export { snowman, addSnowman };