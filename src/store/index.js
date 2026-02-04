import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { scheduleAPI } from '../api/schedule'
import { roomsAPI } from '../api/rooms'

export const useAppStore = defineStore('app', () => {
  // State
  const stats = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const availableRooms = ref(null)
  const roomStatus = ref(null)

  // Getters
  const hasStats = computed(() => stats.value !== null)
  const isLoading = computed(() => loading.value)
  const hasError = computed(() => error.value !== null)

  // Actions
  const fetchStats = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await scheduleAPI.getStats()
      stats.value = response.data
    } catch (err) {
      error.value = err.message
      stats.value = null
    } finally {
      loading.value = false
    }
  }

  const searchAvailableRooms = async (searchParams) => {
    loading.value = true
    error.value = null
    try {
      const response = await roomsAPI.getAvailableRooms(searchParams)
      availableRooms.value = response.data
    } catch (err) {
      error.value = err.message
      availableRooms.value = null
    } finally {
      loading.value = false
    }
  }

  const fetchRoomStatus = async (statusParams) => {
    loading.value = true
    error.value = null
    try {
      const response = await roomsAPI.getRoomStatus(statusParams)
      roomStatus.value = response.data
    } catch (err) {
      error.value = err.message
      roomStatus.value = null
    } finally {
      loading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  const clearRooms = () => {
    availableRooms.value = null
  }

  const clearRoomStatus = () => {
    roomStatus.value = null
  }

  return {
    stats,
    loading,
    error,
    availableRooms,
    roomStatus,
    hasStats,
    isLoading,
    hasError,
    fetchStats,
    searchAvailableRooms,
    fetchRoomStatus,
    clearError,
    clearRooms,
    clearRoomStatus
  }
})

