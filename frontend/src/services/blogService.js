import apiClient from '../utils/apiClient'

export const blogService = {
  getAll: (params = {}) => apiClient.get('/blogs', { params }),
  getBySlug: (slug) => apiClient.get(`/blogs/${slug}`),
  create: (data) => apiClient.post('/admin/blogs', data),
  update: (id, data) => apiClient.put(`/admin/blogs/${id}`, data),
  delete: (id) => apiClient.delete(`/admin/blogs/${id}`),
}
