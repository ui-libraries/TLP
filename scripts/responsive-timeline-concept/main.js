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
            html += generateNewSection(dateObject.verso[i], dateObject.recto[i])
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

function generateNewSection(singleVerso, singleRecto) {
    let vId = _.kebabCase(singleVerso["manuscript"])
    let rId = _.kebabCase(singleRecto["manuscript"])
    let TLP = ""
    let PT = ""
    let date = ""
    let originalGer = ""
    if (singleRecto['original-ger-pt'] != undefined) {
        originalGer = singleRecto['original-ger-pt']
    }
    if (singleRecto["tlp-number"] !== "") {
        TLP = "<em>TLP: " + singleRecto["tlp-number"] +" </em>"
        PT = "<em>PT: " + singleRecto["pt-number"] + "</em>"
    }

    if (singleRecto["date"] == "") {
        hideRecto = "hideRecto"
    }
    if (singleVerso["date"] == "") {
        hideVerso = "hideVerso"
    }
    if (hideRecto == "hideRecto" || hideVerso == "hideVerso") {
        hideDate = "hideDate"
    }
    if (singleRecto["date"]) {
        date = convertDate(singleRecto["date"])
    }

    if (singleVerso["date"]) {
        date = convertDate(singleVerso["date"])
    }

    let html = `
    <div class="timeline-section">
    <div class="bead"></div>
        <div class="timeline-date">
        ${date}
        </div>
        <div class="row">
            <div id="${vId}" class="col-sm-6 verso">
                <div class="timeline-box">
                    <div class="box-title">
                        <span>${singleVerso.manuscript}</span>
                    </div>
                    <div class="box-content verso">
                        <span data-parent="${vId}" class="deu">${singleVerso.ger}</span>
                        <span data-parent="${vId}" class="eng">${singleVerso.eng}</span>
                        <span data-parent="${vId}" class="tlp">${TLP} ${singleRecto['stern']}</span>
                        <span data-parent="${vId}" class="pt">${singleRecto["pt-stern"]}</span>
                        <span data-parent="${vId}" class="tlp_deu">${TLP}${originalGer}</span>
                        <span data-parent="${vId}" class="pt_deu">${PT} ${singleRecto['original-ger-pt']}</span>
                    </div>
                </div>
            </div>
            <div id="${rId}" class="col-sm-6 recto">
                <div class="timeline-box">
                    <div class="box-title">
                        <span>${singleRecto.manuscript}</span>
                    </div>
                    <div class="box-content recto">
                        <span data-parent="${rId}" class="deu">${singleRecto.ger}</span>
                        <span data-parent="${rId}" class="eng">${singleRecto.eng}</span>
                        <span data-parent="${rId}" class="eng_tlp">${singleRecto['eng']}</span>
                        <span data-parent="${rId}" class="eng_pt">${singleRecto['eng']}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
    return html
}

function head() {
    const head = `<!DOCTYPE html>
    <html lang="en" >
    <head>
      <meta charset="UTF-8">
      <title>CodePen - Responsive Timeline Concept</title>
        <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootswatch/3.3.7/slate/bootstrap.min.css'>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'>
        <link rel="stylesheet" href="style.css">
    
    </head>
    <body>
    <!-- partial:index.partial.html -->
    <div class="container">
      <div class="timeline">
                `
    return head
}

function foot() {
    const foot = `  </div>
    </div>
    <!-- partial -->
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
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