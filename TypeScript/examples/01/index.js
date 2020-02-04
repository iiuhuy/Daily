// let list: number[] = [1, 2, 3, 4];
// 数组泛型
// let list: Array<number> = [1, 2, 3];
// let x: ["hello", 10];
// x = ["hello", 10];
// --- 枚举 --- 类型
// enum Color {
//   Red = 1,
//   Green = 3,
//   Blue = 5
// }
// let colorName: string = Color[3];
// console.log(Color);
// console.log(colorName);
// --- any --- 类型
// --- void ---  类型
// function userAccount(): void {
//   console.log("this is void function");
// }
// let unusable: void = undefined; // 赋值 undefined 或者 null 都是无意义的
// 为什么只能赋值 null 和 undefined ?
// TypeScript 的 --- null --- 和 --- undefined --- 类型
// let num: number = 3;
// let num: number | null = 3;
// num = null; // null 不能赋值给 number 类型, 非得赋值可以使用联合类型
// --- never --- 类型: 用于函数没有返回值或者不会返回, 是任何类型的子类型，所以可以赋值给其他类型
// 两个使用场景
// function error(message: string): never {
//   throw new Error(message);
// }
// function fail() {
//   return error("something fail");
// }
// --- //
// function inifiniteLoop(): never {
//   while (1) {
//     // console.log("running...");
//   }
// }
// --- Object --- 类型
// declare function create(o: object | null): void;
// create({ prop: 0 });
// create(null);
// create(44); // Number 类型不能通过
// --- 断言类型 这样的语法看下面的例子--- //
// 举个例子
// let someValu: any = "this is a string!"; // 加了 any 编译器肯定是找不到的，不加的话可以有提示
// someValu.length;
// 强制转换成字符串的两种方法:
// 1:加 <string> ， 这样就会有 .length
// let strLength: number = (<string>someValu).length;
// 2: as 语法
// let strLength: number = (someValu as string).length;
// ？ 报错: 元组类型报错的知识: 元组类型可以理解为一个限定的数组类型
var x;
x = ["hello", 10];
x[3] = "world";
