import geographicDataFetcher from "./logic/geographicDataFetcher";
import type {FetchResult, PlaceListCriteriaProps, PlaceProps, SearchCriteriaProps} from "./types/placeTypes";

let postalPH: ReturnType<typeof geographicDataFetcher> | undefined;

export default function usePostalPH(): ReturnType<typeof geographicDataFetcher> {
    if (!postalPH) {
        postalPH = geographicDataFetcher();
    }
    return postalPH;
}

export type {FetchResult, PlaceProps, SearchCriteriaProps, PlaceListCriteriaProps};
