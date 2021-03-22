"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xGeoCoordinateToMaps = exports.xLatLngToButterfly = void 0;
const GeoCoordinate_1 = require("butterfly-web/dist/location/GeoCoordinate");
//! Declares com.lightningkite.butterfly.maps.toButterfly
function xLatLngToButterfly(this_) {
    return new GeoCoordinate_1.GeoCoordinate(this_.lat(), this_.lng());
}
exports.xLatLngToButterfly = xLatLngToButterfly;
//! Declares com.lightningkite.butterfly.maps.toMaps
function xGeoCoordinateToMaps(this_) {
    return new google.maps.LatLng(this_.latitude, this_.longitude);
}
exports.xGeoCoordinateToMaps = xGeoCoordinateToMaps;
//# sourceMappingURL=LatLng.ext.js.map