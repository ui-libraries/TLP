import {Utility} from "./util";
import Utils = Utility.Utils;
import {ISection} from "./ISection";
import _ = require('lodash');
declare var MathJax:any;

export class Section implements ISection{
    label: string;
    fontSize: string;
    precision: number;
    x_axis: number;
    y_axis: number;
    ger: string;
    ogd: string;
    pmc: string;

    constructor(label: string, fontSize: string, precision: number, x_axis: number, y_axis: number, ger: string, ogd: string, pmc: string) {
        this.label = label;
        this.fontSize = fontSize;
        this.precision = precision;
        this.x_axis = x_axis;
        this.y_axis = y_axis;
        this.ger = ger;
        this.ogd = ogd;
        this.pmc = pmc;
    }

    getTextForSelectedVersion(version: string) {
        var v;
        if (version == "ger") {
            v = this.ger;
        } else if (version == "ogd") {
            v = this.ogd;
        } else if (version == "pmc") {
            v = this.pmc;
        }
        return v;
    }

    public displayText(showSelector: boolean, version:string, divCounter: number, template:string, util:Utils) {
        var div = "collapse" + divCounter;

        //create a new div and append to accordion div
        var element: any = $('<div class="panel panel-default">' +
            '<div class="panel-heading" data-toggle="collapse" href="#' + div + '" class="accordion-toggle" >' +
            '<h4 class="panel-title">' +
            '<a class="accordion-header">' +
            'Section ' + this.label + '<span class="glyphicon glyphicon-remove close-panel" style="float:right"></span></a>' +
            '</h4>' +
            '</div>' +
            '<div id="' + div + '" class="panel-collapse collapse in"><div class="panel-body" value="' + this.label + '"></div>').appendTo('#accordion');

        var text = this.getTextForSelectedVersion(version);

        //showSelector will be true when an individual Section/Circle is clicked.  Will be false when a line is clicked.
        if (showSelector) {
            //append the language selector
            var langVersion = template == "pt" ? 'pt-lang-version.html' : 'lang-version.html';
            $('#' + div + ' .panel-body').append($('<div>').load(langVersion, function () {
                $('.version-selector').val(version);
            }));
            element.addClass("individual-section")
        }

        $('#' + div + ' .panel-body').attr('ger', this.getTextForSelectedVersion('ger'));
        $('#' + div + ' .panel-body').attr('ogd', this.getTextForSelectedVersion('ogd'));
        $('#' + div + ' .panel-body').attr('pmc', this.getTextForSelectedVersion('pmc'));

        $('#' + div + ' .panel-body').append($('<li class="text-display-li">' + text + '</li>').load(text, function () {
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, div]);
        }));

        $(".accordion-column").show();
        //the Collapseable panels will now show, and the tractatus map will move over to the right.
        $(".map-column").removeClass('col-md-12').addClass('col-md-9');

        //check if page is pt
        if (template == 'pt') {
            var label = this.label;
            var textLabel = label.toString();
            var returnVal = util.findDiff(textLabel, version);
            $('#' + div).append('<br /><div class="pnum">text difference when compared to TLP ' + util.ptToTlp(textLabel) + '</div>');
            $('#' + div).append(returnVal);
        }

        return divCounter + 1;
    }

    // if the circle is in the current start and end range, use its original color. If not, make it grey
    public checkCircleColor(sections: number[], startValue: any, color: any) {
        var startVal = Number(startValue);
        var resultStart = _.includes(sections, startVal);

        if (resultStart === true) {
            return color;
        } else {
            return '#E8E8EE';
        }
    }
}