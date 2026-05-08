import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

const CV_SERVICES = [
  { icon: 'description', title: 'Professional CV Writing', desc: 'ATS-optimized CVs tailored for international universities and employers.' },
  { icon: 'work', title: 'Resume Writing', desc: 'Modern, clean resumes that stand out in competitive job markets.' },
  { icon: 'edit_note', title: 'Motivation Letter', desc: 'Compelling motivation letters that tell your unique story.' },
  { icon: 'psychology', title: 'Statement of Purpose', desc: 'Powerful SOP writing for graduate school applications.' },
]

const TRANSLATION_SERVICES = [
  { icon: 'translate', title: 'Academic Documents', desc: 'Transcripts, degrees, and certificates translated accurately.' },
  { icon: 'gavel', title: 'Legal Documents', desc: 'Certified translation of legal and official documents.' },
  { icon: 'article', title: 'Personal Statements', desc: 'Translation of personal statements and essays.' },
  { icon: 'language', title: 'Multilingual Support', desc: 'English, Pashto, Dari, and other languages supported.' },
]

export default function CvTranslationServices() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-section pb-xl px-lg hero-bg">
        <div className="absolute top-0 left-0 w-[500px] h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase border border-primary/20 mb-5">
            <span className="material-symbols-outlined text-sm">description</span>
            CV & Translation
          </div>
          <h1 className="font-heading text-h1 text-on-surface mb-4">
            CV Writing &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-fixed-dim">
              Translation Services
            </span>
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-primary to-transparent rounded-full mb-6" />
          <p className="text-body-lg text-on-surface-variant max-w-2xl">
            Professional CV writing, motivation letters, and certified document translation services to help you stand out globally.
          </p>
        </div>
      </section>

      {/* CV Services */}
      <section className="py-section px-lg max-w-screen-xl mx-auto w-full">
        <div className="space-y-3 mb-12">
          <h2 className="font-heading text-h2 text-on-surface">CV & Document Writing</h2>
          <p className="text-on-surface-variant">Professional writing services for academic and professional success.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {CV_SERVICES.map((s) => (
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

      {/* Translation Services */}
      <section className="py-section px-lg bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-screen-xl mx-auto">
          <div className="space-y-3 mb-12">
            <h2 className="font-heading text-h2 text-on-surface">Translation Services</h2>
            <p className="text-on-surface-variant">Certified multilingual translation for all your important documents.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {TRANSLATION_SERVICES.map((s) => (
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

      {/* Process */}
      <section className="py-section px-lg max-w-screen-xl mx-auto w-full">
        <div className="text-center space-y-3 mb-12">
          <h2 className="font-heading text-h2 text-on-surface">How It Works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
          {[
            { step: '01', icon: 'chat', title: 'Contact Us', desc: 'Reach out via WhatsApp or our contact form.' },
            { step: '02', icon: 'upload_file', title: 'Share Documents', desc: 'Upload your existing documents and requirements.' },
            { step: '03', icon: 'edit', title: 'We Create', desc: 'Our experts craft your CV or translate your documents.' },
            { step: '04', icon: 'check_circle', title: 'Delivery', desc: 'Receive your polished documents within the agreed timeline.' },
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
      </section>

      {/* CTA */}
      <section className="py-section px-lg bg-surface-container-low border-t border-outline-variant/30">
        <div className="max-w-screen-xl mx-auto glass-panel rounded-2xl p-xl text-center space-y-6">
          <h2 className="font-heading text-h2 text-on-surface">Ready to Get Started?</h2>
          <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto">
            Contact us today and let our experts craft the perfect CV or translate your documents professionally.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/93700000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-on-primary font-semibold px-xl py-md rounded-lg glow-button transition-all duration-300"
            >
              <span className="material-symbols-outlined">chat</span>
              Request Service on WhatsApp
            </a>
            <Link to={ROUTES.PRICING} className="inline-flex items-center gap-2 glass-panel text-primary font-semibold px-xl py-md rounded-lg transition-all duration-300">
              View Pricing
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
