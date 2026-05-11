import apiClient from '../utils/apiClient'

export const uploadService = {
  upload: (file, onProgress) => {
    const formData = new FormData()
    formData.append('file', file)
    return apiClient.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (e) => {
        if (onProgress) {
          onProgress(Math.round((e.loaded * 100) / e.total))
        }
      },
    })
  },
}
