import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
})

/** In-memory GET cache for public endpoints (dedupes navigation + fast repeat visits). */
const publicGetCache = new Map()
const CLIENT_PUBLIC_CACHE_MS = Number(import.meta.env.VITE_PUBLIC_CACHE_MS) || 45_000

/** Sync with i18n / LanguageContext — backend accepts en | ps | fa (Phase 8). */
export function getPublicApiLang() {
  try {
    const raw = localStorage.getItem('i18nextLng') || 'en'
    const base = String(raw).split('-')[0].toLowerCase()
    if (base === 'ps' || base === 'fa') return base
    return 'en'
  } catch {
    return 'en'
  }
}

/** Paths (after optional /api prefix) that support ?lang= for localized CMS content. */
const LANG_PUBLIC_PREFIXES = [
  'scholarships',
  'blogs',
  'pricing-packages',
  'portfolio-projects',
  'services',
  'testimonials',
  'settings/public',
  'ads',
]

export function normalizedRequestPath(url) {
  let path = String(url || '').split('?')[0]
  if (path.startsWith('http')) {
    try {
      path = new URL(path).pathname
    } catch {
      return ''
    }
  }
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1)
  const parts = path.split('/').filter(Boolean)
  if (parts[0] === 'api') parts.shift()
  return parts.length ? `/${parts.join('/')}` : '/'
}

function stableQuery(params) {
  if (!params || typeof params !== 'object') return ''
  const keys = Object.keys(params).sort()
  return keys.map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(String(params[k]))}`).join('&')
}

function publicGetCacheKey(config) {
  const base = (config.baseURL || '').replace(/\/$/, '')
  const rel = String(config.url || '').replace(/^\//, '')
  const pathPart = rel.split('?')[0]
  const fullPath = `${base}/${pathPart}`.replace(/([^:]\/)\/+/g, '$1')
  const q = stableQuery(config.params)
  return q ? `${fullPath}?${q}` : fullPath
}

function shouldAttachLang(config) {
  const method = (config.method || 'get').toLowerCase()
  if (method !== 'get') return false
  const norm = normalizedRequestPath(config.url)
  if (norm === '/') return false
  return (
    LANG_PUBLIC_PREFIXES.some((p) => norm === `/${p}` || norm.startsWith(`/${p}/`)) ||
    norm.startsWith('/seo/')
  )
}

function isClientCacheablePublicGet(config) {
  if (config.cache === false) return false
  if ((config.method || 'get').toLowerCase() !== 'get') return false
  const u = String(config.url || '')
  if (u.includes('/admin') || u.includes('/auth')) return false
  const norm = normalizedRequestPath(config.url)
  if (norm === '/') return false
  return (
    LANG_PUBLIC_PREFIXES.some((p) => norm === `/${p}` || norm.startsWith(`/${p}/`)) ||
    norm.startsWith('/seo/')
  )
}

/** Clear client-side GET cache (call after admin publishes or language reset if needed). */
export function clearPublicApiCache() {
  publicGetCache.clear()
}

// Attach JWT token to every request if available
apiClient.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type']
  }
  const token = localStorage.getItem('admin_token') || localStorage.getItem('user_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  if (shouldAttachLang(config)) {
    const params = { ...(config.params || {}) }
    if (params.lang === undefined || params.lang === null || params.lang === '') {
      params.lang = getPublicApiLang()
      config.params = params
    }
  }

  if (isClientCacheablePublicGet(config)) {
    const key = publicGetCacheKey(config)
    const hit = publicGetCache.get(key)
    if (hit && hit.expires > Date.now()) {
      config.adapter = () =>
        Promise.resolve({
          data: hit.data,
          status: 200,
          statusText: 'OK',
          headers: { 'x-client-cache': 'hit' },
          config,
          request: {},
        })
    }
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => {
    const { config } = response
    if (
      isClientCacheablePublicGet(config) &&
      response.status === 200 &&
      !(response.headers && response.headers['x-client-cache'] === 'hit')
    ) {
      const key = publicGetCacheKey(config)
      publicGetCache.set(key, { data: response.data, expires: Date.now() + CLIENT_PUBLIC_CACHE_MS })
    }
    return response
  },
  (e) => Promise.reject(e),
)

// Handle 401 globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAdminRequest = error.config?.url?.includes('/admin') || error.config?.url?.includes('/auth/me')
    if (error.response?.status === 401 && isAdminRequest) {
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_data')
      window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  }
)

export default apiClient
