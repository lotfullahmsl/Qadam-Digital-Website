import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../../hooks/useLanguage'
import { ROUTES } from '../../constants/routes'
import { getContactInfo } from '../../utils/contactStore'

export default function Footer() {
  const { t } = useTranslation()
  const { language } = useLanguage()
  const contact = getContactInfo()

  return (
    <footer className="bg-navy text-text-on-dark">
      {/* Main Footer */}
      <div className="max-w-screen-xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1 flex flex-col gap-4">
          <Link to={ROUTES.HOME} className="flex items-center gap-3">
            <img
              src="/logo-dark.jpeg"
              alt="QADAM Digital"
              className="h-12 w-auto object-contain"
            />
            <span
              className="font-bold text-white text-xl"
              style={{
                fontFamily: language === 'en'
                  ? "'Montserrat', sans-serif"
                  : "'Noto Naskh Arabic', 'Noto Sans Arabic', Tahoma, Arial, sans-serif",
                fontSize: language === 'en' ? '1.25rem' : '1.1rem',
                letterSpacing: language === 'en' ? '-0.01em' : '0',
              }}
            >
              {language === 'en'
                ? <><span className="text-white">QADAM</span> <span className="text-primary">Digital</span></>
                : <span className="text-white">{t('brand.name')}</span>
              }
            </span>
          </Link>
          <p className="text-sm text-primary-light/80 leading-relaxed max-w-xs">
            {t('footer.tagline')}
          </p>
          {/* Social Links */}
          <div className="flex gap-2 mt-1">
            {[
              {
                href: contact.facebook, label: 'Facebook',
                svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              },
              {
                href: contact.instagram, label: 'Instagram',
                svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              },
              {
                href: contact.linkedin, label: 'LinkedIn',
                svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              },
              {
                href: contact.youtube, label: 'YouTube',
                svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href || '#'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-primary-light hover:bg-primary hover:text-white transition-all duration-200 border border-white/10"
              >
                {s.svg}
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-xs font-semibold tracking-widest uppercase text-primary mb-5">{t('footer.services')}</h4>
          <ul className="space-y-3 text-sm text-primary-light/80">
            <li><Link to={ROUTES.SCHOLARSHIPS} className="hover:text-white transition-colors">{t('footer.service_links.scholarship')}</Link></li>
            <li><Link to={ROUTES.CV_TRANSLATION} className="hover:text-white transition-colors">{t('footer.service_links.cv')}</Link></li>
            <li><Link to={ROUTES.WEBSITE_DATABASE} className="hover:text-white transition-colors">{t('footer.service_links.web')}</Link></li>
            <li><Link to={ROUTES.DIGITAL_TOOLS} className="hover:text-white transition-colors">{t('footer.service_links.ai')}</Link></li>
            <li><Link to={ROUTES.SOCIAL_MEDIA} className="hover:text-white transition-colors">{t('footer.service_links.smm')}</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-xs font-semibold tracking-widest uppercase text-primary mb-5">{t('footer.company')}</h4>
          <ul className="space-y-3 text-sm text-primary-light/80">
            <li><Link to={ROUTES.ABOUT} className="hover:text-white transition-colors">{t('nav.about')}</Link></li>
            <li><Link to={ROUTES.PRICING} className="hover:text-white transition-colors">{t('nav.pricing')}</Link></li>
            <li><Link to={ROUTES.CONTACT} className="hover:text-white transition-colors">{t('nav.contact')}</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-semibold tracking-widest uppercase text-primary mb-5">{t('footer.contact')}</h4>
          <ul className="space-y-3 text-sm text-primary-light/80">
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">chat</span>
              <a href={contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{contact.whatsapp}</a>
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">email</span>
              <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">{contact.email}</a>
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">location_on</span>
              <span>Kabul, Afghanistan</span>
            </li>
          </ul>
          <a
            href={contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 bg-primary text-white text-xs font-semibold tracking-wide uppercase px-4 py-2.5 rounded-lg hover:bg-primary-dark transition-all duration-200"
          >
            <span className="material-symbols-outlined text-base">chat</span>
            {t('contact.whatsapp_btn')}
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-screen-xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-primary-light/60">© {t('footer.copyright')}</p>
          <div className="flex gap-5 text-xs text-primary-light/60">
            <a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.faq')}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
