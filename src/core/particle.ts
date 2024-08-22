import { Force } from "./force";
import { Scalar } from "./utils/scalar";
import { Vector2D } from "./utils/vector";
import {CollisionDetector} from "./ether.ts";

type Behaviour = (rb: Particle) => void;
type CollisionCallback = (p: Particle, p2: Particle) => void;

export class Apparience {
  public width: number = 0;
  public height: number = 0;
  public shape: "Circle" | "Box" | "Particle" = "Circle";
  public color: string = "#f5f5f5";

  public static default(): Apparience {
    return new Apparience();
  }

  public static create() {
    return new ApparienceBuilder();
  }
}

class ApparienceBuilder {
  private apparience: Apparience;

  constructor() {
    this.apparience = new Apparience();
  }

  public setWidth(width: number): ApparienceBuilder {
    this.apparience.width = width;
    return this;
  }

  public setHeight(height: number): ApparienceBuilder {
    this.apparience.height = height;
    return this;
  }

  public setShape(shape: "Circle" | "Box" | "Particle"): ApparienceBuilder {
    this.apparience.shape = shape;
    return this;
  }

  public setColor(color: string): ApparienceBuilder {
    this.apparience.color = color;
    return this;
  }

  public build(): Apparience {
    return this.apparience;
  }
}

export class Particle implements CollisionDetector{
  public position: Vector2D = new Vector2D(0, 0);
  public velocity: Vector2D = new Vector2D(0, 0);
  public forces: Force[] = [];
  public mass: Scalar = new Scalar(0);
  public charge: Scalar = new Scalar(0);
  public behaviours: Behaviour[];
  public apparience: Apparience = Apparience.default();
  public collisionCallbacks : CollisionCallback[] = [];
  public nextVelocity : Vector2D | null = null;

  constructor(
    position: Vector2D,
    velocity: Vector2D,
    mass: Scalar,
    charge: Scalar,
    apparience: Apparience,
  ) {
    this.position = position;
    this.velocity = velocity;
    this.forces = [];
    this.mass = mass;
    this.charge = charge;
    this.behaviours = [];
    this.apparience = apparience;
    this.collisionCallbacks = []
  }

  public setVelocity(vel : Vector2D){
    this.nextVelocity = vel;
  }

  public onCollision(callback : CollisionCallback){
    this.collisionCallbacks.push(callback);
  }

  collisionEntered(p: Particle): void {
      this.collisionCallbacks.forEach(x => x(this, p))
  }

  static create() {
    return new ParticleBuilder();
  }

  public addForce(f: Force) {
    this.forces.push(f);
  }

  public clearForces() {
    this.forces = [];
  }

  public next(dt: number) {
    if(this.nextVelocity != null){
      this.velocity = this.nextVelocity;
      this.nextVelocity = null;
    }
    this.forces.forEach((f) => {
      const calculation = f.apply(this);
      this.velocity.x += dt * (calculation.x / this.mass.value);
      this.velocity.y += dt * (calculation.y / this.mass.value);
    });
    this.position.x += dt * this.velocity.x;
    this.position.y += dt * this.velocity.y;
    this.behaviours.forEach((bh) => bh(this));
  }

  public addBehaviour(bh: Behaviour): void {
    this.behaviours.push(bh);
  }
}

export class ParticleBuilder {
  private position: Vector2D = new Vector2D(0, 0);
  private velocity: Vector2D = new Vector2D(0, 0);
  private mass: Scalar = new Scalar(0);
  private charge: Scalar = new Scalar(0);
  private apparience: Apparience = Apparience.default();

  // Setters for each property
  setPosition(x: number, y: number): ParticleBuilder {
    this.position = new Vector2D(x, y);
    return this;
  }

  setVelocity(x: number, y: number): ParticleBuilder {
    this.velocity = new Vector2D(x, y);
    return this;
  }

  setMass(value: number): ParticleBuilder {
    this.mass = new Scalar(value);
    return this;
  }

  setCharge(value: number): ParticleBuilder {
    this.charge = new Scalar(value);
    return this;
  }

  setApparience(apparience: Apparience): ParticleBuilder {
    this.apparience = apparience;
    return this;
  }

  // Build method to create Rigidbody instance
  build(): Particle {
    return new Particle(
      this.position,
      this.velocity,
      this.mass,
      this.charge,
      this.apparience,
    );
  }
}
