const _ = require('lodash')
const fs = require('fs')

let label_list = []
let label = ''
let text = ''
let section = {}

let lines = require('fs').readFileSync('ms104.txt', 'utf-8').split('\n').filter(Boolean)

_.forEach(lines, (line) => {
    let label_match = new RegExp('^[+-]?([0-9]*[.])?[0-9]+')
    let match = line.match(label_match)
    
    if (match !== null) {
        text = text.substring(0, text.length - 1)
        // regex to match characters in brackets (do this in vs code): \\r\[.*?\]
        section.label = label
        section.text = text
        label_list.push(section)            
        label = ''
        text = ''
        section = {}
        let new_line = _.split(line, '\t', 1)
        new_line = _.split(new_line, ' ', 1)
        new_line = _.replace(new_line, '[', '.')
        new_line = _.replace(new_line, ']\r', '')
        new_line = _.replace(new_line, '+', '')
        label = new_line
    } else {       
        text += line        
    }
})


//
//
// COPY STERN INTO PTSECTIONS
//
//
/*
let sections = []
const pt = fs.readFileSync('sectionsJson.json')
const pt_json = JSON.parse(pt)

_.forEach(pt_json.sections, (item) => {
    let new_item = {}
    new_item.label = item.label,
    new_item.precision = item.precision,
    new_item.fontSize = item.fontSize,
    new_item.y_axis = item.y_axis,
    new_item.x_axis = item.x_axis,
    new_item.page = item.page,
    new_item.ger = item.ger,
    new_item.pmc = item.pmc,
    new_item.ogd = item.ogd,
    new_item.str = "",
    new_item.pt = item.pt

    sections.push(new_item)
})

let new_pt = {}
new_pt.sections = sections

console.log(sections.length)
*/

let translation = {}
translation.sections = label_list

fs.writeFile('label_list.json', JSON.stringify(translation, null, 4), (err) => {
    if (err) return console.log(err)
    console.log('worked')
})

/*
fs.writeFile('new_pt.json', JSON.stringify(new_pt, null, 4), (err) => {
    if (err) return console.log(err)
    console.log('worked')
})

*/