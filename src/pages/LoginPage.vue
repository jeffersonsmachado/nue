<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import { getErrorMessage } from '@/utils/getErrorMessage'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const senha = ref('')
const errorMessage = ref('')
const loading = ref(false)

const handleLogin = async () => {
  try {
    loading.value = true
    errorMessage.value = ''

    await authStore.login(email.value, senha.value)

    router.push('/apartamentos')
  } catch (error) {
    errorMessage.value = getErrorMessage(error, 'Erro ao fazer login. Verifique suas credenciais.')
  } finally {
    loading.value = false
  }
}

</script>

<template>

  <div class="login-wrapper">
    <form @submit.prevent="handleLogin" class="login-card">
      <h2>Direcional ERP</h2>

      <div v-if="errorMessage" class="error">
        {{ errorMessage }}
      </div>

      <div class="input-group">
        <label for="email">E-mail</label>
        <input id="email" v-model="email" type="email" required placeholder="Digite aqui seu email" />
      </div>

      <div class="input-group">
        <label for="senha">E-mail</label>
        <input id="senha" v-model="senha" type="password" required placeholder="Digite aqui sua senha" />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Entrando...' : 'Entrar' }}
      </button>
    </form>
  </div>

</template>


<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card {
  background-color: wheat;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0, 1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.75rem;
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

button:disabled {
  background-color: #ccc;
}

.error {
  color: #dc3545;
  font-size: 0.875rem;
}
</style>
