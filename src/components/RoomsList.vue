<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-xl font-bold text-gray-900 mb-6">Available Rooms</h2>

    <!-- Empty State -->
    <div v-if="!data" class="text-center py-8">
      <p class="text-gray-500 text-lg">Use the form above to search for available rooms</p>
    </div>

    <!-- Loading -->
    <div v-else-if="isLoading" class="text-center py-8">
      <div class="inline-block">
        <div class="animate-spin">⏳</div>
        <p class="text-gray-600 mt-2">Searching...</p>
      </div>
    </div>

    <!-- Results -->
    <div v-else>
      <!-- Info Header -->
      <div class="bg-blue-50 rounded-lg p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <p class="text-sm text-gray-600">Day</p>
            <p class="text-lg font-bold text-gray-900">{{ getDayName(data.thu) }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Sessions</p>
            <p class="text-lg font-bold text-gray-900">{{ data.tiet }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Building</p>
            <p class="text-lg font-bold text-gray-900">{{ data.building }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Date</p>
            <p class="text-lg font-bold text-gray-900">{{ formatDate(data.date) }}</p>
          </div>
        </div>
      </div>

      <!-- Rooms List -->
      <div v-if="data.rooms && data.rooms.length > 0" class="space-y-3">
        <div
          v-for="(room, index) in data.rooms"
          :key="index"
          class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
        >
          <div class="flex items-center justify-between mb-3">
            <p class="text-lg font-bold text-gray-900">Room {{ room.room }}</p>
            <span class="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
              ✓ Available
            </span>
          </div>
          
          <div class="flex flex-wrap gap-2">
            <span
              v-for="slot in room.continuous_slots"
              :key="slot"
              class="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded"
            >
              Session {{ slot }}
            </span>
          </div>
        </div>
      </div>

      <!-- No Results -->
      <div v-else class="text-center py-8">
        <p class="text-gray-500 text-lg">❌ No available rooms found for these criteria</p>
      </div>

      <!-- Total -->
      <div class="mt-6 pt-4 border-t border-gray-200">
        <p class="text-sm text-gray-600">
          Found <strong>{{ data.rooms?.length || 0 }}</strong> available room(s)
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: null
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const getDayName = (day) => {
  const days = {
    2: 'Monday',
    3: 'Tuesday',
    4: 'Wednesday',
    5: 'Thursday',
    6: 'Friday',
    7: 'Saturday'
  }
  return days[day] || 'Unknown'
}

const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
  } catch (e) {
    return dateStr
  }
}
</script>
