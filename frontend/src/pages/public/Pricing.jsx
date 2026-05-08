import React, { useState } from 'react'

const CATEGORIES = ['AI Subscriptions', 'Scholarship Services', 'CV & Translation', 'Web Development', 'Database Systems', 'Social Media Marketing']

const PLANS = {
  'AI Subscriptions': [
    { name: 'ChatGPT Plus', price: '10', badge: 'Shared', features: ['GPT-4 Access', 'DALL-E Image Gen', 'Advanced Data Analysis'] },
    { name: 'Gemini Advanced', price: '12', badge: 'Shared', features: ['Gemini 1.5 Pro', 'Google Workspace', '2TB Storage'] },
    { name: 'Coursera Plus', price: '45', badge: 'Dedicated', features: ['Unlimited Courses', 'Certificates', 'Guided Projects'], popular: true },
    { name: 'Canva Pro', price: '8', badge: 'Team', features: ['Premium Templates', 'Brand Kit', 'Magic Studio AI'] },
  ],
  'Scholarship Services': [
    { name: 'Basic', price: '50', features: ['Scholarship search', 'Document checklist', 'Email support'] },
    { name: 'Standard', price: '120', features: ['Full application support', 'Document review', 'WhatsApp support', '3 scholarships'], popular: true },
    { name: 'Premium', price: '250', features: ['Unlimited applications', 'Full document prep', 'Interview coaching', 'Priority support'] },
  ],
  'CV & Translation': [
    { name: 'CV Only', price: '25', features: ['Professional CV', 'ATS optimized', '2 revisions'] },
    { name: 'CV + Motivation', price: '45', features: ['Professional CV', 'Motivation letter', 'SOP', '3 revisions'], popular: true },
    { name: 'Full Package', price: '80', features: ['CV + Motivation', 'Translation (5 pages)', 'Unlimited revisions'] },
  ],
  'Web Development': [
    { name: 'Landing Page', price: '150', features: ['1-page website', 'Mobile responsive', 'Contact form', '1 month support'] },
    { name: 'Business Site', price: '400', features: ['5-page website', 'CMS integration', 'SEO setup', '3 months support'], popular: true },
    { name: 'Custom Platform', price: '800', features: ['Custom features', 'Admin panel', 'API integration', '6 months support'] },
  ],
  'Database Systems': [
    { name: 'Basic System', price: '300', features: ['Up to 5 modules', 'Basic reports', '1 month support'] },
    { name: 'Standard System', price: '600', features: ['Up to 10 modules', 'Advanced reports', 'User management', '3 months support'], popular: true },
    { name: 'Enterprise', price: '1200', features: ['Unlimited modules', 'Custom reports', 'Multi-user', '6 months support'] },
  ],
  'Social Media Marketing': [
    { name: 'Starter', price: '50', period: '/mo', features: ['2 platforms', '8 posts/month', 'Basic analytics'] },
    { name: 'Growth', price: '120', period: '/mo', features: ['3 platforms', '20 posts/month', 'Ad management', 'Monthly report'], popular: true },
    { name: 'Premium', price: '250', period: '/mo', features: ['All platforms', 'Unlimited posts', 'Full ad management', 'Weekly reports'] },
  ],
}

export default function Pricing() {
  const [activeCategory, setActiveCategory] = useState('AI Subscriptions')
  const plans = PLANS[activeCategory] || []

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="hero-bg py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-white/20">
            <span className="material-symbols-outlined text-sm">sell</span>
            Pricing
          </span>
          <h1 className="font-heading font-bold text-white text-5xl">
            Professional Services at <span className="text-primary">Competitive Rates</span>
          </h1>
          <p className="text-primary-light/90 text-lg">Transparent pricing for all our services. No hidden fees.</p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="px-6 py-6 bg-white border-b border-border shadow-sm sticky top-16 z-40">
        <div className="max-w-screen-xl mx-auto flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow-btn'
                  : 'border border-border text-text-secondary hover:border-primary hover:text-primary bg-white'
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Plans */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <div key={plan.name} className={`relative flex flex-col rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? 'bg-primary text-white shadow-[0_8px_32px_rgba(0,170,255,0.35)] border-2 border-primary'
                  : 'bg-white border border-border shadow-card hover:shadow-card-hover'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-navy text-white px-4 py-1 rounded-full text-xs font-semibold tracking-widest uppercase">
                    Most Popular
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
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${plan.popular ? 'text-white/90' : 'text-text-secondary'}`}>
                      <span className={`material-symbols-outlined text-lg flex-shrink-0 ${plan.popular ? 'text-white' : 'text-primary'}`}>check_circle</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="https://wa.me/93700000000" target="_blank" rel="noopener noreferrer"
                  className={`w-full text-center py-2.5 rounded-lg text-sm font-semibold tracking-wide uppercase transition-all duration-200 ${
                    plan.popular ? 'bg-white text-primary hover:bg-primary-pale' : 'bg-primary text-white hover:bg-primary-dark shadow-btn'
                  }`}>
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Quote */}
      <section className="py-16 px-6 bg-primary-pale border-t border-border">
        <div className="max-w-screen-xl mx-auto text-center space-y-5">
          <h2 className="font-heading font-bold text-navy text-3xl">Need a Custom Quote?</h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">Have a unique project? Contact us and we'll provide a tailored quote just for you.</p>
          <a href="https://wa.me/93700000000" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-lg shadow-btn hover:bg-primary-dark transition-all duration-200">
            <span className="material-symbols-outlined text-base">chat</span>
            Request Custom Quote
          </a>
        </div>
      </section>
    </div>
  )
}
