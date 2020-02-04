// 类
// --- 基本示例 --- //
// class Greeter {
//   greeting: string;

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
// class Animal {
//   name: string;

//   constructor(name: string) {
//     this.name = name;
//   }

//   move(distance: number = 0) {
//     console.log(`${this.name} moved ${distance} m`);
//   }
// }

// class Snake extends Animal {
//   constructor(name: string) {
//     super(name);
//   }

//   move(distance: number = 5) {
//     console.log("Slithering...");
//     super.move(distance);
//   }
// }

// class Horse extends Animal {
//   constructor(name: string) {
//     super(name);
//   }

//   move(distance: number = 10) {
//     console.log("Galloping!!!");
//     super.move(distance);
//   }
// }

// let sna = new Snake("python");
// let hor: Animal = new Horse("Knight");
// sna.move(5);
// hor.move(10);

// --- 公共, 私有与受保护的修饰符 --- //
class Animal {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  move(distance: number = 0) {
    console.log(`${this.name} moved ${distance} m`);
  }
}

// 河马类
class Rhino extends Animal {
  constructor() {
    super("Rhino");
  }
}

class Employee {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
}

let animal = new Animal("Goat");
let rhino = new Rhino();
let employee = new Employee("Jack");

animal = rhino; // 可行
animal = employee; // 不可行

// readonly 修饰符
// 存取器
// 静态属性
// 抽象类
// 高级技巧
