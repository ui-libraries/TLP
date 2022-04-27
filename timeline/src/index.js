import {
    combined
} from './combined'
import _ from 'lodash'

let used = []
const combo = _.orderBy(combined, ['date'], ['asc'])
console.log(JSON.stringify(combo))

combo.forEach((item, index) => {
    let template
    let dateStyle
    let versoDateStyle, rectoDateStyle
    dateStyle = getDateStyle(item.date)
    let randomVerso = makeid(5)
    let randomRecto = makeid(5)

    if (item['original-type'] === "recto") {
        used.push(item)
        let num

        let title = item.manuscript
        if (getVersoMatch(item.date) === "") {
            versoDateStyle = ""
        } else {
            versoDateStyle = dateStyle
        }



        template = `
            <div class="section">
               <div class="bead"></div>
               <div class="content verso">
                  <p>Ms-101,17v[2] * 5 September 1914 </p>
                  <div class="entry">
                     <p>
                        <span class="eng">
                        I am on my way to a great discovery. But will I get there?! Am more sensual than before. Masturbated again today.  It's icy and stormy outside. Am lying on the straw on the ground, writing and reading on a small wooden case (price 2.50 crowns).
                        </span>
                        <span class="tlp">
                        I am on my way to a great discovery. But will I get there?! Am more sensual than before. Masturbated again today.  It's icy and stormy outside. Am lying on the straw on the ground, writing and reading on a small wooden case (price 2.50 crowns).
                        </span>
                        <span class="deu">
                        Ich bin auf dem Wege zu einer großen Entdeckung. Aber ob ich dahingelangen werde?! Bin sinnlicher / als früher. Heute wieder onaniert. Draußen ist es eisig & stürmisch. Ich liege auf dem Stroh am Boden & schreibe & lese auf einem kleinen Holzkoffer (Preis 2˙50 Kronen).
                        </span>
                     </p>
                  </div>
               </div>
               <div class="content recto">
                  <p> Ms-101,17r[2] * 4 September 1914 </p>
                  <div class="entry">
                     <p>
                        <span class="eng">
                        If the existence of the subject-predicate sentence does not show everything necessary, then it could surely only be shown by the existence of some specific fact of that form. And knowing such a fact cannot be essential for logic.
                        </span>
                        <span class="tlp">
                        If the existence of the subject-predicate sentence does not show everything necessary, then it could surely only be shown by the existence of some specific fact of that form. And knowing such a fact cannot be essential for logic.
                        </span>
                        <span class="deu">
                        Wenn nicht die Existenz des Subjekt-Prädikat Satzes alles Nötige zeigt dann könnte es doch nur die
                        Existenz irgend einer besonderen Tatsache jener Form zeigen. Und die Kenntnis einer solchen kann nicht für die Logik wesentlich sein.
                        </span>
                     </p>
                  </div>
               </div>
            </div>`
        $('.timeline').append(template)
    }

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
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}