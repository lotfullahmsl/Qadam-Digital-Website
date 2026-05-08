import React, { useState, useEffect } from 'react'
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
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
    <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white shadow-md border-b border-border'
        : 'bg-white/95 backdrop-blur-sm border-b border-border'
    }`}>
      <div className="flex justify-between items-center px-6 py-4 max-w-screen-xl mx-auto">
        {/* Brand */}
        <Link to={ROUTES.HOME} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-lg">school</span>
          </div>
          <span className="font-heading text-xl font-bold text-navy tracking-tight">
            QADAM <span className="text-primary">Digital</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-1 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive(link.to)
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-text-secondary hover:bg-primary-pale hover:text-primary'
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
              className="flex items-center gap-1 text-xs font-semibold tracking-widest uppercase text-text-secondary hover:text-primary border border-border rounded-full px-3 py-1.5 hover:border-primary transition-all duration-200"
            >
              <span className="material-symbols-outlined text-sm">language</span>
              {LANGUAGES.find((l) => l.code === language)?.label || 'EN'}
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-border rounded-xl shadow-card-hover overflow-hidden z-50 min-w-[80px]">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { changeLanguage(lang.code); setLangOpen(false) }}
                    className={`block w-full text-left px-4 py-2.5 text-xs font-semibold tracking-widest uppercase transition-colors ${
                      language === lang.code
                        ? 'text-primary bg-primary/10'
                        : 'text-text-secondary hover:text-primary hover:bg-primary-pale'
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
            className="hidden sm:flex items-center gap-1.5 bg-primary text-white text-xs font-semibold tracking-wide uppercase px-4 py-2.5 rounded-lg shadow-btn hover:bg-primary-dark transition-all duration-200"
          >
            <span className="material-symbols-outlined text-base">chat</span>
            WhatsApp
          </a>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden text-text-secondary hover:text-primary transition-colors p-1"
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
        <div className="lg:hidden bg-white border-t border-border px-6 py-4 flex flex-col gap-1 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.to)
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-text-secondary hover:bg-primary-pale hover:text-primary'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://wa.me/93700000000"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 bg-primary text-white font-semibold py-2.5 rounded-lg text-sm"
          >
            <span className="material-symbols-outlined text-base">chat</span>
            Chat on WhatsApp
          </a>
        </div>
      )}
    </nav>
  )
}
