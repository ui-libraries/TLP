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
    */
    let template
    let dateStyle
    let versoDateStyle, rectoDateStyle
    dateStyle = getDateStyle(item.date)

    if (item.type === "recto") {
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
            <h4>${item.manuscript}</h4>
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
            <h4>${item.manuscript}</h4>
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
        "date": rectoDate
    })
    if (matched.type == "verso") {
        return matched.manuscript
    } else {
        return ""
    }
}

function getRectoMatch(versoDate) {
    let matched = _.find(combined, {
        "date": versoDate
    })
    if (matched.type == "recto") {
        return matched.manuscript
    } else {
        return ""
    }
}




/*
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