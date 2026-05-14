import apiClient from '../utils/apiClient'

export const serviceContentService = {
  getAll: (params = {}) => apiClient.get('/services', { params }),
}
