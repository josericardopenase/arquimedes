import { Force } from "./force";
import { Scalar } from "./utils/scalar";
import { Vector2D } from "./utils/vector";

export class Rigidbody{
    public position : Vector2D = new Vector2D(0, 0);
    public velocity : Vector2D = new Vector2D(0, 0);
    public forces: Force[] = []
    public mass : Scalar = new Scalar(0);
    public charge : Scalar = new Scalar(0);

    constructor(position: Vector2D, velocity: Vector2D, mass: Scalar, charge: Scalar) {
        this.position = position;
        this.velocity = velocity;
        this.forces = [];
        this.mass = mass;
        this.charge = charge;
    }

    static create(){
        return new RigidbodyBuilder()
    }

    public next(dt : number){
        this.forces.forEach(f => {
            const calculation = f.apply(this)
            console.log(calculation)
            this.velocity.x += dt * (calculation.x/this.mass.value)
            this.velocity.y += dt * (calculation.y/this.mass.value)
            console.log(this.velocity)

            this.position.x += dt*this.velocity.x 
            this.position.y += dt*this.velocity.y 

        })

    }
}

export class RigidbodyBuilder {
    private position : Vector2D = new Vector2D(0, 0);
    private velocity : Vector2D = new Vector2D(0, 0);
    private mass : Scalar = new Scalar(0);
    private charge : Scalar = new Scalar(0);

    // Setters for each property
    setPosition(x: number, y: number): RigidbodyBuilder {
        this.position = new Vector2D(x, y);
        return this;
    }

    setVelocity(x: number, y: number): RigidbodyBuilder {
        this.velocity = new Vector2D(x, y);
        return this;
    }

    setMass(value: number): RigidbodyBuilder {
        this.mass = new Scalar(value);
        return this;
    }

    setCharge(value: number): RigidbodyBuilder {
        this.charge = new Scalar(value);
        return this;
    }

    // Build method to create Rigidbody instance
    build(): Rigidbody {
        return new Rigidbody(this.position, this.velocity, this.mass, this.charge);
    }
}
