"use strict";
var utils_1 = require("../libs/utils");
var Codes = (function () {
    function Codes(receivedParams) {
        this.maxNumCodes = 0;
        this._keyPressed = -1;
        this._apiURL = 'http://google.es/';
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
    Codes.prototype.getProperty = function (property) {
        if (this.hasOwnProperty(property)) {
            return this[property];
        }
    };
    Codes.prototype.setProperty = function (property, newKey) {
        if (!utils_1.Utils.is_empty(property) && !utils_1.Utils.is_empty(newKey)) {
            switch (property) {
                case 'keyPressed':
                case 'maxNumCodes':
                    this["_" + property] = parseInt(newKey, 10);
                    break;
            }
        }
    };
    Codes.prototype.getKeyboardCode = function (event) {
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
    Codes.prototype.insertHtmlNumberCode = function () {
        var htmlElement = document.getElementById("checkin-code"), currentCode = '';
        try {
            if (this._keyPressed == -1) {
                throw "Code not found";
            }
            else {
                currentCode = htmlElement.value;
                if (this.maxNumCodes == 0 || currentCode.length <= this.maxNumCodes) {
                    currentCode += this._keyPressed.toString();
                    htmlElement.value = currentCode;
                }
                else {
                    window.alert("No puede introducir m\u00E1s n\u00FAmeros");
                    throw "Max code length reached";
                }
            }
        }
        catch (err) {
            window.console.error("Error inserting code: " + err.message);
        }
    };
    Codes.prototype.checkKeyboardCode = function (ev) {
        ev.stopImmediatePropagation();
        var keyboardCode = this.getKeyboardCode(ev), keyboardCodeToNumber = {
            "49": 1,
            "50": 2,
            "51": 3,
            "52": 4,
            "53": 5,
            "54": 6,
            "55": 7,
            "56": 8,
            "57": 9,
            "97": 1,
            "98": 2,
            "99": 3,
            "100": 4,
            "101": 5,
            "102": 6,
            "103": 7,
            "104": 8,
            "105": 9,
        }, number = -1;
        try {
            if (utils_1.Utils.is_empty(keyboardCode)) {
                throw "Keyboard code not found";
            }
            else {
                if (keyboardCodeToNumber.hasOwnProperty(keyboardCode)) {
                    number = parseInt(keyboardCodeToNumber[keyboardCode], 10);
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
    Codes.prototype.post = function (data) {
        var params = {}, callbacks = {};
        params = {
            "url": this._apiURL,
            "data": 'userid=' + data
        };
        callbacks = {
            "done": function () {
                window.alert("Enviado");
            },
            "fail": function (response) {
                window.alert("Fallo al enviar");
            }
        };
        utils_1.Utils.httpPost(params, callbacks);
    };
    return Codes;
}());
exports.Codes = Codes;
