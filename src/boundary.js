import * as THREE from "three";

// Function to create and add a decorative boundary around the snow land
export function addBoundary(scene, groundSize = 20) {
  const boundaryGroup = new THREE.Group();
  
  // Materials
  const candyCaneMaterial = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    roughness: 0.7,
    metalness: 0.2
  });
  
  const whiteCandyMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.7,
    metalness: 0.2
  });
  
  const hollyGreenMaterial = new THREE.MeshStandardMaterial({
    color: 0x005500,
    roughness: 0.8,
    metalness: 0.1
  });
  
  const berryRedMaterial = new THREE.MeshStandardMaterial({
    color: 0xcc0000,
    roughness: 0.6,
    metalness: 0.2,
    emissive: 0x330000
  });
  
  const goldMaterial = new THREE.MeshStandardMaterial({
    color: 0xffcc00,
    roughness: 0.3,
    metalness: 0.8,
    emissive: 0x331100,
    emissiveIntensity: 0.2
  });
  
  // Create candy cane posts for the corners and mid-points
  const createCandyCane = (x, z, rotationY = 0) => {
    const caneGroup = new THREE.Group();
    
    // Main candy cane post
    const postGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1.2, 8);
    
    // Create segments for red and white stripes
    const segments = 6;
    const segmentHeight = 1.2 / segments;
    
    for (let i = 0; i < segments; i++) {
      const material = i % 2 === 0 ? candyCaneMaterial : whiteCandyMaterial;
      const segmentGeometry = new THREE.CylinderGeometry(0.15, 0.15, segmentHeight, 8);
      const segment = new THREE.Mesh(segmentGeometry, material);
      segment.position.y = (i * segmentHeight) - (1.2 / 2) + (segmentHeight / 2);
      caneGroup.add(segment);
    }
    
    // Add the curved top of the candy cane
    const curveRadius = 0.3;
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.6, 0),
      new THREE.Vector3(curveRadius, 0.6, 0),
      new THREE.Vector3(curveRadius, 0.6 - curveRadius, 0)
    ]);
    
    const tubeGeometry = new THREE.TubeGeometry(curve, 8, 0.15, 8, false);
    const candyTop = new THREE.Mesh(tubeGeometry, candyCaneMaterial);
    candyTop.position.y = 0;
    caneGroup.add(candyTop);
    
    // Position the candy cane
    caneGroup.position.set(x, 0.6, z);
    caneGroup.rotation.y = rotationY;
    
    return caneGroup;
  };
  
  // Create holly decorations to place around the border
  const createHolly = () => {
    const hollyGroup = new THREE.Group();
    
    // Create holly leaves (3 leaves)
    for (let i = 0; i < 3; i++) {
      const leafGeometry = new THREE.SphereGeometry(0.25, 8, 8);
      leafGeometry.scale(1, 0.3, 0.8);
      const leaf = new THREE.Mesh(leafGeometry, hollyGreenMaterial);
      
      // Position leaves in a fan arrangement
      const angle = (i * Math.PI * 2) / 3;
      leaf.position.set(
        Math.cos(angle) * 0.2,
        0,
        Math.sin(angle) * 0.2
      );
      leaf.rotation.set(
        Math.random() * 0.3, 
        angle, 
        Math.PI / 2 + (Math.random() * 0.3 - 0.15)
      );
      hollyGroup.add(leaf);
    }
    
    // Add berries in the center
    const berryGroup = new THREE.Group();
    for (let i = 0; i < 3; i++) {
      const berryGeometry = new THREE.SphereGeometry(0.08, 8, 8);
      const berry = new THREE.Mesh(berryGeometry, berryRedMaterial);
      
      // Cluster berries close together
      berry.position.set(
        Math.random() * 0.1 - 0.05,
        Math.random() * 0.05,
        Math.random() * 0.1 - 0.05
      );
      berryGroup.add(berry);
    }
    
    hollyGroup.add(berryGroup);
    return hollyGroup;
  };
  
  // Create string of lights for the border
  const createLights = (startX, startZ, endX, endZ, segments = 8) => {
    const lightGroup = new THREE.Group();
    
    const wireGeometry = new THREE.CylinderGeometry(0.02, 0.02, 1, 4);
    wireGeometry.rotateX(Math.PI / 2);
    
    const wireLength = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endZ - startZ, 2));
    wireGeometry.scale(1, wireLength, 1);
    
    const wire = new THREE.Mesh(wireGeometry, new THREE.MeshBasicMaterial({ color: 0x333333 }));
    wire.position.set((startX + endX) / 2, 0.15, (startZ + endZ) / 2);
    wire.lookAt(endX, 0.15, endZ);
    lightGroup.add(wire);
    
    // Add decorative lights along the wire
    const lightColors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff];
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const x = startX + (endX - startX) * t;
      const z = startZ + (endZ - startZ) * t;
      
      const lightGeometry = new THREE.SphereGeometry(0.08, 6, 6);
      const lightMaterial = new THREE.MeshStandardMaterial({
        color: lightColors[i % lightColors.length],
        emissive: lightColors[i % lightColors.length],
        emissiveIntensity: 0.5
      });
      
      const light = new THREE.Mesh(lightGeometry, lightMaterial);
      light.position.set(x, 0.2, z);
      
      // Add a small point light for actual illumination
      const pointLight = new THREE.PointLight(lightColors[i % lightColors.length], 0.3, 1);
      pointLight.position.copy(light.position);
      
      lightGroup.add(light);
      lightGroup.add(pointLight);
    }
    
    return lightGroup;
  };
  
  // Create small wrapped gift decorations
  const createGift = (size = 0.3) => {
    const giftGroup = new THREE.Group();
    
    // Random gift color
    const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xff00ff, 0x00ffff];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    const boxMaterial = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.7,
      metalness: 0.2
    });
    
    // Create gift box
    const boxGeometry = new THREE.BoxGeometry(size, size, size);
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.y = size / 2;
    giftGroup.add(box);
    
    // Create ribbon
    const ribbonXGeometry = new THREE.BoxGeometry(size * 1.1, size * 0.1, size * 0.1);
    const ribbonX = new THREE.Mesh(ribbonXGeometry, goldMaterial);
    ribbonX.position.y = size / 2;
    giftGroup.add(ribbonX);
    
    const ribbonZGeometry = new THREE.BoxGeometry(size * 0.1, size * 0.1, size * 1.1);
    const ribbonZ = new THREE.Mesh(ribbonZGeometry, goldMaterial);
    ribbonZ.position.y = size / 2;
    giftGroup.add(ribbonZ);
    
    // Create bow on top
    const bowGeometry = new THREE.SphereGeometry(size * 0.2, 8, 8);
    bowGeometry.scale(1, 0.5, 1);
    const bow = new THREE.Mesh(bowGeometry, goldMaterial);
    bow.position.y = size + (size * 0.1);
    giftGroup.add(bow);
    
    return giftGroup;
  };
  
  // Create snow banks along the edges
  const createSnowBank = (length, isCorner = false) => {
    const snowGroup = new THREE.Group();
    
    const segments = isCorner ? 5 : Math.ceil(length / 2);
    for (let i = 0; i < segments; i++) {
      const snowRadius = 0.3 + Math.random() * 0.4;
      const snowGeometry = new THREE.SphereGeometry(snowRadius, 8, 6);
      snowGeometry.scale(1, 0.6, 1);
      
      const snowMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.9,
        metalness: 0.0
      });
      
      const snowPile = new THREE.Mesh(snowGeometry, snowMaterial);
      
      if (isCorner) {
        const angle = (i * Math.PI / 2) / segments;
        const radius = length * 0.7;
        snowPile.position.set(
          Math.cos(angle) * radius,
          snowRadius * 0.3,
          Math.sin(angle) * radius
        );
      } else {
        snowPile.position.set(
          (i / segments) * length - (length / 2),
          snowRadius * 0.3,
          0
        );
      }
      
      snowGroup.add(snowPile);
    }
    
    return snowGroup;
  };
  
  // Create the boundary elements around the ground perimeter
  const halfSize = groundSize / 2;
  const adjustedSize = halfSize - 0.5; // Pull in slightly from edge
  
  // Add snow banks along the edges
  for (let i = 0; i < 4; i++) {
    const edge = createSnowBank(groundSize - 1);
    edge.position.y = 0.1; // Slightly above ground
    
    switch (i) {
      case 0: // North edge
        edge.position.z = -adjustedSize;
        edge.rotation.y = 0;
        break;
      case 1: // East edge
        edge.position.x = adjustedSize;
        edge.rotation.y = Math.PI / 2;
        break;
      case 2: // South edge
        edge.position.z = adjustedSize;
        edge.rotation.y = Math.PI;
        break;
      case 3: // West edge
        edge.position.x = -adjustedSize;
        edge.rotation.y = Math.PI * 3 / 2;
        break;
    }
    
    boundaryGroup.add(edge);
  }
  
  // Add snow piles at the corners
  for (let i = 0; i < 4; i++) {
    const cornerX = i % 2 === 0 ? -adjustedSize : adjustedSize;
    const cornerZ = i < 2 ? -adjustedSize : adjustedSize;
    
    const corner = createSnowBank(2, true);
    corner.position.set(cornerX, 0.1, cornerZ);
    corner.rotation.y = (Math.PI / 2) * i;
    boundaryGroup.add(corner);
  }
  
  // Add candy canes at strategic points
  const canes = [
    createCandyCane(-adjustedSize, -adjustedSize, Math.PI / 4), // Northwest
    createCandyCane(adjustedSize, -adjustedSize, -Math.PI / 4), // Northeast
    createCandyCane(adjustedSize, adjustedSize, -Math.PI * 3 / 4), // Southeast
    createCandyCane(-adjustedSize, adjustedSize, Math.PI * 3 / 4), // Southwest
    createCandyCane(0, -adjustedSize, 0), // North center
    createCandyCane(adjustedSize, 0, Math.PI / 2), // East center
    createCandyCane(0, adjustedSize, Math.PI), // South center
    createCandyCane(-adjustedSize, 0, -Math.PI / 2) // West center
  ];
  
  canes.forEach(cane => boundaryGroup.add(cane));
  
  // Add holly decorations
  for (let i = 0; i < 12; i++) {
    const holly = createHolly();
    
    // Distribute holly around the perimeter
    const angle = (i * Math.PI * 2) / 12;
    const radius = adjustedSize;
    
    holly.position.set(
      Math.cos(angle) * radius,
      0.15,
      Math.sin(angle) * radius
    );
    
    holly.rotation.y = angle + Math.PI;
    boundaryGroup.add(holly);
  }
  
  // Add light strings along the edges
  const lights = [
    createLights(-adjustedSize, -adjustedSize, adjustedSize, -adjustedSize), // North edge
    createLights(adjustedSize, -adjustedSize, adjustedSize, adjustedSize), // East edge
    createLights(adjustedSize, adjustedSize, -adjustedSize, adjustedSize), // South edge
    createLights(-adjustedSize, adjustedSize, -adjustedSize, -adjustedSize) // West edge
  ];
  
  lights.forEach(light => boundaryGroup.add(light));
  
  // Add small gifts scattered around the boundary
  for (let i = 0; i < 8; i++) {
    const gift = createGift(0.2 + Math.random() * 0.2);
    
    // Place gifts near the corners and mid-edges
    const angle = (i * Math.PI / 4) + (Math.random() * 0.3 - 0.15);
    const radius = adjustedSize - 0.3;
    
    gift.position.set(
      Math.cos(angle) * radius,
      0,
      Math.sin(angle) * radius
    );
    
    gift.rotation.y = Math.random() * Math.PI * 2;
    boundaryGroup.add(gift);
  }
  
  // Add the boundary group to the scene
  scene.add(boundaryGroup);
  
  // Return the boundary group in case further modifications are needed
  return boundaryGroup;
}

export default addBoundary;