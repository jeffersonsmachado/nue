<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';
import { useAuthStore } from './stores/useAuthStore';

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <header v-if="authStore.isAuthenticated" class="app-header">
    <div class="header-brand">
      <span>Direcional ERP</span>
    </div>

    <div class="header-profile">
      <span class="user-name"> {{ authStore.perfil || 'Usuário' }}</span>
      <button @click="handleLogout" class="logout-button">Sair</button>
    </div>
  </header>
  <main class="app-content">
    <RouterView />
  </main>
</template>

<style>
/* Estilos globais mantidos */
body {
  margin: 0;
  font-family: 'Courier New', Courier, monospace;
  background-color: indianred;
  color: #fff;
}

/* Estilos do Cabeçalho */
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 1rem 2rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.header-brand {
  font-weight: bold;
  font-size: 1.2rem;
}

.header-profile {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.user-name {
  font-size: 0.9rem;
}

.logout-button {
  background-color: transparent;
  border: 1px solid #fff;
  color: #fff;
  font-family: 'Courier New', Courier, monospace;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.logout-button:hover {
  background-color: #fff;
  color: indianred;
  font-weight: bold;
}

/* Espaçamento do conteúdo principal */
.app-content {
  padding: 2rem;
}
</style>
