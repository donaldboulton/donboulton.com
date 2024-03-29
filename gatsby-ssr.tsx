import * as React from 'react'
import type { GatsbySSR } from 'gatsby'
import { Partytown } from '@builder.io/partytown/react'
import Layout from './src/components/layout'

const ORIGIN = 'https://www.googletagmanager.com'
const GATSBY_GA_MEASUREMENT_ID = 'G-6YWM2JY5EH'

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({ element }) => {
  return <Layout>{element}</Layout>
}

export function onRenderBody({ setHtmlAttributes, setHeadComponents }) {
  setHtmlAttributes({ lang: 'en' })
  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') return null

  setHeadComponents([
    <Partytown key="partytown" forward={['gtag']} />,
    <script key="google-analytics" type="text/partytown" src={`${ORIGIN}/gtag/js?id=${GATSBY_GA_MEASUREMENT_ID}`} />,
    <script
      key="google-analytics-config"
      type="text/partytown"
      dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag(){ window.dataLayer.push(arguments);}
        gtag('js', new Date()); 
        gtag('config', '${GATSBY_GA_MEASUREMENT_ID}', { send_page_view: false })`,
      }}
    />,
  ])
}
