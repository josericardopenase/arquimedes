import {Vector3D} from "./Vector3D.ts";

export class Vector2D {
    public x: number = 0;
    public y: number = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public static add(v1: Vector2D, v2: Vector2D): Vector2D {
        return new Vector2D(v1.x + v2.x, v1.y + v2.y);
    }

    public static fromVector3D(v1: Vector3D): Vector2D {
        return new Vector2D(v1.x, v1.y);
    }

    public static substract(v1: Vector2D, v2: Vector2D): Vector2D {
        return new Vector2D(v1.x - v2.x, v1.y - v2.y);
    }

    public static dot(v1: Vector2D, v2: Vector2D): number {
        return v1.x * v2.x + v1.y * v2.y;
    }

    public static cross(v1: Vector2D, v2: Vector2D): number {
        return v2.y * v1.x - v1.y * v2.x;
    }

    public static scalarMultiply(scalar: number, v1: Vector2D): Vector2D {
        return new Vector2D(v1.x * scalar, v1.y * scalar);
    }
    public scale(scalar: number): Vector2D {
        return new Vector2D(this.x * scalar, this.y * scalar);
    }

    public static module(v1: Vector2D): number {
        return Math.sqrt(v1.x ** 2 + v1.y ** 2);
    }

    public static eq(v1: Vector2D, v2: Vector2D, factor = 13): boolean {
        const result1 = v1.x - v2.x;
        const result2 = v1.y - v2.y;
        return Math.abs(result1) + Math.abs(result2) < factor;
    }

    public static normalize(v1: Vector2D): Vector2D {
        const magnitude = Vector2D.module(v1);
        if (magnitude === 0) {
            throw new Error("Cannot normalize a zero-length vector.");
        }
        return new Vector2D(v1.x / magnitude, v1.y / magnitude);
    }

    public static distance(v1: Vector2D, v2: Vector2D): number {
        return Vector2D.module(Vector2D.substract(v1, v2));
    }
}



