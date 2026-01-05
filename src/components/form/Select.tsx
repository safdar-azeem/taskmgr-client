import React from 'react'
import { cn } from '@/lib/utils'
import { type IForm } from '@/types/form.types'
import { ChevronDown } from 'lucide-react'

interface SelectProps extends IForm {
  onChange: (value: any) => void
}

export const Select: React.FC<SelectProps> = ({
  name,
  label,
  options = [],
  value,
  error,
  disabled,
  onChange,
  className,
}) => {
  return (
    <div className={cn('w-full space-y-1', className)}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={name}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'flex h-10 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 transition-all focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',
            error && 'border-danger focus:ring-danger/10 focus:border-danger'
          )}>
          <option value="" disabled>
            Select an option
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
      {error && <span className="text-xs font-medium text-danger">{error}</span>}
    </div>
  )
}
