import { IRendererController } from "../renderers/IRendererController";
import { IRendererPlugin } from "../renderers/IRendererPlugin";
import { Vector2D } from "../../domain/math";
import { IRendererDrawer } from "../renderers/IRendererDrawer";
import { EventEmitter } from "../../shared/EventEmitter";

export class GridPlugin implements IRendererPlugin {
    public id = "grid";
    private renderer!: IRendererController;
    private drawer!: IRendererDrawer;
    private zoomCounter = 0;
    private readonly MAX_ZOOM = 30;
    private readonly linesMinOffsetProportion = 70;
    private readonly linesMaxOffsetProportion = 50;
    private lines: string[] = [];
    private eventEmitter: EventEmitter;

    plug(renderer: IRendererController, drawer: IRendererDrawer, eventEmitter: EventEmitter): void {
        this.renderer = renderer;
        this.drawer = drawer;
        this.eventEmitter = eventEmitter;
        this.drawGrid(this.renderer.getPosition(), this.renderer.getScaleFactor());
        this.eventEmitter.on("zoom", () => this.drawGrid(this.renderer.getPosition(), this.renderer.getScaleFactor()));
        this.eventEmitter.on("translate", () => this.drawGrid(this.renderer.getPosition(), this.renderer.getScaleFactor()));
    }

    adjustZoomCounter(factor: number): void {
        this.zoomCounter = (this.zoomCounter + (factor < 1 ? 1 : -1) + this.MAX_ZOOM) % (this.MAX_ZOOM + 1);
    }

    drawGrid(position: Vector2D, scale: number): void {
        console.log("drawGrid", position, scale);
        this.removeLines();

        const scaleFactor = 1 / scale;
        const { clientWidth: width, clientHeight: height } = this.renderer.getContainer();
        const scaledPosition = Vector2D.scalarMultiply(-scaleFactor, position);
        const scr = Vector2D.scalarMultiply(scaleFactor, new Vector2D(width, height));
        const scaledScreen = { width: scr.x, height: scr.y };
        const side = (this.linesMinOffsetProportion + 
                      (this.linesMaxOffsetProportion - this.linesMinOffsetProportion) * 
                      (this.zoomCounter / this.MAX_ZOOM)) * scaleFactor;

        this.drawLines(width, height, scaledPosition, scaledScreen, side, scaleFactor);
        this.drawAxes(width, height, scaledPosition, scaledScreen, scaleFactor);
        this.drawer.update();
    }

    private drawLines(width: number, height: number, scaledPosition: Vector2D, scaledScreen: { width: number, height: number }, side: number, scaleFactor: number): void {
        // this.drawAxisLines(width, height, scaledPosition, scaledScreen, side, scaleFactor, true);
        // this.drawAxisLines(width, height, scaledPosition, scaledScreen, side, scaleFactor, false);
    }

    private drawAxisLines(width: number, height: number, scaledPosition: Vector2D, scaledScreen: { width: number, height: number }, side: number, scaleFactor: number, isVertical: boolean): void {
        const start = isVertical ? width / 2 : height / 2;
        const end = isVertical ? scaledPosition.x + scaledScreen.width : scaledPosition.y + scaledScreen.height;
        const step = isVertical ? side : -side;

        for (let pos = start; (isVertical ? pos <= end : pos >= scaledPosition.y); pos += step) {
            if ((isVertical && pos < scaledPosition.x) || (!isVertical && pos > end)) continue;

            const line = this.drawer.drawLine({
                start: isVertical ? new Vector2D(pos, scaledPosition.y) : new Vector2D(scaledPosition.x, pos),
                end: isVertical ? new Vector2D(pos, scaledPosition.y + scaledScreen.height) : new Vector2D(scaledPosition.x + scaledScreen.width, pos),
                stroke: 1 * scaleFactor,
                color: "lightgray"
            });

            this.lines.push(line);
        }
    }

    private drawAxes(width: number, height: number, scaledPosition: Vector2D, scaledScreen: { width: number, height: number }, scaleFactor: number): void {
        const axisY = this.drawer.drawLine({
            start: new Vector2D(width / 2, scaledPosition.y),
            end: new Vector2D(width / 2, scaledPosition.y + scaledScreen.height),
            stroke: 1 * scaleFactor,
            color: "black"
        });

        console.log("startPlugin", new Vector2D(width / 2, scaledPosition.y));
        console.log("endPlugin", new Vector2D(width / 2, scaledPosition.y + scaledScreen.height));

        const axisX = this.drawer.drawLine({
            start: new Vector2D(scaledPosition.x, height / 2),
            end: new Vector2D(scaledPosition.x + scaledScreen.width, height / 2),
            stroke: 1 * scaleFactor,
            color: "black"
        });

        this.lines.push(axisX);
        this.lines.push(axisY);
    }

    private removeLines(): void {
        this.lines.forEach((line) => this.drawer.deleteElement(line));
        this.lines = [];
    }
}
