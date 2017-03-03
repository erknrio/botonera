import { Utils } from "../libs/utils";

export class Codes {
    public maxNumCodes: number = 0;// 0 == unlimited
    private _keyPressed: number = -1;
    private _apiURL: string = 'http://google.es/';
    constructor(receivedParams?: Object) {
        var param: any;
        if (typeof receivedParams != "undefined") {
            for (param in receivedParams) {
                switch(param) {
                    case 'keyPressed':
                    case 'maxNumCodes':
                        this["_" + param] = parseInt(receivedParams[param], 10);
                        break;
                }
            }
        }
    }

    public getProperty(property: string):any {
        if (this.hasOwnProperty(property)) {
            return this[property];
        }
    }

    public setProperty(property: string, newKey: any) {
        if (!Utils.is_empty(property) && ! Utils.is_empty(newKey)) {
            switch(property) {
                case 'keyPressed':
                case 'maxNumCodes':
                    this["_" + property] = parseInt(newKey, 10);
                    break;
            }
        }
    }

    private getKeyboardCode(event: any): string {
        var attr: string = '';
        try {
            if (Utils.is_empty(event.currentTarget.getAttribute)) {
                return event.keyCode;
            } else {
                attr = event.currentTarget.getAttribute("data-btn-number");
                if (Utils.is_empty(attr)) {
                    return event.keyCode;
                } else {
                    return attr;
                }
            }
        } catch(error) {
            window.console.error("Keyboard Code Error : " + error.message);
            return '';
        }
    }

    private insertHtmlNumberCode() {
        var htmlElement = <HTMLInputElement>document.getElementById("checkin-code"),
        currentCode: string = '';
        try {
            if (this._keyPressed == -1) {
                throw "Code not found";
            } else {
                currentCode = htmlElement.value;
                if (this.maxNumCodes == 0 || currentCode.length <= this.maxNumCodes) {
                    currentCode += this._keyPressed.toString();
                    htmlElement.value = currentCode;
                } else {
                    window.alert("No puede introducir m\u00E1s n\u00FAmeros");
                    throw "Max code length reached";
                }
            }
        } catch(err) {
            window.console.error("Error inserting code: " + err.message);
        }
    }

    public checkKeyboardCode(ev?: any): void {
        ev.stopImmediatePropagation();
        var keyboardCode: any = this.getKeyboardCode(ev),
        keyboardCodeToNumber = {
            "49": 1,
            "50": 2,
            "51": 3,
            "52": 4,
            "53": 5,
            "54": 6,
            "55": 7,
            "56": 8,
            "57": 9,
            "97": 1,// numpads
            "98": 2,
            "99": 3,
            "100": 4,
            "101": 5,
            "102": 6,
            "103": 7,
            "104": 8,
            "105": 9,
        },
        number: number = -1;

        try {
            if (Utils.is_empty(keyboardCode)) {
                throw "Keyboard code not found";
            } else {
                if (keyboardCodeToNumber.hasOwnProperty(keyboardCode)) {
                    number = parseInt(keyboardCodeToNumber[keyboardCode], 10);
                }

                this._keyPressed = number;
                this.insertHtmlNumberCode();
            }
        } catch(err) {
            window.console.error("Check keyboard error: " + err.message);
            this._keyPressed = -1;
        }
    }
    /////////////////
    /// REST API ///
    ////////////////
    public post(data: string) {
        var params: any = {},
        callbacks: any = {};

        params = {
            "url": this._apiURL,
            "data": 'userid=' + data
        };

        callbacks = {
            "done": function() {
                window.alert("Enviado");
            },
            "fail": function(response: any) {
                window.alert("Fallo al enviar");
            }
        }
        Utils.httpPost(params, callbacks);
    }
}
