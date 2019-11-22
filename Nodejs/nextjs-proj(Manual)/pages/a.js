import React, { Component, Fragment } from "react";
import { withRouter } from "next/router";
import Link from "next/link";
import { resolve } from "any-promise";
// import Comp from "../component/comp";
// const Show = ({ router }) => <Comp>query: {router.query.id} </Comp>;
class Show extends Component {
  static getInitialProps = async () => {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({ name: "Yuhui" });
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
          <button onClick={this.goToTestB}>
            A 页面 -> query：{this.props.name}
          </button>
        </Link>
      </Fragment>
    );
  }
}
export default withRouter(Show);
