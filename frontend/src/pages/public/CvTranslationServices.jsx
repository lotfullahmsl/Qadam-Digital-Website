import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '../../constants/routes'
import RequestForm from '../../components/common/RequestForm'
import { serviceRequestService } from '../../services/serviceRequestService'

export default function CvTranslationServices() {
  const { t } = useTranslation()

  const CV_SERVICES = [
    { icon: 'description', title: t('cv_page.cv_services.cv_title'), desc: t('cv_page.cv_services.cv_desc') },
    { icon: 'work', title: t('cv_page.cv_services.resume_title'), desc: t('cv_page.cv_services.resume_desc') },
    { icon: 'edit_note', title: t('cv_page.cv_services.motivation_title'), desc: t('cv_page.cv_services.motivation_desc') },
    { icon: 'psychology', title: t('cv_page.cv_services.sop_title'), desc: t('cv_page.cv_services.sop_desc') },
  ]

  const TRANSLATION_SERVICES = [
    { icon: 'translate', title: t('cv_page.trans_services.academic_title'), desc: t('cv_page.trans_services.academic_desc') },
    { icon: 'gavel', title: t('cv_page.trans_services.legal_title'), desc: t('cv_page.trans_services.legal_desc') },
    { icon: 'article', title: t('cv_page.trans_services.personal_title'), desc: t('cv_page.trans_services.personal_desc') },
    { icon: 'language', title: t('cv_page.trans_services.multilingual_title'), desc: t('cv_page.trans_services.multilingual_desc') },
  ]

  const STEPS = [
    { step: '01', icon: 'chat', title: t('cv_page.steps.s1_title'), desc: t('cv_page.steps.s1_desc') },
    { step: '02', icon: 'upload_file', title: t('cv_page.steps.s2_title'), desc: t('cv_page.steps.s2_desc') },
    { step: '03', icon: 'edit', title: t('cv_page.steps.s3_title'), desc: t('cv_page.steps.s3_desc') },
    { step: '04', icon: 'check_circle', title: t('cv_page.steps.s4_title'), desc: t('cv_page.steps.s4_desc') },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="hero-bg py-24 px-6">
        <div className="max-w-screen-xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-white/20 mb-5">
            <span className="material-symbols-outlined text-sm">description</span>
            {t('cv_page.badge')}
          </span>
          <h1 className="font-heading font-bold text-white text-5xl mb-4 max-w-2xl">{t('cv_page.title')}</h1>
          <div className="h-1 w-24 bg-primary rounded-full mb-6" />
          <p className="text-white/80 text-lg max-w-2xl leading-relaxed">{t('cv_page.subtitle')}</p>
        </div>
      </section>

      {/* CV Services */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-screen-xl mx-auto">
          <div className="space-y-3 mb-12">
            <h2 className="font-heading font-bold text-navy text-3xl">{t('cv_page.cv_title')}</h2>
            <p className="text-text-muted">{t('cv_page.cv_subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CV_SERVICES.map((s) => (
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

      {/* Translation Services */}
      <section className="py-16 px-6 bg-primary-pale border-y border-border">
        <div className="max-w-screen-xl mx-auto">
          <div className="space-y-3 mb-12">
            <h2 className="font-heading font-bold text-navy text-3xl">{t('cv_page.trans_title')}</h2>
            <p className="text-text-muted">{t('cv_page.trans_subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRANSLATION_SERVICES.map((s) => (
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

      {/* How It Works */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-navy text-3xl">{t('cv_page.how_title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {STEPS.map((item) => (
              <div key={item.step} className="card p-6 flex flex-col gap-3 items-center text-center">
                <span className="text-4xl font-heading font-bold text-primary/30">{item.step}</span>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                </div>
                <h3 className="font-heading font-semibold text-navy">{item.title}</h3>
                <p className="text-sm text-text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-background border-t border-border">
        <div className="max-w-3xl mx-auto">
          <RequestForm
            title="Request CV or Translation Service"
            description="Send your request and our team will contact you about documents, pricing, and delivery."
            submitLabel="Submit Service Request"
            allowAttachment
            extraFields={[
              { name: 'service', label: 'Service', placeholder: 'Select service', type: 'select', options: ['CV Writing', 'Resume', 'Motivation Letter', 'SOP', 'Document Translation', 'Proofreading'] },
              { name: 'country', label: 'Country', placeholder: 'Country' },
            ]}
            onSubmit={(data) => serviceRequestService.submitContact({ ...data, subject: data.service || 'CV / Translation Service' })}
          />
        </div>
      </section>

      <section className="py-16 px-6 bg-primary">
        <div className="max-w-screen-xl mx-auto text-center space-y-5">
          <h2 className="font-heading font-bold text-white text-3xl">{t('cv_page.cta_title')}</h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto">{t('cv_page.cta_subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/923039393437" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-3.5 rounded-lg hover:bg-primary-pale transition-all duration-200 shadow-lg">
              <span className="material-symbols-outlined text-base">chat</span>
              {t('cv_page.request_whatsapp')}
            </a>
            <Link to={ROUTES.PRICING} className="inline-flex items-center gap-2 bg-white/15 text-white font-semibold px-8 py-3.5 rounded-lg border border-white/30 hover:bg-white/25 transition-all duration-200">
              {t('cv_page.view_pricing')}
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
