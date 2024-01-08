import * as THREE from 'three';
import Arm from './Arm';
import HealthBar from './HealthBar';

export default class Item {

    constructor(position, color) {
        this.mesh = new THREE.Mesh(
            new THREE.BoxGeometry(2, 2, 2),
            new THREE.MeshStandardMaterial({ color })
        );
        this.mesh.receiveShadow = true;
        this.mesh.name = 'Item';
        this.mesh.position.set(...position);
    }
}