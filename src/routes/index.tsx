import { ROUTES } from '@/constants'
import { Navigate } from 'react-router-dom'
import { authRoutes } from '@/modules/Auth/routes'
import { taskRoutes } from '@/modules/Tasks/routes'
import { teamRoutes } from '@/modules/Teams/routes'
import { MainLayout } from '@/modules/Layout/MainLayout'
import { dashboardRoutes } from '@/modules/Dashboard/routes'
import { AuthLayout } from '@/modules/Auth/components/AuthLayout'

export const routes = [
  {
    element: <AuthLayout />,
    children: authRoutes,
  },
  {
    element: <MainLayout />,
    children: [...dashboardRoutes, ...taskRoutes, ...teamRoutes],
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.HOME} replace />,
  },
]
