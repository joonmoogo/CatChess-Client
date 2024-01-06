import * as THREE from 'three';
import Arm from './Arm';
import HealthBar from './HealthBar';

export default class Pawn {

    constructor(position, color, quaternion) {
        this.mesh = new THREE.Mesh(
            new THREE.BoxGeometry(2, 4, 2),
            new THREE.MeshStandardMaterial({ color })
        );
        this.mesh.receiveShadow = true;
        this.mesh.name = 'unit';
        this.mesh.position.set(...position);
        const arm = new Arm();
        const healthBar = new HealthBar();
        this.mesh.add(arm.mesh);
        this.mesh.add(healthBar.mesh);

        function updateHealthBarPosition() {
            healthBar.mesh.position.set(0, 4, 0);
            healthBar.mesh.quaternion.copy(quaternion);
            requestAnimationFrame(updateHealthBarPosition)
        }
        updateHealthBarPosition();
    }
}