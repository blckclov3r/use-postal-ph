import geographicDataFetcher from "./logic/geographicDataFetcher";

export default function usePostalPH() {
    const geographicData = geographicDataFetcher();

    if (!geographicData) {
        console.error("geographicDataFetcher returned null or undefined");
        return {};
    }

    const {
        fetchMunicipalities,
        fetchPostCodes,
        fetchLocations,
        fetchRegions,
        fetchDataLists,
    } = geographicData

    return {
        fetchMunicipalities,
        fetchPostCodes,
        fetchLocations,
        fetchRegions,
        fetchDataLists,
    };
}

usePostalPH();