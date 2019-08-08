// HelloCanvas.js
// 执行流： 
// 获取 canvas 元素
// 获取 WebGL 上下文
// 设置背景颜色
// 清空 canvas 

function main() {
  // 获取 canvas 元素
  let canvas = document.getElementById("webgl");

  // 获取 WebGL 上下文
  let gl = getWebGLContext(canvas);
  if (!gl) {
    console.log("Failed to the rendering contex for WenGL");
    return;
  }

  // 指定清空 canvas 的颜色
  gl.clearColor(0.5, 0.5, 0.5, 1.0);

  // 清空 canvas
  gl.clear(gl.COLOR_BUFFER_BIT);
}

/** getWebGLContext(element,[, debug]) -> form cuon-utils.js
 * @function 获取 WebGL 绘图上下文，如果开启了 debug 属性，遇到错误将会在控制台显示
 * @param element 指定 canvas 元素
 * @param debug 可选，默认 false。true 时错误会在控制台显示
 * @returns non-null WebGL 绘图上下文
 *          null  WebGL 不可用
 */
function getWebGLContext(canvas, opt_debug) {
  // Get the rendering context for WebGL
  var gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) return null;

  // if opt_debug is explicitly false, create the context for debugging
  if (arguments.length < 2 || opt_debug) {
    gl = WebGLDebugUtils.makeDebugContext(gl);
  }

  return gl;
}

// color
// (0.0, 0.0, 0.0, 1.0)  黑色
// (1.0, 0.0, 0.0, 1.0)  红色
// (0.0, 1.0, 0.0, 1.0)  绿色
// (0.0, 0.0, 1.0, 1.0)  蓝色
// (1.0, 1.0, 0.0, 1.0)  黄色
// (1.0, 0.0, 1.0, 1.0)  紫色
// (0.0, 1.0, 1.0, 1.0)  青色
// (1.0, 1.0, 1.0, 1.0)  白色
// (0.5, 0.5, 0.5, 1.0)  灰色
// (255, 215, 0.0, 1.0)  金色 不能这样取值