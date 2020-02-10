// 高级类型
// --- 交叉类型 --- //
// function extend<T, U>(first: T, second: U): T & U {
//   let result = {} as T & U; // 做断言

//   // 赋值
//   for (let id in first) {
//     result[id] = first[id] as any; // 使编译通过, 断言为 any
//   }

//   for (let id in second) {
//     if (!result.hasOwnProperty(id)) {
//       result[id] = second[id] as any; // 使编译通过, 断言为 any
//     }
//   }
//   return result;
// }
// // use
// class Person {
//   constructor(public name: string) {}
// }
// interface Loggable {
//   log(): void;
// }
// class ConsoleLogger implements Loggable {
//   log() {
//     console.log("emmmm");
//   }
// }
// // 拿到的 Jack 就是 Person 类 和 ConsoleLogger 类返回结果的联合
// let Jack = extend(new Person("Jack"), new ConsoleLogger());
// Jack.name;
// Jack.log();
// console.log(Jack.name);

// --- 联合类型 --- //
// 联合类型与交叉类型很有关联，但是使用上却完全不同。 偶尔你会遇到这种情况，一个代码库希望传入 number 或 string 类型的参数。 例如下面的函数
// 例如 string | number
// function padLeft(value: string, padding: any) {
//   if (typeof padding === "number") {
//     return Array(padding + 1).join(" ") + value;
//   }
//   if (typeof padding === "string") {
//     return padding + value;
//   }
//   throw new Error(`Expected string or number, got '${padding}'.`);
// }
// padLeft("Hello world", 4); // returns "    Hello world"
// let indentedString = padLeft("Hello world", true); // 编译阶段通过，运行时报错

// 使用联合类型做为 padding 的参数
// function padLeft(value: string, padding: string | number) {
//   if (typeof padding === "number") {
//     return Array(padding + 1).join(" ") + value;
//   }
//   if (typeof padding === "string") {
//     return padding + value;
//   }
//   throw new Error(`Expected string or number, got '${padding}'.`);
// }
// let indentedString = padLeft("Hello world", true); // 编译阶段报错
// let indentedString1 = padLeft("Hello world", "true"); // 编译阶段报错

// 联合类型表示一个值可以是几种类型之一。我们用竖线（|）分隔每个类型，所以 number | string 表示一个值可以是 number 或 string。
// 如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员。
// interface Bird {
//   fly();
//   layEggs();
// }
// interface Fish {
//   swim();
//   layEggs();
// }
// function getSmallPet(): Fish | Bird {
//   // ...
// }
// let pet = getSmallPet();
// pet.layEggs(); // okay
// pet.swim(); // error

// --- 类型保护 --- //
// 可以为 null 的类型
// 字符串字面量类型
