import '../assets/shaders/basic.frag';
import '../assets/shaders/basic.vert';

import * as Utils from './utils/utils';
import { ShaderProgram } from './graphics/shader';
import { generatePolygon } from './drawing/drawing';
import { Renderer } from './graphics/renderer';
import { VertexArrayObject } from './graphics/vertexArrayObject';
import { KeyboardCode } from './inputs';
import dat from 'dat.gui';

let shaderProgram: ShaderProgram;
let N = 5;
let renderingMode = WebGL2RenderingContext.TRIANGLES;
let checkInfo = false;

var FizzyText = function() {
  return {
    renderingMode: 'TRIANGLES',
    color: [0, 128, 255]
    // Define render logic ...
  };
};

let gui = new dat.GUI();

function checkKey(event: KeyboardEvent) {
  switch (event.keyCode) {
    case KeyboardCode.Key1:
      checkInfo = true;
      break;

    case KeyboardCode.Key5:
      if (N <= 500) {
        N += 1;
      }
      break;

    case KeyboardCode.Key6:
      if (N > 3) {
        N -= 1;
      }
      break;

    default:
      break;
  }
}

let renderer: Renderer;

function onResize() {
  const gl = renderer.gl;
  const canvas = renderer.gl.canvas as HTMLCanvasElement;
  var width = canvas.clientWidth;
  var height = canvas.clientHeight;
  if (gl.canvas.width != width || gl.canvas.height != height) {
    gl.canvas.width = width;
    gl.canvas.height = height;
  }
}

let model: Utils.ModelResult;
let color = [0.5, 0.5, 0];

async function onLoad() {
  const canvas = Utils.getCanvas('webglCanvas', document.body);
  if (!canvas.canvas) {
    console.error(canvas.error);
    return;
  }

  const context = Utils.getGLContext(canvas.canvas);
  if (!context.context) {
    console.error(canvas.error);
    return;
  }

  renderer = new Renderer(context.context);
  renderer.viewport();
  renderer.clear();

  const text = FizzyText();
  let controller = gui.add(text, 'renderingMode', ['TRIANGLES', 'LINE_LOOP']);
  controller.onChange(value => {
    switch (value) {
      case 'LINE_LOOP':
        renderingMode = WebGL2RenderingContext.LINE_LOOP;
        break;

      default:
        renderingMode = WebGL2RenderingContext.TRIANGLES;
        break;
    }
  });
  controller = gui.addColor(text, 'color');
  controller.onChange(value => {
    color[0] = value[0] / 255;
    color[1] = value[1] / 255;
    color[2] = value[2] / 255;
  });

  model = await Utils.loadModel('/assets/models/geometries/sphere3.json');

  window.onkeydown = checkKey;

  runApplication();
}

function runApplication() {
  createShaders(renderer);

  setInterval(tick, 1000 / 30);
}

function tick() {
  renderer.clear();

  polygonExample();

  // modelExample();

  renderer.gl.useProgram(null);
}

window.onresize = onResize;
document.body.onload = onLoad;

function modelExample() {
  let vao = new VertexArrayObject(renderer.gl, model.vertices, model.indices);

  shaderProgram.use();
  if (model.color) shaderProgram.setUniform3fv('aColor', model.color);
  else shaderProgram.setUniform3fv('aColor', color);

  vao.generate(shaderProgram);
  renderer.currentVAO = vao;
  vao.draw(renderingMode);
  vao.unbind();
}

function polygonExample() {
  const { vertices, indices } = generatePolygon(N);
  let polygonVAO = new VertexArrayObject(renderer.gl, vertices, indices);

  shaderProgram.use();
  shaderProgram.setUniform3fv('aColor', color);
  polygonVAO.generate(shaderProgram);
  renderer.currentVAO = polygonVAO;
  polygonVAO.draw(renderingMode);
  polygonVAO.unbind();
}

async function createShaders(renderer: Renderer) {
  let response = await fetch('/assets/shaders/basic.vert');
  const vertexShaderCode = await response.text();
  response = await fetch('/assets/shaders/basic.frag');
  const fragmentShaderCode = await response.text();

  shaderProgram = new ShaderProgram(renderer.gl);

  let result = shaderProgram.addShader(
    vertexShaderCode,
    renderer.gl.VERTEX_SHADER
  );
  if (!result.valid) console.log(result.msg);

  result = shaderProgram.addShader(
    fragmentShaderCode,
    renderer.gl.FRAGMENT_SHADER
  );
  if (!result.valid) console.log(result.msg);

  result = shaderProgram.compile();
  if (!result.valid) console.log(result.msg);

  shaderProgram.addAttribute('aVertexPosition');
  shaderProgram.addUniform('aColor');
}
