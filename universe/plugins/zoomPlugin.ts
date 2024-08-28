import { Vector2D } from "../../math";
import { IRendererController } from "../renderers/IRendererController";
import { IRendererPlugin } from "../renderers/IRendererPlugin";

export class ZoomPlugin implements IRendererPlugin {
    public id = "zoom";
    private active: boolean = true;
    private renderer: IRendererController;

    plug(renderer: IRendererController): void {
        this.renderer = renderer;
        document.body.addEventListener("wheel", this.onMouseWheel.bind(this));
    }

    onMouseDown(event: MouseEvent): void {}
    onMouseMove(event: MouseEvent): void {}
    onMouseUp(event: MouseEvent): void {}

    onMouseWheel(event: WheelEvent): void {
        if (!this.active) return;

        const scaleFactor = event.deltaY < 0 ? 1.1 : 0.9;
        const mousePosition = new Vector2D(event.clientX, event.clientY);

        this.renderer.scale(scaleFactor, mousePosition);
    }
}
