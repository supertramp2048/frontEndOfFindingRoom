import client from './client'

export const scheduleAPI = {
  // Upload schedule file
  uploadSchedule: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    
    return client.post('/schedule/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  // Get schedule statistics
  getStats: () => {
    return client.get('/schedule/stats')
  }
}
