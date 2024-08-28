import UniverseRenderer from "../universeRenderer";
import Two from "two.js";
import { Particle, Rigidbody} from "../../physics";

export default class TwoJSUniverseRenderer implements UniverseRenderer {
    private two: Two

    constructor() {
        var params = {
            fullscreen: true
        };
        this.two = new Two(params).appendTo(document.body);
        this.drawGrid()
    }

    drawRigidbody(rb: Rigidbody): void {
        throw new Error("Methot not implemented.");
    }

    private drawGrid(){
    }

    clear(): void {
        this.two.clear()
    }
    render(): void {
        this.two.render()
    }

    drawParticle(p: Particle) {
        const square = this.two.makeRectangle(p.position.x, p.position.y, p.apparience.width, p.apparience.height)
        square.fill = p.apparience.color
        this.two.render()
    }
}