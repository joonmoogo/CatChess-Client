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
    BATTLE_GROUND,
    ENEMY_GROUND_FOR_ARRANGE,
    ENEMY_GROUND_FOR_BATTLE,
    ENEMY_GROUND_FOR_ITEM,
    MY_GROUND_FOR_ARRANGE,
    MY_GROUND_FOR_BATTLE,
    MY_GROUND_FOR_ITEM,
    REVERSED_BATTLE_GROUND,
} from './constant/Coordinates';

import {
    노란색,
    초록색,
    빨간색,
    파란색
} from './constant/Color';
import GroundForItem from './CustomMeshClass/GroundForItem';
import Item from './CustomMeshClass/Item';

export default function DefaultGameScene(
    {
        windowWidth,
        windowHeight,
        boardUpdate, // boardUpdate.queue = ARRANGE BOARD = ARRAY[7] , boardUpdate.board = ARRAY[3][5]  boardUpdate
        battleUpdate, // BATTLE BOARD = ARRAY[6][5] battleUpdate
        battleMove, // BATTLE MOVE ( BEFORE Y3 , BEFORE X3 ) ->  ( NEXT Y4 , NEXT X4 ) battleMove 
        state, // STATE : ARRANGE, BATTLE, READY ...
    }) {
    const containerRef = useRef();
    const gameSceneRef = useRef();
    // const initial대기석 = Array(MY_GROUND_FOR_ARRANGE.length).fill(null);
    // const initial배틀석 = Array(MY_GROUND_FOR_BATTLE.length).fill(null).map(() => Array(MY_GROUND_FOR_BATTLE[0].length).fill(null));
    // const initial전체배틀석 = Array(BATTLE_GROUND.length).fill(null).map(() => Array(BATTLE_GROUND[0].length).fill(null));
    // const [대기석, set대기석] = useState(initial대기석); // ARRAY[7]
    // const [배틀석, set배틀석] = useState(initial배틀석); // ARRAY[3][5]
    // const [전체배틀석, set전체배틀석] = useState(initial전체배틀석); //ARRAY[6][5]

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

        // ENEMY_GROUND_FOR_ARRANGE.forEach((position) => {
        //     const pawnWhite = new Pawn(position, 파란색, gameScene.camera.quaternion)
        //     gameScene.scene.add(pawnWhite.mesh);
        // })

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
        if(!boardUpdate) return;

        // scene의 object 삭제
        gameSceneRef.current.units.forEach(unit => {
            gameSceneRef.current.scene.remove(unit.mesh);
        });
        gameSceneRef.current.units = [];

        // boardUpdate.board, queue에 따라 Pawn 생성
        let newBoard;
        newBoard = Array(MY_GROUND_FOR_BATTLE.length).fill(null).map(() => Array(BATTLE_GROUND[0].length).fill(null));
        boardUpdate.board.forEach(row =>{
            newBoard.push(row);
        });

        newBoard.forEach((row, i)=>{
            row.forEach((cell, j)=>{
                if(!cell) return;
                let position = [...BATTLE_GROUND[i][j]];
                position[1]+=4;

                let newPawn = new Pawn(position, gameSceneRef.current, cell);
                gameSceneRef.current.scene.add(newPawn.mesh);
            })
        })

        boardUpdate.queue.forEach((cell, i)=>{
            if(!cell) return;
            let position = [...MY_GROUND_FOR_ARRANGE[i]];
            // position[1]+=4;

            let newPawn = new Pawn(position, gameSceneRef.current, cell);
            gameSceneRef.current.scene.add(newPawn.mesh);
        })
    }, [boardUpdate]);

    // boardUpdate 
    // -board : ARRAY[3][5] // 우리팀 초록색 육각형
    // -queue : ARRAY[7] // 우리 대기석
    // -player : String // player

    useEffect(() => {
        if(!battleUpdate) return;

        // scene의 object 삭제
        gameSceneRef.current.units.forEach(unit => {
            gameSceneRef.current.scene.remove(unit.mesh);
        });
        gameSceneRef.current.units = [];

        // battleUpdate.board, queue에 따라 Pawn 생성

        battleUpdate.board.forEach((row, i)=>{
            row.forEach((cell, j)=>{
                if(!cell) return;
                let position = [...battleUpdate.reversed?REVERSED_BATTLE_GROUND[i][j]: BATTLE_GROUND[i][j]];
                position[1]+=4;

                let newPawn = new Pawn(position, gameSceneRef.current, cell);
                gameSceneRef.current.scene.add(newPawn.mesh);
            })
        })
    }, [battleUpdate])

    useEffect(() => {

    }, [state])

    if(!battleMove) return

    // 배틀석 ARRAY[3][5] 서버에서 받았던 데이터 저장하는 state
    // 전체배틀석 ARRAY[6][5] 서버에서 받았떤 데이터 저장하는 state

    // battleUpdate
    // -board : ARRAY[6][5] // 전체 육각형 6 x 5
    // -reversed : boolean // true or false

    // battleUpdate.board = boardUpdate
    // battleUpdate.reversed = true or false

    useEffect(() => {
    }, [battleMove]);

    // battleMove
    // beforeX = 2
    // beforeY = 2
    // nextX = 3
    // nextY = 3



    return <div ref={containerRef}></div>;
}
