import { AfterViewInit, Component } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  ngAfterViewInit(): void {
    const container = document.getElementById( 'container' );
    let mixer;
    const clock = new THREE.Clock();
		const renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth-300, window.innerHeight -300 );
    if(window.innerWidth<500) {
          renderer.setSize( window.innerWidth, window.innerHeight);}
    renderer.setClearColor(0x000000, 0);
    container!.appendChild( renderer.domElement );
    const pmremGenerator = new THREE.PMREMGenerator( renderer );
    const scene = new THREE.Scene();
		scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.04 ).texture;
    const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, .7, 500 );
    camera.position.set( 30, 15, 60 );
    const controls = new OrbitControls( camera, renderer.domElement );
		controls.target.set( 0, 0.5, 0 );
		controls.update();
		controls.enablePan = false;
		controls.enableDamping = true;
    const loader = new GLTFLoader();
    loader.load("./assets/scene.gltf", function(gltf){
      const model = gltf.scene;
				model.position.set( 1, 1, 0 );
				model.scale.set( 4, 4, 4 );
				scene.add( model );
        mixer = new THREE.AnimationMixer( model );
        renderer.setAnimationLoop( animate );
    })
        window.onresize = function () {
				camera.aspect = (window.innerWidth / window.innerHeight );
				camera.updateProjectionMatrix();
        if(window.innerWidth<500) {
          renderer.setSize( window.innerWidth+100, window.innerHeight);
        }
				renderer.setSize( window.innerWidth-300, window.innerHeight -300 );
			};
    function animate() {
				const delta = clock.getDelta();

				mixer!.update( delta );

				controls.update();

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(animate);

				renderer.render( scene, camera );

			}
    /* const loader = new GLTFLoader();

loader.load( "./assets/scene.gltf", function ( gltf ) {

  scene.add( gltf.scene );
      gltf.scene.position.set(0, 0, 0); // Example: set position
    gltf.scene.scale.set(1, 1, 1); // Example: scale down

}, undefined, function ( error ) {

  console.error( error );

} );

const width = window.innerWidth, height = window.innerHeight;

// init

const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 10 );
camera.position.z = 10;
 camera.lookAt(0, 0, 0);
  // Point camera at the origin

const scene = new THREE.Scene();
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // White light, 50% intensity
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh( geometry, material );


const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( width, height );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// animation

function animate( time:number ) {

	mesh.rotation.x = time / 2000;
	mesh.rotation.y = time / 1000;

	renderer.render( scene, camera );

}*/
  } 

}
