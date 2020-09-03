"use strict";
exports.__esModule = true;
exports.ModelUserPresence = void 0;
var ModelUserPresence = /** @class */ (function () {
    function ModelUserPresence(id, userEmail, status, timestamp) {
        if (id === void 0) { id = ''; }
        if (userEmail === void 0) { userEmail = ''; }
        if (status === void 0) { status = ''; }
        if (timestamp === void 0) { timestamp = 0; }
        this.id = id;
        this.userEmail = userEmail;
        this.status = status;
        this.timestamp = timestamp;
    }
    return ModelUserPresence;
}());
exports.ModelUserPresence = ModelUserPresence;
