const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl");

if (!gl) {
  throw new Error("WebGL not supported!!!");
}

const vertexData = [

  // Front
  0.5, 0.5, 0.5, // top right 
  0.5, -.5, 0.5, // bottom right
  -.5, 0.5, 0.5, // top left
  -.5, 0.5, 0.5, // top left
  0.5, -.5, 0.5, // bottom right
  -.5, -.5, 0.5, // bottom left

  // Left
  -.5, 0.5, 0.5,
  -.5, -.5, 0.5,
  -.5, 0.5, -.5,
  -.5, 0.5, -.5,
  -.5, -.5, 0.5,
  -.5, -.5, -.5,

  // Back
  -.5, 0.5, -.5,
  -.5, -.5, -.5,
  0.5, 0.5, -.5,
  0.5, 0.5, -.5,
  -.5, -.5, -.5,
  0.5, -.5, -.5,

  // Right
  0.5, 0.5, -.5,
  0.5, -.5, -.5,
  0.5, 0.5, 0.5,
  0.5, 0.5, 0.5,
  0.5, -.5, 0.5,
  0.5, -.5, -.5,

  // Top
  0.5, 0.5, 0.5,
  0.5, 0.5, -.5,
  -.5, 0.5, 0.5,
  -.5, 0.5, 0.5,
  0.5, 0.5, -.5,
  -.5, 0.5, -.5,

  // Underside
  0.5, -.5, 0.5,
  0.5, -.5, -.5,
  -.5, -.5, 0.5,
  -.5, -.5, 0.5,
  0.5, -.5, -.5,
  -.5, -.5, -.5,
];

// 构造一个数组循环
function repeat(n, pattern) {
  return [...Array(n)].reduce(sum => sum.concat(pattern), []);
}

// 创建 uv
const uvData = repeat(6, [
  /*
    (0,1)               (1,1) 
      ②*****************④
      * *                *
      *   *              *
      *     *            *
      *       *          *
      *         *        *
      *           *      *
      *             *    *
      *               *  *
      ①*****************③
    (0,0)               (1,0)
  */ 
  // 如何将图像映射到三角形或者面上, 使用 uv 贴图 
  // start  0,0 move cw, 两个三角形
  0, 0,
  0, 1,
  1, 0,

  1, 0,
  0, 1,
  1, 1
]);

const positionBuffer = gl.createBuffer(); // 在 GPU 上创建一个缓冲区
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

const uvBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvData), gl.STATIC_DRAW);

// RESOURCE LOADING
// ================
function loadTexture(url) {
  const texture = gl.createTexture(); // 创建一个纹理
  const image = new Image();

  // 设置事件监听
  image.onload = e => {
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.textImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    gl.generateMipmap(gl.TEXTURE_2D);
    
  };
  image.src = url;
  return texture;
}

const brick = loadTexture(`firefox.jpeg`);

gl.activeTexture(gl.TEXTURE0);  
gl.bindTexture(gl.TEXTURE_2D, brick)

// SHADER PROGRAM
// ==============
let uniformLocations;
// 创建一个 vertex shader 程序
(function shaderProgram() {  
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);

  gl.shaderSource(
    vertexShader,
    `
    precision mediump float;
  
    attribute vec3 position;
    varying vec2 uv;
  
    varing vec2 vUV;
  
    uniform mat4 matrix;
  
    void main() {
      vUV = uv;
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
  
    varying vec2 vUV;
    uniform sampler2D textureID;
  
    void main() {
      gl_FragColor = texture2D(textureID, vUV);
    }
  `
  );
  gl.compileShader(fragmentShader);
  // console.log(gl.getShaderInfoLog(fragmentShader));
  
  // 将其链接起来
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  const positionLocation = gl.getAttribLocation(program, `position`);
  gl.enableVertexAttribArray(positionLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

  const uvLocation = gl.getAttribLocation(program, `uv`);
  gl.enableVertexAttribArray(uvLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
  gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, 0, 0);
  
  gl.useProgram(program);
  gl.enable(gl.DEPTH_TEST); // depth 测试 三维启动深度测试。不然会发现形状标变得很奇怪～

  /* 矩阵 */
  // uniformLocations object
  const uniformLocations = {
    matrix: gl.getUniformLocation(program, `matrix`),
    textureID: gl.getUniformLocation(program, 'textureID')
  };

  gl.uniform1i(uniformLocations.textureID, 0);
})();

// MATRICES
// ========
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

// glMatrix.mat4.translate(modelMatrix, modelMatrix, [0, 0, 0]); // 移动
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

  // glMatrix.mat4.rotateY(modelMatrix, modelMatrix, 0.03);
  glMatrix.mat4.rotateX(modelMatrix, modelMatrix, Math.PI / 60);
  glMatrix.mat4.rotateY(modelMatrix, modelMatrix, Math.PI / 160);

  glMatrix.mat4.multiply(mvMatrix, viewMatrix, modelMatrix);
  glMatrix.mat4.multiply(mvpMatrix, projectionMatrix, mvMatrix); // model view projection matrix  -> mvpMatrix
  gl.uniformMatrix4fv(uniformLocations.matrix, false, mvpMatrix);
  gl.drawArrays(gl.TRIANGLES, 0, vertexData.length / 3);
  // gl.drawArrays(gl.POINTS, 0, vertexData.length / 3);     // 使用点画
}

animate();
