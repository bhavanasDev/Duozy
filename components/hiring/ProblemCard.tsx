'use client'
import { useState, useEffect, useRef } from 'react'
import { Problem, TestCase } from '@/types/hiring'
import { Clock, CheckCircle, XCircle, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react'

interface Props {
  problem: Problem
  onSubmit: (correct: boolean, timeTaken: number) => void
  disabled?: boolean
}

const DIFFICULTY_COLORS = {
  basic: 'bg-green-100 text-green-700 border-green-200',
  intermediate: 'bg-blue-100 text-blue-700 border-blue-200',
  advanced: 'bg-purple-100 text-purple-700 border-purple-200',
}

export default function ProblemCard({ problem, onSubmit, disabled }: Props) {
  const [expanded, setExpanded] = useState(false)
  const [answer, setAnswer] = useState('')
  const [elapsed, setElapsed] = useState(0)
  const [started, setStarted] = useState(false)
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null)
  const [testResults, setTestResults] = useState<TestCase[]>([])
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (started && !result) {
      intervalRef.current = setInterval(() => setElapsed(e => e + 1), 1000)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [started, result])

  function handleStart() {
    setStarted(true)
    setElapsed(0)
    setAnswer('')
    setResult(null)
    setTestResults([])
  }

  function handleSubmit() {
    if (!answer.trim()) return
    if (intervalRef.current) clearInterval(intervalRef.current)

    const { passed, results } = problem.validate(answer)
    setTestResults(results)
    setResult(passed ? 'correct' : 'wrong')
    onSubmit(passed, elapsed)
  }

  function handleTryAgain() {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setAnswer('')
    setElapsed(0)
    setStarted(false)
    setResult(null)
    setTestResults([])
  }

  const timeLeft = problem.timeLimit - elapsed
  const isOverTime = elapsed > problem.timeLimit
  const passedCount = testResults.filter(r => r.passed).length

  return (
    <div className={`border rounded-xl bg-white shadow-sm transition-all
      ${result === 'correct' ? 'border-green-400' : result === 'wrong' ? 'border-red-400' : 'border-slate-200'}
      ${disabled && !result ? 'opacity-60' : ''}
    `}>
      {/* Header — full row clickable */}
      <div
        className="flex items-start justify-between gap-2 p-4 cursor-pointer select-none"
        onClick={() => !disabled && setExpanded(e => !e)}
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${DIFFICULTY_COLORS[problem.difficulty]}`}>
              {problem.difficulty}
            </span>
            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{problem.domain}</span>
            {result === 'correct' && <span className="text-xs text-green-600 font-semibold">✅ Solved</span>}
            {result === 'wrong' && (
              <span className="text-xs text-red-500 font-semibold">
                ❌ {passedCount}/{testResults.length} passed
              </span>
            )}
          </div>
          <h3 className="font-semibold text-slate-800 mt-1">{problem.title}</h3>
        </div>
        <span className="text-slate-400 mt-1 shrink-0">
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </div>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-slate-100 pt-3">

          {/* Description */}
          <p className="text-sm text-slate-600 whitespace-pre-line">{problem.description}</p>

          {/* Test cases — before attempt */}
          {testResults.length === 0 && (
            <div className="bg-slate-50 rounded-lg p-3 text-xs space-y-1.5">
              <p className="font-medium text-slate-600 mb-1">Sample Test Cases:</p>
              {problem.testCases.map((tc, i) => (
                <div key={i} className="flex flex-wrap items-center gap-1 font-mono text-slate-500">
                  <span className="text-slate-400">Input:</span>
                  <span>{tc.input}</span>
                  <span className="text-slate-400 mx-1">→</span>
                  <span className="text-slate-700 font-semibold">{tc.expected}</span>
                </div>
              ))}
            </div>
          )}

          {/* Test results — after submit */}
          {testResults.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-600">
                Test Results — {passedCount}/{testResults.length} passed
              </p>
              {testResults.map((tc, i) => (
                <div
                  key={i}
                  className={`rounded-lg p-3 text-xs font-mono border ${
                    tc.passed
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    {tc.passed
                      ? <CheckCircle size={13} className="text-green-500 shrink-0" />
                      : <XCircle size={13} className="text-red-500 shrink-0" />}
                    <span className={`font-semibold ${tc.passed ? 'text-green-700' : 'text-red-600'}`}>
                      Test {i + 1}: {tc.passed ? 'Passed' : 'Failed'}
                    </span>
                  </div>
                  <div className="text-slate-500 space-y-0.5 pl-5">
                    <div><span className="text-slate-400">Input: </span>{tc.input}</div>
                    <div><span className="text-slate-400">Expected: </span>
                      <span className="text-green-700">{tc.expected}</span>
                    </div>
                    {!tc.passed && (
                      <div><span className="text-slate-400">Got: </span>
                        <span className="text-red-600">{tc.actual ?? 'undefined'}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Timer */}
          {started && !result && (
            <div className={`flex items-center gap-1.5 text-sm font-mono font-medium
              ${isOverTime ? 'text-red-500' : timeLeft <= 30 ? 'text-orange-500' : 'text-slate-500'}`}
            >
              <Clock size={14} />
              {isOverTime ? `${elapsed - problem.timeLimit}s over time` : `${timeLeft}s remaining`}
            </div>
          )}

          {/* Correct banner */}
          {result === 'correct' && (
            <div className="flex items-center gap-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg px-3 py-2">
              <CheckCircle size={16} />
              All tests passed! Solved in {elapsed}s
            </div>
          )}

          {/* Wrong banner + Try Again */}
          {result === 'wrong' && (
            <div className="flex items-center justify-between gap-3 bg-red-50 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2 text-sm font-medium text-red-500">
                <XCircle size={16} />
                {passedCount}/{testResults.length} test cases passed
              </div>
              <button
                onClick={handleTryAgain}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-lg transition-colors shrink-0"
              >
                <RotateCcw size={13} />
                Try Again
              </button>
            </div>
          )}

          {/* Start button */}
          {!started && result !== 'correct' && (
            <button
              onClick={e => { e.stopPropagation(); handleStart() }}
              disabled={disabled}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50"
            >
              Start
            </button>
          )}

          {/* Answer textarea + Submit */}
          {started && !result && (
            <div className="space-y-2">
              <textarea
                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
                rows={6}
                placeholder={`// Write your solution here\n// The input is available as arg0 (and arg1 for two-argument problems)\n// Use 'return' to return your result\n\nreturn `}
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                autoFocus
              />
              <button
                onClick={handleSubmit}
                disabled={!answer.trim()}
                className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50"
              >
                Submit
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
