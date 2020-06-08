import { ShaderProgram } from './shader';

export class VertexArrayObject {
  private _gl: WebGL2RenderingContext | WebGLRenderingContext;

  private _VAO: WebGLVertexArrayObject | null = null;

  private _vertexBuffer: WebGLBuffer | null = null;
  private _indexBuffer: WebGLBuffer | null = null;

  public readonly vertices: number[];
  public readonly indices: number[] | null = null;
  private _isIndexed = false;

  constructor(
    gl: WebGL2RenderingContext | WebGLRenderingContext,
    vertices: number[],
    indices?: number[]
  ) {
    this._gl = gl;
    this.vertices = vertices;

    if (indices) {
      this.indices = indices;
      this._isIndexed = true;
    }
  }

  generate(shaderProgram: ShaderProgram) {
    if (this._gl instanceof WebGL2RenderingContext) {
      this._VAO = this._gl.createVertexArray();
      this._gl.bindVertexArray(this._VAO);
    }

    this._vertexBuffer = this._gl.createBuffer()!;
    this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this.vertexBuffer);
    this._gl.bufferData(
      this._gl.ARRAY_BUFFER,
      new Float32Array(this.vertices),
      this._gl.STATIC_DRAW
    );

    this._gl.enableVertexAttribArray(
      shaderProgram.valueOfAttribute('aVertexPosition')
    );
    this._gl.vertexAttribPointer(
      shaderProgram.valueOfAttribute('aVertexPosition'),
      3,
      this._gl.FLOAT,
      false,
      0,
      0
    );

    if (this._isIndexed && this.indices) {
      this._indexBuffer = this._gl.createBuffer()!;
      this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
      this._gl.bufferData(
        this._gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(this.indices),
        this._gl.STATIC_DRAW
      );
    }

    this.unbind();
  }

  draw(renderingModel: number = WebGL2RenderingContext.TRIANGLES) {
    if (this._gl instanceof WebGLRenderingContext) {
      this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this.vertexBuffer);
      this._gl.vertexAttribPointer(0, 3, this._gl.FLOAT, false, 0, 0);
      this._gl.enableVertexAttribArray(0);
    } else if (this._gl instanceof WebGL2RenderingContext) {
      this._gl.bindVertexArray(this._VAO);
    }

    if (this._isIndexed && this.indices) {
      this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
      this._gl.drawElements(
        renderingModel,
        this.indices.length,
        this._gl.UNSIGNED_SHORT,
        0
      );
    } else {
      this._gl.drawArrays(renderingModel, 0, this.vertices.length);
    }
  }

  unbind() {
    if (this._gl instanceof WebGL2RenderingContext) {
      this._gl.bindVertexArray(null);
    }
    this._gl.bindBuffer(this._gl.ARRAY_BUFFER, null);
    this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, null);
  }

  get vertexBuffer() {
    return this._vertexBuffer;
  }

  get indexBuffer() {
    return this._indexBuffer;
  }

  get isIndexed() {
    return this._isIndexed;
  }
}
