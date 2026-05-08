import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

const VALUES = [
  { icon: 'verified', title: 'Integrity', desc: 'We operate with full transparency and honesty in every service we provide.' },
  { icon: 'workspace_premium', title: 'Excellence', desc: 'We deliver premium quality that meets and exceeds international standards.' },
  { icon: 'diversity_3', title: 'Inclusivity', desc: 'We serve students and businesses from all backgrounds across Afghanistan and Pakistan.' },
  { icon: 'rocket_launch', title: 'Innovation', desc: 'We embrace cutting-edge technology to deliver modern, future-ready solutions.' },
]

export default function About() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="hero-bg py-24 px-6">
        <div className="max-w-screen-xl mx-auto text-center space-y-5">
          <span className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-white/20">
            <span className="material-symbols-outlined text-sm">info</span>
            About Us
          </span>
          <h1 className="font-heading font-bold text-white text-5xl">
            Who is <span className="text-primary">QADAM Digital?</span>
          </h1>
          <p className="text-primary-light/90 text-lg max-w-2xl mx-auto leading-relaxed">
            A professional digital services platform focused on education, scholarship support, web development, database solutions, and digital services.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: 'flag', title: 'Our Mission', text: 'To empower students and businesses in Afghanistan, Pakistan, and beyond by providing world-class educational consultancy and cutting-edge digital services — making global opportunities accessible to everyone.' },
            { icon: 'visibility', title: 'Our Vision', text: 'To become the most trusted digital services platform in the region — a bridge between local talent and global opportunities, powered by technology, expertise, and a deep commitment to excellence.' },
          ].map((item) => (
            <div key={item.title} className="card p-8 space-y-4">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
              </div>
              <h2 className="font-heading font-bold text-navy text-2xl">{item.title}</h2>
              <p className="text-text-muted leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-primary-pale">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <span className="badge mb-3">Our Values</span>
            <h2 className="font-heading font-bold text-navy text-4xl">Core Principles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="card p-6 flex flex-col gap-3 items-center text-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-2xl">{v.icon}</span>
                </div>
                <h3 className="font-heading font-semibold text-navy text-lg">{v.title}</h3>
                <p className="text-sm text-text-muted">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 bg-navy">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: 'school', label: 'Scholarships', count: '500+' },
              { icon: 'web', label: 'Websites Built', count: '1,000+' },
              { icon: 'description', label: 'CVs Written', count: '2,000+' },
              { icon: 'people', label: 'Students Helped', count: '5,000+' },
            ].map((item) => (
              <div key={item.label} className="text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mx-auto">
                  <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                </div>
                <div className="font-heading font-bold text-white text-3xl">{item.count}</div>
                <div className="text-primary-light/70 text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-screen-xl mx-auto">
          <div className="bg-primary rounded-2xl p-12 text-center space-y-6">
            <h2 className="font-heading font-bold text-white text-4xl">Ready to Work With Us?</h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto">Whether you're a student seeking scholarships or a business needing digital solutions, we're here to help.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={ROUTES.CONTACT} className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-8 py-3.5 rounded-lg hover:bg-primary-pale transition-all duration-200">
                Contact Us <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
              <a href="https://wa.me/93700000000" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-white/15 text-white font-semibold px-8 py-3.5 rounded-lg border border-white/30 hover:bg-white/25 transition-all duration-200">
                <span className="material-symbols-outlined text-base">chat</span> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
