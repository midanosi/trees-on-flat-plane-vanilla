import * as THREE from 'https://cdn.skypack.dev/three@0.129.0';

import {OrbitControls} from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';

class TreesDemo {
    constructor() {
    	this.Initialize_();
    }
  
    Initialize_() {
		console.log(`initialising`)
        this.threejs_ = new THREE.WebGLRenderer({
            antialias: true,
        });
		this.threejs_.shadowMap.enabled = true;
		this.threejs_.shadowMap.type = THREE.PCFSoftShadowMap;
		this.threejs_.setPixelRatio(window.devicePixelRatio);
		this.threejs_.setSize(window.innerWidth, window.innerHeight);
      
		document.body.appendChild(this.threejs_.domElement);
	
		window.addEventListener('resize', () => {
			this.OnWindowResize_();
		}, false);

		const fov = 60;
		const aspect = 1920 / 1080;
		const near = 1.0;
		const far = 20000.0;
		this.camera_ = new THREE.PerspectiveCamera(fov, aspect, near, far);
		this.camera_.position.set(75, 20, 0);

		this.scene_ = new THREE.Scene();

		let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
		light.position.set(20, 100, 10);
		light.target.position.set(0, 0, 0);
		light.castShadow = true;
		light.shadow.bias = -0.001;
		light.shadow.mapSize.width = 2048;
		light.shadow.mapSize.height = 2048;
		light.shadow.camera.near = 0.1;
		light.shadow.camera.far = 500.0;
		light.shadow.camera.near = 0.5;
		light.shadow.camera.far = 500.0;
		light.shadow.camera.left = 100;
		light.shadow.camera.right = -100;
		light.shadow.camera.top = 100;
		light.shadow.camera.bottom = -100;
		this.scene_.add(light);

		light = new THREE.AmbientLight(0x101010);
		this.scene_.add(light);

		const controls = new OrbitControls(
			this.camera_,
			this.threejs_.domElement
		);
		controls.target.set(0, 20, 0);
		controls.update();

		const sky = new THREE.Mesh(
			new THREE.SphereGeometry(10000, 32, 32),
			new THREE.MeshBasicMaterial({
				color: 0x8080FF,
				side: THREE.BackSide,
			})
		);
		this.scene_.add(sky);

		const ground = new THREE.Mesh(
			new THREE.PlaneGeometry(20000, 20000, 300, 300),
			new THREE.MeshStandardMaterial({
				color: 0x808080,
			})
		);

		ground.rotation.x = -Math.PI / 2.0;
		this.scene_.add(ground);

		const trunkMat = new THREE.MeshStandardMaterial({color: 0x808080});
		const leavesMat = new THREE.MeshStandardMaterial({color: 0x80FF80});
		const trunkGeo = new THREE.BoxGeometry(1, 1, 1);
		const leavesGeo = new THREE.ConeGeometry(1, 1, 32);

		for (let x = 0; x < 50; ++x) {
			for (let y = 0; y < 50; ++y) {
				const trunk = new THREE.Mesh(trunkGeo, trunkMat);
				const leaves = new THREE.Mesh(leavesGeo, leavesMat);
				trunk.scale.set(20, (Math.random() + 1.0) * 100.0, 20);
				trunk.position.set(
					15000.0 * (Math.random() * 2.0 - 1.0),
					trunk.scale.y / 2.0,
					15000.0 * (Math.random() * 2.0 - 1.0));

				leaves.scale.copy(trunk.scale);
				leaves.scale.set(100, trunk.scale.y * 5.0, 100);
				leaves.position.set(
					trunk.position.x,
					leaves.scale.y / 2 + (Math.random() + 1) * 25,
					trunk.position.z);

				this.scene_.add(trunk);
				this.scene_.add(leaves);
			}
		}

		// this.totalTime_ = 0.0;
		// this.previousRAF_ = null;
		this.RAF_();
    }

    OnWindowResize_() {
        this.camera_.aspect = window.innerWidth / window.innerHeight;
        this.camera_.updateProjectionMatrix();
        this.threejs_.setSize(window.innerWidth, window.innerHeight);
	}
    
	RAF_() {
		requestAnimationFrame((t) => {
			// if (this.previousRAF_ === null) {
			// this.previousRAF_ = t;
			// }

			// this.Step_((t - this.previousRAF_) * 0.001);
			// this.previousRAF_ = t;
			
			this.threejs_.render(this.scene_, this.camera_);
			this.RAF_();
		});
	}
}
    
    
let _APP = null;

window.addEventListener('DOMContentLoaded', () => {
    _APP = new TreesDemo();
});