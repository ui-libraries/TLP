var sectionDiv = '';
var splitSection = [];
var sectionNum = '';
var gap = 50;



/*var lines = 
    [
        //x1 = first x_axis, x2 = second x_axis, y1 = first y_axis, y2 = second y_axis
        {"label": "1-2", "x1": 1, "x2": 13, "y1": 31, "y2": 31, "color": "yellow"},
        {"label": "1-1.2", "x1": 1, "x2": 1, "y1": 31, "y2": 35, "color": "#cc3300"},
        {"label": "1.1-1.13", "x1": 1, "x2": 7, "y1": 33, "y2": 33, "color": "#ff794d"},
        {"label": "1.2-1.21", "x1": 1, "x2": 3, "y1": 35, "y2": 35, "color": "#ff794d"},
    ];*/



var content = 
    [
        {"label": "", "ger": "", "ogd": "", "pmc": ""},
        {"label": "1", "ger": "Die Welt ist alles, was der Fall ist.", "ogd": "The world is everything that is the case.", "pmc": "The world is all that is the case."},        
        {"label": "1.1", "ger": "Die Welt ist die Gesamtheit der Tatsachen, nicht der Dinge.", "ogd": "The world is the totality of facts, not of things.", "pmc": "The world is the totality of facts, not of things."},
        {"label": "1.11", "ger": "Die Welt ist durch die Tatsachen bestimmt und dadurch, dass es alle Tatsachen sind.", "ogd": "The world is determined by the facts, and by these being all the facts.", "pmc": "The world is determined by the facts, and by their being all the facts."},
        {"label": "1.12", "ger": "Denn, die Gesamtheit der Tatsachen bestimmt, was der Fall ist und auch, was alles nicht der Fall ist.", "ogd": "For the totality of facts determines both what is the case, and also all that is not the case.", "pmc": "For the totality of facts determines what is the case, and also whatever is not the case."},
        {"label": "1.13", "ger": "Die Tatsachen im logischen Raum sind die Welt.", "ogd": "The facts in logical space are the world.", "pmc": "The facts in logical space are the world."},
        {"label": "1.2", "ger": "Die Welt zerfällt in Tatsachen.", "ogd": "The world divides into facts.", "pmc": "The world divides into facts."},
        {"label": "1.21", "ger": "Eines kann der Fall sein oder nicht der Fall sein und alles übrige gleich bleiben.", "ogd": "Any one can either be the case or not be the case, and everything else remain the same.", "pmc": "Each item can be the case or not the case while everything else remains the same."},
        {"label": "2", "ger": "Was der Fall ist, die Tatsache, ist das Bestehen von Sachverhalten.", "ogd": "What is the case, the fact, is the existence of atomic facts.", "pmc": "What is the case—a fact—is the existence of states of affairs."}    
        
    ];

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
    sectionNum = section;
    
    //jquery doesn't want a period in the selector since it could be a class, so we have to escape it
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
    //var sectionText = _.filter(content, {"label": label} );
    //$("#section-text").html(sectionText[0].label + " " + sectionText[0].ogd);
    //console.log(sectionText[0].ogd);
}

function buildGroup(d) {
    console.log(d);
}

