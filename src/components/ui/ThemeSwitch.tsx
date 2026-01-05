import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface ThemeSwitchProps {
  className?: string
  variant?: 'ghost' | 'secondary' | 'outline'
}

export const ThemeSwitch = ({ className, variant = 'ghost' }: ThemeSwitchProps) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant={variant}
      size="icon"
      onClick={toggleTheme}
      className={cn(
        'rounded-full transition-all duration-300',
        theme === 'dark'
          ? 'text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10'
          : 'text-gray-500 hover:text-primary hover:bg-primary/10',
        className
      )}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
      {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
