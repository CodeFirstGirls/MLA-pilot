import { ReactNode } from 'react'
import { MantineProvider } from '@mantine/core'
import theme from '../../theme'
import ErrorContextProvider from '../../context/ErrorContextProvider'
import UpdateContextProvider from '../../context/UpdateContextProvider'

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ErrorContextProvider>
      <UpdateContextProvider>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </UpdateContextProvider>
    </ErrorContextProvider>
  )
}
