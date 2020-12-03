import { MutableObservableProperty } from 'butterfly-web/dist/observables/MutableObservableProperty';
import { GeoCoordinate } from 'butterfly-web/dist/location/GeoCoordinate';
import { ObservableProperty } from 'butterfly-web/dist/observables/ObservableProperty';
declare const mapSymbol: unique symbol;
declare global {
    interface HTMLDivElement {
        [mapSymbol]: ReusableMap;
    }
}
export interface ReusableMap {
    div: HTMLDivElement;
    map: google.maps.Map;
}
export declare function aquireMap(): ReusableMap;
export declare function acquireMap(): ReusableMap;
export declare function retireMap(element: ReusableMap): void;
export declare function xMapViewBind(this_: HTMLDivElement, dependency: Window, style: string | null): void;
export declare function xMapViewBindView(this_: HTMLDivElement, dependency: Window, position: ObservableProperty<(GeoCoordinate | null)>, zoomLevel?: number, animate?: boolean, style?: string | null): void;
export declare function xMapViewBindSelect(this_: HTMLDivElement, dependency: Window, position: MutableObservableProperty<(GeoCoordinate | null)>, zoomLevel?: number, animate?: boolean, style?: string | null): void;
export {};
