const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl');

if (!gl) {
  throw new Error("WebGL not supported!!!");
}

// alert(`Everything's peachy hear with WebGL`);

const vertexData = [
  0, 1, 0,
  1, -1, 0,
  -1, -1, 0,
];

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);


const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, `
  void main()
`);