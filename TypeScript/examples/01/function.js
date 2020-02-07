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
// function add(x: number, y: number) {
//   return x + y;
// }
// 匿名函数
// let myAdd = function(x: number, y: number) {
//   return x + y;
// };
// --- 函数类型 --- //
// 推断类型
// 尝试这个例子的时候，你会发现如果你在赋值语句的一边指定了类型但是另一边没有类型的话，TypeScript 编译器会自动识别出类型：
// let myAdd1 = function(x: number, y: number): number {
//   return x + y;
// };
// let myAdd2: (baseValue: number, increment: number) => number = function(x, y) {
//   return x + y;
// };
// // --- 可选参数和默认参数 --- //
// // JavaScript 里面参数是可传可不传, 不传的话就是 undefined. TypeScript 里面可以使用 ? 选择不传
// // TypeScript 可选参数必须跟在必须参数后面
// // 如果默认参数在必须参数前面, 必须使用 undefined 来获得默认参数
// // 多个参数, 不确定参数个数的情况下, js 里面使用 arguments 来获取; ts 使用 ... 省略号的语法, 称为剩余参数: 可以是一个参数都没有，可以是很多个参数
// function buildName(
//   firstName: string,
//   defaultName = "Hello",
//   lastName?: string,
//   ...restName: string[]
// ): string {
//   if (lastName) {
//     return defaultName + " " + firstName + " " + lastName;
//   } else {
//     return defaultName + " " + firstName;
//   }
// }
// let result = buildName("Jack");
// let result1 = buildName("Jack", "Bob");
// let result2 = buildName("Jack", "JJ", "Tom", "Zoey");
// let result3 = buildName("Jack");
// console.log(result);
// // 剩余参数使用函数类型来赋值
// let buildNameFn: (fname: string, ...rest: string[]) => string = buildName;
// console.log(buildNameFn("Fn-Test"));
// --- this --- //
// 以为扑克牌为例子
var deck = {
    suits: ["红心", "方块", "梅花", "黑桃"],
    cards: Array(52),
    createCardPicker: function () {
        var _this = this;
        // 这里不使用箭头函数会报错, 因为创建执行的时候 this 指向的是全局 gobal 对象的 suits -> 索引， gobal 是没有这个的
        return function () {
            var pickedCard = Math.floor(Math.random() * 52);
            var pickedSuit = Math.floor(pickedCard / 13);
            return {
                suit: _this.suits[pickedSuit],
                card: pickedCard % 13
            };
        };
    }
};
var cardPicker = deck.createCardPicker();
var pickedCard = cardPicker();
// console.log("card: " + pickedCard.card + " of " + pickedCard.suit);
console.log(pickedCard.suit + " : " + pickedCard.card);
// --- 重载 --- //
