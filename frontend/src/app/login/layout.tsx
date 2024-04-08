'use-client'
import { Box } from '@mantine/core'
import { ReactNode } from 'react'

import classes from './layout.module.css'

const Layout = ({ children }: { children: ReactNode }) => {
  return <Box className={classes.container}>{children}</Box>
}

export default Layout
