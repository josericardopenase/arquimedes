import {IUniverseRenderer} from "../../domain/IUniverseRenderer";
import Two from "two.js";
import {Particle, Rigidbody} from "../../../physics";
import {Vector2D} from "../../../math";
import { Path } from "two.js/src/path";


export class TwoCacheUniverseRenderer implements IUniverseRenderer {
    private two: Two;
    private readonly cache : Record<string, Path>

    constructor(two: Two) {
        this.two = two
        this.cache = {}
    }

    update(): void {
        this.two.update();
    }

    drawRigidbody(rb: Rigidbody): void {
        rb.getParticles().forEach(this.drawParticle);
    }

    drawVector(initialPosition: Vector2D, finalPosition: Vector2D) {
        this.two.makeArrow(
            initialPosition.x,
            initialPosition.y,
            finalPosition.x,
            finalPosition.y,
            8
        );
    }

    drawParticle(p: Particle) {
        if(!this.elementIsInsideCache(p)){
            const element = this.createParticleElement(p);
            this.storeElementInCache(p, element);
        }

        const square = this.getElementFromCache(p)
        this.updatePosition(square, p);
    }

    private storeElementInCache(p: Particle, element: Path) {
        this.cache[p.id] = element;
    }

    private createParticleElement(p: Particle) {
        const square = this.two.makeRectangle(
            p.position.x,
            p.position.y,
            p.appearance.width,
            p.appearance.height
        );
        square.fill = p.appearance.color;
        return square;
    }

    private updatePosition(square: Path, p: Particle) {
        square.position.x = p.position.x;
        square.position.y = p.position.y;
    }

    private getElementFromCache(p: Particle) {
        return this.cache[p.id];
    }

    private elementIsInsideCache(p: Particle) {
        return this.cache[p.id];
    }
}
