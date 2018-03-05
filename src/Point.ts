export class Point {
    private _x1: number;
    private _x2: number;
    private _y1: number;
    private _y2: number;
    private _color: string;

    constructor(x1: number, x2: number, y1: number, y2: number, color: string) {
        this._x1 = x1;
        this._x2 = x2;
        this._y1 = y1;
        this._y2 = y2;
        this._color = color;
    }

    get x1(): number {
        return this._x1;
    }

    set x1(value: number) {
        this._x1 = value;
    }

    get x2(): number {
        return this._x2;
    }

    set x2(value: number) {
        this._x2 = value;
    }

    get y1(): number {
        return this._y1;
    }

    set y1(value: number) {
        this._y1 = value;
    }

    get y2(): number {
        return this._y2;
    }

    set y2(value: number) {
        this._y2 = value;
    }

    get color(): string {
        return this._color;
    }

    set color(value: string) {
        this._color = value;
    }
}