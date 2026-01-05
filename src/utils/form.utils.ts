import { type IFormValues } from '@/types/form.types'

export const updateNestedProperty = (name: string, object: Record<string, any>, value: any): Record<string, any> => {
  const keys = name.split('.')
  const newObject = { ...object }

  let currentObj = newObject
  if (keys.length === 1) {
    currentObj[keys[0]] = value
    return newObject
  }

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (!currentObj[key]) {
      currentObj[key] = {}
    }
    currentObj = currentObj[key]
  }

  const lastKey = keys[keys.length - 1]
  currentObj[lastKey] = value

  return newObject
}

export const getObjectValue = (name: string | undefined, form: IFormValues): any => {
  if (!name) return undefined
  if (!name.includes('.')) return form[name]

  const keys = name.split('.')
  let currentObj = form
  for (const key of keys) {
    if (currentObj && typeof currentObj === 'object' && key in currentObj) {
      currentObj = currentObj[key]
    } else {
      return undefined
    }
  }
  return currentObj
}
