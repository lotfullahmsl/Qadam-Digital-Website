import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '../../constants/routes'
import AdBanner from '../../components/common/AdBanner'
import PageMeta from '../../components/common/PageMeta'
import { scholarshipService } from '../../services/scholarshipService'
import RequestForm from '../../components/common/RequestForm'
import { serviceRequestService } from '../../services/serviceRequestService'
import { seoService } from '../../services/seoService'

const localizedList = (value, lang) => {
  if (Array.isArray(value)) return value
  if (typeof value === 'string') return value.split('\n').filter(Boolean)
  return value?.[lang] || value?.en || []
}

export default function ScholarshipDetails() {
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'ps' ? 'ps' : i18n.language === 'fa' ? 'fa' : 'en'
  const [scholarship, setScholarship] = useState(null)
  const [seoMeta, setSeoMeta] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadScholarship() {
      setLoading(true)
      setError('')
      try {
        const { data } = await scholarshipService.getById(id)
        if (!ignore) setScholarship(data.scholarship)
      } catch (err) {
        if (!ignore) setError(err.response?.data?.message || t('scholarships.not_found'))
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    loadScholarship()
    return () => { ignore = true }
  }, [id, t])

  useEffect(() => {
    let ignore = false
    if (!id) return undefined
    seoService
      .getPage(`scholarship/${id}`, { lang })
      .then(({ data }) => {
        if (!ignore) setSeoMeta(data.meta || null)
      })
      .catch(() => {
        if (!ignore) setSeoMeta(null)
      })
    return () => {
      ignore = true
    }
  }, [id, lang])

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center text-text-muted">Loading scholarship...</div>
  }

  if (!scholarship) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-text-muted">
        <span className="material-symbols-outlined text-5xl text-primary-light">search_off</span>
        <p>{error || t('scholarships.not_found')}</p>
        <Link to={ROUTES.SCHOLARSHIPS} className="text-primary hover:underline font-semibold">
          {t('scholarships.back')}
        </Link>
      </div>
    )
  }

  const fundingLabel = scholarship.fundingType === 'Fully Funded'
    ? t('scholarships.fully_funded')
    : t('scholarships.partial')

  const pageSeo =
    seoMeta ||
    {
      title: scholarship.title,
      description: typeof scholarship.description === 'string' ? scholarship.description : scholarship.description?.[lang] || '',
      canonicalUrl: `/scholarships/${id}`,
    }

  return (
    <div className="flex flex-col">
      <PageMeta meta={pageSeo} />
      {/* Hero */}
      <section className="hero-bg py-16 px-6">
        <div className="max-w-screen-xl mx-auto">
          <Link to={ROUTES.SCHOLARSHIPS}
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-8 transition-colors">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            {t('scholarships.back')}
          </Link>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left — Info */}
            <div className="flex-grow space-y-5">
              <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
                {fundingLabel}
              </span>
              <h1 className="font-heading font-bold text-white text-4xl leading-tight">
                {scholarship.title}
              </h1>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: 'location_on', label: t('scholarships.country_label'), text: scholarship.country },
                  { icon: 'account_balance', label: t('scholarships.university_label'), text: scholarship.university },
                  { icon: 'grade', label: t('scholarships.degree_label'), text: scholarship.degree },
                  { icon: 'calendar_today', label: t('scholarships.deadline_label'), text: scholarship.deadline },
                ].map((tag) => (
                  <span key={tag.label} className="flex items-center gap-1.5 text-sm text-white/80 bg-white/10 border border-white/20 px-3 py-1.5 rounded-lg">
                    <span className="material-symbols-outlined text-primary text-base">{tag.icon}</span>
                    <span className="text-white/60 text-xs">{tag.label}:</span>
                    <span className="text-white font-medium">{tag.text}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Right — CTA Card with image */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl w-full lg:w-80 flex-shrink-0">
              {/* University image */}
              {scholarship.image && (
                <div className="h-40 overflow-hidden">
                  <img src={scholarship.image} alt={scholarship.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-6 space-y-4">
                <h3 className="font-heading font-bold text-navy text-lg">{t('scholarships.apply_cta_title')}</h3>
                <p className="text-sm text-text-muted">{t('scholarships.apply_cta_desc')}</p>
                <a href="https://wa.me/923039393437" target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-dark transition-all duration-200 shadow-btn text-sm">
                  <span className="material-symbols-outlined text-base">chat</span>
                  {t('scholarships.apply_whatsapp')}
                </a>
                {scholarship.officialLink && (
                  <a href={scholarship.officialLink} target="_blank" rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 border-2 border-primary text-primary font-semibold py-3 rounded-xl hover:bg-primary hover:text-white transition-all duration-200 text-sm">
                    <span className="material-symbols-outlined text-base">open_in_new</span>
                    {t('scholarships.official_website')}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-12 px-6 bg-background">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">

              {/* Benefits */}
              <div className="card p-6 space-y-4">
                <h2 className="font-heading font-bold text-navy text-xl flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-2xl">star</span>
                  {t('scholarships.benefits')}
                </h2>
                <ul className="space-y-2.5">
                  {localizedList(scholarship.benefits, lang).map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary">
                      <span className="material-symbols-outlined text-primary text-base mt-0.5 flex-shrink-0">check_circle</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Eligibility */}
              <div className="card p-6 space-y-4">
                <h2 className="font-heading font-bold text-navy text-xl flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-2xl">verified_user</span>
                  {t('scholarships.eligibility')}
                </h2>
                <ul className="space-y-2.5">
                  {localizedList(scholarship.eligibility, lang).map((e, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary">
                      <span className="material-symbols-outlined text-primary text-base mt-0.5 flex-shrink-0">arrow_right</span>
                      {e}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Required Documents */}
              <div className="card p-6 space-y-4">
                <h2 className="font-heading font-bold text-navy text-xl flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-2xl">folder</span>
                  {t('scholarships.required_docs')}
                </h2>
                <ul className="space-y-2.5">
                  {localizedList(scholarship.documents, lang).map((d, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary">
                      <span className="material-symbols-outlined text-primary text-base mt-0.5 flex-shrink-0">description</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Application Steps */}
              <div className="card p-6 space-y-4">
                <h2 className="font-heading font-bold text-navy text-xl flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-2xl">format_list_numbered</span>
                  {t('scholarships.app_steps')}
                </h2>
                <ol className="space-y-3">
                  {localizedList(scholarship.steps, lang).map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                      <span className="w-7 h-7 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <RequestForm
                title="Request Scholarship Application Support"
                description="Send your details and our team will guide you for this scholarship."
                submitLabel="Submit Scholarship Request"
                allowAttachment
                extraFields={[
                  { name: 'university', label: 'University', placeholder: scholarship.university },
                  { name: 'country', label: 'Country', placeholder: scholarship.country },
                  { name: 'degree', label: 'Degree', placeholder: scholarship.degree },
                  { name: 'ielts', label: 'IELTS Score', placeholder: 'IELTS / language score if available' },
                ]}
                onSubmit={(data) => serviceRequestService.submitScholarshipApp({
                  ...data,
                  subject: scholarship.title,
                  scholarshipId: scholarship._id,
                })}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <AdBanner placement="Scholarships" className="min-h-[200px]" />
              <div className="card p-6 space-y-4">
                <h3 className="font-heading font-bold text-navy text-lg">{t('scholarships.need_help_sidebar')}</h3>
                <p className="text-sm text-text-muted">{t('scholarships.need_help_sidebar_desc')}</p>
                <a href="https://wa.me/923039393437" target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-2.5 rounded-xl hover:bg-primary-dark transition-all duration-200 text-sm shadow-btn">
                  <span className="material-symbols-outlined text-base">chat</span>
                  {t('scholarships.chat_whatsapp')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
