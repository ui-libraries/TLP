let _ = require('lodash')
let ptdata = require('./pt')
let fs = require('fs')

let newPt = []

_.forEach(ptdata, function(item) {
  let newItem = {}
  newItem.number = item.pt.toString()
  newItem.TlpNumber = item.tlp.toString()
  newItem.page = item.page
  newItem.ger = item.german
  newItem.pmc = item.english
  

  newPt.push(newItem)
})

fs.writeFile('/Users/mtbutler/Desktop/tlp-reformat/pt-new' + '.json', JSON.stringify(newPt, null, 4), function (err) {
  if (err) return console.log(err)
  console.log('worked')
})