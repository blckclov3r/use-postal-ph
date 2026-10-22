# use-postal-ph — Agent Instructions

TypeScript library published on npm as `use-postal-ph`: Philippine postal codes, municipalities, locations, and regions. All data is embedded; no runtime dependencies.

## Commands
| Task | Command |
|------|---------|
| Build CJS + ESM + types | `pnpm build` |
| Type-check source, tests, and configs | `pnpm typecheck` |
| Core tests (offline, 15 runs) | `pnpm test tests/index.spec.ts` |
| One core test | `pnpm test tests/index.spec.ts -g "post-code"` |
| Full suite incl. live-site e2e | `pnpm test` |
| Install Playwright browsers | `pnpm exec playwright install` |

- Bare `pnpm test` also runs `tests/web.spec.ts` against `https://use-postal-ph.vercel.app/`; those 12 runs fail (not skip) when browsers are missing or the site is down.
- CI (`.github/workflows/playwright.yml`) uses **pnpm** (pinned via `packageManager`) with `--frozen-lockfile`, then `typecheck` → `build` → core tests. The live-site suite runs nightly/manual in `.github/workflows/web-e2e.yml`, never on PRs.

## Architecture
- `src/index.ts` — sole entry point; default export `usePostalPH()` returns `fetchMunicipalities`, `fetchPostCodes`, `fetchLocations`, `fetchRegions`, `fetchDataLists`.
- `src/logic/placeDataArray.ts` — all 2,139 data entries, ~12.8k lines. Data changes happen here.
- `src/logic/geographicDataFetcher.ts` — search, filtering, unique-value extraction.
- `src/types/placeTypes.ts` — public types: `PlaceProps`, `SearchCriteriaProps`, `PlaceListCriteriaProps`, `FetchResult<T>`.

## Behavior that bites
- Search is case-insensitive and treats `n`/`ñ` as equivalent.
- Municipalities, locations, and `fetchDataLists` fields match by **prefix**; `fetchRegions` matches **exactly** (anchored `^...$`).
- `fetchPostCodes({search})` returns a single `PlaceProps | undefined`; without `search` it returns `{data, count}`. `limit` is ignored in the search path.
- `fetchDataLists` ANDs its municipality/post_code/region/location filters.

## Build and release
- `tsup.config.ts`: CJS + ESM + `.d.ts`, ES5 target, Terser-minified (strips console/debugger), single-file bundles.
- `dist/` is gitignored and not committed; only `dist` is packaged. `prepublishOnly` runs the build automatically, but run `pnpm build` manually to verify before publishing.
- No lint script. `pnpm typecheck` covers `src/`, `tests/`, and config files. Other scripts: prepublishOnly, test, test-headed, test-web, codegen, debug-web, report, build, start.
- Release step: update data/version in `package.json`, `pnpm build`, publish.

## Environment quirks
- `tsconfig.json`: `declaration` + `declarationMap`, `strict`, `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, `noUnusedLocals/Parameters`, `isolatedModules`, `skipLibCheck`; `target: ES5`, `module: ESNext`, `moduleResolution: Node`. Includes tests and configs, not just `src/`.
- Playwright runs every spec in chromium, firefox, and webkit (5 core tests → 15 runs, 4 web tests → 12 runs).
- `engines` advertises Node `>=10` for consumers, but CI and dev tooling require current LTS (Playwright, tsup, TS 5.9). Avoid syntax that cannot compile to ES5.
- `.agents/` and `skills-lock.json` are gitignored; the skill setup is local-only and should not be committed.
