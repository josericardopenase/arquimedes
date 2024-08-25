import {Universe} from "./universe";
import {P5UniverseRenderer} from "./universe/renderers";
import {ForceBuilder, Particle} from "./physics";
import {Apparience} from "./physics/particle";
import {defaultCollisionHandler} from "./collisions";
import setFixedDeltaTimeout from "./utils/fixedDeltaTime";


const universe = new Universe();
const renderer = new P5UniverseRenderer(universe);

const v1 = 100;

const rb1 = Particle.create()
    .setPosition(window.innerWidth / 2 - 600, window.innerHeight / 2)
    .setMass(2)
    .setVelocity(v1, 0)
    .setApparience(
        Apparience.create()
            .setWidth(50)
            .setHeight(50)
            .setColor("blue")
            .setShape("Circle")
            .build(),
    )
    .build();

const rb2 = Particle.create()
    .setPosition(window.innerWidth / 2, window.innerHeight / 2)
    .setMass(1)
    .setApparience(
        Apparience.create()
            .setWidth(50)
            .setHeight(50)
            .setColor("green")
            .setShape("Circle")
            .build(),
    )
    .build();


const rb3 = Particle.create()
    .setPosition((window.innerWidth / 2)+100, window.innerHeight / 2)
    .setMass(1)
    .setApparience(
        Apparience.create()
            .setWidth(50)
            .setHeight(50)
            .setColor("green")
            .setShape("Circle")
            .build(),
    )
    .build();

const rb4 = Particle.create()
    .setPosition((window.innerWidth / 2)+200 , window.innerHeight / 2)
    .setMass(1)
    .setApparience(
        Apparience.create()
            .setWidth(50)
            .setHeight(50)
            .setColor("yellow")
            .setShape("Circle")
            .build(),
    )
    .build();

const rb5 = Particle.create()
    .setPosition((window.innerWidth / 2)+300 , window.innerHeight / 2)
    .setMass(1)
    .setApparience(
        Apparience.create()
            .setWidth(50)
            .setHeight(50)
            .setColor("yellow")
            .setShape("Circle")
            .build(),
    )
    .build();

universe.addParticle(rb1);
universe.addParticle(rb2);
universe.addParticle(rb3);
universe.addParticle(rb4);
universe.addParticle(rb5);

rb1.onCollision(defaultCollisionHandler)
rb2.onCollision(defaultCollisionHandler)
rb3.onCollision(defaultCollisionHandler)
rb4.onCollision(defaultCollisionHandler)
rb5.onCollision(defaultCollisionHandler)

rb5.addForce(ForceBuilder.x(rb => 0.01 * ( ((window.innerWidth / 2)+300 ) - rb.position.x)))


setFixedDeltaTimeout((dt) => {
    renderer.render(dt)
}, 1 / 60);