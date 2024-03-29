import dataRegistry from "./dataRegistry";
import {PlaceListProps, PlaceProps, SearchProps} from "../types/places";

/*
 * Author: blckclov3r
 * Email: blckclov3r@gmail.com
 * GitHub: https://github.com/blckclov3r
 */

export default function initializePlaces() {
    const {fetchPlaces} = dataRegistry();
    const data = fetchPlaces()?.data || [];
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
        return data?.find((x) => regex.test(x[key]?.toString() || ''));
    };

    const createRegexPattern = (value: string | undefined, autoComplete: boolean = false) => {
        const pattern = value?.toString().trim();
        const regexPattern = autoComplete ? '^' + pattern?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : '^' + pattern?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$';
        return new RegExp(regexPattern, 'i')
    };

    const filterData = <T>(
        key: keyof PlaceProps,
        value: T,
        limit?: number,
        autoComplete: boolean = false,
    ) => {
        if (!value || !key) return {data: [], count: 0};
        const regex = createRegexPattern(value.toString(), autoComplete);
        let filteredData = data.filter((x) => regex.test(x[key]?.toString() || ''));
        let count = filteredData.length;
        if (limit && limit > 0) {
            filteredData = filteredData.slice(0, limit);
            count = filteredData.length;
        }
        return {data: filteredData, count};
    };

    const setError = (name: string, error: unknown) => {
        if (error instanceof Error) {
            const errorMessage = `An error occurred in ${name}: ${error.message}`;
            console.error(errorMessage);
            throw new Error(errorMessage);
        } else {
            const unknownErrorMessage = `An unknown error occurred in ${name}: ${error}`;
            console.error(unknownErrorMessage);
            throw new Error('An unknown error occurred.');
        }
    }

    const fetchDataLists = ({municipality, post_code, region, location, limit}: Partial<PlaceListProps> = {}) => {
        const newData = data?.filter(entry => {
            const municipalityMatch = !municipality || createRegexPattern(municipality, true).test(entry.municipality || '');
            const postCodeMatch = !post_code || createRegexPattern(post_code.toString(), true).test(entry.post_code?.toString() || '');
            const regionMatch = !region || createRegexPattern(region, true).test(entry.region || '');
            const locationMatch = !location || createRegexPattern(location, true).test(entry.location || '');
            return municipalityMatch && postCodeMatch && regionMatch && locationMatch;
        });
        const limitedData = limit ? newData?.slice(0, limit) : newData;
        return {
            data: limitedData,
            count: limitedData?.length,
        };
    };

    const fetchMunicipalities = ({search, limit}: Partial<SearchProps> = {}) => {
        try {
            if (search) {
                return filterData('municipality', search, limit, true);
            } else {
                setUniqueArray(municipalityList, 'municipality', limit);
                return {
                    data: municipalityList.slice(0, limit),
                    count: limit ? municipalityList?.slice(0, limit)?.length : municipalityList?.length,
                };
            }
        } catch (error) {
            setError('municipality', error);
        }
    };

    const fetchPostCodes = ({search, limit}: Partial<SearchProps> = {}) => {
        try {
            if (search) {
                return findData('post_code', search);
            } else {
                setUniqueArray(postCodeList, 'post_code', limit);
                return {
                    data: postCodeList?.slice(0, limit),
                    count: limit ? postCodeList?.slice(0, limit)?.length : postCodeList?.length,
                };
            }
        } catch (error) {
            setError('post_code', error);
        }
    };

    const fetchLocations = ({search, limit}: Partial<SearchProps> = {}) => {
        try {
            if (search) {
                return filterData('location', search, limit, true);
            } else {
                setUniqueArray(locationList, 'location');
                return {
                    data: locationList?.slice(0, limit),
                    count: limit ? locationList?.slice(0, limit)?.length : locationList?.length,
                };
            }
        } catch (error) {
            setError('location', error);
        }
    };

    const fetchRegions = ({search, limit}: Partial<SearchProps> = {}) => {
        try {
            if (search) {
                return filterData('region', search, limit, false);
            } else {
                setUniqueArray(regionList, 'region');
                return {
                    data: regionList.slice(0, limit),
                    count: limit ? regionList?.slice(0, limit)?.length : regionList?.length,
                };
            }
        } catch (error) {
            setError('region', error);
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