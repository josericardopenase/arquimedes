import {Universe} from "./universe";
import {P5UniverseRenderer} from "./universe/renderers";
import setFixedDeltaTimeout from "./utils/fixedDeltaTime";


const universe = new Universe()
const universeRenderer = new P5UniverseRenderer(universe)

setFixedDeltaTimeout((dt) => {
    universeRenderer.render(dt)
}, 1/60)