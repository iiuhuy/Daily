import Document, { Html, Main, NextScript } from "next/document";
import Head from "next/head";
import { Component } from "react";
import { ServerStyleSheet } from "styled-components";
export default class MyDocument extends Document {
  // 不必重写该方法，重写了就必须执行D ocument.getInitialProps 方法
  static getInitialProps = async ctx => {
    const sheet = new ServerStyleSheet();

    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          //
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      // 要么不覆盖, 覆盖了至少就需要执行下面的代码
      const props = await Document.getInitialProps(ctx);
      return {
        ...props,
        styles: (
          <>
            {/* props.styles 就是 next 内置的 jsx 样式 */}
            {props.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  };

  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
