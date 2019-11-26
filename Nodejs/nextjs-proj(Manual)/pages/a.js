import React, { Component, Fragment } from "react";
import { withRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
// import { resolve } from "any-promise";
import styled from "styled-components";
// const Show = ({ router }) => <Comp>query: {router.query.id} </Comp>;
const color = "pink";
const Title = styled.h1`
  color: yellow;
  font-size: 40px;
`;
class Show extends Component {
  static getInitialProps = async ctx => {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({ name: "余辉" });
      }, 1000);
    });
    return await promise;
  };

  render() {
    const { router } = this.props;
    console.log(router.query.id, this.props.name);
    return (
      <Fragment>
        <Title>这里是 Title</Title>
        <Link href="#aaa">
          <a className="link" onClick={this.goToTestB}>
            A 页面 -> query：{this.props.name}
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
