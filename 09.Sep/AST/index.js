const generator = require("@babel/generator");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse");
const t = require("@babel/types");

function compile(code) {
  // 1.parser: 字符串转换成语法树（语法树是: 一个 JSON 的对象）
  const ast = parser.parse(code);

  // 2.traverse： 遍历, 访问语法树的每个节点
  const visitor = {
    CallExpression(path) {
      const { callee } = path.node;
      if (
        t.isMemberExpression(callee) &&
        callee.object.name === "console" &&
        callee.property.name === "log"
      ) {
        const funcPath = path.findParent(p => {
          return p.isFunctionDeclaration();
        });
        path.node.arguments.unshift(t.stringLiteral(`[${funcPath.node.id.name}]`));
      }
    }
  };
  traverse.default(ast, visitor);

  // 3.generate: 语法树再转换成字符串
  return generator.default(ast, {}, code);
}

// code 的语法树可以在 https://astexplorer.net/ 注意点的网站去测试
const code = `
function foo() {
  console.log('bar');
}
`;

const result = compile(code);

console.log(result.code);
