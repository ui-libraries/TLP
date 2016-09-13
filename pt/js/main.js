var sectionDiv = '';
var splitSection = [];
var gap = 50;
var version = '.ger';
var lineGroup = [];
var divCounter = 0; //append to div name to create unique ids every time
//var i = 17;
currentGrouping = [];
var protoPT = [];
var subPT = [];
var startPage = '3';
var endPage = '83';



startPage = localStorage.getItem('startpage');
endPage = localStorage.getItem('endpage');
$('#start-page').val(startPage);
$('#end-page').val(endPage);

_.forEach(pt, function(value, key) {
  	if (value.page >= startPage && value.page <= endPage) {
		subPT.push(value.pt);	
	};
});

//console.log(subPT);

currentGrouping = subPT;

function setStorage(start, end) {	
	localStorage.setItem('startpage', start);
	localStorage.setItem('endpage', end);	
}

$('#page-submit').click(function() {	
    startPage = $('#start-page').val();
	endPage = $('#end-page').val();	
	startPage = startPage.toString();
	endPage = endPage.toString();
	setStorage(startPage, endPage);
	
 });

var width = $("#map").width();
//var width = 1000;
var height = $(window).height();
//var height = 1000;

var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "tractatus-map");

/* Define the data for the non-junction stops */
var elemRect = svg.selectAll("g")
    .data(rectangles);

/* Define the data for the circles */
var elem = svg.selectAll("g")
    .data(sections);

/* Define the data for the lines */
var elemLine = svg.selectAll("g")
    .data(lines);

/*Create and place the "blocks" containing the lines */
var elemLineEnter = elemLine.enter()
    .append("g");

/*Create and place the "blocks" containing the circle and the text */
var elemEnter = elem.enter()
    .append("g");

function checkLineColor(sections, startValue, endValue, color) {
	var startVal = Number(startValue);
	var endVal = Number(endValue);
	var resultStart = _.includes(sections, startVal);
	var resultEnd = _.includes(sections, endVal);
	
	if (resultStart === true && resultEnd === true) {		
		return color;		
	} else {		
		return '#E8E8EE';		
	}
}

function checkCircleColor(sections, startValue, color) {
	var startVal = Number(startValue);
	var resultStart = _.includes(sections, startVal);
	
	if (resultStart === true) {		
		return color;		
	} else {		
		return '#E8E8EE';		
	}
}

//returns all the points along a line given a start and end
function computeLinePoints(start, end) {
	var startObj = _.find(sections, function(o) { return o.label == start; });
	var endObj = _.find(sections, function(o) { return o.label == end; });
	var startX = startObj.x_axis;
	var startY = startObj.y_axis;
	var endX = endObj.x_axis;
	var endY = endObj.y_axis;
	var points = [];
	
	if (startX - endX === 0) {
		//vertical line, x axis is the same
		//find everything on the x axis between the y range
		_.forEach(sections, function(value, key) {
			if (value.x_axis === startX && (value.y_axis >= startY && value.y_axis <= endY)) {
				points.push(value);				
			}
		});
	} else if (startY - endY === 0) {
		//horizontal line, y axis is the same
		//find everything on the y axis between the x range
		_.forEach(sections, function(value, key) {
			if (value.y_axis === startY && (value.x_axis >= startX && value.x_axis <= endX)) {
				points.push(value);				
			}
		});
	}
	
	return points;
}

function findHighestEnd(lineObj) {
	//compute points for start and end on line object. Highest value that is included in currentGrouping is returned
	var points = [];
	var pointLabels = [];
	var diff = [];
	var num;	
	var last;
	
	points = computeLinePoints(lineObj.start, lineObj.end);
	
	_.forEach(points, function(v, k) {
		num = Number(v.label);			
		pointLabels.push(num);						
	});
	

	diff = _.intersection(pointLabels, currentGrouping);
	last = _.last(diff);
	
	return last;	
}

// TESTING TESTING
var tester = findHighestEnd({"start": "1.2", "end": "1.21", "color": yellow});

if (tester !== undefined) {
	console.log(tester);
} else {
	console.log("naw");
}
// END TESTING

/*Create the line */
function buildLine() {
	
	var line = elemLineEnter.append("line")
		.attr("x1", function (d) {var point = findPoints(d); return point.x1 * gap; }) //x_axis of 1st section + radius/2 ?
		.attr("y1", function (d) {var point = findPoints(d); return point.y1 * gap; }) //y_axis of 1st section
		.attr("x2", function (d) {var point = findPoints(d); return point.x2 * gap; }) //x_axis of 2nd section
		.attr("y2", function (d) {var point = findPoints(d); return point.y2 * gap; }) //y_axis of 2nd section
		.attr("stroke-width", 20)   //double radius?
		.attr("stroke", function (d) {return checkLineColor(currentGrouping, d.start, d.end, d.color) })
		.on("click", buildGroup);
}

buildLine();
	
/*Create the circles for junctions */
var circle = elemEnter.append("circle")
    .attr("cx", function (d) { return d.x_axis * gap; })
    .attr("cy", function (d) { return d.y_axis * gap; })
    .attr("r", 15)
    .attr("stroke", function (d) {return checkCircleColor(currentGrouping, d.label, 'black') })
    .attr("fill", "white")
    .attr("stroke-width", 4)
    .on("click", showSection);
								  

/* Create the text for each block */
elemEnter.append("text")
    .attr("dx", function (d) {return d.x_axis * gap + 15; })
    .attr("dy", function(d){return d.y_axis * gap - 15; })
    .attr("font-size","16px")
    .text(function (d) {return d.label});

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
    
    sectionContent = createHTML(sectionNum);   
    
    var div = "#dialog" + divCounter;
    
    $(div).dialog({
        modal: false,
        draggable: true,
        resizable: true,
        position: { 
                    my: "left top",
                    at: "left top" ,
                    of: window.event,
                    within: $("body")
                  },        
        height: 500,
        width: 400,
        dialogClass: 'ui-dialog-osx',
    });
    
    $(div).append(sectionContent);
    $(div).find('.ger, .pmc, .ogd').hide();
    $(div).find(version).show();
    
}

function createHTML(section) {
    var html;
        
    
    ptsec = _.find(pt, function(obj) {
                 return  obj.pt == section;
            });
    
    html = `<div class="sections"><div class="pnum" id="p${ptsec.pt}">${ptsec.pt}</div>
            <div class="ger">${ptsec.german}</div>
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
	
	//endPoint = _.filter(sections, {"label": findHighestEnd(d).toString()});
	
	//console.log(d);

    points.x1 = startPoint[0].x_axis;
    points.x2 = endPoint[0].x_axis;
    points.y1 = startPoint[0].y_axis;
    points.y2 = endPoint[0].y_axis;
    points.color = d.color; 
    
    //i++;
	
	//console.log(points);

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
        "title": 'Prototractatus',
        "class": 'dialog',
    }).appendTo('#dialog');
    
    $('#'+div).append($('<div>').load('../pt/lang-version.html'));

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
        "title": 'Prototractatus',
        "class": 'dialog',
    }).appendTo('#dialog');
    
    $('#'+div).append($('<div>').load('../pt/lang-version.html'));
    
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




