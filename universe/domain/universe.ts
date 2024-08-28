import {Particle, } from "../../physics/index.ts";
import Rigidbody from "../../physics/rigidBody/rigidbody.ts";
import {Vector2D} from "../../math/index.ts";
import {IUniverseRenderer} from "./IUniverseRenderer.ts";

export default class Universe {
  private particles: Particle[] = [];
  private rigidbodies : Rigidbody[] = [];
  private renderer : IUniverseRenderer;

  constructor(renderer  : IUniverseRenderer) {
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
    this.rigidbodies.forEach((rb) => {
      rb.next(dt)
      this.renderer.drawRigidbody(rb)
    })
    this.particles.forEach((p) => {
      p.next(dt)
      this.renderer.drawParticle(p)
    });
    this.renderer.update()
  }
}
