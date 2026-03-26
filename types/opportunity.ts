// Stable data contract — never break this shape
export interface Opportunity {
  id: string
  title: string
  type: string
  location: { lat: number; lng: number }
  date: string
  // Optional future fields — must NOT affect map logic
  company?: string
  stipend?: string
  tags?: string[]
  deadline?: string
  area?: string
}

export type OpportunityFilter = 'all' | 'hackathon' | 'exam' | 'internship' | 'job'
