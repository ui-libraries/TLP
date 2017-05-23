// the container that holds the loaded section from tractatus.html
var sectionDiv = '';
// an array to contain the two parts of the TLP section number. Because the dot interferes with jquery
var splitSection = [];
// number of pixels between sections on the screen
var gap = 50;
//append to div name to create unique ids every time
var divCounter = 0; 
// a list of sections of the prototractatus that represent the currently selected page range
currentGrouping = [];
// place holder list of subsections in the current page range. usually identical to currentGrouping
var subPT = [];

var mouseLoc;

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

//need to modify sections array from sections-two.js in place. probably bad idea to mutate this, but oh well
_.forEach(sections, function(data) {
	if (findPrecision(data.label) == 0) {
		size = "64px"
	} else if (findPrecision(data.label) == 1) {
		size = "48px"
	} else if (findPrecision(data.label) == 2) {
		size = "32px"
	} else if (findPrecision(data.label) > 2) {
		size = "18px"
	}
	
	data.size = size
})

// load the language version from local storage
var version = localStorage.getItem('language');

// make german the default if no language is set
if (version === null) { 
    version = '.ger';
    localStorage.setItem('language', version);
}

// load the start page from local storage
var startPage = localStorage.getItem('startpage');
// load the end page from local storage
var endPage = localStorage.getItem('endpage');

// add the start and end page values to the text boxes
$('#start-page').val(startPage);
$('#end-page').val(endPage);

// add all object in the pt.js that fall between start and end page numbers. Hold this in subPT
_.forEach(pt, function(value, key) {
  	if (value.page >= startPage && value.page <= endPage) {
		subPT.push(value.pt);	
	};
});

// make a currentGrouping list from subPT for functions in case we need to keep the subPT separate at some point
var currentGrouping = subPT;

// if the enter key is pressed, increment the end page and trigger a submit click
// used to crudely animate moving through pages
$(window).keyup(function(e) {
     if (e.which === 13) {
        //console.log("next page");
		endPage = $('#end-page').val();
		var nextPage = Number(endPage) + 1;
		$('#end-page').val(nextPage);
		nextPage = endPage.toString();
		$('#page-submit').trigger( "click" );
		 
     }
});

// when the page form submit button is clicked, set the start and end page values based on text box values
$('#page-submit').click(function() {	
    startPage = $('#start-page').val();
	endPage = $('#end-page').val();	
	startPage = startPage.toString();
	endPage = endPage.toString();
	setStorage(startPage, endPage);	
 });

// get the current window dimensions for d3
var width = $("#map").width();
var height = $(window).height();

// add a new svg object to the map div in index.html
var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "tractatus-map");

// Define the data for the circles. sections array loaded from prototractatus-sections.js
var elem = svg.selectAll("g")
    .data(sections);

// needs to be called here so the lines array is correct before d3 data is made
// mutates the lines array loaded from prototractatus-lines.js to only include end points found in the current page range
makePartials();

// Define the data for the lines. lines array loaded from prototractatus-lines and mutated with makePartials function
var elemLine = svg.selectAll("g")
    .data(lines);

// Create and place the "blocks" containing the lines
var elemLineEnter = elemLine.enter()
    .append("g");

// Create and place the "blocks" containing the circle and the text
var elemEnter = elem.enter()
    .append("g");

/*Create the line */
	
var line = elemLineEnter.append("line")
	.attr("x1", function (d) {var point = findPoints(d); return point.x1 * gap; }) //x_axis of 1st section + radius/2 ?
	.attr("y1", function (d) {var point = findPoints(d); return point.y1 * gap; }) //y_axis of 1st section
	.attr("x2", function (d) {var point = findPoints(d); return point.x2 * gap; }) //x_axis of 2nd section
	.attr("y2", function (d) {var point = findPoints(d); return point.y2 * gap; }) //y_axis of 2nd section
	.attr("stroke-width", 20)   //double radius?
	//.attr("stroke", function (d) {return d.end, d.start, "pink"})
	.attr("stroke", function (d) {return checkLineColor(currentGrouping, d.start, d.end, d.color) })
	.on("click", buildGroup);
	
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
    .attr("font-size", function (d) {return d.size})
    .text(function (d) {return d.label});

// called from the page-submit click handler. sets start and end page values
function setStorage(start, end) {	
	localStorage.setItem('startpage', start);
	localStorage.setItem('endpage', end);	
}

// if the line is in the current start and end range, use its original color. If not, make it grey
// invoked in the d3 line var
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

// if the circle is in the current start and end range, use its original color. If not, make it grey
// invoked in the d3 circle var
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

//compute points for start and end on line object. Highest value that is included in currentGrouping is returned
function findHighestEnd(lineObj) {
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
	last = last;
	
	return _.toString(last);	
}

// iterates over lines array and makes partial lines. called before lines d3 data is made
function makePartials() {
	_.forEach(lines, function(v, k) {		
		partialLine(v);
	})
}

