import React from 'react'

export default function PricingCard({ plan }) {
  const { name, price, currency = '$', period = '', features = [], popular, cta = 'Get Started', badge } = plan

  return (
    <div className={`relative flex flex-col rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 ${
      popular
        ? 'bg-primary text-white shadow-[0_8px_32px_rgba(0,170,255,0.35)] border-2 border-primary'
        : 'bg-white border border-border shadow-card hover:shadow-card-hover'
    }`}>
      {popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-navy text-white px-4 py-1 rounded-full text-xs font-semibold tracking-widest uppercase shadow-lg">
          Most Popular
        </div>
      )}

      {badge && (
        <span className={`self-end text-xs font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full mb-3 ${
          popular ? 'bg-white/20 text-white' : 'bg-primary-pale text-primary-dark'
        }`}>
          {badge}
        </span>
      )}

      <h3 className={`font-heading font-semibold text-xl mb-2 ${popular ? 'text-white' : 'text-navy'}`}>{name}</h3>
      <div className="mb-5">
        <span className={`font-heading text-3xl font-bold ${popular ? 'text-white' : 'text-primary'}`}>{currency}{price}</span>
        <span className={`text-sm ${popular ? 'text-white/70' : 'text-text-muted'}`}>{period}</span>
      </div>

      <ul className="space-y-2.5 mb-6 flex-grow">
        {features.map((feature, i) => (
          <li key={i} className={`flex items-start gap-2 text-sm ${popular ? 'text-white/90' : 'text-text-secondary'}`}>
            <span className={`material-symbols-outlined text-lg flex-shrink-0 ${popular ? 'text-white' : 'text-primary'}`}>check_circle</span>
            {feature}
          </li>
        ))}
      </ul>

      <button className={`w-full py-2.5 rounded-lg text-sm font-semibold tracking-wide uppercase transition-all duration-200 ${
        popular
          ? 'bg-white text-primary hover:bg-primary-pale'
          : 'bg-primary text-white hover:bg-primary-dark shadow-btn'
      }`}>
        {cta}
      </button>
    </div>
  )
}
