import {expect, test} from '@playwright/test';
import usePostalPH from './../src/index';

test.describe('index.ts', () => {
    const {fetchPostCodes, fetchMunicipalities, fetchRegions, fetchLocations, fetchDataLists} = usePostalPH();
    test('post-code', async () => {
        const postCodes = await fetchPostCodes();
        const postCodeSearch = await fetchPostCodes({search: '6045'});
        const postCodeWithLimit = await fetchPostCodes({limit: 10});
        expect(postCodeSearch).toEqual({
            "location": "Cebu",
            "municipality": "Talisay",
            "post_code": 6045,
            "region": "VII"
        });
        if (postCodeWithLimit) {
            if ('data' in postCodeWithLimit) {
                const data: number[] = postCodeWithLimit.data;
                expect(data).toHaveLength(10)
            }
        }
        if (postCodes) {
            if ('data' in postCodes) {
                const data = postCodes.data;
                expect(data).toHaveLength(1990)
            }
        }
    });
    test('municipality', async () => {
        const municipalities = await fetchMunicipalities();
        const municipalitySearch = await fetchMunicipalities({search: 'Talisayan'});
        const municipalityWithLimit = await fetchMunicipalities({limit: 10});
        if (municipalities) {
            if ('data' in municipalities) {
                const data = municipalities.data;
                expect(data).toHaveLength(1876)
            }
        }
        if (municipalitySearch) {
            if ('data' in municipalitySearch) {
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
            if ('data' in municipalityWithLimit) {
                const data = municipalityWithLimit.data;
                expect(data).toHaveLength(10)
            }
        }
    });
    test('region', async () => {
        const regionSearch = await fetchRegions({search: 'XII'});
        const regionWithLimit = await fetchMunicipalities({limit: 10});
        if (regionSearch) {
            if ('data' in regionSearch) {
                const data = regionSearch.data;
                expect(data).toHaveLength(128)
            }
        }
        if (regionWithLimit) {
            if ('data' in regionWithLimit) {
                const data = regionWithLimit.data;
                expect(data).toHaveLength(10)
            }
        }
    });
    test('location', async () => {
        const locationSearch = await fetchLocations({search: 'Cebu'});
        const locationWithLimit = await fetchLocations({limit: 10});
        if (locationSearch) {
            if ('data' in locationSearch) {
                const data = locationSearch.data;
                expect(data).toHaveLength(54)
            }
        }
        if (locationWithLimit) {
            if ('data' in locationWithLimit) {
                const data = locationWithLimit.data;
                expect(data).toHaveLength(10)
            }
        }
    });
    test('dataLists', async () => {
        const dataListSearch = await fetchDataLists({post_code: '6045'});
        const dataListWithLimit = await fetchDataLists({limit: 10});
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
