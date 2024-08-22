
import "./style.css";

import { Apparience, Particle } from "./core/particle.ts";
import P5Ether from "./core/ethers/p5ether.ts";
import {defaultCollisionDetection} from "./core/collisions/callbacks.ts";

const ether = new P5Ether();

const v1 = 20;

const rb1 = Particle.create()
  .setPosition(window.innerWidth / 2 - 600, window.innerHeight / 2)
  .setMass(20)
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

ether.addRigidbody(rb1);
ether.addRigidbody(rb2);

rb1.onCollision(defaultCollisionDetection)

setInterval(() => {
  ether.next();
}, 1000 / 60);
