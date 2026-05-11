import apiClient from '../utils/apiClient'

export const scholarshipService = {
  getAll: (params = {}) => apiClient.get('/scholarships', { params }),
  getById: (id) => apiClient.get(`/scholarships/${id}`),
  create: (data) => apiClient.post('/admin/scholarships', data),
  update: (id, data) => apiClient.put(`/admin/scholarships/${id}`, data),
  delete: (id) => apiClient.delete(`/admin/scholarships/${id}`),
}
