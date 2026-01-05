import { api } from '@/lib/axios'
import type { Task, CreateTaskPayload } from '@/types'

export const TaskService = {
  getAll: async (params?: any) => {
    const response = await api.get<{
      data: { tasks: Task[] }
      pageInfo: {
        currentPage: number
        totalPages: number
        totalItems: number
        limit: number
        hasNextPage: boolean
        hasPrevPage: boolean
      }
    }>('/tasks', { params })
    return response.data
  },

  getOne: async (id: string) => {
    const response = await api.get<{ data: { task: Task } }>(`/tasks/${id}`)
    return response.data.data.task
  },

  getStats: async () => {
    const response = await api.get<{ data: { stats: any[] } }>('/tasks/stats')
    return response.data.data.stats
  },

  create: async (data: CreateTaskPayload) => {
    const response = await api.post<{ data: { task: Task } }>('/tasks', data)
    return response.data.data.task
  },

  update: async (id: string, data: Partial<CreateTaskPayload>) => {
    const response = await api.put<{ data: { task: Task } }>(`/tasks/${id}`, data)
    return response.data.data.task
  },

  delete: async (id: string) => {
    await api.delete(`/tasks/${id}`)
  },
}
