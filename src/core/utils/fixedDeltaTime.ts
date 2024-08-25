
type CallbackFunction = (fixedDeltaTime: number) => void;

export function setFixedDeltaTimeout(callback: CallbackFunction, fixedDeltaTime: number = 1 / 60): void {
    let lastTime = 0;
    let accumulator = 0;

    function loop(currentTime: number): void {
        const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
        lastTime = currentTime;

        accumulator += deltaTime;

        while (accumulator >= fixedDeltaTime) {
            callback(fixedDeltaTime);
            accumulator -= fixedDeltaTime;
        }

        requestAnimationFrame(loop);
    }

    // Initialize the lastTime and start the loop
    requestAnimationFrame((time: number) => {
        lastTime = time;
        loop(time);
    });
}
