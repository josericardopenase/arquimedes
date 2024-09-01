import {ISimulationRenderer} from "../../../application/simulation/ISimulationRenderer";
import Two from "two.js";
import {Particle, Rigidbody} from "../../../domain";
import {Vector2D} from "../../../domain/math";
import { Path } from "two.js/src/path";
import { IRendererDrawer } from "../IRendererDrawer";


export class TwoCacheDrawer implements IRendererDrawer {
    private two: Two;
    private readonly cache: Record<string, Path>;

    constructor(two: Two) {
        this.two = two;
        this.cache = {};
    }

    deleteElement(id: string) {
        const element = this.cache[id];
        if (element) {
            this.two.remove(element);
            delete this.cache[id];  
        }
    }

    drawLine(params: { start: Vector2D; end: Vector2D; stroke: number; color: string; }): string {
        return this.drawOrUpdateElement(params, (params) => {
            const line = this.two.makeLine(
                params.start.x,
                params.start.y,
                params.end.x,
                params.end.y
            );
            line.linewidth = params.stroke;
            line.stroke = params.color;
            return line;
        });
    }

    drawSquare(params: { init: Vector2D; end: Vector2D; color: string; }): string {
        return this.drawOrUpdateElement(params, (params) => {
            const width = params.end.x - params.init.x;
            const height = params.end.y - params.init.y;
            const square = this.two.makeRectangle(
                params.init.x + width / 2,
                params.init.y + height / 2,
                width,
                height
            );
            square.fill = params.color;
            return square;
        });
    }

    drawCircle(params: { init: Vector2D; end: Vector2D; stroke: number; color: string; }): string {
        return this.drawOrUpdateElement(params, (params) => {
            const radius = Math.sqrt(
                Math.pow(params.end.x - params.init.x, 2) + 
                Math.pow(params.end.y - params.init.y, 2)
            );
            const circle = this.two.makeCircle(
                params.init.x,
                params.init.y,
                radius
            );
            circle.stroke = params.stroke;
            circle.fill = params.color;
            return circle;
        });
    }

    drawArrow(params: { init: Vector2D; end: Vector2D; stroke: number; color: string; width: number; arrowWidth: number; }) {
        return this.drawOrUpdateElement(params, (params) => {
            const arrow = this.two.makeArrow(
                params.init.x,
                params.init.y,
                params.end.x,
                params.end.y,
                params.arrowWidth
            );
            arrow.linewidth = params.stroke;
            arrow.stroke = params.color;
            return arrow;
        });
    }

    update(): void {
        this.two.update();
    }

    drawRigidbody(rb: Rigidbody): void {
        rb.getParticles().forEach(this.drawParticle.bind(this));
    }

    drawVector(initialPosition: Vector2D, finalPosition: Vector2D) {
        return this.drawOrUpdateElement({ start: initialPosition, end: finalPosition }, (params) => {
            return this.two.makeArrow(
                params.start.x,
                params.start.y,
                params.end.x,
                params.end.y,
                8
            );
        });
    }

    drawParticle(p: Particle) {
        return this.drawOrUpdateElement(p, (p) => {
            const square = this.two.makeRectangle(
                p.position.x,
                p.position.y,
                p.appearance.width,
                p.appearance.height
            );
            square.fill = p.appearance.color;
            return square;
        });
    }


    private drawOrUpdateElement(params: any, createElement: (params: any) => Path): string {
        const id = this.getElementId(params);
        if (!this.cache[id]) {
            const element = createElement(params);
            this.storeElementInCache(id, element);
        }

        const element = this.cache[id];
        this.updateElement(params, element);
        return id;
    }

    private updateElement(params: any, element: Path) {
        if (params instanceof Particle) {
            element.translation.set(params.position.x, params.position.y);
        } else {
            element.translation.set(params.start.x, params.start.y);
            element.vertices[1].set(params.end.x, params.end.y);
        }
    }

    private getElementId(params: any): string {
        if (params instanceof Particle) {
            return params.id;
        }
        return JSON.stringify(params);
    }

    private storeElementInCache(id: string, element: Path) {
        this.cache[id] = element;
    }

}

