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