"use strict";
var utils_1 = require("../libs/utils");
var NumberCodes = (function () {
    function NumberCodes(receivedParams) {
        this._params = {};
        if (typeof receivedParams != "undefined") {
            this._params = receivedParams;
        }
    }
    Object.defineProperty(NumberCodes.prototype, "params", {
        get: function () {
            return this._params;
        },
        set: function (newParams) {
            if (typeof newParams != "undefined") {
                this._params = newParams;
            }
        },
        enumerable: true,
        configurable: true
    });
    NumberCodes.prototype.getNunmberCode = function (ev) {
        var attr = '';
        try {
            if (utils_1.Utils.is_empty(ev.currentTarget.getAttribute)) {
                console.log(ev.keyCode);
            }
            else {
                attr = ev.currentTarget.getAttribute("data-btn-number");
                if (utils_1.Utils.is_empty(attr)) {
                    console.log(ev.keyCode);
                }
                else {
                    console.log(attr);
                }
            }
        }
        catch (error) {
            console.error("Number Code Error : " + error.message);
        }
    };
    return NumberCodes;
}());
exports.NumberCodes = NumberCodes;
