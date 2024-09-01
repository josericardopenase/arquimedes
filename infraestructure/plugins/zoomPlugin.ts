import { Vector2D } from "../../domain/math";
import { IRendererPlugin } from "../renderers/IRendererPlugin";
import { EventEmitter } from "../../shared/EventEmitter";
import { ICanvas } from "../renderers/ICanvas";

export class ZoomPlugin implements IRendererPlugin {
    public id = "zoom";
    private active: boolean = true;
    private canvas: ICanvas;
    
    plug(canvas: ICanvas): void {
        this.canvas = canvas;
        canvas.getContainer().addEventListener("wheel", this.onMouseWheel.bind(this));
    }

    onMouseWheel(event: WheelEvent): void {
        if (!this.active) return;
        event.preventDefault();
        const scaleFactor = this.getScaleFactor(event);
        const mousePosition = this.getMousePosition(event);
        this.canvas.scale(scaleFactor, mousePosition);
        EventEmitter.getEventBus().emit("zoom", event);
    }

    private getMousePosition(event: WheelEvent) {
        return new Vector2D(event.clientX, event.clientY);
    }

    private getScaleFactor(event: WheelEvent) {
        return event.deltaY < 0 ? 1.01 : 0.99;
    }
}
