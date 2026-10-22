# Data Sources and Attribution

`use-postal-ph` embeds a manually maintained dataset of Philippine regions, provinces, cities, municipalities,
locations, and postal codes. It is **not** an official product of the Philippine Statistics Authority (PSA) or the
Philippine Postal Corporation (PHLPost).

## Sources

| Data | Source | Role | Last accessed |
| --- | --- | --- | --- |
| Regions, provinces, cities, and municipalities | [PSA — Philippine Standard Geographic Code (PSGC)](https://psa.gov.ph/classification/psgc) | Primary official reference | 2026-10-23 |
| Postal codes | [PHLPost — ZIP Code Locator](https://phlpost.gov.ph/zip-code-locator) | Primary official reference | 2026-10-23 |

## Maintenance notes

- The dataset is compiled from official PSA PSGC and PHLPost sources.
- Corrections include BARMM region assignments, the 2022 split of Maguindanao into Maguindanao del Norte and
  Maguindanao del Sur, official municipality names, and duplicate removal.
- The data is updated manually when errors are reported or official sources change. It is not a live feed.
- Last data update: **2026-10-23** — **2,048 rows**.

## Licensing

### Source code

The library's source code is licensed under the [MIT License](./LICENSE).

### Data

The dataset is a factual compilation from Philippine government sources (PSA and PHLPost). Under Section 176 of
Republic Act No. 8293 (the Intellectual Property Code of the Philippines), works of the Government of the Philippines
are not protected by copyright. Attribution is provided as a courtesy; prior approval may be required to exploit
government works for profit. This is general information, not legal advice; consult the source agencies or legal
counsel for commercial use.

## Known limitations

- Administrative divisions and postal codes change. Verify critical information with PSA and PHLPost.
- The dataset may not be exhaustive and may contain errors or omissions. Corrections are welcome.
- Data contributions should cite the official source URL and access date.

## Disclaimer

This project is not affiliated with, endorsed by, or sponsored by PSA, PHLPost, or the Philippine government. All
official names and trademarks belong to their respective owners.