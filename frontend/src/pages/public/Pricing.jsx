import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

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

  const PLANS = {
    ai: [
      { name: 'ChatGPT Plus', price: '10', badge: t('pricing.shared'), features: [t('pricing.features.gpt4'), t('pricing.features.dalle'), t('pricing.features.data_analysis')] },
      { name: 'Gemini Advanced', price: '12', badge: t('pricing.shared'), features: [t('pricing.features.gemini_pro'), t('pricing.features.workspace'), t('pricing.features.storage_2tb')] },
      { name: 'Coursera Plus', price: '45', badge: t('pricing.dedicated'), popular: true, features: [t('pricing.features.unlimited_courses'), t('pricing.features.certificates'), t('pricing.features.guided_projects')] },
      { name: 'Canva Pro', price: '8', badge: t('pricing.team'), features: [t('pricing.features.premium_templates'), t('pricing.features.brand_kit'), t('pricing.features.magic_ai')] },
    ],
    scholarship: [
      { name: t('pricing.plans.basic'), price: '50', features: [t('pricing.features.scholarship_search'), t('pricing.features.doc_checklist'), t('pricing.features.email_support')] },
      { name: t('pricing.plans.standard'), price: '120', popular: true, features: [t('pricing.features.full_app_support'), t('pricing.features.doc_review'), t('pricing.features.whatsapp_support'), t('pricing.features.3_scholarships')] },
      { name: t('pricing.plans.premium'), price: '250', features: [t('pricing.features.unlimited_apps'), t('pricing.features.full_doc_prep'), t('pricing.features.interview_coaching'), t('pricing.features.priority_support')] },
    ],
    cv: [
      { name: t('pricing.plans.cv_only'), price: '25', features: [t('pricing.features.pro_cv'), t('pricing.features.ats_optimized'), t('pricing.features.2_revisions')] },
      { name: t('pricing.plans.cv_motivation'), price: '45', popular: true, features: [t('pricing.features.pro_cv'), t('pricing.features.motivation_letter'), t('pricing.features.sop'), t('pricing.features.3_revisions')] },
      { name: t('pricing.plans.full_package'), price: '80', features: [t('pricing.plans.cv_motivation'), t('pricing.features.translation_5'), t('pricing.features.unlimited_revisions')] },
    ],
    web: [
      { name: t('pricing.plans.landing'), price: '150', features: [t('pricing.features.1_page_site'), t('pricing.features.mobile_responsive'), t('pricing.features.contact_form'), t('pricing.features.1_month_support')] },
      { name: t('pricing.plans.business'), price: '400', popular: true, features: [t('pricing.features.5_page_site'), t('pricing.features.cms'), t('pricing.features.seo'), t('pricing.features.3_month_support')] },
      { name: t('pricing.plans.custom'), price: '800', features: [t('pricing.features.custom_features'), t('pricing.features.admin_panel'), t('pricing.features.api'), t('pricing.features.6_month_support')] },
    ],
    database: [
      { name: t('pricing.plans.basic_db'), price: '300', features: [t('pricing.features.5_modules'), t('pricing.features.basic_reports'), t('pricing.features.1_month_support')] },
      { name: t('pricing.plans.standard_db'), price: '600', popular: true, features: [t('pricing.features.10_modules'), t('pricing.features.advanced_reports'), t('pricing.features.user_mgmt'), t('pricing.features.3_month_support')] },
      { name: t('pricing.plans.enterprise'), price: '1200', features: [t('pricing.features.unlimited_modules'), t('pricing.features.custom_reports'), t('pricing.features.multi_user'), t('pricing.features.6_month_support')] },
    ],
    smm: [
      { name: t('pricing.plans.starter'), price: '50', period: t('pricing.per_month'), features: [t('pricing.features.2_platforms'), t('pricing.features.8_posts'), t('pricing.features.basic_analytics')] },
      { name: t('pricing.plans.growth'), price: '120', period: t('pricing.per_month'), popular: true, features: [t('pricing.features.3_platforms'), t('pricing.features.20_posts'), t('pricing.features.ad_mgmt'), t('pricing.features.monthly_report')] },
      { name: t('pricing.plans.premium'), price: '250', period: t('pricing.per_month'), features: [t('pricing.features.all_platforms'), t('pricing.features.unlimited_posts'), t('pricing.features.full_ad_mgmt'), t('pricing.features.weekly_reports')] },
    ],
  }

  const [activeCategory, setActiveCategory] = useState('ai')
  const plans = PLANS[activeCategory] || []

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, i) => (
              <div key={i} className={`relative flex flex-col rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? 'bg-primary text-white shadow-[0_8px_32px_rgba(0,170,255,0.35)] border-2 border-primary'
                  : 'bg-white border border-border shadow-card hover:shadow-card-hover'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-navy text-white px-4 py-1 rounded-full text-xs font-semibold tracking-widest uppercase">
                    {t('pricing.most_popular')}
                  </div>
                )}
                {plan.badge && (
                  <span className={`self-end text-xs font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full mb-3 ${plan.popular ? 'bg-white/20 text-white' : 'bg-primary-pale text-primary-dark'}`}>
                    {plan.badge}
                  </span>
                )}
                <h3 className={`font-heading font-semibold text-xl mb-2 ${plan.popular ? 'text-white' : 'text-navy'}`}>{plan.name}</h3>
                <div className="mb-5">
                  <span className={`font-heading text-3xl font-bold ${plan.popular ? 'text-white' : 'text-primary'}`}>${plan.price}</span>
                  <span className={`text-sm ${plan.popular ? 'text-white/70' : 'text-text-muted'}`}>{plan.period || ''}</span>
                </div>
                <ul className="space-y-2.5 mb-6 flex-grow">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className={`flex items-start gap-2 text-sm ${plan.popular ? 'text-white/90' : 'text-text-secondary'}`}>
                      <span className={`material-symbols-outlined text-lg flex-shrink-0 ${plan.popular ? 'text-white' : 'text-primary'}`}>check_circle</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="https://wa.me/93700000000" target="_blank" rel="noopener noreferrer"
                  className={`w-full text-center py-2.5 rounded-lg text-sm font-semibold tracking-wide uppercase transition-all duration-200 ${
                    plan.popular ? 'bg-white text-primary hover:bg-primary-pale' : 'bg-primary text-white hover:bg-primary-dark shadow-btn'
                  }`}>
                  {t('pricing.get_started')}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Quote */}
      <section className="py-16 px-6 bg-primary-pale border-t border-border">
        <div className="max-w-screen-xl mx-auto text-center space-y-5">
          <h2 className="font-heading font-bold text-navy text-3xl">{t('pricing.custom_quote')}</h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">{t('pricing.custom_text')}</p>
          <a href="https://wa.me/93700000000" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-lg shadow-btn hover:bg-primary-dark transition-all duration-200">
            <span className="material-symbols-outlined text-base">chat</span>
            {t('pricing.request_quote')}
          </a>
        </div>
      </section>
    </div>
  )
}
