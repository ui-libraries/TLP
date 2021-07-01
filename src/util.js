import * as _ from "lodash"
import * as JsDiff from "diff"
import { Section } from "./section"
import { PTSection } from "./pt-section"
export var Utility
;(function (Utility) {
    class Utils {
        constructor() {}
        setup() {
            //populate the ptSectionAr array
            let ptSectionAr = []
            $.each(this.container.ref.ptSectionsJson.sections, function () {
                let o = $(this)[0]
                let ptSection = new PTSection(
                    o.label,
                    o.page,
                    o.tlp,
                    o.pmc,
                    o.ger,
                    o.str
                )
                ptSectionAr.push(ptSection)
            })
            this._ptSectionAr = ptSectionAr
        }
        //find the tlp sections that correspond to the pt label
        ptToTlp(textLabel) {
            let ptsec, sectionNum
            ptsec = _.find(
                this.container.ref.ptSectionsJson.sections,
                function (obj) {
                    return obj.label == textLabel
                }
            )
            sectionNum = ptsec.tlp
            return sectionNum
        }
        // create an HTML fragment of color-coded text differences between a specified PT number and its corresponding TLP section
        findDiff(textLabel, lang) {
            let sectionNum = this.ptToTlp(textLabel),
                sectionContent = this.createHTML(textLabel),
                sectionText = $(sectionContent)
                    .find("." + lang)
                    .text(),
                diff,
                fragment = $('<div class="diff"></div>')
            for (let i = 0; i < sectionNum.length; i++) {
                this.container.ref.sectionsJson.sections.forEach(function (d) {
                    let sec = new Section(
                        d.label,
                        d.fontSize,
                        d.precision,
                        d.x_axis,
                        d.y_axis,
                        d.ger,
                        d.ogd,
                        d.pmc,
                        d.str
                    )
                    if (d.label == sectionNum[i]) {
                        let result = sec.getTextForSelectedVersion(lang)
                        result = result.replace(/<\/?[^>]+(>|$)/g, "")
                        sectionText = sectionText.replace(/<\/?[^>]+(>|$)/g, "")
                        diff = JsDiff.diffWords(result, sectionText)
                        diff.forEach(function (part) {
                            // blue for additions, red for deletions
                            // grey for common parts
                            let color = part.added
                                ? "red"
                                : part.removed
                                ? "blue"
                                : "grey"
                            let span = document.createElement("span")
                            span.style.color = color
                            span.appendChild(
                                document.createTextNode(part.value)
                            )
                            $(fragment).append(span)
                        })
                        $(fragment).append("</br/><br/>")
                    }
                })
            }
            return fragment
        }
        createHTML(textLabel) {
            let ptsec = _.find(this._ptSectionAr, function (obj) {
                return obj.label.toString() == textLabel
            })
            let html = `<div class="sections"><div class="pnum" id="p${ptsec.label}">${ptsec.label}</div>
            <div class="ger">${ptsec.ger}</div>
            <div class="pmc">${ptsec.pmc}</div></div>;
            <div class="str">${ptsec.str}</div></div>`
            return html
        }
        get ptSectionAr() {
            return this._ptSectionAr
        }
        set ptSectionAr(value) {
            this._ptSectionAr = value
        }
        get container() {
            return this._container
        }
        set container(value) {
            this._container = value
        }
    }
    Utility.Utils = Utils
})(Utility || (Utility = {}))
