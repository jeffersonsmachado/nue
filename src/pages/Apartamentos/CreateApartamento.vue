<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApartamentosStore, type CriarApartamentoPayload } from '@/stores/useApartamentosStore';
import ApartamentosForm from '@/components/ApartamentosForm.vue';
import { getErrorMessage } from '@/utils/getErrorMessage';

const router = useRouter()
const store = useApartamentosStore()

const isSubmitting = ref(false)
const errorMessage = ref<string | null>(null)

const handleCriarApartamento = async (dadosPuros: CriarApartamentoPayload) => {
  isSubmitting.value = true
  errorMessage.value = null

  try {

    await store.criarApartamento(dadosPuros)

    router.push('/apartamentos')
  } catch (error) {
    getErrorMessage(error, 'Erro ao criar apartamento')
  } finally {
    isSubmitting.value = false
  }

}

const handleCancelar = () => {
  router.push('/apartamentos')
}

</script>

<template>

  <div class="create-container">
    <div class="header">
      <h2>Cadastrar novo Apartamento</h2>
    </div>
  </div>

  <div v-if="errorMessage" class="error-alert">
    {{ errorMessage }}
  </div>

  <ApartamentosForm :is-loading="isSubmitting" @submit="handleCriarApartamento" @cancel="handleCancelar" />

</template>

<style scoped>
.create-container {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.header {
  margin-bottom: 2rem;
}

.error-alert {
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}
</style>
