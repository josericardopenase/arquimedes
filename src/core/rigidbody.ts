import { Scalar } from "./utils/scalar";
import { Vector2D } from "./utils/vector";

export class Rigidbody{
    private position : Vector2D = new Vector2D(0, 0);
    private mass : Scalar = new Scalar(0);
    private velocity : Vector2D = new Vector2D(0, 0);
    private forces: Vector2D[] = []
}