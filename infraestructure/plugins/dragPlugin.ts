import { IRendererController } from "../renderers/IRendererController";
import { IRendererPlugin } from "../renderers/IRendererPlugin";


export class DragPlugin implements IRendererPlugin {
    public id = "drag";
    private isDragging: boolean = false;
    private active: boolean = true;
    private previousMousePosition: { x: number; y: number; } = { x: 0, y: 0 };
    private renderer!: IRendererController;

    plug(renderer: IRendererController): void {
        this.renderer = renderer;
        renderer.getContainer().addEventListener("mousedown", this.onMouseDown.bind(this));
        renderer.getContainer().addEventListener("mousemove", this.onMouseMove.bind(this));
        renderer.getContainer().addEventListener("mouseup", this.onMouseUp.bind(this));
    }
    

    onMouseDown(event: MouseEvent): void {
        if (!this.active) return;
        event.preventDefault();
        if (event.buttons !== 1) return;
        this.isDragging = true;
        this.savePreviousMousePosition(event)
    }

    onMouseMove(event: MouseEvent): void {
        if (!this.active || !this.isDragging) return;
        event.preventDefault();
        const {dx, dy} = this.computeDisplacement(event)
        this.renderer.translate(dx, dy);
        this.savePreviousMousePosition(event);
    }

    private savePreviousMousePosition(event: MouseEvent) {
        this.previousMousePosition = {x: event.clientX, y: event.clientY};
    }

    private computeDisplacement(event: MouseEvent) {
        return {
            dx: event.clientX - this.previousMousePosition.x,
            dy: event.clientY - this.previousMousePosition.y
        };
    }

    onMouseUp(): void {
        this.isDragging = false;
    }
}
