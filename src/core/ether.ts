import { Particle } from "./physics/particle/particle.ts";


export interface CollisionDetector{
  collisionEntered(p : Particle) : void;
}