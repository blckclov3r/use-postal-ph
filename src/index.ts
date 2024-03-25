import initializePlaces from "./logic/initializePlaces";

const usePostalPH = () => {
    const {
        fetchMunicipalities,
        fetchPostCodes,
        fetchLocations,
        fetchRegions,
        fetchDataLists,
    } = initializePlaces();

    return {
        fetchMunicipalities,
        fetchPostCodes,
        fetchLocations,
        fetchRegions,
        fetchDataLists,
    };
}
export default usePostalPH;