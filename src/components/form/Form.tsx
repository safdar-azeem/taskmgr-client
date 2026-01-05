import React from 'react'
import { type IForm } from '@/types/form.types'
import { useForm } from '@/hooks/useForm'
import { getObjectValue } from '@/utils/form.utils'
import { FormField } from './FormField'

interface FormProps {
  schema: IForm[]
  initialValues?: any
  onSubmit: (values: any) => void
  children?: React.ReactNode
  className?: string
}

export const Form: React.FC<FormProps> = ({ schema, initialValues, onSubmit, children, className }) => {
  const { formValues, formErrors, updateValue, validate } = useForm(schema, initialValues)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(formValues)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="space-y-4">
        {schema.map((field) => {
          if (field.when && !field.when(formValues)) return null

          const value = getObjectValue(field.name, formValues)
          const error = formErrors[field.name]

          return (
            <FormField
              key={field.name}
              field={field}
              value={value}
              error={error}
              onChange={(val) => updateValue(field.name, val)}
            />
          )
        })}
      </div>
      <div className="mt-6">{children}</div>
    </form>
  )
}
