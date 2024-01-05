import * as THREE from 'three';

export default class Cylinder {
    constructor(position, color) {
        const cylinderRadius = 7;
        const cylinderHeight = 4;
    
        this.mesh = new THREE.Mesh(
          new THREE.CylinderGeometry(cylinderRadius, cylinderRadius, cylinderHeight, 6),
          new THREE.MeshStandardMaterial({ color: color })
        );
        this.mesh.receiveShadow = true;
        this.mesh.name = 'cylinder';
        this.mesh.castShadow = true;
        this.mesh.occupied = false;
        this.mesh.position.set(...position);
    }
}
