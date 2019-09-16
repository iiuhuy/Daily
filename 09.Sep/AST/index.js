// const generator = require("@babel/generator");
// const parser = require("@babel/parser");
// const traverse = require("@babel/traverse");
// const types = require("@babel/types");

function compile(code) {
  // 1.parser: 字符串转换成语法树
}

// code 的语法树可以在 https://astexplorer.net/ 注意点的网站去测试
const code = `
function foo() {
  console.log('bar');
}
`;

const result = compile(code);

console.log(result.code);
