import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { pricingService } from '../../services/pricingService'
import { cmsText } from '../../utils/cmsText'

export default function Pricing() {
  const { t } = useTranslation()

  const CATEGORIES = [
    { key: 'ai', label: t('pricing.categories.ai') },
    { key: 'scholarship', label: t('pricing.categories.scholarship') },
    { key: 'cv', label: t('pricing.categories.cv') },
    { key: 'web', label: t('pricing.categories.web') },
    { key: 'database', label: t('pricing.categories.database') },
    { key: 'smm', label: t('pricing.categories.smm') },
  ]

  const [activeCategory, setActiveCategory] = useState('ai')
  const [apiPlans, setApiPlans] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let ignore = false

    async function loadPlans() {
      setLoading(true)
      try {
        const { data } = await pricingService.getAll({ category: activeCategory })
        if (!ignore) setApiPlans(data.items || [])
      } catch {
        if (!ignore) setApiPlans([])
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    loadPlans()
    return () => { ignore = true }
  }, [activeCategory])

  const plans = apiPlans

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="hero-bg py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-white/20">
            <span className="material-symbols-outlined text-sm">sell</span>
            {t('nav.pricing')}
          </span>
          <h1 className="font-heading font-bold text-white text-5xl">{t('pricing.title')}</h1>
          <p className="text-primary-light/90 text-lg">{t('pricing.subtitle')}</p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="px-6 py-6 bg-white border-b border-border shadow-sm sticky top-16 z-40">
        <div className="max-w-screen-xl mx-auto flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map((cat) => (
            <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
                activeCategory === cat.key
                  ? 'bg-primary text-white shadow-btn'
                  : 'border border-border text-text-secondary hover:border-primary hover:text-primary bg-white'
              }`}>
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Plans */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-screen-xl mx-auto">
          {loading ? (
            <div className="text-center py-12 text-text-muted">Loading pricing packages...</div>
          ) : plans.length === 0 ? (
            <div className="text-center py-12 text-text-muted max-w-xl mx-auto">{t('pricing.empty_packages')}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan) => (
              <div key={plan._id || cmsText(plan.name)} className={`relative flex flex-col rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? 'bg-primary text-white shadow-[0_8px_32px_rgba(0,170,255,0.35)] border-2 border-primary'
                  : 'bg-white border border-border shadow-card hover:shadow-card-hover'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-navy text-white px-4 py-1 rounded-full text-xs font-semibold tracking-widest uppercase">
                    {t('pricing.most_popular')}
                  </div>
                )}
                {cmsText(plan.badge) ? (
                  <span className={`self-end text-xs font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full mb-3 ${plan.popular ? 'bg-white/20 text-white' : 'bg-primary-pale text-primary-dark'}`}>
                    {cmsText(plan.badge)}
                  </span>
                ) : null}
                <h3 className={`font-heading font-semibold text-xl mb-2 ${plan.popular ? 'text-white' : 'text-navy'}`}>{cmsText(plan.name)}</h3>
                <div className="mb-5">
                  <span className={`font-heading text-3xl font-bold ${plan.popular ? 'text-white' : 'text-primary'}`}>${cmsText(plan.price)}</span>
                  <span className={`text-sm ${plan.popular ? 'text-white/70' : 'text-text-muted'}`}>{cmsText(plan.period) || ''}</span>
                </div>
                <ul className="space-y-2.5 mb-6 flex-grow">
                  {(Array.isArray(plan.features) ? plan.features : []).map((f, fi) => (
                    <li key={fi} className={`flex items-start gap-2 text-sm ${plan.popular ? 'text-white/90' : 'text-text-secondary'}`}>
                      <span className={`material-symbols-outlined text-lg flex-shrink-0 ${plan.popular ? 'text-white' : 'text-primary'}`}>check_circle</span>
                      {cmsText(f)}
                    </li>
                  ))}
                </ul>
                <a href="https://wa.me/923039393438" target="_blank" rel="noopener noreferrer"
                  className={`w-full text-center py-2.5 rounded-lg text-sm font-semibold tracking-wide uppercase transition-all duration-200 ${
                    plan.popular ? 'bg-white text-primary hover:bg-primary-pale' : 'bg-primary text-white hover:bg-primary-dark shadow-btn'
                  }`}>
                  {t('pricing.get_started')}
                </a>
              </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Custom Quote */}
      <section className="py-16 px-6 bg-primary-pale border-t border-border">
        <div className="max-w-screen-xl mx-auto text-center space-y-5">
          <h2 className="font-heading font-bold text-navy text-3xl">{t('pricing.custom_quote')}</h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">{t('pricing.custom_text')}</p>
          <a href="https://wa.me/923039393438" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-lg shadow-btn hover:bg-primary-dark transition-all duration-200">
            <span className="material-symbols-outlined text-base">chat</span>
            {t('pricing.request_quote')}
          </a>
        </div>
      </section>
    </div>
  )
}
