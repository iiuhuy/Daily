// call，apply，bind 三兄弟 ~
const person = {
  name: "duang~",
  age: 22,
  from: "China",
  introduce() {
    console.log(
      `Hello everyone! My name is ${this.name}. I'm ${this.age} years old.I'm from ${this.from}`
    );
  }
};

// this 此时指向 person
// console.log(person);
// () => Hello everyone! My name is YuTengjing. I'm 22 years old.
console.log(person.introduce());
console.log("\r\n-----  call  ----- ↓ \r\n");
// ----- call ----- //
const Dongdong = {
  name: "dongdong",
  age: 21,
  from: "Guangdong China"
};

// () => Hello everyone! My name is dongdong. I'm 21 years old.
// 这个函数中的 this 指向被改成了 Dongdong.
console.log(person.introduce.call(Dongdong));
console.log("\r\n-----  apply  ----- ↓ \r\n");
// ----- apply ----- //
function likeSports(...hobbies) {
  // console.log(...hobbies);
  console.log(`${this.name} likes ${hobbies.join(", ")}.`);
}

/**
 * 下面两个等价: apply 只有两个参数，且第二个参数为调用函数时的参数构成的数组
 * 如果不用给函数传参数，那么它俩就其实是完全一样的，需要传参数的时候注意它的应该将参数转换成数组形式。
 */
// () => Bob likes swimming, basketball, Pingpong.
likeSports.call({ name: "Bob" }, "swimming", "basketball", "Pingpong");

// () => Bob likes swimming, basketball, Pingpong.
likeSports.apply({ name: "Bob" }, ["swimming", "basketball", "Pingpong"]);

// 当遇到一些需要多个参数的，有多参数构成的数组使或者说参数很多时该怎么办呢？
// 例如: Math.max 参数为多参数
console.log(Math.max(9, 9, 6)); // => 9

// 现在已知一个很大的元素为随机大小的整数数组：造 10000 个随机数
const bigRandomArray = [...Array(10000).keys()].map(num =>
  Math.trunc(num * Math.random())
);

// 怎样使用 Math.max 获取 bigRandomArray 中的最大值呢？Math.max 接受的是多参数而不是数组参数啊!
// 思考下面的写法:
console.log(Math.max.apply(null, bigRandomArray));

// 可以上 ES6 的话就简单了，使用扩展运算符即可，优雅简洁:
// console.log(Math.max(...bigRandomArray));

console.log("\r\n-----  bind  ----- ↓ \r\n");
/**
 * bind () 方法会创建一个新函数。
 * 当这个新函数被调用时，bind () 的第一个参数将作为它运行时的 this，
 * 之后的一序列参数将会在传递的实参前传入作为它的参数。(来自于 MDN )
 */
// 特点: 1.返回一个函数  2.可以传入参数
// 一个简单的例子:
const other = {
  name: "FengQingYang",
  age: 103
};

function introduced() {
  console.log(`Hello ! My name is ${this.name}. I'm ${this.age} years old.`);
}

const friend = { name: "老师你好我叫何同学", age: 21 };
other.introduced = introduced.bind(friend);

// person.introduced 的 this 已经被绑定到 friend 上了
// () => Hello ! My name is 老师你好我叫何同学. I'm 21 years old.
console.log(other.introduced());
// () => Hello ! My name is 老师你好我叫何同学. I'm 21 years old.
console.log(other.introduced.call(other));

// 春招的时候被问过 bind 的第二个参数是干嘛用的，
// 因为我之前写代码本身不怎么用这几个 API，用的时候我也只用第一个参数，
// 所以当时面试的时候被问这个问题的时候我还是愣了一下。
// 不过其实如果可以传多个参数的话，猜也能猜得出来是干嘛用的，我当时就猜对了 φ(*￣0￣)。

// ---------------   参考链接   --------------- //
console.log("\r\n ↓ -----  read  ----- ↓ \r\n");

const read = {
  call: [
    "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call",
    "https://github.com/mqyqingfeng/Blog/issues/11"
  ],
  apply:
    "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply",
  bind: [
    "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind",
    "https://github.com/mqyqingfeng/Blog/issues/12"
  ]
};

console.log(read);
