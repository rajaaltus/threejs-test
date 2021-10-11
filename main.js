import './style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let container;
let camera;
let renderer;
let scene;
let hummer;

function init() {
  container = document.querySelector('.scene');

  //create scene
  scene = new THREE.Scene();
  
  const fov = 10;
  const aspect = container.clientWidth/container.clientHeight;
  const near = 0.1;
  const far = 500;

  //camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(25,5,-30);

  //Light
  const ambient = new THREE.AmbientLight(0x404040,5)
  scene.add(ambient)

  const light = new THREE.DirectionalLight(0xffffCC,7);
  light.position.set(5,2,0);
  scene.add(light);

  // const lhelper = new THREE.DirectionalLightHelper(light);
  // scene.add(lhelper);


  //Renderer
  renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
  renderer.setSize(container.clientWidth,container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  //injecting domElement to HTML
  container.appendChild(renderer.domElement);


  //Load model
  let loader = new GLTFLoader();
  loader.load('./scene.gltf', function(gltf){
    scene.add(gltf.scene)
    hummer = gltf.scene.children[0];
    animate();
  })

  //orbit controls
  const controls = new OrbitControls(camera, renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate)
  hummer.rotation.z += 0.005;
  renderer.render(scene, camera)
}
init();





