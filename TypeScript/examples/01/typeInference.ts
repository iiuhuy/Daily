// 类型推断
// 基础类型推断 &　最佳通用类型
// let x = [0, 1, null];
// class Animal {
//   numLegs: number;
// }
// class Bee extends Animal {}
// class Lion extends Animal {}
// // let zoo = [new Bee(), new Lion()];
// // 明确去声明 Animal 这样的数组类型
// let zoo: Animal[] = [new Bee(), new Lion()];

// --- 上下文类型 --- //
// 上下文类型会在很多情况下使用到。
// 通常包含函数的参数，赋值表达式的右边，类型断言，对象成员，数组字面量和返回值语句。上下文类型也会做为最佳通用类型的候选类型。比如：
class Animal {
  numLegs: number;
}
class Bee extends Animal {}
class Lion extends Animal {}
// Animal 会最为最佳通用类型
function createZoo(): Animal[] {
  return [new Bee(), new Lion()];
}

let zoo = createZoo();
