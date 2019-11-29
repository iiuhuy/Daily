import { useState, useEffect } from "react";

// 类的写法
class MyCount extends React.Component {
  state = {
    count: 0
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        count: this.state.count + 1
      });
    }, 1000);
  }

  componentWillMount() {
    if (this.interval) {
      clearInterval(this.state);
    }
  }

  render() {
    return <span>{this.state.count}</span>;
  }
}

function MyCountFunc() {
  const [count, setCount] = useState(0); // 数组 -> 结构的方式赋值

  useEffect(() => {
    const interval = setInterval(() => {
      // setCount 更新状态
      setCount(c => c + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <span>{count}</span>;
}
// export default MyCount;
export default MyCountFunc;
