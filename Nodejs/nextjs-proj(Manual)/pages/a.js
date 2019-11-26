import React, { Component, Fragment } from "react";
import { withRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
// import moment from "moment";
// 异步加载一个组件
import dynamic from "next/dynamic";
// const Show = ({ router }) => <Comp>query: {router.query.id} </Comp>;

const Comp = dynamic(import("../component/comp"));

const color = "pink";
const Title = styled.h1`
  color: yellow;
  font-size: 40px;
`;
class Show extends Component {
  static getInitialProps = async ctx => {
    const moment = await import("moment");
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          name: "余辉",
          time: moment.default(Date.now() - 60 * 1000).fromNow()
        });
      }, 1000);
    });
    return await promise;
  };

  render() {
    const { router, name, time } = this.props;
    console.log(router.query.id, this.props.name);
    return (
      <Fragment>
        <Title>这里是 Title {time}</Title>
        <Comp />
        <Link href="#aaa">
          <a className="link" onClick={this.goToTestB}>
            A 页面 -> query：{name}
          </a>
        </Link>
        <style jsx>
          {`
            a {
              color: pink;
            }
            .link {
              color: green;
            }
          `}
        </style>
        <style jsx global>
          {`
            a {
              color: ${color};
            }
          `}
        </style>
      </Fragment>
    );
  }
}
export default withRouter(Show);
