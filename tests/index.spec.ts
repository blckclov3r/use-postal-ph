import {expect, test} from '@playwright/test';
import usePostalPH from './../src/index';

test.describe('index.ts', () => {
    const {fetchPostCodes, fetchMunicipalities, fetchRegions, fetchLocations, fetchDataLists} = usePostalPH();
    test('post-code', () => {
        const postCodes = fetchPostCodes();
        const postCodeSearch = fetchPostCodes({search: '6045'});
        const postCodeWithLimit = fetchPostCodes({limit: 10});
        expect(postCodeSearch).toEqual({
            "location": "Cebu",
            "municipality": "Talisay",
            "post_code": 6045,
            "region": "VII"
        });
        if (postCodeWithLimit) {
            if ('data' in postCodeWithLimit) {
                const data = postCodeWithLimit.data;
                expect(data).toHaveLength(10)
            }
        }
        if (postCodes) {
            if ('data' in postCodes && postCodes.data?.length > 0) {
                const data = postCodes.data;
                expect(data.length).toBeGreaterThan(0);
            }
        }
    });
    test('municipality', () => {
        const municipalities = fetchMunicipalities();
        const municipalitySearch = fetchMunicipalities({search: 'Talisayan'});
        const municipalityWithLimit = fetchMunicipalities({limit: 10});
        if (municipalities) {
            if ('data' in municipalities && municipalities.data?.length > 0) {
                const data = municipalities.data;
                expect(data.length).toBeGreaterThan(0);
            }
        }
        if (municipalitySearch) {
            if ('data' in municipalitySearch && municipalitySearch.data?.length > 0) {
                const data = municipalitySearch.data;
                expect(data).toEqual([{
                    "location": "Misamis Oriental",
                    "municipality": "Talisayan",
                    "post_code": 9012,
                    "region": "X"
                }]);
            }
        }
        if (municipalityWithLimit) {
            if ('data' in municipalityWithLimit && municipalityWithLimit.data?.length > 0) {
                const data = municipalityWithLimit.data;
                expect(data).toHaveLength(10)
            }
        }
    });
    test('region', () => {
        const regionSearch = fetchRegions({search: 'XII'});
        const regionWithLimit = fetchMunicipalities({limit: 10});
        if (regionSearch) {
            if ('data' in regionSearch) {
                const data = regionSearch.data;
                expect(data.length).toBeGreaterThan(0);
            }
        }
        if (regionWithLimit) {
            if ('data' in regionWithLimit) {
                const data = regionWithLimit.data;
                expect(data).toHaveLength(10)
            }
        }
    });
    test('location', () => {
        const locationSearch = fetchLocations({search: 'Cebu'});
        const locationWithLimit = fetchLocations({limit: 10});
        if (locationSearch) {
            if ('data' in locationSearch) {
                const data = locationSearch.data;
                expect(data.length).toBeGreaterThan(0);
            }
        }
        if (locationWithLimit) {
            if ('data' in locationWithLimit) {
                const data = locationWithLimit.data;
                expect(data).toHaveLength(10)
            }
        }
    });
    test('dataLists', () => {
        const dataListSearch = fetchDataLists({post_code: '6045'});
        const dataListWithLimit = fetchDataLists({limit: 10});
        if (dataListSearch) {
            if ('data' in dataListSearch) {
                const data = dataListSearch.data;
                expect(data).toEqual([{
                    "location": "Cebu",
                    "municipality": "Talisay",
                    "post_code": 6045,
                    "region": "VII"
                }]);
            }
        }
        if (dataListWithLimit) {
            if ('data' in dataListWithLimit) {
                const data = dataListWithLimit.data;
                expect(data).toHaveLength(10)
            }
        }
    });
});
