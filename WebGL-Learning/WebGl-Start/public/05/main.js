const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl");

if (!gl) {
  throw new Error("WebGL not supported!!!");
}

// 初始化需要用到的 顶点数据 和 颜色数据
const vertexData = [
  // front
  0.5,
  0.5,
  0.5,
  0.5,
  -0.5,
  0.5,
  -0.5,
  0.5,
  0.5
];

// const colorData = [
//   1,
//   0,
//   0, // V1.color： red
//   0,
//   1,
//   0, // V2.color: green
//   0,
//   0,
//   1 // V3.color: blue
// ];

// 使用随机数
function randomColor() {
  return [Math.random(), Math.random(), Math.random()];
}

let colorData = [...randomColor(), ...randomColor(), ...randomColor()];

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

const colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);

// vertex shader
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(
  vertexShader,
  `
  precision mediump float;

  attribute vec3 position;
  attribute vec3 color;
  varying vec3 vColor;

  uniform mat4 matrix;

  void main() {
    vColor = color;
    gl_Position = matrix * vec4(position, 1);
  }
  `
);

gl.compileShader(vertexShader);

// fragment
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(
  fragmentShader,
  `
  precision mediump float;
  varying vec3 vColor;

  void main() {
    gl_FragColor = vec4(vColor, 1);
  }
`
);
gl.compileShader(fragmentShader);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

const positionLocation = gl.getAttribLocation(program, `position`);
gl.enableVertexAttribArray(positionLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

const colorLocation = gl.getAttribLocation(program, `color`);
gl.enableVertexAttribArray(colorLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
// gl.vertexAttribPointer(colorLocation, colorBuffer, 3, gl.FLOAT, false, 0, 0); // 如果刚进入缓冲区想要一个顶点的参数？
gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

gl.useProgram(program);

/* 矩阵 */
// uniformLocations object
const uniformLocations = {
  matrix: gl.getUniformLocation(program, `matrix`)
};
// const matrix = mat4.create();   // 会报错...
const matrix = glMatrix.mat4.create(); // http://glmatrix.net/docs/module-mat4.html
// let result = glMatrix.mat4.create();
// let result = mat4.translate(glMatrix.mat4.create(), matrix, [2, 5, 1]);
// let result2 = mat4.translate(glMatrix.mat4.create(), result, [2, 5, 1]);
// glMatrix.mat4.translate(matrix, matrix, [2, 5, 1]);
// glMatrix.mat4.translate(matrix, matrix, [-1, -3, 0]);

glMatrix.mat4.translate(matrix, matrix, [0.2, 0.5, 0]); // 移动
glMatrix.mat4.scale(matrix, matrix, [0.25, 0.25, 0.25]); // 缩放
console.log(matrix);

// gl.drawArrays(gl.LINE_LOOP, 0, 3);

/* 着色器 GLSL 语言里面不要忘记分号, 否则显示不出来诶。 */

// 如何让它转动起来，我们可以做一个动画函数
// 使用 requestAnimationFrame(animate)
function animate() {
  requestAnimationFrame(animate);

  glMatrix.mat4.rotateZ(matrix, matrix, Math.PI / 2 / 60); // 绕 z 轴旋转角度
  gl.uniformMatrix4fv(uniformLocations.matrix, false, matrix);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

animate();
