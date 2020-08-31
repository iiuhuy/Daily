const input1 = document.getElementById("input1");

// 防抖逻辑： 每次 keyup 事件触发都会触发
// let timer = null;
// input1.addEventListener("keyup", function () {
//   if (timer) {
//     clearTimeout(timer);
//   }
//   timer = setTimeout(() => {
//     // 模拟触发 change 事件
//     console.log(input1.value);

//     // 清空定时器
//     timer = null;
//   }, 500);
// });

// -------------------------------------------------- //
// 防抖：封装 -> 返回的是个函数
function debounce(fn, delay = 500) {
  // timer 是闭包中的
  let timer = null;

  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      // fn();
      fn.apply(this, arguments);
      console.log("xxx", arguments);

      timer = null;
    }, delay);
  };
}

input1.addEventListener(
  "keyup",
  debounce(function (e) {
    console.log(e.target);
    console.log(input1.value);
  }, 600)
);

// 用的时候使用 箭头函数 的话，封装函数里面不能使用, this
// input1.addEventListener(
//   "keyup",
//   (e) => {
//     console.log("1", e.target);
//     console.log(input1.value);
//   },
//   500
// );
