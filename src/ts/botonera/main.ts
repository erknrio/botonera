import { KeyboardCodes } from "../classes/KeyboardCodes.class";
(function () {
    'use strict';

    function initEvents() {
        var elements: any,
        element: any;
        // Init NumberCode class
        var keyboardCodes = new KeyboardCodes();
        // Events
        // We use .bind() because KeyboardCodes class this
        // doesn't have the right scope. It reference to
        // input text instead of class itselft.
        document.addEventListener("keyup", keyboardCodes.checkKeyboardCode.bind(keyboardCodes));

        elements = document.querySelectorAll(".btn-number-code");
        for (element of elements) {
            element.addEventListener("click", keyboardCodes.checkKeyboardCode.bind(keyboardCodes));
            element.addEventListener("touchend", keyboardCodes.checkKeyboardCode.bind(keyboardCodes));
        }
    }
    document.addEventListener("DOMContentLoaded", function (event) {
        initEvents();
    });
}());
