import Document, { Html, Head, Main, NextScript } from "next/document";

import { ServerStyleSheet } from "styled-components";

const bootLoaderStyles = `
  #oosri-boot-loader {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.96);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    z-index: 9999;
    transition: opacity 180ms ease, visibility 180ms ease;
  }

  #oosri-boot-loader[data-hidden="true"] {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }

  #oosri-boot-loader__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    font-family: "Inter", sans-serif;
    color: #212121;
  }

  #oosri-boot-loader__spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #f0f0f0;
    border-top: 3px solid #fc5353;
    border-radius: 999px;
    animation: oosri-boot-spin 0.8s linear infinite;
  }

  @keyframes oosri-boot-spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`;

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="Oosri Seller Dashboard - Manage your business effectively." />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <style dangerouslySetInnerHTML={{ __html: bootLoaderStyles }} />
        </Head>
        <body>
          <div id="oosri-boot-loader" aria-live="polite" aria-label="Loading page">
            <div id="oosri-boot-loader__content">
              <div id="oosri-boot-loader__spinner" />
            </div>
          </div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
