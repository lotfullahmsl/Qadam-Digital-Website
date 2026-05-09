import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '../../constants/routes'

export default function WebsiteDatabaseSolutions() {
  const { t } = useTranslation()

  const WEB_SERVICES = [
    { icon: 'business', title: t('solutions.web_services.business_title'), desc: t('solutions.web_services.business_desc') },
    { icon: 'shopping_cart', title: t('solutions.web_services.ecommerce_title'), desc: t('solutions.web_services.ecommerce_desc') },
    { icon: 'person', title: t('solutions.web_services.portfolio_title'), desc: t('solutions.web_services.portfolio_desc') },
    { icon: 'school', title: t('solutions.web_services.edu_title'), desc: t('solutions.web_services.edu_desc') },
  ]

  const DB_SERVICES = [
    { icon: 'local_hospital', title: t('solutions.db_services.clinic_title'), desc: t('solutions.db_services.clinic_desc') },
    { icon: 'account_balance', title: t('solutions.db_services.school_title'), desc: t('solutions.db_services.school_desc') },
    { icon: 'inventory', title: t('solutions.db_services.inventory_title'), desc: t('solutions.db_services.inventory_desc') },
    { icon: 'database', title: t('solutions.db_services.custom_title'), desc: t('solutions.db_services.custom_desc') },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="hero-bg py-24 px-6">
        <div className="max-w-screen-xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-white/20 mb-5">
            <span className="material-symbols-outlined text-sm">code</span>
            {t('solutions.badge')}
          </span>
          <h1 className="font-heading font-bold text-white text-5xl mb-4 max-w-2xl">{t('solutions.title')}</h1>
          <div className="h-1 w-24 bg-primary rounded-full mb-6" />
          <p className="text-white/80 text-lg max-w-2xl leading-relaxed">{t('solutions.subtitle')}</p>
        </div>
      </section>

      {/* Web Development */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-screen-xl mx-auto">
          <div className="space-y-3 mb-12">
            <span className="badge">{t('solutions.web_badge')}</span>
            <h2 className="font-heading font-bold text-navy text-3xl">{t('solutions.web_title')}</h2>
            <p className="text-text-muted max-w-2xl">{t('solutions.web_subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WEB_SERVICES.map((s) => (
              <div key={s.title} className="card p-6 flex flex-col gap-3 group hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <span className="material-symbols-outlined text-2xl">{s.icon}</span>
                </div>
                <h3 className="font-heading font-semibold text-navy">{s.title}</h3>
                <p className="text-sm text-text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Database Development */}
      <section className="py-16 px-6 bg-primary-pale border-y border-border">
        <div className="max-w-screen-xl mx-auto">
          <div className="space-y-3 mb-12">
            <span className="badge">{t('solutions.db_badge')}</span>
            <h2 className="font-heading font-bold text-navy text-3xl">{t('solutions.db_title')}</h2>
            <p className="text-text-muted max-w-2xl">{t('solutions.db_subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DB_SERVICES.map((s) => (
              <div key={s.title} className="card p-6 flex flex-col gap-3 group hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <span className="material-symbols-outlined text-2xl">{s.icon}</span>
                </div>
                <h3 className="font-heading font-semibold text-navy">{s.title}</h3>
                <p className="text-sm text-text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Systems */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <h2 className="font-heading font-bold text-navy text-3xl">{t('solutions.infra_title')}</h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">{t('solutions.infra_subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              { icon: 'local_hospital', titleKey: 'solutions.systems.clinic_title', descKey: 'solutions.systems.clinic_desc' },
              { icon: 'account_balance', titleKey: 'solutions.systems.school_title', descKey: 'solutions.systems.school_desc' },
            ].map((item) => (
              <div key={item.titleKey} className="card overflow-hidden group">
                <div className="h-52 bg-gradient-to-br from-primary-pale to-primary-light flex items-center justify-center border-b border-border">
                  <span className="material-symbols-outlined text-8xl text-primary/30 group-hover:text-primary/50 transition-colors duration-500">{item.icon}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-primary">{item.icon}</span>
                    <h3 className="font-heading font-semibold text-navy text-lg">{t(item.titleKey)}</h3>
                  </div>
                  <p className="text-sm text-text-muted">{t(item.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-primary">
        <div className="max-w-screen-xl mx-auto text-center space-y-5">
          <h2 className="font-heading font-bold text-white text-3xl">{t('solutions.cta_title')}</h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto">{t('solutions.cta_subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/923039393438" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-3.5 rounded-lg hover:bg-primary-pale transition-all duration-200 shadow-lg">
              <span className="material-symbols-outlined text-base">chat</span>
              {t('solutions.discuss')}
            </a>
            <Link to={ROUTES.PRICING} className="inline-flex items-center gap-2 bg-white/15 text-white font-semibold px-8 py-3.5 rounded-lg border border-white/30 hover:bg-white/25 transition-all duration-200">
              {t('solutions.view_pricing')}
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
