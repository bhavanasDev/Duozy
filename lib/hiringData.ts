import { Problem, TestCase } from '@/types/hiring'

// Safely run user's JS answer as a function body, catch any errors
function runCode(code: string, ...args: unknown[]): { result: unknown; error: string | null } {
  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function(...args.map((_, i) => `arg${i}`), code)
    return { result: fn(...args), error: null }
  } catch (e: unknown) {
    return { result: undefined, error: e instanceof Error ? e.message : String(e) }
  }
}

function makeResults(
  testCases: Omit<TestCase, 'actual' | 'passed'>[],
  runner: (tc: Omit<TestCase, 'actual' | 'passed'>) => { actual: string; passed: boolean },
): { passed: boolean; results: TestCase[] } {
  const results = testCases.map(tc => {
    const { actual, passed } = runner(tc)
    return { ...tc, actual, passed }
  })
  return { passed: results.every(r => r.passed), results }
}

export const PROBLEMS: Problem[] = [
  // ── Basic DSA ──────────────────────────────────────────────────────────────
  {
    id: 'b-dsa-1', title: 'Reverse a String', domain: 'DSA', difficulty: 'basic',
    description: 'Write a function that takes a string and returns it reversed.\n\nYour code should work as a function body. Use `return` to return the result.\nThe input string is available as `arg0`.',
    timeLimit: 120,
    testCases: [
      { input: '"hello"', expected: 'olleh' },
      { input: '"abcde"', expected: 'edcba' },
      { input: '"racecar"', expected: 'racecar' },
    ],
    validate(answer) {
      return makeResults(this.testCases, tc => {
        const input = tc.input.replace(/"/g, '')
        const { result } = runCode(answer, input)
        const actual = String(result ?? '')
        return { actual, passed: actual === tc.expected }
      })
    },
  },
  {
    id: 'b-dsa-2', title: 'Find Max in Array', domain: 'DSA', difficulty: 'basic',
    description: 'Return the maximum value in an array of integers.\n\nThe array is available as `arg0`.',
    timeLimit: 120,
    testCases: [
      { input: '[1, 3, 2]', expected: '3' },
      { input: '[5, 1, 9, 2]', expected: '9' },
      { input: '[-3, -1, -7]', expected: '-1' },
    ],
    validate(answer) {
      return makeResults(this.testCases, tc => {
        const input = JSON.parse(tc.input)
        const { result } = runCode(answer, input)
        const actual = String(result ?? '')
        return { actual, passed: actual === tc.expected }
      })
    },
  },
  {
    id: 'b-dsa-3', title: 'Check Palindrome', domain: 'DSA', difficulty: 'basic',
    description: 'Return `true` if the string is a palindrome, `false` otherwise.\n\nThe string is available as `arg0`.',
    timeLimit: 120,
    testCases: [
      { input: '"racecar"', expected: 'true' },
      { input: '"hello"', expected: 'false' },
      { input: '"madam"', expected: 'true' },
    ],
    validate(answer) {
      return makeResults(this.testCases, tc => {
        const input = tc.input.replace(/"/g, '')
        const { result } = runCode(answer, input)
        const actual = String(result ?? '')
        return { actual, passed: actual === tc.expected }
      })
    },
  },
  {
    id: 'b-dsa-4', title: 'Sum of Array', domain: 'DSA', difficulty: 'basic',
    description: 'Return the sum of all numbers in an array.\n\nThe array is available as `arg0`.',
    timeLimit: 120,
    testCases: [
      { input: '[1, 2, 3, 4]', expected: '10' },
      { input: '[10, -5, 3]', expected: '8' },
      { input: '[0, 0, 0]', expected: '0' },
    ],
    validate(answer) {
      return makeResults(this.testCases, tc => {
        const input = JSON.parse(tc.input)
        const { result } = runCode(answer, input)
        const actual = String(result ?? '')
        return { actual, passed: actual === tc.expected }
      })
    },
  },

  // ── Basic Web ──────────────────────────────────────────────────────────────
  {
    id: 'b-web-1', title: 'FizzBuzz', domain: 'Web', difficulty: 'basic',
    description: 'For a given number, return "Fizz" if divisible by 3, "Buzz" if by 5, "FizzBuzz" if both, else the number as a string.\n\nThe number is available as `arg0`.',
    timeLimit: 120,
    testCases: [
      { input: '15', expected: 'FizzBuzz' },
      { input: '9', expected: 'Fizz' },
      { input: '10', expected: 'Buzz' },
      { input: '7', expected: '7' },
    ],
    validate(answer) {
      return makeResults(this.testCases, tc => {
        const { result } = runCode(answer, Number(tc.input))
        const actual = String(result ?? '')
        return { actual, passed: actual === tc.expected }
      })
    },
  },

  // ── Intermediate DSA ───────────────────────────────────────────────────────
  {
    id: 'i-dsa-1', title: 'Two Sum', domain: 'DSA', difficulty: 'intermediate',
    description: 'Given an array of numbers (`arg0`) and a target (`arg1`), return the indices of the two numbers that add up to the target as a JSON string like "[0,1]".',
    timeLimit: 180,
    testCases: [
      { input: '[2,7,11,15] | 9', expected: '[0,1]' },
      { input: '[3,2,4] | 6', expected: '[1,2]' },
      { input: '[3,3] | 6', expected: '[0,1]' },
    ],
    validate(answer) {
      return makeResults(this.testCases, tc => {
        const [arrStr, targetStr] = tc.input.split(' | ')
        const arr = JSON.parse(arrStr)
        const target = Number(targetStr)
        const { result } = runCode(answer, arr, target)
        const actual = JSON.stringify(result)
        return { actual, passed: actual === tc.expected }
      })
    },
  },
  {
    id: 'i-dsa-2', title: 'Valid Parentheses', domain: 'DSA', difficulty: 'intermediate',
    description: 'Return `true` if the string of brackets is valid (every open bracket has a matching close bracket in correct order).\n\nThe string is available as `arg0`.',
    timeLimit: 180,
    testCases: [
      { input: '"()[]{}"', expected: 'true' },
      { input: '"(]"', expected: 'false' },
      { input: '"([)]"', expected: 'false' },
      { input: '"{[]}"', expected: 'true' },
    ],
    validate(answer) {
      return makeResults(this.testCases, tc => {
        const input = tc.input.replace(/"/g, '')
        const { result } = runCode(answer, input)
        const actual = String(result ?? '')
        return { actual, passed: actual === tc.expected }
      })
    },
  },
  {
    id: 'i-dsa-3', title: 'Binary Search', domain: 'DSA', difficulty: 'intermediate',
    description: 'Given a sorted array (`arg0`) and a target (`arg1`), return the index of the target, or -1 if not found.',
    timeLimit: 200,
    testCases: [
      { input: '[1,3,5,7,9] | 5', expected: '2' },
      { input: '[1,3,5,7,9] | 1', expected: '0' },
      { input: '[1,3,5,7,9] | 10', expected: '-1' },
    ],
    validate(answer) {
      return makeResults(this.testCases, tc => {
        const [arrStr, targetStr] = tc.input.split(' | ')
        const { result } = runCode(answer, JSON.parse(arrStr), Number(targetStr))
        const actual = String(result ?? '')
        return { actual, passed: actual === tc.expected }
      })
    },
  },
  {
    id: 'i-dsa-4', title: 'Remove Duplicates', domain: 'DSA', difficulty: 'intermediate',
    description: 'Given an array (`arg0`), return a new array with duplicates removed, preserving order.',
    timeLimit: 180,
    testCases: [
      { input: '[1,2,2,3,4,4]', expected: '[1,2,3,4]' },
      { input: '[5,5,5]', expected: '[5]' },
      { input: '[1,2,3]', expected: '[1,2,3]' },
    ],
    validate(answer) {
      return makeResults(this.testCases, tc => {
        const { result } = runCode(answer, JSON.parse(tc.input))
        const actual = JSON.stringify(result)
        return { actual, passed: actual === tc.expected }
      })
    },
  },

  // ── Intermediate Web ───────────────────────────────────────────────────────
  {
    id: 'i-web-1', title: 'Count Word Frequency', domain: 'Web', difficulty: 'intermediate',
    description: 'Given a sentence string (`arg0`), return a JSON object with each word as a key and its count as the value. Words are case-insensitive.',
    timeLimit: 240,
    testCases: [
      { input: '"hello world hello"', expected: '{"hello":2,"world":1}' },
      { input: '"a b a b a"', expected: '{"a":3,"b":2}' },
    ],
    validate(answer) {
      return makeResults(this.testCases, tc => {
        const input = tc.input.replace(/"/g, '')
        const { result } = runCode(answer, input)
        // Sort keys for consistent comparison
        const actual = JSON.stringify(
          Object.fromEntries(Object.entries(result as Record<string, number>).sort())
        )
        const expected = JSON.stringify(
          Object.fromEntries(Object.entries(JSON.parse(tc.expected)).sort())
        )
        return { actual, passed: actual === expected }
      })
    },
  },

  // ── Advanced DSA ───────────────────────────────────────────────────────────
  {
    id: 'a-dsa-1', title: 'Flatten Nested Array', domain: 'DSA', difficulty: 'advanced',
    description: 'Given a deeply nested array (`arg0`), return a fully flattened array.',
    timeLimit: 300,
    testCases: [
      { input: '[1,[2,[3,[4]]],5]', expected: '[1,2,3,4,5]' },
      { input: '[[1,2],[3,[4,5]]]', expected: '[1,2,3,4,5]' },
      { input: '[1,2,3]', expected: '[1,2,3]' },
    ],
    validate(answer) {
      return makeResults(this.testCases, tc => {
        const { result } = runCode(answer, JSON.parse(tc.input))
        const actual = JSON.stringify(result)
        return { actual, passed: actual === tc.expected }
      })
    },
  },
  {
    id: 'a-dsa-2', title: 'Group Anagrams', domain: 'DSA', difficulty: 'advanced',
    description: 'Given an array of strings (`arg0`), group anagrams together. Return array of groups sorted internally and groups sorted by first element.',
    timeLimit: 600,
    testCases: [
      { input: '["eat","tea","tan","ate","nat","bat"]', expected: '[["ate","eat","tea"],["bat"],["nat","tan"]]' },
      { input: '[""]', expected: '[[""]]' },
    ],
    validate(answer) {
      return makeResults(this.testCases, tc => {
        const { result } = runCode(answer, JSON.parse(tc.input))
        const sorted = (result as string[][])
          .map(g => [...g].sort())
          .sort((a, b) => a[0].localeCompare(b[0]))
        const actual = JSON.stringify(sorted)
        return { actual, passed: actual === tc.expected }
      })
    },
  },
  {
    id: 'a-dsa-3', title: 'LRU Cache', domain: 'DSA', difficulty: 'advanced',
    description: `Design an LRU Cache class with \`get(key)\` and \`put(key, value)\` methods.
Your code should define a class named \`LRUCache\` with constructor taking capacity.
\`get\` returns the value or -1 if not found. \`put\` evicts the least recently used item when over capacity.

The test will instantiate your class — write the full class definition.`,
    timeLimit: 600,
    testCases: [
      { input: 'capacity=2 | put(1,1),put(2,2),get(1),put(3,3),get(2),get(3)', expected: '1,-1,3' },
    ],
    validate(answer) {
      return makeResults(this.testCases, tc => {
        try {
          // eslint-disable-next-line no-new-func
          const setup = new Function(answer + '\nreturn LRUCache')
          const LRUCacheClass = setup()
          const [capStr, opsStr] = tc.input.split(' | ')
          const capacity = Number(capStr.split('=')[1])
          const cache = new LRUCacheClass(capacity)
          const results: number[] = []
          opsStr.split(',').forEach(op => {
            const putMatch = op.match(/put\((\d+),(\d+)\)/)
            const getMatch = op.match(/get\((\d+)\)/)
            if (putMatch) cache.put(Number(putMatch[1]), Number(putMatch[2]))
            if (getMatch) results.push(cache.get(Number(getMatch[1])))
          })
          const actual = results.join(',')
          return { actual, passed: actual === tc.expected }
        } catch {
          return { actual: 'error', passed: false }
        }
      })
    },
  },
]

export function getProblemsByDifficulty(difficulty: Problem['difficulty']) {
  return PROBLEMS.filter(p => p.difficulty === difficulty)
}

export function getProblemsByDomain(domain: Problem['domain']) {
  return PROBLEMS.filter(p => p.domain === domain)
}
