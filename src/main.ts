import "./style.css";

import { Apparience, Particle } from "./core/physics/particle";
import Rigidbody from "./core/physics/rigidBody/rigidbody.ts";
import {setFixedDeltaTimeout} from "./core/utils/fixedDeltaTime.ts";
import {Vector2D} from "./core/math/vectors/Vector2D.ts";
import Universe from "./core/universe/universe.ts";
import {P5UniverseRenderer} from "./core/universe/renderers/P5UniverseRenderer.ts";

const universe = new Universe();
const renderer = new P5UniverseRenderer(universe);

const particleMesh = Particle.mesh(Particle.create()
  .setMass(2)
  .setVelocity(0, 0)
  .setApparience(
    Apparience.create()
      .setWidth(15)
      .setHeight(15)
      .setColor("blue")
      .setShape("Circle")
      .build(),
  ))
    .setNumberOfParticles(20)
    .setSpacing(20)
    .grid(new Vector2D(window.innerWidth/2, window.innerHeight/2))

const rb = Rigidbody.from(particleMesh)
universe.addRigidBody(rb)

setFixedDeltaTimeout((dt) => {
  renderer.render(dt);
}, 1/120);
