// HelloPoint.js
// 顶点着色器程序
let VSHADER_SOURCE =
  'void main() {\n' +
  ' gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n' + // 设置坐标
  ' gl_PointSize = 10.0;\n' + // 设置尺寸 -> gl_PointSize
  '}\n';

// 片元着色器程序
let FSHADER_SOURCE =
  'void main() {\n' + 
  ' gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + // 设置颜色
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

  // 指定清空 canvas 的颜色
  gl.clearColor(0.5, 0.5, 0.5, 1.0);

  // 清空 canvas
  gl.clear(gl.COLOR_BUFFER_BIT);

  // --- 绘制一个点 --- //
  gl.drawArrays(gl.POINTS, 0, 1);
}