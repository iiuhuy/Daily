import React from "react";
import { render } from "react-dom";
import Hello from "./Hello";

// import
import ChatApp from "./01/ChatApp";
import CommentBox from "./02/CommentBox";

import PureRedux from "./11/PureRedux";
import ListSample from "./31/App";
import WizardSample from "./35/App";
import D3Sample from "./38/D3";

// 样式
import "./index.css";

// 字体样式
const styles = {
  fontFamily: "sans-serif",
  paddingLeft: "250px"
};

// router map
const routeMap = {
  chat: ChatApp, // 01
  "comment-box": CommentBox, // 02
  "pure-redux": PureRedux,
  "list-page": ListSample, // 31
  "wizard-sample": WizardSample, // 35

  D3Sample: D3Sample // 38
};

class App extends React.PureComponent {
  handleLinkClick = key => {
    // window.location.hash = `#${key}`
    window.history.pushState(null, "", `/#/${key}`);
    this.forceUpdate();
  };

  render() {
    // 正则匹配当前的路由
    const currentPage = document.location.hash.replace(/#\/?/, "");

    let CurrentPage = routeMap[currentPage] || Hello;
    if (currentPage.match(/\/user\/w+|\/list-page/)) {
      CurrentPage = ListSample;
    }
    if (currentPage.match(/\/wizard\/step\/\w+/)) {
      CurrentPage = WizardSample;
    }
    return (
      <div style={styles}>
        <ul className="menu-list">
          {Object.keys(routeMap).map(key => (
            <li
              key={key}
              className={key === currentPage ? "is-active" : ""}
              style={{ listStyle: "none" }}
            >
              <span className="link" onClick={() => this.handleLinkClick(key)}>
                {key}
              </span>
            </li>
          ))}
        </ul>
        <div style={{ padding: "30px 0" }}>
          <CurrentPage />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
