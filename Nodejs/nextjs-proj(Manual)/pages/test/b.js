import react, { useState, useEffect, useReducer } from "react";

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

// useReducer
function countReducer(state, action) {
  switch (action.type) {
    case "add":
      return state + 1;
      // return Object.assign;
    case "minus":
      return state - 1;

    default:
      break;
  }
}

// useState
function MyCountFunc() {
  // const [count, setCount] = useState(0); // 数组 -> 结构的方式赋值

  // useReducer 写法
  const [count, dispatchCount] = useReducer(countReducer, 10); // 第二个参数是初始值。没有初始值就为 NAN
  useEffect(() => {
    const interval = setInterval(() => {
      // setCount 更新状态
      // setCount(1); // 不基于最新的值
      // setCount(c => c + 1); // 基于最新的值(回调)

      // --- useReducer
      // dispatchCount({ type: "add" });
      dispatchCount({ type: "minus" });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <span>{count}</span>;
}
// export default MyCount;
export default MyCountFunc;
