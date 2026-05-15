import apiClient from '../utils/apiClient'

export const adsService = {
  getByPlacement: (placement) => apiClient.get('/ads', { params: { placement } }),
  listAdmin: (params) => apiClient.get('/admin/ads', { params }),
  create: (data) => apiClient.post('/admin/ads', data),
  update: (id, data) => apiClient.put(`/admin/ads/${id}`, data),
  updateStatus: (id, status) => apiClient.patch(`/admin/ads/${id}/status`, { status }),
  remove: (id) => apiClient.delete(`/admin/ads/${id}`),
}
