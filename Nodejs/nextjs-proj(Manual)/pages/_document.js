import Document, { Html, Main, NextScript } from "next/document";
import Head from "next/head";
export default class MyDocument extends Document {
  // 不必重写该方法，重写了就必须执行D ocument.getInitialProps 方法
  static getInitialProps = async ctx => {
    // 要么不覆盖, 覆盖了至少就需要执行下面的代码
    const pageProps = await Document.getInitialProps(ctx);
    return {
      ...pageProps
    };
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
