import { Vector2D } from "../../domain/math";

export interface ICanvasDrawer{
    drawLine(params : {start : Vector2D, end : Vector2D, stroke?: number, color?: string, id?:string}): string
    drawText(params : {position : Vector2D, text : string, size: number, color ?: string, id ?: string}): string
    drawSquare(params : {center : Vector2D, width : number, height: number, color ?: string, rotation ?: number, id?:string}): string
    drawCircle(params : {center : Vector2D, radius : number, stroke ?: string, color ?: string, rotation ?: number, id?:string}): string
    drawArrow(params : {start : Vector2D, end : Vector2D, stroke ?: number, color ?: string, lineWidth?: number, arrowWidth: number, id?:string}): string
    deleteElement(id: string)
    update()
}

export interface ICanvasController{
    translate(x: number, y: number): void;
    scale(factor: number, origin: Vector2D): void;
    getScaleFactor() : number
    getPosition(): Vector2D
    getContainer(): HTMLElement;
}

export interface ICanvas extends ICanvasDrawer, ICanvasController{
}