console.log("------------------------------\r\n");

// 函数作为返回值
function create() {
  const closureA = 100;
  return function () {
    console.log("create", closureA);
  };
}

const fn = create();
const closureA = 200;
fn(); // 100

// ------------------------- 函数作为参数
// 函数作为参数被传递
function print(fnp) {
  const closureB = 200;
  fnp();
}
const closureB = 100;

function fnp() {
  console.log("print", closureB);
}

print(fnp); // 100

// 所有的自由变量的查找，是在函数定义的地方，向上级作用域查找
// 不是在执行的地方！！！

