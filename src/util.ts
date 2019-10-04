///<reference path="reference.ts"/>
import _ = require('lodash');
import JsDiff = require('diff');
import {Section} from "./Section";
import {PTSection} from "./PTSection";
import {tractatus} from "./app";
import Container = tractatus.Container;

export module Utility {
    export class Utils {
        constructor(){}
        _ptSectionAr:any[];
        private _container:Container;
        public setup() {
            //populate the ptSectionAr array
            var ptSectionAr: PTSection[] = [];
            $.each(this.container.ref.ptSectionsJson.sections, function () {
                var o: any = $(this)[0];
                var ptSection: PTSection = new PTSection(o.label, o.page, o.tlp, o.pmc, o.ger, o.str)
                ptSectionAr.push(ptSection);
            })
            this._ptSectionAr = ptSectionAr;
        }

        //find the tlp sections that correspond to the pt label
        public ptToTlp(textLabel: string) {
            var ptsec,
                sectionNum;
            ptsec = _.find(this.container.ref.ptSectionsJson.sections, function (obj) {
                return obj.label == textLabel;
            });
            sectionNum = ptsec.tlp;
            return sectionNum;
        }

        // create an HTML fragment of color-coded text differences between a specified PT number and its corresponding TLP section
        public findDiff(textLabel: string, lang: string) {
            var sectionNum = this.ptToTlp(textLabel),
                sectionContent = this.createHTML(textLabel),
                sectionText: string = $(sectionContent).find("." + lang).text(),
                diff,
                fragment = $('<div class="diff"></div>');

            for (var i = 0; i < sectionNum.length; i++) {
                this.container.ref.sectionsJson.sections.forEach(function (d: Section) {
                    var sec: Section = new Section(d.label, d.fontSize, d.precision, d.x_axis, d.y_axis, d.ger, d.ogd, d.pmc, d.str);
                    if (d.label == sectionNum[i]) {
                        var result = sec.getTextForSelectedVersion(lang);
                        result = result.replace(/<\/?[^>]+(>|$)/g, "");
                        sectionText = sectionText.replace(/<\/?[^>]+(>|$)/g, "");
                        diff = JsDiff.diffWords(result, sectionText);
                        diff.forEach(function (part) {
                            // blue for additions, red for deletions
                            // grey for common parts
                            var color = part.added ? 'red' :
                                part.removed ? 'blue' : 'grey';
                            var span = document.createElement('span');
                            span.style.color = color;
                            span.appendChild(document
                                .createTextNode(part.value));
                            $(fragment).append(span);
                        });
                        $(fragment).append("</br/><br/>");
                    }
                })
            }
            return fragment;
        }

        public createHTML(textLabel: string) {
            var ptsec: PTSection = _.find(this._ptSectionAr, function (obj: PTSection) {
                return obj.label.toString() == textLabel;
            });

            var html = `<div class="sections"><div class="pnum" id="p${ptsec.label}">${ptsec.label}</div>
            <div class="ger">${ptsec.ger}</div>
            <div class="pmc">${ptsec.pmc}</div></div>;
            <div class="str">${ptsec.str}</div></div>`;
            return html;
        }


        get ptSectionAr(): any[] {
            return this._ptSectionAr;
        }

        set ptSectionAr(value: any[]) {
            this._ptSectionAr = value;
        }


        get container(): tractatus.Container {
            return this._container;
        }

        set container(value: tractatus.Container) {
            this._container = value;
        }
    }

}