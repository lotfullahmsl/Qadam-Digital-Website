import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '../../constants/routes'
import AdBanner from '../../components/common/AdBanner'
import { serviceContentService } from '../../services/serviceContentService'
import { cmsText } from '../../utils/cmsText'

const GROUP_ACCENTS = {
  education: 'bg-blue-50 text-blue-600',
  technology: 'bg-purple-50 text-purple-600',
  graphic_design: 'bg-pink-50 text-pink-600',
  video: 'bg-orange-50 text-orange-600',
}

export default function Services() {
  const { t } = useTranslation()
  const [apiServices, setApiServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false

    async function loadServices() {
      setLoading(true)
      try {
        const { data } = await serviceContentService.getAll()
        if (!ignore) setApiServices(data.items || [])
      } catch {
        if (!ignore) setApiServices([])
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    loadServices()
    return () => { ignore = true }
  }, [])

  const displayGroups = Object.values(
    apiServices.reduce((groups, service) => {
      const rawKey = service.categoryKey || cmsText(service.category)
      const key =
        typeof rawKey === 'string' && rawKey.trim()
          ? rawKey.toLowerCase().replace(/\s+/g, '_')
          : 'services'
      if (!groups[key]) {
        groups[key] = {
          categoryKey: key,
          category: cmsText(service.category, key.replace(/_/g, ' ')),
          icon: service.icon || 'build',
          color: GROUP_ACCENTS[key] || 'bg-blue-50 text-blue-600',
          services: [],
        }
      }
      const feats = Array.isArray(service.features) ? service.features : []
      groups[key].services.push({
        _id: service._id,
        icon: service.icon || 'build',
        title: cmsText(service.title),
        description: cmsText(service.description),
        to: service.to || service.ctaLink || ROUTES.CONTACT,
        features: feats.map((f) => cmsText(f)),
      })
      return groups
    }, {}),
  )

  return (
    <div className="flex flex-col">

      {/* ── Hero ── */}
      <section className="hero-bg py-24 px-6">
        <div className="max-w-screen-xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-white/20 mb-5">
            <span className="material-symbols-outlined text-sm">build</span>
            {t('nav.services')}
          </span>
          <h1 className="font-heading font-bold text-white text-5xl mb-4 max-w-2xl">
            {t('services_page.hero_title')}
          </h1>
          <div className="h-1 w-24 bg-primary rounded-full mb-6" />
          <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
            {t('services_page.hero_subtitle')}
          </p>

          {loading ? (
            <p className="text-white/70 mt-8">{t('services_page.loading')}</p>
          ) : displayGroups.length === 0 ? (
            <p className="text-white/80 mt-8 max-w-2xl">{t('services_page.empty')}</p>
          ) : (
            <div className="flex flex-wrap gap-3 mt-8">
              {displayGroups.map((group) => (
                <span key={group.categoryKey}
                  className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 px-4 py-2 rounded-full text-sm font-medium">
                  <span className="material-symbols-outlined text-primary text-base">{group.icon}</span>
                  {group.category}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Service Groups ── */}
      {!loading && displayGroups.map((group, gi) => (
        <section
          key={group.categoryKey}
          className={`py-16 px-6 ${gi % 2 === 0 ? 'bg-background' : 'bg-primary-pale'}`}
        >
          <div className="max-w-screen-xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${group.color}`}>
                <span className="material-symbols-outlined text-2xl">{group.icon}</span>
              </div>
              <div>
                <h2 className="font-heading font-bold text-navy text-2xl">{group.category}</h2>
                <p className="text-text-muted text-sm mt-0.5">
                  {group.services.length} {t('services_page.services_count')}
                </p>
              </div>
              <div className="ml-auto hidden sm:block h-px flex-1 bg-border max-w-xs" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {group.services.map((service) => (
                <div key={service._id || `${group.categoryKey}-${service.title}`} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4 group hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${group.color}`}>
                    <span className="material-symbols-outlined text-xl">{service.icon}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-navy text-base leading-snug">{service.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed flex-grow">{service.description}</p>
                  <ul className="space-y-1.5">
                    {service.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-text-secondary">
                        <span className="material-symbols-outlined text-primary text-base flex-shrink-0">check_circle</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={service.to}
                    className="text-primary text-xs font-semibold tracking-widest uppercase flex items-center gap-1 hover:gap-2 transition-all duration-200 mt-1"
                  >
                    {t('services.get_started')}
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <div className="px-6 pb-8 max-w-screen-xl mx-auto w-full">
        <AdBanner placement="Services" />
      </div>

      <section className="py-16 px-6 bg-primary">
        <div className="max-w-screen-xl mx-auto text-center space-y-5">
          <h2 className="font-heading font-bold text-white text-3xl">{t('services_page.cta_title')}</h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto">{t('services_page.cta_subtitle')}</p>
          <a
            href="https://wa.me/923039393438"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-3.5 rounded-lg hover:bg-primary-pale transition-all duration-200 shadow-lg"
          >
            <span className="material-symbols-outlined text-base">chat</span>
            {t('contact.whatsapp_btn')}
          </a>
        </div>
      </section>

    </div>
  )
}
