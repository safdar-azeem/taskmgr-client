export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  VERIFY_OTP: '/verify-otp',
  DASHBOARD: '/dashboard',
  TASKS: '/tasks',
  TEAMS: '/teams',
} as const

export const TASK_STATUS_COLORS: Record<string, string> = {
  todo: 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-transparent',
  'in-progress': 'bg-info-light text-info hover:bg-info-light/80 border-transparent',
  review: 'bg-warning-light text-warning-fg hover:bg-warning-light/80 border-transparent',
  done: 'bg-success-light text-success hover:bg-success-light/80 border-transparent',
}

export const TASK_PRIORITY_COLORS: Record<string, string> = {
  low: 'text-gray-500',
  medium: 'text-warning',
  high: 'text-danger font-semibold',
}
