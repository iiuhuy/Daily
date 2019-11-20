import Link from "next/link";
import Router from "next/router";
import { Button } from "antd";

export default () => {
  // gotoTestB = () => {
  //   Router.push("./test/b");
  // };

  function gotoTestB() {
    Router.push({
      pathname: "/test/b",
      query: {
        id: 456
      }
    }, '/test/b/2');
  }

  return (
    <>
      {/* 通过 link 组件的 as 属性, 动态改变 */}
      <Link href="/a?id=123" as="/a/123" title="PageA">
        <Button>Index</Button>
      </Link>
      <Button onClick={gotoTestB}>Test BB</Button>
    </>
  );
};
