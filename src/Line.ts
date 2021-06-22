import {Point} from "./point";
import {Section} from "./Section";
import * as _ from 'lodash';

declare let MathJax: any;

export class Line /*implements ILine*/ {
    private _label: string;
    private _sections: number[];
    private _start: string;
    private _end: string;
    private _precision: number;
    private _color: string;
    private _sectionList: any;

    constructor(label: string, sections: number[], start: string, end: string, precision: number, color: string) {
        this._label = label;
        this._sections = sections;
        this._start = start;
        this._end = end;
        this._precision = precision;
        this._color = color;
    }


    get label(): string {
        return this._label;
    }

    set label(value: string) {
        this._label = value;
    }

    get sections(): number[] {
        return this._sections;
    }

    set sections(value: number[]) {
        this._sections = value;
    }

    get start(): string {
        return this._start;
    }

    set start(value: string) {
        this._start = value;
    }

    get end(): string {
        return this._end;
    }

    set end(value: string) {
        this._end = value;
    }

    get precision(): number {
        return this._precision;
    }

    set precision(value: number) {
        this._precision = value;
    }

    get color(): string {
        return this._color;
    }

    set color(value: string) {
        this._color = value;
    }

    get sectionList(): any {
        return this._sectionList;
    }

    set sectionList(value: any) {
        this._sectionList = value;
    }

    findPoints(container: any): Point {
        let start = this._start,
            end = this._end,
            startPoint = _.filter(container.sectionList.sections, {"label": start.toString()}),
            endPoint = _.filter(container.sectionList.sections, {"label": end.toString()});
        let point = new Point(startPoint[0].x_axis, endPoint[0].x_axis, startPoint[0].y_axis, endPoint[0].y_axis, this._color);
        return point;
    }

    buildGroup(container: any) {
        let sectionList: any = container.sectionList;
        let sectionAr: Section[] = [];
        let sections = this.sections;
        let line = this;
        let color = this.checkLineColor(container.pageFilteredPTList, line.start, line.end, line.color);

        $.each(sectionList.sections, function () {
            let o: any = $(this)[0];
            if (container.template == 'tlp' || color == '#E8E8EE' || (o.page >= container.startPage && o.page <= container.endPage) || o.stroke == '#E8E8EE') {
                let section: Section = new Section(o.label, o.fontSize, o.precision, o.x_axis, o.y_axis, o.ger, o.ogd, o.pmc, o.str)
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
    public checkLineColor(sections: number[], startValue: string, endValue: string, color: string) {
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

        return finalColor
    }
}