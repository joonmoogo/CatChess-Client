import * as THREE from 'three';
import { useEffect, useRef } from 'react';

export default function DefaultGameScene({ windowWidth, windowHeight }) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, windowWidth / windowHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(windowWidth, windowHeight);

    const containerRef = useRef();

    useEffect(() => {
        containerRef.current.appendChild(renderer.domElement);

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        const camera = new THREE.PerspectiveCamera(100, windowWidth / windowHeight, 1, 1000);
        scene.add(camera);

        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
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
