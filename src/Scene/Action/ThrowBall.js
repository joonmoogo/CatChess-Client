function throwBall(unit, targetPosition,scene) {
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