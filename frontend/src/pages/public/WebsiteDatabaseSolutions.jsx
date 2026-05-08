import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

const WEB_SERVICES = [
  { icon: 'business', title: 'Business Websites', desc: 'Professional corporate websites that establish your brand online.' },
  { icon: 'shopping_cart', title: 'E-Commerce Platforms', desc: 'Full-featured online stores with payment integration.' },
  { icon: 'person', title: 'Portfolio Websites', desc: 'Elegant personal portfolios to showcase your work.' },
  { icon: 'school', title: 'Educational Platforms', desc: 'Learning management systems and educational portals.' },
]

const DB_SERVICES = [
  { icon: 'local_hospital', title: 'Clinic Management System', desc: 'Patient records, appointments, billing, and prescriptions.' },
  { icon: 'account_balance', title: 'School Management System', desc: 'Student records, grades, attendance, and parent portals.' },
  { icon: 'inventory', title: 'Inventory & Shop Database', desc: 'Stock management, sales tracking, and reporting.' },
  { icon: 'database', title: 'Custom Database Solutions', desc: 'Tailored database architecture for any business need.' },
]

export default function WebsiteDatabaseSolutions() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-section pb-xl px-lg hero-bg">
        <div className="absolute top-0 left-0 w-[500px] h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase border border-primary/20 mb-5">
            <span className="material-symbols-outlined text-sm">code</span>
            Digital Solutions
          </div>
          <h1 className="font-heading text-h1 text-on-surface mb-4">
            Website &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-fixed-dim">
              Database Solutions
            </span>
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-primary to-transparent rounded-full mb-6" />
          <p className="text-body-lg text-on-surface-variant max-w-2xl">
            From stunning business websites to powerful database management systems — we build digital infrastructure that scales with your ambitions.
          </p>
        </div>
      </section>

      {/* Web Development */}
      <section className="py-section px-lg max-w-screen-xl mx-auto w-full">
        <div className="space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase border border-primary/20">
            <span className="material-symbols-outlined text-sm">web</span>
            Web Development
          </div>
          <h2 className="font-heading text-h2 text-on-surface">Professional Website Development</h2>
          <p className="text-on-surface-variant max-w-2xl">Bespoke, high-performance web applications designed with modern frameworks.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {WEB_SERVICES.map((s) => (
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

      {/* Database Development */}
      <section className="py-section px-lg bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-screen-xl mx-auto">
          <div className="space-y-3 mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase border border-primary/20">
              <span className="material-symbols-outlined text-sm">database</span>
              Database Development
            </div>
            <h2 className="font-heading text-h2 text-on-surface">Enterprise Database Systems</h2>
            <p className="text-on-surface-variant max-w-2xl">Secure, scalable database architectures for clinics, schools, shops, and more.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {DB_SERVICES.map((s) => (
              <div key={s.title} className="glass-panel rounded-xl p-6 flex flex-col gap-3 group hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:bg-primary/20 transition-colors">
                  <span className="material-symbols-outlined text-2xl">{s.icon}</span>
                </div>
                <h3 className="font-heading font-semibold text-on-surface">{s.title}</h3>
                <p className="text-sm text-on-surface-variant">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Mockups */}
      <section className="py-section px-lg max-w-screen-xl mx-auto w-full">
        <div className="text-center space-y-3 mb-12">
          <h2 className="font-heading text-h2 text-on-surface">Enterprise Infrastructure</h2>
          <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Proprietary management systems engineered for educational institutions and healthcare facilities.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl">
          {[
            { icon: 'local_hospital', title: 'Clinic Management System', desc: 'Streamline patient records, appointment scheduling, and billing with our secure, compliant, and elegantly designed healthcare management platform.' },
            { icon: 'account_balance', title: 'School Management System', desc: 'An integrated ecosystem for educational institutions managing admissions, academic performance tracking, and parent-teacher communications.' },
          ].map((item) => (
            <div key={item.title} className="bg-surface-container-low border border-outline-variant/30 rounded-2xl overflow-hidden shadow-2xl group">
              <div className="h-64 bg-surface-container-high flex items-center justify-center border-b border-outline-variant/30">
                <span className="material-symbols-outlined text-8xl text-primary/20 group-hover:text-primary/40 transition-colors duration-500">{item.icon}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-primary">{item.icon}</span>
                  <h3 className="font-heading font-semibold text-on-surface text-lg">{item.title}</h3>
                </div>
                <p className="text-sm text-on-surface-variant">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Request Form CTA */}
      <section className="py-section px-lg bg-surface-container-low border-t border-outline-variant/30">
        <div className="max-w-screen-xl mx-auto glass-panel rounded-2xl p-xl text-center space-y-6">
          <h2 className="font-heading text-h2 text-on-surface">Ready to Build Your Project?</h2>
          <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto">
            Tell us about your project and we'll provide a free consultation and quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/93700000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-on-primary font-semibold px-xl py-md rounded-lg glow-button transition-all duration-300"
            >
              <span className="material-symbols-outlined">chat</span>
              Discuss Your Project
            </a>
            <Link
              to={ROUTES.PRICING}
              className="inline-flex items-center gap-2 glass-panel text-primary font-semibold px-xl py-md rounded-lg transition-all duration-300"
            >
              View Pricing
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
