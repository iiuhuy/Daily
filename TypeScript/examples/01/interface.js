// 接口的函数类型
// interface SearchFunc {
//   (source: string, subString: string): boolean;
// }
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// let mySearch: SearchFunc;
// // 函数类型不为 void 和 any 必须返回值
// mySearch = function(src: string, sub: string): boolean {
//   let result = src.search(sub);
//   return result > -1; // 这个条件就返回一个 Boolean 类型
// };
// --- 可索引类型 --- //
// TS 支持两种索引签名: 字符串和数字
// --- 类类 --- //
// interface ClockInterface {
//   tick();
// }
// interface ClockConstructor {
//   new (hour: number, minute: number): ClockInterface;
// }
// function createClock(
//   ctor: ClockConstructor,
//   hour: number,
//   minute: number
// ): ClockInterface {
//   return new ctor(hour, minute);
// }
// class DigitalClock implements ClockInterface {
//   constructor(h: number, m: number) {}
//   tick() {
//     console.log("Beep beep");
//   }
// }
// class AnalogClock implements ClockInterface {
//   constructor(h: number, m: number) {}
//   tick() {
//     console.log("tick toc");
//   }
// }
// let digital = createClock(DigitalClock, 12, 17);
// let analog = createClock(AnalogClock, 7, 54);
// --- 继承接口 --- //
// interface Shape {
//   color: string;
// }
// interface PenStroke {
//   penWidth: number;
// }
// interface Square extends Shape, PenStroke {
//   sideLength: number;
// }
// let squre = {} as Square; // 类型断言
// squre.color = "red";
// squre.penWidth = 5;
// squre.sideLength = 5.0;
// --- 混合接口 --- //
// interface Counter {
//   (start: number): string;
//   interval: number;
//   reset(): void;
// }
// function getCounter(): Counter {
//   let counter = function(star: number) {} as Counter;
//   counter.interval = 213;
//   counter.reset = function() {
//     console.log("counter reset!");
//   };
//   return counter;
// }
// let ct = getCounter();
// ct(10); // 函数类型
// ct.reset(); // 对象类型
// ct.interval = 2.5; // 还有这样的一个属性
// --- 接口继承类 --- //
// 接口同样会继承类的 private 和 protected 成员, 即可私有的和受保护的成员.
var Contral = /** @class */ (function () {
    function Contral() {
    }
    return Contral;
}());
// 继承 Contral 就可以实现这个 SelectableContarl
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.select = function () { };
    return Button;
}(Contral));
var TextBox = /** @class */ (function (_super) {
    __extends(TextBox, _super);
    function TextBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextBox.prototype.select = function () { };
    return TextBox;
}(Contral));
var ImageC = /** @class */ (function () {
    function ImageC() {
    }
    ImageC.prototype.select = function () { };
    return ImageC;
}());
