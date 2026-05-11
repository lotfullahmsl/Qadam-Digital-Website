import React, { createContext, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

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
  }

  useEffect(() => {
    const saved = localStorage.getItem('i18nextLng') || 'en'
    changeLanguage(saved)
  }, [])

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
