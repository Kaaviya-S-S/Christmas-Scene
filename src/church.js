import * as THREE from 'three';

function addChurch() {
    const churchGroup = new THREE.Group();

    function createWindow(x, y, z) 
    {
        const windowGroup = new THREE.Group();
        
        // White frame
        const frameGeometry = new THREE.PlaneGeometry(1.2, 1.7);
        const frameMaterial = new THREE.MeshStandardMaterial({
            color: 0x8B5A2B,
            side: THREE.DoubleSide
        });
        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        
        // Yellow glass
        const glassGeometry = new THREE.PlaneGeometry(1, 1.5);
        const glassMaterial = new THREE.MeshStandardMaterial({
            color: 0xFFEB3B, //0xADD8E6,
            emissive: 0xFFEB3B, //0xADD8E6,
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

    function createLight(color) {
        const lightGeometry = new THREE.SphereGeometry(0.07, 8, 8);
        const lightMaterial = new THREE.MeshStandardMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: 2
        });
        return new THREE.Mesh(lightGeometry, lightMaterial);
    }

    // Church Structure
    const churchGeometry = new THREE.BoxGeometry(4.5, 5.3, 7.2);
    const churchMaterial = new THREE.MeshStandardMaterial({ color: 0xE6E6E6  });
    const church = new THREE.Mesh(churchGeometry, churchMaterial);
    church.position.set(-7, 1, -5);
    church.scale.set(0.45,0.45,0.45);
    churchGroup.add(church);

    // Roof --> a cube with 2 opp faces bent inward such that it forms a pyramid like structure
    const width=7.6;
    const height=3;
    const depth=6;
    const roofGeometry = new THREE.BoxGeometry(width,height,depth);
    const vertices = roofGeometry.attributes.position.array;
    // Find and modify the top vertices (y ≈ height/2)
    for (let i = 0; i < vertices.length; i += 3) {
        const y = vertices[i + 1];
        if (Math.abs(y - height/2) < 0.01) {
            vertices[i + 2] = 0; 
        }
    }
    // Update the geometry
    roofGeometry.attributes.position.needsUpdate = true;
    roofGeometry.computeVertexNormals(); // Recalculate normals for smooth lighting

    const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x8B5A2B });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.rotation.y = Math.PI / 2; 
    roof.position.set(-7.01, 2.7, -5);
    roof.scale.set(0.45,0.45,0.45);
    churchGroup.add(roof);


    // Steeple
    const steepleGeometry = new THREE.BoxGeometry(1.5, 3, 1.5);
    const steepleMaterial = new THREE.MeshStandardMaterial({ color: 0xE6E6E6 });
    const steeple = new THREE.Mesh(steepleGeometry, steepleMaterial);
    steeple.scale.set(0.5,0.5,0.5);
    steeple.position.set(-7, 3.5, -4);
    churchGroup.add(steeple);

    // steeple roof
    const steepleRoofGeometry = new THREE.ConeGeometry(1.5, 1.7, 4);
    const steepleRoofMaterial = new THREE.MeshStandardMaterial({ color: 0x8B5A2B }); 
    const steepleRoof = new THREE.Mesh(steepleRoofGeometry, steepleRoofMaterial);
    steepleRoof.scale.set(0.5,0.5,0.5);
    steepleRoof.rotation.y = Math.PI/4;
    steepleRoof.position.set(-7, 4.5, -4);
    churchGroup.add(steepleRoof);

    // Cross
    const crossVertical = new THREE.BoxGeometry(0.2, 1, 0.2);
    const crossHorizontal = new THREE.BoxGeometry(0.8, 0.2, 0.2);
    const crossMaterial = new THREE.MeshStandardMaterial({ color: 0xFFD700, emissive: 0xFFD700, emissiveIntensity: 0.2});

    const crossV = new THREE.Mesh(crossVertical, crossMaterial);
    crossV.position.set(-7, 5, -4);
    churchGroup.add(crossV);
    const crossH = new THREE.Mesh(crossHorizontal, crossMaterial);
    crossH.position.set(-7, 5.25, -4);
    churchGroup.add(crossH);

    // wreth in entrance
    const wreathGeometry = new THREE.TorusGeometry(0.3, 0.1, 16, 32);
    const wreathMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x00FF00, // Green
        emissive: 0x1B5E20,
        emissiveIntensity: 0.3
    });
    const wreath = new THREE.Mesh(wreathGeometry, wreathMaterial);
    wreath.position.set(-7, 1.5, -3.3);
    wreath.scale.set(0.75,0.75,0.75);
    churchGroup.add(wreath);

    const window1 = createWindow(-5.95, 1.3, -4.3);
    window1.rotation.y = Math.PI/2;
    window1.scale.set(0.6, 0.6, 0.6);
    churchGroup.add(window1);
    const window2 = createWindow(-5.95, 1.3, -5.7);
    window2.rotation.y = Math.PI/2;
    window2.scale.set(0.6, 0.6, 0.6);
    churchGroup.add(window2);

    const window3 = createWindow(-8.02, 1.3, -4.3);
    window3.rotation.y = -Math.PI/2;
    window3.scale.set(0.6, 0.6, 0.6);
    churchGroup.add(window3);
    const window4 = createWindow(-8.02, 1.3, -5.7);
    window4.rotation.y = -Math.PI/2;
    window4.scale.set(0.6, 0.6, 0.6);
    churchGroup.add(window4);

    const steepleWindow = createWindow(-7, 3.7, -3.6);
    steepleWindow.scale.set(0.25, 0.25, 0.25);
    churchGroup.add(steepleWindow);

    // door 
    const doorframeGeometry = new THREE.PlaneGeometry(0.7, 1.1);
    const doorframeMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8B5A2B, 
        side: THREE.DoubleSide
    });
    const doorframe = new THREE.Mesh(doorframeGeometry, doorframeMaterial);
    doorframe.position.set(-7, 0.6, -3.35);
    churchGroup.add(doorframe);

    const doorGeometry = new THREE.PlaneGeometry(0.6, 1);
    const doorMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xE5843F, 
        side: THREE.DoubleSide
    });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(-7, 0.6, -3.34);
    churchGroup.add(door);

    // Door step
    const stepGeometry = new THREE.BoxGeometry(0.7, 0.2, 0.4);
    const stepMaterial = new THREE.MeshStandardMaterial({ color: 0x5D4037 }); // Brown
    const step = new THREE.Mesh(stepGeometry, stepMaterial);
    step.position.set(-7, 0, -3.35);
    churchGroup.add(step);

    // Lights
    const lightColors = [
        0xFF0000, // Red
        0x0000FF, // Blue
        0xFFFF00, // Yellow
        0xFF00FF, // Purple
        0x00FFFF,  // Cyan
        0x00FF00 // Green
    ];
    const lightsGroup = new THREE.Group();
    for (let i = 0; i < 5; i++) 
    {   
        const baselight = createLight(0xFFFFFF);
        const light = createLight(lightColors[i % lightColors.length]);
        const x = -6.9 + i * 0.2;     
        const y = (1.95) - i * 0.15;  
        const z = -3.4; 
        baselight.position.set(x,y,z);
        light.position.set(x, y, z+0.1  ); 
        lightsGroup.add(baselight);
        lightsGroup.add(light);

        const pointlight = new THREE.PointLight(lightColors[i % lightColors.length], 0.02, 0.25); 
        pointlight.position.set(x, y, z+0.1);
        lightsGroup.add(pointlight); 
    }
    for (let i = 0; i < 5; i++) 
    {   
        const baselight = createLight(0xFFFFFF);
        const light = createLight(lightColors[i % lightColors.length]);
        const x = -7.1 - i * 0.2;     
        const y = (1.95) - i * 0.15;  
        const z = -3.4; 
        baselight.position.set(x,y,z);
        light.position.set(x, y, z+0.1  ); 
        lightsGroup.add(baselight);
        lightsGroup.add(light);

        const pointlight = new THREE.PointLight(lightColors[i % lightColors.length], 0.02, 0.25);
        pointlight.position.set(x, y, z+0.1);
        lightsGroup.add(pointlight); 
    }
    churchGroup.add(lightsGroup);


    // Animate Christmas lights
    function animateLights() {
        lightsGroup.children.forEach((light, index) => {
            // Make lights twinkle
            if (light.material && 'emissiveIntensity' in light.material) {
                light.material.emissiveIntensity = 0.7 + 0.3 * Math.sin(Date.now() * 0.005 + index * 0.1);
            }
        });
        requestAnimationFrame(animateLights);
    }
    animateLights();   

    return churchGroup;
}

const church = addChurch();
export default church;