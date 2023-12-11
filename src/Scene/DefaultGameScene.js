import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// orbitControls는 카메라 컨트롤
import { DragControls } from 'three/addons/controls/DragControls.js';
// 

export default function DefaultGameScene({ windowWidth, windowHeight }) {


    const scene = new THREE.Scene();

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


    const containerRef = useRef();

    // ambientLight는 씬에 있는 모든 객체에 빛을 비춘다.
    const ambientlight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientlight);

    // ambientLight만 있으면 모든 면이 밝아져 입체적으로 보이지 않는다
    // directionalLight는 특정 방향에서 객체에 빛을 비춘다.
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);

    // position.set으로 조명의 위치(x,y,z)를 변경할 수 있음
    directionalLight.position.set(-1, 1, 1);
    // 조명에 그림자 생성 허용
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 1, 0xff0000);
    // 장면에 조명 시각화 객체 추가
    scene.add(lightHelper);

    // axesHelper는 x,y,z의 위치 선형으로 나타냄
    const axes = new THREE.AxesHelper(5);
    scene.add(axes);


    useEffect(() => {
        containerRef.current.appendChild(renderer.domElement);

        // 박스 객체
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        // MeshBasicMaterial은 조명에 반응하지 않음, MeshStandardMaterial을 사용
        // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);

        // 그림자 생성 허용
        cube.castShadow = true;
        cube.name = 'testCube';
        scene.add(cube);



        // 평면 바닥 객체
        const groundGeometry = new THREE.PlaneGeometry(100, 100);
        const groundMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.name = 'ground';
        // 바닥 객체를 바닥처럼 눕히기 위해 X축을 90도 회전
        ground.rotation.x = Math.PI * -0.5;
        // 바닥 객체를 중앙에서 아래로 위치 설정
        ground.position.set(0, -1, 0);
        // 그림자 받기 허용
        ground.receiveShadow = true;
        scene.add(ground);

        const gridHelper = new THREE.GridHelper(100, 100);
        scene.add(gridHelper);

        const camera = new THREE.PerspectiveCamera(100, windowWidth / windowHeight, 1, 1000);
        scene.add(camera);
        camera.position.set(0, 2, 20);

        // 컨트롤 가능한 카메라 생성
        const orbitcontrols = new OrbitControls(camera, renderer.domElement);
        const 가로 = 6;
        const 세로 = 6;

        // Cylinder를 담을 배열
        const cylinders = [];

        const radius = 5; // 기본 반지름
        const height = 10; // 기본 높이

        const totalWidth = radius * 2 * 가로;
        const totalHeight = radius * 2 * 세로;

        for (let i = 1; i <= 세로; i++) {
            for (let j = 1; j <= 가로; j++) {
                console.log(j,i);
                // Cylinder 생성
                const geometry = new THREE.CylinderGeometry(radius, radius, height, 6);
                const material = new THREE.MeshStandardMaterial({ color: 0xffff00 });
                const cylinder = new THREE.Mesh(geometry, material);

                // 정 가운데 위치 계산
                let x = radius * 2 * (j - (가로 + 1) / 2);
                let y = 0;
                let z = radius * 2 * (i - (세로 + 1) / 2);

                // i가 2의 배수이면서 첫 번째 열일 때, z 위치에 20 추가
                if (i % 2 == 0) {
                    x += radius;
                }
                cylinder.position.set(x, y, z);
                cylinder.castShadow = true;
                scene.add(cylinder);
                cylinders.push(cylinder);
            }
        }

        // const dragcontrols = new DragControls([gridHelper], camera, renderer.domElement);
        // dragcontrols.enabled=false;

        // dragcontrols.addEventListener('hoveron', (event) => {
        // console.log(event);
        // })
        // dragcontrols.addEventListener('hoverOff', (event) => {
        // orbitcontrols.enabled=true;
        // })
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
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
                const clickedObject = intersects[0];
                console.log('Clicked on', clickedObject);
                cube.position.x = clickedObject.point.x
                cube.position.y = clickedObject.point.y
                cube.position.z = clickedObject.point.z
            }
        };

        // Three.js 렌더러에 마우스 이벤트 추가
        renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);

        function animate() {
            requestAnimationFrame(animate);
            // orbitcontrols.update(); // 카메라 컨트롤 하기위해 꼭 실행하는 함수
            axes.rotation.x += 0.005;
            axes.rotation.y += 0.005;
            cube.rotation.x += 0.005;
            cube.rotation.y += 0.005;
            renderer.render(scene, camera);
        }

        animate();

        camera.position.z = 5;

        return () => {
            containerRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={containerRef}></div>;
}
