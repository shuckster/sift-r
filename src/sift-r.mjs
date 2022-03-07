import * as lib from 'match-iz'

const { match, against, when, otherwise } = lib
const { not } = lib
const { isArray, isPojo, isFunction, isString } = lib

const isArrayOfBinaryArrays = val =>
  isArray(val) && val.every(isArray) && val.every(x => x.length === 2)

const isPojoOfBinaryArrays = val =>
  isPojo(val) && isArrayOfBinaryArrays(Object.values(val))

export function sift(input, optionalSchema) {
  return match(optionalSchema ? [input, optionalSchema] : [input])(
    // Pojo
    when([isPojoOfBinaryArrays])(siftPojoOfBinaryArrays),
    when([isPojo, isPojo])(siftPojoAgainstSchema),
    when([isPojo, isFunction])(siftPojoAgainstPredicate),
    when([isPojo, isArray])(siftPojoAgainstPatterns),

    // Array
    when([isArrayOfBinaryArrays])(siftArrayOfBinaryArrays),
    when([isArray, isArray])(siftArrayAgainstSchema),
    when([isArray, not(isArray)])(siftArrayAgainstPattern),

    // Passthru
    when([isPojo])(([input]) => [{}, input]),
    when([isArray])(([input]) => [[], input]),
    otherwise(([input]) => [undefined, input])
  )
}

//
// Arrays
//

const siftArrayAgainstSchema = ([arr, schema]) =>
  arr.reduce(
    ([left, right], V, K) =>
      match(V)(
        when(schema[K])(() => [[...left, V], right]),
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

const siftArrayAgainstPattern = ([arr, predicate]) =>
  siftArrayAgainstSchema([
    arr,
    Array.from({ length: arr.length }).fill(predicate)
  ])

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
  const none = {}
  Object.entries(pojo).forEach(
    against(
      ...arr.map((T, idx) => when([isString, T])(assignTo(results[idx]))),
      otherwise(assignTo(none))
    )
  )
  return [...results, none]

  function assignTo(obj) {
    return ([K, V]) => Object.assign(obj, { [K]: V })
  }
}
