//PTSection and Section both implement this.  ogd is optional for now (PTSection currently does not support OGD)
export interface ISection {
    label: string;
    fontSize: string;
    precision: number;
    x_axis: number;
    y_axis: number;
    pmc: string;
    ger: string;
    ogd?: string;
    str: string;
}