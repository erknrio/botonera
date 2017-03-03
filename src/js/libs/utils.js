"use strict";
exports.Utils = {
    "is_empty": function (data) {
        var count = 0, i;
        if (typeof data === 'number') {
            return false;
        }
        if (typeof data === 'boolean') {
            return !data;
        }
        if (data === undefined || data === null) {
            return true;
        }
        if (data.length !== undefined) {
            return data.length === 0;
        }
        for (i in data) {
            if (data.hasOwnProperty(i)) {
                count += 1;
            }
        }
        return count === 0;
    },
    "httpPost": function (params, callbacks) {
        if (params === void 0) { params = {
            "url": "",
            "data": {},
        }; }
        if (callbacks === void 0) { callbacks = {
            "done": function (response) { },
            "fail": function () { }
        }; }
        var xmlHttp = new XMLHttpRequest();
        try {
            xmlHttp.open("POST", params.url, true);
            xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4) {
                    switch (xmlHttp.status) {
                        case 200:
                            callbacks.done(xmlHttp.responseText);
                            break;
                        default:
                            callbacks.fail();
                    }
                }
                else {
                    callbacks.fail();
                }
            };
            xmlHttp.send(params.data);
        }
        catch (err) {
            window.console.error("Http post error: " + err.message);
        }
    }
};
