import { Rigidbody } from "./rigidbody";
import { Vector2D } from "./utils/vector";


export interface Force{
    apply(rb: Rigidbody): Vector2D
}