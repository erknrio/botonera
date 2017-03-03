"use strict";
var Codes_class_1 = require("../classes/Codes.class");
(function () {
    'use strict';
    var timeTimeout, codesObj = new Codes_class_1.Codes();
    function sendCode(ev) {
        ev.preventDefault();
        ev.stopImmediatePropagation();
        var code = document.getElementById("checkin-code").value;
        codesObj.post(code);
    }
    function eraseLastCode(ev) {
        ev.stopImmediatePropagation();
        var element = document.getElementById("checkin-code");
        element.value = element.value.slice(0, -1);
    }
    function resetCode(ev) {
        if (typeof ev != "undefined") {
            ev.stopImmediatePropagation();
        }
        document.getElementById("checkin-code").value = '';
    }
    function setInactivityTime(set) {
        if (set === void 0) { set = true; }
        var maxInactivityTime = 20000;
        try {
            if (set) {
                timeTimeout = window.setTimeout(function () {
                    resetCode();
                    window.console.log("Timeout code reseted");
                    document.getElementById("checkin-code").value = 'Tiempo de espera superado';
                    window.setTimeout(function () {
                        resetCode();
                    }, 2000);
                }, maxInactivityTime);
            }
            else {
                window.clearTimeout(timeTimeout);
            }
        }
        catch (err) {
            window.console.error("Error: " + err.message);
        }
    }
    function resetInactivityTime(ev) {
        ev.stopImmediatePropagation();
        setInactivityTime(false);
        setInactivityTime(true);
    }
    function init() {
        var elements, element;
        try {
            document.addEventListener("keyup", codesObj.checkKeyboardCode.bind(codesObj));
            elements = document.querySelectorAll(".btn-number-code");
            for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
                element = elements_1[_i];
                element.addEventListener("click", codesObj.checkKeyboardCode.bind(codesObj));
                element.addEventListener("touchend", codesObj.checkKeyboardCode.bind(codesObj));
            }
            element = document.getElementById("btn-reset-code");
            element.addEventListener("click", resetCode);
            element.addEventListener("touchend", resetCode);
            element = document.getElementById("btn-erase-code");
            element.addEventListener("click", eraseLastCode);
            element.addEventListener("touchend", eraseLastCode);
            element = document.getElementById("btn-send-code");
            element.addEventListener("click", sendCode);
            element.addEventListener("touchend", sendCode);
            document.addEventListener("click", resetInactivityTime);
            document.addEventListener("mousemove", resetInactivityTime);
            document.addEventListener("keypress", resetInactivityTime);
            document.addEventListener("touchstart", resetInactivityTime);
            document.addEventListener("scroll", resetInactivityTime);
            setInactivityTime();
        }
        catch (err) {
            window.console.error("Error: " + err.message);
        }
    }
    document.addEventListener("DOMContentLoaded", function (event) {
        init();
    });
}());
