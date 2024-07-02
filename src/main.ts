import p5 from "p5";
import "./style.css"
import { Rigidbody } from "./core/rigidbody";
import { Ether } from "./core/ether";
import { Vector2D } from "./core/utils/vector";
import {ForceBuilder} from "./core/force.ts";


class P5Ether implements Ether {
    private rb: Rigidbody[] = [];
    private p5Instance;
    private isRunning: boolean = false;

    constructor() {
        this.start = this.start.bind(this);
        this.next = this.next.bind(this);
        this.start()
    }


    addRigidbody(rb: Rigidbody): void {
        this.rb.push(rb);
    }

    start(): void {
        const sketch = (p) => {
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
                    drawVector(rb.velocity, Vector2D.add(rb.position, new Vector2D(25, 25)) )
                    rb.forces.forEach((x) => {
                        const force = x.apply(rb)
                        drawVector(Vector2D.scalarMultiply(1/10, force), Vector2D.add(rb.position, new Vector2D(25, 25)) )
                    })
                    drawVector(rb.velocity, Vector2D.add(rb.position, new Vector2D(25, 25)) )
                });
            };

            function drawVector(v: Vector2D, point: Vector2D): void {
                p.push();
                p.stroke(255, 0, 0); // Set the stroke color to red
                p.strokeWeight(2);

                p.fill(0, 255, 0); // Set the fill color to green for the point
                p.ellipse(point.x, point.y, 5, 5); // Draw the point as a small circle


                p.translate(point.x, point.y);
                p.line(0, 0, v.x, v.y);

                const arrowSize = 7;
                p.push();
                p.translate(v.x, v.y);
                p.rotate(Math.atan2(v.y, v.x));
                p.line(0, 0, -arrowSize, arrowSize / 2);
                p.line(0, 0, -arrowSize, -arrowSize / 2);
                p.pop();
                p.pop();
            }



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
    }

    next(): void {
        const dt = 0.2
        this.rb.forEach(rb => rb.next(dt))
        this.p5Instance?.redraw();
    }

    drawVector(v: Vector2D, p: Vector2D): void {
    }

}

const ether = new P5Ether();

const rb1 = Rigidbody.create().setPosition(window.innerWidth/2, window.screenY/2).setMass(50).build();
rb1.addForce(ForceBuilder.from((rb) => new Vector2D(0, 9.8*rb.mass.value)))

ether.addRigidbody(rb1);
ether.drawVector(new Vector2D(1, 1), new Vector2D(1, 2))

setInterval(() => {
    ether.next();
}, 1000/30); // 30 frames per second (adjust as needed)