import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../../hooks/useLanguage'
import { useUserAuth } from '../../hooks/useUserAuth'
import { ROUTES } from '../../constants/routes'

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'ps', label: 'PS' },
  { code: 'fa', label: 'DA' },
]

export default function Navbar() {
  const { t } = useTranslation()
  const { language, changeLanguage } = useLanguage()
  const { user, isLoggedIn, logoutUser } = useUserAuth()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdowns on route change
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
    { label: t('nav.portfolio'), to: ROUTES.PORTFOLIO },
    { label: t('nav.blog'), to: ROUTES.BLOG },
    { label: t('nav.about'), to: ROUTES.ABOUT },
  ]

  const isActive = (path) => location.pathname === path

  const userInitials = user?.fullName
    ? user.fullName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U'

  return (
    <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md border-b border-border' : 'bg-white/95 backdrop-blur-sm border-b border-border'
    }`}>
      <div className="flex justify-between items-center px-6 py-3.5 max-w-screen-xl mx-auto">
        {/* Brand */}
        <Link to={ROUTES.HOME} className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-lg">school</span>
          </div>
          <span className="font-heading text-xl font-bold text-navy tracking-tight">
            QADAM <span className="text-primary">Digital</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-0.5 items-center">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive(link.to)
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-text-secondary hover:bg-primary-pale hover:text-primary'
              }`}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex gap-2 items-center">
          {/* Language Switcher */}
          <div className="relative">
            <button onClick={() => { setLangOpen(!langOpen); setUserMenuOpen(false) }}
              className="flex items-center gap-1 text-xs font-semibold tracking-widest uppercase text-text-secondary hover:text-primary border border-border rounded-full px-3 py-1.5 hover:border-primary transition-all duration-200">
              <span className="material-symbols-outlined text-sm">language</span>
              {LANGUAGES.find((l) => l.code === language)?.label || 'EN'}
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-border rounded-xl shadow-card-hover overflow-hidden z-50 min-w-[80px]">
                {LANGUAGES.map((lang) => (
                  <button key={lang.code} onClick={() => { changeLanguage(lang.code); setLangOpen(false) }}
                    className={`block w-full text-left px-4 py-2.5 text-xs font-semibold tracking-widest uppercase transition-colors ${
                      language === lang.code ? 'text-primary bg-primary/10' : 'text-text-secondary hover:text-primary hover:bg-primary-pale'
                    }`}>
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Auth Buttons or User Menu */}
          {isLoggedIn ? (
            <div className="relative">
              <button onClick={() => { setUserMenuOpen(!userMenuOpen); setLangOpen(false) }}
                className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-border hover:border-primary transition-all duration-200 bg-white">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">
                  {userInitials}
                </div>
                <span className="text-sm font-medium text-navy hidden sm:block max-w-[100px] truncate">
                  {user?.fullName?.split(' ')[0] || 'Account'}
                </span>
                <span className="material-symbols-outlined text-text-muted text-base">expand_more</span>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-border rounded-2xl shadow-card-hover overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-border bg-primary-pale">
                    <p className="text-sm font-semibold text-navy truncate">{user?.fullName}</p>
                    <p className="text-xs text-text-muted truncate">{user?.email}</p>
                  </div>
                  <div className="py-1">
                    {[
                      { icon: 'dashboard', label: 'My Dashboard', to: ROUTES.USER_DASHBOARD },
                      { icon: 'school', label: 'My Applications', to: ROUTES.SCHOLARSHIPS },
                      { icon: 'person', label: 'Profile Settings', to: '#' },
                    ].map((item) => (
                      <Link key={item.label} to={item.to}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:bg-primary-pale hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-base">{item.icon}</span>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-border py-1">
                    <button onClick={logoutUser}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                      <span className="material-symbols-outlined text-base">logout</span>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link to={ROUTES.USER_LOGIN}
                className="text-sm font-semibold text-navy hover:text-primary px-4 py-2 rounded-lg hover:bg-primary-pale transition-all duration-200">
                Sign In
              </Link>
              <Link to={ROUTES.USER_SIGNUP}
                className="text-sm font-semibold bg-primary text-white px-4 py-2 rounded-lg shadow-btn hover:bg-primary-dark transition-all duration-200">
                Sign Up Free
              </Link>
            </div>
          )}

          {/* WhatsApp CTA — desktop only */}
          <a href="https://wa.me/93700000000" target="_blank" rel="noopener noreferrer"
            className="hidden xl:flex items-center gap-1.5 bg-green-500 text-white text-xs font-semibold tracking-wide uppercase px-4 py-2.5 rounded-lg hover:bg-green-600 transition-all duration-200">
            <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>

          {/* Mobile Hamburger */}
          <button className="lg:hidden text-text-secondary hover:text-primary transition-colors p-1"
            onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span className="material-symbols-outlined text-2xl">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-border px-6 py-4 flex flex-col gap-1 shadow-lg">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}
              className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.to) ? 'bg-primary/10 text-primary font-semibold' : 'text-text-secondary hover:bg-primary-pale hover:text-primary'
              }`}>
              {link.label}
            </Link>
          ))}
          <div className="border-t border-border mt-2 pt-3 flex flex-col gap-2">
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">{userInitials}</div>
                  <div>
                    <p className="text-sm font-semibold text-navy">{user?.fullName}</p>
                    <p className="text-xs text-text-muted">{user?.email}</p>
                  </div>
                </div>
                <button onClick={() => { logoutUser(); setMenuOpen(false) }}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <span className="material-symbols-outlined text-base">logout</span>
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to={ROUTES.USER_LOGIN} onClick={() => setMenuOpen(false)}
                  className="text-center py-2.5 rounded-lg border-2 border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-white transition-all duration-200">
                  Sign In
                </Link>
                <Link to={ROUTES.USER_SIGNUP} onClick={() => setMenuOpen(false)}
                  className="text-center py-2.5 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-all duration-200">
                  Sign Up Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
