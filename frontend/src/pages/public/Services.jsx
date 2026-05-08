import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

const SERVICES = [
  { icon: 'school', title: 'Scholarship Guidance & Application', description: 'Comprehensive consultancy for securing prestigious international scholarships.', to: ROUTES.SCHOLARSHIPS, features: ['Scholarship search & matching', 'Application support', 'Document preparation', 'Interview coaching'] },
  { icon: 'description', title: 'CV & Motivation Letter Writing', description: 'Professional, ATS-optimized CVs tailored to highlight your unique trajectory.', to: ROUTES.CV_TRANSLATION, features: ['Professional CV writing', 'Motivation letter writing', 'Statement of purpose', 'LinkedIn optimization'] },
  { icon: 'translate', title: 'Document Translation Services', description: 'Certified multilingual translation of academic and professional documents.', to: ROUTES.CV_TRANSLATION, features: ['English, Pashto, Dari', 'Academic documents', 'Legal documents', 'Certified translations'] },
  { icon: 'web', title: 'Website Development', description: 'Bespoke, high-performance web applications for your digital presence.', to: ROUTES.WEBSITE_DATABASE, features: ['Business websites', 'E-commerce platforms', 'Portfolio websites', 'Custom web apps'] },
  { icon: 'database', title: 'Database Development', description: 'Secure, scalable database architectures for complex organizational needs.', to: ROUTES.WEBSITE_DATABASE, features: ['Clinic management systems', 'School management systems', 'Inventory databases', 'Custom solutions'] },
  { icon: 'smart_toy', title: 'Digital Subscription Guidance', description: 'Access to elite AI platforms to accelerate research and productivity.', to: ROUTES.DIGITAL_TOOLS, features: ['ChatGPT Plus', 'Gemini Advanced', 'Coursera Plus', 'Canva Pro'] },
  { icon: 'campaign', title: 'Social Media Marketing', description: 'Strategic digital marketing to amplify your brand across global platforms.', to: ROUTES.SOCIAL_MEDIA, features: ['Facebook & Instagram ads', 'Content creation', 'Audience targeting', 'Campaign management'] },
  { icon: 'psychology', title: 'Educational & Digital Consulting', description: 'Expert guidance for students and businesses navigating the digital landscape.', to: ROUTES.CONTACT, features: ['Career counseling', 'Digital strategy', 'Technology consulting', 'Business planning'] },
]

export default function Services() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="hero-bg py-24 px-6">
        <div className="max-w-screen-xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-white/20 mb-5">
            <span className="material-symbols-outlined text-sm">build</span>
            Our Services
          </span>
          <h1 className="font-heading font-bold text-white text-5xl mb-4 max-w-2xl">
            Next-Gen <span className="text-primary">Digital Solutions</span>
          </h1>
          <div className="h-1 w-24 bg-primary rounded-full mb-6" />
          <p className="text-primary-light/90 text-lg max-w-2xl leading-relaxed">
            Elevate your educational journey and operational efficiency with our premium suite of technical and consultative services.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <div key={service.title} className="card p-6 flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-2xl">{service.icon}</span>
              </div>
              <h3 className="font-heading font-semibold text-navy text-lg">{service.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed flex-grow">{service.description}</p>
              <ul className="space-y-1.5">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-text-secondary">
                    <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to={service.to} className="text-primary text-xs font-semibold tracking-widest uppercase flex items-center gap-1 hover:gap-2 transition-all duration-200 mt-1">
                LEARN MORE <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-primary">
        <div className="max-w-screen-xl mx-auto text-center space-y-5">
          <h2 className="font-heading font-bold text-white text-3xl">Not Sure Which Service You Need?</h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto">Contact us on WhatsApp and our team will guide you to the right solution.</p>
          <a href="https://wa.me/93700000000" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-3.5 rounded-lg hover:bg-primary-pale transition-all duration-200 shadow-lg">
            <span className="material-symbols-outlined text-base">chat</span>
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
