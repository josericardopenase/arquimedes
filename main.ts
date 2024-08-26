import {Universe} from "./universe";
import {P5UniverseRenderer} from "./universe/renderers";
import setFixedDeltaTimeout from "./utils/fixedDeltaTime";
import {ForceBuilder, Particle, Rigidbody} from "./physics";
import { Apparience } from "./physics/particle";
import {defaultCollisionHandler} from "./collisions";
import {Vector2D} from "./math";


const universe = new Universe();
const renderer = new P5UniverseRenderer(universe);


const template = Particle.create()
    .setMass(10)
    .setPosition(window.innerWidth/2, window.innerHeight/2)
    .setCharge(10)
    .setApparience(
        Apparience.create()
            .setColor("green")
            .setWidth(20)
            .setHeight(20)
            .build()
    )

new Field()
setFixedDeltaTimeout((dt) => {
    renderer.render(dt)
}, 1 / 220);