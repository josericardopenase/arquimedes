import { EventEmitter } from "../../shared/EventEmitter";
import { IRendererController } from "../renderers/IRendererController";
import { IRendererDrawer } from "../renderers/IRendererDrawer";
import { IRendererPlugin } from "../renderers/IRendererPlugin";


export class DragPlugin implements IRendererPlugin {
    public id = "drag";
    private isDragging: boolean = false;
    private active: boolean = true;
    private previousMousePosition: { x: number; y: number; } = { x: 0, y: 0 };
    private renderer!: IRendererController;
    private drawer!: IRendererDrawer;
    private eventEmitter: EventEmitter;

    plug(renderer: IRendererController, drawer: IRendererDrawer, eventEmitter: EventEmitter): void {
        this.renderer = renderer;
        this.drawer = drawer;
        this.eventEmitter = eventEmitter
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
        this.eventEmitter.emit("translate", event);
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
