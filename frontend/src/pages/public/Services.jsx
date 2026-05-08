import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

const SERVICES = [
  {
    icon: 'school',
    title: 'Scholarship Guidance & Application',
    description: 'Comprehensive consultancy for securing prestigious international scholarships and academic placements. We guide you through every step of the application process.',
    to: ROUTES.SCHOLARSHIPS,
    features: ['Scholarship search & matching', 'Application support', 'Document preparation', 'Interview coaching'],
  },
  {
    icon: 'description',
    title: 'CV & Motivation Letter Writing',
    description: 'Professional, ATS-optimized curriculum vitae crafting tailored to highlight your unique academic and professional trajectory.',
    to: ROUTES.CV_TRANSLATION,
    features: ['Professional CV writing', 'Motivation letter writing', 'Statement of purpose', 'LinkedIn profile optimization'],
  },
  {
    icon: 'translate',
    title: 'Document Translation Services',
    description: 'Certified multilingual translation of critical academic documents, personal statements, and professional portfolios.',
    to: ROUTES.CV_TRANSLATION,
    features: ['English, Pashto, Dari', 'Academic documents', 'Legal documents', 'Certified translations'],
  },
  {
    icon: 'web',
    title: 'Website Development',
    description: 'Bespoke, high-performance web applications designed with modern frameworks to establish your digital presence.',
    to: ROUTES.WEBSITE_DATABASE,
    features: ['Business websites', 'E-commerce platforms', 'Portfolio websites', 'Custom web apps'],
  },
  {
    icon: 'database',
    title: 'Database Development',
    description: 'Secure, scalable, and optimized database architectures tailored to handle complex organizational data workflows.',
    to: ROUTES.WEBSITE_DATABASE,
    features: ['Clinic management systems', 'School management systems', 'Inventory databases', 'Custom solutions'],
  },
  {
    icon: 'smart_toy',
    title: 'Digital Subscription Guidance',
    description: 'Curated access to elite artificial intelligence platforms designed to accelerate research, writing, and productivity.',
    to: ROUTES.DIGITAL_TOOLS,
    features: ['ChatGPT Plus', 'Gemini Advanced', 'Coursera Plus', 'Canva Pro'],
  },
  {
    icon: 'campaign',
    title: 'Social Media Marketing',
    description: 'Strategic digital marketing solutions to amplify your brand\'s voice across global platforms.',
    to: ROUTES.SOCIAL_MEDIA,
    features: ['Facebook & Instagram ads', 'Content creation', 'Audience targeting', 'Campaign management'],
  },
  {
    icon: 'psychology',
    title: 'Educational & Digital Consulting',
    description: 'Expert guidance for students and businesses navigating the digital landscape and educational opportunities.',
    to: ROUTES.CONTACT,
    features: ['Career counseling', 'Digital strategy', 'Technology consulting', 'Business planning'],
  },
]

export default function Services() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-section pb-xl px-lg hero-bg">
        <div className="absolute top-0 left-0 w-[500px] h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase border border-primary/20 mb-5">
            <span className="material-symbols-outlined text-sm">build</span>
            Our Services
          </div>
          <h1 className="font-heading text-h1 text-on-surface mb-4">
            Next-Gen{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-fixed-dim">
              Digital Solutions
            </span>
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-primary to-transparent rounded-full mb-6" />
          <p className="text-body-lg text-on-surface-variant max-w-2xl">
            Elevate your educational journey and operational efficiency with our premium suite of technical and consultative services. Designed for excellence.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-section px-lg max-w-screen-xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="group relative bg-surface-container/30 backdrop-blur-xl border border-outline-variant/30 rounded-xl p-lg overflow-hidden transition-all duration-500 hover:border-primary/50 hover:bg-surface-container/50 flex flex-col"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col h-full gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors">
                  <span className="material-symbols-outlined text-primary text-2xl">{service.icon}</span>
                </div>
                <h3 className="font-heading font-semibold text-on-surface text-xl">{service.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed flex-grow">{service.description}</p>
                <ul className="space-y-1.5">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-on-surface-variant">
                      <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to={service.to}
                  className="inline-flex items-center gap-1 text-primary text-xs font-semibold tracking-widest uppercase group-hover:gap-2 transition-all mt-2"
                >
                  LEARN MORE
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-section px-lg bg-surface-container-low border-t border-outline-variant/30">
        <div className="max-w-screen-xl mx-auto glass-panel rounded-2xl p-xl text-center space-y-6">
          <h2 className="font-heading text-h2 text-on-surface">Not Sure Which Service You Need?</h2>
          <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto">
            Contact us on WhatsApp and our team will guide you to the right solution for your needs.
          </p>
          <a
            href="https://wa.me/93700000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-on-primary font-semibold px-xl py-md rounded-lg glow-button transition-all duration-300"
          >
            <span className="material-symbols-outlined">chat</span>
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
