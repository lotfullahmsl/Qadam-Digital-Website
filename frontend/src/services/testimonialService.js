import apiClient from '../utils/apiClient'

export const testimonialService = {
  getAll: () => apiClient.get('/testimonials'),
}
