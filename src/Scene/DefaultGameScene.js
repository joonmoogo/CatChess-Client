import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// orbitControls는 카메라 컨트롤
import { DragControls } from 'three/addons/controls/DragControls.js';
import { MapControls } from 'three/addons/controls/MapControls.js';

// 

export default function DefaultGameScene({ windowWidth, windowHeight }) {

    let pawns = [];
    let isDragging = false;
    const containerRef = useRef();



    useEffect(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xefd1b5);
        // scene.fog = new THREE.FogExp2( 0xefd1b5, 0.0015 );



        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(windowWidth, windowHeight);

        renderer.shadowMap.enabled = true;
        // 렌더러에 그림자 맵 타입 설정
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;


        // BasicShadowMap : 필터링이 적용되지 않은 그림자 맵 (빠르지만 품질이 가장 낮습니다.)
        // PCFShadowMap : Percentage-Closer Filtering(PCF, 퍼센티지-클로저 필터링)을 사용한 그림자 맵 
        // (그림자 경계에서 보이는 에일리어싱(Aliasing, 일그러짐) 문제를 해결)
        // PCFSoftShadowMap : PCF에서 발전된 기능을 사용한 그림자 맵 (반그림자(penumbra) 영역을 좀 더 부드럽게 처리
        // , 그림자가 생성될 객체와 그림자가 표현될 객체의 거리에 따른 그림자 처리)
        // VSMShadowMap : Variance Shadow Map(VSM)을 사용한 그림자 맵



        // ambientLight는 씬에 있는 모든 객체에 빛을 비춘다.
        const ambientlight = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(ambientlight);

        // ambientLight만 있으면 모든 면이 밝아져 입체적으로 보이지 않는다
        // directionalLight는 특정 방향에서 객체에 빛을 비춘다.
        const directionalLight = new THREE.DirectionalLight(0xffffff, 2);

        // position.set으로 조명의 위치(x,y,z)를 변경할 수 있음
        directionalLight.position.set(100, 100, -100);
        // 조명에 그림자 생성 허용
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        // const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 2);
        // hemiLight.color.setHSL(0.6, 1, 0.6);
        // hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        // hemiLight.position.set(0, 50, 0);
        // scene.add(hemiLight);
        const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 1, 0xff0000);
        // 장면에 조명 시각화 객체 추가
        scene.add(lightHelper);
    
        containerRef.current.appendChild(renderer.domElement);


        const textureLoader = new THREE.TextureLoader();
        const cubeTextureLoader = new THREE.CubeTextureLoader();
        const maptexture = textureLoader.load('/star2.jpg');
        const mapGeometry = new THREE.BoxGeometry(700, 700, 700);
        const mapMaterial = new THREE.MeshBasicMaterial({ map: maptexture, side: THREE.DoubleSide });
        const map = new THREE.Mesh(mapGeometry, mapMaterial);
        scene.add(map);

        // 평면 바닥 객체
        const groundGeometry = new THREE.BoxGeometry(100, 100, 10);
        const groundMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.name = 'ground';
        // 바닥 객체를 바닥처럼 눕히기 위해 X축을 90도 회전
        ground.rotation.x = Math.PI * -0.5;
        // 바닥 객체를 중앙에서 아래로 위치 설정
        ground.position.set(0, -6.1, 0);
        // 그림자 받기 허용
        // ground.receiveShadow = true;
        scene.add(ground);

        // const gridHelper = new THREE.GridHelper(100, 100);
        // scene.add(gridHelper);

        const camera = new THREE.PerspectiveCamera(20, windowWidth / windowHeight, 1, 1000);
        scene.add(camera);
        camera.position.set(0, 2, 20);

        // 컨트롤 가능한 카메라 생성
        const controls = new MapControls(camera, renderer.domElement);

        //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

        controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        controls.dampingFactor = 0.05;

        controls.screenSpacePanning = false;


        controls.minDistance = 200;
        controls.maxDistance = 350;

        controls.maxPolarAngle = Math.PI / 2;
        const 가로 = 5;
        const 세로 = 6;

        // Cylinder를 담을 배열
        const cylinders = [];

        const cylinderRadius = 7; // 기본 반지름
        const cylinderHeight = 4; // 기본 높이


        for (let i = -30; i <= 40; i += 10) {
            var pawnWhite = new THREE.Mesh(
                new THREE.BoxGeometry(2, 4, 2), // 수정된 부분
                new THREE.MeshStandardMaterial({ color: 0x0fffff })
            );

            pawnWhite.receiveShadow=true

            // 오른팔 생성
            const armGeometry = new THREE.BoxGeometry(1, 1, 0.5); // 수정된 부분
            const armMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
            var armMesh = new THREE.Mesh(armGeometry, armMaterial);

            // 오른팔을 몸통에 붙이기
            armMesh.position.set(1, 0, 0);
            pawnWhite.add(armMesh); // 수정된 부분
            pawnWhite.name = 'unit'

            // 몸통 위치 설정
            pawnWhite.position.set(i, 1, 50); // 수정된 부분

            // Scene에 몸통과 오른팔 추가
            scene.add(pawnWhite);
            pawns.push(pawnWhite);
        }
        for (let i = -40; i <= 30; i += 10) {
            var pawnWhite = new THREE.Mesh(
                new THREE.BoxGeometry(2, 4, 2), // 수정된 부분
                new THREE.MeshStandardMaterial({ color: 0x0fffff })
            );

            // 오른팔 생성
            const armGeometry = new THREE.BoxGeometry(1, 1, 0.5); // 수정된 부분
            const armMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
            var armMesh = new THREE.Mesh(armGeometry, armMaterial);

            // 오른팔을 몸통에 붙이기
            armMesh.position.set(1, 0, 0);
            pawnWhite.add(armMesh); // 수정된 부분
            pawnWhite.name = 'unit'

            // 몸통 위치 설정
            pawnWhite.position.set(i, 1, -50); // 수정된 부분

            // Scene에 몸통과 오른팔 추가
            scene.add(pawnWhite);
            // pawns.push(pawnWhite);
        }

        for (let i = 1; i <= 2; i++) {
            const groundGeometry = new THREE.PlaneGeometry(100, 15, 10, 1);
            const groundMaterial = new THREE.MeshLambertMaterial({ color: 0xffff00 });
            const ground = new THREE.Mesh(groundGeometry, groundMaterial);
            ground.name = 'groundForUnit';
            // 바닥 객체를 바닥처럼 눕히기 위해 X축을 90도 회전
            ground.rotation.x = Math.PI * -0.5;
            // 바닥 객체를 중앙에서 아래로 위치 설정
            ground.position.set(0, -1, i == 1 ? 50 : -50);
            // 그림자 받기 허용
            // ground.receiveShadow = true;
            scene.add(ground);
        }

        for (let i = 1; i <= 세로; i++) {
            for (let j = 1; j <= 가로; j++) {

                console.log(j, i);
                // Cylinder 생성
                const geometry = new THREE.CylinderGeometry(cylinderRadius, cylinderRadius, cylinderHeight, 6);
                const material = new THREE.MeshStandardMaterial({ color: i > 세로 / 2 ? 0xfff00 : 0xff0000 });
                const cylinder = new THREE.Mesh(geometry, material);
                cylinder.receiveShadow=true;
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
                scene.add(cylinder);
                if(i>세로/2){
                    cylinders.push(cylinder);
                }
            }
        }


        const dragcontrols = new DragControls([...pawns], camera, renderer.domElement);
        // dragcontrols.enabled=false;
        dragcontrols.addEventListener('dragstart',(()=>{
            controls.enabled = false;
        }))

        dragcontrols.addEventListener('dragend',(()=>{
            controls.enabled = true;
        }))

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const onDocumentMouseMove = (event) => {
            event.preventDefault();
            // 마우스 좌표 설정
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            // Raycaster로 Scene에서 클릭된 객체 확인
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children);
            // 클릭된 객체에 대한 동작 수행
            if (intersects.length > 0) {
                const FindedObject = intersects[0];

                const objectName = FindedObject.object.name;
                console.log(`im ${objectName}`);
                switch (objectName) {
                    case 'cylinder':
                        FindedObject.object.material.color.set(1,1,1);
                }
            }
        };

        const onDocumentMouseDown = (event) => {
            event.preventDefault();
            // 마우스 좌표 설정
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            // Raycaster로 Scene에서 클릭된 객체 확인
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children);
            // 클릭된 객체에 대한 동작 수행
            if (intersects.length > 0) {
                const FindedObject = intersects[0];
                const objectname = FindedObject.object.name;
                if (objectname == 'unit') {
                    // isDragging = !isDragging;
                    // console.log(objectname);
                    console.log(FindedObject.object);
                    console.log(pawns[0]);
                    if(pawns.includes(FindedObject.object)){
                        FindedObject.object.material.color.set(1,1,1);
                    }
                }
            }
        };

        
        const onDocumentMouseUp = (event) => {
            event.preventDefault();
            // 마우스 좌표 설정
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            // Raycaster로 Scene에서 클릭된 객체 확인
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children);
            // 클릭된 객체에 대한 동작 수행
            if (intersects.length > 0) {
                const FindedObject = intersects[0];
                const objectname = FindedObject.object.name;
                if (objectname == 'unit') {
                    // isDragging = !isDragging;
                    // console.log(objectname);
                    console.log(FindedObject.object);
                    console.log(pawns[0]);
                    if(pawns.includes(FindedObject.object)){
                        FindedObject.object.material.color.set(0,0,1);
                    }
                }
            }
        };

        renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
        renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
        renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);
        


        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            // orbitcontrols.update(); // 카메라 컨트롤 하기위해 꼭 실행하는 함수
            // axes.rotation.x += 0.005;
            // axes.rotation.y += 0.005;
            // cube.rotation.x += 0.005;
            // cube.rotation.y += 0.005;
            // pawnWhite.rotation.x +=0.1;
            armMesh.rotation.x += 0.1;
            renderer.render(scene, camera);
        }

        animate();

        camera.position.z = 100;
        // camera.position.y=10;
        camera.position.y = 105;

        return () => {
            containerRef.current.removeChild(renderer.domElement);
            renderer.domElement.removeEventListener('mousemove', onDocumentMouseMove, false);
            renderer.domElement.removeEventListener('mousedown', onDocumentMouseDown, false);
        };
    }, []);

    return <div ref={containerRef}></div>;
}
