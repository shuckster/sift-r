declare module 'sift-r' {
  /**
   * @example
   * sift(input, optionalSchemaOrPattern)
   *
   * // Working with plain-objects (pojos)
   * 1: sift({ key: [pattern, value], ... })
   * 2: sift({ key: value }, { key: pattern })
   * 3: sift({ key: value }, pattern)
   * 4: sift({ key: value }, [pattern, pattern, ...])
   *
   * // Working with arrays
   * 5: sift([[pattern, value], [pattern, value], ...])
   * 6: sift([value, value], [pattern, pattern])
   * 7: sift([value, value], value-pattern)
   */
  export function sift(input: any, optionalSchemaOrPattern: any): Array<any>
}
