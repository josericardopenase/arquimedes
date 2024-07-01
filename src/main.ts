import p5 from "p5";
import "./style.css"

const SQUARE_SIZE = 70;

interface Vector2{
  x : number,
  y: number
}

interface BodyProperties {
  position : Vector2, 
  velocity: Vector2
  mass : number,
}

type Force = (properties : BodyProperties) => {x: number, y: number}
const g = -9800;
const k = 1200;


class Rigidbody{
}

const sketch = (p: p5) => {

  const body : BodyProperties = {
    position: { x: (p.windowWidth / 2) - SQUARE_SIZE/2 , y: (p.windowHeight / 2 + 0)- SQUARE_SIZE/2 + 20 },
    velocity: {x : 0, y: 0},
    mass: 50
  }
  
  let forces : Force[] = [
    (properties : BodyProperties) =>  ({
      y: properties.mass * g,
      x: 0
    }),
  ]

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = () => {
    p.background("#ffffff");

    const dt = p.deltaTime / 1000;
    body.position.x += dt*body.velocity.x;
    body.position.y += dt*-body.velocity.y;
    const totalForce = forces.reduce((previousForce, curr) => ({x : previousForce.x + curr(body).x, y: previousForce.y + curr(body).y}), {x: 0, y: 0})

    body.velocity.x += dt*totalForce.x/body.mass
    body.velocity.y += dt*totalForce.y/body.mass

    console.log(body.velocity)
    drawGrid(100)
    p.fill(0, 0, 255);
    p.rect(body.position.x, body.position.y, SQUARE_SIZE, SQUARE_SIZE);
  };

  const drawGrid = (distance: number) => {
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


}

new p5(sketch);
