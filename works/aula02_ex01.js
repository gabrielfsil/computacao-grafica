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

var scene = new THREE.Scene();    // Create main scene
var renderer = initRenderer();    // View function in util/utils
var camera = initCamera(new THREE.Vector3(-25, 15, 30)); // Init camera in this position
initDefaultBasicLight(scene);

// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls(camera, renderer.domElement);

// // Show axes (parameter is size of each axis)
// var axesHelper = new THREE.AxesHelper( 12 );
// scene.add( axesHelper );

// create the ground plane
let plane = createGroundPlaneXZ(20, 20)
scene.add(plane);

// create a cube
var cubeGeometry = new THREE.BoxGeometry(11, 0.3, 6);
var cubeMaterial = new THREE.MeshLambertMaterial({ color: "rgb(200,0,0)" });
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// position the cube
cube.position.set(0.0, 3.0, 0.0);
// add the cube to the scene
scene.add(cube);

var cylinderGeometry = new THREE.CylinderGeometry(0.2, 0.2, 3, 32)
var cylinderMaterial = new THREE.MeshLambertMaterial({ color: "rgb(200,0,0)" });

var cylinder1 = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

cylinder1.position.set(-5, -1.5, -2)

cube.add(cylinder1)

var cylinder2 = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

cylinder2.position.set(5, -1.5, -2)

cube.add(cylinder2)

var cylinder3 = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

cylinder3.position.set(-5, -1.5, 2)

cube.add(cylinder3)

var cylinder4 = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

cylinder4.position.set(5, -1.5, 2)

cube.add(cylinder4)

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