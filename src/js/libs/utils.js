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
    }
};
