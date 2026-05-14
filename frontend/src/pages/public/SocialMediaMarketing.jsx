import React from 'react'
import { useTranslation } from 'react-i18next'
import RequestForm from '../../components/common/RequestForm'
import { serviceRequestService } from '../../services/serviceRequestService'

export default function SocialMediaMarketing() {
  const { t } = useTranslation()

  const SMM_SERVICES = [
    { icon: 'thumb_up', title: t('smm_page.services.fb_title'), desc: t('smm_page.services.fb_desc') },
    { icon: 'photo_camera', title: t('smm_page.services.ig_title'), desc: t('smm_page.services.ig_desc') },
    { icon: 'trending_up', title: t('smm_page.services.growth_title'), desc: t('smm_page.services.growth_desc') },
    { icon: 'rocket_launch', title: t('smm_page.services.boost_title'), desc: t('smm_page.services.boost_desc') },
    { icon: 'group', title: t('smm_page.services.target_title'), desc: t('smm_page.services.target_desc') },
    { icon: 'campaign', title: t('smm_page.services.promo_title'), desc: t('smm_page.services.promo_desc') },
  ]

  const PACKAGES = [
    {
      nameKey: 'smm_page.packages.starter',
      price: '50',
      features: [t('smm_page.packages.starter_f1'), t('smm_page.packages.starter_f2'), t('smm_page.packages.starter_f3'), t('smm_page.packages.starter_f4')],
      popular: false,
    },
    {
      nameKey: 'smm_page.packages.growth',
      price: '120',
      popular: true,
      features: [t('smm_page.packages.growth_f1'), t('smm_page.packages.growth_f2'), t('smm_page.packages.growth_f3'), t('smm_page.packages.growth_f4'), t('smm_page.packages.growth_f5')],
    },
    {
      nameKey: 'smm_page.packages.premium',
      price: '250',
      features: [t('smm_page.packages.premium_f1'), t('smm_page.packages.premium_f2'), t('smm_page.packages.premium_f3'), t('smm_page.packages.premium_f4'), t('smm_page.packages.premium_f5')],
      popular: false,
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="hero-bg py-24 px-6">
        <div className="max-w-screen-xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-white/20 mb-5">
            <span className="material-symbols-outlined text-sm">campaign</span>
            {t('smm_page.badge')}
          </span>
          <h1 className="font-heading font-bold text-white text-5xl mb-4 max-w-2xl">{t('smm_page.title')}</h1>
          <div className="h-1 w-24 bg-primary rounded-full mb-6" />
          <p className="text-white/80 text-lg max-w-2xl leading-relaxed">{t('smm_page.subtitle')}</p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <h2 className="font-heading font-bold text-navy text-3xl">{t('smm_page.services_title')}</h2>
            <p className="text-text-muted text-lg">{t('smm_page.services_subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SMM_SERVICES.map((s) => (
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

      {/* Packages */}
      <section className="py-16 px-6 bg-primary-pale border-y border-border">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <h2 className="font-heading font-bold text-navy text-3xl">{t('smm_page.packages_title')}</h2>
            <p className="text-text-muted text-lg">{t('smm_page.packages_subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {PACKAGES.map((pkg, i) => (
              <div key={i} className={`relative flex flex-col rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 ${pkg.popular ? 'bg-primary text-white shadow-[0_8px_32px_rgba(0,170,255,0.35)] border-2 border-primary' : 'bg-white border border-border shadow-card hover:shadow-card-hover'}`}>
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-navy text-white px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase">
                    {t('smm_page.most_popular')}
                  </div>
                )}
                <h3 className={`font-heading font-semibold text-xl mb-2 ${pkg.popular ? 'text-white' : 'text-navy'}`}>{t(pkg.nameKey)}</h3>
                <div className="mb-5">
                  <span className={`font-heading text-3xl font-bold ${pkg.popular ? 'text-white' : 'text-primary'}`}>${pkg.price}</span>
                  <span className={`text-sm ${pkg.popular ? 'text-white/70' : 'text-text-muted'}`}>{t('smm_page.per_month')}</span>
                </div>
                <ul className="space-y-2.5 mb-6 flex-grow">
                  {pkg.features.map((f, fi) => (
                    <li key={fi} className={`flex items-start gap-2 text-sm ${pkg.popular ? 'text-white/90' : 'text-text-secondary'}`}>
                      <span className={`material-symbols-outlined text-lg ${pkg.popular ? 'text-white' : 'text-primary'}`}>check</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="https://wa.me/923039393438" target="_blank" rel="noopener noreferrer"
                  className={`w-full text-center py-2.5 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all duration-200 ${pkg.popular ? 'bg-white text-primary hover:bg-primary-pale' : 'bg-primary text-white hover:bg-primary-dark shadow-btn'}`}>
                  {t('smm_page.get_started')}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-background border-t border-border">
        <div className="max-w-3xl mx-auto">
          <RequestForm
            title="Request Social Media Marketing"
            description="Tell us about your business and the platforms you want to grow."
            submitLabel="Submit Social Media Request"
            extraFields={[
              { name: 'platforms', label: 'Platforms', placeholder: 'Platforms', type: 'select', options: ['Facebook', 'Instagram', 'TikTok', 'YouTube', 'Multiple Platforms'] },
              { name: 'postsPerMonth', label: 'Posts Per Month', placeholder: 'Posts per month' },
              { name: 'budget', label: 'Budget', placeholder: 'Monthly budget' },
            ]}
            onSubmit={serviceRequestService.submitSocialMedia}
          />
        </div>
      </section>

      <section className="py-16 px-6 bg-primary">
        <div className="max-w-screen-xl mx-auto text-center space-y-5">
          <h2 className="font-heading font-bold text-white text-3xl">{t('smm_page.cta_title')}</h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto">{t('smm_page.cta_subtitle')}</p>
          <a href="https://wa.me/923039393438" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-3.5 rounded-lg hover:bg-primary-pale transition-all duration-200 shadow-lg">
            <span className="material-symbols-outlined text-base">chat</span>
            {t('smm_page.start_campaign')}
          </a>
        </div>
      </section>
    </div>
  )
}
