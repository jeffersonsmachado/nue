import LoginPage from '@/pages/LoginPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: { requiresGuest: true },
    },
    {
      path: '/apartamentos',
      name: 'apartamentos',
      component: () => import('../pages/ApartamentosIndex.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/apartamentos/novo',
      name: 'novo-apartamento',
      component: () => import('../pages/Apartamentos/CreateApartamento.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to) => {
  const isAuthenticaded = !!localStorage.getItem('token')

  if (to.meta.requiresAuth && !isAuthenticaded) {
    return '/login'
  } else if (to.meta.requiresGuest && isAuthenticaded) {
    return '/apartamentos'
  } else {
    return
  }
})

export default router
