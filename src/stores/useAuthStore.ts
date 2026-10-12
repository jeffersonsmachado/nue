import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../libs/api'

export const useAuthStore = defineStore('auth', () => {
  // Estados
  const token = ref<string | null>(localStorage.getItem('token'))
  const perfil = ref<string | null>(localStorage.getItem('perfil'))
  const isAuthenticated = ref<boolean>(!!token.value)

  // Actions
  const login = async (email: string, senha: string) => {
    const response = await api.post('/usuarios/auth/login', { email, senha })
    console.log(response.data.token)
    const { token: jwt, perfil: userRole } = response.data.token

    token.value = jwt
    perfil.value = userRole
    isAuthenticated.value = true

    localStorage.setItem('token', jwt)
    localStorage.setItem('perfil', userRole)
  }

  const logout = () => {
    token.value = null
    perfil.value = null
    isAuthenticated.value = false

    localStorage.removeItem('token')
    localStorage.removeItem('perfil')
  }

  return {
    token,
    perfil,
    isAuthenticated,
    login,
    logout,
  }
})
