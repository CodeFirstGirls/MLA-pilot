'use client'
import React, { createContext, useReducer, ReactNode } from 'react'

const initialContext = {
  update: 0,
  forceUpdate: () => {},
}

type UpdateContextValuesType = {
  update: number
}

type UpdateContextType = UpdateContextValuesType & {
  forceUpdate: () => void
}

export const UpdateContext = createContext<UpdateContextType>(initialContext)

const UpdateContextProvider = ({ children }: { children: ReactNode }) => {
  const [update, forceUpdate] = useReducer((x) => x + 1, 0)

  return (
    <UpdateContext.Provider value={{ update, forceUpdate }}>
      {children}
    </UpdateContext.Provider>
  )
}

export default UpdateContextProvider
