import i18n from '../i18n'

function normalizeUiLang(lang) {
  if (!lang) return 'en'
  const base = String(lang).split('-')[0].toLowerCase()
  if (base === 'ps' || base === 'fa') return base
  return 'en'
}

function pickI18nString(mapping, lang) {
  const lng = normalizeUiLang(lang)
  for (const code of [lng, 'en', 'ps', 'fa']) {
    const v = mapping[code]
    if (v != null && String(v).trim()) return String(v)
  }
  const first = Object.values(mapping).find((x) => x != null && String(x).trim())
  return first != null ? String(first) : ''
}

/** Normalize CMS string or { en, ps, fa } for the active UI language (syncs with ?lang= API). Digits stay Western (0–9). */
export function cmsText(value, fallback = '') {
  if (value == null || value === '') return fallback
  const lang = i18n.language || i18n.resolvedLanguage || 'en'

  if (typeof value === 'string') return value
  if (typeof value === 'object' && !Array.isArray(value)) {
    const keys = Object.keys(value)
    const looksI18n = keys.some((k) => ['en', 'ps', 'fa'].includes(k))
    if (looksI18n) {
      const out = pickI18nString(value, lang)
      return out || fallback
    }
  }
  return String(value)
}

export function cmsTextLower(value) {
  return cmsText(value, '').toLowerCase()
}
