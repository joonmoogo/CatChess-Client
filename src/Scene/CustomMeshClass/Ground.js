import * as THREE from 'three';

export default class Ground {
    constructor(color) {
        this.mesh = new THREE.Mesh(
            new THREE.BoxGeometry(100, 100, 10),
            new THREE.MeshLambertMaterial({ color: color })
        )
        this.mesh.name = 'ground';
        this.mesh.rotation.x = Math.PI * -0.5;
        this.mesh.position.set(0,-6.1,0);
    }
}
