import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../../hooks/useLanguage'
import { ROUTES } from '../../constants/routes'

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'ps', label: 'PS' },
  { code: 'fa', label: 'DA' },
]

export default function Navbar() {
  const { t } = useTranslation()
  const { language, changeLanguage } = useLanguage()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  const navLinks = [
    { label: t('nav.scholarships'), to: ROUTES.SCHOLARSHIPS },
    { label: t('nav.services'), to: ROUTES.SERVICES },
    { label: t('nav.solutions'), to: ROUTES.WEBSITE_DATABASE },
    { label: t('nav.pricing'), to: ROUTES.PRICING },
    { label: t('nav.portfolio'), to: ROUTES.PORTFOLIO },
    { label: t('nav.blog'), to: ROUTES.BLOG },
    { label: t('nav.about'), to: ROUTES.ABOUT },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-surface/10 backdrop-blur-xl sticky top-0 w-full z-50 border-b border-white/10 shadow-xl">
      <div className="flex justify-between items-center px-lg py-md max-w-screen-xl mx-auto">
        {/* Brand */}
        <Link to={ROUTES.HOME} className="font-heading text-2xl font-bold text-primary tracking-tight">
          QADAM Digital
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-200 ${
                isActive(link.to)
                  ? 'text-primary border-b-2 border-primary pb-0.5'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 items-center">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="text-xs font-semibold tracking-widest text-on-surface-variant hover:text-primary transition-colors border border-outline-variant rounded-full px-3 py-1.5"
            >
              {LANGUAGES.find((l) => l.code === language)?.label || 'EN'}
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 bg-surface-container border border-outline-variant/30 rounded-lg shadow-xl overflow-hidden z-50">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { changeLanguage(lang.code); setLangOpen(false) }}
                    className={`block w-full text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-colors ${
                      language === lang.code ? 'text-primary bg-primary/10' : 'text-on-surface-variant hover:text-primary hover:bg-white/5'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/93700000000"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 bg-primary text-on-primary text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full glow-button transition-all duration-300"
          >
            <span className="material-symbols-outlined text-base">chat</span>
            {t('nav.whatsapp')}
          </a>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden text-on-surface-variant hover:text-primary transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-surface-container border-t border-outline-variant/30 px-lg py-md flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`text-xs font-semibold tracking-widest uppercase py-2 transition-colors ${
                isActive(link.to) ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://wa.me/93700000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-primary text-on-primary text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full w-fit mt-2"
          >
            <span className="material-symbols-outlined text-base">chat</span>
            {t('nav.whatsapp')}
          </a>
        </div>
      )}
    </nav>
  )
}
