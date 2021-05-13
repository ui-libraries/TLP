let _ = require('lodash')
let fs = require('fs')
let pts = fs.readFileSync("ptSectionsJsonNoPage.json")
let ptSections = JSON.parse(pts)
let ptLang = require('./pt')

let newPT = []
let output = {}

//{ "label": "2", "precision": 0, "page": 2, "tlp":["2"], "fontSize":"90px", "y_axis": 1, "x_axis": 9, "ger": "test pt german 2", "ogd":"test pt ogd 2", "pmc":"test pt pmc 2"},


let sections = ptSections.sections

_.forEach(sections, (ptSection) => {
    let obj = {}
    let test = _.find(ptLang, function (o) {return _.toString(o.pt) === ptSection.label})

    if (test !== undefined) {
      let tlpList = []
      tlpList.push(test.tlp)
      obj.label = ptSection.label
      obj.precision = ptSection.precision
      obj.fontSize = ptSection.fontSize
      obj.y_axis = ptSection.y_axis
      obj.x_axis = ptSection.x_axis
      obj.page = test.page
      obj.ger = test.german
      obj.pmc = test.english
      obj.ogd = ""
      obj.tlp = tlpList
  
      newPT.push(obj)
    }


    
})

output.sections = newPT



fs.writeFile('ptSectionsJsonNoPageCMON.json', JSON.stringify(output, null, 4), function (err) {
  if (err) return console.log(err);
  console.log('worked');
})