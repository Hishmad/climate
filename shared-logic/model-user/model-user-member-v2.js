"use strict";
exports.__esModule = true;
exports.ModelUserMemberV2 = void 0;
var ModelUserMemberV2 = /** @class */ (function () {
    function ModelUserMemberV2(id, userFullName, userMobileNumber, idAdmin, listOfPhotoProfilePublicId, listOfCloudinaryImages, timestamp) {
        if (id === void 0) { id = ''; }
        if (userFullName === void 0) { userFullName = ''; }
        if (userMobileNumber === void 0) { userMobileNumber = ''; }
        if (idAdmin === void 0) { idAdmin = ''; }
        if (listOfPhotoProfilePublicId === void 0) { listOfPhotoProfilePublicId = []; }
        if (listOfCloudinaryImages === void 0) { listOfCloudinaryImages = []; }
        if (timestamp === void 0) { timestamp = {}; }
        this.id = id;
        this.userFullName = userFullName;
        this.userMobileNumber = userMobileNumber;
        this.idAdmin = idAdmin;
        this.listOfPhotoProfilePublicId = listOfPhotoProfilePublicId;
        this.listOfCloudinaryImages = listOfCloudinaryImages;
        this.timestamp = timestamp;
    }
    return ModelUserMemberV2;
}());
exports.ModelUserMemberV2 = ModelUserMemberV2;
