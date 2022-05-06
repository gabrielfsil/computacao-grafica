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
import GUI from '../libs/util/dat.gui.module.js';

var scene = new THREE.Scene();    // Create main scene
var renderer = initRenderer();    // View function in util/utils
var camera = new THREE.PerspectiveCamera(60, 1, 0.1, 2000); // Init camera in this position
camera.position.set(50, 50, 50);
camera.lookAt(0, 0, 0)
camera.up.set(0, 1, 0);
initDefaultBasicLight(scene);


// create the ground plane
let plane = createGroundPlaneXZ(200, 20);
scene.add(plane);


var sphereGeometry = new THREE.SphereGeometry(1, 30, 16);
var sphere1Material = new THREE.MeshLambertMaterial({ color: "rgb(200,0,0)" });
var sphere2Material = new THREE.MeshLambertMaterial({ color: "rgb(0,200,0)" });

var sphere1 = new THREE.Mesh(sphereGeometry, sphere1Material);
var sphere2 = new THREE.Mesh(sphereGeometry, sphere2Material);

sphere1.position.set(-90, 0.5, 1);
sphere2.position.set(-90, 0.5, 4);

scene.add(sphere1);
scene.add(sphere2);

var keyboard = new KeyboardState();

function keyboardUpdate() {

  keyboard.update();

  if (keyboard.pressed("left")) camera.rotateY(0.01);
  if (keyboard.pressed("right")) camera.rotateY(-0.01);
  if (keyboard.pressed("up")) camera.rotateX(0.01);
  if (keyboard.pressed("down")) camera.rotateX(-0.01);

  if (keyboard.pressed(",")) camera.rotateZ(-0.01);
  if (keyboard.pressed(".")) camera.rotateZ(0.01);

  if (keyboard.pressed("space")) camera.translateZ(-1);
}

var sphera1Control = false
var sphera2Control = false

function runSphera1() {
  sphera1Control = true;
}

function runSphera2() {
  sphera2Control = true;
}

function restart() {

  sphera1Control = false
  sphera2Control = false
  sphere1.position.set(-90, 0.5, 1);
  sphere2.position.set(-90, 0.5, 4);
}

function animationSpheres() {

  if (sphera1Control) {
    sphere1.translateX(0.2)
  }
  if (sphera2Control) {
    sphere2.translateX(0.1)
  }
}

function buildInterface() {

  var controls = new function () {
    this.startRun1 = function () {

      runSphera1()
    };
    this.startRun2 = function () {
      runSphera2()
    };
    this.reset = function () {
      restart();
    };
  };

  // GUI interface
  var gui = new GUI();
  gui.add(controls, 'startRun1').name("Sphera 1");
  gui.add(controls, 'startRun2').name("Sphera 2");
  gui.add(controls, 'reset').name("Restart");
}

buildInterface();
render();
function render() {
  keyboardUpdate()
  animationSpheres()
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}