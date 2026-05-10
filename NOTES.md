# Implementation notes

## Overview

SvelteKit (Svelte 5) dashboard: client-side load of `/api/students`, normalization into a typed view model, and a responsive card grid with filtering, sorting, and search. Styling is hand-written CSS; shared constraints live as custom properties on `:root`.

## Approach

The page component owns orchestration only: it holds the API-backed `students` array, performs the `onMount` fetch with `AbortController`, and derives the visible list through a pure projection (`getDisplayedStudents`) rather than mutating or re-fetching when filters change. That keeps derived UI state obvious, easy to test, and safe under concurrent requests.

Transformation and parsing sit in small utilities (`assertStudentDataArray`, `transformStudentDataItem`, `calculateAge`) so the README’s mapping rules stay isolated from markup. A single guard at the JSON boundary fails fast on unexpected payloads instead of scattering defensive checks through the mapper.

Visual work follows the provided Figma; design tokens (spacing, type scale, surfaces, layout widths) centralize decisions so components stay declarative and reviewers can retune the skin without hunting literals.

## Responsive layout

The grid is CSS Grid with explicit column tracks at fixed card width. Breakpoints are expressed as literal `min-width` values in `@media` while the same numbers remain documented on `:root` for design-system consistency—viewport media queries and `var()` do not compose reliably across engines, so duplicating the breakpoint as `px` avoids silent layout regression.

## Assumptions

The API contract matches `src/lib/data.ts`: numeric `id`, string names and `birthdate`, boolean `isActive`, and numeric trio scores. `birthdate` is interpreted as a calendar date in `YYYY-MM-DD` form; age is whole years on the local calendar relative to “now”, avoiding UTC midnight drift on the day boundary.

`passedLabel` uses the same rounded average that is shown as the student’s score, so pass/fail never disagrees with the UI.

Validation is structural (shape and primitive types), not domain-heavy: this is a demo API, not an untrusted feed. Malformed dates yield a conservative age of zero rather than throwing.

## Accessibility and UX

Keyboard path includes a skip link into `<main>`, associated labels on controls, and a polite live region summarizing result counts. Cards use semantic grouping (`article`, definition list) and the result set is a list for screen-reader context. Search is debounced to limit churn while typing but clears immediately when the field is emptied.

## Testing

Vitest with jsdom covers age edge cases, transform/assert behavior, and list projection (search, active filter, sort) without mounting the full page. A small set of component tests smoke loading and error surfaces. Svelte’s `mount` under Vitest required aligning Vite’s `resolve.conditions` with browser builds—see `vite.config.ts`. Use `npm run test` for watch mode or `npm run test:run` in CI.

## Tradeoffs

Data loads in `onMount` to match the exercise stub; a `+page.ts` load function would be the next step for SSR or stale-while-revalidate. Filter and sort state are not synced to the URL, which keeps scope contained at the cost of shareable deep links. Tightening validation (score ranges, date plausibility) would follow if the backend were not fixed.

## Reference

[Figma — Ekorn Coding](https://www.figma.com/design/k2LhkpH9ilcWXA9JjtibBC/Ekorn-Coding---Myroslava?node-id=6-38&t=1qyggasjJQ2LBSwO-0)
