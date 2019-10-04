const _ = require('lodash')
const fs = require('fs')

const pt = fs.readFileSync('ptSectionsJson.json')
const pt_json = JSON.parse(pt)
const label_list = fs.readFileSync('label_list.json')
const label_list_json = JSON.parse(label_list)
let new_list = []

console.log(pt_json.sections.length)

_.forEach(pt_json.sections, (section) => {
    let new_section = _.clone(section)
    let result = _.find(label_list_json.sections, (o) => {return o.label === section.label})
    if (result !== undefined) {
        new_section.str = result.text
        new_list.push(new_section)
    } else {
        new_section.str = ""
        new_list.push(new_section)
    }
})

console.log(new_list.length)

let translation = {}
translation.sections = new_list

fs.writeFile('final.json', JSON.stringify(translation, null, 4), (err) => {
    if (err) return console.log(err)
    console.log('worked')
})