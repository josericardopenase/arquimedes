import {ISimulationRenderer} from "../../../application/simulation/ISimulationRenderer";
import Two from "two.js";
import {Group} from "two.js/src/group";
import {Particle, Rigidbody} from "../../../domain";
import {Vector2D} from "../../../domain/math";
import {IRendererController} from "../IRendererController";
import {Options, TwoFactory} from "./TwoFactory";
import {TwoCacheDrawer } from "./TwoCacheDrawer";
import { Path } from "two.js/src/path";
import { TwoSimulationController } from "./TwoSimulationController";


export default class TwoSimulationRenderer
  implements ISimulationRenderer, IRendererController
{
  private two: Two;
  private drawer : TwoCacheDrawer
  private controller : TwoSimulationController

  constructor(options?: Options) {
    this.two = TwoFactory.fromOptions(options);

    this.drawer = new TwoCacheDrawer(this.two)
    this.controller = new TwoSimulationController(this.two)

    options?.plugins?.forEach((plugin) => plugin.plug(this.controller));
  }

  translate(x: number, y: number): void {
    this.controller.translate(x, y)
  }
  
  scale(factor: number, origin: Vector2D): void {
    this.controller.scale(factor, origin)
  }

  getContainer(): HTMLElement {
    return this.controller.getContainer()
  }

  getScaleFactor(): number {
    return this.controller.getScaleFactor()
  }
  getPosition(): Vector2D {
    return this.controller.getPosition()
  }

  addTranslateCallback(callback: () => void): void {
    throw this.controller.addTranslateCallback(callback);
  }

  addScaleCallback(callback: () => void): void {
    throw this.controller.addScaleCallback(callback)
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
