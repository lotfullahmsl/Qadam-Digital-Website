import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '../../constants/routes'
import PortfolioCard from '../../components/cards/PortfolioCard'
import { portfolioService } from '../../services/portfolioService'
import { cmsText } from '../../utils/cmsText'

export default function About() {
  const { t, i18n } = useTranslation()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    let ignore = false
    setLoading(true)
    portfolioService
      .getAll({ limit: 100 })
      .then(({ data }) => {
        if (!ignore) setProjects(data.items || [])
      })
      .catch(() => {
        if (!ignore) setProjects([])
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })
    return () => {
      ignore = true
    }
  }, [i18n.language])

  const categories = useMemo(() => {
    const fromData = [...new Set(projects.map((p) => cmsText(p.category)).filter(Boolean))]
    return ['All', ...fromData.sort()]
  }, [projects])

  const normalizedProjects = useMemo(
    () =>
      projects.map((p) => ({
        ...p,
        title: cmsText(p.title),
        description: cmsText(p.description),
        category: cmsText(p.category),
        image: p.image || p.imageUrl,
        technologies: Array.isArray(p.technologies) ? p.technologies : [],
      })),
    [projects],
  )

  const filtered =
    activeCategory === 'All'
      ? normalizedProjects
      : normalizedProjects.filter((p) => p.category === activeCategory)

  const values = [
    { icon: 'verified', title: t('about.values.integrity_title'), desc: t('about.values.integrity_desc') },
    { icon: 'workspace_premium', title: t('about.values.excellence_title'), desc: t('about.values.excellence_desc') },
    { icon: 'diversity_3', title: t('about.values.inclusivity_title'), desc: t('about.values.inclusivity_desc') },
    { icon: 'rocket_launch', title: t('about.values.innovation_title'), desc: t('about.values.innovation_desc') },
  ]

  const team = [
    { icon: 'school', name: t('about.team.education_name'), role: t('about.team.education_role') },
    { icon: 'code', name: t('about.team.tech_name'), role: t('about.team.tech_role') },
    { icon: 'palette', name: t('about.team.design_name'), role: t('about.team.design_role') },
    { icon: 'campaign', name: t('about.team.marketing_name'), role: t('about.team.marketing_role') },
  ]

  const stats = [
    { icon: 'school', label: t('about.stats_scholarships'), count: t('about.stat_numbers.scholarships') },
    { icon: 'web', label: t('about.stats_websites'), count: t('about.stat_numbers.websites') },
    { icon: 'description', label: t('about.stats_cvs'), count: t('about.stat_numbers.cvs') },
    { icon: 'people', label: t('about.stats_students'), count: t('about.stat_numbers.students') },
  ]

  return (
    <div className="flex flex-col">
      <section className="hero-bg py-24 px-6">
        <div className="max-w-screen-xl mx-auto text-center space-y-5">
          <span className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-white/20">
            <span className="material-symbols-outlined text-sm">info</span>
            {t('nav.about')}
          </span>
          <h1 className="font-heading font-bold text-white text-5xl">{t('about.title')}</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">{t('about.hero_desc')}</p>
        </div>
      </section>

      <section className="py-16 px-6 bg-background">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-8 space-y-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-2xl">flag</span>
            </div>
            <h2 className="font-heading font-bold text-navy text-2xl">{t('about.mission_title')}</h2>
            <p className="text-text-muted leading-relaxed">{t('about.mission_text')}</p>
          </div>
          <div className="card p-8 space-y-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-2xl">visibility</span>
            </div>
            <h2 className="font-heading font-bold text-navy text-2xl">{t('about.vision_title')}</h2>
            <p className="text-text-muted leading-relaxed">{t('about.vision_text')}</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-primary-pale">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <span className="badge mb-3">{t('about.values_badge')}</span>
            <h2 className="font-heading font-bold text-navy text-4xl">{t('about.values_title')}</h2>
            <p className="text-text-muted text-lg mt-3 max-w-2xl mx-auto">{t('about.values_subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="card p-6 flex flex-col gap-3 items-center text-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-2xl">{v.icon}</span>
                </div>
                <h3 className="font-heading font-semibold text-navy text-lg">{v.title}</h3>
                <p className="text-sm text-text-muted">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-navy">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-white text-3xl">{t('about.impact_title')}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((item) => (
              <div key={item.label} className="text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mx-auto">
                  <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                </div>
                <div className="font-heading font-bold text-white text-3xl">{item.count}</div>
                <div className="text-primary-light/70 text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-background">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <span className="badge mb-3">{t('about.team_title')}</span>
            <h2 className="font-heading font-bold text-navy text-4xl">{t('about.team_heading')}</h2>
            <p className="text-text-muted text-lg mt-3 max-w-2xl mx-auto">{t('about.team_subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="card p-6 flex flex-col gap-3 items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-3xl">{member.icon}</span>
                </div>
                <h3 className="font-heading font-semibold text-navy text-base">{member.name}</h3>
                <p className="text-sm text-text-muted">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-primary-pale">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-10">
            <span className="badge mb-3">{t('portfolio.title')}</span>
            <h2 className="font-heading font-bold text-navy text-4xl">{t('about.work_title')}</h2>
            <p className="text-text-muted text-lg mt-3 max-w-2xl mx-auto">{t('about.work_subtitle')}</p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-btn'
                    : 'border border-border text-text-secondary hover:border-primary hover:text-primary bg-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-16 text-text-muted">{t('portfolio.loading')}</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-text-muted">
              <span className="material-symbols-outlined text-5xl mb-4 block text-primary-light">search_off</span>
              <p>{normalizedProjects.length === 0 ? t('about.no_portfolio') : t('about.no_projects_category')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project) => (
                <PortfolioCard key={project._id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-6 bg-primary">
        <div className="max-w-screen-xl mx-auto text-center space-y-6">
          <h2 className="font-heading font-bold text-white text-4xl">{t('about.cta_title')}</h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto">{t('about.cta_subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={ROUTES.CONTACT}
              className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-8 py-3.5 rounded-lg hover:bg-primary-pale transition-all duration-200"
            >
              {t('home.contact_us')}
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
            <a
              href="https://wa.me/923039393437"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/15 text-white font-semibold px-8 py-3.5 rounded-lg border border-white/30 hover:bg-white/25 transition-all duration-200"
            >
              <span className="material-symbols-outlined text-base">chat</span>
              {t('scholarships.chat_whatsapp')}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
