let _ = require('lodash')
let fs = require('fs')
let ptSections = require('./prototractatus-sections')

let newPT = []
let output = {}

//{ "label": "2", "precision": 0, "page": 2, "tlp":["2"], "fontSize":"90px", "y_axis": 1, "x_axis": 9, "ger": "test pt german 2", "ogd":"test pt ogd 2", "pmc":"test pt pmc 2"},

var findPrecision = function (value) {
  
  if ((value % 1) != 0) 
      return value.split(".")[1].length;  
  return 0;
}

function getFontSize (section) {
  let size
  if (section === "None" || section === undefined) {section = 1}

  if (findPrecision(section) == 0) {
		size = "90px"
	} else if (findPrecision(section) == 1) {
		size = "40px"
	} else if (findPrecision(section) == 2) {
		size = "40px"
	} else if (findPrecision(section) > 2) {
		size = "18px"
  }
  
  return size
}

_.forEach(ptSections, (ptSection) => {
  let obj = {}
  obj.label = ptSection.label
  obj.precision = findPrecision(ptSection.label)
  obj.fontSize = getFontSize(ptSection.label)
  obj.y_axis = ptSection.y_axis
  obj.x_axis = ptSection.x_axis

  newPT.push(obj)

    
})

output.sections = newPT


fs.writeFile('ptSectionsJsonNoPage.json', JSON.stringify(output, null, 4), function (err) {
  if (err) return console.log(err);
  console.log('worked');
})