/**
 * Canvas Setup.
 */
const canvas = document.querySelector('#webgl-app');

canvas.width = 600;
canvas.height = 500;

/**
 * WebGL Setup.
 */
const gl = canvas.getContext('webgl2');

if(!gl) {
    alert("Your browser does not support WebGl");
}

// Set color value to buffer (state setting).
gl.clearColor(1, 1, 1, 1);

// Clear buffer. gl.COLOR_BUFFER_BIT tell gl.clear which buffer you want to clear (command).
gl.clear(gl.COLOR_BUFFER_BIT);

// Triangle Prism Data.
const trianglePrismData = [
  0.0, 1.0, -1.0,
  -1.0, 0.0, -1.0,
  0.0, -1.0, -1.0,
  1.0, 0.0, -1.0,
  0.0, 0.0, 1.0,
];

// Triangle Prism Indices.
const trianglePrismIndices = [
  0, 4, 3,
  0, 1, 4,
  1, 4, 2,
  2, 3, 4,
  3, 0, 1,
  3, 1, 2,
];

// Init vertex shader
const vertexShaderText = `attribute vec3 a_pos;
uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;

void main() {
  gl_Position = mProj * mView * mWorld * vec4(a_pos, 1);
}`

// init fragment shader
const fragmentShaderText = `precision mediump float;

uniform vec4 u_fragColor;
void main() {
  gl_FragColor = u_fragColor;
}`

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderText);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderText);
gl.compileShader(fragmentShader);

const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);

// Binding data
const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(trianglePrismData), gl.STATIC_DRAW)

const indicesBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(trianglePrismIndices), gl.STATIC_DRAW)

// Simply tells WebGL to use a particular shader program to draw.
gl.useProgram(shaderProgram);

// simply this line retrieve the 'location of the variables we've defined inside our shaders before.
const vertexPosition = gl.getAttribLocation(shaderProgram, 'a_pos');
const uniformCol = gl.getUniformLocation(shaderProgram, 'u_fragColor');

const matWorldUniformLocation = gl.getUniformLocation(shaderProgram, 'mWorld');
const matViewUniformLocation = gl.getUniformLocation(shaderProgram, 'mView');
const matProjUniformLocation = gl.getUniformLocation(shaderProgram, 'mProj');

const worldMatrix = new Float32Array(16);
const viewMatrix = new Float32Array(16);
const projMatrix = new Float32Array(16);

mat4.identity(worldMatrix);
mat4.lookAt(viewMatrix, [6, 4, -8], [0, 0, 0], [0, 1, 10]);
mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000.0);

gl.vertexAttribPointer(
  vertexPosition, // Attribute Location
  3, // Number of elements per attribute => 3d (x, y, z)
  gl.FLOAT, // Type of elements
  gl.FALSE, 
  0, // Size of an individual vertex
  0, // Offset from the beginning of a single vertex to this attribute.
);

gl.uniform4fv(uniformCol, [0.0, 1.0, 0.0, 1.0]);
gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

gl.enableVertexAttribArray(vertexPosition);

gl.drawElements(gl.TRIANGLES, trianglePrismIndices.length, gl.UNSIGNED_SHORT, 0);

