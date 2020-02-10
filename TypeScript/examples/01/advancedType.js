// 高级类型
// --- 交叉类型 --- //
// function extend<T, U>(first: T, second: U): T & U {
//   let result = {} as T & U; // 做断言
function getSmallPet() {
    // ...
}
var pet = getSmallPet();
pet.layEggs(); // okay
// pet.swim(); // error
// 类型保护
// 可以为 null 的类型
// 字符串字面量类型
