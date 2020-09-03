"use strict";
exports.__esModule = true;
exports.ModelUserAdmin = void 0;
var ModelUserAdmin = /** @class */ (function () {
    function ModelUserAdmin(id, /** the UID */ userEmail, userName, accessLevel, /** from 0 to 9, 9 is the supervisor access */ idAdmin, timestamp) {
        if (id === void 0) { id = ''; }
        if (userEmail === void 0) { userEmail = ''; }
        if (userName === void 0) { userName = ''; }
        if (accessLevel === void 0) { accessLevel = 0; }
        if (timestamp === void 0) { timestamp = {}; }
        this.id = id;
        this.userEmail = userEmail;
        this.userName = userName;
        this.accessLevel = accessLevel;
        this.idAdmin = idAdmin;
        this.timestamp = timestamp;
    }
    return ModelUserAdmin;
}());
exports.ModelUserAdmin = ModelUserAdmin;
