import React from 'react';
import Script from 'react-imvc/component/Script';
import { AppSettings } from 'react-imvc';

export interface IRenderProps {
  description?: string;
  keywords?: string;
  title?: string;
  content: string;
  initialState?: object;
  appSettings: AppSettings;
  publicPath: string;
  assets: {
    vendor: string;
    index: string;
  };
}

export default function Page(props: IRenderProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, minimal-ui"
        />
        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta content="black" name="apple-mobile-web-app-status-bar-style" />
        <title> </title>
        <meta name="description" content={props.description} />
        <meta name="keywords" content={props.keywords} />
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: props.content }} />
        <div id="modal" />
        <Script>
          {`
          (function() {
            window.__INITIAL_STATE__ = ${JSON.stringify(props.initialState)}
            window.__APP_SETTINGS__ = ${JSON.stringify(props.appSettings)}
            window.__PUBLIC_PATH__ = '${props.publicPath}'
            document.documentElement.style.webkitTouchCallout='none';
            document.documentElement.style.webkitUserSelect='none';
          })()
          `}
        </Script>
        <script type="text/javascript" src={`${props.publicPath}/${props.assets.index}`} />
        <script type="text/javascript" src={`${props.publicPath}/${props.assets.vendor}`} />
      </body>
    </html>
  );
}
