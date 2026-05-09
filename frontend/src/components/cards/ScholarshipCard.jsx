import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '../../constants/routes'

export default function ScholarshipCard({ scholarship }) {
  const { _id, title, country, university, degree, deadline, fundingType } = scholarship
  const { t } = useTranslation()

  // Translate funding type
  const fundingLabel = fundingType === 'Fully Funded'
    ? t('scholarships.fully_funded')
    : fundingType === 'Partial'
      ? t('scholarships.partial')
      : fundingType

  return (
    <div className="card p-6 flex flex-col gap-4 group">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-primary text-xl">school</span>
        </div>
        <span className="text-xs font-semibold tracking-wide uppercase bg-primary text-white px-2.5 py-1 rounded-full">
          {fundingLabel}
        </span>
      </div>

      {/* Info */}
      <div>
        <h3 className="font-heading font-semibold text-navy text-base leading-snug group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-text-muted mt-1">{university}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        <span className="flex items-center gap-1 text-xs text-text-secondary bg-primary-pale px-2.5 py-1 rounded-full">
          <span className="material-symbols-outlined text-primary text-sm">location_on</span>
          {country}
        </span>
        <span className="flex items-center gap-1 text-xs text-text-secondary bg-primary-pale px-2.5 py-1 rounded-full">
          <span className="material-symbols-outlined text-primary text-sm">grade</span>
          {degree}
        </span>
        {deadline && (
          <span className="flex items-center gap-1 text-xs text-text-secondary bg-primary-pale px-2.5 py-1 rounded-full">
            <span className="material-symbols-outlined text-primary text-sm">calendar_today</span>
            {t('scholarships.deadline_label')}: {deadline}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-auto pt-2">
        <Link
          to={ROUTES.SCHOLARSHIP_DETAILS.replace(':id', _id)}
          className="flex-1 text-center py-2 rounded-lg border-2 border-primary text-primary text-xs font-semibold tracking-wide uppercase hover:bg-primary hover:text-white transition-all duration-200"
        >
          {t('scholarships.details')}
        </Link>
        <a
          href="https://wa.me/93700000000"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center py-2 rounded-lg bg-primary text-white text-xs font-semibold tracking-wide uppercase hover:bg-primary-dark transition-all duration-200 shadow-btn"
        >
          {t('scholarships.apply_now')}
        </a>
      </div>
    </div>
  )
}
