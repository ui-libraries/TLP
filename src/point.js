export class Point {
    constructor(x1, x2, y1, y2, color) {
        this._x1 = x1;
        this._x2 = x2;
        this._y1 = y1;
        this._y2 = y2;
        this._color = color;
    }
    get x1() {
        return this._x1;
    }
    set x1(value) {
        this._x1 = value;
    }
    get x2() {
        return this._x2;
    }
    set x2(value) {
        this._x2 = value;
    }
    get y1() {
        return this._y1;
    }
    set y1(value) {
        this._y1 = value;
    }
    get y2() {
        return this._y2;
    }
    set y2(value) {
        this._y2 = value;
    }
    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
    }
}
