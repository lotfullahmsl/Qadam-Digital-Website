import apiClient from '../utils/apiClient'

const adminContentService = {
  getAll: (resource, params = {}) => apiClient.get(`/admin/${resource}`, { params }),
  getById: (resource, id) => apiClient.get(`/admin/${resource}/${id}`),
  create: (resource, data) => apiClient.post(`/admin/${resource}`, data),
  update: (resource, id, data) => apiClient.put(`/admin/${resource}/${id}`, data),
  updateStatus: (resource, id, status) => apiClient.patch(`/admin/${resource}/${id}/status`, { status }),
  delete: (resource, id) => apiClient.delete(`/admin/${resource}/${id}`),
}

export default adminContentService
