import {Universe} from "./universe";
import setFixedDeltaTimeout from "./utils/fixedDeltaTime";
import {ForceBuilder, Particle} from "./physics";
import {Appearance} from "./physics/particle";
import {defaultCollisionHandler} from "./collisions";
import TwoJSUniverseRenderer from "./universe/renderers/two/TwoJSUniverseRenderer";
import { DragPlugin } from "./universe/plugins/dragPlugin";
import { ZoomPlugin } from "./universe/plugins/zoomPlugin";

const dragPlugin = new DragPlugin()
const zoomPlugin = new ZoomPlugin()
const renderer = new TwoJSUniverseRenderer({
    container: document.getElementById("app") ?? document.body,
    plugins : [dragPlugin, zoomPlugin]
});
const universe = new Universe(renderer);

const p1 = Particle.create()
    .setMass(5)
    .setPosition(0, 0)
    .setVelocity(0, 0)
    .setCharge(0)
    .setApparience(
        Appearance.create()
            .setHeight(50)
            .setWidth(50)
            .setColor("green")
            .setShape("Box").build()
    ).build()

const p2 = Particle.create()
    .setMass(5)
    .setVelocity(0, 0)
    .setCharge(0)
    .setPosition(0, 300)
    .setApparience(
        Appearance.create()
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