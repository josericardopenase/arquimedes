import {Appearance} from "./appearance.ts";

export class AppearanceBuilder {
    private appearance: Appearance;

    constructor() {
        this.appearance = new Appearance();
    }

    public setWidth(width: number): AppearanceBuilder {
        this.appearance.width = width;
        return this;
    }

    public setHeight(height: number): AppearanceBuilder {
        this.appearance.height = height;
        return this;
    }

    public setShape(shape: "Circle" | "Box" | "Particle"): AppearanceBuilder {
        this.appearance.shape = shape;
        return this;
    }

    public setColor(color: string): AppearanceBuilder {
        this.appearance.color = color;
        return this;
    }

    public build(): Appearance {
        return this.appearance;
    }
}
