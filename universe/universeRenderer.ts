import {Particle, Rigidbody} from "../physics";

export default interface UniverseRenderer{
    drawParticle(p :  Particle) : void
    drawRigidbody(rb :  Rigidbody) : void
    clear() : void
    render() : void
}