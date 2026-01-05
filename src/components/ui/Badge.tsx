import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'outline' | 'secondary' | 'danger' | 'success' | 'warning' | 'info'
  className?: string
}

export const Badge = ({ children, variant = 'default', className }: BadgeProps) => {
  const variants = {
    default: 'bg-gray-900 text-white border-transparent hover:bg-gray-800',
    secondary: 'bg-gray-100 text-gray-900 border-transparent hover:bg-gray-200',
    outline: 'text-gray-950 border-gray-200',
    danger: 'bg-danger-light text-danger border-danger-light border',
    success: 'bg-success-light text-success border-success-light border',
    warning: 'bg-warning-light text-warning-fg border-warning-light border',
    info: 'bg-info-light text-info border-info-light border',
  }

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2',
        variants[variant],
        className
      )}>
      {children}
    </div>
  )
}
