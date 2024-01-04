import * as THREE from 'three';

export default class Arm {
    constructor() {
        this.mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 0.5),
            new THREE.MeshStandardMaterial({ color: 0xff0000 }),
        )
        this.mesh.position.set(1, 0, 0);
    }
}