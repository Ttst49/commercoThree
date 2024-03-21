import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {func} from "three/addons/nodes/code/FunctionNode.js";


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const pointLight = new THREE.PointLight(0xffffff,1)

const lightHelper = new THREE.PointLightHelper(pointLight)

pointLight.position.set(0, 3, 0)


const ambientLight = new THREE.AmbientLight(0xffffff,1)

scene.add(pointLight)

scene.add(ambientLight)
//scene.add(lightHelper)

//const controls = new OrbitControls( camera, renderer.domElement );

const loader = new GLTFLoader();

let actualModel

let actualModelId = new URLSearchParams(window.location.search).get("id")

switch (actualModelId){
    case "1":
        actualModelId = "tShirt"
        break
    case "2":
        actualModelId = "sweat"
        break
    case "3":
        actualModelId = "suit"
        break
    case "4":
        actualModelId = "trousers"
        break

}

loader.load("../assets/"+actualModelId+"/scene.gltf", function( gltf ) {

    actualModel = gltf.scene
    scene.add(gltf.scene)
})


camera.position.z = 2;
camera.position.y = 1

function animate() {
    requestAnimationFrame( animate );
    if (actualModel){
        actualModel.rotation.y += 0.01;
        renderer.render( scene, camera );
    }
}
animate();

