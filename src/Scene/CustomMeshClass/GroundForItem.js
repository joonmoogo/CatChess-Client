import * as THREE from 'three';

export default class GroundForItem{
    constructor(position,color){
        this.mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(12, 12, 12, 5),
            new THREE.MeshLambertMaterial({ color:color  })
        )
        this.mesh.rotation.x = Math.PI * -0.5;
        this.mesh.position.set(...position)
    }
}
