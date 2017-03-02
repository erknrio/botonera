"use strict";
var KeyboardCodes_class_1 = require("../classes/KeyboardCodes.class");
(function () {
    'use strict';
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
    }
    document.addEventListener("DOMContentLoaded", function (event) {
        initEvents();
    });
}());
