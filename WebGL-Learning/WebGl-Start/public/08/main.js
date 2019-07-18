const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl");

if (!gl) {
  throw new Error("WebGL not supported!!!");
}

// 球体点云
function spherePointCloud(pointCount) {
  let points = []; 
  for (let i = 0; i < pointCount; i++) {
    const r = () => Math.random() - 0.5; // -.5 < x < 0.5
    const inputPoint = [r(), r(), r()];
    // console.log(inputPoint);

    const outputPoint = vec3.normalize(vec3.create(), inputPoint);

    points.push(...outputPoint);
  }

  return points;
}

const vertexData = spherePointCloud(1e5);

const positionBuffer = gl.createBuffer(); // 在 GPU 上创建一个缓冲区
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

// 创建一个 vertex shader 程序
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(
  vertexShader,
  `
  precision mediump float;

  attribute vec3 position;
  varying vec3 vColor;

  uniform mat4 matrix;

  void main() {
    vColor = vec3(position.xy, 1);
    gl_Position = matrix * vec4(position, 1);
  }
  `
);

gl.compileShader(vertexShader);

// fragment shader
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
console.log(gl.getShaderInfoLog(fragmentShader));

// 将其链接起来
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

const positionLocation = gl.getAttribLocation(program, `position`);
gl.enableVertexAttribArray(positionLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

gl.useProgram(program);
gl.enable(gl.DEPTH_TEST); // depth 测试 三维启动深度测试。不然会发现形状标变得很奇怪～

/* 矩阵 */
// uniformLocations object
const uniformLocations = {
  matrix: gl.getUniformLocation(program, `matrix`)
};

// const matrix = mat4.create();   // 会报错...
const modelMatrix = glMatrix.mat4.create(); // http://glmatrix.net/docs/module-mat4.html\
const viewMatrix = glMatrix.mat4.create();
const projectionMatrix = glMatrix.mat4.create(); // 创建第二个矩阵，投影矩阵代替透视矩阵
// 创建一个占位符矩阵，最终将要调用它, 它是两者相乘的结果，上传到着色器程序
glMatrix.mat4.perspective(
  projectionMatrix,
  (75 * Math.PI) / 180, // vertical field-of-view (angle, radians) 垂直的视角
  canvas.width / canvas.height, // aspect W/H
  1e-4, // near cull distance
  1e4 // far null distance
);

const mvMatrix = glMatrix.mat4.create(); // 创建一个中间的矩阵, 因为一次只能乘两个
const mvpMatrix = glMatrix.mat4.create(); // mvp

glMatrix.mat4.translate(modelMatrix, modelMatrix, [0, 0, 0]); // 移动
glMatrix.mat4.translate(viewMatrix, viewMatrix, [0, 0.1, 2]); // 向左和向后
glMatrix.mat4.invert(viewMatrix, viewMatrix); // 反转
// glMatrix.mat4.scale(mvMatrix, mvMatrix, [0.5, 0.5, 0.5]); // 缩放
console.log(mvMatrix);

// gl.drawArrays(gl.LINE_LOOP, 0, 3);

/* 着色器 GLSL 语言里面不要忘记分号, 否则显示不出来诶。 */
// 如何让它转动起来，我们可以做一个动画函数
// 使用 requestAnimationFrame(animate) 做一个简单的动画循环
function animate() {
  requestAnimationFrame(animate);

  glMatrix.mat4.rotateY(modelMatrix, modelMatrix, 0.03);

  glMatrix.mat4.multiply(mvMatrix, viewMatrix, modelMatrix);
  glMatrix.mat4.multiply(mvpMatrix, projectionMatrix, mvMatrix); // model view projection matrix  -> mvpMatrix
  gl.uniformMatrix4fv(uniformLocations.matrix, false, mvpMatrix);
  // gl.drawArrays(gl.TRIANGLES, 0, vertexData.length / 3);
  gl.drawArrays(gl.POINTS, 0, vertexData.length / 3);     // 使用点画
}

animate();
