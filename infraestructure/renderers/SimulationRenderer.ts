import { ISimulationRenderer } from "../../application/simulation/ISimulationRenderer";
import { Particle, Rigidbody } from "../../domain";
import { Vector2D } from "../../domain/math";
import { ICanvas } from "./ICanvas";
import { IRendererPlugin } from "./IRendererPlugin";


export default class SimulationRenderer
  implements ISimulationRenderer
{

  constructor(private readonly canvas : ICanvas, plugins?: IRendererPlugin[]) {
    this.canvas = canvas
    plugins?.forEach((plugin) => plugin.plug(this.canvas));
  }

  update(): void {
    this.canvas.update()
  }

  drawRigidbody(rb: Rigidbody): void {
    rb.getParticles().forEach(this.drawParticle) 
  }

  drawVector(initialPosition: Vector2D, finalPosition: Vector2D) {
    this.canvas.drawArrow(
      {
        start: initialPosition,
        end: finalPosition,
        arrowWidth: 3
      }
    )
  }

  drawParticle(p: Particle) {
    this.canvas.drawSquare({
      center: p.position,
      width: p.appearance.width,
      height: p.appearance.height,
      color: "green",
      id: p.id()
    })
  }
}
