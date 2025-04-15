import * as THREE from "three";

export function createSleigh() {
  const sleighGroup = new THREE.Group();
  
  // Materials
  const redMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xcc0000,
    roughness: 0.5, 
    metalness: 0.2
  });
  
  const goldMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xFFD700, 
    roughness: 0.3, 
    metalness: 0.5
  });
  
  const santaSackMaterial = new THREE.MeshStandardMaterial({
    color: 0xCC0000, // Bright red
    roughness: 0.8,
    metalness: 0.1
  });
  
  const whiteFurMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF, // White
    roughness: 50
  });
  
  const reindeerBodyMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xDFC57B, // gold
    roughness: 10
  });
  
  const reindeerLegMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xDFC57B, //gold
    roughness: 10
  });
  
  const reindeerNeckMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xDFC57B, // gold
    roughness: 10
  });

  const antlerMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x705146, // brown
    roughness: 0.8
  });

  
  // Sleigh body
  const sleighBodyGeometry = new THREE.BoxGeometry(2, 0.5, 1.5);
  const sleighBody = new THREE.Mesh(sleighBodyGeometry, redMaterial);
  sleighBody.position.y = 0.5;
  sleighGroup.add(sleighBody);
  
  // Sleigh back
  const sleighBackGeometry = new THREE.BoxGeometry(0.4, 1.2, 1.5);
  const sleighBack = new THREE.Mesh(sleighBackGeometry, redMaterial);
  sleighBack.position.set(-1, 0.6, 0);
  sleighGroup.add(sleighBack);
  
  // Gold trim - fixed height to be visible
  const trimGeometry = new THREE.BoxGeometry(2, 0.1, 1.5);
  const trim = new THREE.Mesh(trimGeometry, goldMaterial);
  trim.position.y = 0.8;
  sleighGroup.add(trim);
  
  // Gold runners
  const runnerGeometry = new THREE.BoxGeometry(2.5, 0.1, 0.2);
  
  // Left runner
  const leftRunner = new THREE.Mesh(runnerGeometry, goldMaterial);
  leftRunner.position.set(0, 0, 0.7);
  sleighGroup.add(leftRunner);
  
  // Right runner
  const rightRunner = new THREE.Mesh(runnerGeometry, goldMaterial);
  rightRunner.position.set(0, 0, -0.7);
  sleighGroup.add(rightRunner);
  
  // Add reindeer properly positioned in parallel
  const reindeerTeam = createReindeerTeam(reindeerBodyMaterial, reindeerLegMaterial, reindeerNeckMaterial, antlerMaterial);
  sleighGroup.add(reindeerTeam);
  
  // Add harness lines
  addHarnessLines(sleighGroup);
  
  // Add Santa sack on top of sleigh
  addSantaSack(sleighGroup, santaSackMaterial, whiteFurMaterial, goldMaterial);
  
  return sleighGroup;
}

