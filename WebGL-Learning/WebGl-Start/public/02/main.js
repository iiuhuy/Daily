const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl");

if (!gl) {
  throw new Error("WebGL not supported!!!");
}

// alert(`Everything's peachy hear with WebGL`);

// 初始化需要用到的 顶点数据 和 颜色数据
const vertexData = [0, 1, 0, 1, -1, 0, -1, -1, 0];
const colorData = [
  1,
  0,
  0, // V1.color： red
  0,
  1,
  0, // V2.color: green
  0,
  0,
  1 // V3.color: blue
];
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

  void main() {
    vColor = color;
    gl_Position = vec4(position, 1);
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
gl.drawArrays(gl.TRIANGLES, 0, 3);
// gl.drawArrays(gl.LINE_LOOP, 0, 3);

// 着色器 GLSL 语言里面不要忘记分号, 否则显示不出来诶。
