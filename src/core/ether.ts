import { Rigidbody } from "./rigidbody";
import {Vector2D} from "./utils/vector.ts";

export interface Ether{
    addRigidbody(rb : Rigidbody) : void
    next(): void
    start(): void
}


