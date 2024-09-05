import { IRendererPlugin } from "../renderers/IRendererPlugin";
import { Vector2D } from "../../domain/math";
import { EventEmitter } from "../../shared/EventEmitter";
import { ICanvas } from "../renderers/ICanvas";

interface options {
    graduation: boolean;
    proportions: { x: number, y: number };
    color: string;
}

export class GridPlugin implements IRendererPlugin {
    public id = "grid";
    private canvas!: ICanvas;

    private zoomCounter = 0;
    private readonly MAX_ZOOM = 30;
    private readonly linesMinOffsetProportion = 100;
    private readonly linesMaxOffsetProportion = 70;
    private lines: string[] = [];

    private graduation: boolean = true

    constructor(options?: Partial<options>) {
        if (options && options.graduation !== undefined) this.graduation = options.graduation;
    }

    plug(renderer: ICanvas): void {
        this.canvas = renderer;
        this.drawGrid(this.canvas.getPosition(), this.canvas.getScaleFactor());

        EventEmitter.getEventBus().on("zoomIn", () => {
            this.adjustZoomCounter(1);
            this.drawGrid(this.canvas.getPosition(), this.canvas.getScaleFactor());
        });

        EventEmitter.getEventBus().on("zoomOut", () => {
            this.adjustZoomCounter(-1);
            this.drawGrid(this.canvas.getPosition(), this.canvas.getScaleFactor());
        });

        EventEmitter.getEventBus().on("translate", () => this.drawGrid(this.canvas.getPosition(), this.canvas.getScaleFactor()));
    }

    adjustZoomCounter(factor: number): void {

        this.zoomCounter += factor < 1 ? 1 : -1;

        if (this.zoomCounter > this.MAX_ZOOM) {
        this.zoomCounter = 0;
        } else if (this.zoomCounter < 0) {
        this.zoomCounter = this.MAX_ZOOM;
        }
    }

    drawGrid(position: Vector2D, scale: number): void {
        this.removeLines();

        const scaleFactor = 1 / scale;
        const { clientWidth: width, clientHeight: height } = this.canvas.getContainer();
        const scaledPosition = Vector2D.scalarMultiply(-scaleFactor, position);
        const scr = Vector2D.scalarMultiply(scaleFactor, new Vector2D(width, height));
        const scaledScreen = { width: scr.x, height: scr.y };

        const side = (this.linesMinOffsetProportion + (this.linesMaxOffsetProportion - this.linesMinOffsetProportion) * (this.zoomCounter / this.MAX_ZOOM)) * scaleFactor;

        this.drawGridLinesAndNumbers(width, height, scaledPosition, scaledScreen, side, scaleFactor);

        this.canvas.update();
    }

    private drawGridLinesAndNumbers(width: number, height: number, scaledPosition: Vector2D, scaledScreen: { width: number, height: number }, side: number, scaleFactor: number): void {
        this.drawVerticalLinesAndNumbers(width, height, scaledPosition, scaledScreen, side, scaleFactor);
        this.drawHorizontalLinesAndNumbers(width, height, scaledPosition, scaledScreen, side, scaleFactor);
        this.drawAxes(width, height, scaledPosition, scaledScreen, scaleFactor);
    }

    private drawVerticalLinesAndNumbers(width: number, height: number, scaledPosition: Vector2D, scaledScreen: { width: number, height: number }, side: number, scaleFactor: number): void {
        for (let x = width / 2; x <= scaledPosition.x + scaledScreen.width; x += side) {
            if (x >= scaledPosition.x) {
                let value = (x - width / 2) * scaleFactor;
                if (value > 1) value = Math.round(value);
                else value = Math.round(value * 100000) / 100000;
                this.drawLineAndNumber(new Vector2D(x, 0), scaledPosition, scaledScreen, scaleFactor, value, true);
            }
        }

        for (let x = width / 2; x >= scaledPosition.x; x -= side) {
            if (x <= scaledPosition.x + scaledScreen.width) {
                let value = (x - width / 2) * scaleFactor;
                if (value < -1) value = Math.round(value);
                else value = Math.round(value * 100000) / 100000;
                this.drawLineAndNumber(new Vector2D(x, 0), scaledPosition, scaledScreen, scaleFactor, value, true);
            }
        }
    }

    private drawHorizontalLinesAndNumbers(width: number, height: number, scaledPosition: Vector2D, scaledScreen: { width: number, height: number }, side: number, scaleFactor: number): void {
        for (let y = height / 2; y <= scaledPosition.y + scaledScreen.height; y += side) {
            if (y >= scaledPosition.y) {
                let value = (height / 2 - y) * scaleFactor;
                if (value < -1) value = Math.round(value);
                else value = Math.round(value * 100000) / 100000;
                this.drawLineAndNumber(new Vector2D(0, y), scaledPosition, scaledScreen, scaleFactor, value, false);
            }
        }

        for (let y = height / 2; y >= scaledPosition.y; y -= side) {
            if (y <= scaledPosition.y + scaledScreen.height) {
                let value = (height / 2 - y) * scaleFactor
                if (value > 1) value = Math.round(value);
                else value = Math.round(value * 100000) / 100000;
                this.drawLineAndNumber(new Vector2D(0, y), scaledPosition, scaledScreen, scaleFactor, value, false);
            }
        }
    }

    private drawLineAndNumber(position: Vector2D, scaledPosition: Vector2D, scaledScreen: { width: number, height: number }, scaleFactor: number, value: number, isVertical: boolean): void {
        this.drawLine(position, scaledPosition, scaledScreen, scaleFactor, isVertical);
        if (this.graduation && value !== 0) {
            this.drawNumber(position, value, scaleFactor, isVertical);
        }
    }

    private drawLine(position: Vector2D, scaledPosition: Vector2D, scaledScreen: { width: number, height: number }, scaleFactor: number, isVertical: boolean): void {
        const start = isVertical ? new Vector2D(position.x, scaledPosition.y) : new Vector2D(scaledPosition.x, position.y);
        const end = isVertical ? new Vector2D(position.x, scaledPosition.y + scaledScreen.height) : new Vector2D(scaledPosition.x + scaledScreen.width, position.y);
        const line = this.canvas.drawLine({ start, end, stroke: 1 * scaleFactor, color: "lightgray" });
        this.lines.push(line);
    }

    private drawNumber(position: Vector2D, value: number, scaleFactor: number, isVertical: boolean): void {
        const fontSize = 12 * scaleFactor;
        const { clientWidth: width, clientHeight: height } = this.canvas.getContainer();

        const textPosition = isVertical 
            ? new Vector2D(position.x, height / 2 + 15 * scaleFactor)
            : new Vector2D(width / 2 + 15 * scaleFactor, position.y);
        const text = this.canvas.drawText({ position: textPosition, size: fontSize, text: value.toString(), color: "black" });
        this.lines.push(text);
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
