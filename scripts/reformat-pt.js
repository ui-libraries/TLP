let _ = require('lodash')
let fs = require('fs')
let prototractatus_sections = require('./prototractatus-sections')
let pt = require('./pt')
let its = fs.readFileSync("ptSectionsJson.json")
let itsPT = JSON.parse(its)
let newPT = []
let output = {}

//{ "label": "2", "precision": 0, "page": 2, "tlp":["2"], "fontSize":"90px", "y_axis": 1, "x_axis": 9, "ger": "test pt german 2", "ogd":"test pt ogd 2", "pmc":"test pt pmc 2"},

var findPrecision = function (value) {
  
  if ((value % 1) != 0) 
      return value.toString().split(".")[1].length;  
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

_.forEach(pt, (ptSection) => {
  let obj = {}
  let itsVersion

  if (ptSection.pt !== "None") {
    console.log("workin on ", ptSection.pt)
    if (ptSection.pt !== 5.005341) {
      //itsVersion = _.find(itsPT.sections, function(o) { return o.label === _.toString(ptSection.pt); })
    let coordVersion = _.find(prototractatus_sections, function(o) { return o.label === _.toString(ptSection.pt); })
    console.log(coordVersion)
    let sectionList = []
    sectionList.push(_.toString(ptSection.tlp))
    obj.label = _.toString(ptSection.pt)
    obj.precision = findPrecision(ptSection.pt)
    obj.page = ptSection.page
    obj.tlp = sectionList
    obj.fontSize = getFontSize(ptSection.pt)
    obj.y_axis = coordVersion.y_axis
    obj.x_axis = coordVersion.x_axis
    obj.ger = ptSection.german
    obj.ogd = ptSection.english
    obj.pmc = ""
    }

    newPT.push(obj)
    
  }
})

output.sections = newPT


fs.writeFile('ptSectionsJsonTest.json', JSON.stringify(output, null, 4), function (err) {
  if (err) return console.log(err);
  console.log('worked');
})