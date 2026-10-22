# use-postal-ph — Agent Instructions

TypeScript library published on npm as `use-postal-ph`: Philippine postal codes, municipalities, locations, and regions. This repository is the package itself, not a web app; the npm package ships `dist/` plus `DATA_SOURCES.md` (README and LICENSE are included automatically). All data is embedded; no runtime dependencies.

## Commands
| Task | Command |
|------|---------|
| Build CJS + ESM + types | `pnpm build` |
| Type-check source, tests, and configs | `pnpm typecheck` |
| Library tests (default, offline, 18 runs) | `pnpm test` |
| One library test | `pnpm test -g "post-code"` |
| Install Playwright browsers | `pnpm exec playwright install` |

- This repo is the npm library, not the demo site. The demo at `https://use-postal-ph.vercel.app/` is deployed separately and has no tests here.
- CI (`.github/workflows/playwright.yml`) uses **pnpm** (pinned via `packageManager`) with `--frozen-lockfile`, then `typecheck` → `build` → library tests.

## Architecture
- `src/index.ts` — sole entry point; default export `usePostalPH()` lazily creates one shared fetcher exposing `fetchMunicipalities`, `fetchPostCodes`, `fetchLocations`, `fetchRegions`, `fetchDataLists`.
- `src/logic/placeDataArray.ts` — all 2,048 data entries, ~12.8k lines. Data changes happen here.
- `src/logic/geographicDataFetcher.ts` — search, filtering, unique-value extraction.
- `src/types/placeTypes.ts` — public types: `PlaceProps`, `SearchCriteriaProps`, `PlaceListCriteriaProps`, `FetchResult<T>`.
- `DATA_SOURCES.md` — data provenance, attribution, licensing, and limitations; packaged with the library. Keep its source list and audit date in sync with data changes.

## Behavior that bites
- Search is case-insensitive and treats `n`/`ñ` as equivalent.
- Municipalities, locations, and `fetchDataLists` fields match by **prefix**; `fetchRegions` matches **exactly** (anchored `^...$`).
- `fetchPostCodes({search})` returns a single `PlaceProps | undefined`; without `search` it returns `{data, count}`. `limit` is ignored in the search path.
- `fetchDataLists` ANDs its municipality/post_code/region/location filters.
- `limit` slices the returned list only; unique-value caches must stay complete or a limited first call would poison later unlimited calls.

## Build and release
- `tsup.config.ts`: CJS + ESM + `.d.ts`, ES5 target, Terser-minified (strips console/debugger), single-file bundles.
- `dist/` is gitignored and not committed; `files` packages `dist/` and `DATA_SOURCES.md` (npm also includes README/LICENSE). `prepublishOnly` runs typecheck → tests → build.
- `exports` maps `import` to `.mjs`/`.d.mts` and `require` to `.js`/`.d.ts`; keep the legacy `main`/`module`/`types` fields in sync.
- No lint script. `pnpm typecheck` covers `src/`, `tests/`, and config files. Other scripts: prepublishOnly, test, test-headed, report, build, start.
- Release step: update data/version and refresh `DATA_SOURCES.md` (date/row count) before publishing; `prepublishOnly` verifies and builds.

## Environment quirks
- `tsconfig.json`: `declaration` + `declarationMap`, `strict`, `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, `noUnusedLocals/Parameters`, `isolatedModules`, `skipLibCheck`; `target: ES5`, `module: ESNext`, `moduleResolution: Node`. Includes tests and configs, not just `src/`.
- Playwright runs the library suite in chromium, firefox, and webkit (6 tests → 18 runs).
- `engines` advertises Node `>=10` for consumers, but CI and dev tooling require current LTS (Playwright, tsup, TS 5.9). Avoid syntax that cannot compile to ES5.
- `.agents/` and `skills-lock.json` are gitignored; the skill setup is local-only and should not be committed.
