import {Particle} from "../physics/particle/particle.ts";
import {Vector2D} from "../math/vectors";


export const defaultCollisionHandler = (self : Particle, p2: Particle) => {
    const m1 = self.mass.value;
    const m2 = p2.mass.value;
    const vfx = ((m1 - m2)/(m1+m2))*self.velocity.x + ((2*m2)/(m1 + m2)*p2.velocity.x)
    const vfy = ((m1 - m2)/(m1+m2))*self.velocity.y + ((2*m2)/(m1 + m2)*p2.velocity.y)
    self.setVelocity(new Vector2D(vfx, vfy))
}

