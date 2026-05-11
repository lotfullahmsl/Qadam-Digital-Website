import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function ServiceCard({ icon, title, description, to }) {
  const { t } = useTranslation()

  const content = (
    <>
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
        <span className="material-symbols-outlined text-2xl">{icon}</span>
      </div>
      <h3 className="font-heading font-semibold text-navy text-lg">{title}</h3>
      <p className="text-sm text-text-muted leading-relaxed flex-grow">{description}</p>
      <span className="text-primary text-xs font-semibold tracking-widest uppercase flex items-center gap-1 group-hover:gap-2 transition-all duration-200 mt-1">
        {t('services.learn_more')}
        <span className="material-symbols-outlined text-base">arrow_right_alt</span>
      </span>
    </>
  )

  if (to) {
    return (
      <Link
        to={to}
        className="card p-6 flex flex-col gap-4 group cursor-pointer hover:no-underline"
      >
        {content}
      </Link>
    )
  }

  return (
    <div className="card p-6 flex flex-col gap-4 group cursor-pointer">
      {content}
    </div>
  )
}
