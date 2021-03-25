import React, { useContext } from 'react'

export const useContextCreator = (name: string, context: React.Context<any>) => {
  const ctx = useContext(context)
  if (ctx === undefined) {
    new Error(`use${name}Context nested in ${name}ContextProvider`)
  }
  return ctx
}