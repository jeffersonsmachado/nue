<script setup lang="ts">
import { ref } from 'vue'
import type { CriarApartamentoPayload } from '@/stores/useApartamentosStore';

const props = defineProps<{
  isLoading: boolean;
  initialData?: Partial<CriarApartamentoPayload>;
}>();

const emit = defineEmits<{
  (e: 'submit', data: CriarApartamentoPayload): void;
  (e: 'cancel'): void
}>()

const formData = ref<CriarApartamentoPayload>({
  numero: props.initialData?.numero || '',
  bloco: props.initialData?.bloco || '',
  andar: props.initialData?.andar || 1,
  area: props.initialData?.area || 0,
  valor: props.initialData?.valor || 0
})

const handleSubmit = () => {
  emit('submit', formData.value)
}

</script>

<template>

  <form @submit.prevent="handleSubmit" class="form-card">
    <div class="input-group">
      <label for="bloco">Bloco</label>
      <input id="bloco" v-model="formData.bloco" type="text" required placeholder="Digite o bloco..." />
    </div>
    <div class="input-group">
      <label for="numero">Número</label>
      <input id="numero" v-model="formData.numero" type="text" required placeholder="Digite o número..." />
    </div>

    <div class="row">
      <div class="input-group">
        <label for="area">Área (m²)</label>
        <input id="area" v-model.number="formData.area" type="number" step="0.01" required />
      </div>
      <div class="input-group">
        <label for="valor">Valor (R$)</label>
        <input id="valor" v-model.number="formData.valor" type="number" step="0.01" required>
      </div>
    </div>

    <div class="actions">
      <button type="button" class="btn-secondary" @click="emit('cancel')" :disabled="isLoading">
        Cancelar
      </button>
      <button type="submit" class="btn-primary" :disabled="isLoading">
        {{ isLoading ? 'Salvando...' : 'Salvar Apartamento' }}
      </button>
    </div>
  </form>

</template>

<style scoped>
.form-card {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.row {
  display: flex;
  gap: 1rem;
}

.input-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.input-group label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-primary {
  background: #0056b3;
  color: white;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-secondary {
  background: #e0e0e0;
  color: #333;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
