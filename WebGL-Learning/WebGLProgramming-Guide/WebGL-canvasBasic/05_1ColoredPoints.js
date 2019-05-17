/* global glUtil, document */

;(function() {
  document.addEventListener('DOMContentLoaded', function() {
      //---webgl
      var webgl = document.getElementById('webgl');
      var gl = glUtil.getContext(webgl);
      glUtil.debug(true); // log error
      if (!gl) {
          return;
      }

      // 指定清空canvas的颜色
      // 参数是rgba，范围0.0~1.0
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      // 清空canvas
      // gl.COLOR_BUFFER_BIT颜色缓存，默认清空色rgba(0.0, 0.0, 0.0, 0.0) 透明黑色，通过gl.clearColor指定
      // gl.DEPTH_BUFFER_BIT深度缓存，默认深度1.0，通过gl.clearDepth指定
      // gl.STENCIL_BUFFER_BIT模板缓存，默认值0，通过gl.clearStencil()指定
      gl.clear(gl.COLOR_BUFFER_BIT);
      
      // 在指定位置绘制点
      // 0.着色器源程序
      // 顶点着色器源程序
      var vsSrc = 'attribute vec4 a_Position;' +
          'void main() {' +
          'gl_Position = a_Position;' +   // 设置坐标
          'gl_PointSize = 7.0;' +         // 设置尺寸
      '}';
      // 片元着色器源程序
      //!!! 需要声明浮点数精度，否则报错No precision specified for (float) 
      var fsSrc = 'precision mediump float;' +
          'uniform vec4 u_FragColor;' +
          'void main() {' +
          'gl_FragColor = u_FragColor;' + // 设置颜色
      '}';
      // 1.初始化着色器
      glUtil.initShaders(vsSrc, fsSrc);

      var arrPos = [];
      webgl.addEventListener('click', function(e) {
          // 转换坐标
          var x = (e.offsetX - webgl.width / 2) / (webgl.width / 2);
          var y = (webgl.height / 2 - e.offsetY) / (webgl.height / 2);
          console.log(x, y);
          // 随机颜色
          var color = {
              r: Math.random(),
              g: Math.random(),
              b: Math.random(),
              a: Math.random()
          };
          // 记录坐标、颜色
          arrPos.push({
              x: x,
              y: y,
              color: color
          });

          // 清空canvas
          gl.clear(gl.COLOR_BUFFER_BIT);
          // 在记录的所有坐标处绘制点
          arrPos.forEach(function(item) {
              // 2.给attribute变量赋值
              // 获取attribute变量的存储位置
              var a_Position = gl.getAttribLocation(glUtil.program, 'a_Position');
              if (a_Position < 0) {
                  console.log('Failed to get the storage location of a_Position');
                  return;
              }
              // 把顶点位置传递给attribute变量
              gl.vertexAttrib3f(a_Position, item.x, item.y, 0.0);

              // 设置颜色
              // 获取uniform变量的存储位置
              var u_FragColor = gl.getUniformLocation(glUtil.program, 'u_FragColor');
              var color = item.color;
              // 把色值传递给uniform变量
              gl.uniform4f(u_FragColor, color.r, color.g, color.b, color.a);

              // 绘制点
              gl.drawArrays(gl.POINTS, 0, 1);
          });
      });
  });
})();