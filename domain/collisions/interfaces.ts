import { Particle } from "../particle/particle.ts";


export interface CollisionDetector{
  collisionEntered(p : Particle) : void;
}