import Link from "next/link";
import { Button } from "antd";

// export default ({ children }) => (
//   <>
//     <header>
//       <Link href="a/?id" as="/a/1">
//         <Button>A</Button>
//       </Link>
//       <Link href="/test/b">
//         <Button>B</Button>
//       </Link>
//     </header>
//     {children}
//   </>
// );

export default class Layout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <header>
          <Link href="a/?id" as="/a/1">
            <Button>A</Button>
          </Link>
          <Link href="/test/b">
            <Button>B</Button>
          </Link>
        </header>
        {children}
      </div>
    );
  }
}
