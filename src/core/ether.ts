import { Rigidbody } from "./rigidbody";

export interface Ether{
    addRigidbody(rb : Rigidbody) : void
    run(): void
    stop(): void
    travel(seconds : string) : void
    draw(): void
}
