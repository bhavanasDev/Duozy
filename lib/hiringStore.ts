import {
  Difficulty, Domain, Submission, UserSkillStats,
  SkillBadge, THRESHOLDS, BADGE_LABELS, RecruiterCandidate,
} from '@/types/hiring'

const STORAGE_KEY = 'duozy_hiring_stats'

function emptyStats(userId: string, domain: Domain = 'DSA'): UserSkillStats {
  return {
    userId, domain,
    solved: { basic: 0, intermediate: 0, advanced: 0 },
    accuracy: 0, avgTime: 0, badges: [],
    totalSubmissions: 0, correctSubmissions: 0,
    verifiedLevel: null,
  }
}

export function loadStats(userId: string): UserSkillStats {
  if (typeof window === 'undefined') return emptyStats(userId)
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}_${userId}`)
    return raw ? JSON.parse(raw) : emptyStats(userId)
  } catch {
    return emptyStats(userId)
  }
}

export function saveStats(stats: UserSkillStats): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(`${STORAGE_KEY}_${stats.userId}`, JSON.stringify(stats))
}

export function processSubmission(
  stats: UserSkillStats,
  submission: Submission,
  difficulty: Difficulty,
): { stats: UserSkillStats; newBadge: SkillBadge | null } {
  const updated = { ...stats }
  updated.totalSubmissions += 1

  if (submission.correct) {
    updated.correctSubmissions += 1
    updated.solved = { ...updated.solved, [difficulty]: updated.solved[difficulty] + 1 }
    // rolling avg time
    updated.avgTime = Math.round(
      (updated.avgTime * (updated.correctSubmissions - 1) + submission.timeTaken) /
      updated.correctSubmissions
    )
  }

  updated.accuracy = Math.round((updated.correctSubmissions / updated.totalSubmissions) * 100)

  // Badge / verified level logic
  let newBadge: SkillBadge | null = null
  const threshold = THRESHOLDS[difficulty]
  const alreadyBadged = updated.badges.some(b => b.difficulty === difficulty)

  if (!alreadyBadged && updated.solved[difficulty] >= threshold) {
    newBadge = {
      id: `badge-${difficulty}-${Date.now()}`,
      label: BADGE_LABELS[difficulty],
      difficulty,
      earnedAt: Date.now(),
    }
    updated.badges = [...updated.badges, newBadge]
    updated.verifiedLevel = difficulty
  }

  saveStats(updated)
  return { stats: updated, newBadge }
}

// Simulate recruiter-visible candidates (replace with Firestore query in production)
export function getTopCandidates(domain?: Domain): RecruiterCandidate[] {
  if (typeof window === 'undefined') return MOCK_CANDIDATES
  return MOCK_CANDIDATES.filter(c => !domain || c.stats.domain === domain)
}

export function matchCandidatesToRecruiter(
  requiredLevel: Difficulty,
  domain: Domain,
): RecruiterCandidate[] {
  const levelOrder: Difficulty[] = ['basic', 'intermediate', 'advanced']
  const minIdx = levelOrder.indexOf(requiredLevel)
  return MOCK_CANDIDATES.filter(c => {
    const candidateLevel = c.stats.verifiedLevel
    if (!candidateLevel) return false
    return (
      c.stats.domain === domain &&
      levelOrder.indexOf(candidateLevel) >= minIdx
    )
  })
}

// Mock data simulating top performers visible to recruiters
const MOCK_CANDIDATES: RecruiterCandidate[] = [
  {
    userId: 'u1', name: 'Arjun Mehta', avatar: '👨‍💻',
    contactStatus: 'none',
    stats: {
      userId: 'u1', domain: 'DSA',
      solved: { basic: 12, intermediate: 7, advanced: 4 },
      accuracy: 88, avgTime: 210, verifiedLevel: 'advanced',
      badges: [
        { id: 'b1', label: BADGE_LABELS.basic, difficulty: 'basic', earnedAt: Date.now() - 86400000 },
        { id: 'b2', label: BADGE_LABELS.intermediate, difficulty: 'intermediate', earnedAt: Date.now() - 43200000 },
        { id: 'b3', label: BADGE_LABELS.advanced, difficulty: 'advanced', earnedAt: Date.now() - 3600000 },
      ],
      totalSubmissions: 28, correctSubmissions: 23,
    },
  },
  {
    userId: 'u2', name: 'Priya Sharma', avatar: '👩‍💻',
    contactStatus: 'none',
    stats: {
      userId: 'u2', domain: 'Web',
      solved: { basic: 10, intermediate: 6, advanced: 0 },
      accuracy: 92, avgTime: 175, verifiedLevel: 'intermediate',
      badges: [
        { id: 'b4', label: BADGE_LABELS.basic, difficulty: 'basic', earnedAt: Date.now() - 172800000 },
        { id: 'b5', label: BADGE_LABELS.intermediate, difficulty: 'intermediate', earnedAt: Date.now() - 86400000 },
      ],
      totalSubmissions: 18, correctSubmissions: 16,
    },
  },
  {
    userId: 'u3', name: 'Rohan Das', avatar: '🧑‍💻',
    contactStatus: 'invited',
    stats: {
      userId: 'u3', domain: 'System Design',
      solved: { basic: 11, intermediate: 5, advanced: 3 },
      accuracy: 80, avgTime: 320, verifiedLevel: 'advanced',
      badges: [
        { id: 'b6', label: BADGE_LABELS.basic, difficulty: 'basic', earnedAt: Date.now() - 259200000 },
        { id: 'b7', label: BADGE_LABELS.advanced, difficulty: 'advanced', earnedAt: Date.now() - 7200000 },
      ],
      totalSubmissions: 24, correctSubmissions: 19,
    },
  },
]
