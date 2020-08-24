/**
 * 深拷贝
 */

const obj1 = {
  age: 24,
  name: "yuhui",
  address: {
    city: "shenzhen",
  },
  arr: ["a", "b", "c"],
};

// const obj2 = obj1;
const obj2 = deepClone(obj1);

obj2.address.city = "guangzhou";
obj2.arr[0] = "a1";

console.log("1:", obj1.address.city);
console.log("2:", obj2.address.city);
console.log(obj1.arr[0]);

/**
 * 深拷贝
 * @param {Object} obj 要拷贝的对象
 */
function deepClone(obj = {}) {
  if (typeof obj !== "object" || obj == null) {
    // obj 是 null ，或者不是对象和数组，直接返回
    return obj;
  }

  // 初始化返回结果
  let result;
  if (obj instanceof Array) {
    result = [];
  } else {
    result = {};
  }

  for (let key in obj) {
    // 保证 key 不是原型的属性
    if (obj.hasOwnProperty(key)) {
      // 递归调用！！！
      result[key] = deepClone(obj[key]); // 防止对象属性中还有属性
    }
  }

  // 返回结果
  return result;
}

