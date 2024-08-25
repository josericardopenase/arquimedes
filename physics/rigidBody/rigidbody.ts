import { Particle } from "../particle/particle.ts";
import {Vector3D} from "../../math/vectors/Vector3D.ts";
import {Vector2D} from "../../math/vectors/Vector2D.ts";

export default class Rigidbody {
    private particles: Particle[] = [];
    private w: number = 300;
    private originalDistances: number[] = []; // Add this line to define the array

    private constructor(particles: Particle[] = []) {
        this.particles = particles;
        this.updateOriginalDistances(); // Calculate original distances
    }

    static from(p: Particle[]) {
        return new Rigidbody(p);
    }

    public getParticles() {
        return this.particles;
    }

    public add(p: Particle) {
        this.particles.push(p);
        this.updateOriginalDistances(); // Update original distances when adding particles
    }

    public extend(p: Particle[]) {
        this.particles.push(...p);
        this.updateOriginalDistances(); // Update original distances when extending particles
    }

    public getTotalMass() {
        return this.particles.reduce((acc, curr) => acc + curr.mass.value, 0);
    }

    public getCenterOfMass() {
        const xCordenate = this.particles.reduce((acc, curr) => acc + (curr.mass.value * curr.position.x), 0) / this.getTotalMass();
        const yCordenate = this.particles.reduce((acc, curr) => acc + (curr.mass.value * curr.position.y), 0) / this.getTotalMass();
        return new Vector2D(xCordenate, yCordenate);
    }

    public getMomentOfInertia(axis: Vector2D = new Vector2D(0, 0)) {
        return this.particles.reduce((acc, curr) => acc + (((curr.position.x - axis.x) ** 2 + (curr.position.y - axis.y) ** 2) * curr.mass.value), 0);
    }

    public getKineticEnergy() {
        // Implementation for kinetic energy can be added here
    }

    public getMomentOfInertiaRespectMassCenter() {
        return this.particles.reduce((acc, curr) => acc + (((curr.position.x - this.getCenterOfMass().x) ** 2 + (curr.position.y - this.getCenterOfMass().y) ** 2) * curr.mass.value), 0);
    }

    public next(dt: number) {
        this.particles.forEach(this.computeParticleAngularVelocity());
        this.particles.forEach((particle) => particle.next(dt));
        this.fixDistanceBetweenCenter(); // Ensure the distance to the center of mass is fixed after updates
    }

    private updateOriginalDistances() {
        const centerOfMass = this.getCenterOfMass();
        this.originalDistances = this.particles.map(particle =>
            Vector2D.distance(particle.position, centerOfMass)
        );
    }

    private computeParticleAngularVelocity() {
        return (particle: Particle) => {
            const angularVelocity = Vector3D.cross(
                Vector3D.fromVector2D(Vector2D.substract(particle.position, this.getCenterOfMass())),
                new Vector3D(0, 0, this.w)
            );
            particle.velocity = Vector2D.add(particle.velocity, Vector2D.fromVector3D(angularVelocity));
        };
    }

    private fixDistanceBetweenCenter() {
        const centerOfMass = this.getCenterOfMass();

        this.particles.forEach((particle, index) => {
            const currentDistance = Vector2D.distance(particle.position, centerOfMass);
            const originalDistance = this.originalDistances[index];

            // If the particle has moved too far, correct its position
            if (currentDistance !== originalDistance) {
                const direction = Vector2D.normalize(Vector2D.substract(particle.position, centerOfMass));
                particle.position = Vector2D.add(centerOfMass, direction.scale(originalDistance));
            }
        });
    }
}
