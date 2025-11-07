import { apiClient } from './api'
import { Transaction, CreateTransactionRequest, TransactionListResponse } from '@/types'

export const transactionService = {
  // Get all transactions
  getTransactions: async (page?: number, limit?: number) => {
    const response = await apiClient.get<TransactionListResponse>('/transactions', {
      params: {
        ...(page && { page }),
        ...(limit && { limit }),
      },
    })
    return response.data
  },

  // Get single transaction by ID
  getTransactionById: async (id: string) => {
    const response = await apiClient.get<{ status: boolean; data: Transaction }>(`/transactions/${id}`)
    return response.data
  },

  // Create new transaction
  createTransaction: async (items: Array<{ book_id: string; quantity: number }>) => {
    const response = await apiClient.post<{ status: boolean; message: string; data: Transaction }>('/transactions', {
      items,
    })
    return response.data
  },

  // Get transaction statistics
  getStatistics: async () => {
    const response = await apiClient.get<any>('/transactions/statistics/all')
    return response.data
  },
}

