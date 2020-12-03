import {GeoCoordinate} from "butterfly-web/dist/location/GeoCoordinate"
import {GeoAddress} from "butterfly-web/dist/location/GeoAddress"
import {setGeocodingMethod} from "butterfly-web/dist/location/Geocoding"
import {bindCallback, from, Observable, of} from "rxjs";
import { HttpClient} from "butterfly-web/dist/net/HttpClient"
import {flatMap, map} from "rxjs/operators";
import { xStringSubstringBefore } from "butterfly-web/dist/kotlin/kotlin.text"
import {} from "googlemaps";
import {
    xLatLngToButterfly,
    xGeoCoordinateToMaps
} from "./LatLng.ext";

export function setupGoogleMaps(){
    const coder = new google.maps.Geocoder();
    setGeocodingMethod((
        this_Geocode: Window,
        coordinate: GeoCoordinate | string,
        maxResults: number = 1
    ):Observable<Array<GeoAddress>> => {
        let args;
        if(coordinate instanceof GeoCoordinate){
            args = {
                location: xGeoCoordinateToMaps(coordinate)
            }
        } else {
            args = {
                address: coordinate
            }
        }
        let bound: (arg1: google.maps.GeocoderRequest) => Observable<[Array<google.maps.GeocoderResult>, google.maps.GeocoderStatus]> = bindCallback(coder.geocode)
        return bound(args).pipe(map((a)=>{
            return a[0].map((x)=>{
                return new GeoAddress(
                    xLatLngToButterfly(x.geometry.bounds.getCenter()),
                    null,
                    x.address_components.find((x)=> x.types.indexOf("street_address") != -1 )?.short_name,
                    x.address_components.find((x)=> x.types.indexOf("sublocality") != -1 )?.short_name,
                    x.address_components.find((x)=> x.types.indexOf("locality") != -1 )?.short_name,
                    x.address_components.find((x)=> x.types.indexOf("administrative_area_level_2") != -1 )?.short_name,
                    x.address_components.find((x)=> x.types.indexOf("administrative_area_level_1") != -1 )?.short_name,
                    x.address_components.find((x)=> x.types.indexOf("country") != -1 )?.short_name,
                    x.address_components.find((x)=> x.types.indexOf("postal_code") != -1 )?.short_name,
                );
            })
        }))
    });
}