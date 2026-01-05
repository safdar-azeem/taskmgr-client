import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, CheckSquare, Users, LogOut, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/constants'
import { useAuthStore } from '@/store/useAuthStore'
import { Button } from '@/components/ui/Button'

export const Sidebar = () => {
  const { pathname } = useLocation()
  const logout = useAuthStore((state) => state.logout)

  const links = [
    { href: ROUTES.HOME, label: 'Dashboard', icon: LayoutDashboard },
    { href: ROUTES.TASKS, label: 'My Tasks', icon: CheckSquare },
    { href: ROUTES.TEAMS, label: 'Teams', icon: Users },
  ]

  return (
    <div className="flex h-full w-64 flex-col border-r border-gray-200 bg-white z-20">
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <div className="flex items-center gap-2 text-primary">
          <Layers className="h-6 w-6" />
          <h1 className="text-xl font-bold tracking-tight text-gray-900">TaskMgr</h1>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-6">
        <nav className="space-y-1 px-3">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Menu</p>
          {links.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary-light text-primary-fg-light shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}>
                <Icon className={cn('h-5 w-5', isActive ? 'text-primary' : 'text-gray-400')} />
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="border-t border-gray-200 px-3 py-2 bg-gray-50/50">
        <Button
          variant="danger"
          className="w-full justify-start gap-3 bg-transparent border-none text-danger"
          onClick={logout}>
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
      </div>
    </div>
  )
}
