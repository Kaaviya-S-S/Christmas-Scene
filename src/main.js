import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import christmasTree from "./tree.js";
import Skybox from "./Skybox.js";
import groundPlane from "./ground.js";
import { addAnimatedSleigh } from "./sleigh.js"; 
import { addSnow } from "./snow.js";
import { addBackgroundMusic } from "./bgMusic.js";
import { addHouseAndGifts } from "./house.js";
import gifts from "./gifts.js";
import { addSnowman } from "./snow_man.js";
import { loadSanta } from "./santa.js"; 
import addBoundary from "./boundary.js"; 
import church from "./church.js";

// Set up scene
const scene = new THREE.Scene();

//setup light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2); // Subtle ambient light
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.25);
directionalLight.position.set(10, 10, -10);
scene.add(directionalLight);
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.25);
directionalLight2.position.set(-10, 10, 20);
scene.add(directionalLight2);

//set bg music
addBackgroundMusic(scene, 'assets/jingle-bells.mp3');

// Set up camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-4, 4, 10);  // Adjust camera position slightly above
camera.lookAt(0, 0, 0);

// Set up renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create and load the skybox
const skybox = new Skybox(scene);
skybox.load().then(() => {
    console.log('Skybox loaded');
    
    // Add the Christmas tree to the scene
    christmasTree.position.set(-1, 1.1, -2);  // Raise the tree slightly above ground
    scene.add(christmasTree);
    
    scene.add(groundPlane);
    scene.add(gifts);
    scene.add(church);

    // Load and position Santa to the left of the Christmas tree
    loadSanta(scene); // This will load the Santa model into the scene
    
    // Add house and gifts
    addHouseAndGifts(scene);
    
    // Add snowman
    addSnowman(scene);
    
    // Add and animate the sleigh
    addAnimatedSleigh(scene);
    
    // Add decorative boundary around the snow land
    addBoundary(scene, 20); // 20 is the size of the ground plane, adjust if needed
    
    // Add Snow Effect
    addSnow(scene);
    
    // OrbitControls for mouse interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.minDistance = 3;  // Prevent zooming too close
    controls.maxDistance = 10.5; // Prevent zooming too far out
    controls.maxPolarAngle = Math.PI / 2.1;  // Prevents looking below the horizon
    
    // Resize handling
    window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
    
    animate();  // Start the rendering loop
});

// Render loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}