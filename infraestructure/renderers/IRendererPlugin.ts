import { EventEmitter } from "../../shared/EventEmitter";
import { IRendererController } from "./IRendererController";
import { IRendererDrawer } from "./IRendererDrawer";

export interface IRendererPlugin {
    plug(renderer: IRendererController, drawer: IRendererDrawer, eventEmitter: EventEmitter): void;
}