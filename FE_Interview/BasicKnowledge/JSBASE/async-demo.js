// // 异步 （callback 回调函数）
console.log(100);
setTimeout(() => {
  console.log(200);
}, 1000);

console.log(300);
console.log(400);

// 同步
console.log("a");
alert("b");
console.log("c");
