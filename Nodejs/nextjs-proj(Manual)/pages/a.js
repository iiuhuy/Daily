import React, { Component, Fragment } from "react";
import { withRouter } from "next/router";
import Link from "next/link";
// import Comp from "../component/comp";
// const Show = ({ router }) => <Comp>query: {router.query.id} </Comp>;
class Show extends Component {
  render() {
    const { router } = this.props;
    console.log(router.query.id);
    return (
      <Fragment>
        <Link href='#aaa'>
          <button onClick={this.goToTestB}>
            A 页面 -> query：{router.query.id}
          </button>
        </Link>
      </Fragment>
    );
  }
}
export default withRouter(Show);
