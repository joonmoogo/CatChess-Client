import * as THREE from 'three';

export default class Pawn{
    constructor(position,color){
        this.mesh = new THREE.Mesh(
            new THREE.BoxGeometry(2,4,2),
            new THREE.MeshStandardMaterial({color})
        );
        this.mesh.receiveShadow = true;
        this.mesh.name='unit';
        this.mesh.position.set(...position);
    }
}