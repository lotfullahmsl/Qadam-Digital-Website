import React from 'react'

export default function PricingCard({ plan }) {
  const { name, price, currency = '$', period = '/mo', features = [], popular, cta = 'Get Started', badge } = plan

  return (
    <div className={`relative flex flex-col rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 ${popular ? 'premium-border bg-surface-container/30 backdrop-blur-xl' : 'glass-card'}`}>
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase shadow-[0_0_10px_rgba(242,202,80,0.5)]">
          Most Popular
        </div>
      )}

      {badge && (
        <span className="self-end text-xs font-semibold tracking-widest uppercase text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded mb-3">
          {badge}
        </span>
      )}

      <h3 className="font-heading font-semibold text-on-surface text-xl mb-2">{name}</h3>
      <div className="mb-5">
        <span className="font-heading text-3xl font-bold text-primary">{currency}{price}</span>
        <span className="text-sm text-on-surface-variant">{period}</span>
      </div>

      <ul className="space-y-2.5 mb-6 flex-grow">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-primary text-lg flex-shrink-0">check</span>
            {feature}
          </li>
        ))}
      </ul>

      <button className={`w-full py-2.5 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
        popular
          ? 'bg-primary text-on-primary btn-glow hover:bg-primary-fixed'
          : 'border border-primary text-primary hover:bg-primary hover:text-on-primary'
      }`}>
        {cta}
      </button>
    </div>
  )
}
