'use-client'
import { Box } from '@mantine/core'

import classes from './layout.module.css'

const Layout = (props) => {
  return <Box className={classes.container}>{props.children}</Box>
}

export default Layout
