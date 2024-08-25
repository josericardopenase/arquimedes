import UniverseRenderer from "../universeRenderer.ts";
import p5 from "p5";
import {Particle} from "../../physics/particle";
import {Vector2D} from "../../math/vectors";
import Universe from "../universe.ts";

export default class P5UniverseRenderer  implements UniverseRenderer{
    private p5Instance: p5;
    private universe : Universe;

    constructor(universe: Universe) {
        this.universe = universe;
        const sketch = (p: p5) => {
            p.setup = () => {
                p.createCanvas(p.windowWidth, p.windowHeight);
                p.noLoop(); // Ensure draw() is not called continuously
                p.background("#ffffff");
                drawGrid(100); // Draw grid initially
            };

            p.draw = () => {
                p.background("#ffffff");
                drawGrid(100); // Redraw grid each frame

                function drawParticle(rb : Particle){
                    const color = p.color(rb.apparience.color);
                    p.fill(color);

                    p.rect(
                        rb.position.x,
                        rb.position.y,
                        rb.apparience.width,
                        rb.apparience.height,
                    );

                    rb.forces.forEach((x) => {
                        const force = x.apply(rb);
                        drawVector(
                            Vector2D.scalarMultiply(1 / 10, force),
                            Vector2D.add(
                                rb.position,
                                new Vector2D(rb.apparience.width / 2, rb.apparience.height / 2),
                            ),
                        );
                    });
                    drawVector(
                        rb.velocity,
                        Vector2D.add(
                            rb.position,
                            new Vector2D(rb.apparience.width / 2, rb.apparience.height / 2),
                        ),
                    );
                }

                // Draw all rigidbodies
                this.universe.getRigidbodies().forEach((rb) => {
                    const color = p.color("green");
                    p.rect(
                        rb.getCenterOfMass().x,
                        rb.getCenterOfMass().y,
                        50,
                        50,
                    );
                    p.fill(color);
                })
                this.universe.getParticles().forEach((p) => drawParticle(p));
                this.universe.getRigidbodies().forEach((rb) => rb.getParticles().forEach((p) => drawParticle(p)))
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
                const offsetX = (p.width / 2) % distance;
                const offsetY = (p.height / 2) % distance;
                for (let x = offsetX; x < p.width; x += distance) {
                    p.line(x, 0, x, p.height);
                    p.text(Math.floor(x - p.width / 2).toString(), x, 10); // Draw x-coordinate numbers
                }
                for (let y = offsetY; y < p.height; y += distance) {
                    p.line(0, y, p.width, y);
                    p.text(Math.floor(y - p.height / 2).toString(), 10, y); // Draw y-coordinate numbers
                }
            }

            return {
                drawGrid,
            };
        }
        this.p5Instance = new p5(sketch);
    }

    public render(dt: number){
        this.universe.next(dt)
        this.p5Instance.redraw()
    }

}

