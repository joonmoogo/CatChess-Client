import * as THREE from 'three';
import Arm from './Arm';
import HealthBar from './HealthBar';
import { 노란색, 초록색, 빨간색, 파란색, 보라색, 주황색, 핑크색, 갈색 } from '../constant/Color'

export default class Pawn {
    constructor(position, quaternion, property) {
        let data;
        try{
            data=JSON.parse(property)
        }catch{
            data=property
        }

        const catTypes = {
            'wildCat': { color: 노란색 },
            'thiefCat': { color: 초록색 },
            'tankCat': { color: 빨간색 },
            'strongCat': { color: 파란색 },
            'ssepCat': { color: 보라색 },
            'assasinCat': { color: 주황색 },
            'armorCat': { color: 핑크색 },
            'adCat': { color: 갈색 }
        };

        const catType = catTypes[data.id] || catTypes['wildCat'];
        this.color = catType.color;

        if (data?.tier === 1) {
            this.size = [2, 4, 2];
        } else if (data.tier === 2) {
            this.size = [3, 4, 3];
        } else {
            this.size = [4, 4, 4];
        }


        this.mesh = new THREE.Mesh(
            new THREE.BoxGeometry(...this.size),
            new THREE.MeshStandardMaterial({ color: this.color })
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