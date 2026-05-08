import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

export default function ScholarshipCard({ scholarship }) {
  const { _id, title, country, university, degree, deadline, fundingType } = scholarship

  return (
    <div className="glass-card rounded-xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 group">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 flex-shrink-0">
          <span className="material-symbols-outlined text-primary text-xl">school</span>
        </div>
        <span className="text-xs font-semibold tracking-widest uppercase bg-primary/10 text-primary px-2 py-1 rounded-full border border-primary/20">
          {fundingType || 'Fully Funded'}
        </span>
      </div>

      {/* Info */}
      <div>
        <h3 className="font-heading font-semibold text-on-surface text-lg leading-snug group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-on-surface-variant mt-1">{university}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        <span className="flex items-center gap-1 text-xs text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">
          <span className="material-symbols-outlined text-sm">location_on</span>
          {country}
        </span>
        <span className="flex items-center gap-1 text-xs text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">
          <span className="material-symbols-outlined text-sm">grade</span>
          {degree}
        </span>
        {deadline && (
          <span className="flex items-center gap-1 text-xs text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">
            <span className="material-symbols-outlined text-sm">calendar_today</span>
            {deadline}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-auto pt-2">
        <Link
          to={ROUTES.SCHOLARSHIP_DETAILS.replace(':id', _id)}
          className="flex-1 text-center py-2 rounded-lg border border-primary text-primary text-xs font-semibold tracking-widest uppercase hover:bg-primary hover:text-on-primary transition-all duration-300"
        >
          Details
        </Link>
        <a
          href="https://wa.me/93700000000"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold tracking-widest uppercase btn-glow hover:bg-primary-fixed transition-all duration-300"
        >
          Apply Now
        </a>
      </div>
    </div>
  )
}
