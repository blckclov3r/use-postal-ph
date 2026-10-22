import geographicDataFetcher from "./logic/geographicDataFetcher";
import type {FetchResult, PlaceListCriteriaProps, PlaceProps, SearchCriteriaProps} from "./types/placeTypes";

export default function usePostalPH(): ReturnType<typeof geographicDataFetcher> {
    return geographicDataFetcher();
}

export type {FetchResult, PlaceProps, SearchCriteriaProps, PlaceListCriteriaProps};
