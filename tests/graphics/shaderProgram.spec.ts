/**
 * @jest-environment jsdom
 */

import { createWebGLRenderingContext } from 'node-gles';

import { ShaderProgram } from '../../src/graphics/shader';

describe('Shader Program', () => {
  describe('compileShader', () => {
    const vertexShaderCode = `#version 300 es
      precision mediump float;
  
      // Supplied vertex position attribute
      in vec3 aVertexPosition;
      // in vec3 aVertexNormal;

      void main(void) {
        // Set the position in clipspace coordinates
        // vec4 prova = vec4(aVertexNormal, 1.0);
        gl_Position = vec4(aVertexPosition, 1.0);
      }`;

    const fragmentShaderCode = `#version 300 es
      precision mediump float;

      // Color that is the result of this shader
      out vec4 fragColor;

      void main(void) {
        // Set the result as red
        fragColor = vec4(1.0, 0.0, 0.0, 1.0);
      }`;

    const gl = createWebGLRenderingContext() as WebGL2RenderingContext;
    const shaderProgram = new ShaderProgram(gl);

    beforeEach(() => {
      shaderProgram.clear();
    });

    it('returns a compiled shader', async () => {
      const result = shaderProgram.addShader(
        vertexShaderCode,
        gl.VERTEX_SHADER
      );
      expect(result.valid).toBe(true);
    });

    it('compile a shader program', async () => {
      shaderProgram.addShader(vertexShaderCode, gl.VERTEX_SHADER);
      shaderProgram.addShader(fragmentShaderCode, gl.FRAGMENT_SHADER);

      const result = shaderProgram.compile();
      expect(result.valid).toBe(true);
    });

    it('value of attribute', () => {
      shaderProgram.addShader(vertexShaderCode, gl.VERTEX_SHADER);
      shaderProgram.addShader(fragmentShaderCode, gl.FRAGMENT_SHADER);

      shaderProgram.compile();
      shaderProgram.addAttribute('aVertexPosition');
      // shaderProgram.addAttribute('aVertexNormal');

      const result = shaderProgram.valueOfAttribute('aVertexPosition');
      expect(result).not.toBe(-1);
    });
  });
});
