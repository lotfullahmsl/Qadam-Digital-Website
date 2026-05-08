import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

const SMM_SERVICES = [
  { icon: 'thumb_up', title: 'Facebook Ads Management', desc: 'Targeted Facebook advertising campaigns to reach your ideal audience.' },
  { icon: 'photo_camera', title: 'Instagram Ads', desc: 'Visually compelling Instagram campaigns that drive engagement and sales.' },
  { icon: 'trending_up', title: 'Social Media Growth', desc: 'Organic growth strategies to build a genuine, engaged following.' },
  { icon: 'rocket_launch', title: 'Post Boosting', desc: 'Amplify your best content to reach a wider targeted audience.' },
  { icon: 'group', title: 'Audience Targeting', desc: 'Precision targeting based on demographics, interests, and behavior.' },
  { icon: 'campaign', title: 'Content Promotion', desc: 'Strategic promotion of your content across multiple platforms.' },
]

const PACKAGES = [
  {
    name: 'Starter',
    price: '50',
    period: '/mo',
    features: ['2 platforms', '8 posts/month', 'Basic analytics', 'WhatsApp support'],
  },
  {
    name: 'Growth',
    price: '120',
    period: '/mo',
    popular: true,
    features: ['3 platforms', '20 posts/month', 'Ad campaign management', 'Monthly report', 'Priority support'],
  },
  {
    name: 'Premium',
    price: '250',
    period: '/mo',
    features: ['All platforms', 'Unlimited posts', 'Full ad management', 'Weekly reports', 'Dedicated manager'],
  },
]

export default function SocialMediaMarketing() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-section pb-xl px-lg hero-bg">
        <div className="absolute top-0 left-0 w-[500px] h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase border border-primary/20 mb-5">
            <span className="material-symbols-outlined text-sm">campaign</span>
            Social Media Marketing
          </div>
          <h1 className="font-heading text-h1 text-on-surface mb-4">
            Amplify Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-fixed-dim">
              Digital Presence
            </span>
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-primary to-transparent rounded-full mb-6" />
          <p className="text-body-lg text-on-surface-variant max-w-2xl">
            Strategic social media marketing solutions to grow your brand, reach your target audience, and drive real business results.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-section px-lg max-w-screen-xl mx-auto w-full">
        <div className="text-center space-y-3 mb-12">
          <h2 className="font-heading text-h2 text-on-surface">Our SMM Services</h2>
          <p className="text-body-lg text-on-surface-variant">Everything you need to dominate social media.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {SMM_SERVICES.map((s) => (
            <div key={s.title} className="glass-panel rounded-xl p-6 flex flex-col gap-3 group hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-2xl">{s.icon}</span>
              </div>
              <h3 className="font-heading font-semibold text-on-surface">{s.title}</h3>
              <p className="text-sm text-on-surface-variant">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section className="py-section px-lg bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <h2 className="font-heading text-h2 text-on-surface">Marketing Packages</h2>
            <p className="text-body-lg text-on-surface-variant">Choose the package that fits your business goals.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter max-w-4xl mx-auto">
            {PACKAGES.map((pkg) => (
              <div key={pkg.name} className={`relative flex flex-col rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 ${pkg.popular ? 'premium-border bg-surface-container/30 backdrop-blur-xl' : 'glass-card'}`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase">
                    Most Popular
                  </div>
                )}
                <h3 className="font-heading font-semibold text-on-surface text-xl mb-2">{pkg.name}</h3>
                <div className="mb-5">
                  <span className="font-heading text-3xl font-bold text-primary">${pkg.price}</span>
                  <span className="text-sm text-on-surface-variant">{pkg.period}</span>
                </div>
                <ul className="space-y-2.5 mb-6 flex-grow">
                  {pkg.features.map((f) => (
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
                    pkg.popular
                      ? 'bg-primary text-on-primary btn-glow hover:bg-primary-fixed'
                      : 'border border-primary text-primary hover:bg-primary hover:text-on-primary'
                  }`}
                >
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section px-lg">
        <div className="max-w-screen-xl mx-auto glass-panel rounded-2xl p-xl text-center space-y-6">
          <h2 className="font-heading text-h2 text-on-surface">Ready to Grow Your Brand?</h2>
          <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto">
            Contact us today and let's create a social media strategy that delivers real results for your business.
          </p>
          <a
            href="https://wa.me/93700000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-on-primary font-semibold px-xl py-md rounded-lg glow-button transition-all duration-300"
          >
            <span className="material-symbols-outlined">chat</span>
            Start Your Campaign
          </a>
        </div>
      </section>
    </div>
  )
}
