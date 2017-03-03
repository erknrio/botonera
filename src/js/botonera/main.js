"use strict";
var KeyboardCodes_class_1 = require("../classes/KeyboardCodes.class");
(function () {
    'use strict';
    function resetCode() {
        document.getElementById("checkin-code").value = '';
    }
    function initEvents() {
        var elements, element;
        var keyboardCodes = new KeyboardCodes_class_1.KeyboardCodes();
        document.addEventListener("keyup", keyboardCodes.checkKeyboardCode.bind(keyboardCodes));
        elements = document.querySelectorAll(".btn-number-code");
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            element = elements_1[_i];
            element.addEventListener("click", keyboardCodes.checkKeyboardCode.bind(keyboardCodes));
            element.addEventListener("touchend", keyboardCodes.checkKeyboardCode.bind(keyboardCodes));
        }
        elements = document.querySelectorAll("#btn-reset-code");
        for (var _a = 0, elements_2 = elements; _a < elements_2.length; _a++) {
            element = elements_2[_a];
            element.addEventListener("click", resetCode);
            element.addEventListener("touchend", resetCode);
        }
    }
    document.addEventListener("DOMContentLoaded", function (event) {
        initEvents();
    });
}());
