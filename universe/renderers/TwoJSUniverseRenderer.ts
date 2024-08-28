import UniverseRenderer from "../universeRenderer";
import Two from "two.js";
import { Group } from "two.js/src/group";
import { Particle, Rigidbody} from "../../physics";

export default class TwoJSUniverseRenderer implements UniverseRenderer {
    private two: Two
    private worldContainer: Group;
    private previousMousePosition: { x: number; y: number; };
    private isDragging: boolean = false;

    constructor() {
        var params = {
            fullscreen: true
        };
        this.two = new Two(params).appendTo(document.body);
        this.worldContainer = this.two.scene;
        this.drawGrid()
        document.body.addEventListener("wheel", this.handleZoom.bind(this));
        document.body.addEventListener("mousedown", this.handleDragStart.bind(this));
        document.body.addEventListener("mousemove", this.handleDrag.bind(this));
        document.body.addEventListener("mouseup", () => this.isDragging = false);
    }

    drawRigidbody(rb: Rigidbody): void {
        throw new Error("Methot not implemented.");
    }

    private drawGrid(){
    }

    private handleZoom(e: WheelEvent) {
        e.preventDefault();

        const scaleFactor = e.deltaY < 0 ? 1.1 : 0.9;
        const mousePosition = { x: e.clientX, y: e.clientY };

        const localPos = {
            x: (mousePosition.x - this.worldContainer.translation.x) / Number(this.worldContainer.scale),
            y: (mousePosition.y - this.worldContainer.translation.y) / Number(this.worldContainer.scale),
        };

        this.worldContainer.scale = Number(this.worldContainer.scale) * scaleFactor;

        this.worldContainer.translation.x = mousePosition.x - (localPos.x * this.worldContainer.scale);
        this.worldContainer.translation.y = mousePosition.y - (localPos.y * this.worldContainer.scale);

        this.two.update();
    }

    private handleDragStart(e: MouseEvent) {
        const isPressed = e.buttons === 1;
        this.isDragging = isPressed;
        this.previousMousePosition = { x: e.clientX, y: e.clientY };
    }

    private handleDrag(e: MouseEvent) {
        e.preventDefault();

        if (!this.isDragging) return;

        const dx = e.clientX - this.previousMousePosition.x;
        const dy = e.clientY - this.previousMousePosition.y;
        

        this.worldContainer.translation.x += dx;
        this.worldContainer.translation.y += dy;

        this.previousMousePosition = { x: e.clientX, y: e.clientY };

        this.two.update();
    }

    clear(): void {
        this.two.clear()
    }

    render(): void {
        this.two.update()
    }

    drawParticle(p: Particle) {
        const square = this.two.makeRectangle(p.position.x, p.position.y, p.apparience.width, p.apparience.height)
        square.fill = p.apparience.color
        this.worldContainer.add(square)
        this.two.update()
    }
}