var sectionsJson = require('./js/sectionsJson.json');
var ptSectionsJson = require('./js/ptSectionsJson.json');
var linesJson = require('./js/linesJson.json');
var ptLinesJson = require('./js/ptLinesJson.json');

//todo - add more references here that are imported on each page
export module Reference {
    export class Ref {
        private _sectionsJson:any = sectionsJson;
        private _ptSectionsJson:any = ptSectionsJson;
        private _linesJson:any = linesJson;
        private _ptLinesJson:any = ptLinesJson;

        get sectionsJson(): any {
            return this._sectionsJson;
        }

        set sectionsJson(value: any) {
            this._sectionsJson = value;
        }

        get ptSectionsJson(): any {
            return this._ptSectionsJson;
        }

        set ptSectionsJson(value: any) {
            this._ptSectionsJson = value;
        }

        get linesJson(): any {
            return this._linesJson;
        }

        set linesJson(value: any) {
            this._linesJson = value;
        }

        get ptLinesJson(): any {
            return this._ptLinesJson;
        }

        set ptLinesJson(value: any) {
            this._ptLinesJson = value;
        }
    }
}