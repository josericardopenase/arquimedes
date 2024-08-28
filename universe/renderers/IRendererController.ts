import {Vector2D } from "../../math";

export interface IRendererController{
    translate(x: number, y: number): void;
    scale(factor: number, origin: Vector2D): void;
}