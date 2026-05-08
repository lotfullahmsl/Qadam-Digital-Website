import React, { useState } from 'react'
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
  const [search, setSearch] = useState('')
  const [country, setCountry] = useState('All')
  const [degree, setDegree] = useState('All')

  const filtered = MOCK_SCHOLARSHIPS.filter((s) => {
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) || s.university.toLowerCase().includes(search.toLowerCase())
    const matchCountry = country === 'All' || s.country === country
    const matchDegree = degree === 'All' || s.degree.includes(degree)
    return matchSearch && matchCountry && matchDegree
  })

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="hero-bg py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-white/20">
            <span className="material-symbols-outlined text-sm">school</span>
            Scholarships
          </span>
          <h1 className="font-heading font-bold text-white text-5xl">Find Your <span className="text-primary">Dream Scholarship</span></h1>
          <p className="text-primary-light/90 text-lg">Browse 500+ fully funded and partial scholarships for BS, MS, and PhD programs worldwide.</p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 py-6 bg-white border-b border-border shadow-sm sticky top-16 z-40">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-xl">search</span>
            <input type="text" placeholder="Search scholarships..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10" />
          </div>
          <select value={country} onChange={(e) => setCountry(e.target.value)} className="input-field md:w-48">
            {COUNTRIES.map((c) => <option key={c} value={c}>{c === 'All' ? 'All Countries' : c}</option>)}
          </select>
          <select value={degree} onChange={(e) => setDegree(e.target.value)} className="input-field md:w-40">
            {DEGREES.map((d) => <option key={d} value={d}>{d === 'All' ? 'All Degrees' : d}</option>)}
          </select>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="px-6 pt-8 max-w-screen-xl mx-auto w-full">
        <AdBanner />
      </div>

      {/* Results */}
      <section className="py-8 px-6 max-w-screen-xl mx-auto w-full">
        <p className="text-sm text-text-muted mb-6">
          Showing <span className="text-primary font-semibold">{filtered.length}</span> scholarships
        </p>
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-text-muted">
            <span className="material-symbols-outlined text-5xl mb-4 block text-primary-light">search_off</span>
            <p>No scholarships found matching your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((s) => <ScholarshipCard key={s._id} scholarship={s} />)}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-primary-pale border-t border-border">
        <div className="max-w-screen-xl mx-auto text-center space-y-5">
          <h2 className="font-heading font-bold text-navy text-3xl">Need Help Applying?</h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">Our scholarship experts will guide you through the entire application process.</p>
          <a href="https://wa.me/93700000000" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-lg shadow-btn hover:bg-primary-dark transition-all duration-200">
            <span className="material-symbols-outlined text-base">chat</span>
            Apply With QADAM Digital
          </a>
        </div>
      </section>
    </div>
  )
}
