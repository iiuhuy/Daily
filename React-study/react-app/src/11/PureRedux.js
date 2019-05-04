import React from "react"
import {
  creatStore
} from "redux"

function run() {
  // Store init state， 没有状态的时候设置的初始状态
  const initialState = {
    const: 0
  }

  // reducer -> counter
  const counter = (state = initialState, action) => {
    switch (action.type) {
      case "PLUS_ONE":
        return {
          counter: state.count + 1
        };
      case "MINUS_ONE":
        return {
          counter: state.count - 1
        };
      case "CUSTOM_COUNT":
        return {
          // + 任意的数值
          count: state.count + action.payload.count
        }
      default:
        break;
    }
    // 不是这三种类型，只需要返回原来的状态即可
    return state;
  }

  // Create Store , 接收一个 reducer， 所以需要一个 reducer 
  const store = creatStore(
    combineReducers({
      todos,
      counter
    })
  );

  // Action creator
  function plusOne() {
    // action
    return {
      type: "PLUS_ONE"
    };
  }

  function minusOne() {
    return {
      type: "MINUS_ONE"
    };
  }

  function customCount(count) {
    return {
      type: "CUSTOM_COUNT",
      payload: {
        count
      }
    };
  }

  // 使用 action 的时候，需要拿到 store -> dispatch 出去
  store.subscribe(() => console.log(store.getState()));
  store.dispatch(plusOne);
  store.dispatch(minusOne);
  store.dispatch(customCount(5));
}

export default () => (
  <div>
    <button onClick={run}>Run</button>
    <p>△ 请在控制台查看运行结果！！！</p>
  </div>
);