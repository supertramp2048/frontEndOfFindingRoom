import client from './client'

export const roomsAPI = {
  // Get available rooms
  getAvailableRooms: (params) => {
    return client.get('/rooms/available', { params })
  },

  // Get room status for current time
  getRoomStatus: (params) => {
    return client.get('/rooms/status', { params })
  }
}
