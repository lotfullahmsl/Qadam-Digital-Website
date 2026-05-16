import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '../../constants/routes'

export default function ScholarshipCard({ scholarship }) {
  const { _id, title, country, university, degree, deadline, fundingType, image } = scholarship
  const { t } = useTranslation()

  const fundingLabel = fundingType === 'Fully Funded'
    ? t('scholarships.fully_funded')
    : fundingType === 'Partial'
      ? t('scholarships.partial')
      : fundingType

  return (
    <div className="card overflow-hidden flex flex-col group hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">

      {/* ── Image Banner ── */}
      <div className="relative h-44 bg-gradient-to-br from-primary-pale to-primary-light overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <span className="material-symbols-outlined text-5xl text-primary/30">school</span>
            <span className="text-xs text-primary/40 font-medium">{university}</span>
          </div>
        )}
        {/* Funding badge overlaid on image */}
        <span className="absolute top-3 right-3 text-xs font-semibold tracking-wide uppercase bg-primary text-white px-2.5 py-1 rounded-full shadow-sm">
          {fundingLabel}
        </span>
        {/* Country flag-style badge */}
        <span className="absolute top-3 left-3 flex items-center gap-1 text-xs font-semibold bg-white/90 text-navy px-2.5 py-1 rounded-full shadow-sm">
          <span className="material-symbols-outlined text-primary text-sm">location_on</span>
          {country}
        </span>
      </div>

      {/* ── Content ── */}
      <div className="p-5 flex flex-col gap-3 flex-grow">
        <div>
          <h3 className="font-heading font-semibold text-navy text-base leading-snug group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-text-muted mt-1">{university}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
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
            href="https://wa.me/923039393437"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-2 rounded-lg bg-primary text-white text-xs font-semibold tracking-wide uppercase hover:bg-primary-dark transition-all duration-200 shadow-btn"
          >
            {t('scholarships.apply_now')}
          </a>
        </div>
      </div>
    </div>
  )
}
