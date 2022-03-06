<h1 align="center"><code>sift-r</code> 📥</h1>

<p align="center">
  <a href="https://github.com/shuckster/sift-r/blob/master/LICENSE">
    <img
      alt="MIT license"
      src="https://img.shields.io/npm/l/sift-r?style=plastic"
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

Apportion objects / arrays into multiple buckets based on a predicate / pattern.

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

## Install / Use

```
$ pnpm i sift-r
```

Supports `import`/`require` for ESM/CJS.

Browser/UMD version here:

```html
<script src="https://unpkg.com/sift-r/dist/browser/sift-r.browser.js"></script>
<script>
  const { sift } = siftr
</script>
```

# Documentation

`sift()` has several call-signatures (the above example is `#4`):

```js
sift(input, optionalSchemaOrPattern)

// Working with plain-objects (pojos)
1: sift({ key: [pattern, value], key: [pattern, value], ... })
2: sift({ key: value }, { key: pattern })
3: sift({ key: value }, pattern)
4: sift({ key: value }, [pattern, pattern, ...])

// Working with arrays
5: sift([[pattern, value], [pattern, value], ...])
6: sift([value, value], [pattern, pattern])
7: sift([value, value], value-pattern)
```

`pattern` means either a `predicate` function, or something that the [match-iz](https://github.com/shuckster/match-iz#documentation) `when()` method supports, because `sift` uses `match-iz` internally.

- When working with [pojos](https://google.com/search?q=javascript+pojo), the pattern is applied to each key/value pair.

- When working with arrays, the pattern is applied to each item in the array.

Here are call-signatures #1-3 (pojos):

```js
// 1:
//
const [strValues, failed] = sift({
  title: [isString, 'header'],
  slug: [isString, 1],
  markdown: [isString, '# header'],
  footer: [isString, undefined]
})

// 2:
//
const [strValues, failed] = sift(
  {
    title: 'header',
    slug: 1,
    markdown: '# header',
    footer: undefined
  },
  {
    title: isString,
    slug: isString,
    markdown: isString,
    footer: isString
  }
)

// 3:
//
const [strValues, failed] = sift(
  {
    title: 'header',
    slug: 1,
    markdown: '# header',
    footer: undefined
  },
  isString
)
```

Call-signatures #5-7 (arrays):

```js
// 5:
//
const [strValues, failed] = sift([
  [isString, 'header'],
  [isString, 1],
  [isString, '# header']
])

// 6:
//
const [strValues, failed] = sift(
  ['header', 1, '# header'],
  [isString, isString, isString]
)

// 7:
//
const [strValues, failed] = sift(
  ['header', 1, '# header'],
  isString
)
```

You can find more examples in the [test suite](tests/run.mjs).

# Credits

`sift-r` was written by [Conan Theobald](https://github.com/shuckster/).

I hope you found it useful! If so, I like [coffee ☕️](https://www.buymeacoffee.com/shuckster) :)

## License

MIT licensed: See [LICENSE](LICENSE)
