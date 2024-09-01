import Two from "two.js";
import { Vector2D } from "../../../domain/math";
import { ICanvas } from "../ICanvas";
import { Options, TwoFactory } from "./TwoFactory";
import { TwoDrawer } from "./TwoDrawer";
import { TwoCanvasController } from "./TwoSimulationController";

export class TwoCanvas implements ICanvas{
    private two : Two
    private canvasController: TwoCanvasController;
    private canvasDrawer: TwoDrawer;

    constructor(options : Options){
        this.two = TwoFactory.fromOptions(options);
        this.canvasDrawer = new TwoDrawer(this.two)
        this.canvasController = new TwoCanvasController(this.two)
    }
    
    drawText(params: { position: Vector2D; size: number, text: string; color?: string; id?: string; }): string {
        return this.canvasDrawer.drawText(params)
    }

    drawLine(params) {
        return this.canvasDrawer.drawLine(params)
    }
    drawSquare(params){
        return this.canvasDrawer.drawSquare(params)
    }
    drawCircle(params): string {
        return this.canvasDrawer.drawCircle(params)
    }
    drawArrow(params): string {
        return this.canvasDrawer.drawArrow(params)
    }
    deleteElement(id: string): void {
        return this.canvasDrawer.deleteElement(id)
    }
    translate(x: number, y: number): void {
        return this.canvasController.translate(x, y)
    }
    scale(factor: number, origin: Vector2D): void {
        return this.canvasController.scale(factor, origin)
    }
    getScaleFactor(): number {
        return this.canvasController.getScaleFactor()
    }
    getPosition(): Vector2D {
        return this.canvasController.getPosition()
    }
    getContainer(): HTMLElement {
        return this.canvasController.getContainer()
    }
    update() {
        return this.canvasDrawer.update()
    }
}