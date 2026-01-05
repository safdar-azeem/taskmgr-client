export function removeExtraProperties(data: any, propertiesToRemove: string[]): any {
  if (typeof data !== 'object' || data === null) {
    return data
  }

  const filteredData: any = Array.isArray(data) ? [...data] : { ...data }

  Object.keys(filteredData).forEach((key) => {
    if (propertiesToRemove.includes(key)) {
      delete filteredData[key]
    } else {
      filteredData[key] = removeExtraProperties(filteredData[key], propertiesToRemove)
    }
  })

  return filteredData
}
