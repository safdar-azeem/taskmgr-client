export interface User {
  _id: string
  name: string
  email: string
  role: 'member' | 'lead' | 'admin'
  avatar?: string
}

export interface Team {
  _id: string
  name: string
  description?: string
  members: User[]
  createdBy: User | string
  createdAt: string
  updatedAt: string
}

export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high'

export interface Task {
  _id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  assignedTo?: User
  teamId: Team | string
  dueDate?: string
  createdBy: User | string
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  status: string
  token: string
  data?: {
    user: User
  }
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface CreateTaskPayload {
  title: string
  description?: string
  status?: TaskStatus
  priority?: TaskPriority
  teamId: string
  assignedTo?: string
  dueDate?: string
}
