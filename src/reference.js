let sectionsJson = require('./js/sectionsJson.json');
let ptSectionsJson = require('./js/ptSectionsJson.json');
let linesJson = require('./js/linesJson.json');
let ptLinesJson = require('./js/ptLinesJson.json');
//todo - add more references here that are imported on each page
export var Reference;
(function (Reference) {
    class Ref {
        constructor() {
            this._sectionsJson = sectionsJson;
            this._ptSectionsJson = ptSectionsJson;
            this._linesJson = linesJson;
            this._ptLinesJson = ptLinesJson;
        }
        get sectionsJson() {
            return this._sectionsJson;
        }
        set sectionsJson(value) {
            this._sectionsJson = value;
        }
        get ptSectionsJson() {
            return this._ptSectionsJson;
        }
        set ptSectionsJson(value) {
            this._ptSectionsJson = value;
        }
        get linesJson() {
            return this._linesJson;
        }
        set linesJson(value) {
            this._linesJson = value;
        }
        get ptLinesJson() {
            return this._ptLinesJson;
        }
        set ptLinesJson(value) {
            this._ptLinesJson = value;
        }
    }
    Reference.Ref = Ref;
})(Reference || (Reference = {}));
