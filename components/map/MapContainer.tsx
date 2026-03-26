'use client'
import React, { memo, useEffect, useRef } from 'react'
import { MapContainer as LeafletMap, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { Opportunity } from '@/types/opportunity'

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css'

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface MapContainerProps {
  opportunities: Opportunity[]
  activeId: string | null
  isStudy: boolean
  onMarkerClick: (id: string) => void
  onApply: (opportunity: Opportunity) => void
}

// Custom marker icons for different opportunity types
const createCustomIcon = (type: string, isActive: boolean) => {
  const colors = {
    hackathon: '#F97316',
    exam: '#8B5CF6', 
    internship: '#10B981',
    job: '#2563EB'
  }
  
  const icons = {
    hackathon: '🏆',
    exam: '📝',
    internship: '🎓', 
    job: '💼'
  }
  
  const color = colors[type as keyof typeof colors] || '#64748B'
  const icon = icons[type as keyof typeof icons] || '📌'
  const size = isActive ? 45 : 35
  
  return L.divIcon({
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border: 3px solid white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transition: all 0.2s ease;
        ${isActive ? 'transform: rotate(-45deg) scale(1.2);' : ''}
      ">
        <span style="
          transform: rotate(45deg);
          font-size: ${size * 0.4}px;
          line-height: 1;
        ">${icon}</span>
      </div>
    `,
    className: 'custom-marker',
    iconSize: [size, size],
    iconAnchor: [size/2, size],
    popupAnchor: [0, -size]
  })
}

// Component to handle map events and styling
function MapController({ isStudy }: { isStudy: boolean }) {
  const map = useMap()
  
  useEffect(() => {
    // Force map to resize and refresh tiles
    setTimeout(() => {
      map.invalidateSize()
    }, 100)
    
    // Add custom CSS for the map
    const style = document.createElement('style')
    style.textContent = `
      .leaflet-container {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: #f8fafc;
      }
      .leaflet-tile-container {
        filter: none !important;
      }
      .leaflet-tile {
        filter: none !important;
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
      }
      .leaflet-popup-content-wrapper {
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        background: ${isStudy ? '#ffffff' : '#1e293b'};
        color: ${isStudy ? '#1e293b' : '#e2e8f0'};
      }
      .leaflet-popup-tip {
        background: ${isStudy ? '#ffffff' : '#1e293b'};
      }
      .leaflet-control-zoom {
        border: none !important;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
      }
      .leaflet-control-zoom a {
        background: ${isStudy ? '#ffffff' : '#374151'} !important;
        color: ${isStudy ? '#374151' : '#ffffff'} !important;
        border: none !important;
        font-weight: bold;
        width: 32px !important;
        height: 32px !important;
        line-height: 30px !important;
      }
      .leaflet-control-zoom a:hover {
        background: ${isStudy ? '#f3f4f6' : '#4b5563'} !important;
      }
      .custom-marker {
        filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
      }
    `
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [isStudy, map])
  
  return null
}

export const MapContainer = memo(function MapContainer({
  opportunities,
  activeId,
  isStudy,
  onMarkerClick,
  onApply,
}: MapContainerProps) {
  // Hyderabad coordinates
  const center: [number, number] = [17.3850, 78.4867]
  
  return (
    <div className="absolute inset-0" style={{ minHeight: '500px' }}>
      <LeafletMap
        center={center}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        touchZoom={true}
        dragging={true}
        maxZoom={18}
        minZoom={8}
        preferCanvas={false}
        attributionControl={true}
      >
        <MapController isStudy={isStudy} />
        
        {/* High-quality tile layer with retina support */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={19}
          tileSize={256}
          zoomOffset={0}
          detectRetina={true}
          crossOrigin={true}
        />
        
        {/* Alternative high-quality tile layer - uncomment if OpenStreetMap has issues */}
        {/* 
        <TileLayer
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          maxZoom={19}
          detectRetina={true}
        />
        */}
        
        {/* Opportunity Markers */}
        {opportunities.map((opportunity) => {
          const isActive = activeId === opportunity.id
          
          return (
            <Marker
              key={opportunity.id}
              position={[opportunity.location.lat, opportunity.location.lng]}
              icon={createCustomIcon(opportunity.type, isActive)}
              eventHandlers={{
                click: () => onMarkerClick(opportunity.id)
              }}
            >
              <Popup>
                <div className={`p-3 min-w-[250px] ${isStudy ? 'text-slate-900' : 'text-slate-100'}`}>
                  <div className="flex items-start justify-between mb-2">
                    <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                      opportunity.type === 'hackathon' ? 'bg-orange-100 text-orange-700' :
                      opportunity.type === 'exam' ? 'bg-purple-100 text-purple-700' :
                      opportunity.type === 'internship' ? 'bg-green-100 text-green-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {opportunity.type === 'hackathon' ? '🏆 Hackathon' :
                       opportunity.type === 'exam' ? '📝 Exam' :
                       opportunity.type === 'internship' ? '🎓 Internship' :
                       '💼 Job'}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-base mb-1">{opportunity.title}</h3>
                  
                  {opportunity.company && (
                    <p className={`text-sm font-medium mb-2 ${isStudy ? 'text-blue-600' : 'text-blue-400'}`}>
                      {opportunity.company}
                    </p>
                  )}
                  
                  {opportunity.area && (
                    <p className={`text-sm mb-2 ${isStudy ? 'text-slate-600' : 'text-slate-300'}`}>
                      📍 {opportunity.area}, Hyderabad
                    </p>
                  )}
                  
                  {opportunity.deadline && (
                    <p className={`text-sm mb-2 ${isStudy ? 'text-slate-600' : 'text-slate-300'}`}>
                      ⏰ Deadline: {opportunity.deadline}
                    </p>
                  )}
                  
                  {opportunity.stipend && (
                    <p className={`text-sm mb-3 ${isStudy ? 'text-slate-600' : 'text-slate-300'}`}>
                      💰 {opportunity.stipend}
                    </p>
                  )}
                  
                  <button
                    onClick={() => onApply(opportunity)}
                    className={`w-full py-2 px-4 rounded-lg text-sm font-bold transition-all ${
                    isStudy ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}>
                    Apply Now
                  </button>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </LeafletMap>
    </div>
  )
})
