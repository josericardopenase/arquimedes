import { Group } from "two.js/src/group";
import { Vector2D } from "../../../domain/math";
import { IRendererController } from "../IRendererController";
import Two from "two.js";
import { Path } from "two.js/src/path";


export class TwoSimulationController implements IRendererController{


    private htmlContainer: HTMLElement;
    private lines : Path[] = []
    private zoomCounter = 5;
    private MAX_ZOOM = 5;
    private worldContainer : Group

    private callbacks : Record<"translate" | "scale", (() => void)[]> = {
        "translate" : [],
        "scale" : []
    }

    constructor(private readonly two : Two){
        this.worldContainer = two.scene
        this.drawGridWithParams()
    }
    
    
    getScaleFactor(): number {
        throw this.worldContainer.scale;
    }
    getPosition(): Vector2D {
        throw new Vector2D(this.worldContainer.position["_x"], this.worldContainer.position["_y"]);
    }

    addTranslateCallback(callback: () => void): void {
        this.callbacks["translate"].push(callback) 
    }

    addScaleCallback(callback: () => void): void {
        this.callbacks["scale"].push(callback) 
    }

    removeLines(): void {
        this.two.remove(...this.lines);
        this.lines = [];
    }
    
    drawGrid(position: Vector2D, scale: number,  strokeColor: string = "#ddd", side : number): void {


        const linesMinOffsetProportion = 100;
        const linesMaxOffsetProportion = 50;


        this.removeLines();


        const scaleFactor = 1/scale;
        const width = (this.two.width as number);
        const height = (this.two.height as number);
        const scaledPosition = Vector2D.scalarMultiply(-scaleFactor, position);
        const scr = Vector2D.scalarMultiply(scaleFactor, new Vector2D(this.two.width, this.two.height))
        const scaledScreen = {
            width : scr.x,
            height: scr.y
        }

        side = (linesMinOffsetProportion + (linesMaxOffsetProportion - linesMinOffsetProportion) * (this.zoomCounter / this.MAX_ZOOM)) * scaleFactor;

        for (let x = width/2; x <= scaledPosition.x + scaledScreen.width; x += side) {
            if(x < scaledPosition.x) continue;
            const line = this.two.makeLine(x, scaledPosition.y, x, scaledPosition.y + scaledScreen.height);
            line.linewidth = 1 * scaleFactor;
            line.stroke ="gray"
            this.lines.push(line);
        }

        for (let x = width/2; x >= scaledPosition.x; x -= side) {
            if(x > scaledPosition.x + scaledScreen.width) continue;
            const line = this.two.makeLine(x, scaledPosition.y, x, scaledPosition.y + scaledScreen.height);
            line.linewidth = 1 * scaleFactor;
            line.stroke ="gray"
            this.lines.push(line);
        }

        for (let y = height/2; y <= scaledPosition.y + scaledScreen.height; y += side) {
            if(y < scaledPosition.y) continue;
            const line = this.two.makeLine(scaledPosition.x, y, scaledPosition.x + scaledScreen.width, y);
            line.linewidth = 1 * scaleFactor;
            line.stroke ="gray"
            this.lines.push(line);
        }

        for (let y = height/2; y >= scaledPosition.y; y -= side) {
            if(y > scaledPosition.y + scaledScreen.height) continue;
            const line = this.two.makeLine(scaledPosition.x, y, scaledPosition.x + scaledScreen.width, y);
            line.linewidth = 1 * scaleFactor;
            line.stroke ="gray"
            this.lines.push(line);
        }

        const axisY = this.two.makeLine(width / 2, scaledPosition.y, width / 2, scaledPosition.y+scaledScreen.height);
        axisY.linewidth = 2 * scaleFactor;
        this.lines.push(axisY);

        const axisX = this.two.makeLine(scaledPosition.x, height / 2, scaledPosition.x+scaledScreen.width, height / 2);
        axisX.linewidth = 2 * scaleFactor;
        this.lines.push(axisX);

        this.two.update();
    }

    translate(x: number, y: number): void {
        this.worldContainer.translation.x += x;
        this.worldContainer.translation.y += y;
        this.drawGridWithParams()

        this.callbacks["translate"].forEach(x => x())
    }

    private drawGridWithParams(size :number = 100) {
        this.drawGrid(new Vector2D(this.worldContainer.position["_x"], this.worldContainer.position["_y"]), this.worldContainer.scale as number, "gray", size);
    }

    scale(factor: number, origin: Vector2D): void {
        const localPosition = this.computeLocalPosition(origin);
        this.worldContainer.scale = Number(this.worldContainer.scale) * factor;
        this.worldContainer.translation.x = origin.x - localPosition.x * this.worldContainer.scale;
        this.worldContainer.translation.y = origin.y - localPosition.y * this.worldContainer.scale;
        this.zoomCounter += factor < 1 ? 1 : -1;
        if (this.zoomCounter > this.MAX_ZOOM) {
        this.zoomCounter = 0;
        } else if (this.zoomCounter < 0) {
        this.zoomCounter = this.MAX_ZOOM;
        }
        this.drawGridWithParams()

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