import react from "react";
import createStore from "../store/store";
const isServer = typeof window === "undefined"; // 是否处于 Windows 环境

const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";

function getOrCreateStore(initialState) {
  if (isServer) {
    return createStore(initialState); // 是服务端
  }

  // 不是服务端的情况下
  if (!window[__NEXT_REDUX_STORE__]) {
    // 先判断是否存在, 如果不存在就设置
    window[__NEXT_REDUX_STORE__] = createStore(initialState);
  }
  // 存在的话就直接 return
  return window[__NEXT_REDUX_STORE__];
}

export default Comp => {
  class withReduxApp extends React.Component {
    constructor(props) {
      super(props);
      console.log("emmm", props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }
    render() {
      const { Componet, pageProps, ...rest } = this.props;
      console.log("?????????", Componet, pageProps);

      // 并不是每个页面都有 pageProps
      if (pageProps) {
        pageProps.test = "123";
      }
      return (
        <Comp
          Componet={Componet}
          pageProps={pageProps}
          {...rest}
          reduxStore={this.reduxStore}
        />
      );
    }
  }

  // 将 getInitialProps 传递进来
  // withReduxApp.getInitialProps = Comp.getInitialProps;
  // 该方法是 App 的，在客户端渲染和服务端渲染都会被执行
  withReduxApp.getInitialProps = async ctx => {
    const reduxStore = getOrCreateStore();

    ctx.reduxStore = reduxStore;

    // 获取 app props
    let appProps = {};
    if (typeof Comp.getInitialProps === "function") {
      appProps = await Comp.getInitialProps(ctx);
    }

    return { ...appProps, initialReduxState: reduxStore.getState() };
  };
  return withReduxApp;
};
