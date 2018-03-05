"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var Section = /** @class */ (function () {
    function Section(label, fontSize, precision, x_axis, y_axis, ger, ogd, pmc) {
        this.label = label;
        this.fontSize = fontSize;
        this.precision = precision;
        this.x_axis = x_axis;
        this.y_axis = y_axis;
        this.ger = ger;
        this.ogd = ogd;
        this.pmc = pmc;
    }
    Section.prototype.getTextForSelectedVersion = function (version) {
        var v;
        if (version == "ger") {
            v = this.ger;
        }
        else if (version == "ogd") {
            v = this.ogd;
        }
        else if (version == "pmc") {
            v = this.pmc;
        }
        return v;
    };
    Section.prototype.displayText = function (showSelector, version, divCounter, template, util) {
        var div = "collapse" + divCounter;
        //create a new div and append to accordion div
        var element = $('<div class="panel panel-default">' +
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
            element.addClass("individual-section");
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
    };
    // if the circle is in the current start and end range, use its original color. If not, make it grey
    Section.prototype.checkCircleColor = function (sections, startValue, color) {
        var startVal = Number(startValue);
        var resultStart = _.includes(sections, startVal);
        if (resultStart === true) {
            return color;
        }
        else {
            return '#E8E8EE';
        }
    };
    return Section;
}());
exports.Section = Section;
//# sourceMappingURL=Section.js.map