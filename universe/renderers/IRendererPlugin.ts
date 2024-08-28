import { IRendererController } from "./IRendererController";

export interface IRendererPlugin {
    plug(renderer: IRendererController): void;
}