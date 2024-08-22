import { Particle } from "./particle.ts";


export interface CollisionDetector{
  collisionEntered(p : Particle) : void;
}

export interface Ether {
  addRigidbody(rb: Particle): void;
  next(): void;
  start(): void;
}
