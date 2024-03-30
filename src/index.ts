import geographicDataFetcher from "./logic/geographicDataFetcher";

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