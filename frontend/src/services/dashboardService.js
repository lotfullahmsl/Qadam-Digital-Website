import apiClient from '../utils/apiClient'

export const dashboardService = {
  getStats: () => apiClient.get('/admin/dashboard/stats'),
  getRecentActivity: (params) => apiClient.get('/admin/dashboard/recent-activity', { params }),
  getRecentPosts: (params) => apiClient.get('/admin/dashboard/recent-posts', { params }),
}
