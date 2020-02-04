// 接口的函数类型
// interface SearchFunc {
//   (source: string, subString: string): boolean;
// }

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
class Contral {
  private state: any;
}

interface SelectableContral extends Contral {
  select();
}

// 继承 Contral 就可以实现这个 SelectableContarl
class Button extends Contral implements SelectableContral {
  select() {}
}

class TextBox extends Contral {
  select() {}
}

// ImageC 没有继承 Contral 去实现 SelectableContarl.确少私有成员.
class ImageC implements SelectableContral {
  select() {}
}
