import {Vector2D} from "../math";
import {Appearance} from "./appearance.ts";
import {Particle} from "./particle.ts";

export class ParticleBuilder {
    private position: Vector2D = new Vector2D(0, 0);
    private velocity: Vector2D = new Vector2D(0, 0);
    private mass: number = 0;
    private charge: number = 0;
    private appearance: Appearance = Appearance.default();

    setPosition(x: number, y: number): ParticleBuilder {
        this.position = new Vector2D(x, y);
        return this;
    }

    setVelocity(x: number, y: number): ParticleBuilder {
        this.velocity = new Vector2D(x, y);
        return this;
    }

    setMass(value: number): ParticleBuilder {
        this.mass = value;
        return this;
    }

    setCharge(value: number): ParticleBuilder {
        this.charge = value;
        return this;
    }

    setAppearance(appearance: Appearance): ParticleBuilder {
        this.appearance = appearance;
        return this;
    }

    // Build method to create Rigidbody instance
    build(): Particle {
        return new Particle(
            this.position,
            this.velocity,
            this.mass,
            this.charge,
            this.appearance,
        );
    }
}
