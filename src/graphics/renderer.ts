import { VertexArrayObject } from './vertexArrayObject';

export interface RendererCurrentInfo {
  iboName: string;
  iboSize: number;
  iboUsage: number;
  isConeVertexBufferVbo: boolean;
  isVerticesVbo: boolean;
  vboName: string;
  vboSize: number;
  vboUsage: number;
}

export class Renderer {
  private _gl: WebGL2RenderingContext | WebGLRenderingContext;

  private _info: RendererCurrentInfo;
  private _currentVAO: VertexArrayObject | null;

  constructor(gl: WebGL2RenderingContext | WebGLRenderingContext) {
    this._gl = gl;
    this._currentVAO = null;

    this._info = {
      iboName: '',
      iboSize: 0,
      iboUsage: 0,
      isConeVertexBufferVbo: false,
      isVerticesVbo: false,
      vboName: '',
      vboSize: 0,
      vboUsage: 0
    };
  }

  clear() {
    this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
    this._gl.clearColor(0, 0, 0, 1);
  }

  viewport() {
    this._gl.viewport(
      0,
      0,
      this.gl.drawingBufferWidth,
      this._gl.drawingBufferHeight
    );
  }

  set currentVAO(vao: VertexArrayObject) {
    this._currentVAO = vao;
  }

  info() {
    if (this._currentVAO) {
      if (
        this._currentVAO.vertexBuffer ===
        this._gl.getParameter(this._gl.ARRAY_BUFFER_BINDING)
      ) {
        this._info.vboName = 'vertexBuffer';
      }

      if (
        this._currentVAO.indexBuffer ===
        this._gl.getParameter(this._gl.ELEMENT_ARRAY_BUFFER_BINDING)
      ) {
        this._info.iboName = 'indexBuffer';
      }

      this._info.vboSize = this._gl.getBufferParameter(
        this._gl.ARRAY_BUFFER,
        this._gl.BUFFER_SIZE
      );
      this._info.vboUsage = this._gl.getBufferParameter(
        this._gl.ARRAY_BUFFER,
        this._gl.BUFFER_USAGE
      );
      this._info.iboSize = this._gl.getBufferParameter(
        this._gl.ELEMENT_ARRAY_BUFFER,
        this._gl.BUFFER_SIZE
      );
      this._info.iboUsage = this._gl.getBufferParameter(
        this._gl.ELEMENT_ARRAY_BUFFER,
        this._gl.BUFFER_USAGE
      );

      try {
        this._info.isVerticesVbo = this._gl.isBuffer(this._currentVAO.vertices);
      } catch (e) {
        this._info.isVerticesVbo = false;
      }

      this._info.isConeVertexBufferVbo = this._gl.isBuffer(
        this._currentVAO.vertexBuffer
      );
    }

    return this._info;
  }

  get gl() {
    return this._gl;
  }
}
