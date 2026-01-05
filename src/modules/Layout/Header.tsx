import { useAuthStore } from '@/store/useAuthStore'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { ThemeSwitch } from '@/components/ui/ThemeSwitch'
import { Bell } from 'lucide-react'

export const Header = () => {
  const user = useAuthStore((state) => state.user)

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 z-10 transition-colors duration-200">
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900 leading-tight">
            Welcome back, {user?.name?.split(' ')[0] || 'User'}!
          </h2>
          <p className="text-xs text-gray-500">Here is what's happening today.</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ThemeSwitch />

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-gray-500 hover:text-primary hover:bg-primary/10">
          <Bell className="h-5 w-5" />
        </Button>

        <div className="h-6 w-px bg-gray-200 mx-1"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold leading-none text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <Avatar
            src={user?.avatar}
            fallback={user?.name || 'U'}
            className="h-9 w-9 border-2 border-white shadow-sm ring-1 ring-gray-100"
          />
        </div>
      </div>
    </header>
  )
}
