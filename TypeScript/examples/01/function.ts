// --- 基本示例 --- //
// // 命名函数
// function add(x, y) {
//   return x + y
// }
// // 匿名函数
// let myAdd = function(x, y) {
//   return x + y;
// }
// 命名函数
function add(x: number, y: number) {
  return x + y;
}

// 匿名函数
let myAdd = function(x: number, y: number) {
  return x + y;
};

// --- 函数类型 --- //
// 推断类型
// 尝试这个例子的时候，你会发现如果你在赋值语句的一边指定了类型但是另一边没有类型的话，TypeScript 编译器会自动识别出类型：
let myAdd1 = function(x: number, y: number): number {
  return x + y;
};

let myAdd2: (baseValue: number, increment: number) => number = function(x, y) {
  return x + y;
};

// --- 可选参数和默认参数 --- //
// --- this --- //
// --- 重载 --- //
