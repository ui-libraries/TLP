import {
    Point
} from "./point";
import {
    Section
} from "./section";
import * as _ from 'lodash';
export class Line {
    constructor(label, sections, start, end, precision, color) {
        this._label = label;
        this._sections = sections;
        this._start = start;
        this._end = end;
        this._precision = precision;
        this._color = color;
    }
    get label() {
        return this._label;
    }
    set label(value) {
        this._label = value;
    }
    get sections() {
        return this._sections;
    }
    set sections(value) {
        this._sections = value;
    }
    get start() {
        return this._start;
    }
    set start(value) {
        this._start = value;
    }
    get end() {
        return this._end;
    }
    set end(value) {
        this._end = value;
    }
    get precision() {
        return this._precision;
    }
    set precision(value) {
        this._precision = value;
    }
    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
    }
    get sectionList() {
        return this._sectionList;
    }
    set sectionList(value) {
        this._sectionList = value;
    }
    findPoints(container) {
        let start = this._start,
            end = this._end,
            startPoint = _.filter(container.sectionList.sections, {
                "label": start.toString()
            }),
            endPoint = _.filter(container.sectionList.sections, {
                "label": end.toString()
            });
        let point = new Point(startPoint[0].x_axis, endPoint[0].x_axis, startPoint[0].y_axis, endPoint[0].y_axis, this._color);
        return point;
    }
    buildGroup(container) {
        let sectionList = container.sectionList;
        let sectionAr = [];
        let sections = this.sections;
        let line = this;
        let color = this.checkLineColor(container.pageFilteredPTList, line.start, line.end, line.color);
        $.each(sectionList.sections, function() {
            let o = $(this)[0];
            if (container.template == 'tlp' || color == '#E8E8EE' || (o.page >= container.startPage && o.page <= container.endPage) || o.stroke == '#E8E8EE') {
                let section = new Section(o.label, o.fontSize, o.precision, o.x_axis, o.y_axis, o.ger, o.ogd, o.pmc, o.str);
                sectionAr.push(section);
            }
        });
        //loop through list of line section array, as well as all sections and if the labels match, display the text
        for (let j = 0; j < sections.length; j++) {
            for (let k = 0; k < sectionAr.length; k++) {
                if (sections[j].toString() == sectionAr[k].label) {
                    container.divCounter = sectionAr[k].displayText(false, container.version, container.divCounter, container.template, container.util);
                }
            }
        }
    }
    // if the line is in the current start and end range, use its original color. If not, make it grey
    checkLineColor(sections, startValue, endValue, color) {
        let startVal = startValue;
        let endVal = endValue;
        let resultStart = _.includes(sections, parseFloat(startVal));
        let resultEnd = _.includes(sections, parseFloat(endVal));
        let finalColor;
        if (resultStart == true && resultEnd === true) {
            finalColor = color;
        } else {
            finalColor = '#E8E8EE';
        }
        return finalColor;
    }
}