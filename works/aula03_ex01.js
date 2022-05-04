import * as THREE from 'three';
import Stats from '../build/jsm/libs/stats.module.js';
import { TrackballControls } from '../build/jsm/controls/TrackballControls.js';
import KeyboardState from '../libs/util/KeyboardState.js'
import {
  initRenderer,
  initCamera,
  initDefaultBasicLight,
  InfoBox,
  onWindowResize,
  createGroundPlaneXZ,
  createGroundPlaneWired
} from "../libs/util/util.js";

var scene = new THREE.Scene();    // Create main scene
var renderer = initRenderer();    // View function in util/utils
var camera = new THREE.PerspectiveCamera(50, 1, 0.1, 2000); // Init camera in this position
camera.position.set(0, 0, 1);
camera.lookAt(0, 0, 0)
camera.up.set(0, 1, 0);
initDefaultBasicLight(scene);
var clock = new THREE.Clock();

// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls(camera, renderer.domElement);

// // Show axes (parameter is size of each axis)
// var axesHelper = new THREE.AxesHelper( 12 );
// scene.add( axesHelper );

// create the ground plane
let plane = createGroundPlaneWired(200, 200);

scene.add(plane);

var keyboard = new KeyboardState();


// if (keyboard.pressed("pageup")) camera.translateZ(1);
// if (keyboard.pressed("pagedown")) camera.translateZ(-1);

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
// window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);

function keyboardUpdate() {

  keyboard.update();

  var speed = 30
  var moveDistance = speed * clock.getDelta();

  if (keyboard.pressed("left")) camera.rotateY(0.01);
  if (keyboard.pressed("right")) camera.rotateY(-0.01);
  if (keyboard.pressed("up")) camera.rotateX(0.01);
  if (keyboard.pressed("down")) camera.rotateX(-0.01);

  if (keyboard.pressed(",")) camera.rotateZ(-0.01);
  if (keyboard.pressed(".")) camera.rotateZ(0.01);

  if (keyboard.pressed("space")) camera.translateZ(-1)
}

render();
function render() {
  keyboardUpdate()
  // trackballControls.update(); // Enable mouse movements
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}