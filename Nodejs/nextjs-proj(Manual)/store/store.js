import { createStore, combineReducers } from "redux";

const initialState = {
  count: 0
};

// reducer 状态多的情况下, 对 reducer 进行一个拆分
const userInitialState = {
  userName: "jokcy"
};

const ADD = "ADD";
function countReducer(state = initialState, action) {
  console.log(state, action);
  switch (action.type) {
    case ADD:
      return { count: state.count + 1 };

    default:
      return state;
  }
}

//
const UPDATE_USERNAME = "UPDATE_USERNAME";
function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case UPDATE_USERNAME:
      return {
        // 如果 key 多的情况下
        ...state,
        username: action.name
      };

    default:
      // break;
      return state;
  }
}

const allReducers = combineReducers({
  count: countReducer,
  user: userReducer
});

// 自动将 state 进行了模块区分 {counter: initialState}

const store = createStore(allReducers, {
  count: initialState,
  user: userInitialState
});
console.log("store", store);
console.log("getState", store.getState());

store.dispatch({ type: ADD });
store.dispatch({ type: UPDATE_USERNAME, name: "worinige" });

// 监听 store 变化的 API
store.subscribe(() => {
  console.log("subscribe", store.getState());
});

store.dispatch({ type: ADD });

export default store;
