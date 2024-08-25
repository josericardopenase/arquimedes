import {Vector2D} from "../../math/vectors/Vector2D.ts";
import {Scalar} from "../../utils/scalar.ts";
import {Apparience} from "./apparience.ts";
import {Particle} from "./particle.ts";

export class ParticleBuilder {
    private position: Vector2D = new Vector2D(0, 0);
    private velocity: Vector2D = new Vector2D(0, 0);
    private mass: Scalar = new Scalar(0);
    private charge: Scalar = new Scalar(0);
    private apparience: Apparience = Apparience.default();

    // Setters for each property
    setPosition(x: number, y: number): ParticleBuilder {
        this.position = new Vector2D(x, y);
        return this;
    }

    setVelocity(x: number, y: number): ParticleBuilder {
        this.velocity = new Vector2D(x, y);
        return this;
    }

    setMass(value: number): ParticleBuilder {
        this.mass = new Scalar(value);
        return this;
    }

    setCharge(value: number): ParticleBuilder {
        this.charge = new Scalar(value);
        return this;
    }

    setApparience(apparience: Apparience): ParticleBuilder {
        this.apparience = apparience;
        return this;
    }

    // Build method to create Rigidbody instance
    build(): Particle {
        return new Particle(
            this.position,
            this.velocity,
            this.mass,
            this.charge,
            this.apparience,
        );
    }
}
