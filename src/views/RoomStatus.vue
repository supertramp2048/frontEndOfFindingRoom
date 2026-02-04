<template>
  <div class="min-h-screen bg-gray-100">
    <Header />
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Error Alert -->
      <div v-if="store.hasError" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-red-800">❌ {{ store.error }}</p>
        <button
          @click="store.clearError()"
          class="mt-2 text-red-600 hover:text-red-800 text-sm font-medium"
        >
          Dismiss
        </button>
      </div>

      <!-- Filter Section -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-xl font-bold text-gray-900 mb-4">Room Status - Real-time View</h2>
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
          <!-- Date -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              v-model="filterDate"
              type="date"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Time Period -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
            <select
              v-model="filterPeriod"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1-3">1 - 3 (Morning)</option>
              <option value="4-6">4 - 6 (Late Morning)</option>
              <option value="7-9">7 - 9 (Afternoon)</option>
              <option value="10-12">10 - 12 (Evening)</option>
            </select>
          </div>

          <!-- Building Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Building</label>
            <!-- <input
              v-model="filterBuilding"
              type="text"
              placeholder="e.g., TA1"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> -->
            <select 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            v-model="fetchRoomStatus">
                <option value="TA1">TA1</option>
                <option value="TA2">TA2</option>
            </select>
          </div>

          <!-- Buttons -->
          <div class="flex flex-col justify-end gap-2">
            <button
              @click="loadRoomStatus"
              :disabled="store.isLoading"
              class="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition"
            >
              <span v-if="!store.isLoading">🔄 Search</span>
              <span v-else>Loading...</span>
            </button>
          </div>

          <!-- Reset Button -->
          <div class="flex flex-col justify-end">
            <button
              @click="resetFilters"
              class="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition"
            >
              ↺ Reset
            </button>
          </div>
        </div>
      </div>

      <!-- Room Diagram -->
      <RoomDiagram
        :data="store.roomStatus"
        :isLoading="store.isLoading"
        :error="store.error"
      />

      <!-- Info Section -->
      <div class="bg-white rounded-lg shadow p-6 mt-8">
        <h3 class="text-lg font-bold text-gray-900 mb-4">📌 Information</h3>
        <div class="space-y-2 text-gray-700 text-sm">
          <p>• <strong>Green (✓ Free):</strong> Room is available for booking</p>
          <p>• <strong>Red (✗ Occupied):</strong> Room is currently in use by a class</p>
          <p>• Use the filter to view specific buildings, dates, and time periods</p>
          <p>• <strong>Start Session & End Session:</strong> Select the time range to check room availability</p>
          <p>• This view shows real-time room status for your selected criteria</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Header from '../components/Header.vue'
import RoomDiagram from '../components/RoomDiagram.vue'
import { useAppStore } from '../store'

const store = useAppStore()

// Filters
const filterBuilding = ref('')
const filterDate = ref('')
const filterPeriod = ref('1-3')

// Initialize with current date
const initializeFilters = () => {
  const today = new Date()
  filterDate.value = today.toISOString().slice(0, 10)
  filterPeriod.value = '1-3'
}

const loadRoomStatus = async () => {
  // Validate
  if (!filterDate.value) {
    alert('Please select a date')
    return
  }

  // Parse period
  const [tietBatDau, tietKetThuc] = filterPeriod.value.split('-').map(Number)

  const params = {
    date: filterDate.value,
    tiet_bat_dau: tietBatDau,
    tiet_ket_thuc: tietKetThuc
  }

  // Add building if specified
  if (filterBuilding.value) {
    params.building = filterBuilding.value
  }

  // Get day of week from date
  const date = new Date(filterDate.value + 'T00:00:00')
  const jsDay = date.getDay()
  const thu = jsDay === 0 ? 2 : jsDay + 1 // Default to Monday if Sunday

  if (thu) {
    params.thu = thu
  }

  await store.fetchRoomStatus(params)
}

const resetFilters = () => {
  filterBuilding.value = ''
  initializeFilters()
  loadRoomStatus()
}

onMounted(() => {
  initializeFilters()
  loadRoomStatus()
})
</script>
