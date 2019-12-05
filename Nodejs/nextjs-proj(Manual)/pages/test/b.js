import react, {
  useState,
  useLayoutEffect,
  useEffect,
  useReducer,
  useContext,
  useRef,
  memo,
  useMemo,
  useCallback
} from "react";
import MyContext from "../../lib/my-context";

// useReducer
function countReducer(state, action) {
  switch (action.type) {
    case "add":
      return state + 1;
    case "minus":
      return state - 1;

    default:
      break;
  }
}

// useState
function MyCountFunc() {
  // useReducer 写法
  const [count, dispatchCount] = useReducer(countReducer, 0); // 第二个参数是初始值。没有初始值就为 NAN
  const [name, setName] = useState("yuhui");

  // 规避闭包的方法: useRef
  // 这个不是 bug, 是函数执行的正常状态
  const countRef = useRef(); // {current: ''}
  countRef.current = count;

  const config = useMemo(
    () => ({
      text: `count is ${count}`,
      color: count > 3 ? "red" : "blue"
    }),
    [count]
  );

  // const handleButtonClick = useCallback(
  //   () => dispatchCount({ type: "add" }),
  //   []
  // );

  // memo 写法
  const handleButtonClick = useMemo(
    () => () => {
      dispatchCount({ type: "add" });
    },
    []
  );

  const handleAlertButtonClick = function() {
    setTimeout(() => {
      alert(countRef.current);
    }, 2000);
  };

  return (
    <div>
      <input
        value={name}
        onChange={e => {
          setName(e.target.value);
        }}
      />
      <Child config={config} onButtonClick={handleButtonClick}></Child>
      <button onClick={handleAlertButtonClick} style={{ color: config.color }}>
        alert count
      </button>
    </div>
  );
}

const Child = memo(function Child({ onButtonClick, config }) {
  console.log("child render");
  return (
    <button onClick={onButtonClick} style={{ color: config.color }}>
      {config.text}
    </button>
  );
});
// export default MyCount;
export default MyCountFunc;
