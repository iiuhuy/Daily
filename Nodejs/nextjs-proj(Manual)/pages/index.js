import React, { Component, Fragment } from "react";
import Link from "next/link";
import Router from "next/router";
import { Button } from "antd";
import { connect } from "react-redux";

// 测试 store
import store from "../store/store";

const Index = ({ counter, username, rename, add }) => {
  // emitEvent = type => {
  //   return (...args) => {
  //     console.log(type, ...args);
  //   };
  // };

  // componentDidMount() {
  //   const events = [
  //     "routeChangeStart",
  //     "routeChangeComplete",
  //     "routeChangeError",
  //     "beforeHistoryChange",
  //     "hashChangeStart",
  //     "hashChangeComplete"
  //   ];
  //   events.forEach(event => {
  //     Router.events.on(event, this.emitEvent(event));
  //   });
  // }

  return (
    <>
      {/* 通过 link 组件的 as 属性, 动态改变 */}
      {/* <Link href="/a?id=123" as="/a/123" title="PageA">
          <Button>Index</Button>
        </Link>
        <Button onClick={this.gotoTestB}>Test BB</Button> */}
      <span style={{ color: "red" }}>Count: {counter}</span>
      <a>UserName: {username} </a>
      <input
        value={username}
        onChange={e => {
          rename(e.target.value);
          // console.log("suisuisuisuis", e.target.value);
        }}
      />
      <button
        onClick={() => {
          add(counter);
        }}
      >
        do add
      </button>
    </>
  );

  // gotoTestB = () => {
  //   Router.push("./test/b");
  // };
  function gotoTestB() {
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
};

export default connect(
  // 使用这个拿到 State
  function mapStateToProps(state) {
    console.log(".......", state);
    return {
      counter: state.count.count,
      username: state.user.userName
    };
  },
  // action 也可以通过这样拿到

  function mapDispatchToProps(dispatch) {
    return {
      add: num => dispatch({ type: "ADD", num }),

      rename: name => dispatch({ type: "UPDATE_USERNAME", name })
    };
  }
)(Index);
