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
// // 使用泛型函数类型
// function identity<T>(params: T): T {
//   return params;
// }
// // 声明泛型接口
// interface GenericIdentityFn<T> {
//   (arg: T): T;
// }
// // 使用
// // let myIdentity: { <T>(arg: T): T } = identity;
// let myIdentity: GenericIdentityFn<number> = identity;
// --- 泛型类 --- //
// class GenericNumber<T> {
//   zeroValue: T;
//   add: (x: T, y: T) => T;
// }
// let myGenericNumber = new GenericNumber<number>();
// myGenericNumber.zeroValue = 0;
// myGenericNumber.add = function(x, y) {
//   return x + y;
// };
// let stringGeneric = new GenericNumber<string>();
// stringGeneric.zeroValue = "yuhui";
// stringGeneric.add = function(x, y) {
//   return x + y;
// };
// console.log(stringGeneric.add(stringGeneric.zeroValue, " start"));
// --- 泛型约束 --- //
// 在泛型约束中使用类型参数
function getProperty(obj, key) {
    return obj[key];
}
var x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "a"); // okay
// getProperty(x, "m"); // error
