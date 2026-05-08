import React, { useState } from 'react'

const CATEGORIES = ['AI Subscriptions', 'Scholarship Services', 'CV & Translation', 'Web Development', 'Database Systems', 'Social Media Marketing']

const PLANS = {
  'AI Subscriptions': [
    { name: 'ChatGPT Plus', price: '10', badge: 'Shared', features: ['GPT-4 Access', 'DALL-E Image Gen', 'Advanced Data Analysis'], popular: false },
    { name: 'Gemini Advanced', price: '12', badge: 'Shared', features: ['Gemini 1.5 Pro', 'Google Workspace', '2TB Storage'], popular: false },
    { name: 'Coursera Plus', price: '45', badge: 'Dedicated', features: ['Unlimited Courses', 'Certificates', 'Guided Projects'], popular: true },
    { name: 'Canva Pro', price: '8', badge: 'Team', features: ['Premium Templates', 'Brand Kit', 'Magic Studio AI'], popular: false },
  ],
  'Scholarship Services': [
    { name: 'Basic', price: '50', features: ['Scholarship search', 'Document checklist', 'Email support'], popular: false },
    { name: 'Standard', price: '120', features: ['Full application support', 'Document review', 'WhatsApp support', '3 scholarships'], popular: true },
    { name: 'Premium', price: '250', features: ['Unlimited applications', 'Full document prep', 'Interview coaching', 'Priority support'], popular: false },
  ],
  'CV & Translation': [
    { name: 'CV Only', price: '25', features: ['Professional CV', 'ATS optimized', '2 revisions'], popular: false },
    { name: 'CV + Motivation', price: '45', features: ['Professional CV', 'Motivation letter', 'SOP', '3 revisions'], popular: true },
    { name: 'Full Package', price: '80', features: ['CV + Motivation', 'Translation (5 pages)', 'Unlimited revisions'], popular: false },
  ],
  'Web Development': [
    { name: 'Landing Page', price: '150', features: ['1-page website', 'Mobile responsive', 'Contact form', '1 month support'], popular: false },
    { name: 'Business Site', price: '400', features: ['5-page website', 'CMS integration', 'SEO setup', '3 months support'], popular: true },
    { name: 'Custom Platform', price: '800', features: ['Custom features', 'Admin panel', 'API integration', '6 months support'], popular: false },
  ],
  'Database Systems': [
    { name: 'Basic System', price: '300', features: ['Up to 5 modules', 'Basic reports', '1 month support'], popular: false },
    { name: 'Standard System', price: '600', features: ['Up to 10 modules', 'Advanced reports', 'User management', '3 months support'], popular: true },
    { name: 'Enterprise', price: '1200', features: ['Unlimited modules', 'Custom reports', 'Multi-user', '6 months support'], popular: false },
  ],
  'Social Media Marketing': [
    { name: 'Starter', price: '50', period: '/mo', features: ['2 platforms', '8 posts/month', 'Basic analytics'], popular: false },
    { name: 'Growth', price: '120', period: '/mo', features: ['3 platforms', '20 posts/month', 'Ad management', 'Monthly report'], popular: true },
    { name: 'Premium', price: '250', period: '/mo', features: ['All platforms', 'Unlimited posts', 'Full ad management', 'Weekly reports'], popular: false },
  ],
}

export default function Pricing() {
  const [activeCategory, setActiveCategory] = useState('AI Subscriptions')
  const plans = PLANS[activeCategory] || []

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-section pb-xl px-lg hero-bg text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase border border-primary/20">
            <span className="material-symbols-outlined text-sm">sell</span>
            Pricing
          </div>
          <h1 className="font-heading text-h1 text-on-surface">
            Professional Services at{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">
              Competitive Rates
            </span>
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Transparent pricing for all our services. Choose the package that fits your needs and budget.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="px-lg py-8 bg-surface-container-low border-y border-outline-variant/30 sticky top-16 z-40">
        <div className="max-w-screen-xl mx-auto flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-primary text-on-primary btn-glow'
                  : 'border border-outline-variant/30 text-on-surface-variant hover:border-primary hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Plans */}
      <section className="py-section px-lg max-w-screen-xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter justify-items-center">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative w-full flex flex-col rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                plan.popular ? 'premium-border bg-surface-container/30 backdrop-blur-xl' : 'glass-card'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase shadow-[0_0_10px_rgba(242,202,80,0.5)]">
                  Most Popular
                </div>
              )}
              {plan.badge && (
                <span className="self-end text-xs font-semibold tracking-widest uppercase text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded mb-3">
                  {plan.badge}
                </span>
              )}
              <h3 className="font-heading font-semibold text-on-surface text-xl mb-2">{plan.name}</h3>
              <div className="mb-5">
                <span className="font-heading text-3xl font-bold text-primary">${plan.price}</span>
                <span className="text-sm text-on-surface-variant">{plan.period || ''}</span>
              </div>
              <ul className="space-y-2.5 mb-6 flex-grow">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary text-lg">check</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://wa.me/93700000000"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full text-center py-2.5 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
                  plan.popular
                    ? 'bg-primary text-on-primary btn-glow hover:bg-primary-fixed'
                    : 'border border-primary text-primary hover:bg-primary hover:text-on-primary'
                }`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Quote */}
      <section className="py-section px-lg bg-surface-container-low border-t border-outline-variant/30">
        <div className="max-w-screen-xl mx-auto glass-panel rounded-2xl p-xl text-center space-y-6">
          <h2 className="font-heading text-h2 text-on-surface">Need a Custom Quote?</h2>
          <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto">
            Have a unique project or requirement? Contact us and we'll provide a tailored quote just for you.
          </p>
          <a
            href="https://wa.me/93700000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-on-primary font-semibold px-xl py-md rounded-lg glow-button transition-all duration-300"
          >
            <span className="material-symbols-outlined">chat</span>
            Request Custom Quote
          </a>
        </div>
      </section>
    </div>
  )
}
