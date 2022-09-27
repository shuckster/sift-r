<h1 align="center"><code>sift-r</code> 📥</h1>

<p align="center">
  <a href="https://github.com/shuckster/sift-r/blob/master/LICENSE">
    <img
      alt="MIT license"
      src="https://img.shields.io/npm/l/sift-r?style=plastic"
    /></a>
  <a href="https://www.npmjs.com/package/sift-r">
    <img
      alt="Downloads per week"
      src="https://img.shields.io/npm/dw/sift-r?style=plastic"
    /></a>
  <a href="https://bundlephobia.com/result?p=sift-r">
    <img
      alt="npm bundle size"
      src="https://img.shields.io/bundlephobia/minzip/sift-r?style=plastic"
    /></a>
  <a href="https://www.npmjs.com/package/sift-r">
    <img
      alt="Version"
      src="https://img.shields.io/npm/v/sift-r?style=plastic"
    /></a>
</p>

A complement to [match-iz](https://github.com/shuckster/match-iz) for filtering objects, arrays, and `Map`/`Set` based on a `match-iz` pattern.

- 🗺 [byPattern() for map/filter](#bypattern)
- 📥 [sift() an object](#sift-an-object)
- 📁 [sift() an array](#sift-an-array)
- 🗂 [sift() an array into multiple buckets](#sift-an-array-into-multiple-buckets)
- 🗺 [sift() a Map or Set](#sift-a-map-or-set)
- 📖 [Documentation](https://github.com/shuckster/sift-r/wiki)
- 📀 [Install / Use](#install--use)

### `byPattern()`

```js
import { byPattern } from 'sift-r'

const filtered = [
  { user: 'barney', age: 36, active: false },
  { user: 'fred', age: 40, active: true },
  { user: 'pebbles', age: 1, active: false }
].filter(
  byPattern({
    age: 36
  })
)

// filtered ===
//   [
//     { user: 'barney', age: 36, active: false }
//   ]

import { pluck, isNumber } from 'match-iz'

const mapped = [
  { user: 'barney', age: 36, active: false },
  { user: 'fred', age: 40, active: true },
  { user: 'pebbles', age: 1, active: false },
  { user: '', age: 'not-a-number', active: true }
].map(
  byPattern({
    age: pluck(isNumber)
  })
)

// mapped === [36, 40, 1, undefined]
```

### `sift()` an object

```js
import { sift } from 'sift-r'

const isString = x => typeof x === 'string'
const isNumber = x => typeof x === 'number'

const [strValues, numValues, neither] = sift(
  {
    title: 'header',
    slug: 1,
    markdown: '# header',
    footer: undefined
  },
  [isString, isNumber]
)

// strValues ===
//   {
//     title: 'header',
//     markdown: '# header'
//   }

// numValues ===
//   {
//     slug: 1
//   }

// neither ===
//   {
//     footer: undefined
//   }
```

### `sift()` an array

(+using [match-iz](https://github.com/shuckster/match-iz) pattern-helpers)

```js
import { sift } from 'sift-r'
import { gte, allOf } from 'match-iz'

const users = [
  { user: 'barney', age: 36, active: false },
  { user: 'fred', age: 40, active: true },
  { user: 'pebbles', age: 1, active: true }
]

const isActive = { active: true }
const isGrownUp = { age: gte(18) }
const isActiveGrownUp = allOf(isActive, isGrownUp)

const [activeGrownUps, everyoneElse] = sift(users, isActiveGrownUp)

// activeGrownUps ===
//   [
//     { user: 'fred', age: 40, active: true }
//   ]

// everyoneElse ===
//   [
//     { user: 'barney', age: 36, active: false },
//     { user: 'pebbles', age: 1, active: true }
//   ]
```

### `sift()` an array into multiple buckets

```js
import { sift } from 'sift-r'
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

// oneYearOlds ===
//   [{ user: 'pebbles', age: 1, active: false }]

// lessThan40 ===
//   [{ user: 'barney', age: 36, active: false }]

// theRest ===
//   [{ user: 'fred', age: 40, active: true }]
```

### `sift()` a `Map` or `Set`

```js
import { sift } from 'sift-r'
import { lt } from 'match-iz'

const [oneYearOlds, lessThan40, theRest] = sift(
  new Set([
    { user: 'barney', age: 36, active: false },
    { user: 'fred', age: 40, active: true },
    { user: 'pebbles', age: 1, active: false }
  ]),
  { age: 1, active: false },
  { age: lt(40) }
)

// oneYearOlds ===
//   new Set([
//     { user: 'pebbles', age: 1, active: false }
//   ])

// lessThan40 ===
//   new Set([
//     { user: 'barney', age: 36, active: false }
//   ])

// theRest ===
//   new Set([
//     { user: 'fred', age: 40, active: true }
//   ])
```

## Install / Use

```
$ pnpm i sift-r
```

Supports `import`/`require` for ESM/CJS.

Browser/UMD version here:

```html
<script src="https://unpkg.com/sift-r/dist/browser/sift-r.browser.js"></script>
<script>
  const { sift, byPattern } = siftr
</script>
```

# Documentation

`sift()` has several call-signatures, all of which are [documented on the Wiki](https://github.com/shuckster/sift-r/wiki).

# Credits

`sift-r` was written by [Conan Theobald](https://github.com/shuckster/).

I hope you found it useful! If so, I like [coffee ☕️](https://www.buymeacoffee.com/shuckster) :)

## License

MIT licensed: See [LICENSE](LICENSE)
