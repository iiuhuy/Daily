const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl");

if (!gl) {
  throw new Error("WebGL not supported!!!");
}

// alert(`Everything's peachy hear with WebGL`);

const vertexData = [0, 1, 0, 1, -1, 0, -1, -1, 0];
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

// vertex shader
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(
  vertexShader,
  `
  attribute vec3 position;
  void main() {
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
  void main() {
    gl_FragColor = vec4(1, 0, 0, 1);
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
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

gl.useProgram(program);
gl.drawArrays(gl.TRIANGLES, 0, 3);
// gl.drawArrays(gl.LINE_LOOP, 0, 3);


// 着色器 GLSL 语言里面不要忘记分号, 否则显示不出来诶。