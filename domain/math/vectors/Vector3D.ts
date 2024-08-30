import {Vector2D} from "./Vector2D.ts";

export class Vector3D {
    public x: number = 0;
    public y: number = 0;
    public z: number = 0;



    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public static fromVector2D(v : Vector2D){
        return new Vector3D(v.x, v.y, 0)
    }

    // Suma dos vectores
    public static add(v1: Vector3D, v2: Vector3D): Vector3D {
        return new Vector3D(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    }

    // Resta dos vectores
    public static subtract(v1: Vector3D, v2: Vector3D): Vector3D {
        return new Vector3D(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
    }

    // Producto punto de dos vectores
    public static dot(v1: Vector3D, v2: Vector3D): number {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    }

    // Producto cruz de dos vectores
    public static cross(v1: Vector3D, v2: Vector3D): Vector3D {
        return new Vector3D(
            v1.y * v2.z - v1.z * v2.y,
            v1.z * v2.x - v1.x * v2.z,
            v1.x * v2.y - v1.y * v2.x,
        );
    }

    // Multiplicación por un escalar
    public static scalarMultiply(scalar: number, v1: Vector3D): Vector3D {
        return new Vector3D(v1.x * scalar, v1.y * scalar, v1.z * scalar);
    }

    // Módulo del vector
    public static module(v1: Vector3D): number {
        return Math.sqrt(v1.x ** 2 + v1.y ** 2 + v1.z ** 2);
    }

    public static eq(v1: Vector3D, v2: Vector3D): boolean {
        return v1.x == v2.x && v1.y == v2.y && v2.z == v2.z;
    }
}
