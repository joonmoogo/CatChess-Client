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

import { ENEMY_GROUND_FOR_ARRANGE,ENEMY_GROUND_FOR_BATTLE,MY_GROUND_FOR_ARRANGE, MY_GROUND_FOR_BATTLE } from './constant/Constants';

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
            const pawnWhite = new Pawn(position, 0x0fffff, gameScene.camera.quaternion)
            gameScene.scene.add(pawnWhite.mesh);
            pawns.push(pawnWhite.mesh);
        })

        ENEMY_GROUND_FOR_ARRANGE.forEach((position)=>{
            const pawnWhite = new Pawn(position, 0x0fffff, gameScene.camera.quaternion)
            gameScene.scene.add(pawnWhite.mesh);
        })

        MY_GROUND_FOR_BATTLE.forEach((array)=>{
            array.forEach((position)=>{
                const cylinder = new Cylinder(position, 0xfff00);
                gameScene.scene.add(cylinder.mesh);
            })
        })

        ENEMY_GROUND_FOR_BATTLE.forEach((array)=>{
            array.forEach((position)=>{
                const cylinder = new Cylinder(position,0xff0000);
                gameScene.scene.add(cylinder.mesh);
            })
        })

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

