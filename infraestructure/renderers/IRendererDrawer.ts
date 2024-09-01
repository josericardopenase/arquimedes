import {Vector2D } from "../../domain/math";

export interface IRendererDrawer{
    drawLine(params : {start : Vector2D, end : Vector2D, stroke : number, color: string}): string
    drawSquare(params : {init : Vector2D, end : Vector2D, color: string}): string
    drawCircle(params : {init : Vector2D, end : Vector2D, stroke : number, color: string}): string
    drawArrow(params : {init : Vector2D, end : Vector2D, stroke : number, color: string, width: number, arrowWidth: number}): string
    deleteElement(id : string): void
    update()
}