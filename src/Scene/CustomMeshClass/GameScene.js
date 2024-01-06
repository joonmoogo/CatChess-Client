import * as THREE from 'three';
import { BATTLE_GROUND } from '../constant/Coordinates';

export default class GameScene {

    selectedObject = null;

    constructor(width, height) {
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(20, width / height, 1, 1000);
        this.camera.position.set(0, 2, 20);
        this.camera.position.z = 100;
        this.camera.position.y = 105;
        this.scene.add(this.camera);
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setSize(width, height);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        const ambientlight = new THREE.AmbientLight(0xffffff, 0.2);
        this.scene.add(ambientlight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.position.set(100, 100, -100);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);

        const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.11, 0xff0000);
        this.scene.add(lightHelper);

        this.renderer.domElement.addEventListener('mousemove',this.onDocumentMouseMove,false);
        this.renderer.domElement.addEventListener('mousedown',this.onDocumentMouseDown,false);
        
    }

    onDocumentMouseDown = (event) => {
        event.preventDefault();
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children);
        if (intersects.length > 0) {
            const FindedObject = intersects[0];
            const objectname = FindedObject.object.name;
            console.log(FindedObject);
            switch (objectname) {
                case 'cylinder':
                    if (this.selectedObject) {
                        this.selectedObject.position.set(
                            FindedObject.object.position.x,
                            FindedObject.object.position.y + 4,
                            FindedObject.object.position.z
                        );
                        
                        const target = new THREE.Vector3(...BATTLE_GROUND[5][4]);
                        // this.moveUnit(this.selectedObject,target);
                        // this.throwBall(this.selectedObject,target);
                        this.selectedObject = null;
                    }
                    break;
                case 'unit':
                    if (!this.selectedObject) {
                        this.selectedObject = FindedObject.object;
                    }
                    else {
                        this.selectedObject = null;
                    }
                    break;

                case 'groundForUnit':
                    break;

            }
        }
    }
    onDocumentMouseMove = (event) => {
        event.preventDefault();
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children);
        if (intersects.length > 0) {
            const FindedObject = intersects[0];
            const objectName = FindedObject.object.name;
            if (this.selectedObject) {
                this.selectedObject.position.copy(FindedObject.point.add(new THREE.Vector3(0, 0, 8)))
            }
            else {
            }
            switch (objectName) {
                case 'cylinder':

                case 'unit':
            }
        }
    };
    onDocumentMouseUp = (event) => {
        event.preventDefault();
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children);
        if (intersects.length > 0) {
            const FindedObject = intersects[0];
            const objectname = FindedObject.object.name;
            if (objectname == 'unit') {
                console.log(FindedObject.object);
                FindedObject.object.material.color.set(0, 0, 1);
            }
        }
    };

    moveUnit(unit, targetPosition) {
        const gravity = new THREE.Vector3(0, -0.008, 0);
        const jumpHeight = 20; // Adjust this value to control the jump height
        const initialPosition = unit.position.clone();
        const initialVelocity = calculateInitialVelocity(initialPosition, targetPosition);
    
        let time = 0;
        let isJumping = true;
    
        function calculateInitialVelocity(start, end) {
            const displacement = end.clone().sub(start);
            const timeToReachTarget = Math.sqrt(2 * jumpHeight / Math.abs(gravity.y));
            const initialVelocityY = -gravity.y * timeToReachTarget / 2;
            const initialVelocity = displacement.clone().divideScalar(timeToReachTarget);
            initialVelocity.y = initialVelocityY;
            return initialVelocity;
        }
    
        function updatePosition() {
            const displacement = new THREE.Vector3();
            displacement.copy(initialVelocity)
                .multiplyScalar(time)
                .add(gravity.clone().multiplyScalar(0.5 * time * time));
    
            unit.position.copy(initialPosition).add(displacement);
            time += 2;
    
            if (isJumping && unit.position.y <= jumpHeight) {
                isJumping = false;
                time = 0;
            }
            if (!isJumping && unit.position.y <= 4.99) {
                time = 0;
            }
            if (isJumping || unit.position.y > 4.99) {
                requestAnimationFrame(updatePosition);
            }
        }
    
        updatePosition();
    }

    throwBall(unit, targetPosition) {
        const gravity = new THREE.Vector3(0, -0.008, 0);
        const height = 20;
        const initialPosition = unit.position;
        const initialVelocity = calculateInitialVelocity(initialPosition, targetPosition);
        const geometry = new THREE.SphereGeometry(0.5, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xff0000 });
        const ball = new THREE.Mesh(geometry, material);
        this.scene.add(ball);
        let time = 0;
        function calculateInitialVelocity(start, end) {
            const displacement = end.clone().sub(start);
            const timeToReachTarget = Math.sqrt(2 * height / Math.abs(gravity.y));
            const initialVelocityY = -gravity.y * timeToReachTarget / 2;
            const initialVelocity = displacement.clone().divideScalar(timeToReachTarget);
            initialVelocity.y = initialVelocityY;
            return initialVelocity;
        }
        function updatePosition() {
            const displacement = new THREE.Vector3();
            displacement.copy(initialVelocity)
                .multiplyScalar(time)
                .add(gravity.clone().multiplyScalar(0.5 * time * time));
            ball.position.copy(initialPosition).add(displacement);
            time += 1;
            if (ball.position.y <= 0) {
                time = 0;
            }
            requestAnimationFrame(updatePosition);
        }
        updatePosition();
    }


}