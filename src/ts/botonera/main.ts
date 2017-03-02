import { NumberCodes } from "../classes/NumberCodes.class";
(function () {
    'use strict';

    function initEvents() {
        var elements: any,
        element: any;
        // Init NumberCode class
        var numberCodes = new NumberCodes();
        // Events
        document.addEventListener("keyup", numberCodes.getNunmberCode);

        elements = document.querySelectorAll(".btn-number-code");

        for (element of elements) {
            element.addEventListener("click", numberCodes.getNunmberCode);
            element.addEventListener("touchend", numberCodes.getNunmberCode);
        }
    }
    document.addEventListener("DOMContentLoaded", function (event) {
        initEvents();
    });
}());
