import React from "react"
import CommentList from "./CommentList";  // 列表组件
import CommentForm from "./CommentForm";  // 表单组件

import withTimer from "../06/withTimer"


// style
import "./CommentBox.css";

const comments = [
  {
    author: "Nate",
    content: "Hello React! This is a sample comment...",
  },
  { author: "alvin", content: "Hello Redux!!!"},
  { author: "Bob", content: "Hello Rekit。。。"}
];

export class CommentBox extends React.PureComponent {
  render() {
    return (
      <div className="comment-box">
        <h1> Comments ({ comments.length }) </h1>
        {/* 列表 */}
        <CommentList comments={comments} />
        <CommentForm />
        {this.props.time.getTime()}
      </div>
    );
  }
}



export default withTimer(CommentBox);