// mutates the line array to add partial lines
function partialLine(lineObj) {
	var start = lineObj.start,
		end = lineObj.end,
		color = lineObj.color,
		newLines = [],
		line = {},
		highEnd = findHighestEnd(lineObj);	
	
	if (highEnd !== "") {
		line.start = start;
		line.end = highEnd;
		line.color = color;
		lines.push(line);
	}	
}

// get the corresponding TLP number from the PT
function ptToTlp(ptsection) {
	var ptsec,
		sectionNum,
		sectionText;
	
	ptsec = _.find(pt, function(obj) { return  obj.pt == ptsection; });
	sectionNum = _.toString(ptsec.tlp);
	
	return sectionNum;
}

// create an HTML fragment of color-coded text differences between a specified PT number and its corresponding TLP section
function findDiff(section, lang) {
	var sectionNum = '',
		splitSection,
		sectionDiv,
		sectionText,
		diff,
		fragment = $('<div class="diff"></div>');

	
	sectionNum = ptToTlp(section);
	sectionContent = createHTML(section);
	sectionText = $(sectionContent).find(lang).text();	

	 if (sectionNum.indexOf('.') !== -1) {
        splitSection = sectionNum.split('.');
        sectionDiv = 'tractatus.html .sections:has("#p' + splitSection[0] + '\\.' + splitSection[1] + '")';
    } else {
        sectionDiv = 'tractatus.html .sections:has("#p' + sectionNum + '")';
    }

    $('<div>').load(sectionDiv, function () {
        var html = this;
		var result = $(html).find(lang).text();
		diff = JsDiff.diffWords(result, sectionText);
		
		diff.forEach(function(part){
		  // blue for additions, red for deletions
		  // grey for common parts
		  color = part.added ? 'red' :
			part.removed ? 'blue' : 'grey';
		  span = document.createElement('span');
		  span.style.color = color;
		  span.appendChild(document
			.createTextNode(part.value));
		  $(fragment).append(span);			
		});		
    });	

	return fragment;
	
}

//for each circle, look up numerical label in the html, build a jquery dialog box, then populate dialog with relevant section text
function findSection(section, lang) {
    var sectionNum = '',
		sectionContent,		
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
                    at: "left top",
                    of: mouseLoc,
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

// for the PT we are loading from json, so we need to generate a snippet of html instead of loading from file
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

    points.x1 = startPoint[0].x_axis;
    points.x2 = endPoint[0].x_axis;
    points.y1 = startPoint[0].y_axis;
    points.y2 = endPoint[0].y_axis;
    points.color = d.color; 

    return points;
}

//builds the dialog container then uses findSection to populate
function showSection(d) {
    var returnVal;
    var label = d.label;
	var display;
	var textLabel;
    
    //create a unique id for each new dialog div
    divCounter += 1;
    var div = "dialog" + divCounter;
    
    //create a new div and append to dialog div
    $('<div>', {
        "id": div,
        "title": 'Prototractatus',
        "class": 'dialog',
    }).appendTo('#dialog');
    version = localStorage.getItem('language');
	
	//put it all in the callback, of course
    $('#'+div).append($('<div>').load('../pt/lang-version.html', function() {
		version = localStorage.getItem('language');		
		$('.selectChange').val(version);
	}));

	display = document.getElementById(div);
	textLabel = label.toString();
	returnVal = findDiff(textLabel, version);	
    findSection(label, version);
	$('#' + div).append('<br /><div class="pnum">text difference when compared to TLP ' + ptToTlp(textLabel) + '</div>');
	$('#' + div).append(returnVal);
	
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
		display,
		textLavel,
		returnVal,
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
    version = localStorage.getItem('language');
    $('#'+div).append($('<div>').load('../pt/lang-version.html', function() {
		version = localStorage.getItem('language');
		$('.selectChange').val(version);
	}));
    
    //loop through final list and display each section text
	for (j = 0; j < preciseList.length; j += 1) {
		display = document.getElementById(div);
		textLabel = preciseList[j].toString();
		returnVal = findDiff(textLabel, version);
		findSection(preciseList[j], version);
		$('#' + div).append('<div class="pnum">text difference when compared to TLP ' + ptToTlp(textLabel) + '</div>');
		$('#' + div).append(returnVal, '<br />');
	}
    
}

//switches the language when language dropdown is changed
$(document).on('change', ".selectChange", function () {
    var divID = '#' + $(this).parent()[0].offsetParent.id;
	var lang = this.value;

	if (!_.includes(lang, '.')) {
		lang = '.' + this.value;
	}
	
	localStorage.setItem('language', lang);
    $(divID).find('.ger, .pmc, .ogd').hide();
    $(divID).find(lang).show();

});

$( document ).on( "mousemove", function( event ) {
  mouseLoc = event
});

