import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '../../constants/routes'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-surface-container-lowest w-full py-xl border-t border-outline-variant/30 mt-auto">
      <div className="max-w-screen-xl mx-auto px-lg grid grid-cols-1 md:grid-cols-4 gap-gutter">
        {/* Brand */}
        <div className="md:col-span-1 flex flex-col gap-3">
          <Link to={ROUTES.HOME} className="font-heading text-2xl font-bold text-primary">
            QADAM Digital
          </Link>
          <p className="text-sm text-on-surface-variant max-w-xs">
            {t('footer.tagline')}
          </p>
          {/* Social Links */}
          <div className="flex gap-3 mt-2">
            {[
              { icon: 'facebook', href: '#', label: 'Facebook' },
              { icon: 'instagram', href: '#', label: 'Instagram' },
              { icon: 'linkedin', href: '#', label: 'LinkedIn' },
              { icon: 'youtube_activity', href: '#', label: 'YouTube' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors border border-outline-variant/30"
              >
                <span className="material-symbols-outlined text-base">{s.icon}</span>
              </a>
            ))}
          </div>
          <p className="text-xs text-on-surface-variant mt-2">{t('footer.copyright')}</p>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-xs font-semibold tracking-widest uppercase text-on-surface mb-4">{t('footer.services')}</h4>
          <ul className="space-y-2 text-sm text-on-surface-variant">
            <li><Link to={ROUTES.SCHOLARSHIPS} className="hover:text-primary transition-colors">Scholarship Consulting</Link></li>
            <li><Link to={ROUTES.CV_TRANSLATION} className="hover:text-primary transition-colors">CV & Motivation Letters</Link></li>
            <li><Link to={ROUTES.WEBSITE_DATABASE} className="hover:text-primary transition-colors">Web Development</Link></li>
            <li><Link to={ROUTES.DIGITAL_TOOLS} className="hover:text-primary transition-colors">AI Tool Subscriptions</Link></li>
            <li><Link to={ROUTES.SOCIAL_MEDIA} className="hover:text-primary transition-colors">Social Media Marketing</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-xs font-semibold tracking-widest uppercase text-on-surface mb-4">{t('footer.company')}</h4>
          <ul className="space-y-2 text-sm text-on-surface-variant">
            <li><Link to={ROUTES.ABOUT} className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to={ROUTES.PORTFOLIO} className="hover:text-primary transition-colors">Portfolio</Link></li>
            <li><Link to={ROUTES.BLOG} className="hover:text-primary transition-colors">Blog</Link></li>
            <li><Link to={ROUTES.PRICING} className="hover:text-primary transition-colors">Pricing</Link></li>
            <li><Link to={ROUTES.CONTACT} className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-xs font-semibold tracking-widest uppercase text-on-surface mb-4">{t('footer.legal')}</h4>
          <ul className="space-y-2 text-sm text-on-surface-variant">
            <li><a href="#" className="hover:text-primary transition-colors">{t('footer.privacy')}</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">{t('footer.terms')}</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">{t('footer.faq')}</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">{t('footer.careers')}</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">{t('footer.multilingual')}</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
