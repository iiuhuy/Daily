import React, { Component, Fragment } from "react";
import { withRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { resolve } from "any-promise";
// const Show = ({ router }) => <Comp>query: {router.query.id} </Comp>;
const color = "yellow";

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
