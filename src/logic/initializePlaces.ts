import dataRegistry from "./dataRegistry";
import {PlaceProps, SearchProps,} from "../types/places";

export default function initializePlaces() {
    const {fetchPlaces} = dataRegistry();
    const data = ((fetchPlaces()?.data) || []);
    let municipalityList: string[] = [];
    let postCodeList: number[] = [];
    let locationList: string[] = [];
    let regionList: string[] = [];

    const addToUniqueArray = <T>(array: T[], value: T): void => {
        if (!array.includes(value))
            array.push(value);
    };

    const setUniqueArray = <T>(array: T[], key: keyof PlaceProps, limit?: number): void => {
        if (array.length > 0 || !key) return;
        data.forEach((entry) => {
            const value = entry[key] as T;
            if (value) {
                if (!limit || array.length < limit) {
                    addToUniqueArray(array, value);
                }
            }
        });
    };

    const findData = <T>(key: keyof PlaceProps, value: T) => {
        if (!value || !key) return undefined;
        const pattern = value.toString().trim();
        const regex = new RegExp('^' + pattern, 'i');
        return data.find((x) => regex.test(x[key]?.toString() || ''));
    };

    const filterData = <T>(
        key: keyof PlaceProps,
        value: T,
        limit?: number,
        autoComplete: boolean = false,
    ) => {
        if (!value || !key) return {data: [], count: 0};
        const pattern = value.toString().trim();
        const regexPattern = autoComplete ? '^' + pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : '^' + pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$';
        const regex = new RegExp(regexPattern, 'i');
        let filteredData = data.filter((x) => regex.test(x[key]?.toString() || ''));
        let count = filteredData.length;
        if (limit && limit > 0) {
            filteredData = filteredData.slice(0, limit);
            count = filteredData.length;
        }
        return {data: filteredData, count};
    };

    const fetchDataLists = (limit?: number | undefined) => {
        return {
            data: limit ? data.slice(0, limit) : data,
            count: limit ? data.slice(0, limit).length : data.length,
        };
    };

    const fetchMunicipalities = ({search, limit}: Partial<SearchProps> = {}) => {
        if (search) {
            return filterData('municipality', search, limit, true);
        } else {
            setUniqueArray(municipalityList, 'municipality', limit);
            return {
                data: municipalityList.slice(0, limit),
                count: limit ? municipalityList.slice(0, limit).length : municipalityList.length,
            };
        }
    };

    const fetchPostCodes = ({search, limit}: Partial<SearchProps> = {}) => {
        if (search) {
            return findData('post_code', search);
        } else {
            setUniqueArray(postCodeList, 'post_code', limit);
            return {
                data: postCodeList.slice(0, limit),
                count: limit ? postCodeList.slice(0, limit).length : postCodeList.length,
            };
        }
    };

    const fetchLocations = ({search, limit}: Partial<SearchProps> = {}) => {
        if (search) {
            return filterData('location', search, limit, true);
        } else {
            setUniqueArray(locationList, 'location');
            return {
                data: locationList.slice(0, limit),
                count: limit ? locationList.slice(0, limit).length : locationList.length,
            };
        }
    };

    const fetchRegions = ({search, limit}: Partial<SearchProps> = {}) => {
        if (search) {
            return filterData('region', search, limit, false);
        } else {
            setUniqueArray(regionList, 'region');
            return {
                data: regionList.slice(0, limit),
                count: limit ? regionList.slice(0, limit).length : regionList.length,
            };
        }
    };

    return {
        fetchMunicipalities,
        fetchPostCodes,
        fetchLocations,
        fetchRegions,
        fetchDataLists,
    };
};