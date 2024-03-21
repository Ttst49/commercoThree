import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from "three/addons";
const name = document.querySelector(".name")
const newPrice = document.querySelector(".newPrice")
const oldPrice = document.querySelector(".oldPrice")

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 1000 );

scene.background = new THREE.Color("#252525")
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const pointLight = new THREE.PointLight(0xffffff,1)


pointLight.position.set(0, 3, 0)


const ambientLight = new THREE.AmbientLight(0xffffff,1)

scene.add(pointLight)

scene.add(ambientLight)
//scene.add(lightHelper)



const loader = new GLTFLoader();

let actualModel

let actualModelId = new URLSearchParams(window.location.search).get("id")

camera.position.z = 2;

switch (actualModelId){
    case "1":
        camera.position.y = 1
        actualModelId = "tShirt"
        name.innerHTML = "White simple ecological tee-shirt"
        newPrice.innerHTML = "55$"
        oldPrice.innerHTML = "70$"
        break
    case "2":
        camera.position.y = 1.21
        actualModelId = "sweat"
        name.innerHTML = "Gray SweatShirt with ecological purpose"
        newPrice.innerHTML = "90$"
        oldPrice.innerHTML = "109.99$"
        break
    case "3":
        actualModelId = "suit"
        break
    case "4":
        camera.position.y = 1
        actualModelId = "short"
        const pLS = new THREE.PointLight(0xffffff,2)
        const pLS2 = new THREE.PointLight(0xffffff,2)
        const pLS3 = new THREE.PointLight(0xffffff,2)
        const pLS4 = new THREE.PointLight(0xffffff,2)
        pLS.position.set(2, 1, 0.1)
        pLS2.position.set(-2, 1, 0.1)
        pLS3.position.set(0, 1, 2)
        pLS4.position.set(0, 1, -2)
        scene.add(pLS,pLS2,pLS3,pLS4)

        break

}

loader.load("../assets/"+actualModelId+"/scene.gltf", function( gltf ) {

    actualModel = gltf.scene
    scene.add(gltf.scene)
})



const controls = new OrbitControls( camera, renderer.domElement );
//controls.enableZoom = false
controls.target.set(camera.position.x, camera.position.y)
controls.minPolarAngle = Math.PI/2;
controls.maxPolarAngle = Math.PI/2;

function animate() {
    requestAnimationFrame( animate );
    if (actualModel){
        actualModel.rotation.y += 0.01;
        renderer.render( scene, camera );
    }
}
animate();

