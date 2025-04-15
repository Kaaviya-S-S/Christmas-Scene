import * as THREE from 'three';

// Create gift boxes
function createGifts() {
    const giftsGroup = new THREE.Group();
    
    // Gift colors
    const giftColors = [
        0xFF0000, // Red
        0x0000FF, // Blue
        0xFF00FF,  // Purple
        0xC0FF03, // light green
        0x98F5F9   // Turquoise
    ];
    
    // Gift positions (relative to tree position at -1, 0, -2)
    const giftPositions = [
        { x: -0.4, y: 0.2, z: -1.1, scale: 0.4, rotation: 1.2 },
        { x: -1.75, y: 0.25, z: -1.3, scale: 0.5, rotation: -1.3 },
        { x: -1.3, y: 0.15, z: -1.1, scale: 0.3, rotation: 0.1 },
        { x: -0.9, y: 0.2, z: -2.5, scale: 0.5, rotation: 0.4 },
        { x: -1.6, y: 0.18, z: -2, scale: 0.45, rotation: -0.2 }
    ];
    
    // Create gifts
    for (let i = 0; i < 5; i++) 
    {
        // Create gift box
        const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
        const boxMaterial = new THREE.MeshStandardMaterial({ 
            color: giftColors[i % giftColors.length],
            emissive: 2
        });
        const gift = new THREE.Mesh(boxGeometry, boxMaterial);
        
        // Position and scale the gift
        const pos = giftPositions[i];
        gift.position.set(pos.x, pos.y, pos.z);
        gift.scale.set(pos.scale, pos.scale, pos.scale);
        gift.rotation.y = pos.rotation;
        
        // Add ribbons around the box
        const ribbonThickness = 0.1; // Thickness of the ribbon
        const ribbonWidth = 1; // Width of the ribbon
        const ribbonGeometryH = new THREE.PlaneGeometry(ribbonWidth, ribbonThickness);
        const ribbonGeometryV = new THREE.PlaneGeometry(ribbonThickness, ribbonWidth);
        const ribbonMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xFFFFFF, // White ribbon
            side: THREE.DoubleSide
        });

        // top side
        const ribbonTopH = new THREE.Mesh(ribbonGeometryH, ribbonMaterial);
        ribbonTopH.position.y = 0.51;
        ribbonTopH.rotation.x = Math.PI / 2;
        gift.add(ribbonTopH);
        const ribbonTopV = new THREE.Mesh(ribbonGeometryH, ribbonMaterial);
        ribbonTopV.position.y = 0.51;
        ribbonTopV.rotation.x = Math.PI / 2;
        ribbonTopV.rotation.z = Math.PI / 2;
        gift.add(ribbonTopV);

        // Side ribbons (wrap around)
        // Side 1 (Front)
        const ribbonSide1_V = new THREE.Mesh(ribbonGeometryV, ribbonMaterial);
        const ribbonSide1_H = new THREE.Mesh(ribbonGeometryH, ribbonMaterial);
        ribbonSide1_V.position.z = 0.51;
        ribbonSide1_H.position.z = 0.51;  
        ribbonSide1_H.rotation.y = Math.PI;  // Rotating for horizontal wrapping
        gift.add(ribbonSide1_V);
        gift.add(ribbonSide1_H);
        // Side 2 (Back)
        const ribbonSide2_V = new THREE.Mesh(ribbonGeometryV, ribbonMaterial);
        const ribbonSide2_H = new THREE.Mesh(ribbonGeometryH, ribbonMaterial);
        ribbonSide2_V.position.z = -0.51;
        ribbonSide2_H.position.z = -0.51;
        ribbonSide2_H.rotation.y = Math.PI;
        gift.add(ribbonSide2_V);
        gift.add(ribbonSide2_H);
        // Side 3 (Right)
        const ribbonSide3_V = new THREE.Mesh(ribbonGeometryV, ribbonMaterial);
        const ribbonSide3_H = new THREE.Mesh(ribbonGeometryH, ribbonMaterial);
        ribbonSide3_V.position.x = 0.51;
        ribbonSide3_H.position.x = 0.51;
        ribbonSide3_V.rotation.y = Math.PI/2; 
        ribbonSide3_H.rotation.y = Math.PI/2; 
        gift.add(ribbonSide3_V);
        gift.add(ribbonSide3_H);
        // Side 4 (Left)
        const ribbonSide4_V = new THREE.Mesh(ribbonGeometryV, ribbonMaterial);
        const ribbonSide4_H = new THREE.Mesh(ribbonGeometryH, ribbonMaterial);
        ribbonSide4_V.position.x = -0.51;
        ribbonSide4_H.position.x = -0.51;
        ribbonSide4_V.rotation.y = Math.PI/2; 
        ribbonSide4_H.rotation.y = Math.PI/2; 
        gift.add(ribbonSide4_V);
        gift.add(ribbonSide4_H);


        
        // Ribbon loops using TorusGeometry
        const torusGeometry = new THREE.TorusGeometry(0.1, 0.06, 16, 100);
        const bowMaterial = new THREE.MeshStandardMaterial({ color: 0xFFD700 });

        const bowLeft = new THREE.Mesh(torusGeometry, bowMaterial);
        bowLeft.position.set(-0.12, 0.55, -0.04);
        bowLeft.rotation.y = -Math.PI/4;
        bowLeft.rotation.x = Math.PI/2;
        bowLeft.rotation.z = Math.PI/4;
        gift.add(bowLeft);

        const bowRight = new THREE.Mesh(torusGeometry, bowMaterial);
        bowRight.position.set(0.12, 0.55, 0.04);
        bowRight.rotation.y = Math.PI/4;
        bowRight.rotation.x = Math.PI/2;
        bowRight.rotation.z = Math.PI/4;
        gift.add(bowRight);

        // Small knot in the middle using a cylinder
        const knotGeometry = new THREE.CylinderGeometry(0.09, 0.09, 0.1, 16);
        const knot = new THREE.Mesh(knotGeometry, bowMaterial);
        knot.position.set(0, 0.54, 0);
        knot.rotation.x = Math.PI / 2;
        gift.add(knot);
        
        giftsGroup.add(gift);
    }
    
    return giftsGroup;
}

const gifts = createGifts();
export default gifts;