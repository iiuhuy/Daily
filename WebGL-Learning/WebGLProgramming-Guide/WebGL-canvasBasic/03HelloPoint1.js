// HelloPoint.js
// 顶点着色器程序
let VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' + // 声明 Attribute 变量
  'void main() {\n' +
  ' gl_Position = a_Position;\n' +
  ' gl_PointSize = 10.0;\n' + // 设置尺寸 -> gl_PointSize
  '}\n';

// 片元着色器程序
let FSHADER_SOURCE =
  'void main() {\n' +
  ' gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);\n' + // 设置颜色
  '}\n';


function main() {
  // 获取 canvas 元素
  let canvas = document.getElementById("webgl");

  // 获取 WebGL 上下文
  let gl = getWebGLContext(canvas);
  if (!gl) {
    console.log("Failed to the rendering contex for WenGL");
    return;
  }

  // --- 初始化着色器 --- //
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log("Filed to initialize shaders!");
    return;
  }

  // 获取 Attribute 变量的储存位置
  // 第一个参数是：程序对象(program object) 包括顶点着色器和片元着色器在第八章详细介绍
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  console.log("a_Position Value is: " + a_Position);
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  
  // 将顶点位置传输给 Attribute 变量
  gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);

  // 指定清空 canvas 的颜色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // 清空 canvas
  gl.clear(gl.COLOR_BUFFER_BIT);

  // --- 绘制一个点 --- //
  gl.drawArrays(gl.POINTS, 0, 1);
}