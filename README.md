<div style="text-align:center;">

![use-postal-ph](https://github-production-user-asset-6210df.s3.amazonaws.com/43292234/316257222-8fc4c819-5f85-4bc2-b504-143b4b95312a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240323%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240323T171142Z&X-Amz-Expires=300&X-Amz-Signature=877940709cea82dc420674c96ebabefa8c58936fdf316f55fe1b5d85dbe22108&X-Amz-SignedHeaders=host&actor_id=43292234&key_id=0&repo_id=773900796)
[![npm](https://img.shields.io/npm/v/use-postal-ph?style=flat-square)](https://www.npmjs.com/package/use-postal-ph)
[![License](https://img.shields.io/npm/l/use-postal-ph?style=flat-square)](https://github.com/blckclov3r/your-repo/blob/main/LICENSE)

</div>


[npm-image]: https://img.shields.io/npm/v/use-postal-ph.svg

[mit-license]: https://github.com/blckclov3r/use-postal-ph#readme

[downloads-image]: https://img.shields.io/npm/dm/use-postal-ph.svg

[downloads-url]: https://npmjs.org/package/use-postal-ph

This library provides postal code, municipality, location, and region information for the Philippines. It ensures
compatibility and versatility across various JavaScript/Typescript environments. Plus, it can be used offline since the
data isn't fetched from the network.

## Installation

Install via NPM:

```bash
npm install use-postal-ph
````

Or via Yarn:

```bash
yarn add use-postal-ph
```

## Usage

First, import the `use-postal-ph` function:

```javascript
import usePostalPH from 'use-postal-ph';
```

Now, you can use the various methods provided by the library to fetch postal code, municipality, location, and region
information:

```javascript
const postalPh = usePostalPh();

// Fetch a list of municipalities
const municipalities = postalPh.fetchMunicipalities();
console.log(municipalities);

// Fetch postal codes
const postalCodes = postalPh.fetchPostCodes();
console.log(postalCodes);

// Fetch locations
const locations = postalPh.fetchLocations();
console.log(locations);

// Fetch regions
const regions = postalPh.fetchRegions();
console.log(regions);

// Fetch all data lists
const allData = postalPh.fetchDataLists();
console.log(allData);
```

You can also specify search criteria and limit the number of results returned:

```javascript
// Fetch a list of municipalities starting with 'Manila' and limit the result to 10
const municipalities = postalPh.fetchMunicipalities({search: 'Manila', limit: 10});
console.log(municipalities);

// Fetch postal code for 6045
const postalCodes = postalPh.fetchPostCodes({search: 6045});
console.log(postalCodes);

// Fetch postal codes with a limit of 5
const postalCodes = postalPh.fetchPostCodes({limit: 5});
console.log(postalCodes);

// Fetch locations containing 'Cebu' and limit the result to 3
const locations = postalPh.fetchLocations({search: 'Cebu', limit: 3});
console.log(locations);

// Fetch regions starting with 'NCR' and limit the result to 8
const regions = postalPh.fetchRegions({search: 'NCR', limit: 8});
console.log(regions);

// Fetch all data lists with a limit of 15
const allData = postalPh.fetchDataLists(15);
console.log(allData);
```

## Return Values

When fetching data, the function returns either an array of objects or an array of strings, depending on the method
used:

- If the method returns an array of objects:
    - Each object represents a place with the following properties:
        - `municipality`: The name of the municipality.
        - `location`: The specific district or neighborhood.
        - `post_code`: The postal code.
        - `region`: The region where the place is located.

- If the method returns an array of strings or numbers:
    - Each string or number represents a specific piece of information, such as a postal code, location, or region.

## Query Options

When using the library's methods, you have the option to include an object containing two parameters:

- **Search**: This parameter is used to find specific information. For postal codes, search directly for the code
  itself.
- **Limit**: Optionally restricts the number of results returned. Please note that the `limit` parameter doesn't apply
  to postal codes. It functions differently and cannot be used to restrict the results when searching for postal codes.

## Contribution

Contributions are highly appreciated; simply fork the repository and create a pull request. Please be aware
that while this library provides information, it may not be comprehensive.

## License

MIT &copy; [blckclov3r](https://github.com/blckclov3r/use-postal-ph#readme)