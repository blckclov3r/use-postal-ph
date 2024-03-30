import geographicDataFetcher from "./logic/geographicDataFetcher";
import {PlaceListCriteriaProps, PlaceProps, SearchCriteriaProps} from "./types/placeTypes";

export default function usePostalPH() {
    const {
        fetchMunicipalities,
        fetchPostCodes,
        fetchLocations,
        fetchRegions,
        fetchDataLists,
    } = geographicDataFetcher();

    return {
        fetchMunicipalities,
        fetchPostCodes,
        fetchLocations,
        fetchRegions,
        fetchDataLists,
    };
}

export type {PlaceProps, SearchCriteriaProps, PlaceListCriteriaProps};