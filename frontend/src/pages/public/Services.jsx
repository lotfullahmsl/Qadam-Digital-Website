import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '../../constants/routes'

export default function Services() {
  const { t } = useTranslation()

  const SERVICE_GROUPS = [
    {
      categoryKey: 'education',
      category: t('services_page.groups.education'),
      icon: 'school',
      color: 'bg-blue-50 text-blue-600',
      services: [
        {
          icon: 'school',
          title: t('services_page.education.scholarship_title'),
          description: t('services_page.education.scholarship_desc'),
          to: ROUTES.SCHOLARSHIPS,
          features: [
            t('services_page.education.scholarship_f1'),
            t('services_page.education.scholarship_f2'),
            t('services_page.education.scholarship_f3'),
            t('services_page.education.scholarship_f4'),
          ],
        },
        {
          icon: 'description',
          title: t('services_page.education.cv_title'),
          description: t('services_page.education.cv_desc'),
          to: ROUTES.CV_TRANSLATION,
          features: [
            t('services_page.education.cv_f1'),
            t('services_page.education.cv_f2'),
            t('services_page.education.cv_f3'),
            t('services_page.education.cv_f4'),
          ],
        },
        {
          icon: 'translate',
          title: t('services_page.education.translation_title'),
          description: t('services_page.education.translation_desc'),
          to: ROUTES.CV_TRANSLATION,
          features: [
            t('services_page.education.translation_f1'),
            t('services_page.education.translation_f2'),
            t('services_page.education.translation_f3'),
            t('services_page.education.translation_f4'),
          ],
        },
        {
          icon: 'psychology',
          title: t('services_page.education.consulting_title'),
          description: t('services_page.education.consulting_desc'),
          to: ROUTES.CONTACT,
          features: [
            t('services_page.education.consulting_f1'),
            t('services_page.education.consulting_f2'),
            t('services_page.education.consulting_f3'),
            t('services_page.education.consulting_f4'),
          ],
        },
      ],
    },
    {
      categoryKey: 'technology',
      category: t('services_page.groups.technology'),
      icon: 'code',
      color: 'bg-purple-50 text-purple-600',
      services: [
        {
          icon: 'web',
          title: t('services_page.technology.web_title'),
          description: t('services_page.technology.web_desc'),
          to: ROUTES.WEBSITE_DATABASE,
          features: [
            t('services_page.technology.web_f1'),
            t('services_page.technology.web_f2'),
            t('services_page.technology.web_f3'),
            t('services_page.technology.web_f4'),
          ],
        },
        {
          icon: 'database',
          title: t('services_page.technology.db_title'),
          description: t('services_page.technology.db_desc'),
          to: ROUTES.WEBSITE_DATABASE,
          features: [
            t('services_page.technology.db_f1'),
            t('services_page.technology.db_f2'),
            t('services_page.technology.db_f3'),
            t('services_page.technology.db_f4'),
          ],
        },
        {
          icon: 'smart_toy',
          title: t('services_page.technology.ai_title'),
          description: t('services_page.technology.ai_desc'),
          to: ROUTES.DIGITAL_TOOLS,
          features: [
            t('services_page.technology.ai_f1'),
            t('services_page.technology.ai_f2'),
            t('services_page.technology.ai_f3'),
            t('services_page.technology.ai_f4'),
          ],
        },
        {
          icon: 'campaign',
          title: t('services_page.technology.smm_title'),
          description: t('services_page.technology.smm_desc'),
          to: ROUTES.SOCIAL_MEDIA,
          features: [
            t('services_page.technology.smm_f1'),
            t('services_page.technology.smm_f2'),
            t('services_page.technology.smm_f3'),
            t('services_page.technology.smm_f4'),
          ],
        },
      ],
    },
    {
      categoryKey: 'graphic_design',
      category: t('services_page.groups.graphic_design'),
      icon: 'palette',
      color: 'bg-pink-50 text-pink-600',
      services: [
        {
          icon: 'palette',
          title: t('services_page.graphic.logo_title'),
          description: t('services_page.graphic.logo_desc'),
          to: ROUTES.CONTACT,
          features: [
            t('services_page.graphic.logo_f1'),
            t('services_page.graphic.logo_f2'),
            t('services_page.graphic.logo_f3'),
            t('services_page.graphic.logo_f4'),
          ],
        },
        {
          icon: 'print',
          title: t('services_page.graphic.print_title'),
          description: t('services_page.graphic.print_desc'),
          to: ROUTES.CONTACT,
          features: [
            t('services_page.graphic.print_f1'),
            t('services_page.graphic.print_f2'),
            t('services_page.graphic.print_f3'),
            t('services_page.graphic.print_f4'),
          ],
        },
        {
          icon: 'inventory_2',
          title: t('services_page.graphic.packaging_title'),
          description: t('services_page.graphic.packaging_desc'),
          to: ROUTES.CONTACT,
          features: [
            t('services_page.graphic.packaging_f1'),
            t('services_page.graphic.packaging_f2'),
            t('services_page.graphic.packaging_f3'),
            t('services_page.graphic.packaging_f4'),
          ],
        },
        {
          icon: 'photo_camera',
          title: t('services_page.graphic.poster_title'),
          description: t('services_page.graphic.poster_desc'),
          to: ROUTES.CONTACT,
          features: [
            t('services_page.graphic.poster_f1'),
            t('services_page.graphic.poster_f2'),
            t('services_page.graphic.poster_f3'),
            t('services_page.graphic.poster_f4'),
          ],
        },
        {
          icon: 'menu_book',
          title: t('services_page.graphic.book_title'),
          description: t('services_page.graphic.book_desc'),
          to: ROUTES.CONTACT,
          features: [
            t('services_page.graphic.book_f1'),
            t('services_page.graphic.book_f2'),
            t('services_page.graphic.book_f3'),
            t('services_page.graphic.book_f4'),
          ],
        },
      ],
    },
    {
      categoryKey: 'video',
      category: t('services_page.groups.video'),
      icon: 'movie',
      color: 'bg-orange-50 text-orange-600',
      services: [
        {
          icon: 'movie',
          title: t('services_page.video.editing_title'),
          description: t('services_page.video.editing_desc'),
          to: ROUTES.CONTACT,
          features: [
            t('services_page.video.editing_f1'),
            t('services_page.video.editing_f2'),
            t('services_page.video.editing_f3'),
            t('services_page.video.editing_f4'),
          ],
        },
        {
          icon: 'animation',
          title: t('services_page.video.animation_title'),
          description: t('services_page.video.animation_desc'),
          to: ROUTES.CONTACT,
          features: [
            t('services_page.video.animation_f1'),
            t('services_page.video.animation_f2'),
            t('services_page.video.animation_f3'),
            t('services_page.video.animation_f4'),
          ],
        },
        {
          icon: 'auto_awesome',
          title: t('services_page.video.motion_title'),
          description: t('services_page.video.motion_desc'),
          to: ROUTES.CONTACT,
          features: [
            t('services_page.video.motion_f1'),
            t('services_page.video.motion_f2'),
            t('services_page.video.motion_f3'),
            t('services_page.video.motion_f4'),
          ],
        },
        {
          icon: 'view_in_ar',
          title: t('services_page.video.product_title'),
          description: t('services_page.video.product_desc'),
          to: ROUTES.CONTACT,
          features: [
            t('services_page.video.product_f1'),
            t('services_page.video.product_f2'),
            t('services_page.video.product_f3'),
            t('services_page.video.product_f4'),
          ],
        },
      ],
    },
  ]

  const TOTAL_SERVICES = SERVICE_GROUPS.reduce((acc, g) => acc + g.services.length, 0)

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

          {/* Category pills */}
          <div className="flex flex-wrap gap-3 mt-8">
            {SERVICE_GROUPS.map((group) => (
              <span key={group.categoryKey}
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 px-4 py-2 rounded-full text-sm font-medium">
                <span className="material-symbols-outlined text-primary text-base">{group.icon}</span>
                {group.category}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Groups ── */}
      {SERVICE_GROUPS.map((group, gi) => (
        <section
          key={group.categoryKey}
          className={`py-16 px-6 ${gi % 2 === 0 ? 'bg-background' : 'bg-primary-pale'}`}
        >
          <div className="max-w-screen-xl mx-auto">
            {/* Group header */}
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

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {group.services.map((service) => (
                <div key={service.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4 group hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
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

      {/* ── CTA ── */}
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
