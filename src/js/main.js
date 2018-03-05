var gap = 50;
var lineGroup = [];
var divCounter = 0; //append to div name to create unique ids every time
var mouseLoc = 0;

// load the language version from local storage
var version = localStorage.getItem('language');

// make german the default if no language is set
if (version === null) {
    version = 'ger';
    localStorage.setItem('language', version);
}

var width = $("#map").width();
var height = $(window).height();

var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "tractatus-map");

/* Define the data for the circles */
var elem = svg.selectAll("g")
    .data(sections);

/* Define the data for the lines */
var elemLine = svg.selectAll("g")
    .data(lines);

var elemLineEnter = elemLine.enter()
    .append("g");

/*Create and place the "blocks" containing the circle and the text */
var elemEnter = elem.enter()
    .append("g");

var line = elemLineEnter.append("line")
    .attr("x1", function (d) {var point = findPoints(d); return point.x1 * gap; }) //x_axis of 1st section + radius/2 ?
    .attr("y1", function (d) {var point = findPoints(d); return point.y1 * gap; }) //y_axis of 1st section
    .attr("x2", function (d) {var point = findPoints(d); return point.x2 * gap; }) //x_axis of 2nd section
    .attr("y2", function (d) {var point = findPoints(d); return point.y2 * gap; }) //y_axis of 2nd section
    .attr("stroke-width", 20)   //double radius?
    .attr("stroke", function (d) {return d.color; })
    .on("click", buildGroup);

/*Create the circle for each block */
var circle = elemEnter.append("circle")
    .attr("cx", function (d) { return d.x_axis * gap; })
    .attr("cy", function (d) { return d.y_axis * gap; })
    .attr("r", 15)
    .attr("stroke","black")
    .attr("fill", "white")
    .attr("stroke-width", 4)
    .on("click", showSection);

/* Create the text for each block */
elemEnter.append("text")
    .attr("dx", function (d) {return d.x_axis * gap + 15; })
    .attr("dy", function(d){return d.y_axis * gap - 15; })
    .attr("font-size", function (d) {return d.size})
    .text(function (d) {return d.label});

function findSection(section, version) {
    var sectionNum = '',
        sectionDiv,
        splitSection;

    //jquery doesn't want a period in the selector since it could be a class, so we have to escape it
    //find out if section has a decimal point
    if (sectionNum.indexOf('.') !== -1) {
        splitSection = sectionLabel.split('.');
        sectionDiv = 'tractatus.html .sections:has("#p' + splitSection[0] + '\\.' + splitSection[1] + '")';
    } else {
        sectionDiv = 'tractatus.html .sections:has("#p' + sectionNum + '")';
    }

    var div = "#dialog" + divCounter;

    $(div).dialog({
        modal: false,
        draggable: true,
        resizable: true,
        close: closeFunction,
        position: {
            my: "left top",
            at: "left top",
            of: mouseLoc,
            within: $("body")
        },
        height: 500,
        width: 400,
        dialogClass: 'ui-dialog-osx',
    });

    console.log("version1: " + version);
    console.log("version: " + section.version);
    //append each section to section-text list
    $(div).append($('<li><div>' + section.version));
    MathJax.Hub.Queue(["Typeset", MathJax.Hub,div]);
}

function addDropdown(div) {
    $(div).append($('<div>').load('lang-version.html'));
}

function findPoints(d) {
    var points = {},
        start = d.start,
        end = d.end,
        startPoint = _.filter(sections, {"label": start}),
        endPoint = _.filter(sections, {"label": end});

    points.x1 = startPoint[0].x_axis;
    points.x2 = endPoint[0].x_axis;
    points.y1 = startPoint[0].y_axis;
    points.y2 = endPoint[0].y_axis;
    points.color = d.color;

    return points;
}

function showSection(d) {

    var label = d.label;

    //create a unique id for each new dialog div
    divCounter += 1;
    var div = "dialog" + divCounter;

    //create a new div and append to dialog div
    $('<div>', {
        "id": div,
        "title": 'Oh Hello there!!!',
        "class": 'dialog',
    }).appendTo('#dialog');

    version = localStorage.getItem('language');

    //put it all in the callback, of course
    $('#'+div).append($('<div>').load('lang-version.html', function() {
        version = localStorage.getItem('language');
        $('.selectChange').val(version.substring(1));
    }));

    //$('#'+div).append($('<div>').load('lang-version.html'));  

    console.log("the version: " + version);
    findSection(d, version);
}

function closeFunction(e) {
    //console.log(e.target.id);
}

function buildGroup(d) {
    var start = d.start,
        end = d.end,
        precision,
        sectionList = [],
        range = [],
        i,
        j,
        n,
        preciseList = [];

    if (d.actualStart !== undefined) {
        start = d.actualStart
    }

    if (d.actualEnd !== undefined) {
        end = d.actualEnd
    }

    precision = d.precision;

    //find all objects with label values between start value and end value
    sectionList.push(_.filter(sections, function (o) { return o.label <= end && o.label >= start; }));
    _.forEach(sectionList, function (a) {
        _.forEach(a, function (b) {
            range.push(b.precision);
        });
    });

    preciseList.push(start);

    lineGroup = _.cloneDeep(preciseList);

    //add section to list if it has the same precision as end
    for (i = 0; i < range.length; i += 1) {
        if (range[i] === precision) {
            preciseList.push(range[i]);
        }
    }

    //remove the duplicate
    if (preciseList[0] == preciseList[1]) {
        preciseList.shift();
    }

    //create a unique id for each new dialog div
    divCounter += 1;
    var div = "dialog" + divCounter;

    //create a new div and append to dialog div
    $('<div>', {
        "id": div,
        "title": 'Tractatus Logico-Philosophicus',
        "class": 'dialog',
    }).appendTo('#dialog');

    version = localStorage.getItem('language');

    $('#'+div).append($('<div>').load('lang-version.html', function() {
        version = localStorage.getItem('language');
        $('.selectChange').val(version.substring(1));
    }));

    //$('#'+div).append($('<div>').load('lang-version.html'));

    //loop through final list and display each section text
    for (j = 0; j < preciseList.length; j += 1) {
        findSection(preciseList[j], version);
    }
}

//switches the language when language dropdown is changed
$(document).on('change', ".selectChange", function () {
    var divID = '#' + $(this).parent()[0].offsetParent.id;
    var lang = this.value;
    if (!_.includes(lang, '.')) {
        lang = '.' + this.value;
    }

    //console.log("switcher")
    localStorage.setItem('language', lang);
    $(divID).find('.ger, .pmc, .ogd').hide();
    $(divID).find(lang).show();

});

$( document ).on( "mousemove", function( event ) {
    mouseLoc = event
});