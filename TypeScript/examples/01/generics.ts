// 泛型 //
// // --- 基本示例 --- //
// function identity<T>(params: T): T {
//   return params;
// }
// // 怎么用
// // let output = identity<string>("myString");
// let output = identity("myString"); // 这种由编译器自动推论类型

// // --- 使用泛型变量 --- //
// // 打印 T 的长度, T 直接打印是不会有 length 的. 因为这里的类型是任意类型, 而 number 是没有 .length 属性的
// function loggingIdentity<T>(arg: T[]): T[] {
//   console.log(arg.length);
//   return arg;
// }

// --- 泛型类型 --- //
// 使用泛型函数类型
function identity<T>(params: T): T {
  return params;
}

let myIdentity: <T>(arg: T) => T = identity;

// 泛型类
// 泛型约束
