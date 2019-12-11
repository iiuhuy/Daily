export default Comp => {
  function TestHocComp({ Componet, pageProps, ...rest }) {
    console.log("?????????", Componet, pageProps);

    // 并不是每个页面都有 pageProps
    if (pageProps) {
      pageProps.test = "123";
    }
    return <Comp Componet={Componet} pageProps={pageProps} {...rest} />;
  }

  // 将 getInitialProps 传递进来
  TestHocComp.getInitialProps = Comp.getInitialProps;
  return TestHocComp;
};
