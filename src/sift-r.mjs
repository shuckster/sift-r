import * as lib from 'match-iz'

const { match, against, when, otherwise } = lib
const { not, allOf, firstOf, every, gte } = lib
const { isArray, isPojo, isFunction, isString } = lib

//
// Helpers
//

const pushTo = arr => item => arr.push(item)
const addToSet = set => item => set.add(item)
const addToMap = (map, key) => value => map.set(key, value)
const assignEntryTo =
  obj =>
  ([K, V]) =>
    Object.assign(obj, { [K]: V })

//
// Matchers
//

const isSet = x => x instanceof Set
const isMap = x => x instanceof Map

// TODO: can bring in from `match-iz` in the future
const isIterable = x =>
  x != null && [x[Symbol.iterator], x.next].every(isFunction)

const isArrayOfBinaryArrays = allOf(
  isArray,
  every(isArray),
  every({ length: 2 })
)

const isPojoOfBinaryArrays = allOf(isPojo, val =>
  isArrayOfBinaryArrays(Object.values(val))
)

const isLenGte2 = { length: gte(2) }
const isArrayMatcher = allOf(firstOf(isArray, not(isArray)), isLenGte2)
const isNotSetOrMap = allOf(not(isSet), not(isMap))
const isSetMatcher = allOf(firstOf(isSet, isNotSetOrMap), isLenGte2)
const isMapMatcher = allOf(firstOf(isMap, isNotSetOrMap), isLenGte2)
const isIterableMatcher = allOf(firstOf(isIterable), isLenGte2)

//
// Arrays
//

const siftArrayAgainstSchema = ([arr, schema]) =>
  arr.reduce(
    ([left, right], V, K) =>
      match(V)(
        when(schema[K])(V => [[...left, V], right]),
        otherwise(() => [left, [...right, V]])
      ),
    [[], []]
  )

const siftArrayOfBinaryArrays = ([arrayOfBinaryArrays]) =>
  siftArrayAgainstSchema(
    arrayOfBinaryArrays.reduce(
      ([arr, schema], [T, V]) => [
        [...arr, V],
        [...schema, T]
      ],
      [[], []]
    )
  )

const siftArrayAgainstPatterns = ([arr, ...patterns]) => {
  const results = Array.from({ length: patterns.length }).map(() => [])
  const noMatch = []
  arr.forEach(
    against(
      ...patterns.map((pattern, idx) => when(pattern)(pushTo(results[idx]))),
      otherwise(pushTo(noMatch))
    )
  )
  return [...results, noMatch]
}

//
// Set
//

const siftSetAgainstPatterns = ([set, ...patterns]) => {
  const results = Array.from({ length: patterns.length }).map(() => new Set())
  const noMatch = new Set()
  set.forEach(
    against(
      ...patterns.map((pattern, idx) => when(pattern)(addToSet(results[idx]))),
      otherwise(addToSet(noMatch))
    )
  )
  return [...results, noMatch]
}

//
// Map
//

const siftMapAgainstPatterns = ([map, ...patterns]) => {
  const results = Array.from({ length: patterns.length }).map(() => new Map())
  const noMatch = new Map()
  map.forEach((value, key) =>
    match(value)(
      ...patterns.map((pattern, idx) =>
        when(pattern)(addToMap(results[idx], key))
      ),
      otherwise(addToMap(noMatch, key))
    )
  )
  return [...results, noMatch]
}

//
// Iterables
//

const siftIterableAgainstPatterns = ([iter, ...patterns]) => {
  const results = Array.from({ length: patterns.length }).map(() => [])
  const noMatch = []
  for (const value of iter) {
    match(value)(
      ...patterns.map((pattern, idx) => when(pattern)(pushTo(results[idx]))),
      otherwise(pushTo(noMatch))
    )
  }
  return [...results, noMatch]
}

//
// Pojo
//

const siftPojoAgainstSchema = ([pojo, schema]) =>
  Object.entries(pojo).reduce(
    ([left, right], [K, V]) =>
      match(V)(
        when(schema[K])(() => [{ ...left, [K]: V }, right]),
        otherwise(() => [left, { ...right, [K]: V }])
      ),
    [{}, {}]
  )

const siftPojoOfBinaryArrays = ([pojoOfBinaryArrays]) =>
  siftPojoAgainstSchema(
    Object.entries(pojoOfBinaryArrays).reduce(
      ([pojo, schema], [K, [T, V]]) => [
        { ...pojo, [K]: V },
        { ...schema, [K]: T }
      ],
      [{}, {}]
    )
  )

const siftPojoAgainstPredicate = ([pojo, predicate]) =>
  siftPojoAgainstSchema([
    pojo,
    Object.keys(pojo).reduce((schema, K) => ({ ...schema, [K]: predicate }), {})
  ])

const siftPojoAgainstPatterns = ([pojo, arr]) => {
  const results = Array.from({ length: arr.length }).map(() => ({}))
  const noMatch = {}
  Object.entries(pojo).forEach(
    against(
      ...arr.map((T, idx) => when([isString, T])(assignEntryTo(results[idx]))),
      otherwise(assignEntryTo(noMatch))
    )
  )
  return [...results, noMatch]
}

//
// Overloads
//

const siftOverloads = against(
  // Pojo
  when([isPojoOfBinaryArrays])(siftPojoOfBinaryArrays),
  when([isPojo, isPojo])(siftPojoAgainstSchema),
  when([isPojo, isFunction])(siftPojoAgainstPredicate),
  when([isPojo, isArray])(siftPojoAgainstPatterns),

  // Array
  when([isArrayOfBinaryArrays])(siftArrayOfBinaryArrays),
  when([isArray, isArray])(siftArrayAgainstSchema),
  when(isArrayMatcher)(siftArrayAgainstPatterns),

  // Set
  when(isSetMatcher)(siftSetAgainstPatterns),

  // Map
  when(isMapMatcher)(siftMapAgainstPatterns),

  // Other iterables
  when(isIterableMatcher)(siftIterableAgainstPatterns),

  // Passthru
  when([isPojo])(([input]) => [{}, input]),
  when([isArray])(([input]) => [[], input]),
  when([isSet])(([input]) => [new Set([]), input]),
  when([isMap])(([input]) => [new Map([]), input]),
  otherwise(([input]) => [undefined, input])
)

//
// Exports
//

export function sift(input, ...optionalSchema) {
  return siftOverloads([input, ...optionalSchema])
}

export const byPattern = pattern =>
  against(
    when(pattern, x => x),
    otherwise(undefined)
  )
