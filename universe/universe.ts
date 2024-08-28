import {Particle, } from "../physics";
import Rigidbody from "../physics/rigidBody/rigidbody.ts";
import {Vector2D} from "../math";
import UniverseRenderer from "./universeRenderer";

export default class Universe {
  private particles: Particle[] = [];
  private rigidbodies : Rigidbody[] = [];
  private renderer : UniverseRenderer;

  constructor(renderer  : UniverseRenderer) {
    this.next = this.next.bind(this);
    this.renderer = renderer
  }

  addParticle(rb: Particle): void {
    this.particles.push(rb);
  }

  public getParticles(){
    return this.particles;
  }

  public getRigidbodies(){
    return this.rigidbodies;
  }

  addRigidBody(rb: Rigidbody): void {
    this.rigidbodies.push(rb);
  }

  next(dt: number): void {
    this.renderer.clear()
    this.particles.forEach((p1, i1) => {
      this.particles.forEach((p2, i2) => {
        if(i1 == i2) return;
        if(Vector2D.eq(p1.position, p2.position)){
          p1.collisionEntered(p2)
          p2.collisionEntered(p1)
        }
      })
    });
    this.rigidbodies.forEach((rb) => rb.next(dt))
    this.particles.forEach((p) => {
      p.next(dt)
      this.renderer.drawParticle(p)
    });
    this.renderer.render()
  }
}
