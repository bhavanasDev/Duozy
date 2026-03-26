import React, { memo } from 'react'
import type { Opportunity } from '@/types/opportunity'

const TYPE_COLORS: Record<string, string> = {
  hackathon:  '#F97316',
  exam:       '#8B5CF6',
  internship: '#10B981',
  job:        '#2563EB',
}

const TYPE_ICONS: Record<string, string> = {
  hackathon:  '🏆',
  exam:       '📝',
  internship: '🎓',
  job:        '💼',
}

interface MarkerProps {
  opportunity: Opportunity
  isActive: boolean
  isStudy: boolean
  onClick: (id: string) => void
}

const Marker = memo(function Marker({ opportunity, isActive, isStudy, onClick }: MarkerProps) {
  const { id, type, location, company } = opportunity
  const x = location.lat
  const y = location.lng
  const color = TYPE_COLORS[type] ?? '#64748B'
  const icon = TYPE_ICONS[type] ?? '📌'

  return (
    <g style={{ cursor: 'pointer' }} onClick={() => onClick(id)}>
      <circle cx={x} cy={y} r="20" fill={color} opacity="0.15">
        <animate attributeName="r" values="16;26;16" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.2;0;0.2" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <path
        d={`M ${x} ${y - 22} C ${x - 12} ${y - 22} ${x - 12} ${y - 8} ${x} ${y + 2} C ${x + 12} ${y - 8} ${x + 12} ${y - 22} ${x} ${y - 22} Z`}
        fill={color}
        stroke="white"
        strokeWidth="2"
        filter="url(#pinShadow)"
        style={{
          transform: isActive ? 'scale(1.2)' : 'scale(1)',
          transformOrigin: `${x}px ${y}px`,
          transition: 'transform 0.2s',
        }}
      />
      <text x={x} y={y - 11} textAnchor="middle" dominantBaseline="central" fontSize="11">
        {icon}
      </text>
      {company && (
        <>
          <rect x={x - 30} y={y + 6} width="60" height="16" rx="8"
            fill={isStudy ? 'white' : '#1E293B'}
            stroke={color} strokeWidth="1.5"
            filter="url(#shadow)" />
          <text x={x} y={y + 17} textAnchor="middle" fontSize="7.5"
            fill={isStudy ? '#1E293B' : '#E2E8F0'} fontWeight="700">
            {company}
          </text>
        </>
      )}
    </g>
  )
})

interface MarkerLayerProps {
  opportunities: Opportunity[]
  activeId: string | null
  isStudy: boolean
  onMarkerClick: (id: string) => void
}

export const MarkerLayer = memo(function MarkerLayer({
  opportunities,
  activeId,
  isStudy,
  onMarkerClick,
}: MarkerLayerProps) {
  if (!opportunities.length) return null

  return (
    <g>
      {opportunities.map(opp => (
        <Marker
          key={opp.id}
          opportunity={opp}
          isActive={activeId === opp.id}
          isStudy={isStudy}
          onClick={onMarkerClick}
        />
      ))}
    </g>
  )
})
