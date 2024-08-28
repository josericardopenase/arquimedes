import {IUniverseRenderer} from "../domain/IUniverseRenderer";
import Two from "two.js";
import { Group } from "two.js/src/group";
import { Particle, Rigidbody} from "../../physics";
import { Vector2D } from "../../math";
import { IRendererController } from "./IRendererController";
import { IRendererPlugin } from "./IRendererPlugin";

export default class TwoJSUniverseRenderer implements IUniverseRenderer, IRendererController {
    private two: Two
    private worldContainer: Group;

    constructor(plugins: IRendererPlugin[]) {
        var params = {
            fullscreen: true
        };
        this.two = new Two(params).appendTo(document.body);
        this.worldContainer = this.two.scene;
        this.drawGrid()

        plugins.forEach(plugin => plugin.plug(this))
    }

    drawVector(p1: Vector2D, p2: Vector2D): void {
        throw new Error("Method not implemented.");
    }

    drawRigidbody(rb: Rigidbody): void {
        throw new Error("Methot not implemented.");
    }

    private drawGrid(){
    }

    translate(x: number, y: number): void {
        this.worldContainer.translation.x += x;
        this.worldContainer.translation.y += y;
        this.two.update();
    }

    scale(factor: number, origin: Vector2D): void {
        const localPos = {
            x: (origin.x - this.worldContainer.translation.x) / Number(this.worldContainer.scale),
            y: (origin.y - this.worldContainer.translation.y) / Number(this.worldContainer.scale),
        };

        this.worldContainer.scale = Number(this.worldContainer.scale) * factor;

        this.worldContainer.translation.x = origin.x - (localPos.x * this.worldContainer.scale);
        this.worldContainer.translation.y = origin.y - (localPos.y * this.worldContainer.scale);
        this.two.update();
    }

    clear(): void {
        this.two.clear()
    }

    update(): void {
        this.two.update()
    }

    drawParticle(p: Particle) {
        const square = this.two.makeRectangle(p.position.x, p.position.y, p.apparience.width, p.apparience.height)
        square.fill = p.apparience.color
        this.worldContainer.add(square)
        this.two.update()
    }
}