// Function to create and add a Santa sack to the sleigh
function addSantaSack(sleighGroup, sackMaterial, furMaterial, ribbonMaterial) {
  const santaSackGroup = new THREE.Group();
  
  // Create the main sack body - bulging in the middle like in the image
  // Use a custom geometry with more resolution for better shape
  const sackShape = new THREE.Shape();
  sackShape.moveTo(-0.8, 0);
  sackShape.bezierCurveTo(-0.9, 0.4, -1.0, 0.8, -0.8, 1.2); // Left side curve
  sackShape.lineTo(0.8, 1.2); // Top
  sackShape.bezierCurveTo(1.0, 0.8, 0.9, 0.4, 0.8, 0); // Right side curve
  sackShape.lineTo(-0.8, 0); // Bottom
  
  // Create the 3D sack by revolving the shape
  const sackGeometry = new THREE.LatheGeometry(
    sackShape.getPoints(20), // Get points from the shape
    7, // Segments around
    0, // Start angle
    Math.PI * 2 // End angle (full circle)
  );
  
  const sack = new THREE.Mesh(sackGeometry, sackMaterial);
  sack.position.set(0, 1.4, 0); // Position on top of the sleigh
  sack.scale.set(0.8, 0.8, 1); // Make it a bit taller
  santaSackGroup.add(sack);
  
  // Create the white fur trim around the top
  const trimGeometry = new THREE.TorusGeometry(0.8, 0.15, 12, 24);
  const trim = new THREE.Mesh(trimGeometry, furMaterial);
  trim.position.set(0, 2.1, 0);
  trim.rotation.x = Math.PI / 2; // Rotate to be horizontal
  santaSackGroup.add(trim);
  

  // Create gift contents peeking out (wrapped presents)
  
  // Create a few different present geometries
  const boxGeometry1 = new THREE.BoxGeometry(0.5, 0.4, 0.5);
  const boxGeometry2 = new THREE.BoxGeometry(0.6, 0.3, 0.4);
  const boxGeometry3 = new THREE.BoxGeometry(0.4, 0.35, 0.5);
  
  // Present materials 
  const redGiftMaterial = new THREE.MeshStandardMaterial({ color: 0xCC0000 });
  const goldGiftMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xDAA520, 
    roughness: 0.4, 
    metalness: 0.3 
  });
  
  // Create several presents sticking out of the top
  // 1. Red gift with gold ribbon
  const gift1 = new THREE.Mesh(boxGeometry1, redGiftMaterial);
  gift1.position.set(0, 2.55, 0.2);
  gift1.rotation.set(Math.PI/8, Math.PI/6, Math.PI/10);
  santaSackGroup.add(gift1);
  
  // Add ribbon to gift1
  const ribbonH1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.55, 0.05, 0.55),
    ribbonMaterial
  );
  ribbonH1.position.copy(gift1.position);
  ribbonH1.rotation.copy(gift1.rotation);
  ribbonH1.position.y += 0.3;
  //santaSackGroup.add(ribbonH1);
  
  // 2. Gold gift
  const gift2 = new THREE.Mesh(boxGeometry2, goldGiftMaterial);
  gift2.position.set(-0.3, 2.55, -0.15);
  gift2.rotation.set(-Math.PI/12, -Math.PI/8, Math.PI/15);
  santaSackGroup.add(gift2);
  
  // Add ribbon to gift2
  const ribbonV2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.05, 0.35, 0.45),
    redGiftMaterial
  );
  ribbonV2.position.copy(gift2.position);
  ribbonV2.rotation.copy(gift2.rotation);
  ribbonV2.position.y += 0.3;
  //santaSackGroup.add(ribbonV2);
  
  // 3. Another red gift
  const gift3 = new THREE.Mesh(boxGeometry3, redGiftMaterial);
  gift3.position.set(-0.4, 2.55, -0.3);
  gift3.rotation.set(Math.PI/10, -Math.PI/5, -Math.PI/12);
  santaSackGroup.add(gift3);
  
  // Add ribbon to gift3
  const ribbonH3 = new THREE.Mesh(
    new THREE.BoxGeometry(0.45, 0.05, 0.55),
    ribbonMaterial
  );
  ribbonH3.position.copy(gift3.position);
  ribbonH3.rotation.copy(gift3.rotation);
  ribbonH3.position.y += 0.3;
  //santaSackGroup.add(ribbonH3);
  
  // 3. Another red gift
  const gift4 = new THREE.Mesh(boxGeometry3, goldGiftMaterial);
  gift4.position.set(0.35, 2.55, 0);
  gift4.rotation.set(Math.PI/10, -Math.PI/5, -Math.PI/12);
  santaSackGroup.add(gift4);
  
  // Add ribbon to gift3
  const ribbonH4 = new THREE.Mesh(
    new THREE.BoxGeometry(0.45, 0.05, 0.55),
    ribbonMaterial
  );
  ribbonH4.position.copy(gift4.position);
  ribbonH4.rotation.copy(gift4.rotation);
  ribbonH4.position.y += 0.3;
  //santaSackGroup.add(ribbonH4);
  

  // Add the Santa sack group to the sleigh
  santaSackGroup.scale.set(0.8, 1, 0.8);
  santaSackGroup.position.set(0, -0.5, 0);
  sleighGroup.add(santaSackGroup);
  
  return sleighGroup;
}

function createReindeerTeam(bodyMaterial, legMaterial, neckMaterial, antlerMaterial) {
  const reindeerTeam = new THREE.Group();
  
  // Create 2 reindeer in parallel (side by side)
  const rudolph = createReindeer(bodyMaterial, legMaterial, neckMaterial, antlerMaterial, true);
  rudolph.position.set(3.5, 0, 0.7); // Right side reindeer
  reindeerTeam.add(rudolph);
  
  const secondReindeer = createReindeer(bodyMaterial, legMaterial, neckMaterial, antlerMaterial, false);
  secondReindeer.position.set(3.5, 0, -0.7); // Left side reindeer
  reindeerTeam.add(secondReindeer);
  
  return reindeerTeam;
}

