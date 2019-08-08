// ColoredPoints.js

// 顶点着色器
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'void main() { \n' +
  '   gl_Position = a_Position;\n' +
  '   gl_PointSize = 10.0;\n' +
  '}\n';

// 片元着色器
var FSHADER_SOURCE =
  'precision mediump float;\n' +
  'uniform vec4 u_FragColor;\n' + // uniform 变量
  'void main() {\n' +
  // '   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + // 设置颜色
  '   gl_FragColor = u_FragColor;\n' + // 赋值
  '}\n';

function main() {
  // 获取 canvas 
  var canvas = document.getElementById('webgl');

  // 获取上下文
  var gl = getWebGLContext(canvas);

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
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log("获取 a_Position 本地储存失败");
    return;
  }

  // 获取 u_FragColor 变量的存储位置
  var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log("本地储存 u_FragColor 失败");
    return;
  }

  // 注册鼠标点击事件响应函数
  canvas.onmousedown = function (ev) {
    // 在匿名函数中调用 click 函数。 这种方式很常见，在这本书中
    click(ev, gl, canvas, a_Position, u_FragColor);
  }

  // 清空 canvas 背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0); // 没有清空就是白色了

  gl.clear(gl.COLOR_BUFFER_BIT);
}

const g_points = []; // 鼠标点击的位置数组
const g_colors = []; // 储存点颜色的数组
function click(ev, gl, canvas, a_Position, u_FragColor) {
  var x = ev.clientX; // 鼠标点击处的 x 坐标
  var y = ev.clientY; // 鼠标点击处的 y 坐标
  var rect = ev.target.getBoundingClientRect();
  // console.log(x, y);
  // console.log(rect);
  // console.log("canvas 原点在浏览器客户区中的坐标： (" + rect.left + "," + rect.top + ")");
  // console.log("转换成 canvas 坐标系下的坐标： (" + (x - rect.left) + "," + (y - rect.top) + ")");
  // console.log("canvas 中心点的坐标： (" + (canvas.height / 2) + "," + (canvas.width / 2) + ")");
  // console.log("将 canvas 的原点平移到中心点： (" + ((x - rect.left) - canvas.height / 2) + "," + (canvas.width / 2 - (y - rect.top)) + ")");

  // 由于浏览器客户区 -> canvas 坐标系 -> WebGL 坐标系 
  x = ((x - rect.left) - canvas.height / 2) / (canvas.height / 2);
  y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2);

  // 将坐标存储到 g_points 数组里面
  // g_points.push(x);
  // g_points.push(y);
  // 也可以组合存储在数组中
  g_points.push([x, y]);

  // 将点的颜色存储到 g_colors 数组中
  if (x >= 0.0 && y >= 0.0) {
    g_colors.push([1.0, 0.0, 0.0, 1.0]); // 红色
  } else if (x < 0.0 && y < 0.0) {
    g_colors.push([0.0, 1.0, 0.0, 1.0]); // 绿色
  } else {
    g_colors.push([1.0, 1.0, 1.0, 1.0]); // 白色
  }

  // 清除 canvas，背景色默认是透明，(0.0, 0.0, 0.0, 0.0)
  gl.clear(gl.COLOR_BUFFER_BIT); // 应该在每次绘画之前都要来调用 gl.clear 用来指定背景色清空

  var len = g_points.length;
  // console.log("g_points 数组的长度：" + len);
  // for (var i = 0; i < len; i++) {  // 这个地方找了半天，我就说没次怎么点击两下才会改变颜色
  for (var i = 0; i < len; i++) {

    // debugger

    // 将点的位置传递变量中 a_Position 
    // gl.vertexAttrib3f(a_Position, g_points[i], g_points[i + 1], 0.0);
    // 如果是使用 g_postions.push([x,y]) 的方式
    var xy = g_points[i];
    var rgba = g_colors[i];
    gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);

    // 将点的颜色传输给 g_FragColor 变量
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

    // 绘制点
    gl.drawArrays(gl.POINTS, 0, 1);
  }
}