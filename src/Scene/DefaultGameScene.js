import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';

import Map from './CustomMeshClass/Map';
import Ground from './CustomMeshClass/Ground';
import Control from './CustomMeshClass/Control';
import GroundForUnit from './CustomMeshClass/GroundForUnit';
import Cylinder from './CustomMeshClass/Cylinder';
import Pawn from './CustomMeshClass/Pawn';
import GameScene from './CustomMeshClass/GameScene';

import {
    ENEMY_GROUND_FOR_ARRANGE,
    ENEMY_GROUND_FOR_BATTLE,
    ENEMY_GROUND_FOR_ITEM,
    MY_GROUND_FOR_ARRANGE,
    MY_GROUND_FOR_BATTLE,
    MY_GROUND_FOR_ITEM,
} from './constant/Coordinates';

import {
    노란색,
    초록색,
    빨간색,
    파란색
} from './constant/Color';
import GroundForItem from './CustomMeshClass/GroundForItem';
import Item from './CustomMeshClass/Item';

export default function DefaultGameScene({ windowWidth, windowHeight, board }) {
    const containerRef = useRef();
    const gameSceneRef = useRef();
    const 대기석 = [];

    useEffect(() => {
        const gameScene = new GameScene(windowWidth, windowHeight);
        gameSceneRef.current = gameScene
        containerRef.current.appendChild(gameScene.renderer.domElement);
        const map = new Map('/star2.jpg');
        gameScene.scene.add(map.mesh);

        const ground = new Ground(0xffffff);
        gameScene.scene.add(ground.mesh);

        const controls = new Control(gameScene.camera, gameScene.renderer.domElement);

        const myGround = new GroundForUnit([0, -1, 50], 노란색);
        gameScene.scene.add(myGround.mesh);
        const enemyGround = new GroundForUnit([0, -1, -50], 노란색);
        gameScene.scene.add(enemyGround.mesh);

        ENEMY_GROUND_FOR_ARRANGE.forEach((position) => {
            const pawnWhite = new Pawn(position, 파란색, gameScene.camera.quaternion)
            gameScene.scene.add(pawnWhite.mesh);
        })

        MY_GROUND_FOR_BATTLE.forEach((array) => {
            array.forEach((position) => {
                const cylinder = new Cylinder(position, 초록색);
                gameScene.scene.add(cylinder.mesh);
            })
        })

        ENEMY_GROUND_FOR_BATTLE.forEach((array) => {
            array.forEach((position) => {
                const cylinder = new Cylinder(position, 빨간색);
                gameScene.scene.add(cylinder.mesh);
            })
        })

        const myItemGround = new GroundForItem([-40, -0.9, 50], 초록색);
        gameScene.scene.add(myItemGround.mesh);
        const enemyItemGround = new GroundForItem([40, -0.9, -50], 빨간색);
        gameScene.scene.add(enemyItemGround.mesh);


        MY_GROUND_FOR_ITEM.forEach((position) => {
            const item = new Item(position, 빨간색);
            gameScene.scene.add(item.mesh);
        })

        ENEMY_GROUND_FOR_ITEM.forEach((position) => {
            const item = new Item(position, 초록색);
            gameScene.scene.add(item.mesh);
        })
        function animate() {
            requestAnimationFrame(animate);
            controls.control.update();
            gameScene.renderer.render(gameScene.scene, gameScene.camera);
        }
        animate();
        return () => {
            containerRef.current.removeChild(gameScene?.renderer.domElement)
        }
    }, []);

    useEffect(() => {
        대기석.forEach((e)=>{
            gameSceneRef.current.scene.remove(e)
        })
        MY_GROUND_FOR_ARRANGE.forEach((position, index) => {
            if (board?.queue[index] != 'null' && board?.queue[index] != undefined) {
                const pawnWhite = new Pawn(position, 파란색, gameSceneRef.current.camera.quaternion)
                gameSceneRef.current.scene.add(pawnWhite.mesh);
                대기석.push(pawnWhite.mesh);
            }
        })
    }, [board])

    return <div ref={containerRef}></div>;
}
