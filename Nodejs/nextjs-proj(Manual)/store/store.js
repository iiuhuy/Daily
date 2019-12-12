import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {
  count: 0
};

// reducer 状态多的情况下, 对 reducer 进行一个拆分
const userInitialState = {
  userName: "jokcy"
};

const ADD = "ADD";
function countReducer(state = initialState, action) {
  console.log("countReducer", state, action);
  switch (action.type) {
    case ADD:
      return { count: state.count + (action.num || 1) };

    default:
      return state;
  }
}

//
const UPDATE_USERNAME = "UPDATE_USERNAME";
function userReducer(state = userInitialState, action) {
  console.log("userReducer", state, action);
  switch (action.type) {
    case UPDATE_USERNAME:
      return {
        // 如果 key 多的情况下
        ...state,
        userName: action.name
      };

    default:
      // break;  // console.log("我傻了", dispatch, getState);

      return state;
  }
}

const allReducers = combineReducers({
  count: countReducer,
  user: userReducer
});

// 自动将 state 进行了模块区分 {counter: initialState}

// Create action
function add(num) {
  return {
    type: ADD,
    num
  };
}

console.log("store", store);
console.log("getState", store.getState());

// 异步
function addAsync(num) {
  // 这里的 dispatch 等同于 store.dispatch
  // getState —— 在异步完成之后获取最新的一个状态
  return dispatch => {
    setTimeout(() => {
      dispatch(add(num));
    }, 1000);
  };
}

store.dispatch(add(3));

// 监听 store 变化的 API
store.subscribe(() => {
  console.log("changed", store.getState());
});

store.dispatch(addAsync(5));
// store.dispatch({ type: UPDATE_USERNAME, name: "worinige" });

// export default store;

export default function initializeStore() {
  const store = createStore(
    allReducers,
    {
      count: initialState,
      user: userInitialState
    },
    // composeWithDevTools 加入 React dev tool
    composeWithDevTools(applyMiddleware(ReduxThunk))
  );

  return store;
}
