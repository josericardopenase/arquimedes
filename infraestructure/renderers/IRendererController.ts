import {Vector2D } from "../../domain/math";

export interface IRendererController{
    translate(x: number, y: number): void;
    scale(factor: number, origin: Vector2D): void;
    getScaleFactor() : number
    getPosition(): Vector2D
    getContainer(): HTMLElement;
}