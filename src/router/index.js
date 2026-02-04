import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import FindRooms from '../views/FindRooms.vue'
import UploadSchedule from '../views/UploadSchedule.vue'
import RoomStatus from '../views/RoomStatus.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/find-rooms',
    name: 'FindRooms',
    component: FindRooms
  },
  {
    path: '/room-status',
    name: 'RoomStatus',
    component: RoomStatus
  },
  {
    path: '/upload',
    name: 'UploadSchedule',
    component: UploadSchedule
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
