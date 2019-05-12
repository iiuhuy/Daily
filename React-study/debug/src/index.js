import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

// App 测试程序， 查看则取消注释，将下面的 Api 注释掉
import App from './App';

// Api 测试程序，使用 JavaScript 内置的 Fetch 从 URL 终端收集数据并且显示它
// import App from './Api'

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
