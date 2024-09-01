import { IRendererPlugin } from "../renderers/IRendererPlugin";
import { Vector2D } from "../../domain/math";
import { EventEmitter } from "../../shared/EventEmitter";
import { ICanvas } from "../renderers/ICanvas";

interface options {
    graduation: boolean;
}

export class GridPlugin implements IRendererPlugin {
    public id = "grid";
    private canvas!: ICanvas;

    private zoomCounter = 0;
    private readonly MAX_ZOOM = 30;
    private readonly linesMinOffsetProportion = 70;
    private readonly linesMaxOffsetProportion = 50;
    private lines: string[] = [];

    private graduation: boolean = true

    constructor(options?: options) {
        if(options?.graduation) this.graduation = options.graduation;
    }

    plug(renderer: ICanvas): void {
        this.canvas = renderer;
        this.drawGrid(this.canvas.getPosition(), this.canvas.getScaleFactor());
        EventEmitter.getEventBus().on("zoom", () => this.drawGrid(this.canvas.getPosition(), this.canvas.getScaleFactor()));
        EventEmitter.getEventBus().on("translate", () => this.drawGrid(this.canvas.getPosition(), this.canvas.getScaleFactor()));
    }

    adjustZoomCounter(factor: number): void {
        this.zoomCounter = (this.zoomCounter + (factor < 1 ? 1 : -1) + this.MAX_ZOOM) % (this.MAX_ZOOM + 1);
    }

    drawGrid(position: Vector2D, scale: number): void {
        this.removeLines();

        const scaleFactor = 1 / scale;
        const { clientWidth: width, clientHeight: height } = this.canvas.getContainer();
        const scaledPosition = Vector2D.scalarMultiply(-scaleFactor, position);
        const scr = Vector2D.scalarMultiply(scaleFactor, new Vector2D(width, height));
        const scaledScreen = { width: scr.x, height: scr.y };

        const side = 100;

        this.drawLines(width, height, scaledPosition, scaledScreen, side, scaleFactor);
        this.drawAxes(width, height, scaledPosition, scaledScreen, scaleFactor);
        this.canvas.update();
    }

    private drawLines(width: number, height: number, scaledPosition: Vector2D, scaledScreen: { width: number, height: number }, side: number, scaleFactor: number): void {
        this.drawAxisLines(width, height, scaledPosition, scaledScreen, side, scaleFactor, true);
        this.drawAxisLines(width, height, scaledPosition, scaledScreen, side, scaleFactor, false);
    }

    private drawAxisLines(width: number, height: number, scaledPosition: Vector2D, scaledScreen: { width: number, height: number }, side: number, scaleFactor: number, isVertical: boolean): void {
        for (let x = width/2; x <= scaledPosition.x + scaledScreen.width; x += side) {
            if(x < scaledPosition.x) continue;
            const start = new Vector2D(x, scaledPosition.y);
            const end = new Vector2D(x, scaledPosition.y + scaledScreen.height);
            const line = this.canvas.drawLine({ start, end, stroke: 1 * scaleFactor, color: "lightgray" });
            this.lines.push(line);
        }

        for (let x = width/2; x >= scaledPosition.x; x -= side) {
            if(x > scaledPosition.x + scaledScreen.width) continue;
            const start = new Vector2D(x, scaledPosition.y);
            const end = new Vector2D(x, scaledPosition.y + scaledScreen.height);
            const line = this.canvas.drawLine({ start, end, stroke: 1 * scaleFactor, color: "lightgray" });
            this.lines.push(line);
        }

        for (let y = height/2; y <= scaledPosition.y + scaledScreen.height; y += side) {
            if(y < scaledPosition.y) continue;
            const start = new Vector2D(scaledPosition.x, y);
            const end = new Vector2D(scaledPosition.x + scaledScreen.width, y);
            const line = this.canvas.drawLine({ start, end, stroke: 1 * scaleFactor, color: "lightgray" });
            this.lines.push(line);
        }

        for (let y = height/2; y >= scaledPosition.y; y -= side) {
            if(y > scaledPosition.y + scaledScreen.height) continue;
            const start = new Vector2D(scaledPosition.x, y);
            const end = new Vector2D(scaledPosition.x + scaledScreen.width, y);
            const line = this.canvas.drawLine({ start, end, stroke: 1 * scaleFactor, color: "lightgray" });
            this.lines.push(line);
        }
    }

    private drawAxes(width: number, height: number, scaledPosition: Vector2D, scaledScreen: { width: number, height: number }, scaleFactor: number): void {
        const axisY = this.canvas.drawLine({
            start: new Vector2D(width / 2, scaledPosition.y),
            end: new Vector2D(width / 2, scaledPosition.y + scaledScreen.height),
            stroke: 1 * scaleFactor,
            color: "black"
        });


        const axisX = this.canvas.drawLine({
            start: new Vector2D(scaledPosition.x, height / 2),
            end: new Vector2D(scaledPosition.x + scaledScreen.width, height / 2),
            stroke: 1 * scaleFactor,
            color: "black"
        });

        this.lines.push(axisX);
        this.lines.push(axisY);
    }

    private removeLines(): void {
        this.lines.forEach((line) => this.canvas.deleteElement(line));
        this.lines = [];
    }
}
