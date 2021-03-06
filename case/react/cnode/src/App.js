import React, { Component, Fragment } from "react";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Topic from './pages/topic'
import Detail from './pages/detail'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Fragment>
            <Switch>
              <Route path="/" exact component={ Topic } />
              <Route path="/detail/:id" component={ Detail } />
              {/* <Route path="/user/:id" component={User} />
              <Route path="/login" component={Login} />
              <Auth path="/create" component={Create} />
              <Auth path="/mine" component={Mine} />
              <Auth path="/message" component={Message} />
              <Route path="/404" exact component={ErrorPage} />
              <Route path="*" component={ErrorPage} /> */}
            </Switch>
          </Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
