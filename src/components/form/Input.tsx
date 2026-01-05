import React from 'react'
import { cn } from '@/lib/utils'
import { type IForm } from '@/types/form.types'

interface InputProps extends IForm {
  onChange: (value: any) => void
}

export const Input: React.FC<InputProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  value,
  error,
  disabled,
  onChange,
  className,
}) => {
  const baseInputStyles = cn(
    'flex w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',
    error && 'border-danger focus:ring-danger/10 focus:border-danger'
  )

  return (
    <div className={cn('w-full space-y-1', className)}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {type === 'textarea' ? (
          <textarea
            id={name}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className={cn(baseInputStyles, 'min-h-[100px] resize-y')}
          />
        ) : (
          <input
            id={name}
            type={type as any}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className={cn(baseInputStyles, 'h-10')}
          />
        )}
      </div>
      {error && <span className="text-xs font-medium text-danger">{error}</span>}
    </div>
  )
}
