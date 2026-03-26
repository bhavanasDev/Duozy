export type Difficulty = 'basic' | 'intermediate' | 'advanced'
export type Domain = 'DSA' | 'Web' | 'System Design' | 'Database'

export interface TestCase {
  input: string
  expected: string
  // actual result filled in after validation
  actual?: string
  passed?: boolean
}

export interface Problem {
  id: string
  title: string
  description: string
  difficulty: Difficulty
  domain: Domain
  timeLimit: number // seconds
  testCases: TestCase[]
  validate: (answer: string) => { passed: boolean; results: TestCase[] }
}

export interface Submission {
  problemId: string
  userId: string
  correct: boolean
  timeTaken: number // seconds
  submittedAt: number // timestamp
}

export interface UserSkillStats {
  userId: string
  solved: Record<Difficulty, number>
  accuracy: number // 0-100
  avgTime: number // seconds
  badges: SkillBadge[]
  domain: Domain
  totalSubmissions: number
  correctSubmissions: number
  verifiedLevel: Difficulty | null
}

export interface SkillBadge {
  id: string
  label: string
  difficulty: Difficulty
  earnedAt: number
}

export interface RecruiterCandidate {
  userId: string
  name: string
  avatar: string
  stats: UserSkillStats
  contactStatus: 'none' | 'invited' | 'connected'
}

export const THRESHOLDS: Record<Difficulty, number> = {
  basic: 10,
  intermediate: 5,
  advanced: 3,
}

export const BADGE_LABELS: Record<Difficulty, string> = {
  basic: '🟢 Verified Basic',
  intermediate: '🔵 Verified Intermediate',
  advanced: '🟣 Verified Advanced',
}
