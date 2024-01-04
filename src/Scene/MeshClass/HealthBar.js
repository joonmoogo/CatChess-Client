import * as THREE from 'three';

export default class HealthBar {
    constructor() {
        this.mesh = new THREE.Mesh(
            new THREE.BoxGeometry(2.2, 0.2, 0.2),
            new THREE.MeshBasicMaterial({ color: 0xff0000 }),
        )
        this.mesh.position.set(0, 4, 0);
    }
}