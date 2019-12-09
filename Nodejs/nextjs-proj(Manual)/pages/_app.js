import App, { Container } from "next/app";
// import antd 的 css
import { Provider } from "react-redux";

import "antd/dist/antd.css";
import Layout from "../component/Layout";
import MyContext from "../lib/my-context";
import { Button } from "antd";
import store from "../store/store";
class MyApp extends App {
  state = {
    context: "context"
  };
  // getInitialProps 获取全局信息
  static getInitialProps = async ({ Component, ctx }) => {
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
          {/* redux Provider */}
          <Provider store={store}>
            {/* 这样引用后就可以在所有的组件中就可以使用 MyContext.Provider 提供的 value 了 */}
            <MyContext.Provider value={this.state.context}>
              <Component {...pageProps} />
              <Button
                onClick={() => {
                  this.setState({ context: `${this.state.context}OwO` });
                }}
              >
                update context
              </Button>
            </MyContext.Provider>
          </Provider>
        </Layout>
      </Container>
    );
  }
}

export default MyApp;
