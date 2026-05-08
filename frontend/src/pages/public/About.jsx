import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

const VALUES = [
  { icon: 'verified', title: 'Integrity', desc: 'We operate with full transparency and honesty in every service we provide.' },
  { icon: 'workspace_premium', title: 'Excellence', desc: 'We deliver premium quality that meets and exceeds international standards.' },
  { icon: 'diversity_3', title: 'Inclusivity', desc: 'We serve students and businesses from all backgrounds across Afghanistan and Pakistan.' },
  { icon: 'rocket_launch', title: 'Innovation', desc: 'We embrace cutting-edge technology to deliver modern, future-ready solutions.' },
]

const TEAM = [
  { name: 'QADAM Team', role: 'Education Consultants', icon: 'school' },
  { name: 'Tech Division', role: 'Web & Database Developers', icon: 'code' },
  { name: 'Marketing Team', role: 'Social Media & Digital Marketing', icon: 'campaign' },
  { name: 'Support Team', role: '24/7 Client Support', icon: 'support_agent' },
]

export default function About() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-section pb-xl px-lg hero-bg text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase border border-primary/20">
            <span className="material-symbols-outlined text-sm">info</span>
            About Us
          </div>
          <h1 className="font-heading text-h1 text-on-surface">
            Who is{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">
              QADAM Digital?
            </span>
          </h1>
          <p className="text-body-lg text-on-surface-variant">
            QADAM Digital is a professional digital services platform focused on education, scholarship support, document services, website development, database solutions, digital subscription guidance, social media marketing, and consulting services.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-section px-lg max-w-screen-xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          <div className="glass-panel rounded-xl p-xl space-y-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <span className="material-symbols-outlined text-2xl">flag</span>
            </div>
            <h2 className="font-heading text-2xl font-semibold text-on-surface">Our Mission</h2>
            <p className="text-on-surface-variant leading-relaxed">
              To empower students and businesses in Afghanistan, Pakistan, and beyond by providing world-class educational consultancy and cutting-edge digital services — making global opportunities accessible to everyone.
            </p>
          </div>
          <div className="glass-panel rounded-xl p-xl space-y-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <span className="material-symbols-outlined text-2xl">visibility</span>
            </div>
            <h2 className="font-heading text-2xl font-semibold text-on-surface">Our Vision</h2>
            <p className="text-on-surface-variant leading-relaxed">
              To become the most trusted digital services platform in the region — a bridge between local talent and global opportunities, powered by technology, expertise, and a deep commitment to excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-section px-lg bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <h2 className="font-heading text-h2 text-on-surface">Our Core Values</h2>
            <p className="text-body-lg text-on-surface-variant">The principles that guide everything we do.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {VALUES.map((v) => (
              <div key={v.title} className="glass-panel rounded-xl p-6 flex flex-col gap-3 text-center items-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <span className="material-symbols-outlined text-2xl">{v.icon}</span>
                </div>
                <h3 className="font-heading font-semibold text-on-surface text-lg">{v.title}</h3>
                <p className="text-sm text-on-surface-variant">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-section px-lg max-w-screen-xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase border border-primary/20">
              <span className="material-symbols-outlined text-sm">business_center</span>
              What We Do
            </div>
            <h2 className="font-heading text-h2 text-on-surface">Education Meets Digital Innovation</h2>
            <p className="text-on-surface-variant leading-relaxed">
              QADAM Digital bridges the gap between education and technology. We help students find and apply for scholarships, write professional CVs and motivation letters, translate documents, and access premium digital tools.
            </p>
            <p className="text-on-surface-variant leading-relaxed">
              For businesses, we build modern websites, develop powerful database systems, manage social media campaigns, and provide strategic digital consulting — all under one roof.
            </p>
            <Link
              to={ROUTES.SERVICES}
              className="inline-flex items-center gap-2 bg-primary text-on-primary font-semibold px-6 py-3 rounded-lg glow-button transition-all duration-300"
            >
              Explore Our Services
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: 'school', label: 'Scholarship Guidance', count: '500+' },
              { icon: 'web', label: 'Websites Built', count: '1000+' },
              { icon: 'description', label: 'CVs Written', count: '2000+' },
              { icon: 'translate', label: 'Documents Translated', count: '500+' },
            ].map((item) => (
              <div key={item.label} className="glass-panel rounded-xl p-5 flex flex-col gap-2 items-center text-center">
                <span className="material-symbols-outlined text-primary text-3xl">{item.icon}</span>
                <span className="font-heading text-2xl font-bold text-primary">{item.count}</span>
                <span className="text-xs text-on-surface-variant">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-section px-lg bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <h2 className="font-heading text-h2 text-on-surface">Our Team</h2>
            <p className="text-body-lg text-on-surface-variant">Dedicated professionals committed to your success.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {TEAM.map((member) => (
              <div key={member.name} className="glass-panel rounded-xl p-6 flex flex-col gap-3 items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <span className="material-symbols-outlined text-3xl">{member.icon}</span>
                </div>
                <h3 className="font-heading font-semibold text-on-surface">{member.name}</h3>
                <p className="text-sm text-on-surface-variant">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section px-lg">
        <div className="max-w-screen-xl mx-auto glass-panel rounded-2xl p-xl text-center space-y-6">
          <h2 className="font-heading text-h2 text-on-surface">Ready to Work With Us?</h2>
          <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto">
            Whether you're a student seeking scholarships or a business needing digital solutions, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={ROUTES.CONTACT} className="bg-primary text-on-primary font-semibold px-xl py-md rounded-lg glow-button transition-all duration-300 flex items-center justify-center gap-2">
              Contact Us
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <a href="https://wa.me/93700000000" target="_blank" rel="noopener noreferrer" className="glass-panel text-primary font-semibold px-xl py-md rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">chat</span>
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
