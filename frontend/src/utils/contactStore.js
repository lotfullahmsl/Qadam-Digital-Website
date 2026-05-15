import { DEFAULT_CONTACT } from '../hooks/usePublicSettings'

const STORAGE_KEY = 'qadam_contact_info'

export { DEFAULT_CONTACT }

/** @deprecated Prefer API via useContactInfo(); kept for legacy reads. */
export function getContactInfo() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return { ...DEFAULT_CONTACT, ...JSON.parse(stored) }
  } catch {
    /* ignore */
  }
  return DEFAULT_CONTACT
}

/** @deprecated Server-side settings replace localStorage persistence. */
export function saveContactInfo(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}
