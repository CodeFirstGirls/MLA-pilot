'use client'
import React, { createContext, useState, ReactNode } from 'react'

const initialContext = {
  error: false,
  errorMessage: '',
  setError: (error) => {},
  clearError: () => {},
}

type ErrorContextValuesType = {
  error: boolean
  errorMessage: string
}

type ErrorContextType = ErrorContextValuesType & {
  setError: (error: string) => void
  clearError: () => void
}

export const ErrorContext = createContext<ErrorContextType>(initialContext)

const ErrorContextProvider = ({ children }: { children: ReactNode }) => {
  const [error, setIsError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const setError = (errorMessage: string) => {
    setIsError(true)
    setErrorMessage(errorMessage)
  }

  const clearError = () => {
    setIsError(false)
    setErrorMessage('')
  }

  return (
    <ErrorContext.Provider
      value={{ error, errorMessage, setError, clearError }}
    >
      {children}
    </ErrorContext.Provider>
  )
}

export default ErrorContextProvider
