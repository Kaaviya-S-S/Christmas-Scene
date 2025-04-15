import * as THREE from "three";

function createFivePointedStar() {
    const starShape = new THREE.Shape();
    
    const outerRadius = 0.5;
    const innerRadius = 0.2;
    const spikes = 5;
    
    let angle = Math.PI / 2;  // Start from the top point
    
    // Create a 2D five-pointed star shape
    for (let i = 0; i < spikes * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        if (i === 0) {
            starShape.moveTo(x, y);
        } else {
            starShape.lineTo(x, y);
        }
        angle += Math.PI / spikes;
    }
    starShape.closePath();

    // Create the material for both sides
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700, side: THREE.DoubleSide });

    // Create the filled 2D front and back face using ShapeGeometry
    const shapeGeometry = new THREE.ShapeGeometry(starShape);
    const frontFaceMesh = new THREE.Mesh(shapeGeometry, starMaterial);
    const backFaceMesh = new THREE.Mesh(shapeGeometry, starMaterial);

    // Create the extruded 3D star (for the sides and depth)
    const extrudeSettings = {
        depth: 0.2,    // Thickness of the star
        bevelEnabled: false
    };
    const starGeometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings);
    const extrudedMesh = new THREE.Mesh(starGeometry, starMaterial);

    frontFaceMesh.position.z = 0.2;  // Move it front of the extruded part
    backFaceMesh.position.z = 0;  

    // Combine all parts into a group
    const starGroup = new THREE.Group();
    starGroup.add(frontFaceMesh);  // Front face
    starGroup.add(extrudedMesh);   // Extruded part (sides)
    starGroup.add(backFaceMesh);   // Back face

    return starGroup;
}

// Create and export the Christmas star mesh
const star = createFivePointedStar();
export default star;


