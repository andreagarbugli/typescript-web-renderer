#version 300 es
precision mediump float;

uniform vec3 aColor;

// Color that is the result of this shader
out vec4 fragColor;

void main(void){
  // Set the result as red
  fragColor=vec4(aColor,1.);
}