function createReindeer(bodyMaterial, legMaterial, neckMaterial, antlerMaterial, isRudolph) 
{
  const reindeer = new THREE.Group();
  
  // Body - using capsule geometry for smooth curved body
  const bodyGeometry = new THREE.CapsuleGeometry(0.3, 0.8, 8, 16);
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = 0.7;
  body.rotation.z = Math.PI / 2; // Rotate to be horizontal
  reindeer.add(body);
  
  // Neck - connecting properly to the head
  // Use a curved geometries to ensure smooth connection
  const neckCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.35, 0.7, 0),      // Start at body
    new THREE.Vector3(0.75, 0.85, 0),     // Middle point
    new THREE.Vector3(0.95, 1.1, 0)      // End near head
  ]);
  
  const neckGeometry = new THREE.TubeGeometry(neckCurve, 8, 0.12, 12, false);
  const neck = new THREE.Mesh(neckGeometry, neckMaterial);
  reindeer.add(neck);
  
  // Head - elongated using ellipsoid-like shape
  const headGeometry = new THREE.SphereGeometry(0.25, 16, 12);
  // Scale to make it more elongated
  headGeometry.scale(0.9, 0.7, 0.6);
  const head = new THREE.Mesh(headGeometry, bodyMaterial);
  head.position.set(1.0, 1.1, 0);
  reindeer.add(head);
  
  // Snout - create elongated muzzle - for BOTH reindeer
  const snoutGeometry = new THREE.CylinderGeometry(0.07, 0.12, 0.3, 12);
  const snout = new THREE.Mesh(snoutGeometry, bodyMaterial);
  snout.position.set(1.2, 1.05, 0);
  snout.rotation.z = -Math.PI / 2;
  reindeer.add(snout);
  
  // Normal nose tip for the regular reindeer
  if (!isRudolph) {
    const normalNoseMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xFF0000, 
      emissive: 0xFF0000,
      emissiveIntensity: 0.7
    });
    
    const normalNose = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 12, 12),
      normalNoseMaterial
    );
    normalNose.position.set(1.35, 1.05, 0); // At front tip of snout
    reindeer.add(normalNose);
  }
  
  
  // Black eye material
  const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
  
  // Left eye
  const leftEye = new THREE.Mesh(
    new THREE.SphereGeometry(0.04, 8, 8),
    eyeMaterial
  );
  leftEye.position.set(1.1, 1.15, 0.15);
  reindeer.add(leftEye);
  
  // Right eye
  const rightEye = new THREE.Mesh(
    new THREE.SphereGeometry(0.04, 8, 8),
    eyeMaterial
  );
  rightEye.position.set(1.1, 1.15, -0.15);
  reindeer.add(rightEye);

  // Front left leg
  createLeg(reindeer, legMaterial, 0.39, 0.3, 0.14);
  // Front right leg
  createLeg(reindeer, legMaterial, 0.39, 0.3, -0.14);
  // Back left leg
  createLeg(reindeer, legMaterial, -0.4, 0.3, 0.14);
  // Back right leg
  createLeg(reindeer, legMaterial, -0.4, 0.3, -0.14);
  
  createAntlers(reindeer, antlerMaterial);
  
  // Ears - curved cone shapes
  const earGeometry = new THREE.ConeGeometry(0.06, 0.12, 8);
  
  // Left ear
  const leftEar = new THREE.Mesh(earGeometry, bodyMaterial);
  leftEar.position.set(0.9, 1.2, 0.15);
  leftEar.rotation.set(0, 0, -Math.PI / 3);
  reindeer.add(leftEar);
  
  // Right ear
  const rightEar = new THREE.Mesh(earGeometry, bodyMaterial);
  rightEar.position.set(0.9, 1.2, -0.15);
  rightEar.rotation.set(0, 0, -Math.PI / 3);
  reindeer.add(rightEar);
  
  // Tail - small curved tail
  const tailGeometry = new THREE.SphereGeometry(0.06, 8, 8);
  const tail = new THREE.Mesh(tailGeometry, neckMaterial); // White tail like in image
  tail.position.set(-0.65, 0.7, 0);
  tail.scale.set(0.6, 0.6, 0.6);
  reindeer.add(tail);
  
  // Rudolph's red nose
  if (isRudolph) {
    const noseMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xFF0000, 
      emissive: 0xFF0000,
      emissiveIntensity: 0.7
    });
    
    const nose = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 12, 12),
      noseMaterial
    );
    nose.position.set(1.35, 1.05, 0); // At front tip of snout
    reindeer.add(nose);
  }
  
  return reindeer;
}

// Helper function to create a leg with joints
function createLeg(reindeer, legmaterial, x, y, z) 
{

  // Upper leg
  const upperLegGeometry = new THREE.CylinderGeometry(0.06, 0.05, 0.45, 8);
  const upperLeg = new THREE.Mesh(upperLegGeometry, legmaterial);
  upperLeg.position.set(x, y - 0.04, z);
  upperLeg.rotation.x = Math.PI / 30; // Slight angle
  reindeer.add(upperLeg);
  
  // Lower leg
  const lowerLegGeometry = new THREE.CylinderGeometry(0.05, 0.04, 0.4, 8);
  const lowerLeg = new THREE.Mesh(lowerLegGeometry, legmaterial);
  lowerLeg.position.set(x, y - 0.4, z);
  reindeer.add(lowerLeg);
  
  // Hoof
  const hoofGeometry = new THREE.SphereGeometry(0.05, 8, 8);
  hoofGeometry.scale(1, 0.5, 1);
  const hoof = new THREE.Mesh(hoofGeometry, new THREE.MeshStandardMaterial({ color: 0x333333 }));
  hoof.position.set(x, y - 0.6, z);
  reindeer.add(hoof);
}

