
type CallbackFunction = (fixedDeltaTime: number) => void;

export default function setFixedDeltaTimeout(callback: CallbackFunction, fixedDeltaTime: number = 1 / 60): void {
    let lastTime = 0;
    let accumulator = 0;
    let requestId: number | null = null;

    function loop(currentTime: number): void {
        const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
        lastTime = currentTime;

        accumulator += deltaTime;

        while (accumulator >= fixedDeltaTime) {
            callback(fixedDeltaTime);
            accumulator -= fixedDeltaTime;
        }

        requestId = requestAnimationFrame(loop);
    }

    function startLoop(): void {
        if (requestId === null) {
            requestId = requestAnimationFrame((time: number) => {
                lastTime = time;
                loop(time);
            });
        }
    }

    function stopLoop(): void {
        if (requestId !== null) {
            cancelAnimationFrame(requestId);
            requestId = null;
        }
    }

    // Start the loop initially
    startLoop();

    // Pause the loop when the tab/window becomes hidden
    window.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopLoop();
        } else {
            startLoop();
        }
    });
}

