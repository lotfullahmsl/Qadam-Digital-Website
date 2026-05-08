import apiClient from '../utils/apiClient'

export const serviceRequestService = {
  submitContact: (data) => apiClient.post('/contact-requests', data),
  submitScholarshipApp: (data) => apiClient.post('/scholarship-applications', data),
  submitSubscription: (data) => apiClient.post('/subscription-requests', data),
  submitStudentReg: (data) => apiClient.post('/student-registrations', data),
  submitWebsiteProject: (data) => apiClient.post('/website-project-requests', data),
  submitDatabaseProject: (data) => apiClient.post('/database-project-requests', data),
  submitSocialMedia: (data) => apiClient.post('/social-media-requests', data),

  // Admin
  getAllRequests: (type, params = {}) => apiClient.get(`/admin/requests/${type}`, { params }),
  updateRequestStatus: (type, id, status) => apiClient.patch(`/admin/requests/${type}/${id}`, { status }),
}
