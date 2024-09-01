import { Particle } from "../../domain";
import Rigidbody from "../../domain/rigidBody/rigidbody.ts";
import { Vector2D } from "../../domain/math";
import { ISimulationRenderer } from "./ISimulationRenderer.ts";

export default class Simulation {
  private particles: Particle[] = [];
  private rigidbodies: Rigidbody[] = [];
  private renderer: ISimulationRenderer;

  constructor(renderer: ISimulationRenderer) {
    this.renderer = renderer;
  }

  addParticle(rb: Particle): void {
    this.particles.push(rb);
  }

  addRigidBody(rb: Rigidbody): void {
    this.rigidbodies.push(rb);
  }

  simulate(dt: number): void {
    this.particles.forEach(this.handleCollisions());
    this.rigidbodies.forEach(this.renderRigidbody(dt));
    this.particles.forEach(this.renderParticle(dt));
    this.renderer.update();
  }

  private handleCollisions() {
    return (p1 : Particle, i1 : number) => {
      this.particles.forEach((p2, i2) => {
        if (i1 == i2) return;
        if (Vector2D.eq(p1.position, p2.position)) {
          p1.collisionEntered(p2);
          p2.collisionEntered(p1);
        }
      });
    };
  }

  private renderParticle(dt: number) {
    return (p : Particle) => {
      p.next(dt);
      this.renderer.drawParticle(p);
    };
  }

  private renderRigidbody(dt: number) {
    return (rb : Rigidbody) => {
      rb.next(dt);
      this.renderer.drawRigidbody(rb);
    };
  }
}
