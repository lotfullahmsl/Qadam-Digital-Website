// Contact info stored in localStorage so admin changes reflect immediately on the public site

const STORAGE_KEY = 'qadam_contact_info'

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
}

export function getContactInfo() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return { ...DEFAULT_CONTACT, ...JSON.parse(stored) }
  } catch {}
  return DEFAULT_CONTACT
}

export function saveContactInfo(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}
