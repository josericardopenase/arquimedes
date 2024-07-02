import { Rigidbody } from "./rigidbody";
import { Vector2D } from "./utils/vector";


export interface Force{
    apply(rb: Rigidbody): Vector2D
}

export class ForceBuilder{
    static from(f: (rb: Rigidbody) => Vector2D): Force{
        return {
            apply: f
        }
    }
}

