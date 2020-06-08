import { createWebGLRenderingContext } from 'node-gles';

import { VertexArrayObject } from '../../src/graphics/vertexArrayObject';

describe('Vertex Array Object', () => {
  const vertices = [0.5, -0.5, 0, 0.0, 0.5, 0, -0.5, -0.5, 0];
  const indices = [0, 1, 2];

  const gl = createWebGLRenderingContext();

  it('create new VerteArrayObject', () => {
    const vao = new VertexArrayObject(gl, vertices, indices);
    expect(vao.isIndexed).toBe(true);
  });
});
