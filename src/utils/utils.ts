import { ColorRGB } from '../graphics/color';

export interface ContextResult {
  context: WebGL2RenderingContext | null;
  error?: string;
}

export interface CanvasResult {
  valid: boolean;
  canvas: HTMLCanvasElement | null;
  error?: string;
}

export function getCanvas(id: string, element: HTMLElement) {
  const result: CanvasResult = {
    valid: true,
    canvas: element.querySelector(`#${id}`) as HTMLCanvasElement,
    error: ''
  };

  if (!result.canvas) {
    result.valid = false;
    result.error = `There is no canvas with id ${id} on this page.`;
  }

  return result;
}

export function autoResizeCanvas(
  canvas: HTMLCanvasElement,
  container: HTMLElement
) {
  const expandFullScreen = () => {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  };
  expandFullScreen();
}

export function getGLContext(canvas: HTMLCanvasElement): ContextResult {
  const result: ContextResult = {
    context: canvas.getContext('webgl2'),
    error: ''
  };

  if (!result.context) {
    result.error = 'WebGL2 is not available in your browser.';
  }

  return result;
}

export interface ModelResult {
  vertices: number[];
  indices?: number[];
  color?: number[];
}

export async function loadModel(path: string) {
  return fetch(path)
    .then(resp => resp.json())
    .then(data => {
      let result = data as ModelResult;
      return result;
    });
}
