import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT token to every request if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token') || localStorage.getItem('user_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle 401 globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAdminRequest = error.config?.url?.includes('/admin') || error.config?.url?.includes('/auth/me')
    if (error.response?.status === 401 && isAdminRequest) {
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_data')
      window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  }
)

export default apiClient
