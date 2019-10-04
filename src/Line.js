"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var point_1 = require("./point");
var Section_1 = require("./Section");
var _ = require("lodash");
var Line /*implements ILine*/ = /** @class */ (function () {
    function Line(label, sections, start, end, precision, color) {
        this._label = label;
        this._sections = sections;
        this._start = start;
        this._end = end;
        this._precision = precision;
        this._color = color;
    }
    Object.defineProperty(Line.prototype, "label", {
        get: function () {
            return this._label;
        },
        set: function (value) {
            this._label = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "sections", {
        get: function () {
            return this._sections;
        },
        set: function (value) {
            this._sections = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "start", {
        get: function () {
            return this._start;
        },
        set: function (value) {
            this._start = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "end", {
        get: function () {
            return this._end;
        },
        set: function (value) {
            this._end = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "precision", {
        get: function () {
            return this._precision;
        },
        set: function (value) {
            this._precision = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (value) {
            this._color = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "sectionList", {
        get: function () {
            return this._sectionList;
        },
        set: function (value) {
            this._sectionList = value;
        },
        enumerable: true,
        configurable: true
    });
    Line.prototype.findPoints = function (container) {
        var start = this._start, end = this._end, startPoint = _.filter(container.sectionList.sections, { "label": start.toString() }), endPoint = _.filter(container.sectionList.sections, { "label": end.toString() });
        var point = new point_1.Point(startPoint[0].x_axis, endPoint[0].x_axis, startPoint[0].y_axis, endPoint[0].y_axis, this._color);
        return point;
    };
    Line.prototype.buildGroup = function (container) {
        var sectionList = container.sectionList;
        var sectionAr = [];
        var sections = this.sections;
        var line = this;
        var color = this.checkLineColor(container.pageFilteredPTList, line.start, line.end, line.color);
        $.each(sectionList.sections, function () {
            var o = $(this)[0];
            if (container.template == 'tlp' || color == '#E8E8EE' || (o.page >= container.startPage && o.page <= container.endPage) || o.stroke == '#E8E8EE') {
                var section = new Section_1.Section(o.label, o.fontSize, o.precision, o.x_axis, o.y_axis, o.ger, o.ogd, o.pmc, o.str);
                sectionAr.push(section);
            }
        });
        //loop through list of line section array, as well as all sections and if the labels match, display the text
        for (var j = 0; j < sections.length; j++) {
            for (var k = 0; k < sectionAr.length; k++) {
                if (sections[j].toString() == sectionAr[k].label) {
                    container.divCounter = sectionAr[k].displayText(false, container.version, container.divCounter, container.template, container.util);
                }
            }
        }
    };
    // if the line is in the current start and end range, use its original color. If not, make it grey
    Line.prototype.checkLineColor = function (sections, startValue, endValue, color) {
        var startVal = startValue;
        var endVal = endValue;
        var resultStart = _.includes(sections, parseFloat(startVal));
        var resultEnd = _.includes(sections, parseFloat(endVal));
        var finalColor;
        if (resultStart == true && resultEnd === true) {
            finalColor = color;
        }
        else {
            finalColor = '#E8E8EE';
        }
        return finalColor;
    };
    return Line;
}());
exports.Line = Line;
