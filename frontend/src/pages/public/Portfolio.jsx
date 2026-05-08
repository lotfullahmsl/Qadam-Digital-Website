import React, { useState } from 'react'
import PortfolioCard from '../../components/cards/PortfolioCard'

const CATEGORIES = ['All', 'Website', 'Database', 'Marketing', 'Design']
const MOCK_PROJECTS = [
  { _id: '1', title: 'Clinic Management System', description: 'Full-featured clinic management with patient records, appointments, and billing.', category: 'Database', technologies: ['React', 'Flask', 'MongoDB'] },
  { _id: '2', title: 'School Management Platform', description: 'Comprehensive school management for student records, grades, and parent communication.', category: 'Database', technologies: ['React', 'Node.js', 'PostgreSQL'] },
  { _id: '3', title: 'E-Commerce Website', description: 'Modern e-commerce platform with product management, cart, and payment integration.', category: 'Website', technologies: ['React', 'Tailwind', 'Stripe'] },
  { _id: '4', title: 'Corporate Business Website', description: 'Professional corporate website with CMS, blog, and contact management.', category: 'Website', technologies: ['React', 'Flask', 'MongoDB'] },
  { _id: '5', title: 'Social Media Campaign', description: 'Facebook and Instagram campaign that grew brand followers by 300%.', category: 'Marketing', technologies: ['Facebook Ads', 'Instagram', 'Analytics'] },
  { _id: '6', title: 'Restaurant Inventory System', description: 'Inventory management for a restaurant chain with real-time stock tracking.', category: 'Database', technologies: ['React', 'Flask', 'MongoDB'] },
]

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All')
  const filtered = activeCategory === 'All' ? MOCK_PROJECTS : MOCK_PROJECTS.filter((p) => p.category === activeCategory)

  return (
    <div className="flex flex-col">
      <section className="hero-bg py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-white/20">
            <span className="material-symbols-outlined text-sm">work</span>
            Portfolio
          </span>
          <h1 className="font-heading font-bold text-white text-5xl">Our <span className="text-primary">Work & Projects</span></h1>
          <p className="text-primary-light/90 text-lg">A showcase of our best work — from enterprise systems to stunning websites.</p>
        </div>
      </section>

      <section className="px-6 py-6 bg-white border-b border-border shadow-sm">
        <div className="max-w-screen-xl mx-auto flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
                activeCategory === cat ? 'bg-primary text-white shadow-btn' : 'border border-border text-text-secondary hover:border-primary hover:text-primary bg-white'
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 bg-background">
        <div className="max-w-screen-xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-text-muted">
              <span className="material-symbols-outlined text-5xl mb-4 block text-primary-light">search_off</span>
              <p>No projects found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project) => <PortfolioCard key={project._id} project={project} />)}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-6 bg-primary">
        <div className="max-w-screen-xl mx-auto text-center space-y-5">
          <h2 className="font-heading font-bold text-white text-3xl">Want a Similar Project?</h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto">Let's discuss your requirements and build something amazing together.</p>
          <a href="https://wa.me/93700000000" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-3.5 rounded-lg hover:bg-primary-pale transition-all duration-200 shadow-lg">
            <span className="material-symbols-outlined text-base">chat</span>
            Start Your Project
          </a>
        </div>
      </section>
    </div>
  )
}
