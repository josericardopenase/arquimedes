import {Universe} from "./universe";
import setFixedDeltaTimeout from "./utils/fixedDeltaTime";
import {ForceBuilder, Particle} from "./physics";
import {Apparience} from "./physics/particle";
import {defaultCollisionHandler} from "./collisions";
import TwoJSUniverseRenderer from "./universe/renderers/TwoJSUniverseRenderer";

const renderer = new TwoJSUniverseRenderer();
const universe = new Universe(renderer);

const p1 = Particle.create()
    .setMass(5)
    .setPosition(window.innerWidth / 2, window.innerHeight / 2)
    .setVelocity(0, 0)
    .setCharge(0)
    .setApparience(
        Apparience.create()
            .setHeight(50)
            .setWidth(50)
            .setColor("green")
            .setShape("Box").build()
    ).build()

const p2 = Particle.create()
    .setMass(5)
    .setVelocity(0, 0)
    .setCharge(0)
    .setPosition(window.innerWidth / 2, window.innerHeight / 2 + 300)
    .setApparience(
        Apparience.create()
            .setHeight(50)
            .setWidth(50)
            .setColor("green")
            .setShape("Box").build()
    ).build()

universe.addParticle(p1)
universe.addParticle(p2)

p1.addForce(ForceBuilder.y((rb) => rb.mass.value*908))

p1.onCollision(defaultCollisionHandler)
p2.onCollision(defaultCollisionHandler)


setFixedDeltaTimeout((dt) => {
    universe.next(dt)
}, 1 / 220);