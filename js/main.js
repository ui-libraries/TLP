var sectionDiv = '';
var splitSection = [];
var gap = 50;
var version = '.ger';
var lineGroup = [];
var divCounter = 0; //append to div name to create unique ids every time
var i = 17;


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

/* Define the data for the lines */
var elemLine = svg.selectAll("g")
    .data(lines);

/* Define the data for the curves 
var elemCurve = svg.selectAll("g")
    .data(curves); */

/* Define the data for the end caps 
var elemEnd = svg.selectAll("g")
    .data(ends);*/

/* Define the data for the non-junction stops */
var elemRect = svg.selectAll("g")
    .data(rectangles);

/*Create and place the "blocks" containing the lines */
var elemLineEnter = elemLine.enter()
    .append("g");

/*Create and place the "blocks" containing the curves 
var elemCurveEnter = elemCurve.enter()
    .append("g");*/

/*Create and place the "blocks" containing the rectangles and the text 
var elemRectEnter = elemRect.enter()
    .append("g"); */

/*Create and place the "blocks" containing the end caps and the text 
var elemEndEnter = elemEnd.enter()
    .append("g");

/*Create and place the "blocks" containing the circle and the text */
var elemEnter = elem.enter()
    .append("g");

/*Create the line */
var line = elemLineEnter.append("line")
    .attr("x1", function (d) {var point = findPoints(d); return point.x1 * gap; }) //x_axis of 1st section + radius/2 ?
    .attr("y1", function (d) {var point = findPoints(d); return point.y1 * gap; }) //y_axis of 1st section
    .attr("x2", function (d) {var point = findPoints(d); return point.x2 * gap; }) //x_axis of 2nd section
    .attr("y2", function (d) {var point = findPoints(d); return point.y2 * gap; }) //y_axis of 2nd section
    .attr("stroke-width", 20)   //double radius?
    .attr("stroke", function (d) {return d.color; })
    .on("click", buildGroup);

/*Create the curve 
var curve = elemCurveEnter.append("line")    
    .attr("x1", function (d) {var point = findPoints(d); return point.x1 * gap; }) //x_axis of 1st section + radius/2 ?
    .attr("y1", function (d) {var point = findPoints(d); return point.y1 * gap; }) //y_axis of 1st section
    .attr("x2", function (d) {var point = findPoints(d); return point.x2 * gap; }) //x_axis of 2nd section
    .attr("y2", function (d) {var point = findPoints(d); return point.y2 * gap; }) //y_axis of 2nd section
    .attr("stroke-width", 20)   //double radius?
    .attr("stroke", function (d) {return d.color; })   
    .on("click", buildGroup);*/

/*Create the circles for junctions */
var circle = elemEnter.append("circle")
    .attr("cx", function (d) { return d.x_axis * gap; })
    .attr("cy", function (d) { return d.y_axis * gap; })
    .attr("r", 15)
    .attr("stroke","black")
    .attr("fill", "white")
    .attr("stroke-width", 4)
    .on("click", showSection);

/*Create the rectangles for stops 
var rect = elemRectEnter.append("rect")
    .attr("x", function (d) { return d.x_axis * gap; })
    .attr("y", function (d) { return d.y_axis * gap; })
    .attr("fill", function (d) { return d.color; })
    .attr("width", 25)
    .attr("height", 30)
    .on("click", showSection);*/

/*Create the end caps 
var ends = elemEndEnter.append("rect")
    .attr("x", function (d) { return d.x_axis * gap - 1; })
    .attr("y", function (d) { return d.y_axis * gap - 28; })
    .attr("fill", function (d) { return d.color; })
    .attr("width", 25)
    .attr("height", 60)
    .on("click", showSection);*/

/* Create the text for each stop 
elemRectEnter.append("text")
    .attr("dx", function (d) {return d.x_axis * gap; })
    .attr("dy", function(d){return d.y_axis * gap - 15; })
    .attr("font-size","16px")
    .text(function (d) {return d.label}); */

/* Create the text for each block */
elemEnter.append("text")
    .attr("dx", function (d) {return d.x_axis * gap + 15; })
    .attr("dy", function(d){return d.y_axis * gap - 15; })
    .attr("font-size","16px")
    .text(function (d) {return d.label});

/* Create the text for each end cap 
elemEndEnter.append("text")
    .attr("dx", function (d) {return d.x_axis * gap + 30; })
    .attr("dy", function(d){return d.y_axis * gap - 15; })
    .attr("font-size","16px")
    .text(function (d) {return d.label});*/


