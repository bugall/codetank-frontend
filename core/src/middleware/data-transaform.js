"use strict";
/// <reference path='../../typings/tsd.d.ts' />
var b = require('websocket');
var Transform = (function () {
    function Transform(host, port) {
        this._host = "";
        this._port = 80;
        this._host = host;
        this._port = port || 80;
    }
    Transform.prototype.createConnection = function () {
        console.log(b);
    };
    return Transform;
}());
exports.Transform = Transform;
//# sourceMappingURL=data-transaform.js.map