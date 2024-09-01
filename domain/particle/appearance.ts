import {AppearanceBuilder} from "./appearanceBuilder.ts";

export class Appearance {
    public width: number = 0;
    public height: number = 0;
    public shape: "Circle" | "Box" | "Particle" = "Circle";
    public color: string = "#f5f5f5";

    public static default(): Appearance {
        return new Appearance();
    }

    public static create() {
        return new AppearanceBuilder();
    }
}