//testing
/*var secArray = _.map(pt, 'pt');
var missing = [];
_.forEach(sections, function(value, key) {
    var sec = value.label;
   
    secString = Number(sec);    
    if (_.includes(secArray, secString)) {
        
    }else {
        missing.push(secString);
    }
    
  
});

console.log(_.uniq(missing));*/


//calculates how many decimal points each section number has
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

//for each circle, rectangle, and end cap -- looks up numerical label in the html, builds a jquery dialog box, then populates dialog with relevant section text
function findSection(section, lang) {
    var sectionNum = '',
        ptsec;

    sectionNum = section;
    
    //jquery doesn't want a period in the selector since it could be a class, so we have to escape it
    //find out if section has a decimal point
/*   if (sectionNum.indexOf('.') !== -1) {
        splitSection = sectionNum.split('.');
        sectionDiv = 'tractatus.html .sections:has("#p' + splitSection[0] + '\\.' + splitSection[1] + '")';
    } else {
        sectionDiv = 'tractatus.html .sections:has("#p' + sectionNum + '")';
    } */
    
    sectionContent = createHTML(sectionNum);   
    
    var div = "#dialog" + divCounter;
    
    $(div).dialog({
        modal: false,
        draggable: true,
        resizable: true,
        position: { 
                    my: "left top",
                    at: "left top" ,
                    of: event,
                    within: $("body")
                  },        
        height: 500,
        width: 400,
        dialogClass: 'ui-dialog-osx',
    });
    
    $(div).append(sectionContent);
    $(div).find('.ger, .pmc, .ogd').hide();
    $(div).find(version).show();
    
    /*//append each section to section-text list
    $(div).append($('<li>').load(sectionDiv, function () {
        $(div).find('.ger, .pmc, .ogd').hide();
        $(div).find(version).show();
    })); */

}

function createHTML(section) {
    var html;
        
    
    ptsec = _.find(pt, function(obj) {
                 return  obj.pt == section;
            });
    
    html = `<div class="sections"><div class="pnum" id="p${ptsec.pt}">${ptsec.pt}</div>
            <div class="ger">${ptsec.german}</div>
            <div class="ogd">${ptsec.english}</div>
            <div class="pmc">${ptsec.english}</div></div>`;    
    
    return html;
}

//returns a point object with beginning and end sections
function findPoints(d) {
    var points = {},        
        start = d.start,
        end = d.end,
        startPoint = _.filter(sections, {"label": start}),
        endPoint = _.filter(sections, {"label": end});
    
    //console.log("line " + i);
    //temporary workaround for end cap demo. delete this when actual list is working
    /*if (end === "1.13") {
        endPoint = _.filter(ends, {"label": end});
    }*/  

    points.x1 = startPoint[0].x_axis;
    points.x2 = endPoint[0].x_axis;
    points.y1 = startPoint[0].y_axis;
    points.y2 = endPoint[0].y_axis;
    points.color = d.color; 
    
    i++;

    return points;
}

//builds the dialog container then uses findSection to populate
function showSection(d) {
    
    var label = d.label;
    
    //create a unique id for each new dialog div
    divCounter += 1;
    var div = "dialog" + divCounter;
    
    //create a new div and append to dialog div
    $('<div>', {
        "id": div,
        "title": 'Tractatus Logico-Philosophicus',
        "class": 'dialog',
    }).appendTo('#dialog');
    
    $('#'+div).append($('<div>').load('lang-version.html'));

    findSection(label, version);
}

//creates an array of sections when a line is clicked then populates a dialog with each section text
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
    
    //find all objects with label values between start value and end value
    sectionList.push(_.filter(sections, function (o) { return o.label <= end && o.label >= start; }));
    _.forEach(sectionList, function (a) {
        _.forEach(a, function (b) {
            range.push(b.label);
        });
    });
    
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
    $('<div>', {
        "id": div,
        "title": 'Tractatus Logico-Philosophicus',
        "class": 'dialog',
    }).appendTo('#dialog');
    
    $('#'+div).append($('<div>').load('lang-version.html'));
    
    //loop through final list and display each section text
    for (j = 0; j < preciseList.length; j += 1) {
        findSection(preciseList[j], version);
    }
    
}

//switches the language when language dropdown is changed
$(document).on('change', ".selectChange", function () {
    var divID = '#' + $(this).parent()[0].offsetParent.id;
    var lang = '.' + this.value;
    
    $(divID).find('.ger, .pmc, .ogd').hide();
    $(divID).find(lang).show();

});




