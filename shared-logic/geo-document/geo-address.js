"use strict";
exports.__esModule = true;
exports.GeoAddress = void 0;
var GeoAddress = /** @class */ (function () {
    function GeoAddress(address, city, postCode, state, country, lat, lng) {
        if (address === void 0) { address = ''; }
        if (city === void 0) { city = ''; }
        if (postCode === void 0) { postCode = 0; }
        if (state === void 0) { state = ''; }
        if (country === void 0) { country = ''; }
        if (lat === void 0) { lat = 0; }
        if (lng === void 0) { lng = 0; }
        this.address = address;
        this.city = city;
        this.postCode = postCode;
        this.state = state;
        this.country = country;
        this.lat = lat;
        this.lng = lng;
    }
    return GeoAddress;
}());
exports.GeoAddress = GeoAddress;
