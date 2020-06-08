import { ColorRGB } from './color';

/**
 *
 *
 * @export
 * @interface ShaderProgramResult
 */
export interface ShaderProgramResult {
  /**
   *
   *
   * @type {boolean}
   * @memberof ShaderProgramResult
   */
  valid: boolean;

  /**
   *
   *
   * @type {(string | null)}
   * @memberof ShaderProgramResult
   */
  msg: string | null;
}

/**
 *
 *
 * @export
 * @class ShaderProgram
 */
export class ShaderProgram {
  private _gl: WebGL2RenderingContext | WebGLRenderingContext;
  private _program: WebGLProgram | null;
  private _attributesMap: Map<string, number>;
  private _uniformsMap: Map<string, WebGLUniformLocation>;

  private _shadersMap: Map<GLenum, WebGLShader[]>;

  constructor(gl: WebGL2RenderingContext | WebGLRenderingContext) {
    this._gl = gl;
    this._attributesMap = new Map();
    this._uniformsMap = new Map();
    this._shadersMap = new Map();
    this._program = null;
  }

  addAttribute(attribute: string) {
    const result: ShaderProgramResult = { valid: false, msg: '' };

    if (this._program === null) {
      result.msg = 'you must compile this program';
      return result;
    }

    const value = this._gl.getAttribLocation(this._program, attribute);
    if (value === -1) {
      result.msg = 'attribute not found';
      return result;
    }

    this._attributesMap.set(attribute, value);

    result.valid = true;
    result.msg = '';
    return result;
  }

  addUniform(uniform: string) {
    const result: ShaderProgramResult = { valid: false, msg: '' };

    if (this._program === null) {
      result.msg = 'you must compile this program';
      return result;
    }

    const value = this._gl.getUniformLocation(this._program, uniform);
    if (!value) {
      result.msg = 'attribute not found';
      return result;
    }

    this._uniformsMap.set(uniform, value);

    result.valid = true;
    result.msg = '';
    return result;
  }

  valueOfAttribute(attribute: string) {
    return this._attributesMap.get(attribute)!;
  }

  valueOfUniform(uniform: string) {
    return this._uniformsMap.get(uniform)!;
  }

  setUniform3fv(name: string, value: number[]) {
    let location = this._uniformsMap.get(name)!;
    this._gl.uniform3fv(location, new Float32Array(value));
  }

  addShader(shaderCode: string, shaderType: GLenum) {
    let shader = this._gl.createShader(shaderType);

    const result: ShaderProgramResult = { valid: false, msg: '' };

    if (!shader) {
      result.msg = 'impossbile to add a shader';
      return result;
    }

    this._gl.shaderSource(shader, shaderCode);

    this._gl.compileShader(shader);
    if (!this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS)) {
      result.msg = this._gl.getShaderInfoLog(shader);
      return result;
    }

    let shaders = this._shadersMap.get(shaderType);

    if (shaders) {
      shaders.push(shader);
    } else {
      shaders = new Array<ShaderProgram>();
      shaders.push(shader);
      this._shadersMap.set(shaderType, shaders);
    }

    result.valid = true;
    result.msg = '';
    return result;
  }

  clear() {
    this._gl.deleteProgram(this._program);
  }

  compile() {
    this._program = this._gl.createProgram();

    const result: ShaderProgramResult = { valid: false, msg: '' };

    if (!this._program) {
      result.msg = 'impossible to create a shader program';
      return result;
    }

    let keys = Array.from(this._shadersMap.keys());

    for (let i = 0; i < keys.length; i++) {
      const shaders = this._shadersMap.get(keys[i]);
      if (shaders) {
        for (let j = 0; j < shaders.length; j++) {
          const shader = shaders[j];
          this._gl.attachShader(this._program, shader);
        }
      }
    }

    this._gl.linkProgram(this._program);
    if (!this._gl.getProgramParameter(this._program, this._gl.LINK_STATUS)) {
      result.msg = this._gl.getProgramInfoLog(this._program);
      return result;
    }

    for (let i = 0; i < keys.length; i++) {
      const shaders = this._shadersMap.get(keys[i]);
      if (shaders) {
        for (let j = 0; j < shaders.length; j++) {
          const shader = shaders[j];
          this._gl.deleteShader(shader);
        }
      }
    }

    result.valid = true;
    result.msg = '';
    return result;
  }

  use() {
    this._gl.useProgram(this._program);
  }
}
