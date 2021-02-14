import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1.vue')
      },
      {
        path: 'create',
        component: () => import('@/views/Create.vue')
      },
      {
        path: 'list',
        component: () => import('@/views/List.vue')
      },
      {
        path: 'scan',
        component: () => import('@/views/Scan.vue')
      },
      {
        path: 'history',
        component: () => import('@/views/History.vue')
      },
      {
        path: 'schedule',
        component: () => import('@/views/Schedule.vue')
      },
      {
        path: 'about',
        component: () => import('@/views/About.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3.vue')
      } 
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
