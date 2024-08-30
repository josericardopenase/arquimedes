import {Particle } from "./particle.ts";
import {Vector2D} from "../math/vectors/Vector2D.ts";
import {ParticleBuilder} from "./particleBuilder.ts";

export class ParticleMeshBuilder{
    private builder : ParticleBuilder;
    private n : number;
    private spacing : number;

    constructor(builder: ParticleBuilder) {
        this.builder = builder;
        this.spacing = 0;
        this.n = 0;
    }

    public setNumberOfParticles(n : number): ParticleMeshBuilder{
        this.n = n;
        return this;
    }
    public setSpacing(spacing : number): ParticleMeshBuilder{
        this.spacing = spacing;
        return this;
    }

    public static template(particleBuilder: ParticleBuilder){
        return new ParticleMeshBuilder(particleBuilder);
    }

    public grid(center: Vector2D) : Particle[]{
        const particles: Particle[] = [];

        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                const x = center.x + (i - this.n / 2) * this.spacing;
                const y = center.y + (j - this.n / 2) * this.spacing;
                const particle = this.builder.build();
                particle.position = new Vector2D(x, y);
                particles.push(particle);
            }
        }

        return particles;
    }
};