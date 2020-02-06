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
// class Animal {
//   private name: string;

//   constructor(name: string) {
//     this.name = name;
//   }

//   move(distance: number = 0) {
//     console.log(`${this.name} moved ${distance} m`);
//   }
// }

// // 河马类
// class Rhino extends Animal {
//   constructor() {
//     super("Rhino");
//   }
// }

// class Employee {
//   private name: string;
//   constructor(name: string) {
//     this.name = name;
//   }
// }

// let animal = new Animal("Goat");
// let rhino = new Rhino();
// let employee = new Employee("Jack");

// animal = rhino; // 可行
// animal = employee; // 不可行

// --- 存取器 --- //
// let passcode = "secret passcode";

// class Employee {
//   private _fullName: string;

//   get fullName(): string {
//     return this._fullName;
//   }

//   set fullName(newName: string) {
//     if (passcode && passcode === "secret passcode") {
//       this._fullName = newName;
//     } else {
//       console.log("Error: Unauthorized update of employee!");
//     }
//   }
// }

// let employee = new Employee();
// employee.fullName = "Jack Stenve";

// if (employee.fullName) {
//   console.log(employee.fullName);
// }

// --- 静态属性 --- //
// class Grid {
//   static origin = { x: 0, y: 0 };

//   scale: number;

//   constructor(scale: number) {
//     this.scale = scale;
//   }

//   calculateDistanceFromOrigin(point: { x: number; y: number }) {
//     let xDist = point.x - Grid.origin.x;
//     let yDist = point.y - Grid.origin.y;

//     return Math.sqrt(xDist * xDist + yDist * yDist) * this.scale;
//   }
// }

// let gridOne = new Grid(2.0); // 缩放比例
// let gridTwo = new Grid(5.0); // 缩放比例

// console.log(gridOne.calculateDistanceFromOrigin({ x: 3, y: 4 }));
// console.log(gridTwo.calculateDistanceFromOrigin({ x: 3, y: 4 }));

// --- 抽象类 --- //
// 通常是作为其他派生类的基类使用, 不能被直接实例化, 需要在派生类中实现.
// abstract class Department {
//   name: string;

//   constructor(name: string) {
//     this.name = name;
//   }

//   printName(): void {
//     console.log("Department name " + this.name);
//   }

//   abstract printMeeting(): void; // 抽象方法需要在子类实现
// }/

// class AccountingDepartment extends Department {
//   constructor() {
//     super("Accounting ad Auditing");
//   }

//   printMeeting(): void {
//     console.log("The Accounting Department meets each Monday at 10am");
//   }

//   generateRrports(): void {
//     console.log("Generating accounting reports...");
//   }
// }

// let department: Department; // 抽象类作为类型, 不能被实例化
// department = new AccountingDepartment(); // 派生类可以实例化
// department.printName();
// department.printMeeting();

// --- 高级技巧 --- //
// 对静态属性做修改 --- 构造函数
// class Greeter {
//   static standardGreeting = "Hello, there";

//   greeting: string;

//   constructor(message?: string) {
//     this.greeting = message;
//   }

//   greet() {
//     if (this.greeting) {
//       return "Hello, " + this.greeting;
//     } else {
//       return Greeter.standardGreeting;
//     }
//   }
// }

// let greeter: Greeter;
// greeter = new Greeter();
// console.log(greeter.greet());

// let greeterMaker: typeof Greeter = Greeter;
// greeterMaker.standardGreeting = "Hey there";

// let greeter2: Greeter = new greeterMaker();
// console.log(greeter2.greet());

// 使用类做接口
// interface Point {
//   x: number;
//   y: number;
// }

// 将 interface 换成 class
class Point {
  x: number;
  y: number;
}

interface Point3d extends Point {
  z: number;
}

let point3d: Point3d = { x: 1, y: 3, z: 3 };
console.log(point3d);
