interface customAny {
    anything: any;
}

export var Utils = {
    "is_empty": function(data) {
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
    "httpPost": function(params = {
        "url": "",
        "data": {},
        }, callbacks = {
            "done": function(response: any) {},
            "fail": function() {}
        }) {
            var xmlHttp: any = new XMLHttpRequest();

            try {
                xmlHttp.open("POST", params.url, true);

                //Send the proper header information along with the request
                xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

                xmlHttp.onreadystatechange = function() {//Call a function when the state changes.
                    if(xmlHttp.readyState == 4) {
                        switch(xmlHttp.status) {
                            case 200:
                                callbacks.done(xmlHttp.responseText);
                            break;
                            default:
                                callbacks.fail();
                        }
                    } else {
                        callbacks.fail();
                    }
                }
                xmlHttp.send(params.data);
            } catch(err) {
                window.console.error("Http post error: " + err.message);
            }
    }
}
