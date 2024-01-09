import * as THREE from 'three';
import Arm from './Arm';
import HealthBar from './HealthBar';
import { 빨간색, 파란색 } from '../constant/Color'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

export default class Pawn {
    constructor(position, quaternion, property) {
        const data = JSON.parse(property);
        console.log(data);

        switch (data.id) {
            case 'wildCat':
                this.color = 빨간색
                this.size = [2,4,2]
                break;
            case 'thiefCat':
                this.color = 파란색
                this.size = [2,4,2]
                break;

            // 모든 케이스 추가
        }
 
        this.mesh = new THREE.Mesh(
            new THREE.BoxGeometry(...this.size),
            new THREE.MeshStandardMaterial({color: this.color})
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