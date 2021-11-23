import _ from 'lodash'
import { verso } from './verso'
import { recto } from './recto'

let sortedRecto = _.orderBy(recto, o => o.manuscript)
//console.log(verso.length, recto.length)

console.log(getVersoMatch("1914-09-02"))


sortedRecto.forEach((item, index) => {
    let template = `
    <li>
        <div class="entry left ${_.toLower(getDateStyle(item.date))}">
            <h4>${item.manuscript}</h4>
        </div>
        <div class="point"></div>
        <div class="entry right ${_.toLower(getDateStyle(item.date))}">
            <h4>${getVersoMatch(item.date)}</h4>
        </div>
    </li>
    `
    $('#list').append(template)
})

function getDateStyle(date) {
    let dateObj = new Date(date)
    let month = dateObj.toLocaleString('en-us', { month: 'short' })
    return month
}

function getVersoMatch(dater) {
    let match
   verso.forEach(item => {
       if (item.date === dater) {
           match = item.manuscript
       }
   })
   return match
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