import * as THREE from 'three';
import { MapControls } from 'three/addons/controls/MapControls.js';

export default class Control {
    constructor(camera,element) {
        this.control = new MapControls(camera, element);
        this.control.enableDamping = true;
        this.control.dampingFactor = 0.05;
        this.control.screenSpacePanning = false;
        this.control.maxDistance = 350;
        this.control.minDistance = 200;
        this.control.maxPolarAngle = Math.PI / 2;
    }
}
