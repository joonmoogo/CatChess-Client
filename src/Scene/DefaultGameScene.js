import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// orbitControls는 카메라 컨트롤
import { DragControls } from 'three/addons/controls/DragControls.js';
import Map from './MeshClass/Map';
import Ground from './MeshClass/Ground';
import Control from './MeshClass/Control';
import GroundForUnit from './MeshClass/GroundForUnit';
import Cylinder from './MeshClass/Cylinder';

// 

export default function DefaultGameScene({ windowWidth, windowHeight }) {


    let pawns = [];
    let selectedObject = null;
    const initialVelocity = new THREE.Vector3(0, 0.6, -0.5);
    const gravity = new THREE.Vector3(0, -0.01, 0);
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const containerRef = useRef();

    useEffect(() => {
        const scene = new THREE.Scene();
        // scene.fog = new THREE.FogExp2( 0xefd1b5, 0.0015 );

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(windowWidth, windowHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        containerRef.current.appendChild(renderer.domElement);

        // ambientLight는 씬에 있는 모든 객체에 빛을 비춘다.
        const ambientlight = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(ambientlight);

        // ambientLight만 있으면 모든 면이 밝아져 입체적으로 보이지 않는다
        // directionalLight는 특정 방향에서 객체에 빛을 비춘다.
        const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.position.set(100, 100, -100);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.11, 0xff0000);
        scene.add(lightHelper);

        const map = new Map('/star2.jpg');
        scene.add(map.mesh);

        const ground = new Ground(0xffffff);
        scene.add(ground.mesh);

        const camera = new THREE.PerspectiveCamera(20, windowWidth / windowHeight, 1, 1000);
        camera.position.set(0, 2, 20);
        scene.add(camera);

        const controls = new Control(camera, renderer.domElement);

        for (let i = -30; i <= 40; i += 10) {
            var pawnWhite = new THREE.Mesh(
                new THREE.BoxGeometry(2, 4, 2), // 수정된 부분
                new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff })
            );

            pawnWhite.receiveShadow = true


            pawnWhite.name = 'unit'
            pawnWhite.position.set(i, 1, 50);
            const healthBarGeometry = new THREE.BoxGeometry(2.2, 0.2, 0.2);
            const healthBarMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
            const healthBarMesh = new THREE.Mesh(healthBarGeometry, healthBarMaterial);

            healthBarMesh.position.set(0, 4, 0);
            pawnWhite.add(healthBarMesh);

            healthBarMesh.scale.set(1, 1, 1);
            healthBarMesh.position.set(0, 4, 0);

            const healthBars = [];
            healthBars.push(healthBarMesh);
            // Scene에 몸통과 오른팔 추가
            scene.add(pawnWhite);
            function updateHealthBarPosition() {
                healthBarMesh.position.set(0, 4, 0);
                healthBarMesh.quaternion.copy(camera.quaternion);
                requestAnimationFrame(updateHealthBarPosition)
            }
            updateHealthBarPosition();
            pawns.push(pawnWhite);
        }
        for (let i = -40; i <= 30; i += 10) {
            var pawnWhite = new THREE.Mesh(
                new THREE.BoxGeometry(2, 4, 2), // 수정된 부분
                new THREE.MeshStandardMaterial({ color: 0x0fffff, roughness: 0 })
            );

            // 오른팔 생성
            const armGeometry = new THREE.BoxGeometry(1, 1, 0.5); // 수정된 부분
            const armMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
            const armMesh = new THREE.Mesh(armGeometry, armMaterial);

            // 오른팔을 몸통에 붙이기
            armMesh.position.set(1, 0, 0);
            pawnWhite.add(armMesh); // 수정된 부분
            pawnWhite.name = 'unit'

            const healthBarGeometry = new THREE.BoxGeometry(2.2, 0.2, 0.2);
            const healthBarMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
            const healthBarMesh = new THREE.Mesh(healthBarGeometry, healthBarMaterial);

            healthBarMesh.position.set(0, 4, 0);
            pawnWhite.add(healthBarMesh);
            // 몸통 위치 설정
            pawnWhite.position.set(i, 1, -50); // 수정된 부분

            // Scene에 몸통과 오른팔 추가
            scene.add(pawnWhite);

            function updateHealthBarPosition() {
                healthBarMesh.position.set(0, 4, 0);
                healthBarMesh.quaternion.copy(camera.quaternion);
                requestAnimationFrame(updateHealthBarPosition)
            }
            updateHealthBarPosition();
        }

        const enemyGround = new GroundForUnit([0, -1, -50], 0xffff00);
        scene.add(enemyGround.mesh);
        const myGround = new GroundForUnit([0, -1, 50], 0xffff00);
        scene.add(myGround.mesh);


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
                scene.add(cylinder);
                if (i > 세로 / 2) {
                    cylinders.push(cylinder);
                }
            }
        }

        const onDocumentMouseMove = (event) => {
            event.preventDefault();
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children);
            if (intersects.length > 0) {
                const FindedObject = intersects[0];
                const objectName = FindedObject.object.name;
                if (selectedObject) {
                    selectedObject.position.copy(FindedObject.point.add(new THREE.Vector3(0, 0, 4)))

                }
                else {

                }
                switch (objectName) {
                    case 'cylinder':

                    case 'unit':
                }
            }
        };

        const onDocumentMouseDown = (event) => {
            event.preventDefault();
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children);
            if (intersects.length > 0) {
                const FindedObject = intersects[0];
                const objectname = FindedObject.object.name;
                console.log(FindedObject);
                switch (objectname) {
                    case 'cylinder':
                        // moveUnit(pawns[0],new THREE THREE.Vector3)
                        if (selectedObject) {
                            selectedObject.position.set(
                                FindedObject.object.position.x,
                                FindedObject.object.position.y + 4,
                                FindedObject.object.position.z
                            );
                            selectedObject = null;
                        }
                        break;

                    case 'unit':
                        if (!selectedObject) {
                            selectedObject = FindedObject.object;
                        }
                        else {
                            selectedObject = null;
                        }
                        break;

                    case 'groundForUnit':
                        break;

                }
            }
        };

        const onDocumentMouseUp = (event) => {
            event.preventDefault();
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children);
            if (intersects.length > 0) {
                const FindedObject = intersects[0];
                const objectname = FindedObject.object.name;
                if (objectname == 'unit') {
                    console.log(FindedObject.object);
                    console.log(pawns[0]);
                    if (pawns.includes(FindedObject.object)) {
                        FindedObject.object.material.color.set(0, 0, 1);
                    }
                }
            }
        };

        renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
        renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);

        function throwBall(unit, targetPosition) {
            const gravity = new THREE.Vector3(0, -0.008, 0);
            const initialPosition = unit.position;
            const initialVelocity = calculateInitialVelocity(initialPosition, targetPosition);
            const geometry = new THREE.SphereGeometry(0.5, 32, 32);
            const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xff0000 });
            const ball = new THREE.Mesh(geometry, material);
            scene.add(ball);
            let time = 0;
            function calculateInitialVelocity(start, end) {
                const displacement = end.clone().sub(start);
                const timeToReachTarget = Math.sqrt(2 * displacement.y / Math.abs(gravity.y));
                const initialVelocityY = -gravity.y * timeToReachTarget / 2;
                const initialVelocity = displacement.clone().divideScalar(timeToReachTarget);
                initialVelocity.y = initialVelocityY;
                return initialVelocity;
            }
            function updatePosition() {
                const displacement = new THREE.Vector3();
                displacement.copy(initialVelocity)
                    .multiplyScalar(time)
                    .add(gravity.clone().multiplyScalar(0.5 * time * time));
                ball.position.copy(initialPosition).add(displacement);
                time += 1;
                if (ball.position.y <= 2) {
                    time = 0;
                }
                requestAnimationFrame(updatePosition);
            }
            updatePosition();
        }

        function moveUnit(unit, targetPosition) {
            const gravity = new THREE.Vector3(0, -0.008, 0);
            const jumpHeight = 20; // Adjust this value to control the jump height
            const initialPosition = unit.position.clone();
            const initialVelocity = calculateInitialVelocity(initialPosition, targetPosition);

            let time = 0;
            let isJumping = true;

            function calculateInitialVelocity(start, end) {
                const displacement = end.clone().sub(start);
                const timeToReachTarget = Math.sqrt(2 * jumpHeight / Math.abs(gravity.y));
                const initialVelocityY = -gravity.y * timeToReachTarget / 2;
                const initialVelocity = displacement.clone().divideScalar(timeToReachTarget);
                initialVelocity.y = initialVelocityY;
                return initialVelocity;
            }

            function updatePosition() {
                const displacement = new THREE.Vector3();
                displacement.copy(initialVelocity)
                    .multiplyScalar(time)
                    .add(gravity.clone().multiplyScalar(0.5 * time * time));

                unit.position.copy(initialPosition).add(displacement);
                time += 1;

                if (isJumping && unit.position.y <= jumpHeight) {
                    isJumping = false;
                    time = 0;
                }
                if (!isJumping && unit.position.y <= 4.99) {
                    time = 0;
                }
                if (isJumping || unit.position.y > 4.99) {
                    requestAnimationFrame(updatePosition);
                }
            }

            updatePosition();
        }




        function animate() {
            requestAnimationFrame(animate);
            controls.control.update();
            renderer.render(scene, camera);
        }
        animate();

        camera.position.z = 100;
        camera.position.y = 105;

        return () => {
            containerRef.current.removeChild(renderer.domElement);
            renderer.domElement.removeEventListener('mousemove', onDocumentMouseMove, false);
            renderer.domElement.removeEventListener('mousedown', onDocumentMouseDown, false);
        };
    }, []);

    return <div ref={containerRef}></div>;
}
