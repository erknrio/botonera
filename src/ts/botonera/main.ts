// Imports
import { Codes } from "../classes/Codes.class";

(function () {
    'use strict';
    var timeTimeout:any,
    // Init NumberCode class
    codesObj = new Codes();

    function sendCode(ev) {
        ev.preventDefault();
        ev.stopImmediatePropagation();
        var code: string = (<HTMLInputElement>document.getElementById("checkin-code")).value;
        codesObj.post(code);
    }

    function eraseLastCode(ev?: any) {
        ev.stopImmediatePropagation();
        var element = (<HTMLInputElement>document.getElementById("checkin-code"));
        element.value = element.value.slice(0, -1);
    }

    function resetCode(ev?: any) {
        if (typeof ev != "undefined") {
            ev.stopImmediatePropagation();
        }

        (<HTMLInputElement>document.getElementById("checkin-code")).value = '';
    }

    function setInactivityTime(set = true) {
        var maxInactivityTime:number = 20000;
        try {
            if (set) {
                timeTimeout = window.setTimeout(function() {
                    resetCode();
                    window.console.log("Timeout code reseted");
                    (<HTMLInputElement>document.getElementById("checkin-code")).value = 'Tiempo de espera superado';
                    window.setTimeout(function() {
                        resetCode();
                    }, 2000);
                }, maxInactivityTime);
            } else {
                window.clearTimeout(timeTimeout);
            }
        } catch(err) {
            window.console.error("Error: " + err.message);
        }
    }

    function resetInactivityTime(ev) {
        ev.stopImmediatePropagation();
        setInactivityTime(false);
        setInactivityTime(true);
    }

    function init() {
        var elements: any,
        element: any;
        // EVENTS
        // NOTE Important
        // We use .bind() because Codes class this
        // doesn't have the right scope. It reference to
        // input text instead of class itselft.
        try {
            // Event keyboard input
            document.addEventListener("keyup", codesObj.checkKeyboardCode.bind(codesObj));
            // Event click number
            elements = document.querySelectorAll(".btn-number-code");
            for (element of elements) {
                element.addEventListener("click", codesObj.checkKeyboardCode.bind(codesObj));
                element.addEventListener("touchend", codesObj.checkKeyboardCode.bind(codesObj));
            }
            // Event clean code
            element = document.getElementById("btn-reset-code");
            element.addEventListener("click", resetCode);
            element.addEventListener("touchend", resetCode);
            // Event erase last code
            element = document.getElementById("btn-erase-code");
            element.addEventListener("click", eraseLastCode);
            element.addEventListener("touchend", eraseLastCode);
            // Event send code
            element = document.getElementById("btn-send-code");
            element.addEventListener("click", sendCode);
            element.addEventListener("touchend", sendCode);
            // Event inactivity time
            document.addEventListener("click", resetInactivityTime);
            document.addEventListener("mousemove", resetInactivityTime);
            document.addEventListener("keypress", resetInactivityTime);
            document.addEventListener("touchstart", resetInactivityTime);
            document.addEventListener("scroll", resetInactivityTime);
            // INIT FUNCTIONS
            setInactivityTime();
        } catch(err) {
            window.console.error("Error: " + err.message);
        }
    }

    document.addEventListener("DOMContentLoaded", function (event) {
        init();
    });
}());