/**
 * Canvas Setup.
 */
 const canvas2 = document.querySelector('#webgl-app-2');

 canvas2.width = 600;
 canvas2.height = 500;
 
 /**
  * WebGL Setup.
  */
 const gl2 = canvas2.getContext('webgl2');
 
 if(!gl2) {
     alert("Your browser does not support WebGl");
 }
 
 // Set color value to buffer (state setting).
 gl2.clearColor(1, 1, 1, 1);
 
 // Clear buffer. gl.COLOR_BUFFER_BIT tell gl.clear which buffer you want to clear (command).
 gl2.clear(gl.COLOR_BUFFER_BIT);
 
 const boxData = 
 [ // X, Y, Z          
     // Top
     -1.0, 1.0, -1.0,   
     -1.0, 1.0, 1.0,    
     1.0, 1.0, 1.0,     
     1.0, 1.0, -1.0,    

     // Left
     -1.0, 1.0, 1.0,    
     -1.0, -1.0, 1.0,   
     -1.0, -1.0, -1.0,  
     -1.0, 1.0, -1.0,   

     // Right
     1.0, 1.0, 1.0,    
     1.0, -1.0, 1.0,   
     1.0, -1.0, -1.0,  
     1.0, 1.0, -1.0,   

     // Front
     1.0, 1.0, 1.0,    
     1.0, -1.0, 1.0,    
     -1.0, -1.0, 1.0,    
     -1.0, 1.0, 1.0,    

     // Back
     1.0, 1.0, -1.0,    
     1.0, -1.0, -1.0,    
     -1.0, -1.0, -1.0,    
     -1.0, 1.0, -1.0,    

     // Bottom
     -1.0, -1.0, -1.0,   
     -1.0, -1.0, 1.0,    
     1.0, -1.0, 1.0,     
     1.0, -1.0, -1.0,    
 ];

 const boxIndices =
 [
     // Top
     0, 1, 2,
     0, 2, 3,

     // Left
     5, 4, 6,
     6, 4, 7,

     // Right
     8, 9, 10,
     8, 10, 11,

     // Front
     13, 12, 14,
     15, 14, 12,

     // Back
     16, 17, 18,
     16, 18, 19,

     // Bottom
     21, 20, 22,
     22, 20, 23
 ];
 
 // Init vertex shader
 const vertexShaderText2 = `attribute vec3 a_pos;
 uniform mat4 mWorld;
 uniform mat4 mView;
 uniform mat4 mProj;
 
 void main() {
   gl_Position = mProj * mView * mWorld * vec4(a_pos, 1);
 }`
 
 // init fragment shader
 const fragmentShaderText2 = `precision mediump float;
 
 uniform vec4 u_fragColor;
 void main() {
   gl_FragColor = u_fragColor;
 }`
 
 const vertexShader2 = gl2.createShader(gl2.VERTEX_SHADER);
 gl2.shaderSource(vertexShader2, vertexShaderText2);
 gl2.compileShader(vertexShader2);
 
 const fragmentShader2 = gl2.createShader(gl2.FRAGMENT_SHADER);
 gl2.shaderSource(fragmentShader2, fragmentShaderText2);
 gl2.compileShader(fragmentShader2);
 
 const shaderProgram2 = gl2.createProgram();
 gl2.attachShader(shaderProgram2, vertexShader2);
 gl2.attachShader(shaderProgram2, fragmentShader2);
 gl2.linkProgram(shaderProgram2);
 
 // Binding data
 const vertexBuffer2 = gl2.createBuffer();
 gl2.bindBuffer(gl2.ARRAY_BUFFER, vertexBuffer2);
 gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(boxData), gl2.STATIC_DRAW);
 
 const indicesBuffer2 = gl2.createBuffer();
 gl2.bindBuffer(gl2.ELEMENT_ARRAY_BUFFER, indicesBuffer2);
 gl2.bufferData(gl2.ELEMENT_ARRAY_BUFFER, new Uint16Array(boxIndices), gl2.STATIC_DRAW);
 
 // Simply tells WebGL to use a particular shader program to draw.
 gl2.useProgram(shaderProgram2);
 
 // simply this line retrieve the 'location of the variables we've defined inside our shaders before.
 const vertexPosition2 = gl2.getAttribLocation(shaderProgram2, 'a_pos');
 const uniformCol2 = gl2.getUniformLocation(shaderProgram2, 'u_fragColor');
 
 const matWorldUniformLocation2 = gl2.getUniformLocation(shaderProgram2, 'mWorld');
 const matViewUniformLocation2 = gl2.getUniformLocation(shaderProgram2, 'mView');
 const matProjUniformLocation2 = gl2.getUniformLocation(shaderProgram2, 'mProj');
 
 const worldMatrix2 = new Float32Array(16);
 const viewMatrix2 = new Float32Array(16);
 const projMatrix2 = new Float32Array(16);
 
 mat4.identity(worldMatrix2);
 mat4.lookAt(viewMatrix2, [0, 0, 0], [10, 1, 10], [0, 1, 10]);
 mat4.perspective(projMatrix2, glMatrix.toRadian(45), canvas2.width / canvas2.height, 0.1, 1000.0);
 
 gl2.vertexAttribPointer(
   vertexPosition2, // Attribute Location
   3, // Number of elements per attribute => 3d (x, y, z)
   gl2.FLOAT, // Type of elements
   gl2.FALSE, 
   0, // Size of an individual vertex
   0, // Offset from the beginning of a single vertex to this attribute.
 );
 
 gl2.uniform4fv(uniformCol2, [1.0, 0.0, 1.0, 1.0]);
 gl2.uniformMatrix4fv(matWorldUniformLocation2, gl2.FALSE, worldMatrix);
 gl2.uniformMatrix4fv(matViewUniformLocation2, gl2.FALSE, viewMatrix);
 gl2.uniformMatrix4fv(matProjUniformLocation2, gl2.FALSE, projMatrix);
 
 gl2.enableVertexAttribArray(vertexPosition2);
 
 gl2.drawElements(gl2.TRIANGLES, boxIndices.length, gl2.UNSIGNED_SHORT, 0);