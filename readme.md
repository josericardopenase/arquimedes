# Arquimedes.js

**Arquimedes.js** is a 2D physics engine designed for realistic simulations of physical environments. It's ideal for students, animators, and anyone interested in exploring physical concepts through an interactive simulation environment.

## Objectives

The main objectives of **Arquimedes.js** are:
- To provide a realistic simulation environment for understanding and experimenting with physical principles.
- To offer a simple and flexible API that allows users to easily create, manipulate, and visualize physical systems.
- To serve as an educational tool for students in physics, engineering, and related fields.

## Features

- **Accurate Physics Simulations**: Simulate real-world physical behaviors with precision.
- **Particle System**: Create and manipulate particles with various properties like mass, velocity, and charge.
- **Rigid Bodies**: Simulate the behavior of rigid bodies and their interactions.
- **Collision Handling**: Manage collisions between objects, including response behaviors.
- **Force Application**: Apply forces such as gravity, friction, and custom forces to objects.
- **Rendering with P5.js**: Visualize your simulations in real-time using P5.js.

## Documentation

The documentation is divided into the following sections:
- **Universe**: Learn how to create and manage the simulation space.
- **Particles**: Understand how to create and manipulate particles.
- **Rigid Bodies**: Explore the behavior of rigid bodies in the simulation.
- **Collisions**: Handle interactions and collisions between objects.
- **Forces**: Apply different types of forces to objects within the universe.

For more detailed information, please visit the [official documentation](https://arquimedes-website.vercel.app/).

## Installation

To start using **Arquimedes.js**, you can install it via `npm` or `yarn`:

### Using npm

```bash
npm install arquimedes
```

### Using Yarn

```bash
yarn add arquimedes
```

## Get Started

Here's a quick example to get you started with **Arquimedes.js**.

### 1. Create a Universe and Render It

The first step is to create a universe, which is the container for all particles and bodies in your simulation. Then, you'll use a renderer based on P5.js to visualize the universe.

```javascript
import { Universe } from "arquimedes";
import { P5UniverseRenderer } from "arquimedes/universe/renderers";
import setFixedDeltaTimeout from "arquimedes/utils/fixedDeltaTime";

// Create a new universe
const universe = new Universe();

// Create a renderer using P5.js
const renderer = new P5UniverseRenderer(universe);

// Start the simulation and rendering loop
setFixedDeltaTimeout((dt) => {
    renderer.render(dt);
}, 1 / 60);
```

`setFixedDeltaTimeout` is used to ensure that the simulation runs at a consistent rate, in this case, 60 times per second (1/60). This ensures that each rendering cycle updates and draws the universe uniformly.

### 2. Create Particles and Add Them to the Universe

Now you can create particles with specific properties like position, mass, and velocity, and then add them to the universe.

```javascript
import { Particle, Apparience } from "arquimedes/physics";

// Create a particle
const particle1 = Particle.create()
    .setPosition(100, 100)          // Initial position (x, y) in pixels
    .setMass(2)                     // Mass of the particle in kilograms
    .setVelocity(50, 0)             // Initial velocity (vx, vy) in pixels per second
    .setApparience(                 // Appearance of the particle
        Apparience.create()
            .setWidth(50)           // Width of the particle in pixels
            .setHeight(50)          // Height of the particle in pixels
            .setColor("blue")       // Color of the particle
            .setShape("Circle")     // Shape of the particle (Circle in this case)
            .build()
    )
    .build();

// Add the particle to the universe
universe.addParticle(particle1);
```

**Particle Properties**:
- **Position (`setPosition`)**: Defines the particle's initial location in 2D space.
- **Mass (`setMass`)**: Defines the particle's mass, which affects how it responds to forces.
- **Velocity (`setVelocity`)**: Defines the particle's initial velocity in both x and y directions.
- **Appearance (`setApparience`)**: Controls the particle's visual properties, including size, color, and shape.

### 3. Apply Forces to the Particles

To apply a gravitational force to the particle, you multiply the gravitational acceleration (9.8 m/s²) by the particle's mass to get the force in newtons.

```javascript
import { ForceBuilder } from "arquimedes/physics";

// Create a gravitational force (F = m * g)
const gravity = ForceBuilder.y(p => p.mass.value * 9.8);

// Apply the gravitational force to the particle
particle1.addForce(gravity);
```

In this example, the gravitational force is applied downward (positive Y-axis) and is proportional to the particle's mass. This causes the particle to accelerate downward at 9.8 m/s².

### 4. Handle Collisions Between Particles

You can define how particles react when they collide with each other, for example, using a default collision handler.

```javascript
import { defaultCollisionHandler } from "arquimedes/collisions";

// Add a collision handler to the particle
particle1.onCollision(defaultCollisionHandler);
```

### 5. Run the Simulation

With everything set up, you can run the simulation. The renderer you configured earlier will handle drawing the state of your universe in each cycle.

```javascript
// The rendering was already set up in step 1
setFixedDeltaTimeout((dt) => {
    renderer.render(dt);
}, 1 / 60);
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
