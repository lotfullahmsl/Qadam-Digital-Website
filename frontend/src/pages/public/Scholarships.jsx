import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ScholarshipCard from '../../components/cards/ScholarshipCard'
import AdBanner from '../../components/common/AdBanner'
import { scholarshipService } from '../../services/scholarshipService'

const COUNTRIES = ['All', 'Germany', 'United Kingdom', 'Europe', 'Turkey', 'China', 'Pakistan', 'USA', 'Australia']
const DEGREES = ['All', 'BS', 'MS', 'PhD']

export default function Scholarships() {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [country, setCountry] = useState('All')
  const [degree, setDegree] = useState('All')
  const [scholarships, setScholarships] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadScholarships() {
      setLoading(true)
      setError('')
      try {
        const params = {
          search,
          country: country === 'All' ? '' : country,
          degree: degree === 'All' ? '' : degree,
          limit: 50,
        }
        const { data } = await scholarshipService.getAll(params)
        if (!ignore) setScholarships(data.items || [])
      } catch (err) {
        if (!ignore) setError(err.response?.data?.message || 'Unable to load scholarships.')
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    loadScholarships()
    return () => { ignore = true }
  }, [search, country, degree])

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="hero-bg py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-white/20">
            <span className="material-symbols-outlined text-sm">school</span>
            {t('nav.scholarships')}
          </span>
          <h1 className="font-heading font-bold text-white text-5xl">{t('scholarships.title')}</h1>
          <p className="text-primary-light/90 text-lg">{t('scholarships.subtitle')}</p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 py-6 bg-white border-b border-border shadow-sm sticky top-16 z-40">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-xl">search</span>
            <input type="text" placeholder={t('scholarships.search_placeholder')} value={search} onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10" />
          </div>
          <select value={country} onChange={(e) => setCountry(e.target.value)} className="input-field md:w-48">
            <option value="All">{t('scholarships.all_countries')}</option>
            {COUNTRIES.filter(c => c !== 'All').map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={degree} onChange={(e) => setDegree(e.target.value)} className="input-field md:w-40">
            <option value="All">{t('scholarships.all_degrees')}</option>
            <option value="BS">{t('scholarships.degree_bs')}</option>
            <option value="MS">{t('scholarships.degree_ms')}</option>
            <option value="PhD">{t('scholarships.degree_phd')}</option>
          </select>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="px-6 pt-8 max-w-screen-xl mx-auto w-full">
        <AdBanner placement="Scholarships" />
      </div>

      {/* Results */}
      <section className="py-8 px-6 max-w-screen-xl mx-auto w-full">
        <p className="text-sm text-text-muted mb-6">
          {t('scholarships.showing')} <span className="text-primary font-semibold">{scholarships.length}</span> {t('scholarships.results')}
        </p>
        {loading ? (
          <div className="text-center py-20 text-text-muted">Loading scholarships...</div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">{error}</div>
        ) : scholarships.length === 0 ? (
          <div className="text-center py-20 text-text-muted">
            <span className="material-symbols-outlined text-5xl mb-4 block text-primary-light">search_off</span>
            <p>{t('scholarships.no_results')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scholarships.map((s) => <ScholarshipCard key={s._id} scholarship={s} />)}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-primary-pale border-t border-border">
        <div className="max-w-screen-xl mx-auto text-center space-y-5">
          <h2 className="font-heading font-bold text-navy text-3xl">{t('scholarships.need_help')}</h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">{t('scholarships.help_text')}</p>
          <a href="https://wa.me/923039393438" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-lg shadow-btn hover:bg-primary-dark transition-all duration-200">
            <span className="material-symbols-outlined text-base">chat</span>
            {t('scholarships.apply_with_us')}
          </a>
        </div>
      </section>
    </div>
  )
}
