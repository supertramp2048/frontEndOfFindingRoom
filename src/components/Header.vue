<template>
  <header class="sticky top-0 z-50 bg-white shadow">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <h1 class="text-2xl font-bold text-blue-600">🏫 Room Finder</h1>
        </div>
        
        <ul class="flex space-x-8">
          <li>
            <router-link
              to="/"
              class="text-gray-700 hover:text-blue-600 font-medium transition"
              :class="{ 'text-blue-600 border-b-2 border-blue-600': $route.path === '/' }"
            >
              Dashboard
            </router-link>
          </li>
          <li>
            <router-link
              to="/find-rooms"
              class="text-gray-700 hover:text-blue-600 font-medium transition"
              :class="{ 'text-blue-600 border-b-2 border-blue-600': $route.path === '/find-rooms' }"
            >
              Find Rooms
            </router-link>
          </li>
          <li>
            <router-link
              to="/room-status"
              class="text-gray-700 hover:text-blue-600 font-medium transition"
              :class="{ 'text-blue-600 border-b-2 border-blue-600': $route.path === '/room-status' }"
            >
              Room Status
            </router-link>
          </li>
          <li>
            <router-link
              to="/upload"
              class="text-gray-700 hover:text-blue-600 font-medium transition"
              :class="{ 'text-blue-600 border-b-2 border-blue-600': $route.path === '/upload' }"
            >
              Upload
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
</script>
