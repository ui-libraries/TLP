let fs = require('fs')
let _ = require('lodash')
let lines = require('./prototractatus-lines')
let sections = require('./prototractatus-sections')
let bigList = []

function findPrecision(a) {
  let precision
  //convert to string and count the length after the decimal point
  if (a.indexOf('.') !== -1) {
      precision = (a + "").split(".")[1].length
  } else {
      precision = 0
  }
  
  return precision
}

function buildGroup (d) {
  var start = d.start,
        end = d.end,
        precision,
        sectionList = [],
        range = [],
        i,
        j,
        n,
        preciseList = []
        
    var newLine = {}
	
	if (d.actualStart !== undefined) {
		start = d.actualStart
	}
	
	if (d.actualEnd !== undefined) {
		end = d.actualEnd
	}
	
	precision = findPrecision(end)
    
    //find all objects with label values between start value and end value
    sectionList.push(_.filter(sections, function (o) { return o.label <= end && o.label >= start; }));
    _.forEach(sectionList, function (a) {		
        _.forEach(a, function (b) {
            range.push(b.label)
        })
    })
    
    preciseList.push(start)
    
    lineGroup = _.cloneDeep(preciseList)     
    
    //add section to list if it has the same precision as end
    for (i = 0; i < range.length; i += 1) {
        if (findPrecision(range[i]) === precision) {
            preciseList.push(range[i])
        }
    }
    
    //remove the duplicate
    if (preciseList[0] == preciseList[1]) {
        preciseList.shift()
    }

    newLine.label = d.start
    newLine.sections = preciseList.map(Number)
    newLine.start = d.start
    newLine.end = d.end
    newLine.precision = precision
    newLine.color = d.color
    return newLine
}

_.forEach(lines, (line) => {
  let newLine = buildGroup(line)
  bigList.push(newLine)
})

fs.writeFile('ptLinesJson.json', JSON.stringify(bigList, null, 4), function (err) {
  if (err) return console.log(err)
  console.log('worked')
})