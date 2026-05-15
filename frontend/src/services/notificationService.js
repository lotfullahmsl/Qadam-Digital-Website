import apiClient from '../utils/apiClient'

export const notificationService = {
  list: (params = {}) => apiClient.get('/admin/notifications', { params }),
  markRead: (id) => apiClient.patch(`/admin/notifications/${id}/read`),
}
