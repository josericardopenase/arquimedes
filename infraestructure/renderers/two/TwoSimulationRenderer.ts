import {ISimulationRenderer} from "../../../application/simulation/ISimulationRenderer";
import Two from "two.js";
import {Group} from "two.js/src/group";
import {Particle, Rigidbody} from "../../../domain";
import {Vector2D} from "../../../domain/math";
import {IRendererController} from "../IRendererController";
import {Options, TwoFactory} from "./TwoFactory";
import {TwoCacheDrawer } from "./TwoCacheDrawer";
import { Path } from "two.js/src/path";
import { SCALE_MODES } from "pixi.js";


export default class TwoSimulationRenderer
  implements ISimulationRenderer, IRendererController
{
  private two: Two;
  private drawer : TwoCacheDrawer
  private worldContainer: Group;
  private lines : Path[] = []

  constructor(options?: Options) {
    this.two = TwoFactory.fromOptions(options);
    this.drawer = new TwoCacheDrawer(this.two)
    this.worldContainer = this.two.scene;
    options?.plugins?.forEach((plugin) => plugin.plug(this));
    this.drawGridWithParams();
    this.drawGridWithParams()
  }


  // drawGrid(): void {
  //   this.two.makeLine(0, 0, -this.worldContainer.translation.x, 0);
  //   this.two.makeLine(0, 0, 0, -this.worldContainer.translation.y);
  //   this.two.makeLine(0, 0, this.worldContainer.translation.x + window.innerWidth, 0);
  //   this.two.makeLine(0, 0, 0, this.worldContainer.translation.y + window.innerHeight);
  // }

  drawGrid(position: Vector2D, scale: number, gridSize: number = 10, strokeColor: string = "#ddd"): void {
    this.two.remove(...this.lines)
    this.lines = []
    
    /*
    this.lines.push(
      this.two.makeLine(-position.x, this.two.height/2, -position.x + this.two.width, this.two.height/2)
    )

    this.lines.push(
      this.two.makeLine(this.two.width/2, -position.y, this.two.width/2, -position.y + this.two.height)
    )*/
    const scaleFactor=1/(this.worldContainer.scale as number)
    position = Vector2D.scalarMultiply(scaleFactor, position)
    const width = 1/(this.worldContainer.scale as number)  * this.two.width
    const height = 1/(this.worldContainer.scale as number)  * this.two.height
    const offset = ((width)/(gridSize*scaleFactor))

    const axisY =  this.two.makeLine(width/2, -position.y, width/2, -position.y + height)
    axisY.linewidth=3 * scaleFactor
    this.lines.push(
      axisY
    )
    const axisX = this.two.makeLine(-position.x, height/2, -position.x + width, height/2 )
    axisX.linewidth=3 * scaleFactor
    this.lines.push(
      axisX
    )
    
    for (let x = -position.x+position.x % offset; x <= -position.x+width; x += offset) {
      const line =  this.two.makeLine(x, -position.y, x, -position.y + height)
      line.linewidth=1 * scaleFactor
      this.lines.push(
        line
      )
    }
    for (let y = -position.y+position.y % offset; y <= -position.y+width; y += ((height)/(gridSize*scaleFactor))) {
      const line = this.two.makeLine(-position.x, y, -position.x + width, y )
      line.linewidth=1 * scaleFactor
      this.lines.push(
        line
      )
    }

    /*
    this.lines.push(

    )
    */


    /*
    const width = this.two.width;
    const height = this.two.height;

    const startX = -position.x / scale % gridSize;
    const startY = -position.y / scale % gridSize;

    for (let x = startX; x <= width / scale; x += gridSize / scale) {
        const line = this.two.makeLine(x * scale, 0, x * scale, height);
        line.stroke = strokeColor;
        this.lines.push(line)
        this.worldContainer.add(line);
    }

    for (let y = startY; y <= height / scale; y += gridSize / scale) {
        const line = this.two.makeLine(0, y * scale, width, y * scale);
        this.lines.push(line)
        line.stroke = strokeColor;
        this.worldContainer.add(line);
    }
        */


    this.two.update();
  }

  translate(x: number, y: number): void {
    this.worldContainer.translation.x += x;
    this.worldContainer.translation.y += y;
    this.drawGridWithParams()
  }

  private drawGridWithParams() {
    this.drawGrid(new Vector2D(this.worldContainer.position["_x"], this.worldContainer.position["_y"]), this.worldContainer.scale as number, 10);
  }

  scale(factor: number, origin: Vector2D): void {
    const localPosition = this.computeLocalPosition(origin);
    this.worldContainer.scale = Number(this.worldContainer.scale) * factor;
    this.worldContainer.translation.x = origin.x - localPosition.x * this.worldContainer.scale;
    this.worldContainer.translation.y = origin.y - localPosition.y * this.worldContainer.scale;

    this.drawGridWithParams()
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
