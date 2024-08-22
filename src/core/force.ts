import { Particle } from "./particle.ts";
import { Vector2D } from "./utils/vector";

export interface Force {
  apply(rb: Particle): Vector2D;
}

export class ForceBuilder {
  static from(f: (rb: Particle) => Vector2D): Force {
    return {
      apply: f,
    };
  }

  static x(f: (rb: Particle) => number): Force {
    return {
      apply: (rb) => new Vector2D(f(rb), 0),
    };
  }

  static y(f: (rb: Particle) => number): Force {
    return {
      apply: (rb) => new Vector2D(0, f(rb)),
    };
  }
}
