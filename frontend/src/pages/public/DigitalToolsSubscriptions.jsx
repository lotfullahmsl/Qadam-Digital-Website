import React from 'react'
import { useTranslation } from 'react-i18next'
import RequestForm from '../../components/common/RequestForm'
import { serviceRequestService } from '../../services/serviceRequestService'

export default function DigitalToolsSubscriptions() {
  const { t } = useTranslation()

  const SUBSCRIPTIONS = [
    { name: 'ChatGPT Plus', price: '10', badge: t('digital_tools.tools.shared'), icon: 'smart_toy', popular: false, features: [t('digital_tools.tools.chatgpt_f1'), t('digital_tools.tools.chatgpt_f2'), t('digital_tools.tools.chatgpt_f3'), t('digital_tools.tools.chatgpt_f4')] },
    { name: 'Gemini Advanced', price: '12', badge: t('digital_tools.tools.shared'), icon: 'psychology', popular: false, features: [t('digital_tools.tools.gemini_f1'), t('digital_tools.tools.gemini_f2'), t('digital_tools.tools.gemini_f3'), t('digital_tools.tools.gemini_f4')] },
    { name: 'Coursera Plus', price: '45', badge: t('digital_tools.tools.dedicated'), icon: 'school', popular: true, features: [t('digital_tools.tools.coursera_f1'), t('digital_tools.tools.coursera_f2'), t('digital_tools.tools.coursera_f3'), t('digital_tools.tools.coursera_f4')] },
    { name: 'Canva Pro', price: '8', badge: t('digital_tools.tools.team'), icon: 'palette', popular: false, features: [t('digital_tools.tools.canva_f1'), t('digital_tools.tools.canva_f2'), t('digital_tools.tools.canva_f3'), t('digital_tools.tools.canva_f4')] },
    { name: 'Udemy', price: '15', badge: t('digital_tools.tools.per_course'), icon: 'play_circle', popular: false, features: [t('digital_tools.tools.udemy_f1'), t('digital_tools.tools.udemy_f2'), t('digital_tools.tools.udemy_f3'), t('digital_tools.tools.udemy_f4')] },
  ]

  const STEPS = [
    { step: '01', icon: 'chat', title: t('digital_tools.steps.s1_title'), desc: t('digital_tools.steps.s1_desc') },
    { step: '02', icon: 'payments', title: t('digital_tools.steps.s2_title'), desc: t('digital_tools.steps.s2_desc') },
    { step: '03', icon: 'key', title: t('digital_tools.steps.s3_title'), desc: t('digital_tools.steps.s3_desc') },
    { step: '04', icon: 'support_agent', title: t('digital_tools.steps.s4_title'), desc: t('digital_tools.steps.s4_desc') },
  ]

  const NOTES = [
    t('digital_tools.notes.n1'),
    t('digital_tools.notes.n2'),
    t('digital_tools.notes.n3'),
    t('digital_tools.notes.n4'),
    t('digital_tools.notes.n5'),
  ]

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="hero-bg py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-white/20">
            <span className="material-symbols-outlined text-sm">smart_toy</span>
            {t('digital_tools.badge')}
          </span>
          <h1 className="font-heading font-bold text-white text-5xl">{t('digital_tools.title')}</h1>
          <p className="text-primary-light/90 text-lg max-w-2xl mx-auto">{t('digital_tools.subtitle')}</p>
        </div>
      </section>

      {/* Subscriptions */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-12">
            <h2 className="font-heading font-bold text-navy text-3xl mb-2">{t('digital_tools.subs_title')}</h2>
            <p className="text-text-muted">{t('digital_tools.subs_subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {SUBSCRIPTIONS.map((sub, i) => (
              <div key={i} className={`relative flex flex-col rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 ${sub.popular ? 'bg-primary text-white shadow-[0_8px_32px_rgba(0,170,255,0.35)] border-2 border-primary' : 'bg-white border border-border shadow-card hover:shadow-card-hover'}`}>
                {sub.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-navy text-white px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase">
                    {t('digital_tools.most_popular')}
                  </div>
                )}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${sub.popular ? 'bg-white/20 border-white/30' : 'bg-primary/10 border-primary/20'}`}>
                    <span className={`material-symbols-outlined text-2xl ${sub.popular ? 'text-white' : 'text-primary'}`}>{sub.icon}</span>
                  </div>
                  {sub.badge && (
                    <span className={`text-xs font-semibold tracking-widest uppercase px-2 py-0.5 rounded ${sub.popular ? 'bg-white/20 text-white' : 'bg-primary-pale text-primary-dark'}`}>
                      {sub.badge}
                    </span>
                  )}
                </div>
                <h3 className={`font-heading font-semibold text-xl mb-1 ${sub.popular ? 'text-white' : 'text-navy'}`}>{sub.name}</h3>
                <div className="mb-4">
                  <span className={`font-heading text-2xl font-bold ${sub.popular ? 'text-white' : 'text-primary'}`}>${sub.price}</span>
                  <span className={`text-sm ${sub.popular ? 'text-white/70' : 'text-text-muted'}`}>{t('digital_tools.per_month')}</span>
                </div>
                <ul className="space-y-2 mb-5 flex-grow">
                  {sub.features.map((f, fi) => (
                    <li key={fi} className={`flex items-start gap-2 text-xs ${sub.popular ? 'text-white/90' : 'text-text-secondary'}`}>
                      <span className={`material-symbols-outlined text-base ${sub.popular ? 'text-white' : 'text-primary'}`}>check</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="https://wa.me/923039393438" target="_blank" rel="noopener noreferrer"
                  className={`w-full text-center py-2 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all duration-200 ${sub.popular ? 'bg-white text-primary hover:bg-primary-pale' : 'border border-primary text-primary hover:bg-primary hover:text-white'}`}>
                  {t('digital_tools.request_sub')}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-primary-pale border-y border-border">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-navy text-3xl">{t('digital_tools.how_title')}</h2>
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

      {/* Notes */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-screen-xl mx-auto">
          <div className="card p-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-2xl">info</span>
              <h2 className="font-heading font-bold text-navy text-xl">{t('digital_tools.notes_title')}</h2>
            </div>
            <ul className="space-y-2 text-sm text-text-secondary">
              {NOTES.map((note, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-base mt-0.5 flex-shrink-0">arrow_right</span>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-primary-pale border-t border-border">
        <div className="max-w-3xl mx-auto">
          <RequestForm
            title="Request a Digital Subscription"
            description="Tell us which tool or subscription you need and our team will contact you."
            submitLabel="Submit Subscription Request"
            extraFields={[
              { name: 'plan', label: 'Plan', placeholder: 'Select subscription', type: 'select', required: true, options: SUBSCRIPTIONS.map((item) => item.name) },
              { name: 'billingPeriod', label: 'Billing Period', placeholder: 'Billing period', type: 'select', options: ['Monthly', 'Yearly', 'One-time'] },
              { name: 'paymentMethod', label: 'Payment Method', placeholder: 'Preferred payment method' },
            ]}
            onSubmit={serviceRequestService.submitSubscription}
          />
        </div>
      </section>
    </div>
  )
}
