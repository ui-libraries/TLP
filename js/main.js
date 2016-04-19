var sections = 
    [
        { "label": "1", "x_axis": 20, "y_axis": 20, "radius": 10},
        { "label": "1.1", "x_axis": 20, "y_axis": 70, "radius": 10},
        { "label": "1.11", "x_axis": 120, "y_axis": 70, "radius": 10},
        { "label": "1.12", "x_axis": 220, "y_axis": 70, "radius": 10},
        { "label": "1.13", "x_axis": 320, "y_axis": 70, "radius": 10},
        { "label": "1.2", "x_axis": 20, "y_axis": 120, "radius": 10},
        { "label": "1.21", "x_axis": 120, "y_axis": 120, "radius": 10},
        { "label": "2", "x_axis": 600, "y_axis": 20, "radius": 10}
    ];

var lines = 
    [
        {"label": "1-2", "x1": 25, "x2": 600, "y1": 20, "y2": 20, "color": "yellow"},
        {"label": "1-1.2", "x1": 20, "x2": 20, "y1": 20, "y2": 120, "color": "#cc3300"},
        {"label": "1.1-1.13", "x1": 25, "x2": 320, "y1": 70, "y2": 70, "color": "#ff794d"},
        {"label": "1.2-1.21", "x1": 25, "x2": 120, "y1": 120, "y2": 120, "color": "#ff794d"},
    ];

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

var rect = elemLineEnter.append("line")
    .attr("x1", function (d) {return d.x1;}) //x_axis of 1st section + radius/2 ?
    .attr("y1", function (d) {return d.y1;}) //y_axis of 1st section
    .attr("x2", function (d) {return d.x2;}) //x_axis of 2nd section
    .attr("y2", function (d) {return d.y2;}) //y_axis of 2nd section
    .attr("stroke-width", 20)   //double radius?
    .attr("stroke", function (d) {return d.color;})
    .on("click", buildGroup);

/*Create the circle for each block */
var circle = elemEnter.append("circle")
    .attr("cx", function (d) { return d.x_axis; })
    .attr("cy", function (d) { return d.y_axis; })
    .attr("r", function (d) { return d.radius; })
    .attr("stroke","black")
    .attr("fill", "white")
    .attr("stroke-width", 2)
    .on("click", showSection);



/* Create the text for each block */
elemEnter.append("text")
    .attr("dx", function(d){return d.x_axis + 13})
    .attr("dy", function(d){return d.y_axis + 5})
    .attr("font-size","16px")
    .text(function(d){return d.label});

    
function showSection (d) {
    var label = d.label;
    var sectionText = _.filter(content, {"label": label} );
    $("#section-text").html(sectionText[0].label + " " + sectionText[0].ogd);
    console.log(sectionText[0].ogd);
}

function buildGroup(d) {
    console.log("building list of sections here...");
}

