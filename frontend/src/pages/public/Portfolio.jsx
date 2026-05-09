import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PortfolioCard from '../../components/cards/PortfolioCard'

export default function Portfolio() {
  const { t } = useTranslation()

  const CATEGORIES = [
    { key: 'All', label: t('portfolio.all') },
    { key: 'Website', label: t('portfolio.categories.website') },
    { key: 'Database', label: t('portfolio.categories.database') },
    { key: 'Marketing', label: t('portfolio.categories.marketing') },
    { key: 'Design', label: t('portfolio.categories.design') },
  ]

  const MOCK_PROJECTS = [
    { _id: '1', title: t('portfolio.projects.clinic_title'), description: t('portfolio.projects.clinic_desc'), category: 'Database', technologies: ['React', 'Flask', 'MongoDB'] },
    { _id: '2', title: t('portfolio.projects.school_title'), description: t('portfolio.projects.school_desc'), category: 'Database', technologies: ['React', 'Node.js', 'PostgreSQL'] },
    { _id: '3', title: t('portfolio.projects.ecommerce_title'), description: t('portfolio.projects.ecommerce_desc'), category: 'Website', technologies: ['React', 'Tailwind', 'Stripe'] },
    { _id: '4', title: t('portfolio.projects.corporate_title'), description: t('portfolio.projects.corporate_desc'), category: 'Website', technologies: ['React', 'Flask', 'MongoDB'] },
    { _id: '5', title: t('portfolio.projects.smm_title'), description: t('portfolio.projects.smm_desc'), category: 'Marketing', technologies: ['Facebook Ads', 'Instagram', 'Analytics'] },
    { _id: '6', title: t('portfolio.projects.inventory_title'), description: t('portfolio.projects.inventory_desc'), category: 'Database', technologies: ['React', 'Flask', 'MongoDB'] },
  ]

  const [activeCategory, setActiveCategory] = useState('All')
  const filtered = activeCategory === 'All' ? MOCK_PROJECTS : MOCK_PROJECTS.filter((p) => p.category === activeCategory)

  return (
    <div className="flex flex-col">
      <section className="hero-bg py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-white/20">
            <span className="material-symbols-outlined text-sm">work</span>
            {t('nav.portfolio')}
          </span>
          <h1 className="font-heading font-bold text-white text-5xl">{t('portfolio.title')}</h1>
          <p className="text-primary-light/90 text-lg">{t('portfolio.subtitle')}</p>
        </div>
      </section>

      <section className="px-6 py-6 bg-white border-b border-border shadow-sm">
        <div className="max-w-screen-xl mx-auto flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map((cat) => (
            <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
                activeCategory === cat.key ? 'bg-primary text-white shadow-btn' : 'border border-border text-text-secondary hover:border-primary hover:text-primary bg-white'
              }`}>
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 bg-background">
        <div className="max-w-screen-xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-text-muted">
              <span className="material-symbols-outlined text-5xl mb-4 block text-primary-light">search_off</span>
              <p>{t('portfolio.no_results')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project) => <PortfolioCard key={project._id} project={project} />)}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-6 bg-primary">
        <div className="max-w-screen-xl mx-auto text-center space-y-5">
          <h2 className="font-heading font-bold text-white text-3xl">{t('portfolio.cta_title')}</h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto">{t('portfolio.cta_subtitle')}</p>
          <a href="https://wa.me/93700000000" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-3.5 rounded-lg hover:bg-primary-pale transition-all duration-200 shadow-lg">
            <span className="material-symbols-outlined text-base">chat</span>
            {t('portfolio.start_project')}
          </a>
        </div>
      </section>
    </div>
  )
}
