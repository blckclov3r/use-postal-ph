import initializePlaces from "./logic/initializePlaces";

export default function usePostalPh() {
    const {
        fetchMunicipalities,
        fetchPostCodes,
        fetchLocations,
        fetchRegions,
        fetchDataLists,
    } = (initializePlaces() || {});

    return {
        fetchMunicipalities,
        fetchPostCodes,
        fetchLocations,
        fetchRegions,
        fetchDataLists,
    };
}