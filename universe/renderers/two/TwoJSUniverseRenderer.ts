import {IUniverseRenderer} from "../../domain/IUniverseRenderer";
import Two from "two.js";
import {Group} from "two.js/src/group";
import {Particle, Rigidbody} from "../../../physics";
import {Vector2D} from "../../../math";
import {IRendererController} from "../IRendererController";
import {Options, TwoFactory} from "./TwoFactory";
import {TwoCacheUniverseRenderer} from "./TwoCacheUniverseRenderer";


export default class TwoJSUniverseRenderer
  implements IUniverseRenderer, IRendererController
{
  private two: Two;
  private drawer : TwoCacheUniverseRenderer
  private worldContainer: Group;

  constructor(options?: Options) {
    this.two = TwoFactory.fromOptions(options);
    this.drawer = new TwoCacheUniverseRenderer(this.two)
    this.worldContainer = this.two.scene;
    options?.plugins?.forEach((plugin) => plugin.plug(this));
  }


  drawGrid(): void {
    this.two.makeLine(0, 0, -this.worldContainer.translation.x, 0);
    this.two.makeLine(0, 0, 0, -this.worldContainer.translation.y);
    this.two.makeLine(0, 0, this.worldContainer.translation.x + window.innerWidth, 0);
    this.two.makeLine(0, 0, 0, this.worldContainer.translation.y + window.innerHeight);
  }

  translate(x: number, y: number): void {
    this.worldContainer.translation.x += x;
    this.worldContainer.translation.y += y;
    this.drawGrid()
  }

  scale(factor: number, origin: Vector2D): void {
    const localPosition = this.computeLocalPosition(origin);
    this.worldContainer.scale = Number(this.worldContainer.scale) * factor;
    this.worldContainer.translation.x = origin.x - localPosition.x * this.worldContainer.scale;
    this.worldContainer.translation.y = origin.y - localPosition.y * this.worldContainer.scale;
    this.drawGrid()
  }

  private computeLocalPosition(origin: Vector2D) {
    return {
      x: (origin.x - this.worldContainer.translation.x) / Number(this.worldContainer.scale),
      y: (origin.y - this.worldContainer.translation.y) / Number(this.worldContainer.scale),
    };
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
