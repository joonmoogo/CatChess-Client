import * as THREE from 'three';

export default class GroundForUnit {
    constructor(position, color) {
        this.mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 15, 10, 1),
            new THREE.MeshLambertMaterial({ color: color })
        )
        this.mesh.name = 'groundForUnit';
        this.mesh.rotation.x = Math.PI * -0.5;
        this.mesh.position.set(...position);
    }
}
