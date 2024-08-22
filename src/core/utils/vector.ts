export class Vector2D {
  public x: number = 0;
  public y: number = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public static add(v1: Vector2D, v2: Vector2D) {
    return new Vector2D(v1.x + v2.x, v1.y + v2.y);
  }

  public static substract(v1: Vector2D, v2: Vector2D) {
    return new Vector2D(v1.x - v2.x, v1.y - v2.y);
  }

  public static dot(v1: Vector2D, v2: Vector2D): number {
    return v1.x * v2.x + v1.y * v2.y;
  }

  public static cross(v1: Vector2D, v2: Vector2D): number {
    return v2.y * v1.x - v1.y * v2.x;
  }

  public static scalarMultiply(scalar: number, v1: Vector2D) {
    return new Vector2D(v1.x * scalar, v1.y * scalar);
  }

  public static module(v1: Vector2D) {
    return Math.sqrt(v1.x ** 2 + v1.y ** 2);
  }

  public static eq(v1: Vector2D, v2: Vector2D, factor = 10): boolean {
    const result1 = v1.x - v2.x;
    const result2 = v1.y - v2.y;
    return (Math.abs(result1) + Math.abs(result2)) < factor;
  }
}

export class Vector3D {
  public x: number = 0;
  public y: number = 0;
  public z: number = 0;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
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
