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
interface ClockInterface {
  tick();
}

interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}

function createClock(
  ctor: ClockConstructor,
  hour: number,
  minute: number
): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) {}

  tick() {
    console.log("Beep beep");
  }
}

class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) {}

  tick() {
    console.log("tick toc");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 54);
