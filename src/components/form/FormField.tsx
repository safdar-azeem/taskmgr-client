import React from 'react'
import { Input } from './Input'
import { Select } from './Select'
import * as SelectComponents from './Selects'
import { type IForm } from '@/types/form.types'

interface FormFieldProps {
  field: IForm
  value: any
  error?: string
  onChange: (value: any) => void
}

export const FormField: React.FC<FormFieldProps> = ({ field, value, error, onChange }) => {
  const commonProps = {
    ...field,
    value: value ?? '',
    error,
    onChange,
  }

  const renderSelect = (SelectComponent) => <SelectComponent {...commonProps} />

  if (SelectComponents[field.type as any]) {
    return renderSelect(SelectComponents[field.type as any])
  }

  switch (field.type) {
    case 'select':
      return <Select {...commonProps} />

    case 'textarea':
    case 'text':
    case 'email':
    case 'password':
    case 'number':
    case 'date':
    default:
      return <Input {...commonProps} />
  }
}
