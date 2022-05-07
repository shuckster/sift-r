# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## [1.3.2] - 2022-05-07

### Updated

- README tweaks

## [1.3.0] - 2022-05-06

### Added

- `byPattern`, useful for applying a `match-iz` pattern to `Array#map` and `Array#filter`

## [1.2.2] - 2022-05-05

### Fixed

- `match-iz` `pluck()` method was not working when sifting an array against a single pattern

## [1.2.1] - 2022-04-22

### Fixed

- Corrected README example
- Fixed pnpm lockfile

## [1.2.0] - 2022-04-21

### Added

- Allow multiple patterns to be specified when sifting an array:

```js
import { lt } from 'match-iz'

const [oneYearOlds, lessThan40, theRest] = sift(
  [
    { user: 'barney', age: 36, active: false },
    { user: 'fred', age: 40, active: true },
    { user: 'pebbles', age: 1, active: false }
  ],
  { age: 1, active: false },
  { age: lt(40) }
)
```

## [1.1.4] - 2022-04-15

### Removed / Fixed

- Remove `browser` setting from `package.json`; seems to cause issues with CodeSandbox build process, and isn't really necessary since the browser-build is something that's interacted with manually.

## [1.1.3] - 2022-04-13

- Fix package.json exports for Remix.run

### Updated

## [1.1.1] - 2022-04-10

### Updated

- README updated to include `match-iz` mention

## [1.1.0] - 2022-03-07

### Updated

- Binary arrays now accept match-iz patterns, not just fn-predicates

## [1.0.1] - 2022-02-06

### Added

- Badges
- Linting

## [1.0.0] - 2022-02-06

### Added

- sift-r :)
