import {Apparience} from "./apparience.ts";

export class ApparienceBuilder {
    private apparience: Apparience;

    constructor() {
        this.apparience = new Apparience();
    }

    public setWidth(width: number): ApparienceBuilder {
        this.apparience.width = width;
        return this;
    }

    public setHeight(height: number): ApparienceBuilder {
        this.apparience.height = height;
        return this;
    }

    public setShape(shape: "Circle" | "Box" | "Particle"): ApparienceBuilder {
        this.apparience.shape = shape;
        return this;
    }

    public setColor(color: string): ApparienceBuilder {
        this.apparience.color = color;
        return this;
    }

    public build(): Apparience {
        return this.apparience;
    }
}
