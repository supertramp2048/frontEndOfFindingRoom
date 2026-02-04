<template>
  <form @submit.prevent="handleSearch" class="bg-white rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-bold text-gray-900 mb-6">Search Available Rooms</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
      <!-- Day -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Day of Week</label>
        <select
          v-model.number="form.thu"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">-- Select --</option>
          <option value="2">Monday (2)</option>
          <option value="3">Tuesday (3)</option>
          <option value="4">Wednesday (4)</option>
          <option value="5">Thursday (5)</option>
          <option value="6">Friday (6)</option>
          <option value="7">Saturday (7)</option>
        </select>
      </div>

      <!-- Start Session -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Start Session</label>
        <input
          v-model.number="form.tiet_bd"
          type="number"
          min="1"
          max="10"
          placeholder="e.g., 4"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <!-- End Session -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">End Session</label>
        <input
          v-model.number="form.tiet_kt"
          type="number"
          min="1"
          max="10"
          placeholder="e.g., 6"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <!-- Building -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Building</label>
        <select 
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        v-model="form.building">
          <option value="TA1">TA1</option>
          <option value="TA2">TA2</option>
        </select>
      </div>

      <!-- Min Continuous -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Min Continuous</label>
        <input
          v-model.number="form.min_continuous"
          type="number"
          min="1"
          placeholder="e.g., 2"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <!-- Date -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
        <input
          v-model="form.date"
          type="date"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
    </div>

    <button
      type="submit"
      :disabled="isLoading"
      class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition"
    >
      <span v-if="!isLoading">🔍 Search</span>
      <span v-else>Searching...</span>
    </button>
  </form>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['search'])

const form = reactive({
  thu: '',
  tiet_bd: 4,
  tiet_kt: 6,
  building: 'A1',
  min_continuous: 2,
  date: new Date().toISOString().slice(0,10)
})

// When date changes, auto-update `thu` (backend expects 2=Monday .. 7=Saturday)
watch(
  () => form.date,
  (newDate) => {
    if (!newDate) {
      form.thu = ''
      return
    }

    const d = new Date(newDate + 'T00:00:00')
    const jsDay = d.getDay() // 0 (Sun) - 6 (Sat)
    if (jsDay === 0) {
      // Sunday is not supported by backend (expects 2-7)
      // Clear thu and notify user
      form.thu = ''
      // show a non-blocking warning
      // (use alert for simplicity; can be replaced with inline UI later)
      setTimeout(() => {
        alert('Selected date falls on Sunday. Backend supports Monday-Saturday (2-7). Please choose another date.')
      }, 0)
    } else {
      // Map JS day to backend `thu`: Monday (1) -> 2, Tuesday (2) ->3, ... Saturday (6) ->7
      form.thu = jsDay + 1
    }
  },
  { immediate: true }
)

const handleSearch = () => {
  if (form.tiet_bd >= form.tiet_kt) {
    alert('Start session must be less than end session')
    return
  }
  if (!form.date) {
    alert('Please select a date')
    return
  }
  emit('search', { ...form })
}
</script>
