<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useApartamentosStore } from '@/stores/useApartamentosStore';

const apartamentosStore = useApartamentosStore();

const {
  apartamentos,
  isLoading,
  filtroBloco,
  filtroNumero,
  pageNumber,
  totalPages,
  totalDisponiveis
} = storeToRefs(apartamentosStore)

const { carregarPaginaCompleta, aplicarFiltros, irParaPagina } = apartamentosStore

onMounted(() => {
  carregarPaginaCompleta()
})

</script>

<template>
  <div class="apartamentos-container">
    <header class="header">
      <h2>Lista de Apartamentos</h2>
      <p>Unidades disponíveis: <strong> {{ totalDisponiveis }}</strong></p>
    </header>

    <div class="toolbar">
      <input type="text" v-model="filtroBloco" class="search-input" placeholder="Buscar por bloco..."
        @keyup.enter="aplicarFiltros">
    </div>
    <div class="toolbar">
      <input type="text" v-model="filtroNumero" class="search-input" placeholder="Buscar por número..."
        @keyup.enter="aplicarFiltros">
    </div>

    <button class="btn-secondary" @click="aplicarFiltros" :disabled="isLoading">
      Filtrar
    </button>

    <router-link to="/apartamentos/novo" class="btn-primary">
      + Novo Apartamento
    </router-link>

    <div class="loading" v-if="isLoading">
      Carregando...
    </div>

    <div class="grid" v-else>
      <div class="card" v-for="apt in apartamentos" :key="apt.id">
        <div class="card-title">Bloco {{ apt.bloco }} - Apto {{ apt.numero }}</div>
        <div class="card-body">
          <p>Valor: R$ {{ apt.valor.toFixed(2) }}</p>
          <span :class="['badge', apt.status === 'Disponivel' ? 'badge-success' : 'badge-warning']">
            {{ apt.status }}
          </span>
        </div>
      </div>
    </div>

    <div class="empty" v-if="!isLoading && apartamentos.length === 0">
      Nenhum apartamento encontrado
    </div>

    <div class="pagination-bar" v-if="totalPages > 1">
      <button class="btn-page" :disabled="pageNumber === 1 || isLoading" @click="irParaPagina(1)">
        &laquo; Primeira
      </button>
      <button class="btn-page" :disabled="pageNumber === 1 || isLoading" @click="irParaPagina(pageNumber - 1)">
        &lsaquo; Anterior
      </button>

      <span class="page-info">Página <strong>{{ pageNumber }}</strong> de <strong>{{ totalPages }}</strong></span>

      <button class="btn-page" :disabled="pageNumber === totalPages || isLoading" @click="irParaPagina(pageNumber + 1)">
        Próxima &rsaquo;
      </button>

      <button class="btn-page" :disabled="pageNumber === totalPages || isLoading" @click="irParaPagina(totalPages)">
        Última &raquo;
      </button>
    </div>

  </div>
</template>


<style scoped>
.apartamentos-container {
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.filters {
  display: flex;
  gap: 0.5rem;
}

.search-input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-width: 200px;
}

.btn-primary {
  background: #0056b3;
  color: white;
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 4px;
}

.btn-secondary {
  background: #e0e0e0;
  color: #333;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-secondary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.card-title {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.badge {
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
}

.badge-success {
  background: #d4edda;
  color: #155724;
}

.badge-warning {
  background: #fff3cd;
  color: #856404;
}

.empty,
.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.1rem;
}

/* Estilos de Paginação */
.pagination-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.btn-page {
  padding: 0.5rem 1rem;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-page:hover:not(:disabled) {
  background-color: #f4f4f9;
  border-color: #0056b3;
}

.btn-page:disabled {
  background-color: #f9f9f9;
  color: #ccc;
  cursor: not-allowed;
}

.page-info {
  font-size: 0.95rem;
  color: #555;
}
</style>
