import React from 'react'

export default function SectionHeader({ badge, title, subtitle, center = true }) {
  return (
    <div className={`space-y-3 mb-12 ${center ? 'text-center' : ''}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase border border-primary/20 ${center ? 'mx-auto' : ''}`}>
          <span className="material-symbols-outlined text-sm">auto_awesome</span>
          {badge}
        </div>
      )}
      <h2 className="font-heading font-bold text-navy" style={{ fontSize: '2.25rem', lineHeight: '1.2' }}>{title}</h2>
      {subtitle && (
        <p className="text-text-muted text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
      )}
    </div>
  )
}
