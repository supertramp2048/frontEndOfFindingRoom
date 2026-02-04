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

      <!-- Stats Section -->
      <div v-if="store.hasStats" class="mb-8">
        <StatsCard :stats="store.stats" />
        <div class="text-center mt-4">
          <button
            @click="refreshStats"
            :disabled="store.isLoading"
            class="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            🔄 Refresh Stats
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-else-if="store.isLoading" class="text-center py-12">
        <div class="inline-block">
          <div class="animate-spin text-4xl">⏳</div>
          <p class="text-gray-600 mt-4">Loading...</p>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <router-link
          to="/find-rooms"
          class="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg shadow p-6 transition transform hover:scale-105"
        >
          <div class="text-4xl mb-3">🔍</div>
          <h3 class="text-xl font-bold">Find Rooms</h3>
          <p class="text-blue-100 mt-2">Search for available classrooms</p>
        </router-link>

        <router-link
          to="/room-status"
          class="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg shadow p-6 transition transform hover:scale-105"
        >
          <div class="text-4xl mb-3">📊</div>
          <h3 class="text-xl font-bold">Room Status</h3>
          <p class="text-purple-100 mt-2">View room status diagram</p>
        </router-link>

        <router-link
          to="/upload"
          class="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg shadow p-6 transition transform hover:scale-105"
        >
          <div class="text-4xl mb-3">📁</div>
          <h3 class="text-xl font-bold">Upload Schedule</h3>
          <p class="text-green-100 mt-2">Import schedule from Excel</p>
        </router-link>
      </div>

      <!-- Info Section -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-bold text-gray-900 mb-4">📚 How to Use</h2>
        <div class="space-y-4 text-gray-700">
          <p>
            <strong>1. Upload Schedule:</strong> Go to the Upload section and import your schedule Excel file
          </p>
          <p>
            <strong>2. Check Stats:</strong> View the total schedules, buildings, and rooms loaded
          </p>
          <p>
            <strong>3. Find Available Rooms:</strong> Use filters to find empty classrooms for specific time slots
          </p>
          <p>
            <strong>4. View Results:</strong> See a list of available rooms with continuous empty sessions
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAppStore } from '../store'
import Header from '../components/Header.vue'
import StatsCard from '../components/StatsCard.vue'

const store = useAppStore()

onMounted(() => {
  store.fetchStats()
})

const refreshStats = () => {
  store.fetchStats()
}
</script>
