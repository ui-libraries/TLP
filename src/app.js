/*
this is the main entry point for the application
relevant classes are broken out into other files such as Section.ts, PTSection.ts, ISection.ts, util.ts, etc

The code relies on a specific data structure in ptSectionsJson.json, sectionsJson.json, linesJson.json and ptLinesJson.json files

psSectionsJson.json must look like this example...
    {"sections":[ {"label": "1", "precision": 0, "fontSize": "90px", "y_axis": 1, "x_axis": 1, "ger": "Test German", "ogd": "Test OGD", "pmc": "Test PMC"}, ... ]}
ptLinesJson.json must look like this example...
    {"lines" : [{"label": "1", "sections": [1,1.1,1.2], "start": "1", "end": "1.2", "precision": 1, "color": "#bf4f4e"}, ...]}
sectionsJson.json must look like this example...
    {"sections":[{ "label": "2.01", "precision": 2, "fontSize":"40px", "y_axis": 3, "x_axis": 11, "ger": "Test German", "ogd": "Test OGD", "pmc": "Test PMC"}, ... ]}
linesJson.json must look like this example...
    {"lines" : [{"label": "1.1", "sections": [1.1,1.11,1.12,1.13], "start": "1.1", "end": "1.13", "precision": 2, "color": "#f6944c"}, ... ]}
*/
import * as JsDiff from 'diff';
import * as _ from 'lodash';
import { Reference } from "./reference";
//break out separate classes for clarity
import { Utility } from "./util";
import { Section } from "./Section";
import { Line } from "./Line";
let sectionsJson = require('./js/sectionsJson.json');
let ptSectionsJson = require('./js/ptSectionsJson.json');
let linesJson = require('./js/linesJson.json');
let ptLinesJson = require('./js/ptLinesJson.json');
export var tractatus;
(function (tractatus) {
    class Container {
        constructor() {
            //version = ger, pmc, ogd
            this._version = 'ger';
            this._gap = 50;
            this._width = $("#map").width(); //doesn't work yet
            this._height = $(window).height();
            this._divCounter = 0;
            this._startPage = 0;
            this._endPage = 0;
            //template = either pt or tlp.  introduced to avoid the need for maintaining separate code bases for each
            this._template = 'tlp';
            this.diffWords = (result, sectionText) => {
                return JsDiff.diffWords(result, sectionText);
            };
        }
        get version() {
            if (localStorage.getItem('version') != null) {
                return localStorage.getItem('version');
            }
            return this._version;
        }
        set version(version) {
            this._version = version;
            localStorage.setItem("version", version);
        }
        get gap() {
            return this._gap;
        }
        set gap(gap) {
            this._gap = gap;
        }
        get width() {
            return this._width;
        }
        set width(width) {
            this._width = width;
        }
        get height() {
            return this._height;
        }
        set height(height) {
            this._height = height;
        }
        get divCounter() {
            return this._divCounter;
        }
        set divCounter(divCounter) {
            this._divCounter = divCounter;
        }
        get startPage() {
            if (localStorage.getItem('startPage') != null) {
                return parseInt(localStorage.getItem('startPage'));
            }
            return this._startPage;
        }
        set startPage(startPage) {
            this._startPage = startPage;
            localStorage.setItem("startPage", startPage.toString());
        }
        get endPage() {
            if (localStorage.getItem('endPage') != null) {
                return parseInt(localStorage.getItem('endPage'));
            }
            return this._endPage;
        }
        set endPage(endPage) {
            this._endPage = endPage;
            localStorage.setItem("endPage", endPage.toString());
        }
        get template() {
            if (localStorage.getItem('template') != null) {
                return localStorage.getItem('template');
            }
            return this._template;
        }
        set template(template) {
            this._template = template;
            localStorage.setItem('template', template);
        }
        get sectionList() {
            return this._sectionList;
        }
        set sectionList(sectionList) {
            this._sectionList = sectionList;
        }
        get lineList() {
            return this._lineList;
        }
        set lineList(lineList) {
            this._lineList = lineList;
        }
        get pageFilteredPTList() {
            return this._pageFilteredPTList;
        }
        set pageFilteredPTList(value) {
            this._pageFilteredPTList = value;
        }
        get util() {
            return this._util;
        }
        set util(value) {
            this._util = value;
        }
        get ref() {
            return this._ref;
        }
        set ref(value) {
            this._ref = value;
        }
        setupAccordionSidePanel() {
            let container = this;
            let version = container.version;
            $(".accordion-column").hide();
            //hide the page selector unless PT is selected
            $("#page-select-form").hide();
            $("#accordion").collapse().sortable();
            $('#version-selector-all').val(version);
            $("#reset-btn").on('click', function () {
                window.location.reload();
            });
            //choose which template to use (PT or TLP)
            $("#pt-btn").on('click', function () {
                if ($(this).val() == "Load Tractatus") {
                    localStorage.setItem('template', 'tlp');
                    container.template == "tlp";
                }
                else {
                    localStorage.setItem('template', 'pt');
                    container.template == "pt";
                }
                window.location.reload();
            });
            //show the page selector if PT is selected
            if (container.template == "pt") {
                //localStorage.setItem('version', "ger");
                $("#pt-btn").html("Load Tractatus").val("Load Tractatus");
                $("option[value='ogd']").remove();
                $("#page-select-form").show();
            }
            else {
                $("#pt-btn").html("Load Prototractatus").val("Load Prototractatus");
            }
            /*
             Leaving for now.  May want something like this in the future.
            $(document).on('click', '#scroll-to-top', function () {
                window.scrollTo(0, 0);
            })*/
            //close panels.  if it's the last one, hide the panel column
            $(".panel-group").on('click', '.close-panel', function () {
                $('.panel-group').find($(this).parents('.panel-default:first')).remove();
                $.when($(this).parents('.panel-default:first').remove()).then(function () {
                    if ($(".panel-default").length <= 0) {
                        $(".accordion-column").hide();
                    }
                });
            });
            $("#collapse-all-btn").on('click', function () {
                $(".panel-collapse").collapse('hide');
            });
            $("#expand-all-btn").on('click', function () {
                $(".panel-collapse").collapse('show');
            });
            $("#close-all-btn").on('click', function () {
                $(".panel-default").remove();
                $(".accordion-column").hide();
            });
            /*Note: An overall version selector becomes available when clicking a line which displays multiple panels (one for each section in the line)
                  If an individual circle/Section is clicked, a panel will display and will have it's own version selector.  This is so that you can
                  compare text for the same section.*/
            //change versions in the overall version selector (not the individual panel version selectors)
            $(".accordion-column").on('change', "#version-selector-all", function () {
                let selector = $(this);
                let version = $("option:selected", selector).attr('value');
                let u = container.util;
                $('.panel-body').each(function () {
                    let panelBody = $(this);
                    let sectionNum = panelBody.attr("value");
                    if ($(".version-selector", panelBody).length <= 0) {
                        let parentDivId = panelBody.parents('div:first').attr('id');
                        let text = panelBody.attr(version);
                        $(".text-display-li", panelBody).html(text);
                        $("li", panelBody).remove();
                        panelBody.append($('<li class="text-display-li">' + text + '</li>')).load(text, function () {
                            MathJax.Hub.Queue(["Typeset", MathJax.Hub, parentDivId]);
                        });
                        //check if page is pt
                        if (container.template == 'pt') {
                            let parent = panelBody.parents(".panel-collapse:first");
                            $(".pnum", parent).remove();
                            $(".diff", parent).remove();
                            let returnVal = u.findDiff(sectionNum, version);
                            parent.append('<div class="pnum">text difference when compared to TLP ' + u.ptToTlp(sectionNum) + '</div>');
                            parent.append(returnVal);
                        }
                    }
                });
                localStorage.setItem('version', version);
            });
            //change versions in the individual panel version selectors (not the overall panel version selector)
            $('.accordion-column').on('change', ".version-selector", function () {
                let $this = $(this);
                let panelBody = $this.parents('.panel-body');
                let sectionNum = panelBody.attr("value");
                let parentDivId = panelBody.parents('div:first').attr('id');
                let v = $("option:selected", $this).attr('value');
                let text = panelBody.attr(v);
                let u = container.util;
                $this.closest($(".text-display-li")).html(text);
                $("li", panelBody).remove();
                panelBody.append($('<li class="text-display-li">' + text + '</li>')).load(text, function () {
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub, parentDivId]);
                });
                //check if page is pt
                if (container.template == 'pt') {
                    let parent = panelBody.parents(".panel-collapse:first");
                    $(".pnum", parent).remove();
                    $(".diff", parent).remove();
                    let returnVal = u.findDiff(sectionNum, v);
                    parent.append('<div class="pnum">text difference when compared to TLP ' + u.ptToTlp(sectionNum) + '</div>');
                    parent.append(returnVal);
                }
                localStorage.setItem('version', v);
            });
        }
        //filter sections based on pages entered (PT only)
        setupPTPaging() {
            let container = this;
            $('#start-page').val(container.startPage);
            $('#end-page').val(container.endPage);
            let sectionList = container.sectionList;
            let pageFilteredPTList = [];
            // when the page form submit button is clicked, set the start and end page values based on text box values
            $('#page-submit').click(function () {
                container.startPage = parseInt($('#start-page').val().toString());
                container.endPage = parseInt($('#end-page').val().toString());
            });
            // add all object in the sectionList that fall between start and end page numbers.
            _.forEach(sectionList.sections, function (value, key) {
                if (value.page >= container.startPage && value.page <= container.endPage) {
                    pageFilteredPTList.push(parseFloat(value.label));
                }
                ;
            });
            container.pageFilteredPTList = pageFilteredPTList;
        }
        setupD3() {
            let container = this;
            let gap = container.gap;
            let width = $("#map").width();
            let height = container.height;
            let sectionAr = [];
            let lineAr = [];
            let sectionList = container.sectionList;
            let lineList = container.lineList;
            $.each(sectionList.sections, function () {
                let $this = $(this);
                let o = $(this)[0];
                let section = new Section(o.label, o.fontSize, o.precision, o.x_axis, o.y_axis, o.ger, o.ogd, o.pmc, o.str);
                sectionAr.push(section);
            });
            $.each(lineList.lines, function () {
                let l = $(this)[0];
                let i = 0;
                let sections = l.sections;
                $.each(sections, function () {
                    if ((i + 1) != sections.length) {
                        let o = sections[i];
                        let o1 = sections[i + 1];
                        let line = new Line(o, l.sections, o, o1, l.precision, l.color);
                        lineAr.push(line);
                        i++;
                    }
                });
            });
            let svg = d3.select("#map").append("svg")
                .attr("width", width)
                .attr("height", height)
                .attr("id", "tractatus-map");
            /* Define the data for the circles */
            let elem = svg.selectAll("g")
                .data(sectionAr);
            /* Define the data for the lines */
            let elemLine = svg.selectAll("g")
                .data(lineAr);
            let elemLineEnter = elemLine.enter()
                .append("g");
            /*Create and place the "blocks" containing the circle and the text */
            let elemEnter = elem.enter()
                .append("g");
            let line = elemLineEnter.append("line")
                .attr("x1", function (d) {
                let point = d.findPoints(container);
                return point.x1 * gap;
            }) //x_axis of 1st section + radius/2 ?
                .attr("y1", function (d) {
                let point = d.findPoints(container);
                return point.y1 * gap;
            }) //y_axis of 1st section
                .attr("x2", function (d) {
                let point = d.findPoints(container);
                return point.x2 * gap;
            }) //x_axis of 2nd section
                .attr("y2", function (d) {
                let point = d.findPoints(container);
                return point.y2 * gap;
            }) //y_axis of 2nd section
                .attr("stroke-width", 20) //double radius?
                .attr("stroke", function (d) {
                if (container.template == "pt") {
                    return d.checkLineColor(container.pageFilteredPTList, d.start, d.end, d.color);
                }
                return d.color;
            })
                .style("cursor", "pointer")
                .on("click", function (d) {
                d.buildGroup(container);
                //animate the border of the panels to show that something happened when you click on a section or line.  if appended to the bottom, it's
                //difficult to tell that anything happened when you click on a line/section
                $("#accordion").css({ border: '0 solid #86d0f3' }).animate({ borderWidth: 2 }, 500).animate({ borderWidth: 0 }, 500);
            });
            /*Create the circle for each block */
            let circle = elemEnter.append("circle")
                .attr("cx", function (d) {
                return d.x_axis * gap;
            })
                .attr("cy", function (d) {
                return d.y_axis * gap;
            })
                .attr("r", 15)
                .attr("stroke", function (d) {
                if (container.template == "pt") {
                    return d.checkCircleColor(container._pageFilteredPTList, d.label, 'black');
                }
                return "black";
            })
                .attr("fill", "white")
                .attr("stroke-width", 4)
                .style("cursor", "pointer")
                .on("click", function (d) {
                container.divCounter = d.displayText(true, container.version, container.divCounter, container.template, container.util);
                $("#accordion").css({ border: '0 solid #86d0f3' }).animate({ borderWidth: 2 }, 500).animate({ borderWidth: 0 }, 500);
            });
            /* Create the text for each block */
            elemEnter.append("text")
                .attr("dx", function (d) {
                return d.x_axis * gap + 15;
            })
                .attr("dy", function (d) {
                return d.y_axis * gap - 15;
            })
                .attr("font-size", function (d) {
                return d.fontSize;
            })
                .text(function (d) {
                return d.label;
            });
        }
    }
    tractatus.Container = Container;
})(tractatus || (tractatus = {}));
//initialize everything
let container = new tractatus.Container();
container.ref = new Reference.Ref();
let util = new Utility.Utils();
util.container = container;
util.setup();
container.util = util;
container.sectionList = container.template == "pt" ? ptSectionsJson : sectionsJson;
container.lineList = container.template == "pt" ? ptLinesJson : linesJson;
container.setupAccordionSidePanel();
container.setupPTPaging();
container.setupD3();
