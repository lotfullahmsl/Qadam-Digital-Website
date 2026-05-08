import React, { useState, useEffect } from 'react'
import ScholarshipCard from '../../components/cards/ScholarshipCard'
import AdBanner from '../../components/common/AdBanner'

const MOCK_SCHOLARSHIPS = [
  { _id: '1', title: 'DAAD Scholarship Germany', country: 'Germany', university: 'Various German Universities', degree: 'MS/PhD', deadline: 'Oct 2026', fundingType: 'Fully Funded' },
  { _id: '2', title: 'Chevening Scholarship UK', country: 'United Kingdom', university: 'UK Universities', degree: 'MS', deadline: 'Nov 2026', fundingType: 'Fully Funded' },
  { _id: '3', title: 'Erasmus Mundus', country: 'Europe', university: 'Multiple EU Universities', degree: 'MS', deadline: 'Jan 2027', fundingType: 'Fully Funded' },
  { _id: '4', title: 'Turkish Government Scholarship', country: 'Turkey', university: 'Turkish Universities', degree: 'BS/MS/PhD', deadline: 'Feb 2027', fundingType: 'Fully Funded' },
  { _id: '5', title: 'Chinese Government Scholarship', country: 'China', university: 'Chinese Universities', degree: 'BS/MS/PhD', deadline: 'Mar 2027', fundingType: 'Fully Funded' },
  { _id: '6', title: 'HEC Need Based Scholarship', country: 'Pakistan', university: 'Pakistani Universities', degree: 'BS', deadline: 'Dec 2026', fundingType: 'Partial' },
]

const COUNTRIES = ['All', 'Germany', 'United Kingdom', 'Europe', 'Turkey', 'China', 'Pakistan', 'USA', 'Australia']
const DEGREES = ['All', 'BS', 'MS', 'PhD']

export default function Scholarships() {
  const [scholarships, setScholarships] = useState(MOCK_SCHOLARSHIPS)
  const [search, setSearch] = useState('')
  const [country, setCountry] = useState('All')
  const [degree, setDegree] = useState('All')

  const filtered = scholarships.filter((s) => {
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) || s.university.toLowerCase().includes(search.toLowerCase())
    const matchCountry = country === 'All' || s.country === country
    const matchDegree = degree === 'All' || s.degree.includes(degree)
    return matchSearch && matchCountry && matchDegree
  })

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-section pb-xl px-lg hero-bg text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase border border-primary/20">
            <span className="material-symbols-outlined text-sm">school</span>
            Scholarships
          </div>
          <h1 className="font-heading text-h1 text-on-surface">
            Find Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">
              Dream Scholarship
            </span>
          </h1>
          <p className="text-body-lg text-on-surface-variant">
            Browse 500+ fully funded and partial scholarships for BS, MS, and PhD programs worldwide.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-lg py-8 bg-surface-container-low border-y border-outline-variant/30 sticky top-16 z-40">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-grow relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">search</span>
            <input
              type="text"
              placeholder="Search scholarships..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/30 rounded-lg pl-10 pr-4 py-2.5 text-sm text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          {/* Country Filter */}
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="bg-surface-container border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
          >
            {COUNTRIES.map((c) => <option key={c} value={c}>{c === 'All' ? 'All Countries' : c}</option>)}
          </select>
          {/* Degree Filter */}
          <select
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            className="bg-surface-container border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
          >
            {DEGREES.map((d) => <option key={d} value={d}>{d === 'All' ? 'All Degrees' : d}</option>)}
          </select>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="px-lg pt-8 max-w-screen-xl mx-auto w-full">
        <AdBanner />
      </div>

      {/* Results */}
      <section className="py-8 px-lg max-w-screen-xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-on-surface-variant">
            Showing <span className="text-primary font-semibold">{filtered.length}</span> scholarships
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl mb-4 block">search_off</span>
            <p>No scholarships found matching your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {filtered.map((s) => (
              <ScholarshipCard key={s._id} scholarship={s} />
            ))}
          </div>
        )}
      </section>

      {/* Apply CTA */}
      <section className="py-section px-lg bg-surface-container-low border-t border-outline-variant/30">
        <div className="max-w-screen-xl mx-auto glass-panel rounded-2xl p-xl text-center space-y-5">
          <h2 className="font-heading text-h2 text-on-surface">Need Help Applying?</h2>
          <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto">
            Our scholarship experts will guide you through the entire application process — from document preparation to submission.
          </p>
          <a
            href="https://wa.me/93700000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-on-primary font-semibold px-xl py-md rounded-lg glow-button transition-all duration-300"
          >
            <span className="material-symbols-outlined">chat</span>
            Apply With QADAM Digital
          </a>
        </div>
      </section>
    </div>
  )
}
