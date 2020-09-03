"use strict";
exports.__esModule = true;
var ModelPosting = /** @class */ (function () {
    function ModelPosting(id, idUser, userEmail, userName, brokerHouse, userMobileNumber, photoUserUrl, message, listOfMedia, listOfThumbnail, listOfImagePublicId, listOfLikes, listOfCloudinaryImages, attachAsset, ownershipStatus, // Owner, Broker Co, Agent
    timestamp, idAdmin) {
        if (id === void 0) { id = ''; }
        if (idUser === void 0) { idUser = ''; }
        if (userEmail === void 0) { userEmail = ''; }
        if (userName === void 0) { userName = ''; }
        if (brokerHouse === void 0) { brokerHouse = ''; }
        if (userMobileNumber === void 0) { userMobileNumber = ''; }
        if (photoUserUrl === void 0) { photoUserUrl = ''; }
        if (message === void 0) { message = ''; }
        if (listOfMedia === void 0) { listOfMedia = []; }
        if (listOfThumbnail === void 0) { listOfThumbnail = []; }
        if (listOfImagePublicId === void 0) { listOfImagePublicId = []; }
        if (listOfLikes === void 0) { listOfLikes = []; }
        if (listOfCloudinaryImages === void 0) { listOfCloudinaryImages = []; }
        if (attachAsset === void 0) { attachAsset = {}; }
        if (ownershipStatus === void 0) { ownershipStatus = ''; }
        if (timestamp === void 0) { timestamp = {}; }
        if (idAdmin === void 0) { idAdmin = ''; }
        this.id = id;
        this.idUser = idUser;
        this.userEmail = userEmail;
        this.userName = userName;
        this.brokerHouse = brokerHouse;
        this.userMobileNumber = userMobileNumber;
        this.photoUserUrl = photoUserUrl;
        this.message = message;
        this.listOfMedia = listOfMedia;
        this.listOfThumbnail = listOfThumbnail;
        this.listOfImagePublicId = listOfImagePublicId;
        this.listOfLikes = listOfLikes;
        this.listOfCloudinaryImages = listOfCloudinaryImages;
        this.attachAsset = attachAsset;
        this.ownershipStatus = ownershipStatus;
        this.timestamp = timestamp;
        this.idAdmin = idAdmin;
    }
    return ModelPosting;
}());
exports.ModelPosting = ModelPosting;
