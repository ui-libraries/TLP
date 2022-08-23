const _ = require("lodash")
let fs = require("fs")
let recto = require("./recto.json")
let verso = require("./verso.json")
const officialDates = require("./official-dates.json")
const { orderBy } = require("lodash")

//****************** */
//let move = moveItems(verso, recto)
//recto = move.rectoList
//verso = move.versoList
writeIndex()
console.log("Generating HTML")
//****************** */

/**
 * create an index.html file of entire HTML content
 *
 * @return {string} - A valid HTML document
 */

function writeIndex() {
    let html = head()
    html += getSectionsHtml()
    //html += sanityCheck()
    html += foot()
    fs.writeFile("./dist/index.html", html, function (err) {
        if (err) return console.log(err)
        console.log("Created index.html. Finished.")
    })
}

/**
 * Loop through the list of sections and generate HTML for each one.
 *
 * @return {string} - A list of html sections
 */

function getSectionsHtml() {
    let html = ""
    let versoList = versoGroupsByDate(verso)
    //writeJsonToFile(versoList)
    let rectoList = rectoGroupsByDate(recto)
    //writeJsonToFile(rectoList)
    let merged = mergeSortedRectoAndVerso(rectoList, versoList)
    let padded = padList(merged)
    _.forEach(padded, (dateObject) => {
        for (let i = 0; i < dateObject.verso.length; i++) {
            html += generateSection(dateObject.verso[i], dateObject.recto[i])
        }
    })
    return html
}

/**
 * Return a list of objects by date with the correct recto and verso for each date. If the recto and verso lists are different lengths, the shorter list will contain empty objects to make each list the same length.
 *
 * @param {array} mergedList - A list of date objects with recto and verso arrays
 * @return {array} - A list of objects like mergedList but with empty objects to make each recto and verso array length match
 */

function padList(mergedList) {
    let result = []
    _.forEach(mergedList, (dateObject) => {
        let padded = {}
        let recto = dateObject.recto
        let verso = dateObject.verso
        if (recto.length > verso.length) {
            let diff = recto.length - verso.length
            for (let i = 0; i < diff; i++) {
                verso.push({
                    date: "",
                    eng: "",
                    ger: "",
                    manuscript: "",
                    type: "verso",
                })
            }
        }
        if (verso.length > recto.length) {
            let diff = verso.length - recto.length
            for (let i = 0; i < diff; i++) {
                recto.push({
                    date: "",
                    eng: "",
                    ger: "",
                    manuscript: "",
                    type: "recto",
                })
            }
        }
        padded.recto = recto
        padded.verso = verso
        padded.date = dateObject.date
        result.push(padded)
    })
    return result
}

/**
 * Return a list of objects by date with the correct recto and verso for each date.
 *
 * @param {array} rectoList - A list of sorted recto objects
 * @param {array} versoList - A list of sorted verso objects
 * @return {array} - A list of objects by unique date, each with a list of correct recto and verso objects.
 */

function mergeSortedRectoAndVerso(rectoList, versoList) {
    let merged = []

    _.forEach(officialDates, (date) => {
        let result = {}
        result.recto = []
        result.verso = []
        result.recto = filterByProperty(rectoList, "date", date)
        result.verso = filterByProperty(versoList, "date", date)
        result.date = date
        merged.push(result)
    })
    return merged
}

/**
 * Return a list of section objects of the same date and document type as a given section
 *
 * @param {array} list - A list of section objects -- section objects could be of any date or type
 * @param {object} item - The predicate section object to match against
 * @return {array} - A filtered list of section objects
 */

function findSameDates(list, item) {
    let result
    if (item["type"] == "verso") {
        result = _.filter(list, {
            date: item.date,
            type: "verso",
        })
        //_.remove(result, {"manuscript": item.manuscript})
    }

    if (item["type"] == "recto") {
        result = _.filter(list, {
            date: item.date,
            type: "recto",
        })
        //_.remove(result, {"manuscript": item.manuscript})
    }

    return result
}

/**
 * Returns an HTML section for a given pair of recto and verso objects, most likely from a sorted list. Either object could contain empty strings if there is no match. e.g. The length of the sorted recto list is longer than the corresponding date in the verso list. Remaining versos would be empty strings.
 *
 * @param {object} singleVerso - An individual verso object
 * @param {object} singleRecto - An individual recto object
 * @return {string} - An HTML section with content from the given recto and verso objects
 */
