import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import PricingCard from '../../components/cards/PricingCard'

const SUBSCRIPTIONS = [
  {
    name: 'ChatGPT Plus',
    price: '10',
    badge: 'Shared',
    features: ['GPT-4 Access', 'DALL-E Image Generation', 'Advanced Data Analysis', 'Plugin Support'],
    icon: 'smart_toy',
  },
  {
    name: 'Gemini Advanced',
    price: '12',
    badge: 'Shared',
    features: ['Gemini 1.5 Pro', 'Google Workspace Integration', '2TB Cloud Storage', 'Priority Access'],
    icon: 'psychology',
  },
  {
    name: 'Coursera Plus',
    price: '45',
    badge: 'Dedicated',
    popular: true,
    features: ['Unlimited Courses', 'Professional Certificates', 'Guided Projects', 'Offline Access'],
    icon: 'school',
  },
  {
    name: 'Canva Pro',
    price: '8',
    badge: 'Team',
    features: ['Premium Templates', 'Brand Kit', 'Magic Studio AI', 'Background Remover'],
    icon: 'palette',
  },
  {
    name: 'Udemy Courses',
    price: '15',
    badge: 'Per Course',
    features: ['Lifetime Access', 'Certificate of Completion', 'Mobile Access', 'Downloadable Resources'],
    icon: 'play_circle',
  },
]

export default function DigitalToolsSubscriptions() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-section pb-xl px-lg hero-bg text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase border border-primary/20">
            <span className="material-symbols-outlined text-sm">smart_toy</span>
            Digital Tools
          </div>
          <h1 className="font-heading text-h1 text-on-surface">
            AI Tools &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">
              Subscriptions
            </span>
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Access premium AI tools and educational platforms at affordable prices. We handle the subscription process so you can focus on learning.
          </p>
        </div>
      </section>

      {/* Subscription Cards */}
      <section className="py-section px-lg max-w-screen-xl mx-auto w-full">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="font-heading text-h2 text-on-surface mb-2">AI Tool Subscriptions</h2>
            <p className="text-on-surface-variant">Shared and dedicated access to industry-leading platforms.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-gutter">
          {SUBSCRIPTIONS.map((sub) => (
            <div key={sub.name} className={`relative flex flex-col rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 ${sub.popular ? 'premium-border bg-surface-container/30 backdrop-blur-xl' : 'glass-card'}`}>
              {sub.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase shadow-[0_0_10px_rgba(242,202,80,0.5)]">
                  Most Popular
                </div>
              )}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center border border-outline-variant/30">
                  <span className="material-symbols-outlined text-primary text-2xl">{sub.icon}</span>
                </div>
                {sub.badge && (
                  <span className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded">
                    {sub.badge}
                  </span>
                )}
              </div>
              <h3 className="font-heading font-semibold text-on-surface text-xl mb-1">{sub.name}</h3>
              <div className="mb-4">
                <span className="font-heading text-2xl font-bold text-primary">${sub.price}</span>
                <span className="text-sm text-on-surface-variant">/mo</span>
              </div>
              <ul className="space-y-2 mb-5 flex-grow">
                {sub.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary text-base">check</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://wa.me/93700000000"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full text-center py-2 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
                  sub.popular
                    ? 'bg-primary text-on-primary btn-glow hover:bg-primary-fixed'
                    : 'border border-primary text-primary hover:bg-primary hover:text-on-primary'
                }`}
              >
                Request Subscription
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-section px-lg bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <h2 className="font-heading text-h2 text-on-surface">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
            {[
              { step: '01', icon: 'chat', title: 'Contact Us', desc: 'Message us on WhatsApp with your subscription request.' },
              { step: '02', icon: 'payments', title: 'Make Payment', desc: 'Pay securely through our supported payment methods.' },
              { step: '03', icon: 'key', title: 'Get Access', desc: 'Receive your subscription credentials within 24 hours.' },
              { step: '04', icon: 'support_agent', title: 'Ongoing Support', desc: 'We provide support throughout your subscription period.' },
            ].map((item) => (
              <div key={item.step} className="glass-panel rounded-xl p-6 flex flex-col gap-3 items-center text-center">
                <span className="text-4xl font-heading font-bold text-primary/30">{item.step}</span>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                </div>
                <h3 className="font-heading font-semibold text-on-surface">{item.title}</h3>
                <p className="text-sm text-on-surface-variant">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-section px-lg max-w-screen-xl mx-auto w-full">
        <div className="glass-panel rounded-xl p-8 space-y-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-2xl">info</span>
            <h2 className="font-heading text-xl font-semibold text-on-surface">Important Terms & Notes</h2>
          </div>
          <ul className="space-y-2 text-sm text-on-surface-variant">
            <li className="flex items-start gap-2"><span className="material-symbols-outlined text-primary text-base mt-0.5">arrow_right</span>Shared subscriptions are managed accounts — you get access without owning the account.</li>
            <li className="flex items-start gap-2"><span className="material-symbols-outlined text-primary text-base mt-0.5">arrow_right</span>Dedicated subscriptions are individual accounts registered in your name.</li>
            <li className="flex items-start gap-2"><span className="material-symbols-outlined text-primary text-base mt-0.5">arrow_right</span>Prices may vary based on current platform pricing and availability.</li>
            <li className="flex items-start gap-2"><span className="material-symbols-outlined text-primary text-base mt-0.5">arrow_right</span>We do not guarantee uninterrupted access as platform policies may change.</li>
            <li className="flex items-start gap-2"><span className="material-symbols-outlined text-primary text-base mt-0.5">arrow_right</span>Contact us for the latest pricing and availability before making payment.</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
