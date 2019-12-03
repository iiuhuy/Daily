import react, {
  useState,
  useLayoutEffect,
  useEffect,
  useReducer,
  useContext
} from "react";
import MyContext from "../../lib/my-context";
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
      layout;
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
  const [name, setName] = useState("yuhui");

  const context = useContext(MyContext);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // setCount 更新状态
  //     // setCount(1); // 不基于最新的值
  //     // setCount(c => c + 1); // 基于最新的值(回调)

  //     // --- useReducer
  //     // dispatchCount({ type: "add" });
  //     dispatchCount({ type: "minus" });
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  useEffect(() => {
    console.log("effect invoked");
    return () => {
      console.log("effcet deteched");
    };
  }, [count]);

  // 会先执行； 并且在 render 之前执行, useEffect 在 render 之后执行
  // useLayoutEffect(() => {
  //   console.log("layout effect invoked");
  //   return () => {
  //     console.log("layout effcet deteched");
  //   };
  // }, [count]);

  return (
    <div>
      <input
        value={name}
        onChange={e => {
          setName(e.target.value);
        }}
      />
      <button
        onClick={() => {
          dispatchCount({
            type: "add"
          });
        }}
      >
        Click me ！{count}
      </button>
      <p>{context}</p>
      <span>span: {count}</span>
    </div>
  );
}
// export default MyCount;
export default MyCountFunc;
