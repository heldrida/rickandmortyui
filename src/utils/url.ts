import { getKeys } from './object'

export const querySearchTerms = <T extends Record<string, any>>(data: T) => {
  let qs = ""
  const keys = getKeys(data)
  qs = keys.filter(key => data[key])
      .map(key => `${key}=${encodeURI(data[key])}`)
      .join('&')
  return qs
}