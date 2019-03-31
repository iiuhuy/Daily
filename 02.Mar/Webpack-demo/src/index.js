// var photo = require('./photo.jpg');
// 使用 loader 打包一个图片为例子
import photo from './photo.jpg';
// 导入样式文件
// import './index.css';   // css
import './index.scss';   // scss


var img = new Image();
img.src = photo;
img.classList.add('photo');   // 样式文件的图片样式

var root = document.getElementById('root');
root.append(img);

console.log("photo value is = " + photo);

console.log("hello~~")

console.log("hello~~")

console.log("hello~~ 使用 npm run bundle， scripts 配置")
