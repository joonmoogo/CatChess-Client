import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();

export default class Map{
    constructor(imageURL){
        this.mapTexture = textureLoader.load(imageURL);
        this.mesh = new THREE.Mesh(
            new THREE.BoxGeometry(700, 700, 700),
            new THREE.MeshBasicMaterial({ map: this.mapTexture, side: THREE.DoubleSide })
        )
    }
}