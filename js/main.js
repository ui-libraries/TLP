var sectionDiv = '';
var splitSection = [];
var gap = 50;


var width = $("#map").width();
//var width = 1000;
var height = $(window).height();
//var height = 1000;

var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "tractatus-map");

/* Define the data for the circles */
var elem = svg.selectAll("g")
    .data(sections);

var elemLine = svg.selectAll("g")
    .data(lines);

var elemLineEnter = elemLine.enter()
    .append("g");

/*Create and place the "blocks" containing the circle and the text */  
var elemEnter = elem.enter()
    .append("g");

function precision(a) {
    //convert to string and count the length after the decimal point
    var precision = (a + "").split(".")[1].length;
    return precision;
}

function findSection(section, lang) {
    var sectionNum = '';
    sectionNum = section;
    
    //jquery doesn't want a period in the selector since it could be a class, so we have to escape it
    //find out if section has a decimal point
    if (sectionNum.indexOf('.') !== -1) {
        splitSection = sectionNum.split('.');
        sectionDiv = 'tractatus.html .sections:has("#p' + splitSection[0] + '\\.' + splitSection[1] + '")';
    } else {
        sectionDiv = 'tractatus.html .sections:has("#p' + sectionNum + '")';
    }

    $('#section-text').load(sectionDiv, function () {
        $('.ger, .pmc, .ogd').hide();
        $(lang).show();
    });
}

function findPoints (d) {
    var points = {};
    var start = d.start;
    var end = d.end;    
    var startPoint = _.filter(sections, {"label": start});
    var endPoint = _.filter(sections, {"label": end});
    points.x1 = startPoint[0].x_axis;
    points.x2 = endPoint[0].x_axis;
    points.y1 = startPoint[0].y_axis;
    points.y2 = endPoint[0].y_axis;
    points.color = d.color;
    
    return points;
}

var rect = elemLineEnter.append("line")
    .attr("x1", function (d) {var point = findPoints(d); return point.x1 * gap;}) //x_axis of 1st section + radius/2 ?
    .attr("y1", function (d) {var point = findPoints(d); return point.y1* gap;}) //y_axis of 1st section
    .attr("x2", function (d) {var point = findPoints(d); return point.x2 * gap;}) //x_axis of 2nd section
    .attr("y2", function (d) {var point = findPoints(d); return point.y2 * gap;}) //y_axis of 2nd section
    .attr("stroke-width", 20)   //double radius?
    .attr("stroke", function (d) {return d.color;})
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
    .attr("dx", function(d){return d.x_axis * gap + 18})
    .attr("dy", function(d){return d.y_axis * gap + 5})
    .attr("font-size","16px")
    .text(function(d){return d.label});

    
function showSection (d) {    
    var label = d.label;
    findSection(label, ".ogd");
}

function buildGroup(d) {
    console.log(d);
}

