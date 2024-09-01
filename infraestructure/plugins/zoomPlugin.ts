import { Vector2D } from "../../domain/math";
import { IRendererController } from "../renderers/IRendererController";
import { IRendererDrawer } from "../renderers/IRendererDrawer";
import { IRendererPlugin } from "../renderers/IRendererPlugin";
import { EventEmitter } from "../../shared/EventEmitter";

export class ZoomPlugin implements IRendererPlugin {
    public id = "zoom";
    private active: boolean = true;
    private renderer!: IRendererController;
    private drawer!: IRendererDrawer;
    private eventEmitter!: EventEmitter;
    
    plug(renderer: IRendererController, drawer: IRendererDrawer, eventEmitter: EventEmitter): void {
        this.renderer = renderer;
        this.drawer = drawer;
        this.eventEmitter = eventEmitter;
        renderer.getContainer().addEventListener("wheel", this.onMouseWheel.bind(this));
    }

    onMouseWheel(event: WheelEvent): void {
        if (!this.active) return;
        event.preventDefault();
        const scaleFactor = this.getScaleFactor(event);
        const mousePosition = this.getMousePosition(event);
        this.renderer.scale(scaleFactor, mousePosition);
        this.eventEmitter.emit("zoom", event);
    }

    private getMousePosition(event: WheelEvent) {
        return new Vector2D(event.clientX, event.clientY);
    }

    private getScaleFactor(event: WheelEvent) {
        return event.deltaY < 0 ? 1.05 : 0.95;
    }
}
