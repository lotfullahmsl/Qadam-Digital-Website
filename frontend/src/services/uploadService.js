import axios from 'axios'
import apiClient from '../utils/apiClient'

/** Same-origin API base (…/api) for public uploads without Authorization header. */
export function apiBaseUrl() {
  const base = import.meta.env.VITE_API_URL || '/api'
  if (base.startsWith('/')) {
    return typeof window !== 'undefined' ? `${window.location.origin}${base}`.replace(/\/$/, '') : '/api'
  }
  return base.replace(/\/$/, '')
}

/** API origin without trailing slash (for building absolute file URLs in the browser). */
export function apiOriginFromEnv() {
  const base = import.meta.env.VITE_API_URL || '/api'
  if (base.startsWith('/')) {
    return typeof window !== 'undefined' ? window.location.origin : ''
  }
  return base.replace(/\/?api\/?$/i, '')
}

export const uploadService = {
  upload: (file, onProgress) => {
    const formData = new FormData()
    formData.append('file', file)
    return apiClient.post('/upload', formData, {
      onUploadProgress: (e) => {
        if (onProgress && e.total) {
          onProgress(Math.round((e.loaded * 100) / e.total))
        }
      },
    })
  },

  /** Public attachment upload (no Authorization). Avoids invalid stored JWT breaking anonymous forms. */
  uploadPublic: (file, onProgress) => {
    const formData = new FormData()
    formData.append('file', file)
    return axios.post(`${apiBaseUrl()}/upload`, formData, {
      onUploadProgress: (e) => {
        if (onProgress && e.total) {
          onProgress(Math.round((e.loaded * 100) / e.total))
        }
      },
    })
  },

  publicFileUrl: (fileId) => `${apiOriginFromEnv()}/api/uploads/${fileId}`,

  fetchAdminFileBlob: async (fileId) => {
    const response = await apiClient.get(`/admin/uploads/${fileId}`, { responseType: 'blob' })
    return response.data
  },

  deleteById: (fileId) => apiClient.delete(`/admin/uploads/${fileId}`),
}
