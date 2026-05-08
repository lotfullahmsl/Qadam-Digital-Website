import React from 'react'
import { Link } from 'react-router-dom'

export default function ServiceCard({ icon, title, description, to }) {
  return (
    <div className="card p-6 flex flex-col gap-4 group cursor-pointer">
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
        <span className="material-symbols-outlined text-2xl">{icon}</span>
      </div>
      <h3 className="font-heading font-semibold text-navy text-lg">{title}</h3>
      <p className="text-sm text-text-muted leading-relaxed flex-grow">{description}</p>
      {to && (
        <Link
          to={to}
          className="text-primary text-xs font-semibold tracking-widest uppercase flex items-center gap-1 hover:gap-2 transition-all duration-200"
        >
          Learn More
          <span className="material-symbols-outlined text-base">arrow_right_alt</span>
        </Link>
      )}
    </div>
  )
}
