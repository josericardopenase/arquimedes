import { EventEmitter } from "../../shared/EventEmitter";
import { ICanvas } from "./ICanvas";

export interface IRendererPlugin {
    plug(canvas: ICanvas): void;
}