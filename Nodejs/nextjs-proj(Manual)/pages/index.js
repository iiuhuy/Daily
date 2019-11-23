import React, { Component, Fragment } from "react";
import Link from "next/link";
import Router from "next/router";
import { Button } from "antd";

export default class Index extends Component {
  emitEvent = type => {
    return (...args) => {
      console.log(type, ...args);
    };
  };

  componentDidMount() {
    const events = [
      "routeChangeStart",
      "routeChangeComplete",
      "routeChangeError",
      "beforeHistoryChange",
      "hashChangeStart",
      "hashChangeComplete"
    ];
    events.forEach(event => {
      Router.events.on(event, this.emitEvent(event));
    });
  }
  render() {
    return (
      <>
        {/* 通过 link 组件的 as 属性, 动态改变 */}
        {/* <Link href="/a?id=123" as="/a/123" title="PageA">
          <Button>Index</Button>
        </Link>
        <Button onClick={this.gotoTestB}>Test BB</Button> */}
        <span>Index</span>
      </>
    );
  }

  // gotoTestB = () => {
  //   Router.push("./test/b");
  // };
  gotoTestB() {
    Router.push(
      {
        pathname: "/test/b",
        query: {
          id: 456
        }
      },
      "/test/b/2"
    );
  }
}
