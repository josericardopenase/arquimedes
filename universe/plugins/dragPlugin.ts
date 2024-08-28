import { IRendererController } from "../renderers/IRendererController";
import { IRendererPlugin } from "../renderers/IRendererPlugin";


export class DragPlugin implements IRendererPlugin {
    public id = "drag";
    private isDragging: boolean = false;
    private active: boolean = true;
    private previousMousePosition: { x: number; y: number; } = { x: 0, y: 0 };
    private renderer: IRendererController;

    plug(renderer: IRendererController): void {
        this.renderer = renderer;
        document.body.addEventListener("mousedown", this.onMouseDown.bind(this));
        document.body.addEventListener("mousemove", this.onMouseMove.bind(this));
        document.body.addEventListener("mouseup", this.onMouseUp.bind(this));
    }
    
    onMouseWheel(event: WheelEvent): void {}

    onMouseDown(event: MouseEvent): void {
        if (!this.active) return;
        if (event.buttons === 1) {
            this.isDragging = true;
            this.previousMousePosition = { x: event.clientX, y: event.clientY };
        }
    }

    onMouseMove(event: MouseEvent): void {
        if (!this.active || !this.isDragging) return;

        const dx = event.clientX - this.previousMousePosition.x;
        const dy = event.clientY - this.previousMousePosition.y;

        this.renderer.translate(dx, dy);
        this.previousMousePosition = { x: event.clientX, y: event.clientY };
    }

    onMouseUp(event: MouseEvent): void {
        this.isDragging = false;
    }
}
