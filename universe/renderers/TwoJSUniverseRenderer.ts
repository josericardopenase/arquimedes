import {IUniverseRenderer} from "../domain/IUniverseRenderer";
import Two from "two.js";
import { Group } from "two.js/src/group";
import { Particle, Rigidbody} from "../../physics";
import { Vector2D } from "../../math";
import { IRendererController } from "./IRendererController";
import { IRendererPlugin } from "./IRendererPlugin";

interface Options{
    container?: HTMLElement,
    plugins?: IRendererPlugin[]
}

export default class TwoJSUniverseRenderer implements IUniverseRenderer, IRendererController {
    private two: Two
    private worldContainer: Group;

    constructor(options ?: Options) {
        this.two = new Two({
            type: Two.Types.webgl,
            fullscreen: !options?.container,
            height: options?.container?.offsetHeight ?? document.body.offsetHeight,
            width: options?.container?.offsetWidth ?? document.body.offsetWidth,
        }).appendTo(options?.container || document.body);
        this.worldContainer = this.two.scene;
        this.drawGrid()

        options?.plugins?.forEach(plugin => plugin.plug(this))
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

    drawRigidbody(rb: Rigidbody): void {
        rb.getParticles().forEach(this.drawParticle)
    }

    drawVector(initialPosition: Vector2D, finalPosition: Vector2D){
        this.two.makeArrow(initialPosition.x, initialPosition.y, finalPosition.x, finalPosition.y, 8)
    }

    drawParticle(p: Particle) {
        const square = this.two.makeRectangle(p.position.x, p.position.y, p.apparience.width, p.apparience.height)
        square.fill = p.apparience.color
        this.worldContainer.add(square)
        this.two.update()
    }
}