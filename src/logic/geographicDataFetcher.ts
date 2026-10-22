import placeDataArray from "./placeDataArray";
import type {FetchResult, PlaceListCriteriaProps, PlaceProps, SearchCriteriaProps} from "../types/placeTypes";

/*
 * Author: blckclov3r
 * Email: blckclov3r@gmail.com
 * GitHub: https://github.com/blckclov3r
 */

const toSearchableText = (value: unknown): string =>
    value === undefined || value === null ? '' : String(value);

export default function geographicDataFetcher() {
    const {placeDataProvider} = placeDataArray();
    const data = placeDataProvider().data;
    let municipalityList: string[] = [];
    let postCodeList: number[] = [];
    let locationList: string[] = [];
    let regionList: string[] = [];

    const addToUniqueArray = <T>(array: T[], value: T): void => {
        if (!array.includes(value))
            array.push(value);
    };

    const setUniqueArray = <T>(array: T[], key: keyof PlaceProps): void => {
        if (array.length > 0 || !key) return;
        data.forEach((entry) => {
            const value = entry[key] as T;
            if (value) {
                addToUniqueArray(array, value);
            }
        });
    };

    const createRegexPattern = (value: string | undefined, autoComplete: boolean = false): RegExp => {
        const pattern = (value ?? '').toString().trim()
            .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            .replace(/[nñ]/gi, '[nñ]');
        return new RegExp(autoComplete ? `^${pattern}` : `^${pattern}$`, 'i');
    };

    const findData = (key: keyof PlaceProps, value: string | number): PlaceProps | undefined => {
        if (!value || !key) return undefined;
        const regex = createRegexPattern(value.toString(), true);
        return data.find((x) => regex.test(toSearchableText(x[key])));
    };

    const filterData = (
        key: keyof PlaceProps,
        value: string | number,
        limit?: number,
        autoComplete: boolean = false,
    ): FetchResult<PlaceProps> => {
        if (!value || !key) return {data: [], count: 0};
        const regex = createRegexPattern(value.toString(), autoComplete);
        let filteredData = data.filter((x) => regex.test(toSearchableText(x[key])));
        let count = filteredData.length;
        if (limit && limit > 0) {
            filteredData = filteredData.slice(0, limit);
            count = filteredData.length;
        }
        return {data: filteredData, count};
    };

    const setError = (name: string, error: unknown): void => {
        if (error instanceof Error) {
            const errorMessage = `An error occurred in ${name}: ${error.message}`;
            console.error(errorMessage);
            throw error;
        } else {
            const unknownErrorMessage = `An unknown error occurred in ${name}: ${error}`;
            console.error(unknownErrorMessage);
        }
    };

    const fetchDataLists = ({
                                municipality,
                                post_code,
                                region,
                                location,
                                limit
                            }: PlaceListCriteriaProps = {}): FetchResult<PlaceProps> => {
        const municipalityRegex = municipality ? createRegexPattern(municipality, true) : undefined;
        const regionRegex = region ? createRegexPattern(region, true) : undefined;
        const locationRegex = location ? createRegexPattern(location, true) : undefined;
        const hasPostCode = post_code !== undefined && post_code !== '';
        const postCodePrefix = hasPostCode ? post_code.toString() : undefined;
        const hasFilters = Boolean(municipality) || hasPostCode || Boolean(region) || Boolean(location);
        const newData = hasFilters ? data.filter(entry => {
            const municipalityMatch = !municipalityRegex || municipalityRegex.test(toSearchableText(entry.municipality));
            const postCodeMatch = postCodePrefix === undefined || (
                entry.post_code !== undefined && entry.post_code.toString().startsWith(postCodePrefix)
            );
            const regionMatch = !regionRegex || regionRegex.test(toSearchableText(entry.region));
            const locationMatch = !locationRegex || locationRegex.test(toSearchableText(entry.location));
            return municipalityMatch && postCodeMatch && regionMatch && locationMatch;
        }) : data;
        const limitedData = limit ? newData.slice(0, limit) : newData.slice();
        return {
            data: limitedData,
            count: limitedData.length,
        };
    };

    const fetchMunicipalities = ({search, limit}: SearchCriteriaProps = {search: ""}): FetchResult<PlaceProps> | FetchResult<string> | undefined => {
        try {
            if (search) {
                return filterData('municipality', search, limit, true);
            } else {
                setUniqueArray(municipalityList, 'municipality');
                return {
                    data: municipalityList.slice(0, limit),
                    count: limit ? municipalityList.slice(0, limit).length : municipalityList.length,
                };
            }
        } catch (error) {
            setError('municipality', error);
        }
    };

    const fetchPostCodes = ({search, limit}: SearchCriteriaProps = {search: ""}): PlaceProps | FetchResult<number> | undefined => {
        try {
            if (search) {
                return findData('post_code', search);
            } else {
                setUniqueArray(postCodeList, 'post_code');
                return {
                    data: postCodeList.slice(0, limit),
                    count: limit ? postCodeList.slice(0, limit).length : postCodeList.length,
                };
            }
        } catch (error) {
            setError('post_code', error);
        }
    };

    const fetchLocations = ({search, limit}: SearchCriteriaProps = {search: ""}): FetchResult<PlaceProps> | FetchResult<string> | undefined => {
        try {
            if (search) {
                return filterData('location', search, limit, true);
            } else {
                setUniqueArray(locationList, 'location');
                return {
                    data: locationList.slice(0, limit),
                    count: limit ? locationList.slice(0, limit).length : locationList.length,
                };
            }
        } catch (error) {
            setError('location', error);
        }
    };

    const fetchRegions = ({search, limit}: SearchCriteriaProps = {search: ""}): FetchResult<PlaceProps> | FetchResult<string> | undefined => {
        try {
            if (search) {
                return filterData('region', search, limit, false);
            } else {
                setUniqueArray(regionList, 'region');
                return {
                    data: regionList.slice(0, limit),
                    count: limit ? regionList.slice(0, limit).length : regionList.length,
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
}
