import * as THREE from 'three';

// Add music function
export function addBackgroundMusic(scene, audioFilePath) 
{
    // Create an AudioListener and add it to the camera (so the user can hear the sound)
    const listener = new THREE.AudioListener();
    scene.add(listener);

    // Create a global audio source
    const sound = new THREE.Audio(listener);

    // Create an AudioLoader instance
    const audioLoader = new THREE.AudioLoader();

    // Load the background music file
    audioLoader.load(audioFilePath, function (buffer) {
        console.log("Audio loaded successfully!");
        sound.setBuffer(buffer);
        sound.setLoop(true);    // Set the music to loop
        sound.setVolume(1);     // Adjust volume (range is 0.0 to 1.0)

        // Function to start playing the music when the user clicks
        function playMusicOnClick() {
            sound.play();  // Start playing the background music
            document.removeEventListener("click", playMusicOnClick);  // Remove the event listener after the first click
        }
        // Add a click event listener to start playing the music
        document.addEventListener("click", playMusicOnClick);
        
    }, undefined, function (error) {
        console.error("Error loading audio:", error);
    });
}
