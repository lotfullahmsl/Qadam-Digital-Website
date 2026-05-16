import React, { createContext, useState, useEffect, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { clearPublicApiCache } from '../utils/apiClient'

export const LanguageContext = createContext()

const RTL_LANGS = ['ps', 'fa']

export function LanguageProvider({ children }) {
  const { i18n } = useTranslation()
  const [language, setLanguage] = useState(i18n.language || 'en')

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
    setLanguage(lang)
    document.documentElement.lang = lang
    document.documentElement.dir = RTL_LANGS.includes(lang) ? 'rtl' : 'ltr'
    localStorage.setItem('i18nextLng', lang)
    clearPublicApiCache()
  }

  useEffect(() => {
    const saved = localStorage.getItem('i18nextLng') || 'en'
    changeLanguage(saved)
  }, [])

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, dir: RTL_LANGS.includes(language) ? 'rtl' : 'ltr' }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
