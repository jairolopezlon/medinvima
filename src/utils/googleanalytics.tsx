import Script from 'next/script'

export default function GoogleAnalytics(): JSX.Element {
  return (
    <>
      <Script src='https://www.googletagmanager.com/gtag/js?id=G-D4JGJQCZTC' strategy='lazyOnload' />

      <Script id='' strategy='lazyOnload'>
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-D4JGJQCZTC', {
              page_path: window.location.pathname,
              });
          `}
      </Script>
    </>
  )
}
