<template>
  <div class="bg-blue-50 rounded-lg p-6 mb-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Schedules Card -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm font-medium">Total Schedules</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">
              {{ stats?.total_schedules || 0 }}
            </p>
          </div>
          <div class="text-4xl text-blue-500">📅</div>
        </div>
      </div>

      <!-- Buildings Card -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm font-medium">Total Buildings</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">
              {{ stats?.total_buildings || 0 }}
            </p>
          </div>
          <div class="text-4xl text-green-500">🏢</div>
        </div>
      </div>

      <!-- Rooms Card -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm font-medium">Total Rooms</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">
              {{ stats?.total_rooms || 0 }}
            </p>
          </div>
          <div class="text-4xl text-purple-500">🚪</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: {
    type: Object,
    default: null
  }
})
</script>
