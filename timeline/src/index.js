import _ from 'lodash'
//import { verso } from './verso'
//import { recto } from './recto'
import {
    combined
} from './combined'
let used = []

combined.forEach((item, index) => {
    /*
    if verso, create a snippet with found recto
    if recto, create a snippet with found verso
    add each match to a list and do not let it repeat
    */
    let template
    let dateStyle
    let versoDateStyle, rectoDateStyle
    dateStyle = getDateStyle(item.date)
    let randomVerso = makeid(5)
    let randomRecto = makeid(5)

    if (item.type === "recto") {
        used.push(item)
        let num

        let title = item.manuscript
        if (getVersoMatch(item.date) === "") {
            versoDateStyle = ""
        } else {
            versoDateStyle = dateStyle
        }


        template = `
        <li>
            <div id="${randomRecto}" class="entry left ${_.toLower(versoDateStyle)}">
                ${getVersoMatch(item.date)}
            </div>
            <div class="point"></div>
            <div id="${randomVerso}" class="entry right ${_.toLower(dateStyle)}">
                <h4><strong>${item.date}</strong></p>${item.manuscript}</h4>
            </div>
        </li>
        `
    }

    $('#list').append(template)
    $(`#${randomVerso}`).click(e => {
        let str = item.eng
        str.replace(/[^\x20-\x7E]/g, '')
        alert(item.eng)
        
    })
    $(`#${randomRecto}`).click(e => {
        let text = getVersoMatchText(item.date)
        text.replace(/[^\x20-\x7E]/g, '')
        alert(text)
    })

})

function getDateStyle(date) {
    let dateObj = new Date(date)
    let month = dateObj.toLocaleString('en-us', {
        month: 'short'
    })
    return month
}

function getVersoMatch(rectoDate) {
    let matched = _.find(combined, {
        "date": rectoDate,
        "type": "verso"
    })
    if (matched) {
        return `<h4><strong>${rectoDate}</strong></p>${matched.manuscript}</h4>`
    } else {
        return ""
    }
}

function getVersoMatchText(rectoDate) {
    let matched = _.find(combined, {
        "date": rectoDate,
        "type": "verso"
    })
    if (matched) {
        return `${matched.eng}`
    } else {
        return ""
    }
}

function getRectoMatch(versoDate) {
    let matched = _.find(combined, {
        "date": versoDate,
        "type": "recto"
    })
    if (matched) {
        return matched.manuscript
    } else {
        return ""
    }
}

function getUrl(item) {
    let num = item['tlp-number']
    let url
    if (typeof num !== undefined && num !== "" && item.type === "recto") {
        url = `<a href='http://tractatus.lib.uiowa.edu/map/?tlp=${num}'>${item.manuscript}</a>`
    } else {
        url = item.manuscript
    }
    return url
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}
