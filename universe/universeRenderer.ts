import {Particle, Rigidbody} from "../physics";
import {Vector2D } from "../math";

export default interface UniverseRenderer{
    drawParticle(p :  Particle) : void
    drawRigidbody(rb :  Rigidbody) : void
    drawVector(p1 : Vector2D, p2: Vector2D) : void
    clear() : void
    render() : void
}