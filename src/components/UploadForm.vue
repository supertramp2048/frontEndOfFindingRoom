<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-xl font-bold text-gray-900 mb-6">Upload Schedule (Excel)</h2>

    <!-- Upload Area -->
    <div
      @dragover.prevent="dragOver = true"
      @dragleave.prevent="dragOver = false"
      @drop.prevent="handleDrop"
      :class="[
        'border-2 border-dashed rounded-lg p-8 text-center transition',
        dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      ]"
    >
      <div class="text-5xl mb-4">📁</div>
      <p class="text-gray-700 font-medium mb-2">Drag and drop your Excel file here</p>
      <p class="text-gray-500 text-sm mb-4">or</p>
      
      <input
        ref="fileInput"
        type="file"
        accept=".xlsx,.xls"
        @change="handleFileSelect"
        class="hidden"
      />
      
      <button
        type="button"
        @click="$refs.fileInput.click()"
        class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
      >
        Browse Files
      </button>

      <p class="text-gray-500 text-xs mt-4">Supported formats: .xlsx, .xls</p>
    </div>

    <!-- Selected File -->
    <div v-if="selectedFile" class="mt-6 p-4 bg-gray-50 rounded-lg">
      <p class="text-sm text-gray-600">Selected file:</p>
      <p class="text-lg font-bold text-gray-900">{{ selectedFile.name }}</p>
      <p class="text-sm text-gray-600 mt-1">{{ formatFileSize(selectedFile.size) }}</p>
    </div>

    <!-- Upload Button -->
    <button
      v-if="selectedFile"
      type="button"
      @click="handleUpload"
      :disabled="isLoading"
      class="w-full mt-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition"
    >
      <span v-if="!isLoading">⬆️ Upload</span>
      <span v-else>Uploading...</span>
    </button>

    <!-- Success Message -->
    <div v-if="successMessage" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
      <p class="text-green-800">✓ {{ successMessage }}</p>
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
      <p class="text-red-800">✗ {{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { scheduleAPI } from '../api/schedule'
import { useAppStore } from '../store'

const store = useAppStore()
const fileInput = ref(null)
const selectedFile = ref(null)
const dragOver = ref(false)
const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const handleFileSelect = (event) => {
  selectedFile.value = event.target.files[0]
  errorMessage.value = ''
}

const handleDrop = (event) => {
  dragOver.value = false
  const files = event.dataTransfer.files
  if (files.length > 0) {
    selectedFile.value = files[0]
    errorMessage.value = ''
  }
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

const handleUpload = async () => {
  if (!selectedFile.value) return

  isLoading.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const response = await scheduleAPI.uploadSchedule(selectedFile.value)
    successMessage.value = `✓ ${response.data.message} (${response.data.rows_imported} rows imported)`
    selectedFile.value = null
    fileInput.value.value = ''
    
    // Refresh stats
    await store.fetchStats()
  } catch (err) {
    errorMessage.value = err.message
  } finally {
    isLoading.value = false
  }
}
</script>
