import { ReactNode } from 'react'
//import config from "@/lib/config";
import Providers from '../components/Providers'
import { ColorSchemeScript } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'

/**
 * Default metadata.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata
 */
// export const metadata = {
//   // title: config.siteName,
//   // description: config.siteDescription,
// };

/**
 * The homepage root layout.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/layout
 */
const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <title>CFG Fitness Tracker</title>
      </head>
      <body>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
