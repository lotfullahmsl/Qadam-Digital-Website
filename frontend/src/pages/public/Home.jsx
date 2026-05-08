import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '../../constants/routes'
import ServiceCard from '../../components/cards/ServiceCard'
import AdBanner from '../../components/common/AdBanner'

const SERVICES = [
  { icon: 'menu_book', title: 'Scholarship Guidance', description: 'Expert consultation to secure fully funded educational opportunities worldwide.', to: ROUTES.SCHOLARSHIPS },
  { icon: 'web', title: 'Web Development', description: 'Bespoke, high-performance websites and digital platforms for businesses.', to: ROUTES.WEBSITE_DATABASE },
  { icon: 'smart_toy', title: 'AI Subscriptions', description: 'Access ChatGPT, Gemini, Coursera, Canva Pro and more at affordable prices.', to: ROUTES.DIGITAL_TOOLS },
  { icon: 'description', title: 'CV & Motivation Letters', description: 'Professional, ATS-optimized CVs and compelling motivation letters.', to: ROUTES.CV_TRANSLATION },
  { icon: 'translate', title: 'Translation Services', description: 'Certified multilingual translation of academic and official documents.', to: ROUTES.CV_TRANSLATION },
  { icon: 'campaign', title: 'Social Media Marketing', description: 'Strategic digital marketing to grow your brand across global platforms.', to: ROUTES.SOCIAL_MEDIA },
]

const TESTIMONIALS = [
  { name: 'Ahmad Karimi', country: 'Afghanistan', text: 'QADAM Digital helped me secure a fully funded scholarship to Germany. Their guidance was exceptional throughout the entire process.', avatar: 'AK' },
  { name: 'Sara Mohammadi', country: 'Pakistan', text: 'The CV writing service was outstanding. I received interview calls from 3 top universities within a week of submitting.', avatar: 'SM' },
  { name: 'Bilal Yousafzai', country: 'Pakistan', text: 'Their web development team built our clinic management system perfectly. Very professional and delivered on time.', avatar: 'BY' },
]

const WHY_US = [
  { icon: 'verified', title: 'Trusted & Reliable', desc: 'Hundreds of successful scholarship applications and digital projects delivered.' },
  { icon: 'language', title: 'Multilingual Support', desc: 'Full support in English, Pashto, and Dari for seamless communication.' },
  { icon: 'support_agent', title: '24/7 Assistance', desc: 'Always available via WhatsApp for urgent queries and support.' },
  { icon: 'workspace_premium', title: 'Premium Quality', desc: 'High-end deliverables that meet international standards every time.' },
]

export default function Home() {
  const { t } = useTranslation()

  const STATS = [
    { icon: 'school', value: '500+', label: t('hero.stat_scholarships') },
    { icon: 'code', value: '1,000+', label: t('hero.stat_websites') },
    { icon: 'people', value: '5,000+', label: t('hero.stat_students') },
    { icon: 'smart_toy', value: '24/7', label: t('hero.stat_support') },
  ]

  return (
    <div className="flex flex-col">

      {/* ── Hero ── */}
      <section className="hero-bg relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, #00AAFF 0%, transparent 50%), radial-gradient(circle at 80% 20%, #A8D8F0 0%, transparent 50%)' }}
        />
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 py-24 md:py-32 flex flex-col lg:flex-row items-center gap-12">
          {/* Left */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-white/20">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              {t('hero.badge')}
            </div>
            <h1 className="font-heading font-bold text-white leading-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              {t('hero.title')}
            </h1>
            <p className="text-primary-light/90 text-lg max-w-xl leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="https://wa.me/93700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-lg shadow-btn hover:bg-white hover:text-primary transition-all duration-200 text-sm"
              >
                <span className="material-symbols-outlined text-base">chat</span>
                {t('hero.cta_apply')}
              </a>
              <Link
                to={ROUTES.SERVICES}
                className="inline-flex items-center justify-center gap-2 bg-white/15 text-white font-semibold px-8 py-3.5 rounded-lg border border-white/30 hover:bg-white hover:text-navy transition-all duration-200 text-sm"
              >
                {t('hero.cta_explore')}
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Right — Stats */}
          <div className="flex-shrink-0 grid grid-cols-2 gap-4 w-full max-w-sm">
            {STATS.map((stat) => (
              <div key={stat.label} className="glass-panel p-5 text-center">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary mx-auto mb-3">
                  <span className="material-symbols-outlined text-xl">{stat.icon}</span>
                </div>
                <div className="font-heading font-bold text-white text-2xl">{stat.value}</div>
                <div className="text-primary-light/70 text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <span className="badge mb-3">Our Services</span>
            <h2 className="font-heading font-bold text-navy text-4xl mb-3">{t('services.title')}</h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">{t('services.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => <ServiceCard key={s.title} {...s} />)}
          </div>
        </div>
      </section>

      {/* ── Ad Banner ── */}
      <div className="px-6 pb-8 max-w-screen-xl mx-auto w-full">
        <AdBanner />
      </div>

      {/* ── Scholarship CTA Banner ── */}
      <section className="py-16 px-6 bg-primary-pale border-y border-border">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <span className="badge">Scholarships</span>
            <h2 className="font-heading font-bold text-navy text-3xl">{t('scholarships.title')}</h2>
            <p className="text-text-muted text-lg max-w-xl">
              {t('scholarships.subtitle')}
            </p>
          </div>
          <Link
            to={ROUTES.SCHOLARSHIPS}
            className="flex-shrink-0 inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-lg shadow-btn hover:bg-primary-dark transition-all duration-200"
          >
            Browse Scholarships
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <span className="badge mb-3">Why QADAM Digital</span>
            <h2 className="font-heading font-bold text-navy text-4xl mb-3">Trusted by Thousands</h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">Students and businesses across Afghanistan, Pakistan, and beyond rely on us.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map((item) => (
              <div key={item.title} className="card p-6 flex flex-col gap-3 items-center text-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                </div>
                <h3 className="font-heading font-semibold text-navy text-base">{item.title}</h3>
                <p className="text-sm text-text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 px-6 bg-navy">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-white/10 text-primary-light px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase border border-white/20 mb-3">
              <span className="material-symbols-outlined text-sm">star</span>
              Testimonials
            </span>
            <h2 className="font-heading font-bold text-white text-4xl mb-3">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white/10 border border-white/15 rounded-xl p-6 flex flex-col gap-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-primary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p className="text-primary-light/90 text-sm leading-relaxed italic flex-grow">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-xs text-primary-light/60">{t.country}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 px-6 bg-primary">
        <div className="max-w-screen-xl mx-auto text-center space-y-6">
          <h2 className="font-heading font-bold text-white text-4xl">Ready to Start Your Journey?</h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Contact us today and let's discuss how QADAM Digital can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/93700000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-8 py-3.5 rounded-lg shadow-btn hover:bg-primary-pale transition-all duration-200"
            >
              <span className="material-symbols-outlined text-base">chat</span>
              {t('contact.whatsapp_btn')}
            </a>
            <Link
              to={ROUTES.CONTACT}
              className="inline-flex items-center justify-center gap-2 bg-white/15 text-white font-semibold px-8 py-3.5 rounded-lg border border-white/30 hover:bg-white/25 transition-all duration-200"
            >
              Contact Us
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
