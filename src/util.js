"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="reference.ts"/>
var _ = require("lodash");
var JsDiff = require("diff");
var Section_1 = require("./Section");
var PTSection_1 = require("./PTSection");
var Utility;
(function (Utility) {
    var Utils = /** @class */ (function () {
        function Utils() {
        }
        Utils.prototype.setup = function () {
            //populate the ptSectionAr array
            var ptSectionAr = [];
            $.each(this.container.ref.ptSectionsJson.sections, function () {
                var o = $(this)[0];
                var ptSection = new PTSection_1.PTSection(o.label, o.page, o.tlp, o.pmc, o.ger);
                ptSectionAr.push(ptSection);
            });
            this._ptSectionAr = ptSectionAr;
        };
        //find the tlp sections that correspond to the pt label
        Utils.prototype.ptToTlp = function (textLabel) {
            var ptsec, sectionNum;
            ptsec = _.find(this.container.ref.ptSectionsJson.sections, function (obj) {
                return obj.label == textLabel;
            });
            sectionNum = ptsec.tlp;
            return sectionNum;
        };
        // create an HTML fragment of color-coded text differences between a specified PT number and its corresponding TLP section
        Utils.prototype.findDiff = function (textLabel, lang) {
            var sectionNum = this.ptToTlp(textLabel), sectionContent = this.createHTML(textLabel), sectionText = $(sectionContent).find("." + lang).text(), diff, fragment = $('<div class="diff"></div>');
            for (var i = 0; i < sectionNum.length; i++) {
                this.container.ref.sectionsJson.sections.forEach(function (d) {
                    var sec = new Section_1.Section(d.label, d.fontSize, d.precision, d.x_axis, d.y_axis, d.ger, d.ogd, d.pmc);
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
                });
            }
            return fragment;
        };
        Utils.prototype.createHTML = function (textLabel) {
            var ptsec = _.find(this._ptSectionAr, function (obj) {
                return obj.label.toString() == textLabel;
            });
            var html = "<div class=\"sections\"><div class=\"pnum\" id=\"p" + ptsec.label + "\">" + ptsec.label + "</div>\n            <div class=\"ger\">" + ptsec.ger + "</div>\n            <div class=\"pmc\">" + ptsec.pmc + "</div></div>";
            return html;
        };
        Object.defineProperty(Utils.prototype, "ptSectionAr", {
            get: function () {
                return this._ptSectionAr;
            },
            set: function (value) {
                this._ptSectionAr = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Utils.prototype, "container", {
            get: function () {
                return this._container;
            },
            set: function (value) {
                this._container = value;
            },
            enumerable: true,
            configurable: true
        });
        return Utils;
    }());
    Utility.Utils = Utils;
})(Utility = exports.Utility || (exports.Utility = {}));
