# use-postal-ph

This utility library is specifically designed for the Philippines, providing comprehensive information on postal codes,
municipalities, locations, and regions. Moreover, searching within the library is case insensitive.

![use-postal-ph](https://github.com/blckclov3r/use-postal-ph/blob/master/img/use-postal-ph.png?raw=true)

[![npm version](https://img.shields.io/npm/v/use-postal-ph?style=flat-square&alt=use-postal-ph)](https://www.npmjs.com/package/use-postal-ph)
[![Bundlephobia](https://img.shields.io/bundlephobia/min/use-postal-ph)](https://bundlephobia.com/result?p=use-postal-ph)
[![Downloads](https://img.shields.io/npm/dt/use-postal-ph.svg?style=flat-square)](https://www.npmjs.com/package/use-postal-ph)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/blckclov3r)
[![jsDocs.io](https://img.shields.io/badge/jsDocs.io-reference-blue)](https://www.jsdocs.io/package/use-postal-ph)

## Contents

* [Installation](#installation)
* [Usage](#usage)
* [Demo](#demo)
* [Importing Types](#importing-types)
* [Type Definitions](#type-definitions)
* [Query Options](#query-options)
* [ECMAScript Module (ESM) Entry Point](#ecmascript-module-esm-entry-point)
* [Contribution Guidelines](#contribution-guidelines)
* [License](#license)

## Installation

Install via NPM:

```bash
npm install use-postal-ph
```

Or via Yarn:

```bash
yarn add use-postal-ph
```

## Usage

First, import the `use-postal-ph` function:

```typescript
import usePostalPH from 'use-postal-ph';
```

You can now utilize the library's methods to retrieve postal code, municipality, location, and region information.

```typescript
const postalPH = usePostalPH();

// Fetch a list of municipalities
const municipalities = postalPH.fetchMunicipalities();
console.log(municipalities);

// Fetch postal codes
const postalCodes = postalPH.fetchPostCodes();
console.log(postalCodes);

// Fetch locations
const locations = postalPH.fetchLocations();
console.log(locations);

// Fetch regions
const regions = postalPH.fetchRegions();
console.log(regions);

// Fetch all data lists
const dataLimit = postalPH.fetchDataLists();
console.log(dataLimit);
```

You can also specify search criteria and limit the number of results returned:

```typescript
// Fetch a list of municipalities starting with 'Manila' and limit the result to 10
const municipalities = postalPH.fetchMunicipalities({search: 'Manila', limit: 10});
console.log(municipalities);

// Fetch postal code for 6045
const postalCodes = postalPH.fetchPostCodes({search: 6045});
console.log(postalCodes);

// Fetch postal codes with a limit of 5
const postalCodesLimit = postalPH.fetchPostCodes({limit: 5});
console.log(postalCodesLimit);

// Fetch locations containing 'Cebu' and limit the result to 3
const locations = postalPH.fetchLocations({search: 'Cebu', limit: 3});
console.log(locations);

// Fetch regions starting with 'NCR' and limit the result to 8
const regions = postalPH.fetchRegions({search: 'NCR', limit: 8});
console.log(regions);

// Fetch all data lists with a limit of 15
const dataLimit = postalPH.fetchDataLists(15);
console.log(dataLimit);

// Fetch data based on the search criteria
const dataList = postalPH.fetchDataLists({
    post_code: 6045,
    location: "Talisay",
    region: "VII",
    municipality: "Cebu"
});
console.log(dataList);
```

## Demo

Explore the live demo to experience fetching and searching functionalities for municipalities, post codes, locations,
and regions. Interact with the application to witness its efficiency and responsiveness in action.

https://use-postal-ph.vercel.app

## Importing Types

You can also import specific types provided by use-postal-ph:

```typescript
import type {PlaceProps, SearchCriteriaProps, PlaceListCriteriaProps} from "use-postal-ph";
```

## Type Definitions

Here are the type definitions provided by `use-postal-ph`:

```typescript

export type PlaceDataProps = {
    data: PlaceProps[];
};

export type PlaceProps = {
    municipality?: string;
    location?: string;
    post_code?: number | string;
    region?: string;
};

export type SearchCriteriaProps = {
    search?: number | string;
    limit?: number;
};

export type PlaceListCriteriaProps = PlaceProps & {
    limit?: number;
};
```

## Query Options

When using the library's methods, you have the option to include an object containing parameters for more specific
queries:

- **search**: This parameter is used to find specific information. For postal codes, search directly for the code
  itself. You can also search for municipalities, locations, and regions based on your query.
- **limit**: Optionally restricts the number of results returned. Please note that the `limit` parameter doesn't apply
  to postal codes. It functions differently and cannot be used to restrict the results when searching for postal codes.


- **municipality**: Search by the name of the municipality.
- **post_code**: Search by the postal code.
- **location**: Search by the specific district or neighborhood.
- **region**: Search by the region where the place is located.

## ECMAScript Module (ESM) Entry Point

If you prefer not to install the package and want to include the ECMAScript module (ESM) entry point directly in your
project, you can use the following script tag:

- CDN (
  jsDelivr): [`https://cdn.jsdelivr.net/npm/use-postal-ph@1.1.3/dist/index.mjs`](https://cdn.jsdelivr.net/npm/use-postal-ph@1.1.3/dist/index.mjs)

- npm: [`https://unpkg.com/use-postal-ph@1.1.3/dist/index.mjs`](https://unpkg.com/use-postal-ph@1.1.3/dist/index.mjs)

```html

<script type="module">
    import usePostalPH from 'https://unpkg.com/use-postal-ph@1.1.3/dist/index.mjs';

    const {
        fetchDataLists,
        fetchLocations,
        fetchMunicipalities,
        fetchPostCodes,
        fetchRegions
    } = usePostalPH();

    console.log(fetchPostCodes({search: "6045"}))
</script>
```

This script imports the `fetchPostCodes` function from the `use-postal-ph` package and retrieves information for the
postal code '6045'. It then logs the result to the console.

```json
{
  "municipality": "Cebu",
  "region": "VII",
  "location": "Talisay",
  "post_code": 6045
}
```

## Contribution Guidelines

Contributions are highly appreciated! To contribute, fork the repository, create a new branch for your changes, and
submit a pull request. Please ensure your code adheres to the existing coding standards and conventions. While this
library provides information, it may not be comprehensive. Contributions aimed at enhancing the comprehensiveness of the
data are welcome.

## License

MIT &copy; [blckclov3r](https://github.com/blckclov3r/use-postal-ph?tab=MIT-1-ov-file)