import _ from 'lodash'
//import { verso } from './verso'
//import { recto } from './recto'
import {
    combined
} from './combined'

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

    if (item.type === "recto") {
        let num

        let title = item.manuscript
        if (getVersoMatch(item.date) === "") {
            versoDateStyle = ""
        } else {
            versoDateStyle = dateStyle
        }


        template = `
    <li>
        <div class="entry left ${_.toLower(versoDateStyle)}">
            <h4>${getVersoMatch(item.date)}</h4>
        </div>
        <div class="point"></div>
        <div class="entry right ${_.toLower(dateStyle)}">
            <h4><strong>${item.date}</strong></p>${getUrl(item)}</h4>
        </div>
    </li>
    `
    }

    if (item.type === "verso") {
        if (getRectoMatch(item.date) === "") {
            rectoDateStyle = ""
        } else {
            rectoDateStyle = dateStyle
        }
        template = `
    <li>
        <div class="entry left ${_.toLower(dateStyle)}">
            <h4><strong>${item.date}</strong></p>${item.manuscript}</h4>
        </div>
        <div class="point"></div>
        <div class="entry right ${_.toLower(rectoDateStyle)}">
            <h4>${getRectoMatch(item.date)}</h4>
        </div>
    </li>
    `
    }
    $('#list').append(template)
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
        return matched.manuscript 
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




/*

        if (item['pt-number'] != "") {
            let num = item['pt-number']
            console.log(num)
            title = `<a href='http://tractatus.lib.uiowa.edu/map/?pt=${num}>${item.manuscript}</a>}`
        }


<li>
    <div class="entry left sep">
        <h4>1914-09-02 <br /> Ms-101,20r[2]</h4>
    </div>
    <div class="point"></div>
    <div class="entry right">
        <h4>Ms-101,20r[2]</h4>
    </div>
</li>
<li>
    <div class="entry left">
        <h4>Ms-101,20r[2]</h4>
    </div>
    <div class="point"></div>
    <div class="entry right">
        <h4>Ms-101,20r[2]</h4>
    </div>
</li>
*/