import App, { Container } from "next/app";
// import antd 的 css
import "antd/dist/antd.css";
import Layout from "../component/Layout";

class MyApp extends App {
  // getInitialProps 获取全局信息
  static getInitialProps = async ({ Component,ctx }) => {
    let pageProps = {};
    // 判断当前页面是否存在 getInitialProps 方法
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  };

  render() {
    // 这个 Component 即渲染的页面
    const { Component, pageProps } = this.props;
    console.log(Component, pageProps);
    return (
      <Container>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Container>
    );
  }
}

export default MyApp;
