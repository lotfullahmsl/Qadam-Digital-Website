import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '../../constants/routes'
import ServiceCard from '../../components/cards/ServiceCard'
import AdBanner from '../../components/common/AdBanner'

const STATS = [
  { icon: 'school', value: '500+', label: 'Scholarships' },
  { icon: 'code', value: '1k+', label: 'Websites Developed' },
  { icon: 'smart_toy', value: '24/7', label: 'AI Support' },
]

const SERVICES = [
  { icon: 'menu_book', title: 'Scholarship Guidance', description: 'Expert consultation to secure premium educational opportunities worldwide.', to: ROUTES.SCHOLARSHIPS },
  { icon: 'web', title: 'Web Development', description: 'Bespoke digital platforms crafted with elegant minimalism and advanced architecture.', to: ROUTES.WEBSITE_DATABASE },
  { icon: 'memory', title: 'AI Subscriptions', description: 'Access cutting-edge artificial intelligence tools tailored for academic research.', to: ROUTES.DIGITAL_TOOLS },
  { icon: 'description', title: 'CV & Motivation Letters', description: 'Professional, ATS-optimized CVs and compelling motivation letters for global applications.', to: ROUTES.CV_TRANSLATION },
  { icon: 'translate', title: 'Translation Services', description: 'Certified multilingual translation of academic documents and personal statements.', to: ROUTES.CV_TRANSLATION },
  { icon: 'campaign', title: 'Social Media Marketing', description: 'Strategic digital marketing to amplify your brand across global platforms.', to: ROUTES.SOCIAL_MEDIA },
]

const TESTIMONIALS = [
  { name: 'Ahmad Karimi', country: 'Afghanistan', text: 'QADAM Digital helped me secure a fully funded scholarship to Germany. Their guidance was exceptional.', avatar: 'A' },
  { name: 'Sara Mohammadi', country: 'Pakistan', text: 'The CV writing service was outstanding. I got interview calls from 3 top universities within a week.', avatar: 'S' },
  { name: 'Bilal Yousafzai', country: 'Pakistan', text: 'Their web development team built our clinic management system perfectly. Highly professional.', avatar: 'B' },
]

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-section pb-xl px-lg hero-bg overflow-hidden flex flex-col items-center justify-center text-center min-h-[820px]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-primary/20">
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
            {t('hero.badge')}
          </div>
          <h1 className="font-heading text-h1 text-on-surface">
            Empowering{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">
              Education
            </span>{' '}
            &amp; Digital Solutions
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="https://wa.me/93700000000"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-on-primary font-semibold px-xl py-md rounded-lg glow-button transition-all duration-300 flex items-center justify-center gap-2"
            >
              {t('hero.cta_apply')}
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
            <Link
              to={ROUTES.SERVICES}
              className="glass-panel text-primary font-semibold px-xl py-md rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              {t('hero.cta_explore')}
              <span className="material-symbols-outlined">explore</span>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 mt-section grid grid-cols-1 md:grid-cols-3 gap-gutter max-w-screen-xl mx-auto w-full">
          {STATS.map((stat) => (
            <div key={stat.label} className="glass-panel p-lg rounded-xl flex items-center gap-4 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>
              </div>
              <div>
                <div className="font-heading text-h3 text-on-surface">{stat.value}</div>
                <div className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-section px-lg max-w-screen-xl mx-auto w-full">
        <div className="text-center space-y-3 mb-12">
          <h2 className="font-heading text-h2 text-on-surface">{t('services.title')}</h2>
          <p className="text-body-lg text-on-surface-variant">{t('services.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </section>

      {/* Ad Banner */}
      <div className="px-lg max-w-screen-xl mx-auto w-full mb-section">
        <AdBanner />
      </div>

      {/* Featured Scholarships CTA */}
      <section className="py-section px-lg bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase border border-primary/20">
              <span className="material-symbols-outlined text-sm">school</span>
              Scholarships
            </div>
            <h2 className="font-heading text-h2 text-on-surface">Find Your Dream Scholarship</h2>
            <p className="text-body-lg text-on-surface-variant max-w-xl">
              Browse 500+ fully funded and partial scholarships for BS, MS, and PhD programs worldwide.
            </p>
          </div>
          <Link
            to={ROUTES.SCHOLARSHIPS}
            className="flex-shrink-0 bg-primary text-on-primary font-semibold px-xl py-md rounded-lg glow-button transition-all duration-300 flex items-center gap-2"
          >
            Browse Scholarships
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-section px-lg max-w-screen-xl mx-auto w-full">
        <div className="text-center space-y-3 mb-12">
          <h2 className="font-heading text-h2 text-on-surface">Why Choose QADAM Digital?</h2>
          <p className="text-body-lg text-on-surface-variant">Trusted by students and businesses across Afghanistan, Pakistan, and beyond.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {[
            { icon: 'verified', title: 'Trusted & Reliable', desc: 'Hundreds of successful scholarship applications and digital projects delivered.' },
            { icon: 'language', title: 'Multilingual Support', desc: 'Full support in English, Pashto, and Dari for seamless communication.' },
            { icon: 'support_agent', title: '24/7 Assistance', desc: 'Always available via WhatsApp for urgent queries and support.' },
            { icon: 'workspace_premium', title: 'Premium Quality', desc: 'High-end deliverables that meet international standards every time.' },
          ].map((item) => (
            <div key={item.title} className="glass-panel rounded-xl p-6 flex flex-col gap-3 text-center items-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
              </div>
              <h3 className="font-heading font-semibold text-on-surface text-lg">{item.title}</h3>
              <p className="text-sm text-on-surface-variant">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-section px-lg bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <h2 className="font-heading text-h2 text-on-surface">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="glass-panel rounded-xl p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-lg">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-on-surface text-sm">{t.name}</p>
                    <p className="text-xs text-on-surface-variant">{t.country}</p>
                  </div>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed italic">"{t.text}"</p>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-primary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-section px-lg">
        <div className="max-w-screen-xl mx-auto glass-panel rounded-2xl p-xl text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
          <h2 className="font-heading text-h2 text-on-surface relative z-10">Ready to Start Your Journey?</h2>
          <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto relative z-10">
            Contact us today on WhatsApp and let's discuss how QADAM Digital can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <a
              href="https://wa.me/93700000000"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-on-primary font-semibold px-xl py-md rounded-lg glow-button transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">chat</span>
              Chat on WhatsApp
            </a>
            <Link
              to={ROUTES.CONTACT}
              className="glass-panel text-primary font-semibold px-xl py-md rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              Contact Us
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
