// 无状态的功能组件
// import * as React from "react";

// export interface HelloProps {
//   compiler: string;
//   framework: string;
// }

// export const Hello = (props: HelloProps) => (
//   <h1>
//     Hello from {props.compiler} and {props.framework}!
//   </h1>
// );

// 看起来更像类一点
import * as React from "react";

export interface HelloProps {
  compiler: string;
  framework: string;
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<HelloProps, {}> {
  render() {
    return (
      <h1>
        Hello from {this.props.compiler} and {this.props.framework}!
      </h1>
    );
  }
}
