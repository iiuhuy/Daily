// ClickedPoints.js

// 顶点着色器
var VSHADER_SOURCE =
  'attribute vec4 aPosition;\n' +
  'void main() { \n' +
  '   gl_Position = a_Position;\n' +
  '   gl_PointSize = 10.0;\n' +
  '}\n';

// 片元着色器

let FSHADER_SOURCE =
  'void main() {\n' +
  '   gl_Position = a_Position;\n' +
  '   gl_PointSize = 10.0;\n' +
  '}\n';


function main() {
  // 获取 canvas 
  let canvas = document.getElementById('webgl');

  // 获取上下文
  let gl = getWebGLContext(canvas);

  if (!gl) {
    console.log("渲染 WebGL 上下文失败.");
    return;
  }

  // 初始化着色器
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log("初始化 shaders 失败");
    return;
  }

  // 获取 a_Position 变量的储存位置
  let a_Position = gl.getAttribLocation(gl.program, 'a_Position');

  if (a_Position < 0) {
    console.log("获取 a_Position 本地储存失败");
    return;
  }

  // 注册鼠标点击事件响应函数
  canvas.onmousedown = function (ev) {
    click(ev, gl, canvas, a_Position);
  }

  // 清空 canvas 背景色
  gl.clear(gl.COLOR_BUFFER_BIT);
}

let g_points = []; // 鼠标点击的位置数组

function click(ev, gl, canvas, a_Position) {
  let x = ev.clientX;      // 鼠标点击处的 x 坐标
  let y = ev.clientY;      // 鼠标点击处的 y 坐标

  let rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.height/2)/(canvas.height/2);
  y = (canvas.width/2 - (y - rect.top))/(canvas.width/2);
  
  // 将坐标存储到 g_points 数组里面
  g_points.push(x);
  g_points.push(y);

  // 清除 canvas
  gl.clear(gl.COLOR_BUFFER_BIT);

  let len = g_points.length;
  for (var i = 0; i < len; i += 2) {
    // 将点的位置传递变量中 a_Position 
    gl.vertexAttrib3f(a_Position, g_points[i], g_points[i+1], 0.0);
    // 绘制点
    gl.drawArrays(gl.POINTS, 0, 1);
  }
}