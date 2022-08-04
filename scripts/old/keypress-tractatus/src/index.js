//generate recto.json and verso.json with Jupyter notebooks recto and verso in the word-to-json directory
import {
    recto
} from './recto.js';
import {
    verso
} from './verso.js';
import _ from 'lodash'

let combined = recto.concat(verso)
combined = _.orderBy(combined, ['date'], ['asc'])
let comboSort = []
//console.log(JSON.stringify(comboSort, null, 4))

_.forEach(combined, section => {
    section.sortNum = createSortNum(section)
    comboSort.push(section)
})

//remove every object without a date
_.remove(comboSort, {
    "date": ""
})

/*
_.remove(comboSort, {
    "manuscript": "Ms-101,2r[2]"
})
*/

_.forEach(comboSort, section => {
    logRectos(section)
})

//console.log(JSON.stringify(comboSort, null, 4))

function findRecto(v) {
    let versoName = v.manuscript
    let rectoName = _.replace(versoName, "v", "r")
    let recto = _.find(combined, {
        'manuscript': rectoName
    })
    if (recto) {
        console.log(versoName + " ------ " + recto.manuscript)
    }
    return recto
}

function createSortNum(item) {
    const manuscriptName = item.manuscript
    const regex = /.+?(?=])/
    let found = manuscriptName.match(regex)
    found = _.replace(found, "Ms-", "")
    found = _.replace(found, ",", "")
    found = _.replace(found, "v", "0")
    found = _.replace(found, "r", "0")
    found = _.replace(found, "[", "")
    return Number(found)
}

function findDifferentType(list, item) {
    let result
    if (_.includes(item.manuscript, "v")) {
        result = _.filter(list, {
            "date": item.date,
            "type": "recto"
        })
    }

    if (_.includes(item.manuscript, "r")) {
        result = _.filter(list, {
            "date": item.date,
            "type": "verso"
        })
    }

    return result
}

function findSameType(list, item) {
    let result
    if (_.includes(item.manuscript, "v")) {
        result = _.filter(list, {
            "date": item.date,
            "type": "verso"
        })
        //_.remove(result, {"manuscript": item.manuscript})
    }

    if (_.includes(item.manuscript, "r")) {
        result = _.filter(list, {
            "date": item.date,
            "type": "recto"
        })
        //_.remove(result, {"manuscript": item.manuscript})
    }

    return result
}

function versoHtml(versoList) {
    let ger = ''
    let eng = ''
    let manuscript = ''
    let date = ''
    _.forEach(versoList, section => {
        manuscript += `${section.manuscript} `
        ger += `<p>${section.ger}</p>`
        eng += `<p>${section.eng}</p>`
        date = section.date
    })
    let html = `
    <div class="content verso">
    <p>${manuscript} - ${date}</p>
    <div class="entry">
       <p>
          <span class="eng">
          ${eng}
          </span>
          <span class="tlp">
          ${eng}
          </span>
          <span class="deu">
          ${ger}
          </span>
       </p>
    </div>
 </div>
    `
    return html
}

function rectoHtml(rectoList) {
    let ger = ''
    let eng = ''
    let manuscript = ''
    let date = ''
    _.forEach(rectoList, section => {
        manuscript += `${section.manuscript} `
        ger += `<p>${section.ger}</p>`
        eng += `<p>${section.eng}</p>`
        date = section.date
    })
    let html = `
    <div class="content verso">
    <p>${manuscript} - ${date}</p>
    <div class="entry">
       <p>
          <span class="eng">
          ${eng}
          </span>
          <span class="tlp">
          ${eng}
          </span>
          <span class="deu">
          ${ger}
          </span>
       </p>
    </div>
 </div>
    `
    return
}

function generateNode(verso, recto) {
    let html = `<div class="section">
    <div class="bead"></div>
   ${versoHtml}
   ${rectoHtml}
 </div>`
    return html
}

function logVersos(section) {
    if (section["original-type"] == "verso") {
        let versos = findSameType(comboSort, section)
        let rectos = findDifferentType(comboSort, section)
        console.log("----------------")
        console.log(section.manuscript)
        console.log(`verso length: ${versos.length}, rectos length: ${rectos.length}`)
        console.log("versos", versos)
        console.log("rectos", rectos)
    }
}

function logRectos(section) {
    if (section["original-type"] == "recto") {
        let rectos = findSameType(comboSort, section)
        let versos = findDifferentType(comboSort, section)
        console.log("----------------")
        console.log(section.manuscript)
        console.log(`rectos length: ${rectos.length}, versos length: ${versos.length}`)
        console.log("rectos", rectos)
        console.log("versos", versos)
    }
}


//Ms-102,73v[3]
//verso length: 1, rectos length: 12

//Ms-103,1v[2]
//verso length: 1, rectos length: 0

//Ms-102,24v[2] et 25v[1] et 26v[1]
//verso length: 1, rectos length: 1

//113 exampes of more versos than rectos for a given date