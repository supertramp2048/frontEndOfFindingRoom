<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="mb-6">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Room Status Diagram</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 bg-blue-50 rounded-lg p-4">
        <div>
          <p class="text-sm text-gray-600">Date</p>
          <p class="text-lg font-bold text-gray-900">{{ formatDate(currentDate) }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-600">Day</p>
          <p class="text-lg font-bold text-gray-900">{{ getDayName(currentData.thu) }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-600">Current Session</p>
          <p class="text-lg font-bold text-gray-900">{{ currentData.tiet_bat_dau }}-{{ currentData.tiet_ket_thuc }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-600">Total Rooms</p>
          <p class="text-lg font-bold text-gray-900">{{ filteredRooms.length }}</p>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="text-center py-12">
      <div class="inline-block">
        <div class="animate-spin text-4xl">⏳</div>
        <p class="text-gray-600 mt-4">Loading room status...</p>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-600 text-lg">❌ {{ error }}</p>
    </div>

    <!-- Building Diagram -->
    <div v-else>
      <!-- Building Selector -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">Select Building</label>
        <select
          v-model="selectedBuilding"
          class="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- All Buildings --</option>
          <option v-for="building in uniqueBuildings" :key="building" :value="building">
            {{ building }}
          </option>
        </select>
      </div>

      <!-- Legend -->
      <div class="mb-6 flex flex-wrap gap-4">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 bg-green-100 border-2 border-green-600 rounded"></div>
          <span class="text-sm font-medium">Free (Trống)</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 bg-red-100 border-2 border-red-600 rounded"></div>
          <span class="text-sm font-medium">Occupied (Đang sử dụng)</span>
        </div>
      </div>

      <!-- Rooms Grid -->
      <div v-if="filteredRooms.length > 0" class="space-y-8">
        <div
          v-for="building in getGroupedBuildings()"
          :key="building.name"
          class="border border-gray-300 rounded-lg p-6"
        >
          <h3 class="text-lg font-bold text-gray-900 mb-4">Building {{ building.name }}</h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <div
              v-for="room in building.rooms"
              :key="room.room"
              :class="getRoomStatusClass(room.status)"
              class="p-4 rounded-lg border-2 transition-all hover:shadow-lg cursor-pointer text-center group relative"
              @click="selectedRoom = room"
            >
              <p class="text-sm font-bold">{{ room.room }}</p>
              <p class="text-xs text-gray-600 mt-1">{{ getStatusBadge(room.status) }}</p>
              
              <!-- Tooltip on hover -->
              <div v-if="room.status === 'occupied'" class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-50 w-48 bg-gray-800 text-white text-xs rounded p-3 pointer-events-none">
                <p class="font-semibold">{{ room.monHoc }}</p>
                <p class="text-gray-300">Lớp: {{ room.lop }}</p>
                <p class="text-gray-300">Tiết: {{ room.tiet }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Results -->
      <div v-else class="text-center py-8">
        <p class="text-gray-500 text-lg">❌ No rooms found</p>
      </div>

      <!-- Summary -->
      <div v-if="filteredRooms.length > 0" class="mt-8 pt-6 border-t border-gray-200">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-green-50 p-4 rounded-lg">
            <p class="text-sm text-gray-600">Free Rooms</p>
            <p class="text-2xl font-bold text-green-600">
              {{ filteredRooms.filter(r => r.status === 'free').length }}
            </p>
          </div>
          <div class="bg-red-50 p-4 rounded-lg">
            <p class="text-sm text-gray-600">Occupied Rooms</p>
            <p class="text-2xl font-bold text-red-600">
              {{ filteredRooms.filter(r => r.status === 'occupied').length }}
            </p>
          </div>
        </div>
      </div>

      <!-- Room Details Modal -->
      <div v-if="selectedRoom" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-2xl font-bold text-gray-900">Room {{ selectedRoom.room }}</h3>
            <button
              @click="selectedRoom = null"
              class="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>
          </div>

          <div class="space-y-3">
            <div>
              <p class="text-sm text-gray-600">Status</p>
              <p :class="getStatusClass(selectedRoom.status)" class="text-lg font-bold">
                {{ getStatusText(selectedRoom.status) }}
              </p>
            </div>

            <div v-if="selectedRoom.status === 'occupied'">
              <p class="text-sm text-gray-600">Course</p>
              <p class="text-base font-medium text-gray-900">{{ selectedRoom.monHoc }}</p>
            </div>

            <div v-if="selectedRoom.status === 'occupied'">
              <p class="text-sm text-gray-600">Class</p>
              <p class="text-base font-medium text-gray-900">{{ selectedRoom.lop }}</p>
            </div>

            <div v-if="selectedRoom.status === 'occupied'">
              <p class="text-sm text-gray-600">Lecturer</p>
              <p class="text-base font-medium text-gray-900">{{ selectedRoom.giangVien }}</p>
            </div>

            <div v-if="selectedRoom.status === 'occupied'">
              <p class="text-sm text-gray-600">Session</p>
              <p class="text-base font-medium text-gray-900">{{ selectedRoom.tiet }}</p>
            </div>

            <div v-if="selectedRoom.status === 'occupied'">
              <p class="text-sm text-gray-600">Course Code</p>
              <p class="text-base font-medium text-gray-900">{{ selectedRoom.maHp }}</p>
            </div>

            <div>
              <p class="text-sm text-gray-600">Building</p>
              <p class="text-base font-medium text-gray-900">{{ selectedRoom.building }}</p>
            </div>
          </div>

          <button
            @click="selectedRoom = null"
            class="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    default: null
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: null
  }
})

const selectedBuilding = ref('')
const selectedRoom = ref(null)
const currentDate = ref(new Date().toISOString().slice(0, 10))

const currentData = computed(() => {
  if (!props.data) {
    return {
      thu: getTodayDayNumber(),
      tiet_bat_dau: 1,
      tiet_ket_thuc: 10
    }
  }
  return props.data
})

const uniqueBuildings = computed(() => {
  if (!props.data?.rooms) return []
  const buildings = [...new Set(props.data.rooms.map(r => r.building))]
  return buildings.sort()
})

const filteredRooms = computed(() => {
  if (!props.data?.rooms) return []
  if (!selectedBuilding.value) return props.data.rooms
  return props.data.rooms.filter(r => r.building === selectedBuilding.value)
})

const getGroupedBuildings = () => {
  const grouped = {}
  filteredRooms.value.forEach(room => {
    if (!grouped[room.building]) {
      grouped[room.building] = { name: room.building, rooms: [] }
    }
    grouped[room.building].rooms.push(room)
  })
  return Object.values(grouped).sort((a, b) => a.name.localeCompare(b.name))
}

const getRoomStatusClass = (status) => {
  const classes = {
    free: 'bg-green-100 border-green-600 hover:bg-green-200',
    occupied: 'bg-red-100 border-red-600 hover:bg-red-200'
  }
  return classes[status] || classes.free
}

const getStatusClass = (status) => {
  const classes = {
    free: 'text-green-600',
    occupied: 'text-red-600'
  }
  return classes[status] || 'text-gray-600'
}

const getStatusBadge = (status) => {
  const badges = {
    free: '✓ Free',
    occupied: '✗ Occupied'
  }
  return badges[status] || status
}

const getStatusText = (status) => {
  const texts = {
    free: 'Free (Trống)',
    occupied: 'Occupied (Đang sử dụng)'
  }
  return texts[status] || status
}

const getDayName = (day) => {
  const days = {
    2: 'Monday (Thứ 2)',
    3: 'Tuesday (Thứ 3)',
    4: 'Wednesday (Thứ 4)',
    5: 'Thursday (Thứ 5)',
    6: 'Friday (Thứ 6)',
    7: 'Saturday (Thứ 7)'
  }
  return days[day] || 'Unknown'
}

const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('vi-VN', { 
    weekday: 'short',
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  })
}

const getTodayDayNumber = () => {
  const today = new Date()
  const jsDay = today.getDay()
  return jsDay === 0 ? '' : jsDay + 1 // Map to backend format (2-7)
}

const getCurrentSession = () => {
  const now = new Date()
  const hour = now.getHours()
  
  // Assuming 1 session = 1.5 hours, starting from 6:00 AM
  // Session 1: 6:00-7:30, Session 2: 7:30-9:00, etc.
  const startHour = 6
  const sessionLength = 1.5
  
  if (hour < startHour) return 1
  const sessionNum = Math.floor((hour - startHour) / sessionLength) + 1
  return Math.min(sessionNum, 10) // Max 10 sessions
}
</script>
