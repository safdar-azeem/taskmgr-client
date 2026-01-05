export type InputVariant = 'default' | 'outline' | 'solid'

export type IFormType = 'text' | 'email' | 'password' | 'number' | 'date' | 'textarea' | 'select' | 'checkbox' | String

export interface IFormOption {
  label: string
  value: string | number
}

export interface IForm {
  name: string
  label?: string
  type?: IFormType
  placeholder?: string
  className?: string
  value?: any
  required?: boolean
  disabled?: boolean
  readonly?: boolean
  options?: IFormOption[]
  error?: string
  validation?: (value: any) => string
  when?: (values: any) => boolean
}

export interface IFormValues {
  [key: string]: any
}

export interface IFormErrors {
  [key: string]: string
}
