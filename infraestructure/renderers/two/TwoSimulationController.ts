import { Group } from "two.js/src/group";
import { Vector2D } from "../../../domain/math";
import Two from "two.js";
import { Path } from "two.js/src/path";
import { ICanvasController } from "../ICanvas";

export class TwoCanvasController implements ICanvasController{

    private worldContainer : Group

    private callbacks : Record<"translate" | "scale", (() => void)[]> = {
        "translate" : [],
        "scale" : []
    }

    constructor(private readonly two : Two){
        this.worldContainer = two.scene
    }
    
    
    getScaleFactor(): number {
        return this.worldContainer.scale as number;
    }

    getPosition(): Vector2D {
        return new Vector2D(this.worldContainer.position["_x"], this.worldContainer.position["_y"]);
    }

    addTranslateCallback(callback: () => void): void {
        this.callbacks["translate"].push(callback) 
    }

    addScaleCallback(callback: () => void): void {
        this.callbacks["scale"].push(callback) 
    }

    translate(x: number, y: number): void {
        this.worldContainer.translation.x += x;
        this.worldContainer.translation.y += y;

        this.callbacks["translate"].forEach(x => x())
    }

    scale(factor: number, origin: Vector2D): void {
        const localPosition = this.computeLocalPosition(origin);
        this.worldContainer.scale = Number(this.worldContainer.scale) * factor;
        this.worldContainer.translation.x = origin.x - localPosition.x * this.worldContainer.scale;
        this.worldContainer.translation.y = origin.y - localPosition.y * this.worldContainer.scale;
        this.callbacks["scale"].forEach(x => x())
    }
    
    getContainer(): HTMLElement {
        return this.two.renderer.domElement;
    }

    private computeLocalPosition(origin: Vector2D) {
        return {
        x: (origin.x - this.worldContainer.translation.x) / Number(this.worldContainer.scale),
        y: (origin.y - this.worldContainer.translation.y) / Number(this.worldContainer.scale),
        };
    }

}