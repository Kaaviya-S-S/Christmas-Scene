import * as THREE from "three";

function createEnhancedLights() 
{
    const lightsGroup = new THREE.Group();
    
    // Colors for the Christmas lights
    const lightColors = [
        0xFF0000, // Red
        0x00FF00, // Green
        0x0000FF, // Blue
        0xFFFF00, // Yellow
        0xFF00FF, // Purple
        0x00FFFF  // Cyan
    ];
    
    // Add lights along the front bottom edge of the roof
    for (let i = 0; i < 20; i++) {
        const light = createLight(lightColors[i % lightColors.length]);
        const t = i / 19;
        const x = -2.2 + t * 4.4;
        light.position.set(x, 2.5, 1.25); // Moved slightly forward for visibility
        lightsGroup.add(light);
    }
    
    // Add lights along the left roof edge to peak
    for (let i = 0; i < 10; i++) {
        const light = createLight(lightColors[(i + 2) % lightColors.length]);
        const t = i / 9;
        const x = -2.2 + t * 2.2;
        const y = 2.6 + t * 1.5;
        const z = 1.1 - t * 1.2;  
        light.position.set(x, y, z);
        lightsGroup.add(light);
    }
    
    // Add lights along the right roof edge to peak
    for (let i = 0; i < 10; i++) {
        const light = createLight(lightColors[(i + 4) % lightColors.length]);
        const t = i / 9;
        const x = 2.2 - t * 2.2;
        const y = 2.6 + t * 1.5;
        const z = 1.1 - t * 1.2; 
        light.position.set(x, y, z);
        lightsGroup.add(light);
    }
    

    // Add lights around the windows
    function addWindowLights(windowX, windowZ) 
    {
        // Create a square of lights around the window
        const windowSize = 1; // Slightly larger than the window
        for (let i = 0; i < 12; i++) {
            const light = createLight(lightColors[i % lightColors.length]);
            const halfSize = windowSize / 2;
            if (i < 3) {
                // Top of window
                const t = i / 2;
                light.position.set(windowX - halfSize + t * windowSize, 1.7, windowZ);
            } else if (i < 6) {
                // Right of window
                const t = (i - 3) / 2;
                light.position.set(windowX + halfSize, 1.7 - t * windowSize, windowZ);
            } else if (i < 9) {
                // Bottom of window
                const t = (i - 6) / 2;
                light.position.set(windowX + halfSize - t * windowSize, 0.7, windowZ);
            } else {
                // Left of window
                const t = (i - 9) / 2;
                light.position.set(windowX - halfSize, 0.7 + t * windowSize, windowZ);
            }
            lightsGroup.add(light);
        }
    }
    
    // Add lights around the left and right windows
    addWindowLights(-1.2, 1.05);
    addWindowLights(1.2, 1.05);
    
    // Door and chimney lights have been removed as requested
    // Enhanced animation for the lights
    function animateLights() {
        const time = Date.now() * 0.003;
        
        lightsGroup.children.forEach((light, index) => {
            // Different animation patterns
            const pattern = index % 4;
            
            if (pattern === 0) {
                // Smooth pulsing
                light.material.emissiveIntensity = 0.6 + 0.4 * Math.sin(time + index * 0.1);
            } else if (pattern === 1) {
                // Blinking
                light.material.emissiveIntensity = (Math.sin(time * 1.5 + index * 0.2) > 0) ? 1.0 : 0.3;
            } else if (pattern === 2) {
                // Wave pattern
                light.material.emissiveIntensity = 0.6 + 0.4 * Math.sin(time * 0.8 + index * 0.3);
            } else {
                // Chase effect
                light.material.emissiveIntensity = 0.6 + 0.4 * Math.sin(time * 2 + index * 0.5);
            }
        });
        
        requestAnimationFrame(animateLights);
    }
    
    animateLights();
    
    return lightsGroup;
}



function createLight(color = 0xFFFFFF) {
    const lightGeometry = new THREE.SphereGeometry(0.08, 8, 8);
    const lightMaterial = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.8
    });
    return new THREE.Mesh(lightGeometry, lightMaterial);
}

