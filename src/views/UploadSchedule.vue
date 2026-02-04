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

      <!-- Upload Form -->
      <UploadForm />
    </main>
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import UploadForm from '../components/UploadForm.vue'
import { useAppStore } from '../store'

const store = useAppStore()
</script>
