"use strict";
exports.__esModule = true;
exports.Dto = void 0;
/**
 * Data Transfer Object
 * is a container.
 */
var Dto = /** @class */ (function () {
    function Dto(id, url, targetUrl, refUrl, aggregateUrl, payload, timestamp) {
        if (id === void 0) { id = ''; }
        if (url === void 0) { url = ''; }
        if (targetUrl === void 0) { targetUrl = ''; }
        if (refUrl === void 0) { refUrl = {}; }
        if (aggregateUrl === void 0) { aggregateUrl = ''; }
        if (payload === void 0) { payload = {}; }
        if (timestamp === void 0) { timestamp = {}; }
        this.id = id;
        this.url = url;
        this.targetUrl = targetUrl;
        this.refUrl = refUrl;
        this.aggregateUrl = aggregateUrl;
        this.payload = payload;
        this.timestamp = timestamp;
    }
    return Dto;
}());
exports.Dto = Dto;
