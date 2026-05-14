import apiClient from '../utils/apiClient'

export const pricingService = {
  getAll: (params = {}) => apiClient.get('/pricing-packages', { params }),
}
