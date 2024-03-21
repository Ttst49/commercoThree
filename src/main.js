import * as THREE from "three";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import {OrbitControls} from "three/addons";

const container = document.getElementById('hero');
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
const ambientLight = new THREE.AmbientLight(0xFFFFFF,1)
scene.add(ambientLight);
let actualModel
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight/2 );
const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight/0.5, 0.1, 1000 );
camera.updateProjectionMatrix();
container.appendChild( renderer.domElement );

const controls = new OrbitControls(camera,renderer.domElement);
const loader = new GLTFLoader();

loader.load("../assets/tShirt/scene.gltf", function( gltf ) {

    actualModel = gltf.scene
    scene.add(gltf.scene)
})


function animate() {

    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
animate();