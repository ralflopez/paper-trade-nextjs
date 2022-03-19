import "../styles/globals.css"
import type { AppProps } from "next/app"
import Layout from "../components/Layout"
import { ApolloProvider } from "@apollo/client"
import { client } from "../graphql"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import NProgress from "nprogress"
import "../styles/nprogress.css"
import Router from "next/router"

NProgress.configure({
  showSpinner: false,
})

Router.events.on("routeChangeStart", () => {
  NProgress.start()
})

Router.events.on("routeChangeComplete", () => {
  NProgress.done()
})

Router.events.on("routeChangeError", () => {
  NProgress.done()
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <ToastContainer hideProgressBar={true} />
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}

export default MyApp
