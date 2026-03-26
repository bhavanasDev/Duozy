import type { Opportunity } from '@/types/opportunity'

// Real Hyderabad coordinates — lat/lng for actual map locations
const PIN_POSITIONS: Record<string, { lat: number; lng: number; area: string }> = {
  // Hackathons
  '1':  { lat: 17.4435, lng: 78.3772, area: 'HITEC City' },      // HITEC City
  '2':  { lat: 17.4239, lng: 78.3480, area: 'Gachibowli' },      // Gachibowli
  '3':  { lat: 17.4126, lng: 78.4482, area: 'Banjara Hills' },   // Banjara Hills
  // Exams
  '4':  { lat: 17.4851, lng: 78.4056, area: 'Kukatpally' },      // Kukatpally
  '5':  { lat: 17.4399, lng: 78.4983, area: 'Secunderabad' },    // Secunderabad
  '6':  { lat: 17.3616, lng: 78.4747, area: 'Charminar' },       // Charminar
  // Internships
  '7':  { lat: 17.4504, lng: 78.3808, area: 'HITEC City' },      // HITEC City (Microsoft)
  '8':  { lat: 17.4483, lng: 78.3915, area: 'Madhapur' },        // Madhapur
  '9':  { lat: 17.4200, lng: 78.3450, area: 'Gachibowli' },      // Gachibowli (Wipro)
  // Jobs
  '10': { lat: 17.4050, lng: 78.3450, area: 'Nanakramguda' },    // Nanakramguda (Amazon)
  '11': { lat: 17.4100, lng: 78.4500, area: 'Banjara Hills' },   // Banjara Hills (Juspay)
  '12': { lat: 17.4450, lng: 78.5000, area: 'Secunderabad' },    // Secunderabad (Infoedge)
}

interface RawOpportunity {
  id: string
  title: string
  type: string
  location?: string
  company?: string
  stipend?: string
  deadline?: string
  tags?: string[]
  [key: string]: unknown
}

function isValidCoords(lat: number, lng: number): boolean {
  return Number.isFinite(lat) && Number.isFinite(lng) && 
         lat >= 17.2 && lat <= 17.6 && lng >= 78.2 && lng <= 78.6 // Hyderabad bounds
}

export function transformOpportunityData(rawData: RawOpportunity[]): Opportunity[] {
  return rawData.reduce<Opportunity[]>((acc, raw) => {
    const pin = PIN_POSITIONS[raw.id]
    if (!pin || !isValidCoords(pin.lat, pin.lng)) return acc

    acc.push({
      id: raw.id,
      title: raw.title ?? 'Untitled',
      type: raw.type ?? 'other',
      location: { lat: pin.lat, lng: pin.lng },
      date: raw.deadline ?? '',
      company: raw.company,
      stipend: raw.stipend,
      tags: raw.tags,
      deadline: raw.deadline,
      area: pin.area,
    })
    return acc
  }, [])
}
