import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { ModelComponent } from "../model/model.component";

@Component({
  selector: 'app-home',
  imports: [ModelComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  @ViewChild('cont') canvasRef!: ElementRef;
  constructor(renderer: Renderer2){}
  ngAfterViewInit(): void {
    const container = this.canvasRef.nativeElement
    const group = new THREE.Group();
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
    const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, .01, 5000 );
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
        group.add(model);
				scene.add(group);
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
				requestAnimationFrame(animate);
        group.rotation.y += 0.00001;
        renderer.render(scene, camera);
			}
  }

}
