import Two from "two.js";
import { ICanvasDrawer } from "../ICanvas";
import { v4 as uuid } from 'uuid';
import { Vector2D } from "../../../domain/math";
import { Path } from "two.js/src/path";
import { Shape } from "two.js/src/shape";

export class TwoDrawer implements ICanvasDrawer{
    private two: Two;
    private cache : Record<string, Shape> = {}


    constructor(two: Two) {
        this.two = two;
    }
    drawText(params: { position: Vector2D; text: string; size: number; color?: string; id?: string; }): string {
        if(params?.id) this.deleteElementFromCache(params.id)
        const text = this.two.makeText(params.text, params.position.x, params.position.y)
        text.linewidth = params.size
        this.addElementToCache(params.id ?? text.id, text)
        return params.id ?? text.id
    }

    deleteElement(id: string) {
        this.deleteElementFromCache(id)
    }

    drawLine(params: { start: Vector2D; end: Vector2D; stroke?: number; color?: string; id?: string; }): string {
        if(params?.id) this.deleteElementFromCache(params.id)
        const line = this.two.makeLine(
            params.start.x,
            params.start.y,
            params.end.x,
            params.end.y
        );
        if (params.stroke) line.linewidth = params.stroke;
        if (params.color) line.stroke = params.color;
        this.addElementToCache(params.id ?? line.id, line)
        return params.id ?? line.id
    }

    drawSquare(params: { center: Vector2D; width: number; height: number; color?: string; rotation?: number; id?: string; }): string {
        if(params?.id) this.deleteElementFromCache(params.id)
        const square = this.two.makeRectangle(
            params.center.x,
            params.center.y,
            params.width,
            params.height
        );
        if (params.color) square.fill = params.color;
        if (params.rotation) square.rotation = params.rotation;
        this.addElementToCache(params.id ?? square.id, square)
        return params.id ?? square.id
    }

    drawCircle(params: { center: Vector2D; radius: number; stroke?: string; color?: string; rotation?: number; id?: string; }): string {
        if(params?.id) this.deleteElementFromCache(params.id)
        const circle = this.two.makeCircle(
            params.center.x,
            params.center.y,
            params.radius,
        );
        if (params.stroke) circle.stroke = params.stroke;
        if (params.color) circle.fill = params.color;
        if (params.rotation) circle.rotation = params.rotation;
        this.addElementToCache(params.id ?? circle.id, circle)
        return params.id ?? circle.id
    }

    drawArrow(params: { start: Vector2D; end: Vector2D; stroke?: number; color?: string; lineWidth?: number; arrowWidth: number; id?: string; }): string {
        if(params?.id) this.deleteElementFromCache(params.id)
        const arrow = this.two.makeArrow(
            params.start.x,
            params.start.y,
            params.end.x,
            params.end.y,
            params.arrowWidth
        );
        if (params.stroke) arrow.linewidth = params.stroke;
        if (params.color) arrow.stroke = params.color;
        this.addElementToCache(params.id ?? arrow.id, arrow)
        return params.id ?? arrow.id
    }


    deleteElementFromCache(id: string) {
        const element = this.cache[id]
        if(element) this.two.remove(element)
    }

    addElementToCache(id: string, element: Shape){
        this.cache[id] = element
    }

    getElementFromCache(id: string): Shape{
        return this.cache[id]
    }

    update(): void {
        this.two.update();
    }

}

