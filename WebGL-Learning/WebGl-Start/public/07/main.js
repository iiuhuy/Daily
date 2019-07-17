const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl");

if (!gl) {
  throw new Error("WebGL not supported!!!");
}

// 初始化需要用到的 顶点数据 和 颜色数据
const vertexData = [
  // // test
  // 0.5,
  // 0.5,
  // 0.5,
  // 0.5,
  // -0.5,
  // 0.5,
  // -0.5,
  // 0.5,
  // 0.5,

  // 有 6 个面的颜色: 每个面其实都是由两个三角形顺时针拼接起来的矩形
  // Front
  0.5,
  0.5,
  0.5,
  0.5,
  -0.5,
  0.5,
  -0.5,
  0.5,
  0.5,
  -0.5,
  0.5,
  0.5,
  0.5,
  -0.5,
  0.5,
  -0.5,
  -0.5,
  0.5,

  // Left
  -0.5,
  0.5,
  0.5,
  -0.5,
  -0.5,
  0.5,
  -0.5,
  0.5,
  -0.5,
  -0.5,
  0.5,
  -0.5,
  -0.5,
  -0.5,
  0.5,
  -0.5,
  -0.5,
  -0.5,

  // Back
  -0.5,
  0.5,
  -0.5,
  -0.5,
  -0.5,
  -0.5,
  0.5,
  0.5,
  -0.5,
  0.5,
  0.5,
  -0.5,
  -0.5,
  -0.5,
  -0.5,
  0.5,
  -0.5,
  -0.5,

  // Right
  0.5,
  0.5,
  -0.5,
  0.5,
  -0.5,
  -0.5,
  0.5,
  0.5,
  0.5,
  0.5,
  0.5,
  0.5,
  0.5,
  -0.5,
  0.5,
  0.5,
  -0.5,
  -0.5,

  // Top
  0.5,
  0.5,
  0.5,
  0.5,
  0.5,
  -0.5,
  -0.5,
  0.5,
  0.5,
  -0.5,
  0.5,
  0.5,
  0.5,
  0.5,
  -0.5,
  -0.5,
  0.5,
  -0.5,

  // Bottom
  0.5,
  -0.5,
  0.5,
  0.5,
  -0.5,
  -0.5,
  -0.5,
  -0.5,
  0.5,
  -0.5,
  -0.5,
  0.5,
  0.5,
  -0.5,
  -0.5,
  -0.5,
  -0.5,
  -0.5
];

// 使用随机数
function randomColor() {
  return [Math.random(), Math.random(), Math.random()];
}

// let colorData = [...randomColor(), ...randomColor(), ...randomColor()];
let colorData = [];
for (let plane = 0; plane < 6; plane++) {
  let planeColor = randomColor();
  for (let vertex = 0; vertex < 6; vertex++) {
    colorData.push(...planeColor);
  }
}

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
gl.enable(gl.DEPTH_TEST); // depth 测试 三维启动深度测试。不然会发现形状标变得很奇怪～

/* 矩阵 */
// uniformLocations object
const uniformLocations = {
  matrix: gl.getUniformLocation(program, `matrix`)
};
// const matrix = mat4.create();   // 会报错...
const matrix = glMatrix.mat4.create(); // http://glmatrix.net/docs/module-mat4.html
const projectionMatrix = glMatrix.mat4.create(); // 创建第二个矩阵，投影矩阵代替透视矩阵
// 创建一个占位符矩阵，最终将要调用它, 它是两者相乘的结果，上传到着色器程序
glMatrix.mat4.perspective(
  projectionMatrix,
  (75 * Math.PI) / 180, // vertical field-of-view (angle, radians) 垂直的视角
  canvas.width / canvas.height, // aspect W/H
  1e-4, // near cull distance
  1e4 // far null distance
);

const finalMatrix = glMatrix.mat4.create();
// let result = glMatrix.mat4.create();
// let result = mat4.translate(glMatrix.mat4.create(), matrix, [2, 5, 1]);
// let result2 = mat4.translate(glMatrix.mat4.create(), result, [2, 5, 1]);
// glMatrix.mat4.translate(matrix, matrix, [2, 5, 1]);
// glMatrix.mat4.translate(matrix, matrix, [-1, -3, 0]);

glMatrix.mat4.translate(matrix, matrix, [0.2, 0.5, -2]); // 移动
glMatrix.mat4.scale(matrix, matrix, [0.5, 0.5, 0.5]); // 缩放
console.log(matrix);

// gl.drawArrays(gl.LINE_LOOP, 0, 3);

/* 着色器 GLSL 语言里面不要忘记分号, 否则显示不出来诶。 */

// 如何让它转动起来，我们可以做一个动画函数
// 使用 requestAnimationFrame(animate)
function animate() {
  requestAnimationFrame(animate);

  glMatrix.mat4.rotateX(matrix, matrix, Math.PI / 2 / 70);
  // glMatrix.mat4.rotateZ(matrix, matrix, Math.PI / 2 / 70); // 绕 z 轴旋转角度
  // glMatrix.mat4.rotateY(matrix, matrix, Math.PI / 2 / 120);
  glMatrix.mat4.multiply(finalMatrix, projectionMatrix, matrix); // P * M

  gl.uniformMatrix4fv(uniformLocations.matrix, false, finalMatrix);
  gl.drawArrays(gl.TRIANGLES, 0, vertexData.length / 3);
}

animate();
