"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Point = /** @class */ (function () {
    function Point(x1, x2, y1, y2, color) {
        this._x1 = x1;
        this._x2 = x2;
        this._y1 = y1;
        this._y2 = y2;
        this._color = color;
    }
    Object.defineProperty(Point.prototype, "x1", {
        get: function () {
            return this._x1;
        },
        set: function (value) {
            this._x1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "x2", {
        get: function () {
            return this._x2;
        },
        set: function (value) {
            this._x2 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "y1", {
        get: function () {
            return this._y1;
        },
        set: function (value) {
            this._y1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "y2", {
        get: function () {
            return this._y2;
        },
        set: function (value) {
            this._y2 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (value) {
            this._color = value;
        },
        enumerable: true,
        configurable: true
    });
    return Point;
}());
exports.Point = Point;
