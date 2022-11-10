import { createRouter, createWebHistory } from 'vue-router'
import Menu from '../components/Menu.vue'
import Camera from '../components/Camera.vue'

const routes = [
  {
    path: "/",
    name: "Root",
    component: Menu,
  },
  {
    path: "/index.html",
    name: "Index",
    component: Menu,
  },
  {
    path: "/page/camera",
    name: "Camera",
    component: Camera,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
