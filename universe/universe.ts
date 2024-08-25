import {Particle, } from "../physics/particle/particle.ts";
import Rigidbody from "../physics/rigidBody/rigidbody.ts";
import {Vector2D} from "../math/vectors";

export default class Universe {
  private particles: Particle[] = [];
  private rigidbodies : Rigidbody[] = [];

  constructor() {
    this.next = this.next.bind(this);
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
    this.particles.forEach((rb) => rb.next(dt));
  }
}
