const _ = require("lodash")
let fs = require("fs")
let recto = require("./recto.json")
let verso = require("./verso.json")
const officialDates = require("./official-dates.json")

//****************** */
//let move = moveItems(verso, recto)
//recto = move.rectoList
//verso = move.versoList
writeIndex()
console.log("Generating HTML")
//****************** */

function convertDate(isoDate) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let date = _.split(isoDate, "-")
    let year = date[0]
    let month = monthNames[parseInt(date[1]) - 1]
    let day = parseInt(date[2])
    if (isoDate == "") {
        return ""
    }
    return `${day} ${month}, ${year}`
}

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
    fs.writeFile("./dist/index.html", html, function(err) {
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
                    stern: "",
                    "pt-stern": "",
                    "tlp-number": ""
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
                    stern: "",
                    "pt-stern": "",
                    "tlp-number": ""
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
    let TLP = ""
    let PT = ""
    let date = singleRecto['date']
    let year = date.substring(0, 4)
    let month = date.substring(5, 7)
    let originalGer = ""
    if (singleRecto['original-ger-pt'] != undefined) {
        originalGer = singleRecto['original-ger-pt']
    }
    if (singleRecto["tlp-number"] !== "") {
        TLP = "<em>TLP: " + singleRecto["tlp-number"] +" </em>"
        PT = "<em>PT: " + singleRecto["pt-number"] + "</em>"
    }

    let html = `
        <div id="y${year}m${month}" class="section">
        <div class="bead"></div>
        <div class="content verso">
            <div class="entry">
            <span class="deu"> <div class="tooltip"><strong>${convertDate(singleVerso.date)}</strong><span class="tooltiptext">${singleVerso.manuscript}</span></div><br>${singleVerso.ger} </span>
            <span class="eng"> <div class="tooltip"><strong>${convertDate(singleVerso.date)}</strong><span class="tooltiptext">${singleVerso.manuscript}</span></div><br>${singleVerso.eng} </span>
            <span class="tlp"> ${TLP} ${singleRecto['stern']} </span>
            <span class="pt"> ${PT} ${singleRecto["pt-stern"]} </span>
            <span class="tlp_deu">${TLP} ${originalGer} </span>
            <span class="pt_deu">${PT} ${singleRecto['original-ger-pt']} </span>
            </div>
        </div>
        <div class="content recto">
            <p class="tooltip">
            <div class="tooltip"><strong>${convertDate(singleRecto.date)}</strong><span class="tooltiptext">${singleRecto.manuscript}</span></div>
            <div class="entry">
            <span class="deu"> ${singleRecto.ger} </span>
            <span class="eng"> ${singleRecto.eng} </span>
            <span class="eng_tlp">
                <span> ${singleRecto['eng']} </span>
            </span>
            <span class="eng_pt">
                <span> ${singleRecto['eng']} </span>
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
        <style type="text/css" id="sheet"></style>
    </head>
    <body>
    <div class="bg-img">
    </div>
    
    <div class="sidenav">
        <p class="Menu-Item">
        <a href="#about">About</a>
        </p>
                <div class="Drop-Text">
                <p>
                This site hosts an interactive copy of manuscripts composed by Ludwig Wittgenstein between 1914 and 1917
                in their original German alongside an English translation by David Stern, Joachim Schulte, and Katia Saporiti. This new translation is the first to
                carefully mediate the transformation of Wittgenstein's wartime notebook material into the <em>Tractatus-Logico-Philosophicus</em>. 
                In appreciation of this process, the site further presents a markup of the wartime notebooks with a color-coded mapping
                to corresponding portions of the <em>Tractatus-Logico-Philosophicus</em> (TLP) as well as the Wittgenstein's first draft of this work (Ms-104).
                These relationships can be accessed through key-triggered layers. Please see key in navigation bar for more information. 
                </p>
        </div>
        <p class="Key-Menu">
        <a href="#key">Key</a>
        </p>
                <div class="Key">
                <p>                    
                    [1] = English translation<br>
                    [2] = Tractatus-related entries with highlighting<br>
                    [3] = Ms-104 with highlighting<br>
                    [4] = German original<br>
                    [5] = German with Tractatus-related cross-references<br>
                    <span style="background: lightgreen">Green</span> = (Nearly) Identical Passages<br>
                    <span style="background: yellow">Yellow</span> = Similar Passages<br>
                    <span style="background: lightgrey">Grey</span> = Related Passages
                </p>
                </div>
                <ul class="datemenu">1914
                    <li><a href="#y1914m08">August</a></li>
                    <li><a href="#y1914m09">September</a></li>
                    <li><a href="#y1914m10">October</a></li>
                    <li><a href="#y1914m11">November</a></li>
                    <li><a href="#y1914m12">December</a></li>
                </ul>
                <ul class="datemenu">1915
                    <li><a href="#y1915m01">January</a></li>
                    <li><a href="#y1915m02">February</a></li>
                    <li><a href="#y1915m03">March</a></li>
                    <li><a href="#y1915m04">April</a></li>
                    <li><a href="#y1915m05">May</a></li>
                    <li><a href="#y1915m06">June</a></li>
                </ul>
                <ul class="datemenu">1916
                    <li><a href="#y1916m04">April</a></li>
                    <li><a href="#y1916m05">May</a></li>
                    <li><a href="#y1916m06">June</a></li>
                    <li><a href="#y1916m07">July</a></li>
                    <li><a href="#y1916m08">August</a></li>
                    <li><a href="#y1916m09">September</a></li>
                    <li><a href="#y1916m10">October</a></li>
                    <li><a href="#y1916m11">November</a></li>
                    <li><a href="#y1916m12">December</a></li>
                </ul>
    </div>
    
        <div class="container">
            <div class="top-section">
                
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
            if (typeof(obj[key] == "object")) {
                var item = obj[key]
                if (item[prop] == value) {
                    filtered.push(item)
                }
            }
        }
    }

    return filtered
}