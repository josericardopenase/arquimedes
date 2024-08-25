import {ApparienceBuilder} from "./apparienceBuilder.ts";

export class Apparience {
    public width: number = 0;
    public height: number = 0;
    public shape: "Circle" | "Box" | "Particle" = "Circle";
    public color: string = "#f5f5f5";

    public static default(): Apparience {
        return new Apparience();
    }

    public static create() {
        return new ApparienceBuilder();
    }
}

