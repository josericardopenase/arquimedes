import {ISimulationRenderer} from "../../../application/simulation/ISimulationRenderer";
import Two from "two.js";
import {Particle, Rigidbody} from "../../../domain";
import {Vector2D} from "../../../domain/math";
import {IRendererController} from "../IRendererController";
import {Options, TwoFactory} from "./TwoFactory";
import {TwoCacheDrawer } from "./TwoCacheDrawer";
import { TwoSimulationController } from "./TwoSimulationController";
import { EventEmitter } from "../../../shared/EventEmitter";


export default class TwoSimulationRenderer
  implements ISimulationRenderer
{
  private two: Two;
  private drawer : TwoCacheDrawer
  private controller : TwoSimulationController
  private eventEmitter : EventEmitter

  constructor(options?: Options) {
    this.two = TwoFactory.fromOptions(options);

    this.drawer = new TwoCacheDrawer(this.two)
    this.controller = new TwoSimulationController(this.two)
    this.eventEmitter = new EventEmitter();

    options?.plugins?.forEach((plugin) => plugin.plug(this.controller, this.drawer, this.eventEmitter));
  }

  update(): void {
    this.drawer.update()
  }

  drawRigidbody(rb: Rigidbody): void {
    this.drawer.drawRigidbody(rb)
  }

  drawVector(initialPosition: Vector2D, finalPosition: Vector2D) {
    this.drawer.drawVector(initialPosition, finalPosition)
  }

  drawParticle(p: Particle) {
    this.drawer.drawParticle(p)
  }
}
