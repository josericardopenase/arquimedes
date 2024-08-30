import { Force } from "../forces/force.ts";
import {CollisionDetector} from "../collisions/interfaces.ts";
import {Vector2D} from "../math/vectors";
import {Appearance} from "./appearance.ts";
import {ParticleBuilder} from "./particleBuilder.ts";
import {ParticleMeshBuilder} from "./particleMeshBuilder.ts";
import {Entity} from "../shared/entity";

type Behaviour = (rb: Particle) => void;
type CollisionCallback = (p: Particle, p2: Particle) => void;

export class Particle extends Entity implements CollisionDetector{
  public position: Vector2D = new Vector2D(0, 0);
  public velocity: Vector2D = new Vector2D(0, 0);
  public forces: Force[] = [];
  public mass: number = 0;
  public charge: number = 0;
  public behaviours: Behaviour[];
  public appearance: Appearance = Appearance.default();
  public collisionCallbacks : CollisionCallback[] = [];
  public nextVelocity : Vector2D | null = null;

  constructor(
    position: Vector2D,
    velocity: Vector2D,
    mass: number,
    charge: number,
    appearance: Appearance,
  ) {
    super();
    this.position = position;
    this.velocity = velocity;
    this.forces = [];
    this.mass = mass;
    this.charge = charge;
    this.behaviours = [];
    this.appearance = appearance;
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

  static mesh(builder : ParticleBuilder) {
    return new ParticleMeshBuilder(builder)
  }

  public getKineticEnergy(){
    return 1/2*(this.mass)*(Vector2D.module(this.velocity))**2
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
      this.velocity.x += dt * (calculation.x / this.mass);
      this.velocity.y += dt * (calculation.y / this.mass);
    });
    this.position.x += dt * this.velocity.x;
    this.position.y += dt * this.velocity.y;
    this.behaviours.forEach((bh) => bh(this));
  }

  public addBehaviour(bh: Behaviour): void {
    this.behaviours.push(bh);
  }
}

