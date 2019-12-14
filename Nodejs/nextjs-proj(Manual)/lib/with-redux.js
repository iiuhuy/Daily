import react from "react";
import createStore from "../store/store";
const isServer = typeof window === undefined; // 是否处于 Windows 环境

const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";

function getOrCreateStore(initialState) {
  if (isServer) {
    return createStore(initialState); // 是服务端
  }

  if (!window[__NEXT_REDUX_STORE__]) {
    // 先判断是否存在, 如果不存在就设置
    window[__NEXT_REDUX_STORE__] = createStore(initialState);
  }
  // 存在的话就直接 return
  return window[__NEXT_REDUX_STORE__];
}

export default Comp => {
  class withReduxApp extends React.component {
    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialState);
    }
    render({ Componet, pageProps, ...rest }) {
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
  // TestHocComp.getInitialProps = Comp.getInitialProps;
  TestHocComp.getInitialProps = async () => {
    // 获取 app props
    let appProps = {};
    if (typeof Comp.getInitialProps === "function") {
      appProps = await Comp.getInitialProps(ctx);
    }

    const reduxStore = getOrCreateStore();

    return { ...appProps, initialReduxState: reduxStore.getState };
  };
  return TestHocComp;
};
