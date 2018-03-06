let _ = require('lodash')
let fs = require('fs')
let tlpSections = require('./tlp-sections')
let tlpLatexJson = fs.readFileSync("tlp_latex.json")
let tlpLatex = JSON.parse(tlpLatexJson)
let newTlp = []
let output = {}

_.forEach(tlpSections, (section) => {
  let newSection = {}
  newSection.label = section.label
  newSection.precision = section.precision
  newSection.fontSize = section.fontSize
  newSection.y_axis = section.y_axis
  newSection.x_axis = section.x_axis
  if (tlpLatex[section.label]) {
    newSection.ger = _.join(tlpLatex[section.label]['German'], '<br />')
    newSection.ogd = _.join(tlpLatex[section.label]['Ogden'], '<br />')
    newSection.pmc = _.join(tlpLatex[section.label]['PearsMcGuinness'], '<br />')
  } else {
    newSection.ger = ""
    newSection.ogd = ""
    newSection.ogd = ""
  }
  
  newTlp.push(newSection)
})

output.sections = newTlp


fs.writeFile('sectionsJson.json', JSON.stringify(output, null, 4), function (err) {
  if (err) return console.log(err);
  console.log('worked');
})