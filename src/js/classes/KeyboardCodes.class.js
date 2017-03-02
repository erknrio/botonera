"use strict";
var utils_1 = require("../libs/utils");
var KeyboardCodes = (function () {
    function KeyboardCodes(receivedParams) {
        this._keyPressed = -1;
        this._maxNumCodes = 8;
        var param;
        if (typeof receivedParams != "undefined") {
            for (param in receivedParams) {
                switch (param) {
                    case 'keyPressed':
                    case 'maxNumCodes':
                        this["_" + param] = parseInt(receivedParams[param], 10);
                        break;
                }
            }
        }
    }
    KeyboardCodes.prototype.getProperty = function (property) {
        if (this.hasOwnProperty(property)) {
            return this[property];
        }
    };
    KeyboardCodes.prototype.setProperty = function (property, newKey) {
        if (!utils_1.Utils.is_empty(property) && !utils_1.Utils.is_empty(newKey)) {
            switch (property) {
                case 'keyPressed':
                case 'maxNumCodes':
                    this["_" + property] = parseInt(newKey, 10);
                    break;
            }
        }
    };
    Object.defineProperty(KeyboardCodes.prototype, "maxNumCodes", {
        set: function (newKey) {
            if (utils_1.Utils.is_empty(newKey)) {
                this._maxNumCodes = Math.floor(newKey);
            }
        },
        enumerable: true,
        configurable: true
    });
    KeyboardCodes.prototype.getKeyboardCode = function (event) {
        var attr = '';
        try {
            if (utils_1.Utils.is_empty(event.currentTarget.getAttribute)) {
                return event.keyCode;
            }
            else {
                attr = event.currentTarget.getAttribute("data-btn-number");
                if (utils_1.Utils.is_empty(attr)) {
                    return event.keyCode;
                }
                else {
                    return attr;
                }
            }
        }
        catch (error) {
            window.console.error("Keyboard Code Error : " + error.message);
            return '';
        }
    };
    KeyboardCodes.prototype.insertHtmlNumberCode = function () {
        var htmlElement = document.getElementById("checkin-code"), currentCode = '';
        try {
            if (this._keyPressed == -1) {
                throw "Code not found";
            }
            else {
                currentCode = htmlElement.value;
                currentCode += this._keyPressed.toString();
                htmlElement.value = currentCode;
            }
        }
        catch (err) {
            window.console.error("Error inserting code: " + err.message);
        }
    };
    KeyboardCodes.prototype.checkKeyboardCode = function (ev) {
        var keyboardCode;
        var keyboardCodeToNumber = {
            "48": 0,
            "49": 1,
            "50": 2,
            "51": 3,
            "52": 4,
            "53": 5,
            "54": 6,
            "55": 7,
            "56": 8,
            "57": 9,
        }, number = -1;
        keyboardCode = this.getKeyboardCode(ev);
        try {
            if (utils_1.Utils.is_empty(keyboardCode)) {
                throw "Keyboard code not found";
            }
            else {
                if (keyboardCodeToNumber.hasOwnProperty(keyboardCode)) {
                    number = parseInt(keyboardCodeToNumber[keyboardCode], 10);
                }
                else {
                    number = parseInt(keyboardCode, 10);
                }
                this._keyPressed = number;
                this.insertHtmlNumberCode();
            }
        }
        catch (err) {
            window.console.error("Check keyboard error: " + err.message);
            this._keyPressed = -1;
        }
    };
    return KeyboardCodes;
}());
exports.KeyboardCodes = KeyboardCodes;
