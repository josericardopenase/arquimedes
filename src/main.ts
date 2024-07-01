import p5 from "p5";
import "./style.css"
import { Rigidbody } from "./core/rigidbody";
import { Ether } from "./core/ether";
import { Vector2D } from "./core/utils/vector";


class P5Ether implements Ether {
    private rb: Rigidbody[] = [];
    private p5Instance: p5 | null = null;
    private isRunning: boolean = false;

    constructor() {
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.next = this.next.bind(this);
    }
    

    addRigidbody(rb: Rigidbody): void {
        this.rb.push(rb);
    }

    start(): void {
        const sketch = (p: p5) => {
            p.setup = () => {
                p.createCanvas(p.windowWidth, p.windowHeight);
                p.noLoop(); // Ensure draw() is not called continuously

                // Initialize any drawing settings here
                p.background("#ffffff");
                drawGrid(100); // Draw grid initially
            };

            p.draw = () => {
                p.background("#ffffff");
                drawGrid(100); // Redraw grid each frame

                // Draw all rigidbodies
                this.rb.forEach(rb => {
                    p.fill(0, 0, 255);
                    p.rect(rb.position.x, rb.position.y, 50, 50);
                });
            };

            // Helper function to draw grid
            function drawGrid(distance: number) {
                p.stroke(200);
                p.fill(0);
                p.textSize(12);
                p.textAlign(p.CENTER, p.CENTER);

                const offsetX = p.width / 2 % distance;
                const offsetY = p.height / 2 % distance;

                for (let x = offsetX; x < p.width; x += distance) {
                    p.line(x, 0, x, p.height);
                    p.text(Math.floor(x - p.width / 2).toString(), x, 10); // Draw x-coordinate numbers
                }
                for (let y = offsetY; y < p.height; y += distance) {
                    p.line(0, y, p.width, y);
                    p.text(Math.floor(y - p.height / 2).toString(), 10, y); // Draw y-coordinate numbers
                }
            };

            return {
                drawGrid
            };
        };

        // Initialize p5 instance with the sketch
        this.p5Instance = new p5(sketch);
        this.isRunning = true;
        this.p5Instance.loop(); // Start p5 draw loop
    }

    stop(): void {
        if (this.p5Instance) {
            this.p5Instance.remove();
            this.p5Instance = null;
            this.isRunning = false;
        }
    }

    next(): void {
        if (!this.isRunning) {
            console.error("Ether is not running. Call start() first.");
            return;
        }

        const dt = 1 // Convert to seconds
        console.log(dt)
        
        // Update rigidbodies
        this.rb.forEach(rb => {
            // Example force application (replace with actual physics calculations)
            //const totalForce = { x: 0, y: 0 }; // Example: Zero forces for now
            //const acceleration = { x: totalForce.x / rb.mass.value, y: totalForce.y / rb.mass.value };
            rb.next(dt)
        });

        // Redraw canvas with updated positions
        this.p5Instance?.redraw();
    }
}

const ether = new P5Ether();

const rb1 = Rigidbody.create().setPosition(0, 0).setMass(50).build();
ether.addRigidbody(rb1);


rb1.forces = [
  {
    apply: (rb) =>  new Vector2D(0, 9.8)
  }
]


ether.addRigidbody(rb1);

// Start the ether (starts p5 sketch)
ether.start();


setInterval(() => {
    ether.next();
}, 1000 / 60); // 30 frames per second (adjust as needed)