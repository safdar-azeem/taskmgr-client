import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, label, error, id, ...props }, ref) => {
  const inputId = id || React.useId()

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={cn(
          'flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/10 focus-visible:border-primary disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',
          error && 'border-danger focus-visible:ring-danger/10 focus-visible:border-danger',
          className
        )}
        ref={ref}
        {...props}
      />
      {error && <p className="text-xs font-medium text-danger">{error}</p>}
    </div>
  )
})
Input.displayName = 'Input'

export { Input }
