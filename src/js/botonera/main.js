"use strict";
var NumberCodes_class_1 = require("../classes/NumberCodes.class");
(function () {
    'use strict';
    function initEvents() {
        var elements, element;
        var numberCodes = new NumberCodes_class_1.NumberCodes();
        document.addEventListener("keyup", numberCodes.getNunmberCode);
        elements = document.querySelectorAll(".btn-number-code");
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            element = elements_1[_i];
            element.addEventListener("click", numberCodes.getNunmberCode);
            element.addEventListener("touchend", numberCodes.getNunmberCode);
        }
    }
    document.addEventListener("DOMContentLoaded", function (event) {
        initEvents();
    });
}());
