import apiClient from '../utils/apiClient'

export const userAuthService = {
  signup: (data) => apiClient.post('/auth/user/signup', data),
  login: (credentials) => apiClient.post('/auth/user/login', credentials),
  logout: () => apiClient.post('/auth/user/logout'),
  me: () => apiClient.get('/auth/user/me'),
}
