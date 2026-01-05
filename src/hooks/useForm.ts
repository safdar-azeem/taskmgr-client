import { useState, useEffect } from 'react'
import { type IForm, type IFormValues, type IFormErrors } from '@/types/form.types'
import { updateNestedProperty, getObjectValue } from '@/utils/form.utils'
import { removeExtraProperties } from '@/utils/object.utils'

export function useForm(formSchema: IForm[], initialData: any = {}) {
  const initializeValues = () => {
    const values: IFormValues = { ...initialData }
    formSchema.forEach((field) => {
      if (values[field.name] === undefined) {
        values[field.name] = field.value || ''
      }
    })
    return removeExtraProperties(values, ['__typename'])
  }

  const [formValues, setFormValues] = useState<IFormValues>(initializeValues())
  const [formErrors, setFormErrors] = useState<IFormErrors>({})

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormValues((prev) => ({ ...prev, ...initialData }))
    }
  }, [initialData])

  const updateValue = (name: string, value: any) => {
    setFormValues((prev) => updateNestedProperty(name, prev, value))
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = (): boolean => {
    const errors: IFormErrors = {}
    let isValid = true

    formSchema.forEach((field) => {
      if (field.when && !field.when(formValues)) return

      const value = getObjectValue(field.name, formValues)

      if (field.required && !value && value !== 0) {
        errors[field.name] = `${field.label || field.name} is required`
        isValid = false
      } else if (field.validation) {
        const errorMsg = field.validation(value)
        if (errorMsg) {
          errors[field.name] = errorMsg
          isValid = false
        }
      }
    })

    setFormErrors(errors)
    return isValid
  }

  return {
    formValues,
    formErrors,
    updateValue,
    validate,
    setFormValues,
  }
}
