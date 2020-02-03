// var 按照顺序打印
// for (var i = 0; i < 10; i++) {
//   (function(j) {
//     setTimeout(function() {
//       console.log(j);
//     });
//   })(i);
// }

// let 按照顺序打印
for (let i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i);
  }, 100);
}

// const 和 let 一样, 但是不能赋值.
