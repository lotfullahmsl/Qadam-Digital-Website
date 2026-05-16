import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../../hooks/useLanguage'
import { useAuth } from '../../hooks/useAuth'
import { ROUTES } from '../../constants/routes'

const LANGUAGE_CODES = ['en', 'ps', 'fa']

const languageShortLabel = (code) =>
  code === 'en' ? 'EN' : code === 'ps' ? 'PS' : 'DA'

export default function Navbar() {
  const { t } = useTranslation()
  const { language, changeLanguage } = useLanguage()
  const { admin, isAuthenticated, logout } = useAuth()
  const isLoggedIn = isAuthenticated
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const langRef = useRef(null)
  const userRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false)
      if (userRef.current && !userRef.current.contains(e.target)) setUserMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setLangOpen(false)
    setUserMenuOpen(false)
  }, [location.pathname])

  const navLinks = [
    { label: t('nav.scholarships'), to: ROUTES.SCHOLARSHIPS },
    { label: t('nav.services'), to: ROUTES.SERVICES },
    { label: t('nav.solutions'), to: ROUTES.WEBSITE_DATABASE },
    { label: t('nav.pricing'), to: ROUTES.PRICING },
    { label: t('nav.contact'), to: ROUTES.CONTACT },
    { label: t('nav.about'), to: ROUTES.ABOUT },
  ]

  const isActive = (path) => location.pathname === path

  const userInitials = admin?.name
    ? admin.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : admin?.email
      ? admin.email[0].toUpperCase()
      : 'A'

  return (
    <header className={`sticky top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-[0_2px_20px_rgba(0,0,0,0.08)]' : 'bg-white border-b border-gray-100'
    }`}>
      <div className="w-full px-6 xl:px-12">
        <div className="flex items-center" style={{ height: '68px' }}>

          {/* ── Logo ── */}
          <Link to={ROUTES.HOME} className="flex items-center gap-3 flex-shrink-0 me-10">
            <img
              src="/logo-dark.jpeg"
              alt="QADAM Digital"
              className="h-12 w-auto object-contain"
            />
            <span
              className="font-bold text-navy text-xl tracking-tight"
              style={{
                fontFamily: language === 'en'
                  ? "'Montserrat', sans-serif"
                  : "'Noto Naskh Arabic', 'Noto Sans Arabic', Tahoma, Arial, sans-serif",
                fontSize: language === 'en' ? '1.25rem' : '1.15rem',
                letterSpacing: language === 'en' ? '-0.01em' : '0',
              }}
            >
              {language === 'en'
                ? <><span className="text-navy">QADAM</span> <span className="text-primary">Digital</span></>
                : <span className="text-navy">{t('brand.name')}</span>
              }
            </span>
          </Link>

          {/* ── Desktop Nav Links — center ── */}
          <nav className="hidden lg:flex items-center gap-1 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive(link.to)
                    ? 'text-primary bg-primary/8 font-semibold'
                    : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                }`}
                style={isActive(link.to) ? { backgroundColor: 'rgba(0,170,255,0.08)' } : {}}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Right Actions ── */}
          <div className="hidden lg:flex items-center gap-3 ms-6 flex-shrink-0">

            {/* Language Switcher */}
            <div className="relative" ref={langRef}>
              <button
                type="button"
                onClick={() => { setLangOpen(!langOpen); setUserMenuOpen(false) }}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-primary px-3.5 py-2 rounded-xl border border-transparent hover:border-primary/15 hover:bg-primary/5 transition-all duration-200"
                aria-haspopup="listbox"
                aria-expanded={langOpen}
              >
                <span className="material-symbols-outlined text-base text-primary/80">language</span>
                <span className="min-w-[4.5rem] text-start font-semibold">
                  {languageShortLabel(language)}
                </span>
                <span className="material-symbols-outlined text-sm text-gray-400 rtl:rotate-180 transition-transform">expand_more</span>
              </button>
              {langOpen && (
                <div
                  className="absolute end-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] overflow-hidden z-50 min-w-[200px] py-1"
                  role="listbox"
                >
                  {LANGUAGE_CODES.map((code) => (
                    <button
                      key={code}
                      type="button"
                      role="option"
                      aria-selected={language === code}
                      onClick={() => { changeLanguage(code); setLangOpen(false) }}
                      className={`flex items-center gap-3 w-full px-4 py-3 text-sm transition-colors ${
                        language === code
                          ? 'text-primary bg-primary/8 font-semibold'
                          : 'text-gray-700 hover:text-primary hover:bg-primary/5'
                      }`}
                      style={language === code ? { backgroundColor: 'rgba(0,170,255,0.08)' } : {}}
                    >
                      <span className="w-8 text-xs font-bold tracking-wider text-gray-400 tabular-nums">
                        {languageShortLabel(code)}
                      </span>
                      <span className="flex-1 text-start break-words" dir="auto">
                        {t(`nav.lang_${code}`)}
                      </span>
                      {language === code && (
                        <span className="material-symbols-outlined text-primary text-lg shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-200" />

            {/* Auth — logged out */}
            {!isLoggedIn && (
              <>
                <Link
                  to={ROUTES.USER_LOGIN}
                  className="text-sm font-semibold text-gray-700 hover:text-primary px-4 py-2 rounded-lg hover:bg-primary/5 transition-all duration-200"
                >
                  {t('nav.sign_in')}
                </Link>
                <Link
                  to={ROUTES.USER_SIGNUP}
                  className="text-sm font-semibold bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-primary-dark transition-all duration-200 shadow-sm"
                  style={{ boxShadow: '0 2px 8px rgba(0,170,255,0.3)' }}
                >
                  {t('nav.sign_up')}
                </Link>
              </>
            )}

            {/* Auth — logged in */}
            {isLoggedIn && (
              <div className="relative" ref={userRef}>
                <button
                  onClick={() => { setUserMenuOpen(!userMenuOpen); setLangOpen(false) }}
                  className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-full border border-gray-200 hover:border-primary/40 transition-all duration-200 bg-white hover:shadow-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                    {userInitials}
                  </div>
                  <span className="text-sm font-semibold text-navy max-w-[100px] truncate">
                    {admin?.name || 'Admin'}
                  </span>
                  <span className="material-symbols-outlined text-gray-400 text-base rtl:rotate-180">expand_more</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute end-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-gray-100 bg-primary/5">
                      <p className="text-sm font-semibold text-navy truncate">{admin?.name || 'Admin'}</p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{admin?.email}</p>
                      <span className="inline-block mt-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">Administrator</span>
                    </div>
                    <div className="py-1.5">
                      <Link to={ROUTES.ADMIN_DASHBOARD}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-primary/5 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-base">dashboard</span>
                        Admin Dashboard
                      </Link>
                      <Link to={ROUTES.ADMIN_REQUESTS}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-primary/5 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-base">inbox</span>
                        View Requests
                      </Link>
                      <Link to={ROUTES.ADMIN_SETTINGS}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-primary/5 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-base">settings</span>
                        Settings
                      </Link>
                    </div>
                    <div className="border-t border-gray-100 py-1.5">
                      <button onClick={logout}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                        <span className="material-symbols-outlined text-base">logout</span>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className="lg:hidden ms-auto p-2 text-gray-500 hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-2xl">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg max-h-[min(85vh,calc(100dvh-4.25rem))] overflow-y-auto overscroll-y-contain">
          <div className="w-full px-6 xl:px-12 py-4 pb-6 flex flex-col gap-1" dir="auto">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? 'text-primary font-semibold'
                    : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                }`}
                style={isActive(link.to) ? { backgroundColor: 'rgba(0,170,255,0.08)' } : {}}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Auth */}
            <div className="border-t border-gray-100 mt-3 pt-4 flex flex-col gap-2">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {userInitials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy">{admin?.name || 'Admin'}</p>
                      <p className="text-xs text-gray-500">{admin?.email}</p>
                    </div>
                  </div>
                  <Link to={ROUTES.ADMIN_DASHBOARD} onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-primary font-semibold hover:bg-primary/5 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-base">dashboard</span>
                    Admin Dashboard
                  </Link>
                  <button
                    onClick={() => { logout(); setMenuOpen(false) }}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">logout</span>
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to={ROUTES.USER_LOGIN}
                    onClick={() => setMenuOpen(false)}
                    className="text-center py-3 rounded-xl border-2 border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-white transition-all duration-200"
                  >
                    {t('nav.sign_in')}
                  </Link>
                  <Link
                    to={ROUTES.USER_SIGNUP}
                    onClick={() => setMenuOpen(false)}
                    className="text-center py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-all duration-200"
                  >
                    {t('nav.sign_up')}
                  </Link>
                </>
              )}
            </div>

            {/* Mobile language — LTR control so locale order stays consistent in RTL layouts */}
            <div className="border-t border-gray-100 mt-4 pt-4" dir="ltr">
              <p className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400 mb-2.5">
                {t('nav.language')}
              </p>
              <div
                className="flex rounded-2xl bg-gray-100/90 p-1 gap-1 shadow-inner border border-gray-100"
                role="group"
                aria-label={t('nav.language')}
              >
                {LANGUAGE_CODES.map((code) => {
                  const active = language === code
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => { changeLanguage(code); setMenuOpen(false) }}
                      className={`flex-1 min-h-[44px] rounded-xl text-xs font-bold tracking-wide transition-all duration-200 ${
                        active
                          ? 'bg-white text-primary shadow-sm ring-1 ring-primary/20'
                          : 'text-gray-500 hover:text-gray-800 active:scale-[0.98]'
                      }`}
                      aria-pressed={active}
                    >
                      <span className="block text-[11px] font-extrabold text-gray-400 mb-0.5">
                        {languageShortLabel(code)}
                      </span>
                      <span className="block text-[13px] font-semibold leading-tight px-0.5 break-words" dir="auto">
                        {t(`nav.lang_${code}`)}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
