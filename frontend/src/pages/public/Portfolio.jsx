import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PortfolioCard from '../../components/cards/PortfolioCard'
import { portfolioService } from '../../services/portfolioService'

export default function Portfolio() {
  const { t, i18n } = useTranslation()

  const CATEGORIES = [
    { key: 'All', label: t('portfolio.all') },
    { key: 'Website', label: t('portfolio.categories.website') },
    { key: 'Database', label: t('portfolio.categories.database') },
    { key: 'Marketing', label: t('portfolio.categories.marketing') },
    { key: 'Design', label: t('portfolio.categories.design') },
  ]

  const [activeCategory, setActiveCategory] = useState('All')
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false

    async function loadProjects() {
      setLoading(true)
      try {
        const { data } = await portfolioService.getAll({ category: activeCategory === 'All' ? '' : activeCategory })
        if (!ignore) setProjects(data.items || [])
      } catch {
        if (!ignore) setProjects([])
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    loadProjects()
    return () => { ignore = true }
  }, [activeCategory, i18n.language])

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
          {loading ? (
            <div className="text-center py-20 text-text-muted">Loading portfolio projects...</div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20 text-text-muted">
              <span className="material-symbols-outlined text-5xl mb-4 block text-primary-light">search_off</span>
              <p>{t('portfolio.no_results')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => <PortfolioCard key={project._id} project={project} />)}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-6 bg-primary">
        <div className="max-w-screen-xl mx-auto text-center space-y-5">
          <h2 className="font-heading font-bold text-white text-3xl">{t('portfolio.cta_title')}</h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto">{t('portfolio.cta_subtitle')}</p>
          <a href="https://wa.me/923039393437" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-3.5 rounded-lg hover:bg-primary-pale transition-all duration-200 shadow-lg">
            <span className="material-symbols-outlined text-base">chat</span>
            {t('portfolio.start_project')}
          </a>
        </div>
      </section>
    </div>
  )
}
