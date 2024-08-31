import { Vector2D } from "../../domain/math";
import { IRendererController } from "../renderers/IRendererController";
import { IRendererPlugin } from "../renderers/IRendererPlugin";

export class ZoomPlugin implements IRendererPlugin {
    public id = "zoom";
    private active: boolean = true;
    private renderer!: IRendererController;

    plug(renderer: IRendererController): void {
        this.renderer = renderer;
        renderer.getContainer().addEventListener("wheel", this.onMouseWheel.bind(this));
    }

    onMouseWheel(event: WheelEvent): void {
        if (!this.active) return;
        event.preventDefault();
        const scaleFactor = this.getScaleFactor(event);
        const mousePosition = this.getMousePosition(event);
        this.renderer.scale(scaleFactor, mousePosition);
    }

    private getMousePosition(event: WheelEvent) {
        return new Vector2D(event.clientX, event.clientY);
    }

    private getScaleFactor(event: WheelEvent) {
        return event.deltaY < 0 ? 1.01 : 0.98;
    }
}
