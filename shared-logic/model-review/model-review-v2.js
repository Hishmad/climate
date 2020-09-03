"use strict";
exports.__esModule = true;
var ModelReviewV2 = /** @class */ (function () {
    function ModelReviewV2(id, idPosting, idHost, idUser, ratings, userFullName, photoUserUrl, comment, reply, idAdmin, timestamp) {
        if (id === void 0) { id = ''; }
        if (idPosting === void 0) { idPosting = ''; }
        if (idHost === void 0) { idHost = ''; }
        if (idUser === void 0) { idUser = ''; }
        if (ratings === void 0) { ratings = 1; }
        if (userFullName === void 0) { userFullName = ''; }
        if (photoUserUrl === void 0) { photoUserUrl = ''; }
        if (comment === void 0) { comment = ''; }
        if (reply === void 0) { reply = []; }
        if (idAdmin === void 0) { idAdmin = ''; }
        if (timestamp === void 0) { timestamp = {}; }
        this.id = id;
        this.idPosting = idPosting;
        this.idHost = idHost;
        this.idUser = idUser;
        this.ratings = ratings;
        this.userFullName = userFullName;
        this.photoUserUrl = photoUserUrl;
        this.comment = comment;
        this.reply = reply;
        this.idAdmin = idAdmin;
        this.timestamp = timestamp;
    }
    return ModelReviewV2;
}());
exports.ModelReviewV2 = ModelReviewV2;
