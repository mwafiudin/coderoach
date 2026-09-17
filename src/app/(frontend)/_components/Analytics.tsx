import Script from 'next/script';
import { PixelPageViews } from './PixelPageViews';

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/**
 * GA4 and Meta Pixel, site-wide. Each loads only when its ID is set. The inline stubs run before
 * hydration so events fired on first render queue up instead of being dropped.
 */
export function Analytics() {
  return (
    <>
      {GA4_ID && (
        <>
          <Script id="ga4-init" strategy="beforeInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config',${JSON.stringify(GA4_ID)});`}
          </Script>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`} strategy="afterInteractive" />
        </>
      )}
      {META_PIXEL_ID && (
        <>
          <Script id="meta-pixel" strategy="beforeInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',${JSON.stringify(META_PIXEL_ID)});fbq('track','PageView');`}
          </Script>
          <PixelPageViews />
        </>
      )}
    </>
  );
}