// Create a house that matches the reference image with simple geometric shapes
function createHouse() {
    const houseGroup = new THREE.Group();
    
    // Main house structure (simple box)
    const houseGeometry = new THREE.BoxGeometry(4, 2.5, 2);
    const houseMaterial = new THREE.MeshStandardMaterial({ color: 0xB71C1C }); // Dark red color
    const house = new THREE.Mesh(houseGeometry, houseMaterial);
    house.position.y = 1.25; // Half height to put bottom at ground level
    
    // Create a simple triangular roof
    const roofMaterial = new THREE.MeshStandardMaterial({
        color: 0x3E2723, // Dark brown
        //color: 0xffffff, // white
        side: THREE.DoubleSide
    });
    
    // Create a simple triangular roof - carefully align all sides
    const roofGroup = new THREE.Group();
    
    // Ensure all faces share exact coordinates so they align perfectly
    const roofHeight = 1.5;
    const roofWidth = 4.4;
    const roofDepth = 2.4;
    const halfWidth = roofWidth / 2;
    const halfDepth = roofDepth / 2;
    
    // Front face
    const frontGeometry = new THREE.BufferGeometry();
    const frontVertices = new Float32Array([
        -halfWidth, 0, halfDepth,    // bottom left
        halfWidth, 0, halfDepth,     // bottom right
        0, roofHeight, 0             // top center
    ]);
    frontGeometry.setAttribute('position', new THREE.BufferAttribute(frontVertices, 3));
    frontGeometry.computeVertexNormals();
    const frontRoof = new THREE.Mesh(frontGeometry, roofMaterial);
    roofGroup.add(frontRoof);
    
    // Back face
    const backGeometry = new THREE.BufferGeometry();
    const backVertices = new Float32Array([
        halfWidth, 0, -halfDepth,    // bottom left
        -halfWidth, 0, -halfDepth,   // bottom right
        0, roofHeight, 0             // top center
    ]);
    backGeometry.setAttribute('position', new THREE.BufferAttribute(backVertices, 3));
    backGeometry.computeVertexNormals();
    const backRoof = new THREE.Mesh(backGeometry, roofMaterial);
    roofGroup.add(backRoof);
    
    // Left face
    const leftGeometry = new THREE.BufferGeometry();
    const leftVertices = new Float32Array([
        -halfWidth, 0, -halfDepth,   // bottom back
        -halfWidth, 0, halfDepth,    // bottom front
        0, roofHeight, 0             // top center
    ]);
    leftGeometry.setAttribute('position', new THREE.BufferAttribute(leftVertices, 3));
    leftGeometry.computeVertexNormals();
    const leftRoof = new THREE.Mesh(leftGeometry, roofMaterial);
    roofGroup.add(leftRoof);
    
    // Right face
    const rightGeometry = new THREE.BufferGeometry();
    const rightVertices = new Float32Array([
        halfWidth, 0, halfDepth,     // bottom front
        halfWidth, 0, -halfDepth,    // bottom back
        0, roofHeight, 0             // top center
    ]);
    rightGeometry.setAttribute('position', new THREE.BufferAttribute(rightVertices, 3));
    rightGeometry.computeVertexNormals();
    const rightRoof = new THREE.Mesh(rightGeometry, roofMaterial);
    roofGroup.add(rightRoof);

    // Position the entire roof group
    roofGroup.position.y = 2.5;
    
    // Add chimney
    const chimneyGeometry = new THREE.BoxGeometry(0.6, 1.2, 0.6);
    const chimneyMaterial = new THREE.MeshStandardMaterial({ color: 0x5D4037 }); // Brown
    const chimney = new THREE.Mesh(chimneyGeometry, chimneyMaterial);
    chimney.position.set(1.2, 3.5, 0); // On right side of roof
    
    // Front door 
    const doorframeGeometry = new THREE.PlaneGeometry(1.1, 1.8);
    const doorframeMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xFFFFFF, 
        side: THREE.DoubleSide
    });
    const doorframe = new THREE.Mesh(doorframeGeometry, doorframeMaterial);
    doorframe.position.set(0, 0.9, 1.02);
    const doorGeometry = new THREE.PlaneGeometry(1.05, 1.75);
    const doorMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xA77B37, 
        side: THREE.DoubleSide
    });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(0, 0.9, 1.03); 

    // Door step
    const stepGeometry = new THREE.BoxGeometry(1.1, 0.2, 0.4);
    const stepMaterial = new THREE.MeshStandardMaterial({ color: 0x5D4037 }); // Brown
    const step = new THREE.Mesh(stepGeometry, stepMaterial);
    step.position.set(0, 0.1, 1.21);
    
    // Windows (yellow squares with white frames)
    function createWindow(x, y, z) {
        const windowGroup = new THREE.Group();
        
        // White frame
        const frameGeometry = new THREE.PlaneGeometry(1.2, 1.2);
        const frameMaterial = new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
            side: THREE.DoubleSide
        });
        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        
        // Yellow glass
        const glassGeometry = new THREE.PlaneGeometry(1, 1);
        const glassMaterial = new THREE.MeshStandardMaterial({
            color: 0xFFEB3B,
            emissive: 0xFFD600,
            emissiveIntensity: 0.5,
            side: THREE.DoubleSide
        });
        const glass = new THREE.Mesh(glassGeometry, glassMaterial);
        glass.position.z = 0.01;
        
        windowGroup.add(frame);
        windowGroup.add(glass);
        windowGroup.position.set(x, y, z);
        
        return windowGroup;
    }
    
    // Create windows
    const leftWindow = createWindow(-1.2, 1.2, 1.01);
    leftWindow.scale.set(0.75, 0.75, 0.75);
    const rightWindow = createWindow(1.2, 1.2, 1.01);
    rightWindow.scale.set(0.75, 0.75, 0.75);
    const backside_window = createWindow(-0.05, 1.3, -1.01);
    backside_window.rotation.y = Math.PI;
    backside_window.scale.set(2, 0.75, 0.75)

    // Christmas wreath on door (green ring)
    const wreathGeometry = new THREE.TorusGeometry(0.3, 0.1, 16, 32);
    const wreathMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x00FF00, // Green
        emissive: 0x1B5E20,
        roughness: 5,
        emissiveIntensity: 0.3
    });
    const wreath = new THREE.Mesh(wreathGeometry, wreathMaterial);
    wreath.position.set(0, 1.5, 1.02); // Above the door
    
    // Add Christmas lights along the roof edges
    const lightsGroup = new THREE.Group();
    // Add lights along the front bottom edge of the roof
    for (let i = 0; i < 20; i++) {
        const light = createLight();
        const t = i / 19;
        const x = -2.2 + t * 4.4;
        light.position.set(x, 2.5, 1.01);
        lightsGroup.add(light);
    }
    
    // Add lights along the left roof edge to peak
    for (let i = 0; i < 10; i++) {
        const light = createLight();
        const t = i / 9;
        const x = -2.2 + t * 2.2;
        const y = 2.5 + t * 1.5;
        const z = 1.1 - t * 1.2;  
        light.position.set(x, y, z);
        lightsGroup.add(light);
    }
    
    // Add lights along the right roof edge to peak
    for (let i = 0; i < 10; i++) {
        const light = createLight();
        const t = i / 9;
        const x = 2.2 - t * 2.2;
        const y = 2.5 + t * 1.5;
        const z = 1.1 - t * 1.2;  
        light.position.set(x, y, z);
        lightsGroup.add(light);
    }
    
    // Add all parts to the house group
    houseGroup.add(house);
    houseGroup.add(roofGroup);
    houseGroup.add(doorframe);
    houseGroup.add(door);
    houseGroup.add(step);
    houseGroup.add(leftWindow);
    houseGroup.add(rightWindow);
    houseGroup.add(backside_window);
    houseGroup.add(wreath);
    houseGroup.add(chimney);
    houseGroup.add(lightsGroup);
    houseGroup.add(createEnhancedLights());

    // Animate Christmas lights
    function animateLights() {
        lightsGroup.children.forEach((light, index) => {
            // Make lights twinkle
            light.material.emissiveIntensity = 0.7 + 0.3 * Math.sin(Date.now() * 0.003 + index * 0.1);
        });
        
        requestAnimationFrame(animateLights);
    }
    
    animateLights();
    
    return houseGroup;
}

// Export the house
export const house = createHouse();

// Export a function to add it to the scene
export function addHouseAndGifts(scene) {
    // Position the house
    house.position.set(3, 0, -2.5);
    house.scale.set(0.7, 0.7, 0.7); // Reduced scale to make house smaller (50% of original size)
    house.rotation.y = -Math.PI / 6; // Slight rotation to show more of the side
    
    // Add to scene
    scene.add(house);
    
    console.log('House (smaller size) added to scene');
}