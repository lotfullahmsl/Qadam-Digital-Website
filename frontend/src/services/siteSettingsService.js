import apiClient from '../utils/apiClient'

export const siteSettingsService = {
  getPublic: () => apiClient.get('/settings/public'),
  getAdmin: () => apiClient.get('/admin/settings'),
  updateAdmin: (payload) => apiClient.put('/admin/settings', payload),
}
