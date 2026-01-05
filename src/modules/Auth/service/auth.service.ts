import { api } from '@/lib/axios'
import type { AuthResponse, LoginPayload, RegisterPayload } from '@/types'

export const AuthService = {
  login: async (data: LoginPayload) => {
    const response = await api.post<AuthResponse>('/auth/login', data)
    return response.data
  },

  register: async (data: RegisterPayload) => {
    const response = await api.post<AuthResponse>('/auth/register', data)
    return response.data
  },

  verifyOTP: async (data: { email: string; otp: string }) => {
    const response = await api.post<AuthResponse>('/auth/verify-otp', data)
    return response.data
  },

  getMe: async () => {
    const response = await api.get<{ data: { user: any } }>('/auth/me')
    return response.data.data.user
  },

  logout: async () => {
    await api.post('/auth/logout')
  },
}
