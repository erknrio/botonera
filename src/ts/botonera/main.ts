import { KeyboardCodes } from "../classes/KeyboardCodes.class";
(function () {
    'use strict';

    function resetCode() {
        (<HTMLInputElement>document.getElementById("checkin-code")).value = '';
    }

    function initEvents() {
        var elements: any,
        element: any;
        // Init NumberCode class
        var keyboardCodes = new KeyboardCodes();
        // Events
        // NOTE Important
        // We use .bind() because KeyboardCodes class this
        // doesn't have the right scope. It reference to
        // input text instead of class itselft.

        // Event keyboard input
        document.addEventListener("keyup", keyboardCodes.checkKeyboardCode.bind(keyboardCodes));
        // Event click numbers
        elements = document.querySelectorAll(".btn-number-code");
        for (element of elements) {
            element.addEventListener("click", keyboardCodes.checkKeyboardCode.bind(keyboardCodes));
            element.addEventListener("touchend", keyboardCodes.checkKeyboardCode.bind(keyboardCodes));
        }
        // Event clean codes
        elements = document.querySelectorAll("#btn-reset-code");
        for (element of elements) {
            element.addEventListener("click", resetCode);
            element.addEventListener("touchend", resetCode);
        }
    }
    document.addEventListener("DOMContentLoaded", function (event) {
        initEvents();
    });
}());
