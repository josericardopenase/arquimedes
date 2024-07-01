import { Rigidbody } from "./rigidbody";

export interface Ether{
    addRigidbody(rb : Rigidbody) : void
    next(): void
    start(): void
}


