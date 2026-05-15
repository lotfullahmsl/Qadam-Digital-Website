/** Normalize CMS string or { en, ps, fa } for display and search. */
export function cmsText(value, fallback = '') {
  if (value == null || value === '') return fallback
  if (typeof value === 'string') return value
  if (typeof value === 'object' && !Array.isArray(value)) {
    const v = value.en ?? value.ps ?? value.fa
    if (v != null && String(v).trim()) return String(v)
    const first = Object.values(value).find((x) => x != null && String(x).trim())
    return first != null ? String(first) : fallback
  }
  return String(value)
}

export function cmsTextLower(value) {
  return cmsText(value, '').toLowerCase()
}
