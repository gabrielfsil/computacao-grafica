import * as THREE from 'three';
import Stats from '../build/jsm/libs/stats.module.js';
import { TrackballControls } from '../build/jsm/controls/TrackballControls.js';
import {
  initRenderer,
  initCamera,
  initDefaultBasicLight,
  InfoBox,
  onWindowResize,
  createGroundPlaneXZ
} from "../libs/util/util.js";
import { GLTFLoader } from '../build/jsm/loaders/GLTFLoader.js';

var scene = new THREE.Scene();    // Create main scene
var renderer = initRenderer();    // View function in util/utils
var camera = initCamera(new THREE.Vector3(0, 15, 30)); // Init camera in this position

// Faça-se a luz
let dirLight = new THREE.DirectionalLight("rgb(255,255,255)")

dirLight.position.copy(new THREE.Vector3(20, 15, 20));

dirLight.castShadow = true;

dirLight.shadow.mapSize.width = 256
dirLight.shadow.mapSize.height = 256
dirLight.shadow.camera.near = 0.1
dirLight.shadow.camera.far = 100
dirLight.shadow.camera.left = -20
dirLight.shadow.camera.right = 20
dirLight.shadow.camera.bottom = -10
dirLight.shadow.camera.top = 20

scene.add(dirLight);

// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls(camera, renderer.domElement);


// create the ground plane
let plane = createGroundPlaneXZ(20, 20)
scene.add(plane);

let material = new THREE.MeshPhongMaterial({ color: "#fff" })

let cube = new THREE.BoxGeometry(6, 6);
let torus = new THREE.TorusGeometry(4, 3, 20);
let cylinderInternal = new THREE.CylinderGeometry(4, 4, 6, 20)
let cylinderExternal = new THREE.CylinderGeometry(4.5, 4.5, 7, 20)



// Use this to show information onscreen
var controls = new InfoBox();
controls.add("Basic Scene");
controls.addParagraph();
controls.add("Use mouse to interact:");
controls.add("* Left button to rotate");
controls.add("* Right button to translate (pan)");
controls.add("* Scroll to zoom in/out.");
controls.show();

// Listen window size changes
window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);

render();
function render() {
  trackballControls.update(); // Enable mouse movements
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}