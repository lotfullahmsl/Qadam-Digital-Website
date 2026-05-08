import React from 'react'

export default function AdBanner({ slot = 'banner', className = '' }) {
  return (
    <div className={`w-full glass-panel rounded-xl overflow-hidden flex items-center justify-center min-h-[90px] border border-outline-variant/30 ${className}`}>
      <span className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant/40">
        Advertisement
      </span>
      {/* Google AdSense or custom ad code goes here */}
    </div>
  )
}
