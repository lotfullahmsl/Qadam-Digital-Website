import React, { useState } from 'react'
import PortfolioCard from '../../components/cards/PortfolioCard'

const CATEGORIES = ['All', 'Website', 'Database', 'Marketing', 'Design']

const MOCK_PROJECTS = [
  { _id: '1', title: 'Clinic Management System', description: 'A full-featured clinic management system with patient records, appointments, and billing.', category: 'Database', technologies: ['React', 'Flask', 'MongoDB'] },
  { _id: '2', title: 'School Management Platform', description: 'Comprehensive school management system for student records, grades, and parent communication.', category: 'Database', technologies: ['React', 'Node.js', 'PostgreSQL'] },
  { _id: '3', title: 'E-Commerce Website', description: 'Modern e-commerce platform with product management, cart, and payment integration.', category: 'Website', technologies: ['React', 'Tailwind', 'Stripe'] },
  { _id: '4', title: 'Corporate Business Website', description: 'Professional corporate website with CMS, blog, and contact management.', category: 'Website', technologies: ['React', 'Flask', 'MongoDB'] },
  { _id: '5', title: 'Social Media Campaign', description: 'Successful Facebook and Instagram campaign that grew brand followers by 300%.', category: 'Marketing', technologies: ['Facebook Ads', 'Instagram', 'Analytics'] },
  { _id: '6', title: 'Restaurant Inventory System', description: 'Inventory management system for a restaurant chain with real-time stock tracking.', category: 'Database', technologies: ['React', 'Flask', 'MongoDB'] },
]

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? MOCK_PROJECTS
    : MOCK_PROJECTS.filter((p) => p.category === activeCategory)

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-section pb-xl px-lg hero-bg text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase border border-primary/20">
            <span className="material-symbols-outlined text-sm">work</span>
            Portfolio
          </div>
          <h1 className="font-heading text-h1 text-on-surface">
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">
              Work & Projects
            </span>
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            A showcase of our best work — from enterprise database systems to stunning websites and successful marketing campaigns.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-lg py-8 bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-screen-xl mx-auto flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-primary text-on-primary btn-glow'
                  : 'border border-outline-variant/30 text-on-surface-variant hover:border-primary hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-section px-lg max-w-screen-xl mx-auto w-full">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl mb-4 block">search_off</span>
            <p>No projects found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {filtered.map((project) => (
              <PortfolioCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="py-section px-lg bg-surface-container-low border-t border-outline-variant/30">
        <div className="max-w-screen-xl mx-auto glass-panel rounded-2xl p-xl text-center space-y-6">
          <h2 className="font-heading text-h2 text-on-surface">Want a Similar Project?</h2>
          <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto">
            Let's discuss your project requirements and build something amazing together.
          </p>
          <a
            href="https://wa.me/93700000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-on-primary font-semibold px-xl py-md rounded-lg glow-button transition-all duration-300"
          >
            <span className="material-symbols-outlined">chat</span>
            Start Your Project
          </a>
        </div>
      </section>
    </div>
  )
}
