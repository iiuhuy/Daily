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

  const config = useMemo(
    () => ({
      text: `count is ${count}`,
      color: count > 3 ? "red" : "blue"
    }),
    [count]
  );

  const handleButtonClick = useCallback(
    () => dispatchCount({ type: "add" }),
    []
  );

  return (
    <div>
      <input
        value={name}
        onChange={e => {
          setName(e.target.value);
        }}
      />
      <Child config={config} onButtonClick={handleButtonClick}></Child>
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
