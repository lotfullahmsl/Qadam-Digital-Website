import apiClient from '../utils/apiClient'

export const portfolioService = {
  getAll: (params = {}) => apiClient.get('/portfolio-projects', { params }),
}
