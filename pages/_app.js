import '../styles/globals.css'
import { SessionProvider, useSession } from 'next-auth/react'
import { StoreProvider } from '../utils/Store'
import { Router, useRouter } from 'next/router'
import ProgressBar from "@badrap/bar-of-progress"
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

const progress = new ProgressBar({
  size: 4,
  color: "#1e40af",
  className: "z-50",
  delay: 100,
})

Router.events.on("routeChangeStart", progress.start)
Router.events.on("routeChangeComplete", progress.finish)
Router.events.on("routeChangeError", progress.finish)

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <PayPalScriptProvider deferLoading={true}>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </PayPalScriptProvider>
      </StoreProvider>
    </SessionProvider>
  )
}

function Auth({ children }) {
  const router = useRouter()
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=login required')
    },
  })
  if (status === 'loading') {
    return <div>Carregando...</div>
  }

  return children;
}

export default MyApp
