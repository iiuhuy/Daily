// 06MultiPoint.js 步骤
// 1.获取 WebGL 绘图上下文
// 2.初始化着色器
// 3.设置点的坐标信息   (和 05 不同的一点)
// 4.设置 canvas 背景色
// 5.清空 canvas
// 6.绘制

/**
 * 使用缓冲区对象向顶点着色器传入多个顶点的数据
 * 1.创建缓冲区对象  gl.createBuffer()
 * 2.绑定缓冲区对象  gl.bindBuffer()
 * 3.将数据写入缓冲区对象  gl.bufferData()
 * 4.将缓冲区对象分配给一个 Attribute 变量  gl.vertexAttribPointer()
 * 5.开启 attribute 变量   gl.enableVertexAttribArray()
 */

// 顶点着色器
let VSHADER_SOURCE =
  "attribute vec4 a_Position;\n" +
  "void main() {\n" +
  "  gl_Position = a_Position;\n" +
  "  gl_PointSize = 10.0;\n" +
  "}\n";

// 片元着色器
let FSHADER_SOURCE =
  "void main() {\n" + "  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n" + "}\n";

function main() {
  // 获取 canvas
  let canvas = document.getElementById("webgl");

  // 获取上下文
  let gl = getWebGLContext(canvas);

  if (!gl) {
    console.log("渲染 WebGL 上下文失败");
    return;
  }

  // 初始化着色器
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log("初始化 shader 失败");
    return;
  }

  // 设置顶点位置
  let n = initVertexBuffers(gl);
  if (n < 0) {
    console.log("设置顶点位置失败！！！" + n);
    return;
  }

  // 设置背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0); // 没有清空就是白色了

  gl.clear(gl.COLOR_BUFFER_BIT);

  // 绘制三个点
  gl.drawArrays(gl.POINTS, 0, n); // n 是 3

  // 获取 a_Position 变量的存储位置
  // let a_Positi = gl.getAttribLocation(gl.program, 'a_Position');
}

function initVertexBuffers(gl) {
  var vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);

  var n = 3;

  // 创建缓冲区对象
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log("创建 Buffer 对象失败！");
    return -1;
  }

  // 将缓冲区对象绑定到目标
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // 向缓冲区对象中写入数据
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  var a_Position = gl.getAttribLocation(gl.program, "a_Position");
  if (a_Position < 0) {
    console.log("获取本地存储位置失败！");
    return -1;
  }

  // 将缓冲区对象分配给 a_Position 变量
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  // 连接 a_Position 变量与分配给它的缓冲区对象
  gl.enableVertexAttribArray(a_Position);

  return n;
}
