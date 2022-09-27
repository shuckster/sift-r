import { strict } from 'assert'
import { pluck, isPojo, isArray, isString, isNumber, lt } from 'match-iz'

import { sift, byPattern } from '../src/sift-r.mjs'

const testCases = [
  //
  // Pojo
  //
  [
    'siftPojoOfBinaryArrays',
    {
      cases: [
        {
          input: {
            title: [isString, 'header'],
            slug: [isString, 1],
            markdown: [isString, '# header'],
            footer: [isString, undefined],
            tags: [/^t/, 'tag']
          },
          expecting: [
            {
              title: 'header',
              markdown: '# header',
              tags: 'tag'
            },
            {
              slug: 1,
              footer: undefined
            }
          ]
        }
      ],
      run: (assertCase, input) => {
        assertCase(sift(input))
      }
    }
  ],
  [
    'siftPojoAgainstSchema',
    {
      cases: [
        {
          input: [
            {
              title: 'header',
              slug: 1,
              markdown: '# header',
              footer: undefined,
              tags: 'tag'
            },
            {
              title: isString,
              slug: isString,
              markdown: isString,
              footer: isString,
              tags: /^t/
            }
          ],
          expecting: [
            {
              title: 'header',
              markdown: '# header',
              tags: 'tag'
            },
            {
              slug: 1,
              footer: undefined
            }
          ]
        }
      ],
      run: (assertCase, input) => {
        assertCase(sift(...input))
      }
    }
  ],
  [
    'siftPojoAgainstPredicate',
    {
      cases: [
        {
          input: [
            {
              title: 'header',
              slug: 1,
              markdown: '# header',
              footer: undefined
            },
            isString
          ],
          expecting: [
            {
              title: 'header',
              markdown: '# header'
            },
            {
              slug: 1,
              footer: undefined
            }
          ]
        }
      ],
      run: (assertCase, input) => {
        assertCase(sift(...input))
      }
    }
  ],
  [
    'siftPojoAgainstPatterns',
    {
      cases: [
        {
          input: [
            {
              title: 'header',
              slug: 1,
              markdown: '# header',
              footer: undefined
            },
            [isString, isNumber]
          ],
          expecting: [
            {
              title: 'header',
              markdown: '# header'
            },
            {
              slug: 1
            },
            {
              footer: undefined
            }
          ]
        },
        {
          input: [
            {
              title: 'header',
              slug: 1,
              markdown: '# header',
              footer: undefined
            },
            {
              title: isString,
              slug: '1',
              markdown: isString,
              footer: isString
            }
          ],
          expecting: [
            {
              title: 'header',
              markdown: '# header'
            },
            {
              slug: 1,
              footer: undefined
            }
          ]
        }
      ],
      run: (assertCase, input) => {
        assertCase(sift(...input))
      }
    }
  ],
  //
  // Array
  //
  [
    'siftArrayOfBinaryArrays',
    {
      cases: [
        {
          input: [
            [isString, 'header'],
            [isString, 1],
            [isString, '# header']
          ],
          expecting: [['header', '# header'], [1]]
        }
      ],
      run: (assertCase, input) => {
        assertCase(sift(input))
      }
    }
  ],
  [
    'siftArrayAgainstSchema',
    {
      cases: [
        {
          input: [
            ['header', 1, '# header'],
            [isString, isString, isString]
          ],
          expecting: [['header', '# header'], [1]]
        }
      ],
      run: (assertCase, input) => {
        assertCase(sift(...input))
      }
    }
  ],
  [
    'siftArrayAgainstPattern',
    {
      cases: [
        {
          input: [['header', 1, '# header'], isString],
          expecting: [['header', '# header'], [1]]
        },
        {
          input: [
            [
              { user: 'barney', age: 36, active: false },
              { user: 'fred', age: 40, active: true },
              { user: 'pebbles', age: 1, active: false }
            ],
            { age: 1, active: false }
          ],
          expecting: [
            [{ user: 'pebbles', age: 1, active: false }],
            [
              { user: 'barney', age: 36, active: false },
              { user: 'fred', age: 40, active: true }
            ]
          ]
        },
        {
          input: [
            [
              { user: 'barney', age: 36, active: false },
              { user: 'fred', age: 40, active: true },
              { user: 'pebbles', age: 1, active: false }
            ],
            { active: false }
          ],
          expecting: [
            [
              { user: 'barney', age: 36, active: false },
              { user: 'pebbles', age: 1, active: false }
            ],
            [{ user: 'fred', age: 40, active: true }]
          ]
        },
        {
          input: [
            [
              { user: 'barney', age: 36, active: false },
              { user: 'fred', age: 40, active: true },
              { user: 'pebbles', age: 1, active: false }
            ],
            o => o.active
          ],
          expecting: [
            [{ user: 'fred', age: 40, active: true }],
            [
              { user: 'barney', age: 36, active: false },
              { user: 'pebbles', age: 1, active: false }
            ]
          ]
        },
        {
          input: [
            [
              { user: 'barney', age: 36, active: false },
              { user: 'fred', age: 40, active: true },
              { user: 'pebbles', age: 1, active: false }
            ],
            { active: false, age: pluck(isNumber) }
          ],
          expecting: [
            [36, 1],
            [
              {
                user: 'fred',
                age: 40,
                active: true
              }
            ]
          ]
        }
      ],
      run: (assertCase, input) => {
        assertCase(sift(...input))
      }
    }
  ],
  [
    'siftArrayAgainstPatterns',
    {
      cases: [
        {
          input: [
            [
              { user: 'barney', age: 36, active: false },
              { user: 'fred', age: 40, active: true },
              { user: 'pebbles', age: 1, active: false }
            ],
            { age: 1, active: false },
            { age: lt(40) }
          ],
          expecting: [
            [{ user: 'pebbles', age: 1, active: false }],
            [{ user: 'barney', age: 36, active: false }],
            [{ user: 'fred', age: 40, active: true }]
          ]
        },
        {
          input: [
            [
              { user: 'barney', age: 36, active: false },
              { user: 'fred', age: 40, active: true },
              { user: 'pebbles', age: 1, active: false }
            ],
            { active: false, age: pluck(isNumber) },
            { active: true, age: pluck(isNumber) }
          ],
          expecting: [[36, 1], [40], []]
        }
      ],
      run: (assertCase, input) => {
        assertCase(sift(...input))
      }
    }
  ],
  //
  // Set
  //
  [
    'siftSetAgainstPattern',
    {
      cases: [
        {
          input: [new Set(['header', 1, '# header']), isString],
          expecting: [new Set(['header', '# header']), new Set([1])]
        },
        {
          input: [
            new Set([
              { user: 'barney', age: 36, active: false },
              { user: 'fred', age: 40, active: true },
              { user: 'pebbles', age: 1, active: false }
            ]),
            { age: 1, active: false }
          ],
          expecting: [
            new Set([{ user: 'pebbles', age: 1, active: false }]),
            new Set([
              { user: 'barney', age: 36, active: false },
              { user: 'fred', age: 40, active: true }
            ])
          ]
        },
        {
          input: [
            new Set([
              { user: 'barney', age: 36, active: false },
              { user: 'fred', age: 40, active: true },
              { user: 'pebbles', age: 1, active: false }
            ]),
            { active: false }
          ],
          expecting: [
            new Set([
              { user: 'barney', age: 36, active: false },
              { user: 'pebbles', age: 1, active: false }
            ]),
            new Set([{ user: 'fred', age: 40, active: true }])
          ]
        },
        {
          input: [
            new Set([
              { user: 'barney', age: 36, active: false },
              { user: 'fred', age: 40, active: true },
              { user: 'pebbles', age: 1, active: false }
            ]),
            o => o.active
          ],
          expecting: [
            new Set([{ user: 'fred', age: 40, active: true }]),
            new Set([
              { user: 'barney', age: 36, active: false },
              { user: 'pebbles', age: 1, active: false }
            ])
          ]
        },
        {
          input: [
            new Set([
              { user: 'barney', age: 36, active: false },
              { user: 'fred', age: 40, active: true },
              { user: 'pebbles', age: 1, active: false }
            ]),
            { active: false, age: pluck(isNumber) }
          ],
          expecting: [
            new Set([36, 1]),
            new Set([
              {
                user: 'fred',
                age: 40,
                active: true
              }
            ])
          ]
        }
      ],
      run: (assertCase, input) => {
        assertCase(sift(...input))
      }
    }
  ],
  [
    'siftSetAgainstPatterns',
    {
      cases: [
        {
          input: [
            new Set([
              { user: 'barney', age: 36, active: false },
              { user: 'fred', age: 40, active: true },
              { user: 'pebbles', age: 1, active: false }
            ]),
            { age: 1, active: false },
            { age: lt(40) }
          ],
          expecting: [
            new Set([{ user: 'pebbles', age: 1, active: false }]),
            new Set([{ user: 'barney', age: 36, active: false }]),
            new Set([{ user: 'fred', age: 40, active: true }])
          ]
        },
        {
          input: [
            new Set([
              { user: 'barney', age: 36, active: false },
              { user: 'fred', age: 40, active: true },
              { user: 'pebbles', age: 1, active: false }
            ]),
            { active: false, age: pluck(isNumber) },
            { active: true, age: pluck(isNumber) }
          ],
          expecting: [new Set([36, 1]), new Set([40]), new Set([])]
        }
      ],
      run: (assertCase, input) => {
        assertCase(sift(...input))
      }
    }
  ],
  //
  // Map
  //
  [
    'siftMapAgainstPattern',
    {
      cases: [
        {
          input: [
            new Map([
              [0, 'header'],
              [1, 1],
              [2, '# header']
            ]),
            isString
          ],
          expecting: [
            new Map([
              [0, 'header'],
              [2, '# header']
            ]),
            new Map([[1, 1]])
          ]
        },
        {
          input: [
            new Map([
              [0, { user: 'barney', age: 36, active: false }],
              [1, { user: 'fred', age: 40, active: true }],
              [2, { user: 'pebbles', age: 1, active: false }]
            ]),
            { age: 1, active: false }
          ],
          expecting: [
            new Map([[2, { user: 'pebbles', age: 1, active: false }]]),
            new Map([
              [0, { user: 'barney', age: 36, active: false }],
              [1, { user: 'fred', age: 40, active: true }]
            ])
          ]
        },
        {
          input: [
            new Map([
              [0, { user: 'barney', age: 36, active: false }],
              [1, { user: 'fred', age: 40, active: true }],
              [2, { user: 'pebbles', age: 1, active: false }]
            ]),
            { active: false }
          ],
          expecting: [
            new Map([
              [0, { user: 'barney', age: 36, active: false }],
              [2, { user: 'pebbles', age: 1, active: false }]
            ]),
            new Map([[1, { user: 'fred', age: 40, active: true }]])
          ]
        },
        {
          input: [
            new Map([
              [0, { user: 'barney', age: 36, active: false }],
              [1, { user: 'fred', age: 40, active: true }],
              [2, { user: 'pebbles', age: 1, active: false }]
            ]),
            o => o.active
          ],
          expecting: [
            new Map([[1, { user: 'fred', age: 40, active: true }]]),
            new Map([
              [0, { user: 'barney', age: 36, active: false }],
              [2, { user: 'pebbles', age: 1, active: false }]
            ])
          ]
        },
        {
          input: [
            new Map([
              [0, { user: 'barney', age: 36, active: false }],
              [1, { user: 'fred', age: 40, active: true }],
              [2, { user: 'pebbles', age: 1, active: false }]
            ]),
            { active: false, age: pluck(isNumber) }
          ],
          expecting: [
            new Map([
              [0, 36],
              [2, 1]
            ]),
            new Map([[1, { user: 'fred', age: 40, active: true }]])
          ]
        }
      ],
      run: (assertCase, input) => {
        assertCase(sift(...input))
      }
    }
  ],
  [
    'siftMapAgainstPatterns',
    {
      cases: [
        {
          input: [
            new Map([
              [0, { user: 'barney', age: 36, active: false }],
              [1, { user: 'fred', age: 40, active: true }],
              [2, { user: 'pebbles', age: 1, active: false }]
            ]),
            { age: 1, active: false },
            { age: lt(40) }
          ],
          expecting: [
            new Map([[2, { user: 'pebbles', age: 1, active: false }]]),
            new Map([[0, { user: 'barney', age: 36, active: false }]]),
            new Map([[1, { user: 'fred', age: 40, active: true }]])
          ]
        },
        {
          input: [
            new Map([
              [0, { user: 'barney', age: 36, active: false }],
              [1, { user: 'fred', age: 40, active: true }],
              [2, { user: 'pebbles', age: 1, active: false }]
            ]),
            { active: false, age: pluck(isNumber) },
            { active: true, age: pluck(isNumber) }
          ],
          expecting: [
            new Map([
              [0, 36],
              [2, 1]
            ]),
            new Map([[1, 40]]),
            new Map([])
          ]
        }
      ],
      run: (assertCase, input) => {
        assertCase(sift(...input))
      }
    }
  ],
  //
  // Passthru
  //
  [
    'Passthru',
    {
      cases: [
        {
          input: {
            title: 'header',
            slug: 1,
            markdown: '# header',
            footer: undefined
          },
          expecting: [
            {},
            {
              title: 'header',
              slug: 1,
              markdown: '# header',
              footer: undefined
            }
          ]
        },
        {
          input: ['header', 1, '# header'],
          expecting: [[], ['header', 1, '# header']]
        },
        {
          input: [
            { user: 'barney', age: 36, active: false },
            { user: 'fred', age: 40, active: true },
            { user: 'pebbles', age: 1, active: false }
          ],
          expecting: [
            [],
            [
              { user: 'barney', age: 36, active: false },
              { user: 'fred', age: 40, active: true },
              { user: 'pebbles', age: 1, active: false }
            ]
          ]
        },
        {
          input: 'string',
          expecting: [undefined, 'string']
        },
        {
          input: 1,
          expecting: [undefined, 1]
        }
      ],
      run: (assertCase, input) => {
        assertCase(sift(input))
      }
    }
  ],
  //
  // byPattern
  //
  [
    '.filter(byPattern)',
    {
      cases: [
        {
          input: [
            { user: 'barney', age: 36, active: false },
            { user: 'fred', age: 40, active: true },
            { user: 'pebbles', age: 1, active: false }
          ],
          expecting: [{ user: 'barney', age: 36, active: false }]
        }
      ],
      run: (assertCase, input) => {
        assertCase(input.filter(byPattern({ age: 36 })))
      }
    }
  ],
  [
    '.map(byPattern)',
    {
      cases: [
        {
          input: {
            array: [
              { user: 'barney', age: 36, active: false },
              { user: 'fred', age: 40, active: true },
              { user: 'pebbles', age: 1, active: false }
            ],
            pattern: { age: 40 }
          },
          expecting: [
            undefined,
            { user: 'fred', age: 40, active: true },
            undefined
          ]
        },
        {
          input: {
            array: [
              { user: 'barney', age: 36, active: false },
              { user: 'fred', age: 40, active: true },
              { user: 'pebbles', age: 1, active: false }
            ],
            pattern: { age: pluck(isNumber) }
          },
          expecting: [36, 40, 1]
        }
      ],
      run: (assertCase, { array, pattern }) => {
        assertCase(array.map(byPattern(pattern)))
      }
    }
  ]
]

function makeTester(expecting, message) {
  return saw => {
    try {
      if (isPojo(expecting) || isArray(expecting)) {
        strict.deepEqual(saw, expecting)
      } else {
        strict.equal(saw, expecting)
      }
    } catch (error) {
      throw new Error(error + message)
    }
  }
}

testCases.forEach(([description, testCase = {}]) => {
  const { skip, cases = [], run = () => {} } = testCase
  if (skip) return

  cases.forEach(({ skip, input, expecting }, index) => {
    if (skip) return

    const message = `\n\n^\n| Test case failed in [${index}]: ${description}\n`
    const test = makeTester(expecting, message)
    run(test, input)
  })
})

process.exit(0)
