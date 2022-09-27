import * as lib from 'match-iz'

const { match, against, when, otherwise } = lib
const { not, allOf, firstOf, every, gte } = lib
const { isArray, isPojo, isFunction, isString } = lib

const isSet = x => x instanceof Set
const isMap = x => x instanceof Map

const isArrayOfBinaryArrays = allOf(
  isArray,
  every(isArray),
  every({ length: 2 })
)

const isPojoOfBinaryArrays = allOf(isPojo, val =>
  isArrayOfBinaryArrays(Object.values(val))
)

export function sift(input, ...optionalSchema) {
  return match([input, ...optionalSchema])(
    // Pojo
    when([isPojoOfBinaryArrays])(siftPojoOfBinaryArrays),
    when([isPojo, isPojo])(siftPojoAgainstSchema),
    when([isPojo, isFunction])(siftPojoAgainstPredicate),
    when([isPojo, isArray])(siftPojoAgainstPatterns),

    // Array
    when([isArrayOfBinaryArrays])(siftArrayOfBinaryArrays),
    when([isArray, isArray])(siftArrayAgainstSchema),
    when([isArray, not(isArray)])(siftArrayAgainstPattern),
    when(allOf(firstOf(isArray), { length: gte(2) }))(siftArrayAgainstPatterns),

    // Set
    when([isSet, allOf(not(isSet), not(isMap))])(siftSetAgainstPattern),
    when(allOf(firstOf(isSet), { length: gte(2) }))(siftSetAgainstPatterns),

    // Map
    when([isMap, allOf(not(isSet), not(isMap))])(siftMapAgainstPattern),
    when(allOf(firstOf(isMap), { length: gte(2) }))(siftMapAgainstPatterns),

    // Passthru
    when([isPojo])(([input]) => [{}, input]),
    when([isArray])(([input]) => [[], input]),
    when([isSet])(([input]) => [new Set([]), input]),
    when([isMap])(([input]) => [new Map([]), input]),
    otherwise(([input]) => [undefined, input])
  )
}

export const byPattern = pattern =>
  against(
    when(pattern, x => x),
    otherwise(undefined)
  )

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

const siftArrayAgainstPattern = ([arr, pattern]) =>
  siftArrayAgainstSchema([
    arr,
    Array.from({ length: arr.length }).fill(pattern)
  ])

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

const siftSetAgainstPattern = ([set, pattern]) =>
  siftSetAgainstPatterns([set, pattern])

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

const siftMapAgainstPattern = ([map, pattern]) =>
  siftMapAgainstPatterns([map, pattern])

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
// Helpers
//

function pushTo(arr) {
  return item => arr.push(item)
}

function addToSet(set) {
  return item => set.add(item)
}

function addToMap(map, key) {
  return value => map.set(key, value)
}

function assignEntryTo(obj) {
  return ([K, V]) => Object.assign(obj, { [K]: V })
}
