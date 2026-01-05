import { api } from '@/lib/axios'
import type { Team } from '@/types'

export const TeamService = {
  getAll: async (params?: any) => {
    const response = await api.get<{
      data: { teams: Team[] }
      pageInfo: {
        currentPage: number
        totalPages: number
        totalItems: number
        limit: number
        hasNextPage: boolean
        hasPrevPage: boolean
      }
    }>('/teams', { params })
    return response.data
  },

  create: async (data: { name: string; description?: string; members?: string[] }) => {
    const response = await api.post<{ data: { team: Team } }>('/teams', data)
    return response.data.data.team
  },

  update: async (id: string, data: Partial<{ name: string; description: string }>) => {
    const response = await api.put<{ data: { team: Team } }>(`/teams/${id}`, data)
    return response.data.data.team
  },

  addMember: async (teamId: string, userId: string) => {
    const response = await api.post<{ data: { team: Team } }>(`/teams/${teamId}/members`, { userId })
    return response.data.data.team
  },
}
