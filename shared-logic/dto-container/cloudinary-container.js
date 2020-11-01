"use strict";
exports.__esModule = true;
exports.CloudinaryContainer = void 0;
var CloudinaryContainer = /** @class */ (function () {
    function CloudinaryContainer(id, // consumer id if any
    listOfImagePublicId, listOfCloudinaryImages, timestamp, idAdmin) {
        if (id === void 0) { id = ''; }
        if (listOfImagePublicId === void 0) { listOfImagePublicId = []; }
        if (listOfCloudinaryImages === void 0) { listOfCloudinaryImages = []; }
        if (timestamp === void 0) { timestamp = {}; }
        if (idAdmin === void 0) { idAdmin = ''; }
        this.id = id;
        this.listOfImagePublicId = listOfImagePublicId;
        this.listOfCloudinaryImages = listOfCloudinaryImages;
        this.timestamp = timestamp;
        this.idAdmin = idAdmin;
    }
    CloudinaryContainer.DTO_DELETE_ANY_FROM_CLOUDINARY = 'dtoDeleteAnyFromCloudinary';
    return CloudinaryContainer;
}());
exports.CloudinaryContainer = CloudinaryContainer;
