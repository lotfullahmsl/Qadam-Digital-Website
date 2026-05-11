export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export const isValidPhone = (phone) =>
  /^[+]?[\d\s\-()]{7,20}$/.test(phone)

export const isRequired = (value) =>
  value !== null && value !== undefined && String(value).trim() !== ''

export const minLength = (value, min) =>
  String(value).trim().length >= min

export const maxLength = (value, max) =>
  String(value).trim().length <= max

export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/jpg',
  'image/png',
]

export const MAX_FILE_SIZE_MB = 5

export const isValidFile = (file) => {
  if (!ALLOWED_FILE_TYPES.includes(file.type)) return false
  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) return false
  return true
}
