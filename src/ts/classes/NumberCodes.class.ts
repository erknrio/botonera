import { Utils } from "../libs/utils";

export class NumberCodes {
    private _params: Object = {};
    constructor(receivedParams?: Object) {
        if (typeof receivedParams != "undefined") {
            this._params = receivedParams;
        }
    }

    get params(): Object {
        return this._params;
    }

    set params(newParams: Object) {
        if (typeof newParams != "undefined") {
            this._params = newParams;
        }
    }

    public getNunmberCode(ev) {
        var attr: string = '';
        try {
            if (Utils.is_empty(ev.currentTarget.getAttribute)) {
                console.log(ev.keyCode);
            } else {
                attr = ev.currentTarget.getAttribute("data-btn-number");
                if (Utils.is_empty(attr)) {
                    console.log(ev.keyCode);
                } else {
                    console.log(attr);
                }
            }
        } catch(error) {
            console.error("Number Code Error : " + error.message);
        }
    }
}
