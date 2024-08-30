import { Particle, Rigidbody } from "../../domain";
import { Vector2D } from "../../domain/math";

export interface ISimulationRenderer {
  update(): void;
  drawParticle(p: Particle): void;
  drawRigidbody(rb: Rigidbody): void;
  drawVector(p1: Vector2D, p2: Vector2D): void;
}