// Helper function to create detailed antlers
function createAntlers(reindeer, material) {
  // Create a curved antler branch
  const createAntlerBranch = (x, y, z, length, radius, angleX, angleZ) => {
    // Create curved path for antler
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(length * 0.3, length * 0.4, 0),
      new THREE.Vector3(length * 0.7, length * 0.7, 0),
      new THREE.Vector3(length, length * 0.9, 0)
    ]);
    
    const tubeGeometry = new THREE.TubeGeometry(curve, 8, radius, 8, false);
    const branch = new THREE.Mesh(tubeGeometry, material);
    
    branch.position.set(x, y, z);
    branch.rotation.set(angleX, 0, angleZ);
    reindeer.add(branch);
    
    return branch;
  };
  
  // Main left antler
  const leftMainAntler = createAntlerBranch(0.8, 1.5, 0.1, 0.4, 0.03, 0.2, -Math.PI / 2);
  
  // Left antler branches
  createAntlerBranch(0.95, 1.4, 0.08, 0.25, 0.02, 0.4, Math.PI / 8);
  createAntlerBranch(1.01, 1.5, 0.13, 0.15, 0.015, 0.3, Math.PI / 3);
  
  // Main right antler
  const rightMainAntler = createAntlerBranch(0.8, 1.5, -0.1, 0.4, 0.03, -0.2, -Math.PI / 2);
  
  // Right antler branches
  createAntlerBranch(0.95, 1.4, -0.08, 0.25, 0.02, -0.4, Math.PI / 8);
  createAntlerBranch(1, 1.5, -0.12, 0.15, 0.015, -0.3, Math.PI / 3);
}

// Add harness lines connecting sleigh to parallel reindeer
function addHarnessLines(sleighGroup) {
  const harnessMaterial = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
  
  // Create curved harness lines
  const createCurvedHarness = (startX, startY, startZ, endX, endY, endZ) => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(startX, startY, startZ),
      new THREE.Vector3((startX + endX) * 0.3, startY, startZ),
      new THREE.Vector3((startX + endX) * 0.7, endY, endZ),
      new THREE.Vector3(endX, endY, endZ)
    ]);
    
    const tubeGeometry = new THREE.TubeGeometry(curve, 8, 0.025, 8, false);
    const harness = new THREE.Mesh(tubeGeometry, harnessMaterial);
    sleighGroup.add(harness);
  };
  
  // Harness to right reindeer
  createCurvedHarness(1, 0.7, 0.6, 3.3, 0.7, 0.7);
  
  // Harness to left reindeer
  createCurvedHarness(1, 0.7, -0.6, 3.3, 0.7, -0.7);
  
  // Add cross harness connecting the two reindeer
  const crossHarness = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.025, 1.4, 8),
    harnessMaterial
  );
  crossHarness.position.set(3.5, 0.7, 0);
  crossHarness.rotation.x = Math.PI / 2;
  sleighGroup.add(crossHarness);
  
  return sleighGroup;
}

// Create sleigh instance
const sleigh = createSleigh();

// Export the sleigh
export default sleigh;

// Also export a function to add and animate sleigh in a scene
export function addAnimatedSleigh(scene) {
  const startX = 1.5;
  const startY = 0;
  const startZ = 0;
  sleigh.position.set(startX, startY, startZ);
  sleigh.rotation.y = Math.PI;
  sleigh.scale.set(0.4, 0.4, 0.4); // Scale for proper scene proportion
  
  // Add to scene
  scene.add(sleigh);

  // Animation parameters
  const radius = 6; // Circular path radius
  let angle = 0;
  const speed = 0.005; // Rotation speed
  const minHeight = 0.02, maxHeight = 4.5; // Height limits

  function animateSleigh() {
    // Update circular movement
    angle += speed; // Negative for clockwise motion
    sleigh.position.x = startX + Math.cos(angle) * radius;
    sleigh.position.z = startZ + Math.sin(angle) * radius;

    // Smooth up-down movement using sine wave
    sleigh.position.y = minHeight + (Math.sin(angle) * 0.5 + 0.5) * (maxHeight - minHeight);

    // Rotate the sleigh slowly (one full 360-degree rotation per revolution)
    sleigh.rotation.y = -angle - Math.PI/2; // Offset by π to face correctly

    requestAnimationFrame(animateSleigh);
  }

  animateSleigh();
  console.log('Sleigh moves in the correct direction and faces forward.');
}
