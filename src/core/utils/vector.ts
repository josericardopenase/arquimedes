
export class Vector2D{
    public x : number = 0
    public y : number = 0

    constructor(x : number, y : number){
        this.x = x
        this.y = y
    }

    public static add(v1 : Vector2D, v2: Vector2D){
        return new Vector2D(v1.x + v2.x, v1.y+v1.y)
    }

    public static substract(v1 : Vector2D, v2: Vector2D){
        return new Vector2D(v1.x - v2.x, v1.y - v1.y)
    }

    public static dot(v1 : Vector2D, v2 : Vector2D) : number{
        return (v1.x * v2.x) + (v1.y * v2.y)
    }

    public static cross(v1 : Vector2D, v2: Vector2D) : number{
        return (v2.y * v1.x) - (v1.y *v2.x)
    }

}