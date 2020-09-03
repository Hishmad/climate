"use strict";
exports.__esModule = true;
exports.ModelUser = void 0;
var ModelUser = /** @class */ (function () {
    function ModelUser(id, userEmail, listOfLikes, timestamp) {
        if (userEmail === void 0) { userEmail = ''; }
        if (listOfLikes === void 0) { listOfLikes = []; }
        if (timestamp === void 0) { timestamp = {}; }
        this.id = id;
        this.userEmail = userEmail;
        this.listOfLikes = listOfLikes;
        this.timestamp = timestamp;
    }
    return ModelUser;
}());
exports.ModelUser = ModelUser;
