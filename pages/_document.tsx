import { Head, Html, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='true'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <body className='font-sans bg-light'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
