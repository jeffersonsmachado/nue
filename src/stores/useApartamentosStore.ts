import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '@/libs/api'
import { getErrorMessage } from '@/utils/getErrorMessage'

interface Apartamento {
  id: string
  numero: string
  bloco: string
  andar: number
  area: number
  valor: number
  status: 'Disponivel' | 'Reservado' | 'Vendido'
}

export interface CriarApartamentoPayload {
  numero: string
  bloco: string
  andar: number
  area: number
  valor: number
}

export const useApartamentosStore = defineStore('apartamentos', () => {
  const apartamentos = ref<Apartamento[]>([])
  const isLoading = ref(false)

  const filtroBloco = ref('')
  const filtroNumero = ref('')

  const pageNumber = ref(1)
  const pageSize = ref(2)
  const totalItems = ref(0)

  const totalDisponiveis = ref(0)

  const totalPages = computed(() => Math.max(1, Math.ceil(totalItems.value / pageSize.value)))

  const fetchApartamentos = async () => {
    isLoading.value = true

    try {
      const params: Record<string, string | number> = {
        pageNumber: pageNumber.value,
        pageSize: pageSize.value,
      }

      if (filtroBloco.value.trim()) {
        params.bloco = filtroBloco.value.trim()
      }

      if (filtroNumero.value.trim()) {
        params.numero = filtroNumero.value.trim()
      }

      const response = await api.get('/apartamentos', { params })
      apartamentos.value = response.data?.items || []

      totalItems.value = response.data?.totalCount || 0
    } catch (error) {
      getErrorMessage(error, 'Erro ao buscar apartamentos')
    } finally {
      isLoading.value = false
    }
  }

  const fetchTotalDisponiveis = async () => {
    try {
      const params = {
        pageNumber: 1,
        pageSize: 1,
      }

      const response = await api.get('/apartamentos/disponiveis', { params })

      totalDisponiveis.value = response.data?.totalCount || 0
    } catch (error) {
      getErrorMessage(error, 'Erro ao buscar apartamentos')
    }
  }

  const aplicarFiltros = () => {
    pageNumber.value = 1
    fetchApartamentos()
  }

  const irParaPagina = (novaPagina: number) => {
    if (novaPagina >= 1 && novaPagina <= totalPages.value) {
      pageNumber.value = novaPagina
      fetchApartamentos()
    }
  }

  const carregarPaginaCompleta = async () => {
    await Promise.all([fetchApartamentos(), fetchTotalDisponiveis()])
  }

  const criarApartamento = async (payload: CriarApartamentoPayload) => {
    try {
      await api.post('/apartamentos', payload)
    } catch (error) {
      getErrorMessage(error, 'Erro ao criar apartamento')
    }
  }

  return {
    apartamentos,
    isLoading,
    filtroBloco,
    filtroNumero,
    pageNumber,
    pageSize,
    totalItems,
    totalPages,
    totalDisponiveis,
    fetchApartamentos,
    fetchTotalDisponiveis,
    carregarPaginaCompleta,
    aplicarFiltros,
    irParaPagina,
    criarApartamento,
  }
})
