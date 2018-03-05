"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sectionsJson = require('./js/sectionsJson.json');
var ptSectionsJson = require('./js/ptSectionsJson.json');
var linesJson = require('./js/linesJson.json');
var ptLinesJson = require('./js/ptLinesJson.json');
//todo - add more references here that are imported on each page
var Reference;
(function (Reference) {
    var Ref = /** @class */ (function () {
        function Ref() {
            this._sectionsJson = sectionsJson;
            this._ptSectionsJson = ptSectionsJson;
            this._linesJson = linesJson;
            this._ptLinesJson = ptLinesJson;
        }
        Object.defineProperty(Ref.prototype, "sectionsJson", {
            get: function () {
                return this._sectionsJson;
            },
            set: function (value) {
                this._sectionsJson = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ref.prototype, "ptSectionsJson", {
            get: function () {
                return this._ptSectionsJson;
            },
            set: function (value) {
                this._ptSectionsJson = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ref.prototype, "linesJson", {
            get: function () {
                return this._linesJson;
            },
            set: function (value) {
                this._linesJson = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ref.prototype, "ptLinesJson", {
            get: function () {
                return this._ptLinesJson;
            },
            set: function (value) {
                this._ptLinesJson = value;
            },
            enumerable: true,
            configurable: true
        });
        return Ref;
    }());
    Reference.Ref = Ref;
})(Reference = exports.Reference || (exports.Reference = {}));
//# sourceMappingURL=reference.js.map