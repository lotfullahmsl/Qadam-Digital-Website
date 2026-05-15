import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { siteSettingsService } from '../services/siteSettingsService'

function settingsLangKey(code) {
  const base = String(code || 'en').split('-')[0].toLowerCase()
  if (base === 'ps' || base === 'fa') return base
  return 'en'
}

export const DEFAULT_CONTACT = {
  whatsapp: '+92 303 939 3438',
  whatsappLink: 'https://wa.me/923039393438',
  phone: '+92 777 241 173',
  email: 'Qadamdigital.official@gmail.com',
  location: 'Kabul, Afghanistan',
  facebook: '#',
  instagram: '#',
  linkedin: '#',
  youtube: '#',
  tiktok: '',
}

let cacheByLang = {}

function mapPublicToState(data) {
  if (!data) return { contact: DEFAULT_CONTACT, general: {} }
  const c = { ...DEFAULT_CONTACT, ...(data.contact || {}) }
  if (!c.whatsappLink && c.whatsapp) {
    const digits = String(c.whatsapp).replace(/\D/g, '')
    c.whatsappLink = digits ? `https://wa.me/${digits}` : DEFAULT_CONTACT.whatsappLink
  }
  return { contact: c, general: data.general || {} }
}

export function usePublicSettings() {
  const { i18n } = useTranslation()
  const langKey = settingsLangKey(i18n.language)

  const [data, setData] = useState(() =>
    cacheByLang[langKey] ? mapPublicToState(cacheByLang[langKey]) : null,
  )
  const [loading, setLoading] = useState(!cacheByLang[langKey])
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    const cached = cacheByLang[langKey]
    if (cached) {
      setData(mapPublicToState(cached))
      setLoading(false)
      setError(null)
      return
    }

    setData(null)
    setLoading(true)
    setError(null)

    siteSettingsService
      .getPublic()
      .then((r) => r.data)
      .then((raw) => {
        if (cancelled) return
        cacheByLang[langKey] = raw
        setData(mapPublicToState(raw))
        setLoading(false)
      })
      .catch((e) => {
        if (cancelled) return
        setError(e)
        setData(mapPublicToState(null))
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [langKey])

  return { data, loading, error }
}

export function useContactInfo() {
  const { data, loading, error } = usePublicSettings()
  return { contact: data?.contact || DEFAULT_CONTACT, general: data?.general, loading, error }
}

export function clearPublicSettingsCache() {
  cacheByLang = {}
}