function generateSection(singleVerso, singleRecto) {
    let html = `
    <div class="section">
        <div class="bead"></div>
        <div class="content verso">
            <p>${singleVerso.manuscript} ${singleVerso.date}</p>
            <div class="entry">
                <span class="eng">
                ${singleVerso.eng}
                </span>
                <span class="tlp">
                ${singleVerso.eng}
                </span>
                <span class="deu">
                ${singleVerso.ger}
                </span>
            </div>
        </div>
        <div class="content recto">
            <p>${singleRecto.manuscript} ${singleRecto.date}</p>
            <div class="entry">
                <span class="eng">
                ${singleRecto.eng}
                </span>
                <span class="tlp">
                ${singleRecto.eng}
                </span>
                <span class="deu">
                ${singleRecto.ger}
                </span>
            </div>
        </div>
    </div>
    `
    return html
}

function head() {
    const head = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ludwig Wittgenstein's Manuscript Notebooks</title>
        <link rel="stylesheet" href="style.css">
    </head>
    
    <div class="bg-img">
      <div class="header1">
        <div class="topnav">
          <a href="#contact">Contact</a>
          <a href="#ms104">MS-104</a>
          <a href="#ms103">MS-103</a>
          <a href="#ms102">MS-102</a>
          <a href="#ms101">MS-101</a>
          <a href="#about">About</a>
          <br>
        </div>
      </div>
    </div>
    
    <body>
        <div class="container">
            <div class="top-section" id="about">
                <h1><em>Ludwig Wittgenstein's Manuscript Notebooks 1914-1918</em></h1>
                <p>This site hosts an interactive copy of several manuscripts composed by Ludwig Wittgenstein between 1914-1918 (MS-101-104)
                 in their original German alongside an English translation by David Stern. This translation and markup of the <em>Notebooks</em> provides
                  a useful mapping of portions of Wittgenstein's notebooks corresponding to entries in the <em>Tractatus-Logico-Philosophicus</em>.  
                  These similarities have been represented visually and made accessible in this site through a color-coded system; portions in
                   orange correspond to portions related or similar to entries in the <em>TLP</em> while yellow and green text correspond to those portions of increasing
                    similarity to entries found in the <em>TLP</em>. 
                    To access the different layers on this page, press [E] for Stern's English translation, [D] for the original Deutsch, 
                     [T] to display <em>TLP</em> entries (both colored and in italics), and [R] to display related entries from the proto-Tractatus.
                </p>
            </div>
            <div class="timeline">
                <div class="line"></div>
                `
    return head
}

function foot() {
    const foot = `</div>
    </div>
</div>

<script src="script.js"></script>
</body>
</html>`
    return foot
}

/**
 * Return a two-dimensional list of recto section objects organized by date. TODO: sort this list!
 *
 * @param {object} recto - A list of recto section objects
 * @return {array} - A multidimentional array of recto section objects grouped by date
 */

function rectoGroupsByDate(recto) {
    //start at the first recto section object in the recto list. If it is not in a usedDate list then generate a list of all recto section objects with the same date. Add each item from the generated list to the usedDate list. If the next section in the recto is already on the list, skip it.
    let group = []
    let usedDates = []
    _.forEach(recto, (section) => {
        let match = []

        //if the current section's date is not in the usedDate list then mark it as a match
        //perhaps better to filter
        if (_.includes(usedDates, section.date) === false) {
            match = findSameDates(recto, section)
            if (match) {
                group.push(match)
            }
        }
        usedDates.push(section.date)
        //this may remove same dates with different date formats
        usedDates = _.uniq(usedDates)
    })
    return group
}

/**
 * Return a two-dimensional list of verso section objects organized by date. TODO: sort this list!
 *
 * @param {object} verso - A list of verso section objects
 * @return {array} - A multidimentional array of verso section objects grouped by date
 */

function versoGroupsByDate(verso) {
    //start at the first verso section object in the verso list. If it is not in a usedDate list then generate a list of all verso section objects with the same date. Add each item from the generated list to the usedDate list. If the next section in the verso is already on the list, skip it.
    let group = []
    let usedDates = []
    _.forEach(verso, (section) => {
        let match = []

        //if the current section's date is not in the usedDate list then mark it as a match
        //perhaps better to filter
        if (_.includes(usedDates, section.date) === false) {
            match = findSameDates(verso, section)
            if (match) {
                group.push(match)
            }
        }
        usedDates.push(section.date)
        //this may remove same dates with different date formats
        usedDates = _.uniq(usedDates)
    })
    return group
}

function filterByProperty(array, prop, value) {
    var filtered = []
    for (var i = 0; i < array.length; i++) {
        var obj = array[i]

        for (var key in obj) {
            if (typeof (obj[key] == "object")) {
                var item = obj[key]
                if (item[prop] == value) {
                    filtered.push(item)
                }
            }
        }
    }

    return filtered
}
