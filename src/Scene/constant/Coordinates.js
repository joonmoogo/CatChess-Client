import * as THREE from 'three';


// 동적으로 생성했었는데, 정적으로 표현하면 관리 쉬워질듯


export const MY_GROUND_FOR_ARRANGE = [
    [-25, 1, 50],
    [-15, 1, 50],
    [-5, 1, 50],
    [5, 1, 50],
    [15, 1, 50],
    [25, 1, 50],
    [35, 1, 50],
    // [45, 1, 50]
]

export const ENEMY_GROUND_FOR_ARRANGE = [
    // [-45, 1, -50],
    [-35, 1, -50],
    [-25, 1, -50],
    [-15, 1, -50],
    [-5, 1, -50],
    [5, 1, -50],
    [15, 1, -50],
    [25, 1, -50],
]

export const ENEMY_GROUND_FOR_BATTLE = [
    [[-24.5, 1, -35], [-10.5, 1, -35], [3.5, 1, -35], [17.5, 1, -35], [31.5, 1, -35]],
    [[-31.5, 1, -21], [-17.5, 1, -21], [-3.5, 1, -21], [10.5, 1, -21], [24.5, 1, -21]],
    [[-24.5, 1, -7], [-10.5, 1, -7], [3.5, 1, -7], [17.5, 1, -7], [31.5, 1, -7]]
]

export const MY_GROUND_FOR_BATTLE = [
    [[-31.5, 1, 7], [-17.5, 1, 7], [-3.5, 1, 7], [10.5, 1, 7], [24.5, 1, 7]],
    [[-24.5, 1, 21], [-10.5, 1, 21], [3.5, 1, 21], [17.5, 1, 21], [31.5, 1, 21]],
    [[-31.5, 1, 35], [-17.5, 1, 35], [-3.5, 1, 35], [10.5, 1, 35], [24.5, 1, 35]]
]

export const BATTLE_GROUND = [
    [[-24.5, 1, -35], [-10.5, 1, -35], [3.5, 1, -35], [17.5, 1, -35], [31.5, 1, -35]],
    [[-31.5, 1, -21], [-17.5, 1, -21], [-3.5, 1, -21], [10.5, 1, -21], [24.5, 1, -21]],
    [[-24.5, 1, -7], [-10.5, 1, -7], [3.5, 1, -7], [17.5, 1, -7], [31.5, 1, -7]],
    [[-31.5, 1, 7], [-17.5, 1, 7], [-3.5, 1, 7], [10.5, 1, 7], [24.5, 1, 7]],
    [[-24.5, 1, 21], [-10.5, 1, 21], [3.5, 1, 21], [17.5, 1, 21], [31.5, 1, 21]],
    [[-31.5, 1, 35], [-17.5, 1, 35], [-3.5, 1, 35], [10.5, 1, 35], [24.5, 1, 35]],
]

export const REVERSED_BATTLE_GROUND = [
    [[-31.5, 1, 35], [-17.5, 1, 35], [-3.5, 1, 35], [10.5, 1, 35], [24.5, 1, 35]],
    [[-24.5, 1, 21], [-10.5, 1, 21], [3.5, 1, 21], [17.5, 1, 21], [31.5, 1, 21]],
    [[-31.5, 1, 7], [-17.5, 1, 7], [-3.5, 1, 7], [10.5, 1, 7], [24.5, 1, 7]],
    [[-24.5, 1, -7], [-10.5, 1, -7], [3.5, 1, -7], [17.5, 1, -7], [31.5, 1, -7]],
    [[-31.5, 1, -21], [-17.5, 1, -21], [-3.5, 1, -21], [10.5, 1, -21], [24.5, 1, -21]],
    [[-24.5, 1, -35], [-10.5, 1, -35], [3.5, 1, -35], [17.5, 1, -35], [31.5, 1, -35]],
]

export const MY_GROUND_FOR_ITEM = [[-44, 0, 46], [-40, 0, 46], [-36, 0, 46], [-44, 0, 50], [-40, 0, 50], [-36, 0, 50], [-44, 0, 54], [-40, 0, 54], [-36, 0, 54]];

export const ENEMY_GROUND_FOR_ITEM = [[36, 0, -54], [40, 0, -54], [44, 0, -54], [36, 0, -50], [40, 0, -50], [44, 0, -50], [36, 0, -46], [40, 0, -46], [44, 0, -46]]


/** 

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
*/