// 在 canvas 绘制二位图形(2D 图形)，需要经过以下三个步骤
// 1.获取元素 <canvas>
// 2.想该元素请求二位图形的 <绘图上下文>
// 3.在绘图上下文上调用相应的绘图函数
// 不管是二维三维这个步骤都是一样的。

function main() {
  var canvas = document.getElementById("example");
  if (!canvas) {
    console.log('Failed to retrive the <canvas> element');
    return;
  }

  var ctx = canvas.getContext('2d');

  ctx.fillStyle = 'rgba(0,0,255,1.0)';
  ctx.fillRect(120, 10, 150, 150);
}