"use strict";
exports.__esModule = true;
exports.ModelPostingLike = void 0;
var ModelPostingLike = /** @class */ (function () {
    function ModelPostingLike(id, idUser, idPosting, idAdmin, like, timestamp) {
        if (id === void 0) { id = ''; }
        if (idUser === void 0) { idUser = ''; }
        if (idPosting === void 0) { idPosting = ''; }
        if (idAdmin === void 0) { idAdmin = ''; }
        if (like === void 0) { like = false; }
        if (timestamp === void 0) { timestamp = {}; }
        this.id = id;
        this.idUser = idUser;
        this.idPosting = idPosting;
        this.idAdmin = idAdmin;
        this.like = like;
        this.timestamp = timestamp;
    }
    return ModelPostingLike;
}());
exports.ModelPostingLike = ModelPostingLike;
