import {Simulation} from "./infraestructure";
import setFixedDeltaTimeout from "./shared/fixedDeltaTime";
import {ForceBuilder, Particle} from "./domain";
import {Appearance} from "./domain/particle";
import {defaultCollisionHandler} from "./domain/collisions";
import TwoSimulationRenderer from "./infraestructure/renderers/two/TwoSimulationRenderer";
import { DragPlugin } from "./infraestructure/plugins/dragPlugin";
import { ZoomPlugin } from "./infraestructure/plugins/zoomPlugin";
import { GridPlugin } from "./infraestructure/plugins/gridPlugin";

const dragPlugin = new DragPlugin()
const zoomPlugin = new ZoomPlugin()
const gridPlugin = new GridPlugin()
const renderer = new TwoSimulationRenderer({
    plugins : [dragPlugin, zoomPlugin, gridPlugin]
});
const universe = new Simulation(renderer);

const p1 = Particle.create()
    .setMass(5)
    .setPosition(0, 0)
    .setVelocity(0, 0)
    .setCharge(0)
    .setAppearance(
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
    .setAppearance(
        Appearance.create()
            .setHeight(50)
            .setWidth(50)
            .setColor("green")
            .setShape("Box").build()
    ).build()

universe.addParticle(p1)
universe.addParticle(p2)

p1.addForce(ForceBuilder.y((rb) => rb.mass*98))

p1.onCollision(defaultCollisionHandler)
p2.onCollision(defaultCollisionHandler)


setFixedDeltaTimeout((dt) => {
    universe.simulate(dt)
}, 1 / 220);