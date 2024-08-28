import UniverseRenderer from "../universeRenderer";
import Two from "two.js";
import { Particle, Rigidbody} from "../../physics";
import {Vector2D} from "../../math";

export default class TwoJSUniverseRenderer implements UniverseRenderer {
    private two: Two


    constructor() {
        var params = {
            fullscreen: true
        };
        this.two = new Two(params).appendTo(document.body);
        this.drawGrid()
        window.addEventListener("wheel", this.handleZoom)
    }


    private drawGrid(){
    }


    private handleZoom(e: WheelEvent){
    }

    clear(): void {
        this.two.clear()
    }
    render(): void {
        this.two.render()
    }

    drawRigidbody(rb: Rigidbody): void {
        rb.getParticles().forEach(this.drawParticle)
    }

    drawVector(initialPosition: Vector2D, finalPosition: Vector2D){
        this.two.makeArrow(initialPosition.x, initialPosition.y, finalPosition.x, finalPosition.y, 8)
    }

    drawParticle(p: Particle) {
        const square = this.two.makeRectangle(p.position.x, p.position.y, p.apparience.width, p.apparience.height)
        this.drawVector(p.position, new Vector2D(1, 1))
        square.fill = p.apparience.color
        this.two.render()
    }
}