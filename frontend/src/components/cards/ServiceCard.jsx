import React from 'react'
import { Link } from 'react-router-dom'

export default function ServiceCard({ icon, title, description, to }) {
  return (
    <div className="glass-panel rounded-xl p-xl flex flex-col gap-4 group transition-all duration-300 hover:-translate-y-1">
      <div className="w-16 h-16 rounded-2xl bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors duration-300">
        <span className="material-symbols-outlined text-3xl">{icon}</span>
      </div>
      <h3 className="font-heading text-xl font-semibold text-on-surface">{title}</h3>
      <p className="text-sm text-on-surface-variant flex-grow leading-relaxed">{description}</p>
      {to && (
        <Link
          to={to}
          className="text-primary text-xs font-semibold tracking-widest uppercase flex items-center gap-1 group-hover:gap-2 transition-all"
        >
          Learn More
          <span className="material-symbols-outlined text-base">arrow_right_alt</span>
        </Link>
      )}
    </div>
  )
}
