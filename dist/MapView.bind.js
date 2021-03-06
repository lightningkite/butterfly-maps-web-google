"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xMapViewBindSelect = exports.xMapViewBindView = exports.xMapViewBind = exports.retireMap = exports.acquireMap = exports.aquireMap = void 0;
const DisposeCondition_ext_1 = require("butterfly-web/dist/rx/DisposeCondition.ext");
const DisposableLambda_1 = require("butterfly-web/dist/rx/DisposableLambda");
const ObservableProperty_ext_1 = require("butterfly-web/dist/observables/ObservableProperty.ext");
const LatLng_ext_1 = require("./LatLng.ext");
const mapSymbol = Symbol("mapSymbol");
let floatingMapDivs = [];
function aquireMap() {
    return acquireMap();
}
exports.aquireMap = aquireMap;
function acquireMap() {
    const alreadyExisting = floatingMapDivs.pop();
    if (alreadyExisting) {
        console.log("Reusing an existing google map");
        return alreadyExisting;
    }
    const newDiv = document.createElement("div");
    newDiv.style.width = "100%";
    newDiv.style.height = "100%";
    newDiv.style.position = "absolute";
    newDiv.style.left = "0px";
    newDiv.style.top = "0px";
    console.log("Created a new google map; this will cost money");
    const map = new google.maps.Map(newDiv, {
        center: { lat: 0, lng: 0 },
        zoom: 2,
        styles: [] //?
    });
    return { div: newDiv, map: map };
}
exports.acquireMap = acquireMap;
function retireMap(element) {
    floatingMapDivs.push(element);
}
exports.retireMap = retireMap;
//! Declares com.lightningkite.butterfly.maps.bind>com.google.android.gms.maps.MapView
function xMapViewBind(this_, dependency, style) {
    const map = aquireMap();
    map.map.setOptions({
        center: { lat: 0, lng: 0 },
        zoom: 2,
        styles: style ? JSON.parse(style) : []
    });
    this_.appendChild(map.div);
    DisposeCondition_ext_1.xViewRemovedGet(this_).call(new DisposableLambda_1.DisposableLambda(() => {
        this_.removeChild(map.div);
        retireMap(map);
    }));
}
exports.xMapViewBind = xMapViewBind;
//! Declares com.lightningkite.butterfly.maps.bindView>com.google.android.gms.maps.MapView
function xMapViewBindView(this_, dependency, position, zoomLevel = 15, animate = true, style = null) {
    xMapViewBind(this_, dependency, style);
    const map = this_[mapSymbol].map;
    let first = true;
    let marker = null;
    DisposeCondition_ext_1.xDisposableUntil(ObservableProperty_ext_1.xObservablePropertySubscribeBy(position, undefined, undefined, (g) => {
        if (g) {
            const p = LatLng_ext_1.xGeoCoordinateToMaps(g);
            if (animate && !first) {
                map.panTo(p);
                map.setZoom(zoomLevel);
            }
            else {
                map.setCenter(p);
                map.setZoom(zoomLevel);
            }
            first = false;
            if (!marker) {
                marker = new google.maps.Marker({
                    position: p,
                    map: map
                });
            }
            else {
                marker.setPosition(p);
            }
        }
        else {
            if (marker) {
                marker.setMap(null);
                marker = null;
            }
        }
    }), DisposeCondition_ext_1.xViewRemovedGet(this_));
}
exports.xMapViewBindView = xMapViewBindView;
//! Declares com.lightningkite.butterfly.maps.bindSelect>com.google.android.gms.maps.MapView
function xMapViewBindSelect(this_, dependency, position, zoomLevel = 15, animate = true, style = null) {
    xMapViewBind(this_, dependency, style);
    const map = this_[mapSymbol].map;
    let first = true;
    let marker = null;
    DisposeCondition_ext_1.xDisposableUntil(ObservableProperty_ext_1.xObservablePropertySubscribeBy(position, undefined, undefined, (g) => {
        if (g) {
            const p = LatLng_ext_1.xGeoCoordinateToMaps(g);
            if (animate && !first) {
                map.panTo(p);
                map.setZoom(zoomLevel);
            }
            else {
                map.setCenter(p);
                map.setZoom(zoomLevel);
            }
            first = false;
            if (!marker) {
                marker = new google.maps.Marker({
                    position: p,
                    map: map,
                    draggable: true
                });
                marker.addListener("dragend", () => {
                    const pos = marker === null || marker === void 0 ? void 0 : marker.getPosition();
                    if (pos) {
                        position.value = LatLng_ext_1.xLatLngToButterfly(pos);
                    }
                });
            }
            else {
                marker.setPosition(p);
            }
        }
        else {
            if (marker) {
                marker.setMap(null);
                marker = null;
            }
        }
    }), DisposeCondition_ext_1.xViewRemovedGet(this_));
    map.addListener("click", (ev) => {
        position.value = LatLng_ext_1.xLatLngToButterfly(ev.latLng);
    });
}
exports.xMapViewBindSelect = xMapViewBindSelect;
//# sourceMappingURL=MapView.bind.js.map