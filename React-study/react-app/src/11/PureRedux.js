import React from "react";
import { createStore, combineReducers, bindActionCreators } from "redux";

function run() {
  // Store init state， 没有状态的时候设置的初始状态
  const initialState = {
    count: 0
  };

  // reducer 需要接收一个当前状态 state，初始化的状态， -> counter
  const counter = (state = initialState, action) => {
    switch (action.type) {
      case "PLUS_ONE":
        return {
          count: state.count + 1
        };
      case "MINUS_ONE":
        return {
          count: state.count - 1
        };
      case "CUSTOM_COUNT":
        return {
          // + 任意的数值
          count: state.count + action.payload.count
        };
      default:
        break;
    }
    // 不是这三种类型，只需要返回原来的状态即可
    return state;
  };

  //
  const todos = (state = {}) => state;

  // Create Store , 接收一个 reducer， 所以需要一个 reducer
  const store = createStore(
    combineReducers({
      todos,
      counter
    })
  );

  // 定义三种 action: 加 1、减 1、当前的数量
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

  // bindActionCreators 包装
  plusOne = bindActionCreators(plusOne, store.dispatch);

  // 使用 action 的时候，需要拿到 store -> dispatch 出去
  store.subscribe(() => console.log(store.getState()));
  // store.dispatch(plusOne);
  plusOne(); // bindActionCreators 包装后，直接调用这个函数。(这样的好处就是不用知道 store 在哪儿，也不用调 dispatch，直接用名字就行)
  store.dispatch(minusOne());
  store.dispatch(customCount(5));
}

export default () => (
  <div>
    <button onClick={run}>Run</button>
    <p> △ 请在控制台查看运行结果！！！</p>
  </div>
);
