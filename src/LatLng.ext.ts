
import {GeoCoordinate} from "butterfly-web/dist/location/GeoCoordinate";
import {} from "googlemaps"

//! Declares com.lightningkite.butterfly.maps.toButterfly
export function xLatLngToButterfly(this_: google.maps.LatLng): GeoCoordinate {
    return new GeoCoordinate(this_.lat(), this_.lng());
}

//! Declares com.lightningkite.butterfly.maps.toMaps
export function xGeoCoordinateToMaps(this_: GeoCoordinate): google.maps.LatLng {
    return new google.maps.LatLng(this_.latitude, this_.longitude);
}