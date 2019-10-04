import {ISection} from "./ISection";
export class PTSection implements ISection {
    label: string;
    fontSize: string;
    precision: number;
    x_axis: number;
    y_axis: number;
    page: number;
    tlp: string[];
    pmc: string;
    ger: string;
    str: string;

    constructor(label: string, page: number, tlp: string[], pmc: string, ger: string, str: string) {
        this.label = label;
        this.page = page;
        this.tlp = tlp;
        this.pmc = pmc;
        this.ger = ger;
        this.str = str;

    }
}