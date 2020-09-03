"use strict";
exports.__esModule = true;
exports.ModelUserLog = void 0;
var ModelUserLog = /** @class */ (function () {
    function ModelUserLog(id, idUser, sourceUrl, targetUrl, descriptions, timestamp) {
        if (id === void 0) { id = ''; }
        if (idUser === void 0) { idUser = ''; }
        if (sourceUrl === void 0) { sourceUrl = ''; }
        if (targetUrl === void 0) { targetUrl = ''; }
        if (descriptions === void 0) { descriptions = ''; }
        if (timestamp === void 0) { timestamp = {}; }
        this.id = id;
        this.idUser = idUser;
        this.sourceUrl = sourceUrl;
        this.targetUrl = targetUrl;
        this.descriptions = descriptions;
        this.timestamp = timestamp;
    }
    return ModelUserLog;
}());
exports.ModelUserLog = ModelUserLog;
