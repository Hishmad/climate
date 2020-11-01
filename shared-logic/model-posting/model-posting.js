"use strict";
exports.__esModule = true;
exports.ModelPosting = void 0;
var ModelPosting = /** @class */ (function () {
    function ModelPosting(id, idUser, userName, userMobileNumber, photoUserUrl, message, listOfLikes, listOfImagePublicId, listOfCloudinaryImages, attachAsset, youtubeUrl, alertStatus, address, city, postCode, state, country, lat, lng, timestamp, idAdmin) {
        if (id === void 0) { id = ''; }
        if (idUser === void 0) { idUser = ''; }
        if (userName === void 0) { userName = ''; }
        if (userMobileNumber === void 0) { userMobileNumber = ''; }
        if (photoUserUrl === void 0) { photoUserUrl = ''; }
        if (message === void 0) { message = ''; }
        if (listOfLikes === void 0) { listOfLikes = []; }
        if (listOfImagePublicId === void 0) { listOfImagePublicId = []; }
        if (listOfCloudinaryImages === void 0) { listOfCloudinaryImages = []; }
        if (attachAsset === void 0) { attachAsset = {}; }
        if (youtubeUrl === void 0) { youtubeUrl = ''; }
        if (alertStatus === void 0) { alertStatus = ''; }
        if (address === void 0) { address = ''; }
        if (city === void 0) { city = ''; }
        if (postCode === void 0) { postCode = 0; }
        if (state === void 0) { state = ''; }
        if (country === void 0) { country = ''; }
        if (lat === void 0) { lat = 0; }
        if (lng === void 0) { lng = 0; }
        if (timestamp === void 0) { timestamp = {}; }
        if (idAdmin === void 0) { idAdmin = ''; }
        this.id = id;
        this.idUser = idUser;
        this.userName = userName;
        this.userMobileNumber = userMobileNumber;
        this.photoUserUrl = photoUserUrl;
        this.message = message;
        this.listOfLikes = listOfLikes;
        this.listOfImagePublicId = listOfImagePublicId;
        this.listOfCloudinaryImages = listOfCloudinaryImages;
        this.attachAsset = attachAsset;
        this.youtubeUrl = youtubeUrl;
        this.alertStatus = alertStatus;
        this.address = address;
        this.city = city;
        this.postCode = postCode;
        this.state = state;
        this.country = country;
        this.lat = lat;
        this.lng = lng;
        this.timestamp = timestamp;
        this.idAdmin = idAdmin;
    }
    return ModelPosting;
}());
exports.ModelPosting = ModelPosting;
