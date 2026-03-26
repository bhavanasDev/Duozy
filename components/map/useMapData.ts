import { useMemo, useState } from 'react'
import { OPPORTUNITIES } from '@/lib/data'
import { transformOpportunityData } from '@/lib/opportunityAdapter'
import type { Opportunity, OpportunityFilter } from '@/types/opportunity'

export function useMapData() {
  const [filter, setFilter] = useState<OpportunityFilter>('all')

  const allOpportunities: Opportunity[] = useMemo(
    () => transformOpportunityData(OPPORTUNITIES as Parameters<typeof transformOpportunityData>[0]),
    []
  )

  const filtered = useMemo(
    () => filter === 'all' ? allOpportunities : allOpportunities.filter(o => o.type === filter),
    [allOpportunities, filter]
  )

  return { opportunities: filtered, filter, setFilter, total: allOpportunities.length }
}
