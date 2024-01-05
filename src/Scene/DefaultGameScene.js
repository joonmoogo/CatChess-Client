import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import Map from './CustomMeshClass/Map';
import Ground from './CustomMeshClass/Ground';
import Control from './CustomMeshClass/Control';
import GroundForUnit from './CustomMeshClass/GroundForUnit';
import Cylinder from './CustomMeshClass/Cylinder';
import HealthBar from './CustomMeshClass/HealthBar';
import Arm from './CustomMeshClass/Arm';
import Pawn from './CustomMeshClass/Pawn';
import Game from './CustomMeshClass/GameScene';
import { ENEMY_GROUND_FOR_ARRANGE,ENEMY_GROUND_FOR_BATTLE,MY_GROUND_FOR_ARRANGE } from './constant/Constants';

// 

export default function DefaultGameScene({ windowWidth, windowHeight }) {


    let pawns = [];
    const containerRef = useRef();

    useEffect(() => {
        const gameScene = new Game(windowWidth, windowHeight);
        containerRef.current.appendChild(gameScene.renderer.domElement);

        const map = new Map('/star2.jpg');
        gameScene.scene.add(map.mesh);

        const ground = new Ground(0xffffff);
        gameScene.scene.add(ground.mesh);

        const controls = new Control(gameScene.camera, gameScene.renderer.domElement);

        const myGround = new GroundForUnit([0, -1, 50], 0xffff00);
        gameScene.scene.add(myGround.mesh);
        const enemyGround = new GroundForUnit([0, -1, -50], 0xffff00);
        gameScene.scene.add(enemyGround.mesh);

        MY_GROUND_FOR_ARRANGE.forEach((position) => {
            const pawnWhite = new Pawn(position, 0x0fffff)
            const arm = new Arm();
            pawnWhite.mesh.add(arm.mesh);
            const healthBar = new HealthBar();
            pawnWhite.mesh.add(healthBar.mesh);
            gameScene.scene.add(pawnWhite.mesh);

            function updateHealthBarPosition() {
                healthBar.mesh.position.set(0, 4, 0);
                healthBar.mesh.quaternion.copy(gameScene.camera.quaternion);
                requestAnimationFrame(updateHealthBarPosition)
            }
            updateHealthBarPosition();
            pawns.push(pawnWhite.mesh);
        })


        ENEMY_GROUND_FOR_ARRANGE.forEach((position)=>{
            const pawnWhite = new Pawn(position, 0x0fffff)
            const arm = new Arm();
            pawnWhite.mesh.add(arm.mesh);
            const healthBar = new HealthBar();
            pawnWhite.mesh.add(healthBar.mesh);
            gameScene.scene.add(pawnWhite.mesh);

            function updateHealthBarPosition() {
                healthBar.mesh.position.set(0, 4, 0);
                healthBar.mesh.quaternion.copy(gameScene.camera.quaternion);
                requestAnimationFrame(updateHealthBarPosition)
            }
            updateHealthBarPosition();
        })
        const cylinders = [];
        const 가로 = 5;
        const 세로 = 6;
        const cylinderRadius = 7; // 기본 반지름
        const cylinderHeight = 4; // 기본 높이

        for (let i = 1; i <= 세로; i++) {
            for (let j = 1; j <= 가로; j++) {
                // Cylinder 생성
                const geometry = new THREE.CylinderGeometry(cylinderRadius, cylinderRadius, cylinderHeight, 6);
                const material = new THREE.MeshStandardMaterial({ color: i > 세로 / 2 ? 0xfff00 : 0xff0000 });
                const cylinder = new THREE.Mesh(geometry, material);
                cylinder.receiveShadow = true;
                // 정 가운데 위치 계산
                let x = cylinderRadius * 2 * (j - (가로 + 1) / 2);
                let y = cylinderHeight / 2;
                let z = cylinderRadius * 2 * (i - (세로 + 1) / 2);
                if (i % 2 != 0) {
                    x += cylinderRadius;
                }
                cylinder.name = 'cylinder';
                cylinder.position.set(x - cylinderRadius / 2, y / 2, z);
                cylinder.castShadow = true;
                cylinder.occupied = false;
                console.log(cylinder.position);
                gameScene.scene.add(cylinder);
                if (i > 세로 / 2) {
                    cylinders.push(cylinder);
                }
            }

        }
        function animate() {
            requestAnimationFrame(animate);
            controls.control.update();
            gameScene.renderer.render(gameScene.scene, gameScene.camera);
        }
        animate();
        return () => {
            containerRef.current.removeChild(gameScene.renderer.domElement)
        }
    }, []);

    return <div ref={containerRef}></div>;
}

