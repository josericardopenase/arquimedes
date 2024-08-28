import UniverseRenderer from "../universeRenderer";
import Two from "two.js";

import { Group } from "two.js/src/group";
import { Particle, Rigidbody} from "../../physics";

export default class TwoJSUniverseRenderer implements UniverseRenderer {
    private two: Two
    private worldContainer: Group;

    constructor() {
        var params = {
            fullscreen: true
        };
        this.two = new Two(params).appendTo(document.body);
        this.worldContainer = this.two.scene;
        this.drawGrid()
        this.addZoomSupport()
    }

    drawRigidbody(rb: Rigidbody): void {
        throw new Error("Methot not implemented.");
    }


    private drawGrid(){
    }


    private addZoomSupport() {
        document.addEventListener('wheel', (e) => {
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
        });

    }

    clear(): void {
        this.two.clear()
    }

    render(): void {
        this.two.update()
    }

    drawRigidbody(rb: Rigidbody): void {
        rb.getParticles().forEach(this.drawParticle)
    }

    drawVector(initialPosition: Vector2D, finalPosition: Vector2D){
        this.two.makeArrow(initialPosition.x, initialPosition.y, finalPosition.x, finalPosition.y, 8)
    }

    drawParticle(p: Particle) {
        const square = this.two.makeRectangle(p.position.x, p.position.y, p.apparience.width, p.apparience.height)
        square.fill = p.apparience.color
        this.worldContainer.add(square)
        this.two.update()
    }
}