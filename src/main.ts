import "./style.css";

import { Apparience, Particle } from "./core/particle.ts";
import P5Ether from "./core/ethers/p5ether.ts";
import {defaultCollisionDetection} from "./core/collisions/callbacks.ts";
import {ForceBuilder} from "./core/force.ts";

const ether = new P5Ether();

const v1 = 10;

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

ether.addRigidbody(rb1);
ether.addRigidbody(rb2);
ether.addRigidbody(rb3);
ether.addRigidbody(rb4);
ether.addRigidbody(rb5);

rb1.onCollision(defaultCollisionDetection)
rb2.onCollision(defaultCollisionDetection)
rb3.onCollision(defaultCollisionDetection)
rb4.onCollision(defaultCollisionDetection)
rb5.onCollision(defaultCollisionDetection)

rb5.addForce(ForceBuilder.x(rb => 0.01 * ( ((window.innerWidth / 2)+300 ) - rb.position.x)))


setInterval(() => {
  ether.next();
}, 1000 / 60);
