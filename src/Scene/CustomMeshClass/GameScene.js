import * as THREE from 'three';

export default class Game {

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
                this.selectedObject.position.copy(FindedObject.point.add(new THREE.Vector3(0, 0, 4)))
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

}