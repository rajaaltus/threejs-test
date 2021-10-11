import './style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30)


const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material)
scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(10,10,5)


const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.position.set(-15,15,5)
scene.add(ambientLight)
scene.add(pointLight)

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const lightHelper2 = new THREE.PointLightHelper(ambientLight)
const gridHelper = new THREE.GridHelper(200,50)
scene.add(gridHelper)

//Moon
const moonTexture = new THREE.TextureLoader().load('moon.jpeg');
const normalTexture = new THREE.TextureLoader().load('moon_normal.jpg')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
)
scene.add(moon)



const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color:0xffffff})
  const star = new THREE.Mesh(geometry, material)

  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100))

  star.position.set(x,y,z)
  scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space.jpeg')
scene.background = spaceTexture

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update()
  renderer.render(scene, camera)
}
animate()