import React from 'react'

export default function AdBanner({ className = '' }) {
  return (
    <div className={`w-full bg-primary-pale border border-border rounded-xl flex items-center justify-center min-h-[90px] ${className}`}>
      <span className="text-xs font-semibold tracking-widest uppercase text-text-muted">
        Advertisement
      </span>
    </div>
  )
}
