// 类
// --- 基本示例 --- //
// class Greeter {
//   greeting: string;
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
//   constructor(message: string) {
//     this.greeting = message;
//   }
//   greet() {
//     console.log("Hello " + this.greeting);
//   }
// }
// let gre = new Greeter("TypeScript");
// gre.greet();
// --- 继承 --- //
// 基类
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.move = function (distance) {
        if (distance === void 0) { distance = 0; }
        console.log(this.name + " moved " + distance + " m");
    };
    return Animal;
}());
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake(name) {
        return _super.call(this, name) || this;
    }
    Snake.prototype.move = function (distance) {
        if (distance === void 0) { distance = 5; }
        console.log("Slithering...");
        _super.prototype.move.call(this, distance);
    };
    return Snake;
}(Animal));
var Horse = /** @class */ (function (_super) {
    __extends(Horse, _super);
    function Horse(name) {
        return _super.call(this, name) || this;
    }
    Horse.prototype.move = function (distance) {
        if (distance === void 0) { distance = 10; }
        console.log("Galloping!!!");
        _super.prototype.move.call(this, distance);
    };
    return Horse;
}(Animal));
var sna = new Snake("python");
var hor = new Horse("Knight");
sna.move(5);
hor.move(10);
// 公共, 私有与受保护的修饰符
// readonly 修饰符
// 存取器
// 静态属性
// 抽象类
// 高级技巧
