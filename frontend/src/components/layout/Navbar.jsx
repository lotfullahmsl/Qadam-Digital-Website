import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../../hooks/useLanguage'
import { useAuth } from '../../hooks/useAuth'
import { ROUTES } from '../../constants/routes'

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'ps', label: 'PS' },
  { code: 'fa', label: 'DA' },
]

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
    { label: 'Scholarships', to: ROUTES.SCHOLARSHIPS },
    { label: 'Services', to: ROUTES.SERVICES },
    { label: 'Digital Solutions', to: ROUTES.WEBSITE_DATABASE },
    { label: 'Pricing', to: ROUTES.PRICING },
    { label: 'Portfolio', to: ROUTES.PORTFOLIO },
    { label: 'Blog', to: ROUTES.BLOG },
    { label: 'About Us', to: ROUTES.ABOUT },
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
          <Link to={ROUTES.HOME} className="flex items-center gap-3 flex-shrink-0 mr-10">
            <img
              src="/logo-dark.jpeg"
              alt="QADAM Digital"
              className="h-12 w-auto object-contain"
            />
            <span className="font-heading font-bold text-navy text-xl tracking-tight">
              QADAM <span className="text-primary">Digital</span>
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
          <div className="hidden lg:flex items-center gap-3 ml-6 flex-shrink-0">

            {/* Language Switcher */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => { setLangOpen(!langOpen); setUserMenuOpen(false) }}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-primary px-3 py-2 rounded-lg hover:bg-primary/5 transition-all duration-200"
              >
                <span className="material-symbols-outlined text-base">language</span>
                {LANGUAGES.find((l) => l.code === language)?.label || 'EN'}
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-50 min-w-[90px]">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { changeLanguage(lang.code); setLangOpen(false) }}
                      className={`flex items-center gap-2 w-full px-4 py-2.5 text-sm font-medium transition-colors ${
                        language === lang.code
                          ? 'text-primary bg-primary/8 font-semibold'
                          : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                      }`}
                      style={language === lang.code ? { backgroundColor: 'rgba(0,170,255,0.08)' } : {}}
                    >
                      {language === lang.code && (
                        <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      )}
                      {lang.label}
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
                  Sign In
                </Link>
                <Link
                  to={ROUTES.USER_SIGNUP}
                  className="text-sm font-semibold bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-primary-dark transition-all duration-200 shadow-sm"
                  style={{ boxShadow: '0 2px 8px rgba(0,170,255,0.3)' }}
                >
                  Sign Up Free
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
                  <span className="material-symbols-outlined text-gray-400 text-base">expand_more</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden z-50">
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
            className="lg:hidden ml-auto p-2 text-gray-500 hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-2xl">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="w-full px-6 xl:px-12 py-4 flex flex-col gap-1">
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
                    Sign In
                  </Link>
                  <Link
                    to={ROUTES.USER_SIGNUP}
                    onClick={() => setMenuOpen(false)}
                    className="text-center py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-all duration-200"
                  >
                    Sign Up Free
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Language */}
            <div className="border-t border-gray-100 mt-2 pt-3 flex gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { changeLanguage(lang.code); setMenuOpen(false) }}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold tracking-widest uppercase transition-colors ${
                    language === lang.code
                      ? 'bg-primary text-white'
                      : 'border border-gray-200 text-gray-500 hover:border-primary hover:text-primary'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
