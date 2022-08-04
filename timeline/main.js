const _ = require("lodash")
let fs = require("fs")
let recto = require("./recto-stern.json")
let verso = require("./verso-stern.json")
const officialDates = require("./official-dates.json")
const { orderBy } = require("lodash")

//****************** */
//let move = moveItems(verso, recto)
//recto = move.rectoList
//verso = move.versoList
writeIndex()
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
        console.log("worked")
    })
}

function moveItems(verso, recto) {
    let versoList = []
    let rectoList = []
    _.forEach(recto, (item)=> {
        if(_.includes(item.manuscript, "v")) {
            _.pull(recto, item)
            versoList.push(item)
        }
    })

    _.forEach(verso, (item)=> {
        if(_.includes(item.manuscript, "r")) {
            _.pull(verso, item)
            rectoList.push(item)
        }
    })

    return {
        verso: verso,
        recto: recto
    }
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
        console.log(result.recto)
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
            <p>
                <span class="eng">
                ${singleVerso.eng}
                </span>
                <span class="tlp">
                ${singleVerso.eng}
                </span>
                <span class="deu">
                ${singleVerso.ger}
                </span>
            </p>
            </div>
        </div>
        <div class="content recto">
            <p>${singleRecto.manuscript} ${singleRecto.date}</p>
            <div class="entry">
            <p>
                <span class="eng">
                ${singleRecto.eng}
                </span>
                <span class="tlp">
                ${singleRecto.eng}
                </span>
                <span class="deu">
                ${singleRecto.ger}
                </span>
            </p>
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

function writeFile(content) {
    fs.writeFile("test.json", content, function (err) {
        if (err) return console.log(err)
        console.log("worked")
    })
}

function filterByProperty(array, prop, value){
    var filtered = [];
    for(var i = 0; i < array.length; i++){

        var obj = array[i];

        for(var key in obj){
            if(typeof(obj[key] == "object")){
                var item = obj[key];
                if(item[prop] == value){
                    filtered.push(item);
                }
            }
        }

    }    

    return filtered;

}

function writeJsonToFile(json) {
    let content = JSON.stringify(json, null, 4)
    writeFile(content)
}

/**
 * Return a json file with official dates of recto and verso entries
 *
 * @param {object} recto - A list of recto section objects
 * @param {object} verso - A list of verso section objects
 * @return {object} - Two lists of official dates
 */

function generateOfficialDates(recto, verso) {
    let dates = []
    _.forEach(recto, (section) => {
        dates.push(section.date)
    })
    _.forEach(verso, (section) => {
        dates.push(section.date)
    })
    dates.sort((a, b) => b < a || -(b > a))

    return _.uniq(dates)
}

function sanityCheck() {
    const content = `                <div class="content verso">
    <p></p>
    <p>
    
    </p>
</div>
<div class="content recto">
    <p>MS-101,1r[1] * 9 August 1914</p>
    <div class="entry">
    <p>
        <span class="eng">
        The day before yesterday was accepted after the medical examination for military
service and assigned to the 2nd Fortress Artillery Regiment in Kraków. Left
Vienna yesterday morning. Arriving in Kraków this morning. Good mood. Gave my
large notebook to Trenkler for safekeeping.<a href="#_ftn2" name="_ftnref2" title=""><sup>[2]</sup></a>
Will I be able to get work done now??? Very curious about my future life!<a
href="#_ftn3" name="_ftnref3" title=""><sup>[3]</sup></a>
The military authorities in Vienna were incredibly friendly. People who were
asked thousands of questions every day gave friendly and exhaustive answers.<a href="#_ftn4" name="_ftnref4" title="">
<sup>[4]</sup></a>
Such things are tremendously encouraging. It reminded me of the English way of
doing things.<sup></sup>
        </span>
        <span class="tlp">
        The day before yesterday was accepted after the medical examination for military
service and assigned to the 2nd Fortress Artillery Regiment in Kraków. Left
Vienna yesterday morning. Arriving in Kraków this morning. Good mood. Gave my
large notebook to Trenkler for safekeeping.<a href="#_ftn2" name="_ftnref2" title=""><sup>[2]</sup></a>
Will I be able to get work done now??? Very curious about my future life!<a
href="#_ftn3" name="_ftnref3" title=""><sup>[3]</sup></a>
The military authorities in Vienna were incredibly friendly. People who were
asked thousands of questions every day gave friendly and exhaustive answers.<a href="#_ftn4" name="_ftnref4" title="">
<sup>[4]</sup></a>
Such things are tremendously encouraging. It reminded me of the English way of
doing things.<sup></sup>
        </span>
        <span class="deu">
        Vorgestern bei der Assentierung genommen
worden &amp; dem 2<sup>ten</sup> <span style='color:red'>Festungsartillerie-Regiment</span>
in Krakau zugeteilt. Gestern <span>vormittag</span> von Wien ab. <span>Komme</span> heute <span>vormittag</span> in Krakau
an. <a name="_Hlk39698160">Guter <span style='color:red'>Stimmung</span>. </a>Gab
mein großes Schreibebuch <span>Trenkler</span> zur Aufbewahrung.
Werde ich jetzt arbeiten können??? Sehr gespannt auf mein kommendes Leben! Die
Militärbehörden in Wien waren von einer unglaublichen Freundlichkeit. <span>Leute</span> die von Tausenden täglich um Rat gefragt werden gaben
freundliche &amp; ausführliche Antworten. So etwas ermutigt ungeheuer. Es
erinnerte mich an englische Verhältnisse.</span></p>
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
    <p></p>
    <p>
    
    </p>
</div>
<div class="content recto">
    <p>Ms-101,1r[2]-2r[1] * 10 August 1914</p>
    <div class="entry">
    <p>
        <span class="eng">Have been kitted out as a recruit. Little hope of being able to make use of my technical knowledge. Need a great deal of good humor and philosophy to find my way about here. When I woke up today it was as if I was in one of those dreams where you suddenly and absurdly find yourself back at school.  Of course, my position has its amusing side too and I carry out the basest duties with an almost ironic smile. Got no work done. This is a trial by fire of character precisely because so much strength is needed in order not to lose one’s good mood and energy.
        </span>
        <span class="tlp">Have been kitted out as a recruit. Little hope of being able to make use of my technical knowledge. Need a great deal of good humor and philosophy to find my way about here. When I woke up today it was as if I was in one of those dreams where you suddenly and absurdly find yourself back at school.  Of course, my position has its amusing side too and I carry out the basest duties with an almost ironic smile. Got no work done. This is a trial by fire of character precisely because so much strength is needed in order not to lose one’s good mood and energy.
        </span>
        <span class="deu">Als Rekrut eingekleidet worden. Wenig Hoffnung meine technischen Kenntnisse verwenden zu können. Brauch sehr viel gute Laune & Philosophie um mich hier zurecht zu finden. Als ich heute aufwachte /  war es mir wie in einem jener Träume worin man plötzlich ganz unsinniger Weise wieder in der Schule sitzt. In meiner Stellung ist freilich auch viel Humor & ich verrichte die niedrigsten Dienste mit fast ironischem Lächeln. Nicht gearbeitet. Dies ist eine Feuerprobe des Charakters eben darum weil so viel Kraft dazu gehört die gute Stimmung & die Energie nicht zu verlieren.
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
    <p></p>
    <p>
    
    </p>
</div>
<div class="content recto">
    <p>Ms-101,2r[2] * 11 August 1914</p>
    <div class="entry">
    <p>
        <span class="eng">Slept badly (bugs). After I swept the room we marched up to a few old mortars and were taught how to use them. Terribly hot. The food is inedible. Will perhaps sleep outside the barracks in future. Wrote to David.  Am already longing for a letter from him so as not to lose the feeling of being in touch with my former life. Haven’t got any work done yet.
        </span>
        <span class="tlp">Slept badly (bugs). After I swept the room we marched up to a few old mortars and were taught how to use them. Terribly hot. The food is inedible. Will perhaps sleep outside the barracks in future. Wrote to David.  Am already longing for a letter from him so as not to lose the feeling of being in touch with my former life. Haven’t got any work done yet.
        </span>
        <span class="deu">Schlecht geschlafen (Ungeziefer). Nachdem ich das Zimmer gekehrt hatte marschierten wir zu ein paar alten Mörsern und wurden im Gebrauch instruiert. Furchtbar heiß. Das Essen ist uneßbar. Werde vielleicht in Zukunft außerhalb der Kaserne schlafen. An David geschrieben. Sehne mich schon nach einem Brief von ihm um das Gefühl des Kontakts mit meinem früheren Leben nicht zu verlieren. Noch nicht gearbeitet.
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
    <p></p>
    <p>
    
    </p>
</div>
<div class="content recto">
    <p>Ms-101,2r[3]-3r[1] * 13 August 1914</p>
    <div class="entry">
    <p>
        <span class="eng">Met the captain the day before yesterday. Was very confused and failed to stand at attention in the military way. He was somewhat ironic and not really my cup of tea. Result = 0. Today it came out that I had passed the school leaving exam etc. whereupon some people who had done that  called me “dear colleague” and urged me to assert my right to volunteer. I enjoyed this. (It bucked me up. ) Heavy catarrh yesterday and today and often feeling unwell. Sometimes a little depressed. Met a lieutenant in the canteen today who noticed that I was having lunch there. He asked me very nicely what I did in ordinary life, was very surprised that they hadn't enlisted me as a one-year volunteer and was generally very friendly, which pleased me a lot.
        </span>
        <span class="tlp">Met the captain the day before yesterday. Was very confused and failed to stand at attention in the military way. He was somewhat ironic and not really my cup of tea. Result = 0. Today it came out that I had passed the school leaving exam etc. whereupon some people who had done that  called me “dear colleague” and urged me to assert my right to volunteer. I enjoyed this. (It bucked me up. ) Heavy catarrh yesterday and today and often feeling unwell. Sometimes a little depressed. Met a lieutenant in the canteen today who noticed that I was having lunch there. He asked me very nicely what I did in ordinary life, was very surprised that they hadn't enlisted me as a one-year volunteer and was generally very friendly, which pleased me a lot.
        </span>
        <span class="deu">Vorgestern beim Hauptmann gewesen. War sehr verdattert und stand nicht militärmäßig vor ihm. Er war etwas ironisch und mir nicht / recht sympathisch. Resultat = 0. Heute kam es heraus daß ich Matura etc. gemacht hatte worauf eine ganze Reihe der Einjährigen mich mit Herr Kollege betitelten & auf mich eindrangen ich solle doch mein Freiwilligenrecht geltend machen. Dies machte mir Spaß(. It bucked me up). Gestern & heute starken Katarrh & oft Unwohlbefinden. Manchmal ein wenig deprimiert. Traf heute in der Kantine einen Leutnant dem es auffiel daß ich dort zu Mittag aß. Er fragte mich sehr nett was ich im Zivil sei wunderte sich sehr daß sie mich nicht zu den einjährig Freiwilligen genommen hatten & war überhaupt sehr freundlich was mir sehr wohl tat.
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
    <p></p>
    <p>
    
    </p>
</div>
<div class="content recto">
    <p>Ms-101,3r[2]-5r[1] * 15 August 1914</p>
    <div class="entry">
    <p>
        <span class="eng">So much  happens that a day seems as long as a week to me. I was ordered yesterday to operate a searchlight on a ship we captured on the Vistula.  The crew are a pack of pigs! No enthusiasm, unbelievably crude, stupid, and malicious!  So it is not true, after all, that a great common cause must make men nobler. As a result, utter drudgery becomes a kind of slave labour. It is odd how people make their own work into hideous toil. In all our external circumstances, our work on this boat could be a wonderfully happy time, and instead! - It will probably be impossible to communicate with the people here  (except, perhaps, for the Lieutenant who seems to be a fairly nice person). So do your work humbly and don't lose yourself for God's sake!!!!  The easiest way to lose oneself is to want to give oneself to other people.    
        </span>
        <span class="tlp">So much  happens that a day seems as long as a week to me. I was ordered yesterday to operate a searchlight on a ship we captured on the Vistula.  The crew are a pack of pigs! No enthusiasm, unbelievably crude, stupid, and malicious!  So it is not true, after all, that a great common cause must make men nobler. As a result, utter drudgery becomes a kind of slave labour. It is odd how people make their own work into hideous toil. In all our external circumstances, our work on this boat could be a wonderfully happy time, and instead! - It will probably be impossible to communicate with the people here  (except, perhaps, for the Lieutenant who seems to be a fairly nice person). So do your work humbly and don't lose yourself for God's sake!!!!  The easiest way to lose oneself is to want to give oneself to other people.    
        </span>
        <span class="deu">Es geschieht so viel daß mir ein Tag so lange vorkommt wie eine Woche. Bin gestern zur Bedienung eines Scheinwerfers auf einem von uns gekaperten Schiffe auf der Weichsel / beordert worden. Die Bemannung ist eine Saubande! Keine Begeisterung, unglaubliche Rohheit, Dummheit & Bosheit! Es ist also doch nicht wahr daß die gemeinsame große Sache die Menschen adeln muß. Hierdurch wird auch die lästigste Arbeit zum Frondienst. Es ist merkwürdig wie sich die Menschen ihre Arbeit selbst zu einer häßlichen Mühsal machen. Unter allen unseren äußeren Umständen könnte die Arbeit auf diesem Schiffe eine herrliche glückliche Zeit geben und statt dessen! — Es wird wohl unmöglich sein sich hier mit den Leuten zu verständigen (außer etwa mit dem Leutnant der ein ganz netter Mensch zu sein scheint). Also in Demut die Arbeit verrichten und sich selbst um Gottes willen nicht verlieren!!!! Nämlich am leichtesten verliert man sich / selbst wenn man sich anderen Leuten schenken will.
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
    <p></p>
    <p>
    
    </p>
</div>
<div class="content recto">
    <p>Ms-101,5r[2] * 16 August 1914</p>
    <div class="entry">
    <p>
        <span class="eng">
        On the "Goplana".  Once again: The stupidity, insolence and wickedness of these people knows no bounds. Every job grows into a torment.  But I have already got work done again today and will not lose heart. Wrote a card to dear David today. Heaven protect him and maintain his friendly feelings for me! - The journey itself along the Vistula is wonderful and I'm in a good mood.
        </span>
        <span class="tlp">
        On the "Goplana".  Once again: The stupidity, insolence and wickedness of these people knows no bounds. Every job grows into a torment.  But I have already got work done again today and will not lose heart. Wrote a card to dear David today. Heaven protect him and maintain his friendly feelings for me! - The journey itself along the Vistula is wonderful and I'm in a good mood.
        </span>
        <span class="deu">
        Auf der „Goplana”. Nochmals: Die Dummheit, Frechheit & Bosheit dieser Menschen kennt keine Grenzen. Jede Arbeit wird zur Qual. Aber ich habe heute schon wieder gearbeitet & werde mich nicht unterkriegen lassen. Schrieb heute eine Karte an den lieben David. Der Himmel beschütze ihn & erhalte mir seine Freundschaft! — Die Fahrt selbst entlang der Weichsel ist herrlich & ich bin in guter Stimmung.
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
    <p></p>
    <p>
    
    </p>
</div>
<div class="content recto">
    <p>Ms-101,5r[3]</p>
    <div class="entry">
    <p>
        <span class="eng">
        aRb3 . aRc . bSc = aR [bSc] Def
        <br>ζTη
        </span>
        <span class="tlp">
        aRb3 . aRc . bSc = aR [bSc] Def
        <br>ζTη
        </span>
        <span class="deu">
        aRb3 . aRc . bSc = aR [bSc] Def
        <br>ζTη
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
    <p></p>
    <p>
    
    </p>
</div>
<div class="content recto">
    <p>Ms-101,5r[4] et 6r[1] * 17 August 1914</p>
    <div class="entry">
    <p>
        <span class="eng">
        A gang of crooks! Only the officers are nice people, and some really very fine. Have to sleep on bare ground and without blankets. Are in Russia now. Due to the hard work, I have become completely unsensual . Haven’t worked yet today. Good mood.  It’s too cold on deck and below there are too many men talking, screaming, stinking etc. etc.
        </span>
        <span class="tlp">
        A gang of crooks! Only the officers are nice people, and some really very fine. Have to sleep on bare ground and without blankets. Are in Russia now. Due to the hard work, I have become completely unsensual . Haven’t worked yet today. Good mood.  It’s too cold on deck and below there are too many men talking, screaming, stinking etc. etc.
        </span>
        <span class="deu">
        Ein Gaunerpack! Die Offiziere nur sind nette Menschen & zum Teil wirklich / sehr fein. Müssen auf der bloßen Erde schlafen und ohne Decken. Sind jetzt in Rußland. Durch die schwere Arbeit bin ich ganz unsinnlich geworden. Heute noch nicht gearbeitet. G.S..  Auf dem Deck ist es zu kalt & unten sind zu viel Menschen die sprechen, schreien, stinken etc. etc.Bos
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
    <p></p>
    <p>
    
    </p>
</div>
<div class="content recto">
    <p>Ms-101,6r[2] et 7r[1] * 18 August 1914</p>
    <div class="entry">
    <p>
        <span class="eng">
        At 1 am I’m suddenly woken up, the lieutenant asks for me and says I have to man the searchlight immediately. "Don't get dressed." I ran onto the command bridge almost naked. Icy air, rain. I was sure I’d die now. Turned the searchlight on and went back to get dressed. It was a false alarm. I was frightfully agitated & groaned out loud. I felt the horrors of war. Now (in the evening) I have got over the horror again. If I don’t lose my present orientation, I will try with all my strength to stay alive. 
        </span>
        <span class="tlp">
        At 1 am I’m suddenly woken up, the lieutenant asks for me and says I have to man the searchlight immediately. "Don't get dressed." I ran onto the command bridge almost naked. Icy air, rain. I was sure I’d die now. Turned the searchlight on and went back to get dressed. It was a false alarm. I was frightfully agitated & groaned out loud. I felt the horrors of war. Now (in the evening) I have got over the horror again. If I don’t lose my present orientation, I will try with all my strength to stay alive. 
        </span>
        <span class="deu">
        Nachts um 1 werde ich plötzlich geweckt, der Oberleutnant fragt nach mir & sagt ich müsse sofort zum Scheinwerfer. “Nicht anziehen". Ich lief fast nackt auf die Kommandobrücke. Eisige Luft, Regen. Ich war sicher jetzt würde ich sterben. Setzte den Scheinwerfer in Gang & zurück mich anzukleiden. Es war falscher Alarm. Ich war furchtbar aufgeregt und stöhnte laut. Ich empfand die Schrecken des Krieges. Jetzt (abends) / habe ich den Schreck schon wieder überwunden. Ich werde mein Leben mit aller Kraft zu erhalten trachten wenn ich nicht meinen gegenwärtigen Sinn ändere.
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
    <p></p>
    <p>
    
    </p>
</div>
<div class="content recto">
    <p>Ms-101,7r[2] * 21 August 1914</p>
    <div class="entry">
    <p>
        <span class="eng">
        The lieutenant and I have already talked many times about all kinds of thing; a very nice man. He is able to get along with the biggest scoundrels and be friendly without compromising himself. When we hear a Chinese person we tend to take their speech for inarticulate gurgling. One who understands Chinese will perceive the language in it. In the same way, I’m often unable to perceive the human being in someone etc.    Worked a little, but without success.
        </span>
        <span class="tlp">
        The lieutenant and I have already talked many times about all kinds of thing; a very nice man. He is able to get along with the biggest scoundrels and be friendly without compromising himself. When we hear a Chinese person we tend to take their speech for inarticulate gurgling. One who understands Chinese will perceive the language in it. In the same way, I’m often unable to perceive the human being in someone etc.    Worked a little, but without success.
        </span>
        <span class="deu">
        Der Leutnant & ich haben schon oft über alles Mögliche gesprochen; ein sehr netter Mensch. Er kann mit den größten Halunken umgehen und freundlich sein ohne sich etwas zu vergeben. Wenn wir einen Chinesen hören so sind wir geneigt sein Sprechen für ein unartikuliertes Gurgeln zu halten. Einer der Chinesisch versteht wird darin die Sprache erkennen. So kann ich oft nicht den Menschen im Menschen erkennen etc.. Ein wenig aber erfolglos gearbeitet.
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
    <p></p>
    <p>
    
    </p>
</div>
<div class="content recto">
    <p>Ms-101,7r[3] et 8r[1]</p>
    <div class="entry">
    <p>
        <span class="eng">
        φ(x)       (x).φx (∃x).φx
        <br>φ(p)       φ((ζ) ψζ)
        </span>
        <span class="tlp">
           φ(x)       (x).φx (∃x).φx
        <br>φ(p)       φ((ζ) ψζ)
        </span>
        <span class="deu">
        φ(x)       (x).φx (∃x).φx
        <br>φ(p)       φ((ζ) ψζ)
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
    <p></p>
    <p>
    
    </p>
</div>
<div class="content recto">
    <p>Ms-101,8r[2]</p>
    <div class="entry">
    <p>
        <span class="eng">
        Will I never be able to do my work again?!! The devil alone knows. Will I ever have new ideas? All the notions distinctive of my work seem utterly “unfamiliar”  to me. I don't see anything at all!!! 
        </span>
        <span class="tlp">
        Will I never be able to do my work again?!! The devil alone knows. Will I ever have new ideas? All the notions distinctive of my work seem utterly “unfamiliar”  to me. I don't see anything at all!!! 
        </span>
        <span class="deu">
        Ob es jetzt für immer mit meinem Arbeiten aus ist?!! Das weiß der Teufel. Ob mir nie mehr etwas einfallen wird? Ich bin mit allen den Begriffen meiner Arbeit ganz & gar "unfamiliär". Ich sehe gar nichts!!!
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
   <div class="entry">
    <p>
        <span class="eng">
        
        </span>
        <span class="deu">
        
        </span>
    </p>
    </div>
</div>
<div class="content recto">
    <p>Ms-101,8r[3] * 22 August 1914</p>
    <div class="entry">
    <p>
        <span class="eng">
        Have been stuck on a sandbar for 3 days. Work, often with many interruptions, and so far completely unsuccessfully. Still can't come up with anything <u>solid</u>. Everything dissolves in fog. Go ahead!!!
        </span>
        <span class="tlp">
        Have been stuck on a sandbar for 3 days. Work, often with many interruptions, and so far completely unsuccessfully. Still can't come up with anything <u>solid</u>. Everything dissolves in fog. Go ahead!!!
        </span>
        <span class="deu">
        Stehen schon 3 Tage auf einer Sandbank. Arbeite oft mit vielen Unterbrechungen & bisher ganz erfolglos. Kann noch immer auf nichts <u>Festes</u> kommen. Alles geht in Dunst auf. Nur zu!!!
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
   <div class="entry">
    <p>
        <span class="eng">
        
        </span>
        <span class="deu">
        
        </span>
    </p>
    </div>
</div>
<div class="content recto">
    <p> Ms-101,8r[4] * 22 August 1914</p>
    <div class="entry">
    <p>
        <span class="eng">
          <a style="color:lightgreen">Logic must take care of itself.</a>
        </span>
        <span class="tlp">
        5.473 (1): <a style="color:lightgreen"><em>Logic must take care of itself.</a>
        </em></span>
        <span class="deu">
        Die Logik muß für sich selber sorgen.
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
   <div class="entry">
    <p>
        <span class="eng">
        
        </span>
        <span class="tlp">
        
        </span>
        <span class="deu">
        
        </span>
    </p>
    </div>
</div>
<div class="content recto">
    <p> Ms-101,8r[5] et 9r[1] * 22 August 1914 </p>
    <div class="entry">
    <p>
        <span class="eng">
          If syntactic rules for functions can be set up <u>at all</u>, then the whole theory of things, properties etc. is superfluous. It is also very remarkable that neither Basic Laws nor Principia Mathematica speak of such a theory. Once again: because logic must take care of itself. <a style="color:#f4ed7c">A <u>possible</u> sign must be able to signify too. Whatever is possible at all is also legitimate (permissible). Let’s remember the explanation why “Socrates is Plato” is nonsense. That is, because <u>we</u> have not set up an arbitrary convention, <u>not</u> because a sign is illegitimate in and of itself!</a>
          </span>
        <span class="tlp">
        5.473 (2-3): <a style="color:yellow"><em> A possible sign must also be able to signify. Everything which is possible in logic is also permitted. (“Socrates is identical” means nothing because there is no property which is called “identical”. The proposition is senseless because we have not made some arbitrary determination, not because the symbol is in itself unpermissible.)</a>
        </em></span>
        <span class="deu">
        Wenn sich syntaktische Regeln für Funktionen überhaupt aufstellen / lassen, dann ist die ganze Theorie der Dinge, Eigenschaften etc. überflüssig. Es ist auch gar zu auffällig daß weder in den „Grundgesetzen” noch in den „Principia Mathematica” von dieser Theorie die Rede ist. Nochmals: denn die Logik muß für sich selbst sorgen. Ein mögliches Zeichen muß auch bezeichnen können. Alles was überhaupt möglich ist, ist auch legitim || erlaubt. Erinnern wir uns an die Erklärung warum „Sokrates ist Plato” unsinnig ist. Nämlich darum weil wir eine willkürliche Bestimmung nicht getroffen haben, aber nicht darum weil das Zeichen an und für sich etwa illegitim sei!
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
   <div class="entry">
    <p>
        <span class="eng">
        
        </span>
        <span class="tlp">
        
        </span>
        <span class="deu">
        
        </span>
    </p>
    </div>
</div>
<div class="content recto">
    <p> Ms-101,9r[2] et 10r[1] et 11r[1] * 25 August 1914 </p>
    <div class="entry">
    <p>
        <span class="eng">
          Yesterday was an awful day. The searchlight wouldn’t work in the evening. When I wanted to examine it, the crew disrupted me with jeering, shouting, etc. Wanted to examine it more closely. The platoon leader took it from my hand. I can hardly go on writing. It was terrible. I saw one thing: there is not a single decent person in the whole crew.  But what should be my future attitude towards all that? Should I simply go on suffering? And what if I don't want to do that? Then I’ll have to live in a perpetual struggle. What is better? In the second case, I would certainly wear myself out. Maybe not in the first. It will be an extremely difficult time for me from now on because I have been betrayed and sold out just as I was long ago at school in Linz. Only one thing is necessary: to be able to contemplate everything that happens to you; collect yourself!  God help me!
          </span>
        <span class="tlp">
        Yesterday was an awful day. The searchlight wouldn’t work in the evening. When I wanted to examine it, the crew disrupted me with jeering, shouting, etc. Wanted to examine it more closely. The platoon leader took it from my hand. I can hardly go on writing. It was terrible. I saw one thing: there is not a single decent person in the whole crew.  But what should be my future attitude towards all that? Should I simply go on suffering? And what if I don't want to do that? Then I’ll have to live in a perpetual struggle. What is better? In the second case, I would certainly wear myself out. Maybe not in the first. It will be an extremely difficult time for me from now on because I have been betrayed and sold out just as I was long ago at school in Linz. Only one thing is necessary: to be able to contemplate everything that happens to you; collect yourself!  God help me!
          </span>
        <span class="deu">
        Gestern ein furchtbarer Tag. Abends wollte der Scheinwerfer nicht funktionieren. Als ich ihn untersuchen wollte wurde ich von der Mannschaft durch Zurufe / Grölen etc. gestört. Wollte ihn genauer untersuchen da nahm ihn der Zugsführer mir aus der Hand. Ich kann gar nicht weiter schreiben. Es war entsetzlich. Das Eine habe ich gesehen: Es ist nicht ein einziger anständiger Kerl in der ganzen Mannschaft. Wie aber soll ich mich in Zukunft zu dem Allen stellen? Soll ich einfach dulden? Und wenn ich das nicht tun will? Dann muß ich in einem fortwährenden Kampf leben. Was ist besser? Im 2. Fall würde ich mich sicher aufreiben. Im ersten vielleicht nicht. Es wird jetzt für mich eine enorm schwere Zeit kommen denn ich bin jetzt tatsächlich wieder so verkauft und verraten wie seinerzeit in der Schule in Linz. Nur eines ist nötig: Alles was einem geschieht betrachten / können; sich sammeln! Gott helfe mir!
        </span>
    </p>
    </div>
</div>
</div>


<div class="section">
<div class="bead"></div>
<div class="content verso">
   <div class="entry">
    <p>
        <span class="eng">
        
        </span>
        <span class="tlp">
        
        </span>
        <span class="deu">
        
        </span>
    </p>
    </div>
</div>
<div class="content recto">
    <p> Ms-101,11r[2] * 26 August 1914 </p>
    <div class="entry">
    <p>
        <span class="eng">
          Yesterday, I resolved to not put up any resistance. To make my exterior very light, so to speak, to leave my interior undisturbed.
          </span>
        <span class="tlp">
        Yesterday, I resolved to not put up any resistance. To make my exterior very light, so to speak, to leave my interior undisturbed.
           </span>
        <span class="deu">
        Habe mir gestern vorgenommen keinen Widerstand zu leisten. Mein Äußeres sozusagen ganz leicht zu machen um mein Inneres ungestört zu lassen.
        </span>
    </p>
    </div>
</div>
</div>


<div class="section">
<div class="bead"></div>
<div class="content verso">
   <div class="entry">
    <p>
        <span class="eng">
        
        </span>
        <span class="tlp">
        
        </span>
        <span class="deu">
        
        </span>
    </p>
    </div>
</div>
<div class="content recto">
    <p> Ms-101,11r[3] * 29 August 1914 </p>
    <div class="entry">
    <p>
        <span class="eng">
          Every night I stand on the command bridge until about 3:30 a.m. I have not yet fully carried out my plan of complete passivity. My comrades’ malice is still terrible to me. But just stay true to yourself! Get a little work done every day, yet still without any real success. Although some things are beginning to dawn.
          </span>
        <span class="tlp">
        Every night I stand on the command bridge until about 3:30 a.m. I have not yet fully carried out my plan of complete passivity. My comrades’ malice is still terrible to me. But just stay true to yourself! Get a little work done every day, yet still without any real success. Although some things are beginning to dawn.
        </span>
        <span class="deu">
        Jede Nacht stehe ich auf der Kommandobrücke bis etwa 3½ a.m. Mein Vorhaben der vollkommenen Passivität habe ich noch nicht recht ausgeführt. Die Niedertracht der Kameraden ist mir noch immer schrecklich. Aber nur bei sich bleiben! Arbeite täglich etwas aber noch ohne rechten Erfolg. Obwohl schon manches aufdämmert.
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
   <div class="entry">
    <p>
        <span class="eng">
        
        </span>
        <span class="tlp">
        
        </span>
        <span class="deu">
        
        </span>
    </p>
    </div>
</div>
<div class="content recto">
    <p> Ms-101,11r[4] et 12r[1] * 2 September 1914 </p>
    <div class="entry">
    <p>
        <span class="eng">
          Every night, except yesterday, on the searchlight. I sleep during the day.<br>
          This duty is pleasant to me insofar as it takes me further away from the malice of my comrades.  Yesterday we heard about an enormous battle that has already been going on for 5 days.  If only it were decisive! Masturbated yesterday for the first time in 3 weeks. I'm almost completely unsensual. While I used to imagine conversations with a friend, this almost never happens now. Work a little bit every day but am too tired and distracted. Yesterday I started reading Tolstoy's exposition of the Gospels.  A magnificent work. But it does not yet offer me what I expected from it.
          </span>
        <span class="tlp">
        Every night, except yesterday, on the searchlight. I sleep during the day.<br>
          This duty is pleasant to me insofar as it takes me further away from the malice of my comrades.  Yesterday we heard about an enormous battle that has already been going on for 5 days.  If only it were decisive! Masturbated yesterday for the first time in 3 weeks. I'm almost completely unsensual. While I used to imagine conversations with a friend, this almost never happens now. Work a little bit every day but am too tired and distracted. Yesterday I started reading Tolstoy's exposition of the Gospels.  A magnificent work. But it does not yet offer me what I expected from it.
          </span>
        <span class="deu">
        Jede Nacht mit Ausnahme von gestern beim Scheinwerfer. Am Tag schlafe ich.<br>
        / Dieser Dienst ist mir insofern angenehm als ich dadurch der Bosheit der Kameraden mehr entzogen bin Gestern hörten wir hier von einer enormen Schlacht die schon 5 Tage im Gang sei. Wäre es nur schon die Entscheidung! Gestern zum ersten Mal seit 3 Wochen onaniert. Bin fast ganz unsinnlich. Während ich mir früher immer Gespräche mit einem Freund vorstellte geschieht dies jetzt fast nie. Arbeite täglich ein ganz klein wenig bin aber zu müde und abgelenkt. Gestern fing ich an in Tolstois Erläuterungen zu den Evangelien zu lesen. Ein herrliches Werk. Es ist mir aber noch nicht das was ich davon erwartete.
        </span>
    </p>
    </div>
</div>
</div>


<div class="section">
<div class="bead"></div>
<div class="content verso">
   <div class="entry">
    <p>
        <span class="eng">
        
        </span>
        <span class="tlp">
        
        </span>
        <span class="deu">
        
        </span>
    </p>
    </div>
</div>
<div class="content recto">
    <p> Ms-101,12r[2] et 13r[1] * 2 September 1914 </p>
    <div class="entry">
    <p>
        <span class="eng">
          <a style="color:lightgreen">
          It must, in a certain sense be impossible for us to go wrong in logic.
          </a> This is already partly expressed by saying: Logic must take care for itself. This is an extremely profound & important insight.
          </span>
        <span class="tlp">
        5.473(2-3)**: <a style="color:lightgreen"><em>In a certain sense we cannot make mistakes in logic.</em></a>
        </span>
        <span class="deu">
        Wir müssen in einem gewissen Sinne uns nicht in der Logik irren können. Dies ist schon teilweise / darin ausgedrückt: Die Logik muß für sich selbst sorgen. Dies ist eine ungemein tiefe & wichtige Erkenntnis.
        </span>
    </p>
    </div>
</div>
</div>



<div class="section">
<div class="bead"></div>
<div class="content verso">
   <div class="entry">
    <p>
        <span class="eng">
        
        </span>
        <span class="tlp">
        
        </span>
        <span class="deu">
        
        </span>
    </p>
    </div>
</div>
<div class="content recto">
    <p> Ms-101,13r[2] * 2 September 1914 </p>
    <div class="entry">
    <p>
        <span class="eng">
          <a style="color:#f4ed7c">
          Frege says: any well-formed sentence must make sense. And I say: any possible sentence is well-formed, and, if it doesn’t make sense, that can only be because we have not given any meaning to some of its constituents. Even if we think we have.
          </a>
          </span>
        <span class="tlp">
        5.4733 (1-2)*: 	<a style="color:#f4ed7c"><em>Frege says: Every legitimately constructed proposition must have a sense; and I say: Every possible proposition is legitimately constructed, and if it has no sense this can only be because we have given no meaning to some of its constituent parts.
        <br>(Even if we believe that we have done so.)</em>
        </a>
        </span>
        <span class="pt">
        5.3064: <a style="color:#f4ed7c"><em>Frege says: any well-formed proposition must have a sense. And I say: any possible proposition is well-formed, and, if it doesn’t make sense, that can only be because we have failed to give a meaning to some of its constituents. Even if we think we have.</em>
        </a>
        </span>
        <span class="deu">
        Frege sagt: jeder rechtmäßig gebildete Satz muß einen Sinn haben und ich sage: jeder mögliche Satz ist rechtmäßig gebildet & wenn er keinen Sinn hat so kann das nur daran liegen daß wir einigen seiner Bestandteile keine Bedeutung gegeben haben. Wenn wir auch glauben es getan zu haben.
        </span>
    </p>
    </div>
</div>
</div>


<div class="section">
<div class="bead"></div>
<div class="content verso">
   <div class="entry">
    <p>
        <span class="eng">
        
        </span>
        <span class="tlp">
        
        </span>
        <span class="deu">
        
        </span>
    </p>
    </div>
</div>
<div class="content recto">
    <p> Ms-101,13r[3] * 3 September 1914 </p>
    <div class="entry">
    <p>
        <span class="eng">
          Worked yesterday, not completely unsuccessfully. Read Tolstoy with great profit.
          </span>
          <span class="tlp">
        Worked yesterday, not completely unsuccessfully. Read Tolstoy with great profit.
          </span>
        <span class="deu">
        Gestern nicht ganz erfolglos gearbeitet. In Tolstoi gelesen mit großem Gewinn.
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
   <div class="entry">
    <p>
        <span class="eng">
        
        </span>
        <span class="tlp">
        
        </span>
        <span class="deu">
        
        </span>
    </p>
    </div>
</div>
<div class="content recto">
    <p> Ms-101,13r[3] et 14r[1] * 3 September 1914 </p>
    <div class="entry">
    <p>
        <span class="eng">
          How can the task of philosophy be reconciled with logic’s having to look after itself? For example, if we ask: <a style="color:#ffab40">Is such and such a fact of the subject-predicate form?</a> / then we must know what we mean by the "subject-predicate form". We must know whether there is such a form at all. How can we know this? "From the signs!" But how? For we haven’t got any signs of this form. To be sure, we can say: We have signs that behave like those of the subject-predicate form, but does that prove that there really must be facts of this form? Namely: if those signs are completely analyzed. And here the question is again: Is there such a complete analysis? And if not: what is the task of philosophy then?!!?
          </span>
          <span class="tlp">
        4.1274 (2)**: <a style="color:#ffab40"><em>(So, for example, one cannot ask: “Are there unanalyzable subject-predicate sentences?”)</em></a>
        </span>
        <span class="deu">
        Wie ist es mit der Aufgabe der Philosophie vereinbar daß die Logik für sich selbst sorgen soll? Wenn wir z.B. fragen: ist die & die Tatsache von der Subjekt-Prädikat Form / dann müssen wir doch wissen was wir unter der „Subjekt-Prädikat Form” verstehen. Wir müssen wissen ob es so eine Form überhaupt gibt. Wie können wir dies wissen? „Aus den Zeichen!” Aber wie? Wir haben ja gar keine Zeichen von dieser Form. Wir können zwar sagen: Wir haben Zeichen die sich so benehmen wie solche von der Subjekt-Prädikat Form, aber beweist das daß es wirklich Tatsachen dieser Form geben muß? Nämlich: wenn diese vollständig analysiert sind. Und hier frägt es sich wieder: gibt es so eine vollständige Analyse? Und wenn nicht: Was ist denn dann die Aufgabe der Philosophie?!!?
        </span>
    </p>
    </div>
</div>
</div>



<div class="section">
<div class="bead"></div>
<div class="content verso">
   <div class="entry">
    <p>
        <span class="eng">
        
        </span>
        <span class="tlp">
        
        </span>
        <span class="deu">
        
        </span>
    </p>
    </div>
</div>
<div class="content recto">
    <p> Ms-101,14r[2] et 15r[1] * 3 September 1914 </p>
    <div class="entry">
    <p>
        <span class="eng">
          So we can ask ourselves: Does the subject-predicate form exist? Does the relational form exist? Do any / any of the forms exist at all that Russell and I have always spoken? (Russell would say: "Yes! Because that’s self-evident." Hah!)
          </span>
          <span class="tlp">
        So we can ask ourselves: Does the subject-predicate form exist? Does the relational form exist? Do any / any of the forms exist at all that Russell and I have always spoken? (Russell would say: "Yes! Because that’s self-evident." Hah!)
        </span>
        <span class="deu">
        Also können wir uns fragen: Gibt es die Subjekt-Prädikat Form? Gibt es die Relationsform? Gibt es überhaupt / irgend eine der Formen von denen Russell und ich immer gesprochen haben? (Russell würde sagen: „ja! denn das ist einleuchtend.” Jaha!)
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
   <div class="entry">
    <p>
        <span class="eng">
        
        </span>
        <span class="tlp">
        
        </span>
        <span class="deu">
        
        </span>
    </p>
    </div>
</div>
<div class="content recto">
    <p> Ms-101,15r[2] * 3 September 1914 </p>
    <div class="entry">
    <p>
        <span class="eng">
          So: if everything that needs to be shown is shown by the existence of subject-predicate sentences etc. then the task of philosophy is different from what I originally assumed. But if that is not so, then what is lacking would have to be shown by some kind of experience and I consider that to be out of the question.
          </span>
          <span class="tlp">
        So: if everything that needs to be shown is shown by the existence of subject-predicate sentences etc. then the task of philosophy is different from what I originally assumed. But if that is not so, then what is lacking would have to be shown by some kind of experience and I consider that to be out of the question.
        </span>
        <span class="deu">
        Also: wenn alles was gezeigt werden braucht durch die Existenz der Subjekt-Prädikat Sätze etc. gezeigt wird dann ist die Aufgabe der Philosophie eine andere als ich ursprünglich annahm. Wenn dem aber nicht so ist so müßte das Fehlende durch eine Art Erfahrung gezeigt werden und das halte ich für ausgeschlossen.
        </span>
    </p>
    </div>
</div>
</div>


<div class="section">
<div class="bead"></div>
<div class="content verso">
   <div class="entry">
    <p>
        <span class="eng">
        
        </span>
        <span class="tlp">
        
        </span>
        <span class="deu">
        
        </span>
    </p>
    </div>
</div>
<div class="content recto">
    <p> Ms-101,15r[3] * 3 September 1914 </p>
    <div class="entry">
    <p>
        <span class="eng">
          The obscurity obviously resides in the question “What does the logical identity of a sign and what it signifies really consist in?”! And this question is (once again) a principal way of framing the whole philosophical problem.
          </span>
          <span class="tlp">
        The obscurity obviously resides in the question “What does the logical identity of a sign and what it signifies really consist in?”! And this question is (once again) a principal way of framing the whole philosophical problem.
        </span>
        <span class="deu">
        Die Unklarheit liegt offenbar in der Frage worin eigentlich die logische Identität von Zeichen und Bezeichnetem besteht! Und diese Frage ist (wieder) eine Hauptansicht des ganzen philosophischen Problems.
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
    <p>Ms-101,16v[2] * 4 September 1914 </p>
   <div class="entry">
    <p>
        <span class="eng">
        Things are moving! – Pluck up courage!  - Work hard.
        </span>
        <span class="tlp">
        Things are moving! – Pluck up courage!  - Work hard.
        </span>
        <span class="deu">
        Es geht! — Nur Mut! — Arbeite viel.
        </span>
    </p>
    </div>
</div>
<div class="content recto">
    <p> Ms-101,16r[1] et 17r[1] * 3 September 1914 </p>
    <div class="entry">
    <p>
        <span class="eng">
          Consider some philosophical question, such as whether "A is good" is a subject-predicate proposition; or whether "A is brighter than B" is a relational proposition. How can such a question be resolved at all? What kind of evidence can reassure me that - for example - the first question must be answered in the affirmative? (This is an exceptionally important question). Is the only evidence here once again that extremely dubious "self-evidence"? Let's take a very similar question, which is however simpler & more fundamental, namely this one: Is a point in our visual field a "simple object", a thing? Up to now, I have always regarded such questions as the real philosophical ones - and they surely are in some sense - but / once again: what evidence could resolve such a question? Isn't there a mistake in the formulation of the qustion here, for it seems to me that nothing at all were self-evident to me about this question; it seems to me that I can say with certainty that these questions could never be resolved at all.
          </span>
          <span class="tlp">
        Consider some philosophical question, such as whether "A is good" is a subject-predicate proposition; or whether "A is brighter than B" is a relational proposition. How can such a question be resolved at all? What kind of evidence can reassure me that - for example - the first question must be answered in the affirmative? (This is an exceptionally important question). Is the only evidence here once again that extremely dubious "self-evidence"? Let's take a very similar question, which is however simpler & more fundamental, namely this one: Is a point in our visual field a "simple object", a thing? Up to now, I have always regarded such questions as the real philosophical ones - and they surely are in some sense - but / once again: what evidence could resolve such a question? Isn't there a mistake in the formulation of the qustion here, for it seems to me that nothing at all were self-evident to me about this question; it seems to me that I can say with certainty that these questions could never be resolved at all.
        </span>
        <span class="deu">
        Es sei eine Frage der Philosophie gegeben: etwa die ob „ A ist gut” ein Subjekt-Prädikat Satz sei; oder die ob „A ist heller als B” ein Relationssatz3 sei! Wie läßt sich so eine Frage überhaupt entscheiden?! Was für eine Evidenz kann mich darüber beruhigen daß – zum Beispiel – die erste Frage bejaht werden muß? (Dies ist eine ungemein wichtige Frage). Ist die einzige Evidenz hier wieder jenes höchst zweifelhafte „Einleuchten”?? Nehmen wir eine ganz ähnliche Frage die aber einfacher & grundlegender ist; nämlich diese: ist ein Punkt in unserem Gesichtsbild ein „einfacher Gegenstand”4, ein Ding? Solche Fragen habe ich doch bisher immer als die eigentlichen philosophischen angesehen – und sie sind es auch gewiß in einem Sinne – aber / nochmals: welche Evidenz könnte so eine Frage überhaupt entscheiden? Ist hier nicht ein Fehler in der Fragestellung denn es scheint als leuchtete mir über diese Frage gar nichts ein; es scheint als könnte ich mit Bestimmtheit sagen, daß diese Fragen überhaupt nie entschieden werden könnten.
        </span>
    </p>
    </div>
</div>
</div>

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
</div>


<div class="section">
<div class="bead"></div>
<div class="content verso">
    <p></p>
   <div class="entry">
    <p>
        <span class="eng">
        </span>
        <span class="tlp">
        </span>
        <span class="deu">
        </span>
    </p>
    </div>
</div>
<div class="content recto">
    <p>Ms-101,17r[3] et 18r[1] * 5 September 1914</p>
    <div class="entry">
    <p>
        <span class="eng">
          Suppose we had a sign that really was of the subject-predicate form, would this be somehow more suitable for expressing subject-predicate propositions than our subject-predicate sentences are? It seems not! / Does this arise from the signifying relation?
          </span>
          <span class="tlp">
        Suppose we had a sign that really was of the subject-predicate form, would this be somehow more suitable for expressing subject-predicate propositions than our subject-predicate sentences are? It seems not! / Does this arise from the signifying relation?
        </span>
        <span class="deu">
        Gesetzt den Fall wir hätten ein Zeichen das wirklich von der Subjekt-Prädikat Form wäre, wäre dieses für den Ausdruck von Subjekt-Prädikat Sätzen irgendwie geeigneter als unsere Subjekt-Prädikat Sätze? Es scheint nein! / Liegt das an der bezeichnenden Relation?
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
    <p>Ms-101,18v[2] * 6 September 1914 </p>
   <div class="entry">
    <p>
        <span class="eng">
        Still being tormented by most of the comrades, as before. I still haven't found any response to it that would be satisfactory. I have not yet opted for outright passivity. And that's probably foolish, because I'm powerless against all these men. I wear myself out uselessly if I defend myself.
        </span>
        <span class="tlp">
        Still being tormented by most of the comrades, as before. I still haven't found any response to it that would be satisfactory. I have not yet opted for outright passivity. And that's probably foolish, because I'm powerless against all these men. I wear myself out uselessly if I defend myself.
        </span>
        <span class="deu">
        Werde von den meisten Kameraden nach wie vor gequält. Ich habe noch immer kein Verhalten dagegen gefunden das zufriedenstellend wäre. Zur vollkommenen Passivität habe ich mich noch nicht entschlossen. Und wahrscheinlich ist das eine Torheit; denn ich bin ja gegen alle diese Menschen ohnmächtig. Ich reibe mich nutzlos auf wenn ich mich wehre.
        </span>
        </p>
    </div>
</div>
<div class="content recto">
    <p> Ms-101,18r[2] * 4 September 1914 </p>
    <div class="entry">
    <p>
        <span class="eng">
          If logic can be completed without answering certain questions then it must be completed without answering them.
          </span>
          <span class="tlp">
        If logic can be completed without answering certain questions then it must be completed without answering them.
        </span>
        <span class="deu">
        Wenn sich die Logik ohne die Beantwortung gewisser Fragen abschließen läßt dann muß sie ohne sie abgeschlossen werden.
        </span>
    </p>
    </div>
</div>`
    return content
}
