var sectionDiv = '';
var splitSection = [];
var gap = 50;
var version = '.ogd';
var lineGroup = [];
var divCounter = 0; //append to div name to create unique ids every time


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

function findPrecision(a) {
    var precision;
    //convert to string and count the length after the decimal point
    if (a.indexOf('.') !== -1) {
        precision = (a + "").split(".")[1].length;
    } else {
        precision = 0;
    }
    
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
    
    var div = "#dialog" + divCounter;
    
    $(div).dialog({
        modal: false,
        draggable: true,
        resizable: true,
        close: closeFunction,
        position: ['center', 'bottom'],        
        height: 500,
        width: 400,
        dialogClass: 'ui-dialog-osx',
    });
   
    //append each section to section-text list
    $(div).append($('<li>').load(sectionDiv, function () {
        $('.ger, .pmc, .ogd').hide();
        $(lang).show();
    }));

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

/*var square = elemEnter.append("rect")
    .attr("x", function (d) { return d.x_axis * gap; })
    .attr("y", function (d) { return d.y_axis * gap; })
    .attr("width", 50)
    .attr("height", 100);*/


/* Create the text for each block */
elemEnter.append("text")
    .attr("dx", function (d) {return d.x_axis * gap + 15; })
    .attr("dy", function(d){return d.y_axis * gap - 15; })
    .attr("font-size","16px")
    .text(function (d) {return d.label});

    
function showSection(d) {    
    var label = d.label;
    
    //create a unique id for each new dialog div
    divCounter += 1;
    var div = "dialog" + divCounter;
    
    //create a new div and append to dialog div
    $('<div/>', {
        "id": div,
        "title": 'Tractatus Logico-Philosophicus',
        "class": 'dialog',
    }).appendTo('#dialog');   
    
    findSection(label, version);
}

function closeFunction(e) {
    //console.log(e.target.id);
}

function buildGroup(d) {    
    var start = d.start,
        end = d.end,
        precision = findPrecision(d.end),
        sectionList = [],
        range = [],
        i,
        j,
        n,
        preciseList = [];
    
<<<<<<< HEAD
    if (end == " ") {
        end = "2.2";
        precision = findPrecision(end);
    }
    
=======
>>>>>>> origin/master
    //my god there has to be a better way. Last minute hack.
    switch (start) {
        case "":
            start = "2.01";
            break;
            
        case " ":
            start = "2.21";
            break;
            
            case "  ":
            start = "3.001";
            break;
            
            case "   ":
            start = "3.01";
            break;
            
            case "    ":
            start = "4.001";
            break;
            
            case "     ":
            start = "4.01";
            break;
            
            case "      ":
            start = "5.01";
            break;
            
            case "              ":
            start = "2.0201";
            break;
            
            case "        ":
            start = "5.51";
            break;
            
            case "         ":
            start = "6.001";
            break;
            
            case "          ":
            start = "6.01";
            break;
            
            case "           ":
            start = "6.121";
            break;
            
            case "            ":
            start = "5.531";
            break;
            
            case "             ":
            start = "5.11";
            break;
            
            case "              ":
            start = "";
            break;
    }

    //find all objects with label values between start value and end value
    sectionList.push(_.filter(sections, function (o) { return o.label <= end && o.label >= start; }));
    _.forEach(sectionList, function (a) {
        _.forEach(a, function (b) {
            range.push(b.label);
        });
    });
    
<<<<<<< HEAD
    console.log(range);
    
=======
>>>>>>> origin/master
    //add start location to list since it has a different precision    
    
    //n = start.search(/^(?:[1-9]\d*|0)?(?:\.\d+)?$/);
    

    preciseList.push(start);
    
    lineGroup = _.cloneDeep(preciseList);
    
    
    
    //add section to list if it has the same precision as end
    for (i = 0; i < range.length; i += 1) {
        if (findPrecision(range[i]) === precision) {
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
    $('<div/>', {
        "id": div,
        "title": 'Tractatus Logico-Philosophicus',
        "class": 'dialog',
    }).appendTo('#dialog');   

    
    //loop through final list and display each section text
    for (j = 0; j < preciseList.length; j += 1) {
        findSection(preciseList[j], version);
    }
    
}

$('.radio-inline').on('change', function(){
    var elem = $( "input:checked" );
    var lang = elem[0].parentElement.id;
    version = '.' + lang;
    
    for (j = 0; j < lineGroup.length; j += 1) {
        findSection(lineGroup[j], version);
    }
});




